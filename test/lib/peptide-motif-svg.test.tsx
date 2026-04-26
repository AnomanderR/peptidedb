import { describe, expect, test } from "bun:test";
import { buildMotifNodes } from "@/lib/peptide-motif";

/* =========================================================
   D16 regression snapshot — ensures the unified motif geometry
   stays byte-identical across releases, so the in-page motif
   and the OG card share card cannot drift apart.

   Note: we cannot snapshot the rendered OG-card SVG directly in
   unit-test land — opengraph-image.tsx is server-only and uses
   `next/og` (Satori), which is a Node-runtime image generator
   that requires a running Next.js server to invoke. Instead we
   snapshot the geometry data structure itself, which both the
   in-page <PeptideMotif> and the OG card consume verbatim. If
   this changes, both surfaces change in lockstep — that's the
   D16 contract.

   The geometry-affecting attributes (cx, cy, x1/y1/x2/y2, r) on
   the rendered SVG are 1:1 derivatives of these node coords:
   - <circle cx={n.x} cy={n.y} ... />
   - <line x1={n.x} y1={n.y} x2={next.x} y2={next.y} ... />
   - <line x1={n.x} y1={n.y} x2={n.x2} y2={n.y2} ... /> (spokes)
   ========================================================= */

describe("D16 motif geometry regression", () => {
  test("tesamorelin @ 280 — locked snapshot for share card parity", () => {
    const g = buildMotifNodes("tesamorelin", 280);
    expect(g).toMatchSnapshot();
  });

  test("tesamorelin @ 200 (in-page default) — locked snapshot", () => {
    const g = buildMotifNodes("tesamorelin", 200);
    expect(g).toMatchSnapshot();
  });

  test("bpc-157 @ 280 — distinct fingerprint, locked snapshot", () => {
    const g = buildMotifNodes("bpc-157", 280);
    expect(g).toMatchSnapshot();
  });

  test("ss-31 @ 280 — distinct fingerprint, locked snapshot", () => {
    const g = buildMotifNodes("ss-31", 280);
    expect(g).toMatchSnapshot();
  });
});
