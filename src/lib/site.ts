/* =========================================================
   Canonical site URL — single source of truth.
   Default: peptidesdb.org (the registered brand domain).
   Override via NEXT_PUBLIC_SITE_URL only for staging/preview
   deploys that need a different host. Vercel's auto-generated
   peptidedb-topaz.vercel.app URL is permanently 308-redirected
   to peptidesdb.org via next.config.ts redirects().
   Used by metadataBase, robots, sitemap, llms.txt, JSON-LD,
   and OG card URL footers.
   ========================================================= */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://peptidesdb.org"
).replace(/\/$/, "");

/** Hostname only — used by OG card text footers where "https://" reads
   as noise, e.g. "peptidesdb.org/p/tesamorelin". */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
