import { NextResponse } from "next/server";
import { loadAllPeptides } from "@/lib/content";
import { computePeptideStats } from "@/lib/peptide-stats";

export const dynamic = "force-static";

/**
 * GET /api/peptides — list of all peptides (slim form).
 * Each entry includes citation stats so consumers can rank by trust.
 */
export async function GET() {
  const peptides = loadAllPeptides().map((p) => {
    const stats = computePeptideStats(p);
    return {
      slug: p.slug,
      name: p.name,
      peptide_class: p.peptide_class,
      classification: p.classification,
      categories: p.categories,
      color: p.color,
      summary: p.summary.value,
      summary_cite: p.summary.cite,
      evidence_level: p.evidence_level,
      maturity: p.maturity,
      fda_approved: p.fda_approved,
      last_reviewed: p.last_reviewed,
      stats: {
        total_claims: stats.total_claims,
        cited_claims: stats.cited_claims,
        uncited_claims: stats.uncited_claims,
        citation_density: stats.citation_density,
        citation_ratio: Math.round(stats.citation_ratio * 100) / 100,
      },
    };
  });
  return NextResponse.json(
    { count: peptides.length, peptides },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
