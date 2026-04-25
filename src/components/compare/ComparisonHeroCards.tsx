import { QuickCard } from "@/components/peptide/QuickCard";
import type { Peptide } from "@/lib/schemas/peptide";

/**
 * Side-by-side hero cards on a comparison page. Renders one QuickCard
 * per peptide. Layout: 1 col on mobile, N cols on lg.
 */
export function ComparisonHeroCards({ peptides }: { peptides: Peptide[] }) {
  const cols =
    peptides.length === 2
      ? "lg:grid-cols-2"
      : peptides.length === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-1";
  return (
    <section className={`grid grid-cols-1 ${cols} gap-6`}>
      {peptides.map((p) => (
        <QuickCard key={p.slug} peptide={p} />
      ))}
    </section>
  );
}
