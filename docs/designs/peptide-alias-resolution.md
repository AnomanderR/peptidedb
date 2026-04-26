# Alias Resolution — Store Product → peptidesdb Slug

> Companion doc to [peptide-coverage-pipeline.md](./peptide-coverage-pipeline.md). Answers Codex's open question: "If 'store referrals 404' is the framing, how does an inbound store-product URL resolve to a peptidesdb slug?"
>
> Drafted 2026-04-26. **Status: DECIDED 2026-04-26 — Option A (storefront-side ResearchRef link).** No peptidesdb redirect map. The fix lives on the CertaPeptides storefront where the user enters the funnel; peptidesdb stays a clean research reference per CONTRIBUTING.md identity.

## The problem

The CEO plan framed the work as "close the gap so store visitors don't 404 on peptidesdb". But peptidesdb is explicitly NOT a store and CONTRIBUTING.md disallows vendor links. There's no existing mapping from `certapeptides.com/product/<store-slug>` to `peptidesdb.org/p/<peptidesdb-slug>`.

Adding 57 plates closes the *content* gap. It does NOT solve the *URL* gap unless we also build:

1. **Inbound** — a way for store-product URLs (or store search) to land readers on the right peptidesdb plate.
2. **Outbound** — a way for peptidesdb plates to optionally point at where to buy (or, given CONTRIBUTING.md, *not* point and just rely on the canonical reference role).

The two are decoupled. Inbound is a UX necessity if we promise "no 404". Outbound is a policy choice.

## Selected approach (A): do nothing on peptidesdb, fix it on the storefront

**Reasoning**:

- peptidesdb's stated identity is "research reference, not a store". Adding store-aware redirects on peptidesdb violates the existing brand.
- The 404 problem is actually a CertaPeptides storefront problem: when a user searches a peptide, the storefront should link to the peptidesdb plate. peptidesdb is the canonical reference, not the entry point.
- This is the **smaller, more correct fix**. Move the work to the storefront where it belongs.

### Implementation on the storefront (CertaPeptides Next.js)

For each product-detail page, render a "Research reference" section with a link out to peptidesdb if the slug exists. Generated from the alias map below at build time.

```tsx
// In certapeptides-storefront's product page component
const PEPTIDESDB_ALIAS_MAP = {
  'aod-9604': 'aod-9604',
  'bpc-157': 'bpc-157',
  'mt-2-melanotan-2-acetate': 'melanotan-2',  // store slug → peptidesdb slug
  // ... full map below
};

function ResearchReferenceLink({ storeSlug }) {
  const peptidesdbSlug = PEPTIDESDB_ALIAS_MAP[storeSlug];
  if (!peptidesdbSlug) return null;
  return (
    <a href={`https://peptidesdb.org/p/${peptidesdbSlug}`} target="_blank" rel="noopener">
      Research reference at peptidesdb.org →
    </a>
  );
}
```

This is ~20 lines of code on the storefront. No change to peptidesdb. Solves the "user lands on a 404" problem by routing them to peptidesdb canonically before they hit a 404.

## Fallback (NOT selected): a minimal alias resolver on peptidesdb

If you want peptidesdb to handle inbound store-style URLs natively (e.g., `peptidesdb.org/p/sermorelin-acetate` should resolve to `sermorelin`), add a redirect map to `next.config.ts`.

```ts
// next.config.ts
const STORE_ALIAS_REDIRECTS = [
  { source: '/p/sermorelin-acetate', destination: '/p/sermorelin', permanent: true },
  { source: '/p/mt-2', destination: '/p/melanotan-2', permanent: true },
  { source: '/p/mt-2-melanotan-2-acetate', destination: '/p/melanotan-2', permanent: true },
  { source: '/p/thymalin-10mg', destination: '/p/thymalin', permanent: true },
  { source: '/p/tesofensine-500mcg', destination: '/p/tesofensine', permanent: true },
  { source: '/p/pt-141-10mg', destination: '/p/pt-141', permanent: true },
  { source: '/p/oral-bpc-157', destination: '/p/bpc-157', permanent: true },
  { source: '/p/oral-tb-500', destination: '/p/tb-500', permanent: true },
  { source: '/p/kpv-oral-capsules', destination: '/p/kpv', permanent: true },
  { source: '/p/cjc-1295-dac', destination: '/p/cjc-1295', permanent: true },
  { source: '/p/cjc-1295-without-dac', destination: '/p/cjc-1295', permanent: true },
  { source: '/p/mk-677-ibutamoren', destination: '/p/mk-677', permanent: true },
  // ... add as needed
];

export default {
  async redirects() {
    return STORE_ALIAS_REDIRECTS;
  },
};
```

Cost: ~30 minutes including testing. Reasonable if the storefront fix isn't viable for organizational reasons.

## Decision (2026-04-26)

**Selected: A.** CertaPeptides storefront owns the alias-to-plate mapping; peptidesdb takes no redirect work. The storefront PR ships once Wave 1 plates are live.

| Option | Where the work lives | Effort | Reasoning | Status |
|---|---|---|---|---|
| **A** | CertaPeptides storefront product pages | ~20 LOC, ~30 min | Correct identity boundary. peptidesdb stays a clean reference. | ✅ SELECTED |
| **B** | peptidesdb `next.config.ts` redirects | ~50 LOC, ~30 min | Handles drift if storefront falls behind, but couples peptidesdb to store-aware concerns. | Rejected |
| **C** | both | ~50 LOC, 1 hr | Belt + suspenders. | Rejected |

## Starter alias map

Based on the 30 existing peptidesdb plates and the 131 store products audited, the following store→peptidesdb mappings exist today:

```yaml
# store_slug → peptidesdb_slug (those that DON'T trivially match)
sermorelin-acetate: sermorelin
mt-2-melanotan-2-acetate: melanotan-2
mt-2: melanotan-2
thymalin-10mg: thymalin
tesofensine-500mcg: tesofensine
pt-141-10mg: pt-141
oral-bpc-157-capsules: bpc-157
oral-tb-500: tb-500
kpv-oral-capsules: kpv
cjc-1295-dac: cjc-1295  # one peptidesdb plate covers both DAC + non-DAC
cjc-1295-without-dac: cjc-1295
mk-677-ibutamoren: mk-677
ghrp-2-acetate: ghrp-2
ghrp-6-acetate: ghrp-6
hexarelin-acetate: hexarelin
slu-pp-332-capsule: slu-pp-332  # once authored
semaglutide-oral-capsules: semaglutide
```

After Wave 1-3 plates are authored, extend this map per the new slugs in [peptide-target-list.md](./peptide-target-list.md).

## Trivially-matching slugs (no alias needed)

The following match by direct slug equality and need no entry: `aod-9604`, `bpc-157`, `dsip`, `epitalon`, `ghk-cu`, `ipamorelin`, `kpv`, `liraglutide`, `mots-c`, `pinealon`, `retatrutide`, `selank`, `semaglutide`, `semax`, `ss-31`, `tb-500`, `tesamorelin`, `tirzepatide`, `thymosin-alpha-1`, `5-amino-1mq`.

## Decisions resolved (2026-04-26)

- **Option selected**: A — storefront-side `ResearchRef` component on each product detail page.
- **Storefront PR owner**: Alex (founder), same maintainer as certapeptides-storefront.
- **Trigger**: PR ships once Wave 1 plates (17) are live on peptidesdb. Subsequent waves extend the alias map in lockstep with each plate ship.
- **Out of scope**: no `next.config.ts` redirect map on peptidesdb. If hand-typed peptidesdb URLs become a real issue post-launch (verify via 404 logs), revisit the fallback option then — not now.
