import type { Peptide } from "./schemas/peptide";

/* =========================================================
   Build-time peptide stats: count cited vs uncited claims so
   the trust promise of PeptideDB is mechanically queryable.
   ========================================================= */

export interface PeptideStats {
  /** Total CitableValue fields across all sections. */
  total_claims: number;
  /** Subset of total_claims that have at least one citation. */
  cited_claims: number;
  /** total_claims - cited_claims. UI surfaces this as "uncited". */
  uncited_claims: number;
  /** Total citation references (sum of cite[].length across all CitableValues). */
  citation_density: number;
  /** 0..1 ratio cited/total. Drives the UI confidence indicator. */
  citation_ratio: number;
  /** Names of fields with no citation. Surfaced as "open contributions". */
  uncited_fields: string[];
}

/**
 * Walk a peptide and count cited vs uncited CitableValues.
 * Recognised by the post-Zod-parse object shape `{ value, cite }`.
 * Plain-string labels (parameter names, headings) are NOT counted —
 * only claim-bearing fields.
 */
export function computePeptideStats(p: Peptide): PeptideStats {
  let total = 0;
  let cited = 0;
  let density = 0;
  const uncited: string[] = [];

  function visit(node: unknown, path: string): void {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach((item, i) => visit(item, `${path}[${i}]`));
      return;
    }
    if (typeof node === "object") {
      const obj = node as Record<string, unknown>;
      // CitableValue post-parse always carries `value: string` + `cite: array`
      if (
        typeof obj.value === "string" &&
        Array.isArray(obj.cite)
      ) {
        total += 1;
        const refs = obj.cite as string[];
        density += refs.length;
        if (refs.length > 0) cited += 1;
        else uncited.push(path);
        // Continue walking to catch nested objects within (none today, but safe)
      }
      // hero_stats[*].cite is also a citation slot
      if (
        typeof obj.label === "string" &&
        typeof obj.value === "string" &&
        Array.isArray(obj.cite)
      ) {
        // Already counted above (objects with value+cite). Skip to avoid dup.
      }
      // StackProtocol carries its own cite[] directly — count that too
      if (Array.isArray(obj.cite) && typeof obj.synergy === "string") {
        // Stack-level citations
        density += (obj.cite as string[]).length;
      }
      for (const [k, v] of Object.entries(obj)) {
        visit(v, path ? `${path}.${k}` : k);
      }
    }
  }

  visit(p.mechanism, "mechanism");
  visit(p.dosage, "dosage");
  if (p.fat_loss) visit(p.fat_loss, "fat_loss");
  visit(p.side_effects, "side_effects");
  visit(p.administration, "administration");
  if (p.synergy) visit(p.synergy, "synergy");
  visit(p.hero_stats, "hero_stats");

  return {
    total_claims: total,
    cited_claims: cited,
    uncited_claims: total - cited,
    citation_density: density,
    citation_ratio: total === 0 ? 0 : cited / total,
    uncited_fields: uncited,
  };
}
