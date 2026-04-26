import { expect, test } from "@playwright/test";

/* =========================================================
   E2E: ReconstitutionCalculator a11y scan.

   Phase 3.3 wired <label htmlFor> connections on the three
   numeric inputs (mass mg, water mL, dose mcg). The unit test
   in test/components/ReconstitutionCalculator.test.tsx already
   runs jest-axe against the same component surface in isolation
   — that catches the structural violations.

   Eventually we'd run @axe-core/playwright against the rendered
   page to also catch context-dependent issues (label collisions
   with the rest of the plate page, focus-management when the
   calculator is in the middle of a long document, etc.). That
   package is NOT yet installed in this repo as of Phase 3:
     `bun add -D @axe-core/playwright`
   When added, replace the smoke-test below with the full scan.

   For now the spec just confirms the component renders on the
   tesamorelin plate and exposes its three labels as accessible
   form fields. That's the same contract the unit test covers,
   re-asserted at the integration boundary.
   ========================================================= */

test.describe("ReconstitutionCalculator a11y (smoke)", () => {
  test("plate page exposes three labelled numeric inputs", async ({
    page,
  }) => {
    await page.goto("/p/tesamorelin");

    const massInput = page.getByLabel(/Lyophilized peptide in vial/i);
    const waterInput = page.getByLabel(/Bacteriostatic water added/i);
    const doseInput = page.getByLabel(/Desired dose/i);

    await expect(massInput).toBeVisible();
    await expect(waterInput).toBeVisible();
    await expect(doseInput).toBeVisible();

    // Each input is a number control. Playwright resolves
    // <input type="number"> via the spinbutton role.
    await expect(massInput).toHaveAttribute("type", "number");
    await expect(waterInput).toHaveAttribute("type", "number");
    await expect(doseInput).toHaveAttribute("type", "number");
  });
});
