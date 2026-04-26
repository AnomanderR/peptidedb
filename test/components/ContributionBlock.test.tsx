import { describe, expect, test } from "bun:test";
import { render, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { ContributionBlock } from "@/components/site/ContributionBlock";

/*
 * Bun's test runner does not auto-clean RTL renders between tests, so each
 * test scopes its queries to its own render's container via `within(...)`.
 * That keeps queries from matching across prior renders that linger in the
 * shared happy-dom document.
 */

describe("<ContributionBlock />", () => {
  test("renders the three contribution affordances", () => {
    const { container } = render(<ContributionBlock slug="tesamorelin" />);
    const scope = within(container);
    expect(
      scope.getByRole("link", { name: /Edit tesamorelin on GitHub/ }),
    ).toBeInTheDocument();
    expect(
      scope.getByRole("link", { name: /Suggest a citation/ }),
    ).toBeInTheDocument();
    expect(
      scope.getByRole("link", { name: /All contributors/ }),
    ).toBeInTheDocument();
  });

  test("edit link points at /edit/main/ (not /blob/main/) per D18", () => {
    const { container } = render(<ContributionBlock slug="bpc-157" />);
    const scope = within(container);
    const editLink = scope.getByRole("link", {
      name: /Edit bpc-157 on GitHub/,
    });
    expect(editLink).toHaveAttribute(
      "href",
      "https://github.com/peptidesdb/peptidesdb/edit/main/content/peptides/bpc-157.yaml",
    );
    expect(editLink.getAttribute("href")).not.toContain("/blob/");
  });

  test("citation link points at the add-citation issue template", () => {
    const { container } = render(<ContributionBlock slug="ghk-cu" />);
    const link = within(container).getByRole("link", {
      name: /Suggest a citation/,
    });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/peptidesdb/peptidesdb/issues/new?template=add-citation.yml",
    );
  });

  test("contributors link points at the GitHub graph", () => {
    const { container } = render(<ContributionBlock slug="ghk-cu" />);
    const link = within(container).getByRole("link", {
      name: /All contributors/,
    });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/peptidesdb/peptidesdb/graphs/contributors",
    );
  });

  test("all links open in new tab with rel=noopener noreferrer", () => {
    const { container } = render(<ContributionBlock slug="tesamorelin" />);
    for (const link of within(container).getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toMatch(/noopener/);
      expect(link.getAttribute("rel")).toMatch(/noreferrer/);
    }
  });

  test("has no axe-core violations", async () => {
    const { container } = render(
      <div>
        <ContributionBlock slug="tesamorelin" />
      </div>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
