import { describe, expect, test } from "bun:test";
import {
  computeEvidenceTier,
  isKhavinsonTradition,
} from "@/lib/peptide-stats";
import type { Peptide } from "@/lib/schemas/peptide";
import type { Citation, CitationRegistry } from "@/lib/schemas/citation";

/* =========================================================
   Phase 4 derived fields:
     - computeEvidenceTier(p): EvidenceTier
     - isKhavinsonTradition(p, registry): boolean

   Both are derived at build/render time and never stored in YAML —
   keeps a single source of truth (per-section evidence_level fields
   and registry russian_journal_ref tags).
   ========================================================= */

const basePeptide: Peptide = {
  schema_version: 1,
  slug: "test-peptide",
  name: "Test Peptide",
  peptide_class: "Test Class",
  evidence_level: "theoretical",
  fda_approved: false,
  last_reviewed: "2026-04-27",
  summary: { value: "Test", cite: [] },
  hero_stats: [
    { value: "1 mg", label: "Dose", cite: [] },
    { value: "Phase 1", label: "Evidence", cite: [] },
    { value: "1 hr", label: "Half-life", cite: [] },
  ],
  hero_route: { value: "SQ · Site · Daily", cite: [] },
  mechanism: {
    primary_target: { value: "Receptor X", cite: [] },
    pathway: { value: "A → B", cite: [] },
    downstream_effect: { value: "Outcome", cite: [] },
  },
  dosage: { rows: [{ parameter: "Dose", value: { value: "1 mg", cite: [] } }] },
  side_effects: {
    rows: [{ parameter: "Effect", value: { value: "Mild", cite: [] } }],
  },
  administration: {
    steps: [{ title: "Inject", body: "Inject SQ.", cite: [] }],
  },
  categories: [],
  aliases: [],
  color: "blue",
  contributors: [],
  maturity: "auto-drafted",
};

describe("computeEvidenceTier — peptide-level rollup", () => {
  test("fda-approved peptide rolls up to 'fda-approved' tier", () => {
    expect(computeEvidenceTier({ ...basePeptide, evidence_level: "fda-approved" })).toBe(
      "fda-approved",
    );
  });

  test("phase-3 / phase-2 / phase-1 all roll up to 'clinical'", () => {
    expect(computeEvidenceTier({ ...basePeptide, evidence_level: "phase-3" })).toBe("clinical");
    expect(computeEvidenceTier({ ...basePeptide, evidence_level: "phase-2" })).toBe("clinical");
    expect(computeEvidenceTier({ ...basePeptide, evidence_level: "phase-1" })).toBe("clinical");
  });

  test("animal-strong + animal-mechanistic + human-mechanistic roll up to 'animal'", () => {
    expect(computeEvidenceTier({ ...basePeptide, evidence_level: "animal-strong" })).toBe("animal");
    expect(computeEvidenceTier({ ...basePeptide, evidence_level: "animal-mechanistic" })).toBe("animal");
    expect(computeEvidenceTier({ ...basePeptide, evidence_level: "human-mechanistic" })).toBe("animal");
  });

  test("theoretical rolls up to 'theoretical'", () => {
    expect(computeEvidenceTier({ ...basePeptide, evidence_level: "theoretical" })).toBe("theoretical");
  });

  test("takes max across peptide-level + fat_loss section evidence_level", () => {
    const p: Peptide = {
      ...basePeptide,
      evidence_level: "theoretical",
      fat_loss: {
        evidence_strength: 80,
        evidence_level: "phase-3",
        evidence_meta: { value: "Pivotal RCT", cite: [] },
        rows: [],
      },
    };
    expect(computeEvidenceTier(p)).toBe("clinical");
  });

  test("does not downgrade if section evidence is weaker than peptide-level", () => {
    const p: Peptide = {
      ...basePeptide,
      evidence_level: "fda-approved",
      fat_loss: {
        evidence_strength: 40,
        evidence_level: "animal-mechanistic",
        evidence_meta: { value: "Preclinical exploratory", cite: [] },
        rows: [],
      },
    };
    expect(computeEvidenceTier(p)).toBe("fda-approved");
  });
});

/* =========================================================
   isKhavinsonTradition — cite-driven detection
   ========================================================= */

const russianRef: Citation = {
  id: "khavinson-2002-thymalin",
  type: "journal",
  title: "Peptides and Ageing",
  year: 2002,
  russian_journal_ref: "Bull Exp Biol Med 2002 (Russian)",
};

const westernRef: Citation = {
  id: "falutz-2007",
  type: "journal",
  title: "Tesamorelin RCT",
  year: 2007,
  pmid: "18057338",
};

const registry: CitationRegistry = {
  "khavinson-2002-thymalin": russianRef,
  "falutz-2007": westernRef,
};

function withSummaryCite(ids: string[]): Peptide {
  return {
    ...basePeptide,
    summary: { value: "x", cite: ids },
  };
}

describe("isKhavinsonTradition", () => {
  test("returns true when ANY cited ref has russian_journal_ref", () => {
    expect(isKhavinsonTradition(withSummaryCite(["khavinson-2002-thymalin"]), registry)).toBe(true);
  });

  test("returns true even if a Western citation is also cited", () => {
    expect(
      isKhavinsonTradition(
        withSummaryCite(["falutz-2007", "khavinson-2002-thymalin"]),
        registry,
      ),
    ).toBe(true);
  });

  test("returns false when only Western (PMID-only) citations are used", () => {
    expect(isKhavinsonTradition(withSummaryCite(["falutz-2007"]), registry)).toBe(false);
  });

  test("returns false when peptide cites nothing", () => {
    expect(isKhavinsonTradition(withSummaryCite([]), registry)).toBe(false);
  });

  test("returns false when cited IDs are not in the registry", () => {
    expect(isKhavinsonTradition(withSummaryCite(["unknown-id"]), registry)).toBe(false);
  });

  test("walks deeply — finds russian_journal_ref in stack cite[]", () => {
    const p: Peptide = {
      ...basePeptide,
      synergy: {
        stacks: [
          {
            partner_slug: "thymalin",
            partner_label: "Thymalin",
            synergy: "moderate",
            rationale: "x".repeat(50),
            protocol: { dosing: "1 mg" },
            primary_benefit: "synergy",
            cite: ["khavinson-2002-thymalin"],
          },
        ],
      },
    };
    expect(isKhavinsonTradition(p, registry)).toBe(true);
  });
});
