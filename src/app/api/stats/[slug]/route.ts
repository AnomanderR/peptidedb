import { NextResponse } from "next/server";
import { getPeptide, loadAllPeptides } from "@/lib/content";
import { computePeptideStats } from "@/lib/peptide-stats";

export const dynamic = "force-static";

export function generateStaticParams() {
  return loadAllPeptides().map((p) => ({ slug: p.slug }));
}

/**
 * GET /api/stats/[slug] — exhaustive citation audit for a single peptide.
 * Returns the same totals as /api/peptides/[slug].stats, plus the full
 * list of uncited field paths so contributors and reviewers can see
 * exactly what claims need citation work. Used as a transparency surface
 * to verify the trust-metric vs visible-content invariant externally.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const p = getPeptide(slug);
  if (!p) {
    return NextResponse.json(
      { error: "peptide not found", slug },
      { status: 404 },
    );
  }
  const stats = computePeptideStats(p);
  return NextResponse.json(
    {
      slug: p.slug,
      name: p.name,
      total_claims: stats.total_claims,
      cited_claims: stats.cited_claims,
      uncited_claims: stats.uncited_claims,
      citation_density: stats.citation_density,
      citation_ratio: Math.round(stats.citation_ratio * 1000) / 1000,
      uncited_fields: stats.uncited_fields,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
