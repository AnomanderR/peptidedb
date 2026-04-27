import { describe, expect, test } from "bun:test";
import {
  ClaimLinker,
  extractClaims,
  pLimit,
  parseScoreJson,
  type AnthropicLike,
} from "../../scripts/lib/claim-linker";
import type { Peptide } from "../../src/lib/schemas/peptide";
import type { CitationRegistry } from "../../src/lib/schemas/citation";
import { PubmedClient, type FetchFn } from "../../scripts/lib/pubmed-client";

/* ============================================================
   extractClaims
   ============================================================ */

describe("extractClaims", () => {
  test("yields claims with cite[] arrays from CitableValue + HeroStat + AdminStep + StackProtocol", () => {
    const peptide = {
      summary: { value: "Tesamorelin is a GHRH analog.", cite: ["falutz-2007"] },
      hero_route: "Subcutaneous injection",
      hero_stats: [
        { value: "15-20%", label: "VAT reduction", cite: ["falutz-2007", "falutz-2010"] },
        { value: "26 weeks", label: "Trial length" },
      ],
      mechanism: {
        primary_target: { value: "GHRH receptor (GHRHR)", cite: ["walker-1994"] },
        pathway: "GH → IGF-1 axis",
      },
      administration: {
        steps: [
          {
            title: "Reconstitute",
            body: "Add 2 mL bacteriostatic water",
            cite: ["fda-egrifta-label-2010"],
          },
          { title: "Refrigerate", body: "After reconstitution" },
        ],
      },
      synergy: {
        stacks: [
          {
            partner_slug: "ipamorelin",
            rationale: "Complementary GHS mechanisms",
            primary_benefit: "Synergistic GH pulses",
            partner_dose: "300 mcg",
            protocol: { dosing: "0.05 mg/kg" },
            cite: ["sigalos-2018"],
          },
        ],
      },
    } as unknown as Peptide;

    const claims = extractClaims(peptide);

    const paths = claims.map((c) => c.path);
    expect(paths).toContain("summary");
    expect(paths).toContain("hero_stats[0]");
    expect(paths).toContain("mechanism.primary_target");
    expect(paths).toContain("administration.steps[0]");
    expect(paths).toContain("synergy.stacks[0]");

    expect(paths).not.toContain("hero_route");
    expect(paths).not.toContain("hero_stats[1]");
    expect(paths).not.toContain("administration.steps[1]");
    expect(paths).not.toContain("mechanism.pathway");

    const adminClaim = claims.find((c) => c.path === "administration.steps[0]");
    expect(adminClaim?.claim_text).toBe("Reconstitute: Add 2 mL bacteriostatic water");
    expect(adminClaim?.cite_ids).toEqual(["fda-egrifta-label-2010"]);

    const stackClaim = claims.find((c) => c.path === "synergy.stacks[0]");
    expect(stackClaim?.claim_text).toContain("Stack with ipamorelin");
    expect(stackClaim?.claim_text).toContain("Complementary GHS mechanisms");
  });

  test("skips nodes with empty cite[]", () => {
    const peptide = {
      summary: { value: "X", cite: [] },
      hero_stats: [{ value: "Y", label: "Z", cite: [] }],
    } as unknown as Peptide;
    expect(extractClaims(peptide)).toEqual([]);
  });

  test("returns empty array on empty / minimal peptide", () => {
    expect(extractClaims({} as unknown as Peptide)).toEqual([]);
  });
});

/* ============================================================
   parseScoreJson
   ============================================================ */

describe("parseScoreJson", () => {
  test("parses clean JSON", () => {
    const r = parseScoreJson('{"score": 0.92, "rationale": "Abstract 1 directly states the 15-20% VAT figure."}');
    expect(r).toEqual({ score: 0.92, rationale: "Abstract 1 directly states the 15-20% VAT figure." });
  });

  test("clamps score to [0, 1]", () => {
    expect(parseScoreJson('{"score": 1.4, "rationale": "x"}')?.score).toBe(1);
    expect(parseScoreJson('{"score": -0.2, "rationale": "x"}')?.score).toBe(0);
  });

  test("tolerates code fence preamble", () => {
    const r = parseScoreJson('```json\n{"score": 0.7, "rationale": "Partial."}\n```');
    expect(r?.score).toBe(0.7);
  });

  test("tolerates prose preface", () => {
    const r = parseScoreJson(
      'Here is my evaluation:\n{"score": 0.3, "rationale": "Off-topic."}',
    );
    expect(r?.score).toBe(0.3);
    expect(r?.rationale).toBe("Off-topic.");
  });

  test("handles numeric score as string", () => {
    expect(parseScoreJson('{"score": "0.5", "rationale": "x"}')?.score).toBe(0.5);
  });

  test("returns null on non-JSON garbage", () => {
    expect(parseScoreJson("score is high i guess")).toBeNull();
    expect(parseScoreJson("")).toBeNull();
    expect(parseScoreJson("{ broken json")).toBeNull();
  });

  test("returns null when score is missing", () => {
    expect(parseScoreJson('{"rationale": "x"}')).toBeNull();
  });
});

/* ============================================================
   pLimit
   ============================================================ */

describe("pLimit", () => {
  test("processes all items and returns results in order", async () => {
    const items = [1, 2, 3, 4, 5];
    const result = await pLimit(items, 2, async (n) => n * 10);
    expect(result).toEqual([10, 20, 30, 40, 50]);
  });

  test("respects concurrency cap", async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    await pLimit(items, 3, async () => {
      inFlight += 1;
      if (inFlight > maxInFlight) maxInFlight = inFlight;
      await new Promise((r) => setTimeout(r, 10));
      inFlight -= 1;
    });
    expect(maxInFlight).toBeLessThanOrEqual(3);
    expect(maxInFlight).toBeGreaterThan(1);
  });

  test("returns [] on empty input without spawning workers", async () => {
    let called = 0;
    const r = await pLimit([], 5, async () => {
      called += 1;
      return null;
    });
    expect(r).toEqual([]);
    expect(called).toBe(0);
  });
});

/* ============================================================
   ClaimLinker
   ============================================================ */

const REGISTRY: CitationRegistry = {
  "falutz-2007": {
    id: "falutz-2007",
    type: "journal",
    title: "Metabolic effects of a growth hormone-releasing factor in patients with HIV",
    year: 2007,
    pmid: "18057338",
  },
  "stripped-cite": {
    id: "stripped-cite",
    type: "journal",
    title: "A real entry without a PMID",
    year: 2018,
  },
  "fda-label": {
    id: "fda-label",
    type: "fda-label",
    title: "EGRIFTA prescribing information",
    year: 2010,
    url: "https://www.accessdata.fda.gov/x.pdf",
  },
};

const FALUTZ_ABSTRACT = `1. N Engl J Med. 2007 Dec 6;357(23):2359-70.

Metabolic effects of a growth hormone-releasing factor in patients with HIV.

Falutz J, Allas S, Blot K, et al.

BACKGROUND: HIV-infected patients can have abdominal fat accumulation. We
assessed tesamorelin, a GHRH analogue.

RESULTS: Tesamorelin reduced visceral adipose tissue by 15-20% over 26 weeks
versus placebo.

PMID: 18057338`;

function makePubmedClient(textBody = FALUTZ_ABSTRACT): PubmedClient {
  const fetchFn: FetchFn = async () =>
    new Response(textBody, { status: 200, headers: { "content-type": "text/plain" } });
  return new PubmedClient({ fetchFn, rateLimit: 100 });
}

function makeAnthropic(
  responder: (userMessage: string) => string,
): { client: AnthropicLike; calls: Array<{ model: string; userMessage: string }> } {
  const calls: Array<{ model: string; userMessage: string }> = [];
  const client: AnthropicLike = {
    messages: {
      create: async (params) => {
        const userMessage = params.messages[0].content;
        calls.push({ model: params.model, userMessage });
        return { content: [{ type: "text", text: responder(userMessage) }] };
      },
    },
  };
  return { client, calls };
}

describe("ClaimLinker.scoreClaims", () => {
  test("scores supported claims as 'ok'", async () => {
    const { client } = makeAnthropic(
      () => '{"score": 0.92, "rationale": "Abstract directly states the 15-20% VAT figure."}',
    );
    const linker = new ClaimLinker({
      pubmed: makePubmedClient(),
      anthropic: client,
      registry: REGISTRY,
    });

    const claims = [
      { path: "hero_stats[0]", claim_text: "VAT reduction: 15-20%", cite_ids: ["falutz-2007"] },
    ];
    const results = await linker.scoreClaims(claims);

    expect(results).toHaveLength(1);
    expect(results[0].score).toBe(0.92);
    expect(results[0].verdict).toBe("ok");
    expect(results[0].resolved).toEqual([{ citation_id: "falutz-2007", pmid: "18057338" }]);
  });

  test("buckets partial-support claims as 'partial'", async () => {
    const { client } = makeAnthropic(
      () => '{"score": 0.7, "rationale": "Topic relevant but exact figure not in abstract."}',
    );
    const linker = new ClaimLinker({
      pubmed: makePubmedClient(),
      anthropic: client,
      registry: REGISTRY,
    });
    const r = await linker.scoreClaims([
      { path: "x", claim_text: "y", cite_ids: ["falutz-2007"] },
    ]);
    expect(r[0].verdict).toBe("partial");
  });

  test("buckets unsupported claims as 'unsupported'", async () => {
    const { client } = makeAnthropic(
      () => '{"score": 0.2, "rationale": "Abstract is off-topic."}',
    );
    const linker = new ClaimLinker({
      pubmed: makePubmedClient(),
      anthropic: client,
      registry: REGISTRY,
    });
    const r = await linker.scoreClaims([
      { path: "x", claim_text: "y", cite_ids: ["falutz-2007"] },
    ]);
    expect(r[0].verdict).toBe("unsupported");
  });

  test("skips claims whose only citations have no PMID — no Anthropic call made", async () => {
    const { client, calls } = makeAnthropic(
      () => '{"score": 1, "rationale": "should not be called"}',
    );
    const linker = new ClaimLinker({
      pubmed: makePubmedClient(),
      anthropic: client,
      registry: REGISTRY,
    });
    const r = await linker.scoreClaims([
      { path: "x", claim_text: "y", cite_ids: ["stripped-cite", "fda-label"] },
    ]);
    expect(r[0].verdict).toBe("skipped");
    expect(r[0].score).toBeNull();
    expect(r[0].resolved).toEqual([
      { citation_id: "stripped-cite", pmid: null },
      { citation_id: "fda-label", pmid: null },
    ]);
    expect(calls).toHaveLength(0);
  });

  test("uses default Haiku model", async () => {
    const { client, calls } = makeAnthropic(() => '{"score": 0.9, "rationale": "x"}');
    const linker = new ClaimLinker({
      pubmed: makePubmedClient(),
      anthropic: client,
      registry: REGISTRY,
    });
    await linker.scoreClaims([
      { path: "x", claim_text: "y", cite_ids: ["falutz-2007"] },
    ]);
    expect(calls[0].model).toBe("claude-haiku-4-5");
  });

  test("caches abstracts so repeat-cited papers cost one network call", async () => {
    let abstractFetches = 0;
    const fetchFn: FetchFn = async () => {
      abstractFetches += 1;
      return new Response(FALUTZ_ABSTRACT, { status: 200 });
    };
    const pubmed = new PubmedClient({ fetchFn, rateLimit: 100 });
    const { client } = makeAnthropic(() => '{"score": 0.9, "rationale": "x"}');
    const linker = new ClaimLinker({ pubmed, anthropic: client, registry: REGISTRY });

    await linker.scoreClaims([
      { path: "a", claim_text: "claim A", cite_ids: ["falutz-2007"] },
      { path: "b", claim_text: "claim B", cite_ids: ["falutz-2007"] },
      { path: "c", claim_text: "claim C", cite_ids: ["falutz-2007"] },
    ]);

    expect(abstractFetches).toBe(1);
  });

  test("handles malformed Claude response by scoring 0 with rationale", async () => {
    const { client } = makeAnthropic(() => "this is not JSON at all");
    const linker = new ClaimLinker({
      pubmed: makePubmedClient(),
      anthropic: client,
      registry: REGISTRY,
    });
    const r = await linker.scoreClaims([
      { path: "x", claim_text: "y", cite_ids: ["falutz-2007"] },
    ]);
    expect(r[0].score).toBe(0);
    expect(r[0].verdict).toBe("unsupported");
    expect(r[0].rationale).toContain("parse");
  });

  test("handles Anthropic API throws by scoring 0 with API-error rationale", async () => {
    const client: AnthropicLike = {
      messages: {
        create: async () => {
          throw new Error("rate limit exceeded");
        },
      },
    };
    const linker = new ClaimLinker({
      pubmed: makePubmedClient(),
      anthropic: client,
      registry: REGISTRY,
    });
    const r = await linker.scoreClaims([
      { path: "x", claim_text: "y", cite_ids: ["falutz-2007"] },
    ]);
    expect(r[0].score).toBe(0);
    expect(r[0].rationale).toContain("API error");
  });
});
