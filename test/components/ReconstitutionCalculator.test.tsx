import { afterEach, describe, expect, test } from "bun:test";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ReconstitutionCalculator } from "@/components/peptide/ReconstitutionCalculator";

/* =========================================================
   ReconstitutionCalculator tests — Phase 3.3.

   Three coordinated guarantees:
   1. Each <input> has a visible <label htmlFor> connection
      (canonical accessible pattern, not just aria-label).
   2. The numeric pipeline still computes the right output.
   3. axe-core scan: no accessibility violations.
   ========================================================= */

afterEach(() => {
  cleanup();
});

describe("ReconstitutionCalculator", () => {
  test("renders three visible labels wired to their inputs via htmlFor", () => {
    render(
      <ReconstitutionCalculator
        peptideName="Tesamorelin"
        pigment="#2A6F77"
        defaultMg={5}
      />,
    );

    const mass = screen.getByLabelText(/Lyophilized peptide in vial/i);
    const water = screen.getByLabelText(/Bacteriostatic water added/i);
    const dose = screen.getByLabelText(/Desired dose/i);

    expect(mass).toBeInTheDocument();
    expect(water).toBeInTheDocument();
    expect(dose).toBeInTheDocument();

    // All three are <input type="number">.
    expect(mass.tagName).toBe("INPUT");
    expect((mass as HTMLInputElement).type).toBe("number");
    expect((water as HTMLInputElement).type).toBe("number");
    expect((dose as HTMLInputElement).type).toBe("number");
  });

  test("each input's id matches the label's htmlFor (explicit pairing)", () => {
    const { container } = render(
      <ReconstitutionCalculator
        peptideName="Tesamorelin"
        pigment="#2A6F77"
        defaultMg={5}
      />,
    );
    const labels = container.querySelectorAll<HTMLLabelElement>("label[for]");
    expect(labels).toHaveLength(3);

    for (const lab of Array.from(labels)) {
      const targetId = lab.getAttribute("for")!;
      const input = container.querySelector<HTMLInputElement>(`#${CSS.escape(targetId)}`);
      expect(input).not.toBeNull();
      expect(input!.tagName).toBe("INPUT");
    }
  });

  test("aria-label is preserved on all three inputs (defense in depth)", () => {
    render(
      <ReconstitutionCalculator
        peptideName="Tesamorelin"
        pigment="#2A6F77"
        defaultMg={5}
      />,
    );
    expect(
      screen.getByRole("spinbutton", {
        name: "Peptide mass in milligrams",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", {
        name: "Diluent volume in millilitres",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", {
        name: "Target dose in micrograms",
      }),
    ).toBeInTheDocument();
  });

  test("computes volume per dose for default inputs (5 mg / 2 mL / 250 mcg)", () => {
    render(
      <ReconstitutionCalculator
        peptideName="Tesamorelin"
        pigment="#2A6F77"
        defaultMg={5}
      />,
    );
    // 5 mg = 5000 mcg; in 2 mL → 2500 mcg/mL; 250 mcg → 0.100 mL.
    expect(screen.getByText("0.100")).toBeInTheDocument();
    // ≈ 10.0 IU on a U-100 syringe.
    expect(screen.getByText("10.0")).toBeInTheDocument();
  });

  test("recomputes when the user edits the mass input", () => {
    render(
      <ReconstitutionCalculator
        peptideName="Tesamorelin"
        pigment="#2A6F77"
        defaultMg={5}
      />,
    );
    const mass = screen.getByLabelText(
      /Lyophilized peptide in vial/i,
    ) as HTMLInputElement;
    fireEvent.change(mass, { target: { value: "10" } });
    // 10 mg / 2 mL / 250 mcg → 0.050 mL → 5.0 IU.
    expect(screen.getByText("0.050")).toBeInTheDocument();
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });

  test("invalid (zero) inputs render the empty-state guidance", () => {
    render(
      <ReconstitutionCalculator
        peptideName="Tesamorelin"
        pigment="#2A6F77"
        defaultMg={5}
      />,
    );
    const mass = screen.getByLabelText(
      /Lyophilized peptide in vial/i,
    ) as HTMLInputElement;
    fireEvent.change(mass, { target: { value: "0" } });
    expect(
      screen.getByText(/Enter positive values for all three inputs/i),
    ).toBeInTheDocument();
  });

  test("axe-core: no a11y violations", async () => {
    const { container } = render(
      <ReconstitutionCalculator
        peptideName="Tesamorelin"
        pigment="#2A6F77"
        defaultMg={5}
      />,
    );
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});
