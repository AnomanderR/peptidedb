/*
 * ContributionBlock — three contribution affordances rendered inside the
 * existing plate colophon at app/p/[slug]/page.tsx.
 *
 * Per D18, this is additive to the existing colophon, not parallel.
 * Specifically (per Codex review):
 *   1. Upgrade the existing /blob/main/ link to /edit/main/ — clicking
 *      now opens the YAML in GitHub's editor instead of read-only blob.
 *   2. Add a "Suggest a citation" link that opens the add-citation issue
 *      template (Phase 2's .github/ISSUE_TEMPLATE/add-citation.yml).
 *   3. Add an "All contributors" link to the GitHub contributors graph.
 *
 * The contributors + maturity + uncited-claims metadata stays in its
 * existing left side of the colophon — this component is only the
 * outbound-link cluster, slotted into the right side.
 */
const REPO = "https://github.com/peptidesdb/peptidesdb";

export interface ContributionBlockProps {
  slug: string;
}

export function ContributionBlock({ slug }: ContributionBlockProps) {
  const editUrl = `${REPO}/edit/main/content/peptides/${slug}.yaml`;
  const citationUrl = `${REPO}/issues/new?template=add-citation.yml`;
  const contributorsUrl = `${REPO}/graphs/contributors`;
  return (
    <>
      <a
        href={editUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="at-link"
        aria-label={`Edit ${slug} on GitHub`}
      >
        Edit on GitHub →
      </a>
      <a
        href={citationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="at-link"
      >
        Suggest a citation →
      </a>
      <a
        href={contributorsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="at-link"
      >
        All contributors ↗
      </a>
    </>
  );
}
