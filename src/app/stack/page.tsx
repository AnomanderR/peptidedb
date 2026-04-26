import type { Metadata } from "next";
import { loadAllPeptides } from "@/lib/content";
import { StackDesigner } from "@/components/stack/StackDesigner";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Stack designer",
  description:
    "Build a peptide stack interactively. Search the catalog, add peptides, see structural conflict warnings + recognised synergies, share the URL.",
  alternates: { canonical: "/stack" },
};

export default function StackPage() {
  const peptides = loadAllPeptides().map((p) => ({
    slug: p.slug,
    name: p.name,
    peptide_class: p.peptide_class,
    classification: p.classification,
    color: p.color,
    aliases: p.aliases,
    evidence_level: p.evidence_level,
    categories: p.categories,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
      <header className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          <span className="size-1.5 rounded-full bg-[#a78bfa]" />
          Interactive stack builder
        </div>
        <h1 className="mt-6 text-[40px] sm:text-[52px] leading-[1.05] font-semibold tracking-tight text-[var(--color-text)]">
          Design your stack with structural guardrails.
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-secondary)] max-w-2xl">
          Click peptides from the catalog to add them. PeptideDB runs a
          rule-based conflict check and surfaces recognised synergies from the
          documented literature. Every selection is encoded in the URL —
          shareable instantly.
        </p>
      </header>

      <StackDesigner peptides={peptides} />

      <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#a78bfa] mb-3">
            Rule-based, not AI
          </div>
          <h3 className="text-[16px] font-semibold text-[var(--color-text)]">
            Conflict checks come from the schema
          </h3>
          <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            Multiple GLP-1 RAs, two GHRPs at once, melanocortin overlap, GH-axis
            with angiogenic peptides — every rule is deterministic, auditable,
            and visible at <code className="font-mono text-[12px] text-[var(--color-accent)]">src/lib/stack-conflicts.ts</code>.
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-tesamorelin)] mb-3">
            Synergies surfaced
          </div>
          <h3 className="text-[16px] font-semibold text-[var(--color-text)]">
            Documented stacks light up
          </h3>
          <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            When you add two peptides that have a documented synergy in our
            content (e.g. GHRH + GHRP), the designer flags the recognised stack
            with the citation that supports it.
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-accent)] mb-3">
            Disclaimer
          </div>
          <h3 className="text-[16px] font-semibold text-[var(--color-text)]">
            Research reference, not medical advice
          </h3>
          <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            Conflict rules cover structural class-level concerns. Individual
            decisions about dose, timing, monitoring, and contraindications
            require your own literature review and a licensed clinician.
          </p>
        </div>
      </section>
    </div>
  );
}
