/**
 * Claim-linker — verifies that the cited PMIDs for each claim in a peptide
 * YAML actually support the claim's content.
 *
 * Phase 1 (audit:citations) verified the citation REGISTRY is honest —
 * every PMID in refs.yaml points to the paper its title says it does.
 * Phase 2 verifies the citation USAGE is honest — every claim in a plate
 * is backed by abstracts that actually support it.
 *
 * Pipeline
 * --------
 *   1. extractClaims(peptide) walks the YAML's citable paths and yields
 *      { path, claim_text, cite_ids } triples for every claim with a
 *      non-empty cite[].
 *   2. resolveCites(citeIds, registry) maps citation IDs to PMIDs (those
 *      with `pmid` set; entries without a PMID are skipped — see the
 *      Phase-1 stripped citations).
 *   3. fetchAbstracts(pmids) pulls the canonical abstract text for each
 *      PMID via PubMed efetch. Cached per-run so repeat-cited papers cost
 *      one network call.
 *   4. scoreClaim(claim_text, abstracts) sends the claim and abstracts to
 *      Claude and gets back a structured { score, rationale } verdict.
 *      Score ≥ 0.85 = supported, 0.6–0.85 = partial, < 0.6 = unsupported.
 *   5. Concurrency: p-limit(3) so we don't melt either NCBI or Anthropic.
 *
 * Cost budget
 * -----------
 * One Anthropic call per claim. With Haiku at ~$1/MTok input + $5/MTok
 * output and ~700 tokens per call, each claim costs ~$0.001. Full corpus
 * (90 plates × ~30 claims average ≈ 2700 calls) is ~$3.
 */

import type { Peptide } from "../../src/lib/schemas/peptide";
import type { Citation, CitationRegistry } from "../../src/lib/schemas/citation";
import type { PubmedClient } from "./pubmed-client";

export interface AnthropicLike {
  messages: {
    create(params: {
      model: string;
      max_tokens: number;
      system?: string;
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    }): Promise<{ content: Array<{ type: string; text?: string }> }>;
  };
}

export interface Claim {
  /** Walker path, e.g. `mechanism.primary_target` or `hero_stats[0]`. */
  path: string;
  /** Human-readable claim sentence built from the YAML field. */
  claim_text: string;
  /** Citation IDs (refs.yaml keys) attached to this claim. */
  cite_ids: string[];
}

export interface ClaimScore extends Claim {
  /** Resolved (citation_id, pmid) pairs. PMID is null if the citation has
   *  no PMID set (Phase-1 stripped citations) — those are skipped from
   *  scoring but listed in the report. */
  resolved: Array<{ citation_id: string; pmid: string | null }>;
  /** 0–1 confidence that the cited abstracts support the claim. Null if
   *  no PMIDs were available to score against. */
  score: number | null;
  /** One-sentence Claude-generated explanation. Null on score-skip. */
  rationale: string | null;
  /** Bucket: ok / partial / unsupported / skipped (no PMIDs). */
  verdict: "ok" | "partial" | "unsupported" | "skipped";
}

/* ============================================================
   Walker — extracts claims from a peptide YAML
   ============================================================ */

interface Walker {
  path: string[];
  /** Builds the human-readable claim sentence from the matched node. */
  toClaimText: (node: unknown) => string | null;
}

/** Cite-bearing paths in a peptide YAML. Mirrors REQUIRED_FIELDS in
 *  scripts/audit-trust-metric.ts so this stays in sync as the schema
 *  evolves. */
const WALKERS: Walker[] = [
  { path: ["summary"], toClaimText: citableLine("Summary") },
  { path: ["hero_route"], toClaimText: citableLine("Administration route") },
  {
    path: ["hero_stats", "*"],
    toClaimText: (n) => {
      if (!isObj(n)) return null;
      const v = strProp(n, "value"), l = strProp(n, "label");
      return v && l ? `${l}: ${v}` : null;
    },
  },
  { path: ["mechanism", "primary_target"], toClaimText: citableLine("Primary target") },
  { path: ["mechanism", "pathway"], toClaimText: citableLine("Pathway") },
  { path: ["mechanism", "downstream_effect"], toClaimText: citableLine("Downstream effect") },
  { path: ["mechanism", "origin"], toClaimText: citableLine("Origin / discovery") },
  { path: ["mechanism", "feedback_intact"], toClaimText: citableLine("Feedback loop") },
  { path: ["mechanism", "antibody_development"], toClaimText: citableLine("Antibody development") },
  { path: ["mechanism", "receptor_class"], toClaimText: citableLine("Receptor class") },
  { path: ["mechanism", "half_life_basis"], toClaimText: citableLine("Half-life basis") },
  { path: ["mechanism", "diagram", "*", "text"], toClaimText: citableLine("Mechanism diagram step") },
  { path: ["dosage", "rows", "*", "value"], toClaimText: citableLine("Dosage value") },
  { path: ["dosage", "rows", "*", "notes"], toClaimText: citableLine("Dosage notes") },
  { path: ["fat_loss", "evidence_meta"], toClaimText: citableLine("Fat-loss evidence summary") },
  { path: ["fat_loss", "rows", "*", "value"], toClaimText: citableLine("Fat-loss row value") },
  { path: ["fat_loss", "rows", "*", "notes"], toClaimText: citableLine("Fat-loss row notes") },
  { path: ["side_effects", "rows", "*", "value"], toClaimText: citableLine("Side effect") },
  { path: ["side_effects", "rows", "*", "notes"], toClaimText: citableLine("Side effect notes") },
  { path: ["side_effects", "contraindications_absolute", "*"], toClaimText: citableLine("Absolute contraindication") },
  { path: ["side_effects", "contraindications_relative", "*"], toClaimText: citableLine("Relative contraindication") },
  {
    path: ["administration", "steps", "*"],
    toClaimText: (n) => {
      if (!isObj(n)) return null;
      const t = strProp(n, "title"), b = strProp(n, "body");
      return t && b ? `${t}: ${b}` : null;
    },
  },
  {
    path: ["synergy", "stacks", "*"],
    toClaimText: (n) => {
      if (!isObj(n)) return null;
      const partner = strProp(n, "partner_slug");
      const rationale = strProp(n, "rationale");
      const benefit = strProp(n, "primary_benefit");
      if (!partner || !rationale) return null;
      return `Stack with ${partner}: ${rationale}${benefit ? ` (primary benefit: ${benefit})` : ""}`;
    },
  },
];

/** Build a claim_text builder for plain CitableValue / CitableString nodes
 *  (`{value, cite[]}` or just a string). */
function citableLine(label: string): (node: unknown) => string | null {
  return (node) => {
    if (typeof node === "string") return node ? `${label}: ${node}` : null;
    if (isObj(node)) {
      const v = strProp(node, "value");
      return v ? `${label}: ${v}` : null;
    }
    return null;
  };
}

function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function strProp(o: Record<string, unknown>, key: string): string | null {
  const v = o[key];
  return typeof v === "string" && v ? v : null;
}

function getCiteIds(node: unknown): string[] {
  if (!isObj(node)) return [];
  const c = node.cite;
  if (!Array.isArray(c)) return [];
  return c.filter((x): x is string => typeof x === "string" && x.length > 0);
}

/** descend(obj, ["mechanism", "diagram", "*", "text"]) walks the tree and
 *  yields every match with its concrete path string. */
function descend(
  obj: unknown,
  path: string[],
): Array<{ value: unknown; pathStr: string }> {
  if (path.length === 0) return [{ value: obj, pathStr: "" }];
  const [head, ...rest] = path;
  if (head === "*") {
    if (!Array.isArray(obj)) return [];
    return obj.flatMap((item, i) =>
      descend(item, rest).map((r) => ({
        value: r.value,
        pathStr: r.pathStr ? `[${i}].${r.pathStr}` : `[${i}]`,
      })),
    );
  }
  if (!isObj(obj)) return [];
  if (!(head in obj)) return [];
  return descend(obj[head], rest).map((r) => ({
    value: r.value,
    pathStr: !r.pathStr
      ? head
      : r.pathStr.startsWith("[")
        ? `${head}${r.pathStr}`
        : `${head}.${r.pathStr}`,
  }));
}

/** Walk the parsed peptide YAML and return one Claim per cited node. */
export function extractClaims(peptide: Peptide): Claim[] {
  const claims: Claim[] = [];
  for (const walker of WALKERS) {
    for (const match of descend(peptide as unknown, walker.path)) {
      const citeIds = getCiteIds(match.value);
      if (citeIds.length === 0) continue;
      const claimText = walker.toClaimText(match.value);
      if (!claimText) continue;
      claims.push({ path: match.pathStr, claim_text: claimText, cite_ids: citeIds });
    }
  }
  return claims;
}

/* ============================================================
   Concurrency limiter — inline p-limit
   ============================================================ */

export async function pLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  if (items.length === 0) return results;
  let next = 0;
  const workerCount = Math.max(1, Math.min(limit, items.length));
  const workers = Array.from({ length: workerCount }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

/* ============================================================
   ClaimLinker — Anthropic-backed scoring
   ============================================================ */

const SYSTEM_PROMPT = `You verify research-peptide citations.

Given a claim from a research database and the abstracts of the papers cited for it, decide whether the abstracts substantively support the claim.

Output strict JSON only — no preface, no code fence, no commentary:

{"score": <number 0.0–1.0>, "rationale": "<one or two sentences>"}

Score guide:
- 0.85–1.0: claim is directly supported by at least one cited abstract (the abstract explicitly states or strongly implies the claimed fact)
- 0.6–0.85: partially supported (relevant subject matter, but the specific claim isn't fully established by the abstracts)
- 0.0–0.6: not supported (off-topic, contradicts, or unrelated to what the abstracts say)

Rationale should name WHICH abstract supports the claim (or note that none do). Be terse.`;

export interface ClaimLinkerOptions {
  pubmed: PubmedClient;
  anthropic: AnthropicLike;
  registry: CitationRegistry;
  /** Anthropic model. Defaults to Haiku — cheap + fast + adequate for this. */
  model?: string;
  /** Max parallel scoring calls. Defaults to 3 per design spec. */
  concurrency?: number;
  /** Optional logger for progress / errors. */
  log?: (msg: string) => void;
}

export class ClaimLinker {
  private readonly pubmed: PubmedClient;
  private readonly anthropic: AnthropicLike;
  private readonly registry: CitationRegistry;
  private readonly model: string;
  private readonly concurrency: number;
  private readonly log: (msg: string) => void;
  /** Cache of in-flight + resolved abstract promises. Stashing the
   *  Promise (not the resolved value) coalesces concurrent fetches —
   *  three claims citing the same paper share one network call. */
  private readonly abstractCache = new Map<string, Promise<string | null>>();

  constructor(opts: ClaimLinkerOptions) {
    this.pubmed = opts.pubmed;
    this.anthropic = opts.anthropic;
    this.registry = opts.registry;
    this.model = opts.model ?? "claude-haiku-4-5";
    this.concurrency = opts.concurrency ?? 3;
    this.log = opts.log ?? (() => {});
  }

  async scoreClaims(claims: Claim[]): Promise<ClaimScore[]> {
    return pLimit(claims, this.concurrency, async (claim, i) => {
      this.log(`[claim-linker]   ${i + 1}/${claims.length} ${claim.path}`);
      return this.scoreOne(claim);
    });
  }

  private async scoreOne(claim: Claim): Promise<ClaimScore> {
    const resolved = claim.cite_ids.map((id) => ({
      citation_id: id,
      pmid: this.resolvePmid(id),
    }));
    const pmids = resolved.map((r) => r.pmid).filter((p): p is string => !!p);

    if (pmids.length === 0) {
      return {
        ...claim,
        resolved,
        score: null,
        rationale: null,
        verdict: "skipped",
      };
    }

    const abstracts = await this.fetchAbstracts(pmids);
    const renderedAbstracts = pmids
      .map((p, i) => `[${i + 1}] PMID ${p}\n${abstracts.get(p) ?? "(abstract unavailable)"}`)
      .join("\n\n");

    const userMessage = [
      `Claim: ${claim.claim_text}`,
      "",
      "Cited papers:",
      renderedAbstracts,
    ].join("\n");

    const { score, rationale } = await this.askClaude(userMessage);
    return {
      ...claim,
      resolved,
      score,
      rationale,
      verdict: bucket(score),
    };
  }

  private resolvePmid(id: string): string | null {
    const c: Citation | undefined = this.registry[id];
    if (!c) return null;
    return c.pmid ?? null;
  }

  private async fetchAbstracts(pmids: string[]): Promise<Map<string, string>> {
    const out = new Map<string, string>();
    for (const pmid of pmids) {
      let p = this.abstractCache.get(pmid);
      if (!p) {
        p = this.pubmed.fetchAbstract(pmid);
        this.abstractCache.set(pmid, p);
      }
      const text = await p;
      if (text) out.set(pmid, text);
    }
    return out;
  }

  private async askClaude(
    userMessage: string,
  ): Promise<{ score: number; rationale: string }> {
    try {
      const res = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      });
      const text = res.content.find((c) => c.type === "text")?.text ?? "";
      const parsed = parseScoreJson(text);
      if (parsed) return parsed;
      this.log(`[claim-linker] could not parse Claude response: ${text.slice(0, 120)}`);
      return { score: 0, rationale: "Failed to parse model response." };
    } catch (e) {
      this.log(`[claim-linker] Anthropic call failed: ${(e as Error).message}`);
      return { score: 0, rationale: `API error: ${(e as Error).message}` };
    }
  }
}

/** Pull the first JSON object out of a Claude response. Tolerates code fences
 *  and stray prose (Haiku occasionally adds them despite the prompt). */
export function parseScoreJson(
  text: string,
): { score: number; rationale: string } | null {
  if (!text) return null;
  // Find the first balanced {...} block.
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  let end = -1;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) return null;
  const slice = text.slice(start, end + 1);
  try {
    const obj = JSON.parse(slice);
    if (typeof obj !== "object" || obj === null) return null;
    const score = typeof obj.score === "number" ? obj.score : Number(obj.score);
    if (Number.isNaN(score)) return null;
    const rationale = typeof obj.rationale === "string" ? obj.rationale : "";
    return { score: clamp01(score), rationale };
  } catch {
    return null;
  }
}

function clamp01(n: number): number {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function bucket(score: number): "ok" | "partial" | "unsupported" {
  if (score >= 0.85) return "ok";
  if (score >= 0.6) return "partial";
  return "unsupported";
}
