import type { Metadata } from "next";
import { AskPanel } from "@/components/ask/AskPanel";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Ask PeptideDB",
  description:
    "Ask a research question about peptides. Answers are grounded only in the PeptideDB content + citations — no hallucination.",
  alternates: { canonical: "/ask" },
};

export default function AskPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 lg:py-16">
      <header className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          <span className="size-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          Grounded · No hallucination · Cited
        </div>
        <h1 className="mt-6 text-[40px] sm:text-[52px] leading-[1.05] font-semibold tracking-tight text-[var(--color-text)]">
          Ask <span className="text-[var(--color-accent)]">PeptideDB</span>.
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-secondary)] max-w-2xl">
          Powered by Claude Sonnet, restricted to PeptideDB content. Every claim
          links to its source paper. The assistant declines to speculate beyond
          the catalog.
        </p>
      </header>

      <AskPanel />

      <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-accent)] mb-3">
            Grounded retrieval
          </div>
          <h3 className="text-[16px] font-semibold text-[var(--color-text)]">
            Only your YAML files
          </h3>
          <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            The retriever scores keyword overlap against every peptide profile,
            picks the top 6, and passes them as context. Claude is instructed
            to refuse claims not in that context.
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-tesamorelin)] mb-3">
            Cited inline
          </div>
          <h3 className="text-[16px] font-semibold text-[var(--color-text)]">
            Every claim, traceable
          </h3>
          <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            Cite IDs like <code className="font-mono text-[12px] text-[var(--color-accent)]">falutz-2007</code> render
            as live chips. They link to the canonical source paper via PubMed,
            DOI, or ClinicalTrials.gov.
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-badge-red)] mb-3">
            Disclaimer
          </div>
          <h3 className="text-[16px] font-semibold text-[var(--color-text)]">
            Research, not medical advice
          </h3>
          <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            The assistant is configured to refuse medical-advice requests and
            point you to a licensed clinician. Use it as a research-literature
            companion, not a prescription source.
          </p>
        </div>
      </section>
    </div>
  );
}
