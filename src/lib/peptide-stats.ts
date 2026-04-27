import type { EvidenceLevel, Peptide, StackProtocol } from "./schemas/peptide";
import type { CitationRegistry } from "./schemas/citation";

/* =========================================================
   Build-time peptide stats: count cited vs uncited claims so
   the trust promise of PeptidesDB is mechanically queryable.

   Claims counted:
   - Every CitableValue in mechanism / dosage / fat_loss / side_effects
   - Each hero_stat (the value+label+cite triplet)
   - Each StackProtocol's rationale + primary_benefit (counted as claims;
     stack-level cite[] is the source. If empty, claim is uncited.)
   - StackProtocol.protocol.* values reference dosing already counted
     elsewhere, so they're omitted to avoid double-counting.

   AdminStep.body is descriptive prose (how to inject) and not a research
   claim — omitted from the audit.
   ========================================================= */

export interface PeptideStats {
  total_claims: number;
  cited_claims: number;
  uncited_claims: number;
  citation_density: number;
  citation_ratio: number;
  uncited_fields: string[];
}

function isCitableValue(
  obj: unknown,
): obj is { value: string; cite: string[] } {
  if (!obj || typeof obj !== "object") return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.value === "string" &&
    Array.isArray(r.cite) &&
    r.cite.every((x) => typeof x === "string")
  );
}

function isStackProtocol(
  obj: unknown,
): obj is StackProtocol {
  if (!obj || typeof obj !== "object") return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.rationale === "string" &&
    typeof r.primary_benefit === "string" &&
    typeof r.partner_slug === "string"
  );
}

export function computePeptideStats(p: Peptide): PeptideStats {
  let total = 0;
  let cited = 0;
  let density = 0;
  const uncited: string[] = [];

  function countClaim(refs: string[], path: string): void {
    total += 1;
    density += refs.length;
    if (refs.length > 0) cited += 1;
    else uncited.push(path);
  }

  function visit(node: unknown, path: string): void {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach((item, i) => visit(item, `${path}[${i}]`));
      return;
    }
    if (typeof node !== "object") return;

    if (isCitableValue(node)) {
      countClaim(node.cite, path);
      // CitableValues don't currently nest other CitableValues, so stop.
      return;
    }

    if (isStackProtocol(node)) {
      // A stack contributes 2 + N claims (rationale + primary_benefit + each
      // protocol entry). All claims are governed by the stack-level cite[].
      // Protocol entries are visible dosing strings ("2 mg SQ · evening")
      // and must flow through the trust metric so the badge matches what
      // the user sees on /p/[slug] and /compare/[slugs].
      const stackCite = node.cite ?? [];
      countClaim(stackCite, `${path}.rationale`);
      countClaim(stackCite, `${path}.primary_benefit`);
      const protocol = (node as { protocol?: Record<string, string> }).protocol;
      if (protocol && typeof protocol === "object") {
        for (const key of Object.keys(protocol)) {
          countClaim(stackCite, `${path}.protocol.${key}`);
        }
      }
      return;
    }

    const obj = node as Record<string, unknown>;
    for (const [k, v] of Object.entries(obj)) {
      visit(v, path ? `${path}.${k}` : k);
    }
  }

  // Top-level CitableValues — visible hero prose. Must be counted or
  // /api/stats[slug].uncited_fields silently omits them.
  visit(p.summary, "summary");
  visit(p.hero_route, "hero_route");

  visit(p.mechanism, "mechanism");
  visit(p.dosage, "dosage");
  if (p.fat_loss) visit(p.fat_loss, "fat_loss");
  visit(p.side_effects, "side_effects");
  // Contraindications are CitableValue post-parse and visit handles them
  // as part of the side_effects walk above.

  // Administration steps: each step body is a guidance claim; count it
  // governed by the step-level cite[].
  for (let i = 0; i < p.administration.steps.length; i++) {
    const step = p.administration.steps[i];
    countClaim(step.cite ?? [], `administration.steps[${i}].body`);
  }

  if (p.synergy) visit(p.synergy, "synergy");
  visit(p.hero_stats, "hero_stats");

  return {
    total_claims: total,
    cited_claims: cited,
    uncited_claims: total - cited,
    citation_density: density,
    citation_ratio: total === 0 ? 0 : cited / total,
    uncited_fields: uncited,
  };
}

/* =========================================================
   Evidence tier — peptide-level rollup of EvidenceLevel.

   `EvidenceLevel` is the per-section grade (fine-grained, 8 values).
   `EvidenceTier` is the peptide-level rollup (4 buckets) used by:
     - The plate's Hero card to surface evidence quality at a glance
     - DESIGN.md § 14 conditional framing for Khavinson-school plates
       (framing renders only when tier ∈ {animal, theoretical})
     - The maturity badge atlas-rendering decisions

   Tier is DERIVED at build time, never stored — keeps a single source
   of truth (the per-section evidence_level fields) and lets the rollup
   logic evolve without YAML edits.
   ========================================================= */

export type EvidenceTier = "fda-approved" | "clinical" | "animal" | "theoretical";

/**
 * Strength rank for the EvidenceLevel enum. Higher = stronger evidence.
 * fda-approved (8) is the strongest; theoretical (1) is the weakest.
 * Order matches schemas/peptide.ts EvidenceLevel ordering.
 */
const EVIDENCE_RANK: Record<EvidenceLevel, number> = {
  "fda-approved": 8,
  "phase-3": 7,
  "phase-2": 6,
  "phase-1": 5,
  "animal-strong": 4,
  "animal-mechanistic": 3,
  "human-mechanistic": 2,
  "theoretical": 1,
};

const EVIDENCE_TO_TIER: Record<EvidenceLevel, EvidenceTier> = {
  "fda-approved": "fda-approved",
  "phase-3": "clinical",
  "phase-2": "clinical",
  "phase-1": "clinical",
  "animal-strong": "animal",
  "animal-mechanistic": "animal",
  "human-mechanistic": "animal",
  "theoretical": "theoretical",
};

/**
 * Roll up the peptide's evidence levels into a single tier. Takes the
 * MAX (strongest) across all section-level evidence_level fields:
 * peptide.evidence_level + fat_loss.evidence_level (when present).
 *
 * Tier values are coarser than EvidenceLevel by design — readers don't
 * benefit from a 1-of-8 distinction at the page level. The 4 tiers map
 * to UI affordances: badge color, framing copy, maturity-badge accent.
 */
export function computeEvidenceTier(p: Peptide): EvidenceTier {
  const levels: EvidenceLevel[] = [p.evidence_level];
  if (p.fat_loss?.evidence_level) levels.push(p.fat_loss.evidence_level);

  const strongest = levels.reduce<EvidenceLevel>(
    (best, cur) => (EVIDENCE_RANK[cur] > EVIDENCE_RANK[best] ? cur : best),
    levels[0],
  );
  return EVIDENCE_TO_TIER[strongest];
}

/* =========================================================
   Khavinson-tradition detection.

   Returns true when this peptide cites at least one reference whose
   registry entry has `russian_journal_ref` set — meaning the citation
   comes from St. Petersburg Institute of Bioregulation and Gerontology
   (Khavinson school) literature that isn't PubMed-indexed.

   Used by DESIGN.md § 14 conditional framing: the explicit "Russian-
   language clinical literature, primarily from the St. Petersburg
   Institute…" line renders ONLY when this returns true AND the plate's
   evidence_tier is `animal` or `theoretical`. (A Khavinson peptide
   that later gets a Western RCT would auto-suppress the framing.)
   ========================================================= */

export function isKhavinsonTradition(
  p: Peptide,
  registry: CitationRegistry,
): boolean {
  for (const id of collectCiteIds(p)) {
    const ref = registry[id];
    if (ref?.russian_journal_ref) return true;
  }
  return false;
}

/** Walk the peptide tree and collect every cite-ID it uses, deduped. */
function collectCiteIds(p: Peptide): Set<string> {
  const ids = new Set<string>();

  function visit(node: unknown): void {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    const cite = obj.cite;
    if (Array.isArray(cite)) {
      for (const id of cite) if (typeof id === "string" && id) ids.add(id);
    }
    for (const v of Object.values(obj)) visit(v);
  }

  visit(p as unknown);
  return ids;
}
