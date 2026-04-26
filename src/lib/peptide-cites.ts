import "server-only";
import type { Peptide } from "./schemas/peptide";

/* Walk a peptide profile and collect every citation ID it references.
   Mirrors the walker in lib/content.ts but exposed as a public helper
   so the /v2/* design pages can render a "references used" appendix
   without bypassing the cite[] convention. Returns a sorted array. */
export function citationsUsedBy(p: Peptide): string[] {
  const set = new Set<string>();
  walk(p, set);
  return [...set].sort();
}

function walk(node: unknown, set: Set<string>): void {
  if (!node) return;
  if (Array.isArray(node)) {
    for (const item of node) walk(item, set);
    return;
  }
  if (typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (
      Array.isArray(obj.cite) &&
      obj.cite.every((x) => typeof x === "string")
    ) {
      for (const id of obj.cite as string[]) set.add(id);
    }
    for (const v of Object.values(obj)) walk(v, set);
  }
}
