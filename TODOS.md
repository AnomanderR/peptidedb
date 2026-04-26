# TODOs — PeptidesDB

Living backlog. Open items grouped by implementation phase. Closed items move to
`CHANGELOG.md` when shipped.

Last revised 2026-04-26 after `/codex review` outside-voice pass.

---

## Locked design decisions

These were resolved across `/plan-design-review on Atlas`, `/plan-eng-review on
Direction A`, and `/codex review` (2026-04-26). **Treat as binding constraints
during implementation.** If you disagree, open an issue first.

| # | Decision | Rationale |
|---|---|---|
| D1 | `/contribute` is a top-nav slot between "Ask" and "GitHub ↗" | Visibility of community-manuscript premise > nav minimalism |
| D2 | Empty states use editorial colophon style (hairline + italic Instrument Serif + mono caps action) | Anti-SaaS, anti-AI-slop, monograph-coherent |
| D3 | `/contribute § 03 · The flow` embeds a 30-sec autoplay-loop screencast | Removes first-time GitHub editor anxiety |
| D4 | Mobile navigation = Atlas-native slide-down with **explicit `Menu ▾` text label + caret** | No hamburger glyph, but a visible signifier (hidden hairlines fail discovery on cold-arrival readers — NN/g + UK gov design evidence) |
| D5 | Contribution-link hover state = single gold (#b8865b) across all plates | Calmer, predictable, doesn't conflict with hot pigments |
| D6 | Contributor display = `@handle` only, linked to GitHub profile | Verifiable, auto-pulled, drives traffic to contributor's GitHub |
| D7 | Screencast hosted at `public/contribute-flow.mp4` (Vercel CDN) | Boring tech, edge-cached, no third-party dep |
| D8 | CI required-check runs `bun run audit:peptides` (zod schema audit) on every PR | PRs with bad yaml never reach review |
| D9 | Welcome bot is partial (thanks + reminder); contributor adds themselves to `contributors:` array in their next PR | Avoids token-write-to-main, race conditions, and bot loops |
| D10 (revised) | YAML line-map = build-time script using **`js-yaml` (already in `lib/content.ts`)** + first-run-on-missing for `dev`/`build`/`test`/`lint`/`tsc` → **`src/generated/peptide-lines.ts`** | Reuse existing parser (DRY, no duplicate dep). `src/generated/` makes "this is a build artifact" explicit. Hooked into all command paths, not just `prebuild`, so worktrees and CI never see stale output. |
| D11 | Per-section pencil = `<SectionFrame>` wrapper component pattern | DRY, single host for cross-cutting affordances |
| D12 | Mobile nav = small client component, `AtlasHeader` stays RSC | Server-side `loadAllPeptides()` preserved; minimal client bundle |
| D13 | `/contribute` page is plain TSX, not MDX | No new build deps; CONTRIBUTING.md stays as separate markdown |
| D14 | Test stack = Bun test + RTL + axe-core + Playwright | Native to Bun runtime, no Vitest/Jest overhead |
| **D15** (new, from Codex) | **Schema enforces D6 + D9 at build time** | `EvidenceLevel` enum drops `"anecdotal"`; `contributors` typed as `z.array(z.string().regex(/^@?[a-zA-Z0-9-]+$/)).default([])`. The compliance fence becomes system-enforced, not policy-enforced. |
| **D16** (new, from Codex) | **Motif math unified into a single shared module** | Currently duplicated between `lib/peptide-motif.tsx` and `app/p/[slug]/opengraph-image.tsx`. Refactor: extract pure function `buildMotifNodes(slug, size)` exported from `lib/peptide-motif.tsx`; OG card imports it. One source of truth → one regression test path. |
| **D17** (new, from Codex) | **`<SectionFrame>` is pass-through, not wrapping** | Don't add a `<div>` around section bodies — that breaks `border`/`grid`/`table` layouts in existing sections. Use the React `cloneElement` or `asChild` pattern: SectionFrame renders the heading + pencil INLINE before children, no enclosing element. |
| **D18** (new, from Codex) | **ContributionBlock is additive to existing plate colophon, not parallel** | Plate page colophon at `app/p/[slug]/page.tsx:790` already has "Edit on GitHub →" + contributors line. Direction A's ContributionBlock extends/upgrades this row, not duplicates it. Specifically: upgrade the existing `/blob/` link to `/edit/`; keep the contributors line; add the citation-PR + contributors-graph affordances next to "Edit". |

---

## Phase 0 — Core integrity hot-fixes (CRITICAL, ship FIRST in isolation)

**Why first:** these are P0/P1 trust failures and SEO leaks shipped today on
peptidesdb.org. Codex caught two that both prior reviews missed. Each is a tiny
isolated PR that fixes a real user-visible bug. Ship as standalone PRs in 1-2
days BEFORE any Direction A work begins.

### TODO 0.1 — `/ask` citation chips link to a 404 (P0 — TRUST FAILURE)

**What:** `src/components/ask/AskPanel.tsx:33` renders citation chips with
`href={`/refs/${id}`}`. There is no `src/app/refs/` route. Every cited claim chip
is a live 404.

**Why:** The site's core promise is "every claim links to a paper". This is the
exact opposite of that promise.

**Pros of fixing:** Restores the trust surface that 100% of `/ask` users hit.

**Cons of fixing:** None.

**Context:** Two valid fixes:
- (Recommended) Update the chip to link to the actual source URL. The citation
  registry at `content/refs.yaml` has `url:` per entry (PubMed/DOI). Look up
  `id → registry[id].url` in the AskPanel and link directly.
- (Alternative) Build `app/refs/[id]/page.tsx` that renders a minimal "this is
  citation X, here's the link to the paper" page. Adds a route + render cost for
  marginal value.

**Acceptance:**
- Click a citation chip on `/ask` → opens the actual paper (PubMed/DOI URL) in
  a new tab
- Test: vitest snapshot + e2e click-through

**Depends on:** none. Standalone PR. ~1 hour.

### TODO 0.2 — P1 mobile nav fix (Atlas-native slide-down with `Menu ▾` label)

**What:** Implement `<MobileNav>` client component per D4 + D12 + D17 (revised).
Below 640px viewport, AtlasHeader renders an explicit `Menu ▾` toggle (mono caps
text, NOT a hamburger glyph, NOT an invisible hairline). Toggle reveals slide-down
panel with all 6 nav links.

**Why:** Mobile users currently can't navigate Atlas (`hidden sm:inline` on
nav links + no toggle).

**Pros:** Fixes shipped P1. Independent of Direction A. ~3 hours.

**Cons:** Adds a small client component. Acceptable trade for fixing the bug.

**Context:** Define `NAV_LINKS = [...]` const exported from
`src/components/site/AtlasHeader.tsx`. AtlasHeader (RSC) renders desktop nav from
the const at ≥640px. Below 640px, AtlasHeader renders `<MobileNav links={NAV_LINKS} />`.
MobileNav uses `useState` + Esc key + resize listener + auto-close on link click.
Toggle button reads `Menu ▾` (closed) / `Menu ▴` (open) — explicit signifier per
Codex feedback (NN/g evidence on hidden-mobile-nav discovery failure).

**Acceptance:**
- 320/375/414/640 viewports: nav fully functional
- Keyboard: Tab into Menu button, Enter expands, Tab through links
- Esc closes panel
- Resize ≥640px while open auto-closes

**Tests required:**
- Unit (RTL): toggle, Esc, resize, link click
- E2E (Playwright): visual regression at 320/375/414, keyboard nav

**Depends on:** Phase 1 must establish test infra.

### TODO 0.3 — Rename canonicalization (close the SEO split-identity)

**What:** Three small changes:
1. `src/lib/site.ts:9` — change default fallback from `"https://peptidedb-topaz.vercel.app"` to `"https://peptidesdb.org"`. Vercel deploy URL alias still works; default fallback now reflects canonical brand.
2. `README.md:7` — change `[**Live site →**](https://peptidedb-topaz.vercel.app)` to `[**Live site →**](https://peptidesdb.org)`.
3. **Vercel: add a permanent redirect** from `peptidedb-topaz.vercel.app` to `peptidesdb.org` via `next.config.ts` `redirects()` (matches all paths, 308). Removes split SEO identity.

**Why:** Codex caught this — search engines and LLM crawlers still see two hosts.
Even with the brand rename committed, a `peptidedb-topaz.vercel.app` link in
Google's cache or an LLM training set leaks the old name.

**Pros:** ~30 minutes. Closes a real SEO leak.

**Cons:** None.

**Context:** Also worth: keep the OLD GitHub URL (`AnomanderR/peptidedb`) alive
beyond GitHub's auto-redirect window (~6 months). Options:
- Leave it; accept that long-tail citations will break in 2027
- Create a tombstone repo at `AnomanderR/peptidedb` with a single `README.md`
  pointing at `peptidesdb/peptidesdb` (does GitHub allow this after transfer?)
- Set up a 301 from the old host via a Cloudflare worker if anyone really
  bookmarked the AnomanderR URL

For now: just close site-side leak. Old GitHub URLs can be revisited in 5 months
when redirect window approaches expiration.

**Acceptance:**
- All `peptidesdb.org/*` URLs work (already do)
- All `peptidedb-topaz.vercel.app/*` URLs 308 → `peptidesdb.org/*`
- Sitemap, llms.txt, OG cards, JSON-LD all reference `peptidesdb.org` only

**Depends on:** none. ~30 min.

### TODO 0.4 — Open Phase 0 PR + manual smoke test on prod canary

**What:** Bundle TODOs 0.1, 0.2, 0.3 into a single PR titled `fix(integrity): ask
404 + mobile nav + canonical host`. Manual smoke test on the Vercel preview deploy
across 5 viewports + click every citation chip + click every nav link.

**Why:** Phase 0 is intentionally tiny; one PR keeps the change reviewable in
~30 min.

**Acceptance:**
- All tests green
- Manual smoke test passes on preview deploy
- Promote to prod via `vercel deploy --prod`

**Depends on:** 0.1, 0.2, 0.3, Phase 1.

---

## Phase 1 — Test infrastructure setup (foundation for everything else)

### TODO 1.1 — Add test dependencies and config

**What:** Install Bun test runner support libraries; configure project for
component + a11y + E2E testing.

**Commands:**
```bash
bun add -d @testing-library/react @testing-library/jest-dom jest-axe playwright
bunx playwright install chromium
```

**Files to create:**
- `bunfig.toml` — `preload = ["test/setup.ts"]`
- `test/setup.ts` — `import '@testing-library/jest-dom'`
- `playwright.config.ts` — viewports 320/375/414/768/1280, baseURL = preview, traces on failure
- `tsconfig.json` — include `test/**/*.tsx`, `e2e/**/*.spec.ts`, `src/generated/**/*.ts`
- `package.json` — `"test": "bun test"`, `"test:e2e": "playwright test"`

**Acceptance:** `bun test` passes (with one trivial example test). `bun test:e2e`
passes (with one trivial example E2E test).

**Depends on:** none. First in dependency graph.

---

## Phase 2 — Repo scaffolding for community contributions

Same as before — no Codex tension here. 5 sub-TODOs:

- **2.1** Add `LICENSE` (MIT) at repo root
- **2.2** Write `CONTRIBUTING.md` (mirrors /contribute essay; compliance fence near top)
- **2.3** Write `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1 verbatim)
- **2.4** GitHub issue templates: `add-citation.yml`, `correct-claim.yml`,
  `add-peptide.yml`, `report-typo.yml` at `.github/ISSUE_TEMPLATE/`
- **2.5** `PULL_REQUEST_TEMPLATE.md` at `.github/`

**Depends on:** none. Parallel-safe with all later phases except Phase 0.

---

## Phase 3 — Accessibility fixes (P2 a11y debt)

### TODO 3.1 — Specimen motif `<title>` + `<desc>` + UNIFY motif math (D16)

**What:** Two changes in one PR:
1. Add `<title>{peptide.name} specimen motif</title>` + `<desc>` description in
   the SVG output of `src/lib/peptide-motif.tsx`.
2. **REFACTOR per D16**: extract motif geometry math (`buildMotifNodes(slug, size)`)
   into a pure function exported from `src/lib/peptide-motif.tsx`. Update
   `src/app/p/[slug]/opengraph-image.tsx` to import it instead of duplicating
   the math. One source of truth, one test path covers both renders.

**Why:** Screen readers currently see nothing. Refactoring eliminates the dual-path
regression risk Codex flagged.

**Tests required (CRITICAL — regression):**
- Snapshot OG image for `/p/tesamorelin/opengraph-image` BEFORE refactor
- Snapshot AFTER refactor: assert pixel-identical (only `<title>`/`<desc>` text added)
- axe-core: `svg-img-alt` rule passes

**Depends on:** Phase 1.

### TODO 3.2 — Skip-to-content link

**What:** First focusable element in `AtlasHeader.tsx`. Visually hidden by default,
visible on focus. `<main id="main">` already exists in `app/layout.tsx`.

**Depends on:** none.

### TODO 3.3 — ReconstitutionCalculator visible labels

**What:** Add visible `<label htmlFor>` connections to each input. Keep existing
`aria-label` (defense in depth).

**Depends on:** Phase 1.

---

## Phase 4 — Empty states across 9 surfaces (D2)

### TODO 4.1 — `<EmptyState />` shared component

**What:** New file `src/components/site/EmptyState.tsx`. Props: `message`,
`action?: { label, href }`. Renders hairline + italic Instrument Serif message +
optional mono caps action link.

**Tests:** RTL + axe-core.

**Depends on:** Phase 1.

### TODO 4.2 — Wire empty states into 9 surfaces

Same as before — no Codex tension. 9 specific empty/error states across catalog,
compare picker, compare/[slugs] 404, stack, ask (initial + 429), p/[slug] 404.

**Depends on:** TODO 4.1.

---

## Phase 5 — Schema tightening (D15)

### TODO 5.1 — Remove `anecdotal` from `EvidenceLevel` enum

**What:** `src/lib/schemas/peptide.ts:62` — drop `"anecdotal"` from the enum.
Run `bun run audit:peptides` to verify no current yaml uses it.

**Why:** D6 + D15 — anti-anecdote becomes system-enforced, not policy-only.
Codex caught this gap.

**Pros:** Hard gate. A future contributor (or AI) can't slip anecdotal evidence
past the audit by accident.

**Cons:** Minor — if a legitimate use case for "anecdotal" emerges (e.g., a
paper documenting a self-experiment), it has to round through `human-mechanistic`
or `theoretical`. Acceptable.

**Acceptance:**
- Schema rebuild passes
- All 30 yaml files audit-pass
- Adding a yaml with `evidence: anecdotal` triggers a typed audit error

**Depends on:** Phase 1.

### TODO 5.2 — Tighten `contributors` field

**What:** `src/lib/schemas/peptide.ts:236` — change from `z.array(z.string()).default([])`
to `z.array(z.string().regex(/^@?[a-zA-Z0-9-]+$/, 'Must be a GitHub handle (optionally @-prefixed)')).default([])`.

**Why:** D6 + D15. Enforces handle format. Future "Alex Rotaru" string entries
get rejected at audit time.

**Acceptance:** All 30 yaml's `contributors:` arrays pass. New yaml with
`contributors: [Alex Rotaru]` fails audit with a typed error.

**Depends on:** none (Phase 5.1 can run in parallel).

---

## Phase 6 — Direction A core (community curation flow)

### TODO 6.1 — `scripts/yaml-line-map.ts` + `src/generated/peptide-lines.ts` (D10 revised)

**What:** Build-time script using **`js-yaml`** (already in `lib/content.ts`),
parsing each `content/peptides/*.yaml` for line numbers of the 8 known sections
(mechanism / dosage / reconstitution / evidence / side_effects / administration /
synergy / sources). Output to **`src/generated/peptide-lines.ts`** as a TypeScript
const.

**Wire into all command paths**, not just `prebuild`:
```json
"scripts": {
  "build:line-map": "bun run scripts/yaml-line-map.ts",
  "predev":   "bun run build:line-map",
  "prebuild": "bun run build:line-map",
  "pretest":  "bun run build:line-map",
  "prelint":  "bun run build:line-map"
}
```

**Why:** Per Codex — generated artifacts must exist for every command that
touches them, not just `build`. Otherwise `bun run dev` fails on first import,
or `bun run test` runs against stale artifact.

**Caveat (Codex):** GitHub `/edit/main/...#L42` URLs drift as soon as
contributions land that insert lines above the section. We accept this drift —
the link still opens the editor at *approximately* the right place; contributors
scroll. Worst case the line is wrong by ±5 lines. Acceptable trade for "deep
link" UX.

**Acceptance:**
- 30 yaml files → correct line map at any phase command (`dev`, `build`, `test`)
- Malformed yaml → script exits 1, command fails
- `_template.yaml` excluded
- Generated file in `src/generated/`, gitignored or committed (decide: gitignore
  to avoid churn; CI regenerates fresh)

**Tests:** Unit on the script — happy path, malformed input, missing optional
section.

**Depends on:** Phase 1.

### TODO 6.2 — `<SectionFrame>` pass-through component (D11 + D17)

**What:** New file `src/components/site/SectionFrame.tsx`. Props: `slug`,
`sectionKey`, `title`, `children`. Renders `at-folio` mono caps section number +
Instrument Serif title + per-section pencil affordance, **followed by children
INLINE — no wrapping `<div>`**. Use `<>` fragments, render heading sibling-of
children, no enclosing block.

**Why:** Codex caught — wrapping div breaks borders/grids/tables in existing
sections (e.g., the dose schedule grid). Pass-through pattern keeps section
DOM shape unchanged.

**Acceptance:**
- All 8 plate sections wrap visually unchanged (Playwright pixel diff <0.1%)
- Pencil URL = correct GitHub edit URL with #L line anchor
- Graceful fallback when `PEPTIDE_LINES[slug]?.[sectionKey]` is undefined (`#L1`)
- Desktop: pencil 0% → 30% on hover
- Mobile: pencil always 30%

**Tests required (CRITICAL — regression):** Playwright visual regression on top
5 plates (tesamorelin / bpc-157 / ipamorelin / ghk-cu / semaglutide). Pixel diff
<0.1%.

**Depends on:** TODO 6.1.

### TODO 6.3 — `<ContributionBlock>` additive to existing colophon (D18)

**What:** New file `src/components/site/ContributionBlock.tsx`. Renders the
"ON THIS PLATE" footer with 3 numbered links (suggest edit / open citation PR /
see contributors).

**Wire into `app/p/[slug]/page.tsx:790`** by EXTENDING the existing colophon
section, not creating a new one:
- Upgrade the existing "Edit on GitHub →" link from `/blob/` to `/edit/`
- Keep the existing contributors line + maturity + uncited-claims metadata
- Add the citation-PR + contributors-graph links next to "Edit"

**Why:** Codex caught (D18) — the existing plate colophon already has 80% of
this surface. Direction A is adding 2 affordances, not building from scratch.

**Tests:** RTL — link URL correctness, axe-core, hover state. Visual regression
on the colophon row.

**Depends on:** none (independent of YAML line-map for the basic block, just
needs the section colophon already there).

### TODO 6.4 — Wire `<SectionFrame>` into `app/p/[slug]/page.tsx`

**What:** Wrap each of the 8 plate sections in `<SectionFrame>`. Per D17, no
wrapping div — use pass-through.

**Tests required (CRITICAL — regression):** see 6.2.

**Depends on:** TODO 6.2.

### TODO 6.5 — `/contribute` page (D13)

**What:** New route `app/contribute/page.tsx` (plain TSX, not MDX). Mirrors the
wireframe at `~/.gstack/projects/AnomanderR-peptidedb/designs/atlas-contribute-20260426/wireframes/contribute-page.html`.
Embedded screencast via `<video>` element.

**Acceptance:** RTL renders all sections, video element with `aria-label`,
LCP <2 sec (Playwright).

**Depends on:** Phase 7 (screencast asset).

### TODO 6.6 — `.github/workflows/audit.yml` (D8)

**What:** GitHub Actions workflow runs `bun install --frozen-lockfile && bun run
audit:peptides` on every PR. Required status check.

**Acceptance:** PR with valid yaml → workflow passes ~30sec. Malformed yaml →
fails with line + reason.

**Depends on:** none.

---

## Phase 7 — Welcome bot (DEFERRED — only if real volume materializes)

### TODO 7.1 — `.github/workflows/welcome.yml` (D9)

**Why deferred per Codex:** Year-1 realistic contribution rate is 0-15 PRs.
A welcome bot for that volume is over-engineering. Defer until inbound PR rate
exceeds ~5/month sustained.

When implementing:
- `actions/github-script@v7` with inline JS (~30 lines)
- Gate with `if: github.event.pull_request.author_association != 'COLLABORATOR'`
  so the bot doesn't thank itself or maintainers
- Track via GitHub Insights: enable when `PRs/month >= 5` for 2 consecutive months

**Depends on:** demand signal.

---

## Phase 8 — Screencast asset

### TODO 8.1 — Record + encode `/contribute` flow screencast (D7)

**Why deferred per Codex:** "If the flow needs a screencast to be understandable,
the flow is too hard." First, ship the flow (Phases 0-6). See if `/contribute`
prose + the per-plate block is enough. Only record screencast if onboarding
metrics (e.g., "% of /contribute visitors who open a PR within 7 days") show
the page isn't enough on its own.

When implementing: ffmpeg encoding command per the original D7 spec.

**Depends on:** Phases 0-6 live + onboarding metric reading.

---

## Cross-cutting open questions (UNCHANGED from original review)

| # | Question | Why it matters |
|---|---|---|
| Q1 | What's the contributor recognition surface beyond `contributors:` yaml? Single contributors page? Per-plate colophon list? | Direction A's "named in colophon" promise (D6) needs concrete design. |
| Q2 | i18n strategy when first non-English contributor PR lands | Today: no policy. Will need one within 90 days of public launch. |
| Q3 | What's the maintainer review SLA we promise contributors? | Sets expectations. Affects contributor return rate. |
| Q4 | When (if ever) do we move to a paid GitHub Team org for branch protection automation? | Free org suffices for solo maintainer; multi-maintainer needs Team. |
| **Q5 (NEW from Codex)** | When the brand rename redirect window expires (~6 months), do we need a tombstone strategy for `AnomanderR/peptidedb`? | Long-tail GitHub citations break Oct 2026 unless mitigated. |

---

## Closed (shipped 2026-04-26)

- ✓ Domain `peptidesdb.org` registered + DNS + TLS issued
- ✓ Vercel KV provisioned (Upstash for Redis)
- ✓ Brand renamed `peptidedb` → `peptidesdb` across 51 files (commits `1a619f2` + `a83afb4`)
- ✓ GitHub org `peptidesdb` registered + repo migrated to `peptidesdb/peptidesdb`
- ✓ DESIGN.md written (390 lines, 13 sections — `a83afb4`)
- ✓ TODOS.md written (`16a091d`, this revision incorporates Codex feedback)
- ✓ `/plan-design-review on Atlas` completed (6.5 → 8.0)
- ✓ `/plan-eng-review on Direction A` completed
- ✓ `/codex review` outside-voice pass — surfaced Phase 0 hot-fix issues + D15/D16/D17/D18
