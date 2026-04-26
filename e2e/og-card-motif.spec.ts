import { expect, test } from "@playwright/test";

/* =========================================================
   E2E: /p/[slug]/opengraph-image visual regression.

   D16 unified the motif geometry math into a single shared
   buildMotifNodes() in lib/peptide-motif.tsx. The OG card and
   the in-page render now derive from the same pure function.

   This spec sits one level above the unit-snapshot test in
   test/lib/peptide-motif-svg.test.tsx — it actually fetches
   the rendered PNG from the live server and (eventually) does
   a pixel diff against a baseline.

   On first runs (or when no baseline exists), we only assert
   200 OK + non-empty PNG bytes. Once a maintainer captures a
   baseline (`bun run test:e2e --update-snapshots`), the visual
   snapshot assertion takes over and catches drift.
   ========================================================= */

test.describe("OG card motif (D16)", () => {
  test("/p/tesamorelin/opengraph-image returns a valid PNG", async ({
    request,
  }) => {
    const res = await request.get("/p/tesamorelin/opengraph-image");
    expect(res.status()).toBe(200);

    const contentType = res.headers()["content-type"] ?? "";
    expect(contentType).toContain("image/png");

    const body = await res.body();
    expect(body.length).toBeGreaterThan(0);
    // PNG magic number: 89 50 4E 47 0D 0A 1A 0A.
    expect(body[0]).toBe(0x89);
    expect(body[1]).toBe(0x50);
    expect(body[2]).toBe(0x4e);
    expect(body[3]).toBe(0x47);
  });

  test("/p/tesamorelin/opengraph-image visual snapshot", async ({ page }) => {
    // Visit the OG endpoint as a page so Playwright can screenshot
    // the rendered image (browsers display image responses inline).
    await page.goto("/p/tesamorelin/opengraph-image");
    const screenshot = await page.screenshot({ fullPage: true });
    // First run: writes the baseline. Subsequent runs: diffs against it.
    // If the baseline doesn't exist yet, run with `--update-snapshots`.
    expect(screenshot).toMatchSnapshot("og-card-tesamorelin.png", {
      // Allow tiny noise from font hinting / antialiasing across machines.
      maxDiffPixelRatio: 0.01,
    });
  });
});
