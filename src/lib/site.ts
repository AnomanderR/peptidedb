/* =========================================================
   Canonical site URL — single source of truth.
   Default: the Vercel-hosted production URL.
   Override via NEXT_PUBLIC_SITE_URL when a custom domain is
   bound (set it in Vercel project env, then re-deploy).
   Used by metadataBase, robots, sitemap, llms.txt, JSON-LD,
   and OG card URL footers.
   ========================================================= */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://peptidedb-topaz.vercel.app"
).replace(/\/$/, "");

/** Hostname only — used by OG card text footers where "https://" reads
   as noise, e.g. "peptidedb-topaz.vercel.app/p/tesamorelin". */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
