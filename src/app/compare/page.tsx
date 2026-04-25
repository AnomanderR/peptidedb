import type { Metadata } from "next";
import { loadAllPeptides } from "@/lib/content";
import { ComparePicker } from "@/components/compare/ComparePicker";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Compare peptides",
  description: "Pick any two or three research peptides for side-by-side comparison.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  const peptides = loadAllPeptides().map((p) => ({
    slug: p.slug,
    name: p.name,
    peptide_class: p.peptide_class,
    classification: p.classification,
    color: p.color,
    aliases: p.aliases,
    evidence_level: p.evidence_level,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 lg:py-20">
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          <span className="size-1.5 rounded-full bg-[var(--color-tesamorelin)]" />
          Side-by-side comparison
        </div>
        <h1 className="mt-6 text-[40px] sm:text-[52px] leading-[1.05] font-semibold tracking-tight text-[var(--color-text)]">
          Compare any two peptides at the parameter level.
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-secondary)] max-w-2xl">
          Pick the peptides you want to compare. PeptideDB lines them up
          parameter-by-parameter — mechanism, dosage, evidence, side effects,
          and stack synergies — with citations on every claim.
        </p>
      </header>

      <div className="mt-10">
        <ComparePicker peptides={peptides} />
      </div>
    </div>
  );
}
