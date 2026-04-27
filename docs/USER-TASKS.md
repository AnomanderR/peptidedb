# User-only tasks (require Vercel/Google UI auth)

These items can't be completed from the Claude session — they need browser
clicks against external dashboards we don't have programmatic access to.

## 1. Re-link Vercel auto-deploy to GitHub

**Why**: pushes to `peptidesdb/peptidesdb` `main` no longer trigger Vercel
production builds. Each ship currently requires `vercel deploy --prod --yes`
from the local checkout, which is a manual step that should be free.

**Symptoms**: `git push origin main` succeeds, but the Vercel project shows
no new deployment under "Deployments" until we run the CLI.

**Diagnosis path tried (failed)**:
- `vercel git connect https://github.com/peptidesdb/peptidesdb.git --yes`
  returns `Failed to connect ... access to repository`. The CLI cannot
  re-establish the OAuth grant from the terminal.

**Fix path (UI-only, ~30 seconds)**:
1. Open https://vercel.com/snapsnaps-projects/peptidedb/settings/git
2. Confirm the connected GitHub repository. If it says "Disconnected" or
   shows the old `AnomanderR/peptidedb` URL, click **Connect**.
3. Pick `peptidesdb/peptidesdb` from the org dropdown → `main` branch.
4. Save. Push a no-op commit to verify (`git commit --allow-empty -m "test:
   verify auto-deploy" && git push`); a build should appear within ~10s.

If the org dropdown doesn't show `peptidesdb`, you'll be prompted to install
the Vercel GitHub App into the new org. Approve the install for `peptidesdb`
only (not "all repos") to keep the blast radius minimal.

## 2. Submit `peptidesdb.org` to Google Search Console

**Why**: organic discovery of the atlas requires GSC indexing. Without a
verified property, we have no visibility on impressions/clicks/queries and
no way to request indexing of new plates.

**Steps (UI-only, ~5 minutes)**:
1. Open https://search.google.com/search-console (use the
   `alexmircearotaru@gmail.com` account that owns
   `certapeptides.com`).
2. Click "Add property" → choose **Domain** (preferred — covers
   apex + www + http/https in one record) → enter `peptidesdb.org`.
3. Copy the TXT record value GSC gives you.
4. Add the TXT record at Hostinger DNS:
   - Domain: peptidesdb.org → DNS / Nameservers
   - Type: `TXT`, Host: `@`, Value: `<paste>`, TTL: 14400
5. Wait ~30 seconds. Hit "Verify" in GSC. Done.
6. Submit the sitemap: Sitemaps → `https://peptidesdb.org/sitemap.xml`.

After verification, request indexing on the 5 most important entry points
to seed the crawl: `/`, `/p/tesamorelin`, `/p/bpc-157`, `/p/retatrutide`,
`/ask`. The rest of the 81-plate atlas will be discovered via the sitemap.

## 3. Submit `peptidesdb.org` to Bing Webmaster Tools

**Why**: ChatGPT web-search and Copilot index from Bing, not Google. GEO
visibility on AI surfaces requires Bing indexing as a hard prerequisite —
not optional, not redundant.

**Steps**:
1. Open https://www.bing.com/webmasters → sign in with the same Google
   account (Bing accepts Google SSO).
2. Add site → `https://peptidesdb.org`.
3. Verify via DNS TXT (same Hostinger flow as GSC) OR by importing from
   GSC (one-click after step 2 above is done — strongly recommended).
4. Submit sitemap: `https://peptidesdb.org/sitemap.xml`.
5. (Optional but worth it) Configure IndexNow — we already have the
   `seo:indexnow` script wired for IndexNow pings; Bing reads them
   automatically once the site is verified.

## 4. (Optional) Add `peptidesdb` GitHub org to Vercel team

If the goal is for any future contributor with `peptidesdb` org write
access to push and have it auto-deploy, the org needs to be added to the
Vercel team's GitHub integration scope. Settings → Integrations → GitHub →
Configure → add `peptidesdb` org. Skip this if you're the only committer.
