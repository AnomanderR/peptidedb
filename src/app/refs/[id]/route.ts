import { NextResponse, type NextRequest } from "next/server";
import { CITATIONS } from "@/generated/citations";
import { citationUrl } from "@/lib/citations";

/* =========================================================
   /refs/[id] — citation resolver redirect.

   AskPanel renders citation chips with href="/refs/<id>". We
   resolve the ID to the canonical external URL (PubMed → DOI →
   NCT → custom url) and redirect there. If the citation has
   no external URL, fall back to the GitHub view of refs.yaml
   (still useful — contributors can see the full entry).

   Fixes a P0 trust failure: every cited claim chip used to 404
   because this route did not exist.
   ========================================================= */

export const runtime = "nodejs";
export const dynamic = "force-static";

export function generateStaticParams(): { id: string }[] {
  return Object.keys(CITATIONS).map((id) => ({ id }));
}

const REFS_YAML_URL =
  "https://github.com/peptidesdb/peptidesdb/blob/main/content/refs.yaml";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cite = CITATIONS[id];
  if (!cite) {
    return new NextResponse(`Citation "${id}" not in registry.`, {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  const url = citationUrl(cite);
  // Loop guard: citationUrl falls back to /refs/<id> when no external
  // URL exists. Send to the registry file on GitHub instead.
  if (url.startsWith("/refs/")) {
    return NextResponse.redirect(REFS_YAML_URL, 302);
  }
  return NextResponse.redirect(url, 302);
}
