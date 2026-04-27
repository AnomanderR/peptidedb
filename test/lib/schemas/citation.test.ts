import { describe, expect, test } from "bun:test";
import { Citation } from "@/lib/schemas/citation";

/* =========================================================
   Citation schema — Phase 4 additions.

   Adds russian_journal_ref as an optional free-form metadata
   field for Khavinson-tradition citations that aren't PubMed-
   indexed. Used by isKhavinsonTradition() in peptide-stats.ts
   to gate DESIGN.md § 14 conditional framing.
   ========================================================= */

const baseCite = {
  id: "khavinson-2002",
  type: "journal" as const,
  title: "Peptides and Ageing",
  year: 2002,
};

describe("russian_journal_ref (Phase 4)", () => {
  test("accepts a citation with russian_journal_ref and no pmid", () => {
    const r = Citation.safeParse({
      ...baseCite,
      russian_journal_ref: "Bull Exp Biol Med 2002;134(2):81-3 (Russian)",
    });
    expect(r.success).toBe(true);
  });

  test("accepts a citation with BOTH russian_journal_ref and pmid", () => {
    const r = Citation.safeParse({
      ...baseCite,
      pmid: "12490620",
      russian_journal_ref: "Neuroendocrinol Lett 2002;23(Suppl 3):11-44",
    });
    expect(r.success).toBe(true);
  });

  test("accepts a citation without russian_journal_ref (back-compat)", () => {
    const r = Citation.safeParse({ ...baseCite, pmid: "18057338" });
    expect(r.success).toBe(true);
  });

  test("rejects non-string russian_journal_ref", () => {
    const r = Citation.safeParse({
      ...baseCite,
      russian_journal_ref: 12345,
    });
    expect(r.success).toBe(false);
  });
});
