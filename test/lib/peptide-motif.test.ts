import { describe, expect, test } from "bun:test";
import { buildMotifNodes } from "@/lib/peptide-motif";

/* =========================================================
   Unit tests for buildMotifNodes — D16 single source of truth
   for the 12-node hex coat-of-arms motif geometry.

   Two consumers depend on this: <PeptideMotif> in lib/peptide-motif.tsx
   and the OG card in app/p/[slug]/opengraph-image.tsx. If this
   regresses the share cards drift visually from the in-page render
   (the exact failure mode Codex flagged in the D16 review).
   ========================================================= */

describe("buildMotifNodes", () => {
  test("returns the canonical 12-node geometry shape", () => {
    const g = buildMotifNodes("tesamorelin", 280);

    expect(g.nodes).toHaveLength(12);
    expect(g.cx).toBe(140);
    expect(g.cy).toBe(140);
    expect(g.ringR).toBeCloseTo(280 * 0.34, 6);
    expect(g.innerR).toBeCloseTo(280 * 0.18, 6);
    expect(typeof g.hash).toBe("number");
    expect(typeof g.seedRingDash).toBe("string");
    expect(typeof g.seedRotation).toBe("number");
    // seedRotation = (h >> 8) % 60. JS's signed >> can produce a
    // negative remainder when the unsigned hash has bit 31 set; the
    // CSS rotate() consumer accepts negative degrees fine, so the
    // contract is just |seedRotation| < 60, not 0 ≤ seedRotation.
    expect(Math.abs(g.seedRotation)).toBeLessThan(60);
  });

  test("every node has the expected shape", () => {
    const g = buildMotifNodes("tesamorelin", 280);
    for (const n of g.nodes) {
      expect(typeof n.x).toBe("number");
      expect(typeof n.y).toBe("number");
      expect(typeof n.bigDot).toBe("boolean");
      // x2/y2 are nullable (only every 3rd node has an inner spoke).
      expect(n.x2 === null || typeof n.x2 === "number").toBe(true);
      expect(n.y2 === null || typeof n.y2 === "number").toBe(true);
    }
  });

  test("inner spokes appear on every 3rd node only", () => {
    const g = buildMotifNodes("tesamorelin", 280);
    g.nodes.forEach((n, i) => {
      if (i % 3 === 0) {
        expect(n.x2).not.toBeNull();
        expect(n.y2).not.toBeNull();
      } else {
        expect(n.x2).toBeNull();
        expect(n.y2).toBeNull();
      }
    });
  });

  test("same slug + same size produces identical output (deterministic)", () => {
    const a = buildMotifNodes("tesamorelin", 280);
    const b = buildMotifNodes("tesamorelin", 280);
    expect(a).toEqual(b);
  });

  test("same slug at different sizes scales cx/cy/radii but keeps hash stable", () => {
    const small = buildMotifNodes("tesamorelin", 64);
    const large = buildMotifNodes("tesamorelin", 280);
    expect(small.hash).toBe(large.hash);
    expect(small.cx).toBe(32);
    expect(large.cx).toBe(140);
    // bigDot toggle is hash-derived and size-independent
    small.nodes.forEach((n, i) => {
      expect(n.bigDot).toBe(large.nodes[i].bigDot);
    });
  });

  test("different slugs produce different geometry", () => {
    const a = buildMotifNodes("tesamorelin", 280);
    const b = buildMotifNodes("bpc-157", 280);
    expect(a.hash).not.toBe(b.hash);
    // At least one node position must differ — same hash would be
    // a vanishingly unlikely collision but still worth asserting.
    const anyNodeDiffers = a.nodes.some(
      (n, i) => n.x !== b.nodes[i].x || n.y !== b.nodes[i].y,
    );
    expect(anyNodeDiffers).toBe(true);
  });

  test("empty slug returns a valid (non-crashing) structure", () => {
    const g = buildMotifNodes("", 200);
    expect(g.nodes).toHaveLength(12);
    expect(g.cx).toBe(100);
    expect(g.cy).toBe(100);
    // FNV-1a offset basis for an empty input is the offset itself.
    expect(g.hash).toBe(0x811c9dc5);
  });

  test("seedRingDash matches the documented `${a} ${b}` format", () => {
    const g = buildMotifNodes("tesamorelin", 280);
    expect(g.seedRingDash).toMatch(/^\d+ \d+$/);
  });
});
