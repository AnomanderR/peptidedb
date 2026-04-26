import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ContributionBlock } from "@/components/site/ContributionBlock";

describe("<ContributionBlock />", () => {
  test("renders the three contribution affordances", () => {
    render(<ContributionBlock slug="tesamorelin" />);
    expect(
      screen.getByRole("link", { name: /Edit tesamorelin on GitHub/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Suggest a citation/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /All contributors/ }),
    ).toBeInTheDocument();
  });

  test("edit link points at /edit/main/ (not /blob/main/) per D18", () => {
    render(<ContributionBlock slug="bpc-157" />);
    const editLink = screen.getByRole("link", {
      name: /Edit bpc-157 on GitHub/,
    });
    expect(editLink).toHaveAttribute(
      "href",
      "https://github.com/peptidesdb/peptidesdb/edit/main/content/peptides/bpc-157.yaml",
    );
    expect(editLink.getAttribute("href")).not.toContain("/blob/");
  });

  test("citation link points at the add-citation issue template", () => {
    render(<ContributionBlock slug="ghk-cu" />);
    const link = screen.getByRole("link", { name: /Suggest a citation/ });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/peptidesdb/peptidesdb/issues/new?template=add-citation.yml",
    );
  });

  test("contributors link points at the GitHub graph", () => {
    render(<ContributionBlock slug="ghk-cu" />);
    const link = screen.getByRole("link", { name: /All contributors/ });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/peptidesdb/peptidesdb/graphs/contributors",
    );
  });

  test("all links open in new tab with rel=noopener noreferrer", () => {
    render(<ContributionBlock slug="tesamorelin" />);
    for (const link of screen.getAllByRole("link")) {
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
