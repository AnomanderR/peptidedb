import { z } from "zod";

/* =========================================================
   Citation registry schema
   content/refs.yaml is a flat object keyed by stable ID.
   IDs follow the form "<lead-author-lastname>-<year>" or
   "<org>-<doc-type>-<year>" for non-paper sources.
   ========================================================= */

export const Citation = z.object({
  /** Stable ID. Don't change once published — breaks links. */
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9][a-z0-9-]*$/, "citation ID must be lowercase + hyphens"),

  /** Citation type. Drives link generation + display. */
  type: z.enum([
    "journal",
    "preprint",
    "fda-label",
    "fda-letter",
    "clinical-trial",
    "book",
    "website",
    "patent",
  ]),

  /** Authors (last name, first initial). e.g. "Falutz J" */
  authors: z.array(z.string()).optional(),

  /** Display title. */
  title: z.string().min(4),

  /** Publication venue. e.g. "N Engl J Med". */
  journal: z.string().optional(),

  /** Publication year. */
  year: z.number().int().min(1900).max(2100),

  /** Volume / issue / pages. Free-form. */
  citation_string: z.string().optional(),

  /** PubMed ID — auto-generates URL https://pubmed.ncbi.nlm.nih.gov/<pmid>/ */
  pmid: z.string().regex(/^\d+$/).optional(),

  /** DOI — auto-generates URL https://doi.org/<doi> */
  doi: z.string().optional(),

  /** ClinicalTrials.gov NCT identifier */
  nct: z.string().regex(/^NCT\d+$/).optional(),

  /** Direct URL override. Use only when no PMID/DOI/NCT. */
  url: z.string().url().optional(),

  /**
   * Russian-tradition journal reference. Use for Khavinson-school /
   * St. Petersburg Institute of Bioregulation and Gerontology citations
   * that aren't PubMed-indexed. Free-form citation string in canonical
   * form (e.g., "Bull Exp Biol Med 2002;134(2):81-3 (Russian)").
   *
   * Tags the citation as Russian-tradition for the DESIGN.md § 14
   * conditional framing line on bioregulator plates. A citation may
   * have BOTH a `pmid` and a `russian_journal_ref` (a few Khavinson
   * papers are PubMed-indexed); the framing line still fires when
   * any cited reference has the russian_journal_ref tag.
   */
  russian_journal_ref: z.string().optional(),

  /** Short pull-quote / context note. Optional. */
  note: z.string().optional(),
});
export type Citation = z.infer<typeof Citation>;

/** content/refs.yaml top-level shape: { "<id>": Citation, ... } */
export const CitationRegistry = z.record(z.string(), Citation);
export type CitationRegistry = z.infer<typeof CitationRegistry>;
