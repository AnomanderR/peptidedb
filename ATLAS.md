# Atlas

Contributor map for PeptidesDB. Read this before authoring or reviewing a plate.

## Atlas state

81 plates live (29 pre-coverage + 14 Wave 1 + 25 Wave 2 + 13 Wave 3, all human-reviewed). `content/refs.yaml` holds 333 citation entries. 25 of those carry `russian_journal_ref` tags, sourced primarily from the St. Petersburg Institute of Bioregulation and Gerontology (Khavinson school) and surfaced through DESIGN.md § 14 framing. Wave breakdown and skip rationale: [docs/designs/peptide-target-list.md](./docs/designs/peptide-target-list.md).

## Architecture

The atlas is a flat-file content tree validated at build time. No database, no CMS.

- `content/peptides/<slug>.yaml` — one YAML file per plate, validated against `src/lib/schemas/peptide.ts` (Zod).
- `content/refs.yaml` — flat citation registry, alphabetical by ID, validated against `src/lib/schemas/citation.ts`.
- `src/generated/citations.ts` — built from `refs.yaml` by `scripts/generate-citations.mjs`, runs in `predev`/`prebuild`/`pretest`/`prelint`. Plate components import from this generated file.
- `content/stacks/` — multi-peptide stack profiles, same schema/loader pattern as plates.

Build fails on schema violation, unresolved cite ID, slug-filename mismatch, duplicate slug, or citation key/`id` mismatch.

## Adding a peptide

The locked path is the `gen:plate` pipeline. Hand-authoring still works (see [CONTRIBUTING.md](./CONTRIBUTING.md)) but the pipeline is faster and more consistent.

1. **Draft.** `ANTHROPIC_API_KEY=... bun run gen:plate "<peptide name>"`. Searches PubMed for top candidates, fetches abstracts, drafts YAML against the schema, appends new citations to `refs.yaml`, and regenerates `src/generated/citations.ts`. Output is `maturity: auto-drafted`. For seeded PMIDs (foundational papers PubMed search misses), pass `--seed-pmids="11823860,12027450"`.
2. **Schema gate.** `bun run audit:trust`. Hard gate. Aborts on schema error, unresolved cite, missing field. Already runs in `predev`/`prebuild`.
3. **Citation truth.** `bun run audit:citations`. Verifies every PMID against PubMed esummary; title fuzzy-match ≥ 0.85 catches "real PMID, wrong paper" hallucinations. Signal-only (exits 0).
4. **Per-claim verification.** `ANTHROPIC_API_KEY=... bun run audit:claims <slug>`. Walks each claim, fetches its cited abstracts, scores claim↔source mapping with Claude Haiku. Writes a per-plate report to `docs/audits/`. Signal-only.
5. **Editorial pass.** `bun run audit:editorial`. Catches medical claims, dosing recommendations, vendor links, first-person voice, marketing superlatives. Then a human read for voice + DESIGN.md compliance. Workflow detail: [docs/designs/peptide-editorial-workflow.md](./docs/designs/peptide-editorial-workflow.md).
6. **Promote.** Edit the plate's `maturity` from `auto-drafted` to `human-reviewed`. Commit with `review(plate): <slug> human-reviewed`. Push.

Per-plate review time runs 60–120 minutes depending on evidence depth. The pipeline compresses drafting, not source curation.

### gen:plate flags

- `--slug=<slug>` — override the auto-derived slug. Use when the canonical slug differs from the display name (e.g. `--slug=glp-1-7-37`).
- `--brief="..."` — one-sentence framing handed to the drafter alongside the candidate pool.
- `--keywords="..."` — replaces the peptide name as the PubMed search query.
- `--seed-pmids="<pmid,pmid,...>"` — pin foundational PMIDs at the front of the candidate pool. Used heavily in Wave 3 to seed Khavinson lab papers PubMed keyword search misses.
- `--style=<slug>` — peptide YAML used as a style example for the drafter (defaults to `tesamorelin`).
- `--candidates=<n>` — PubMed candidate count (default 10).
- `--model=<model>` — Anthropic model override (default `claude-sonnet-4-5`).
- `--force` — overwrite an existing plate file.

### Environment

- `ANTHROPIC_API_KEY` — required for `gen:plate` and `audit:claims`.
- `PUBMED_API_KEY` — optional. Bumps the NCBI esummary/efetch rate limit from 3 to 10 req/s. Cuts a full-corpus citation audit from ~3.5 min to ~1 min.
- `CLAIM_MODEL` — optional override for the `audit:claims` model (defaults to Haiku).

## Editorial pattern

Locked approach: **drop topic-adjacent cites**. When the claim-linker or human review flags a citation as supporting an adjacent topic rather than the specific claim, the cite is dropped from that claim, not relocated and not weakened with hedging language. A claim with no findable source becomes an explicitly uncited claim (`cite: []`) — § 1 of DESIGN.md guarantees the absence is queryable, not hidden.

Citation-repair policy is the same shape: don't pre-bulk-repair stripped PMIDs; repair them at author-time per plate, and drop the cite if the manual lookup fails. Full reasoning: [docs/designs/peptide-editorial-workflow.md](./docs/designs/peptide-editorial-workflow.md) and [docs/designs/citation-repair-2026-04-26.md](./docs/designs/citation-repair-2026-04-26.md).

## Audit chain

Four scripts, each with one responsibility:

- **`audit:trust`** — schema + citation-resolution gate. Walks every plate, validates against the Zod schema, confirms every cited ID resolves in `src/generated/citations.ts`, and verifies parity between the field walker and `computePeptideStats`. Hard gate (runs in `predev`/`prebuild`/`pretest`/`prelint`). Source: [scripts/audit-trust-metric.ts](./scripts/audit-trust-metric.ts).
- **`audit:citations`** — PMID truthfulness against PubMed. esummary lookup + title Dice ≥ 0.85 + year tolerance ±1. Signal-only, exits 0. Source: [scripts/audit-citations.ts](./scripts/audit-citations.ts).
- **`audit:claims`** — per-claim ↔ source verification via Claude Haiku. Walks claims, fetches cited abstracts, scores the mapping. Output: per-plate markdown reports in `docs/audits/`. Signal-only. Source: [scripts/audit-claims.ts](./scripts/audit-claims.ts).
- **`audit:editorial`** — prose scan for compliance violations (medical claims, dosing recommendations, vendor links, first-person, marketing superlatives, hedging). P0 = hard violation, P1 = review. Output: dated markdown report in `docs/audits/`. Signal-only. Source: [scripts/audit-editorial.ts](./scripts/audit-editorial.ts).

Only `audit:trust` blocks builds. The other three produce reports for the human review gate.

## Khavinson framing (DESIGN.md § 14)

Russian-tradition bioregulators (Cartalax, Bronchogen, Livagen, the rest of Wave 3) carry a credible non-Western evidence base. § 14 sets the editorial framing so the atlas neither inflates nor pre-judges that evidence.

The framing line — *"Evidence base: Russian-language clinical literature, primarily from the St. Petersburg Institute of Bioregulation and Gerontology (Khavinson school), 1985 onward. Not extensively peer-reviewed in Western journals."* — renders above the Evidence section when both conditions hold:

1. Peptide-level `evidence_tier` is `theoretical` or `animal` (computed at build time in `src/lib/peptide-stats.ts` from `max(evidence_level)` across mechanism / dosage / fat_loss / side_effects).
2. The plate cites at least one entry in `refs.yaml` with `russian_journal_ref` set.

When a Western RCT lands and `computeEvidenceTier()` rolls up to `clinical` or `fda-approved`, the framing auto-suppresses. No manual edit. § 14 fires on 12 of 13 Wave 3 plates today; Chonluten is the lone exception (its seed paper is from an Italian lab).

`russian_journal_ref` lives in `content/refs.yaml` as an alternative to `pmid`/`doi`/`url` in the citation schema (`src/lib/schemas/citation.ts`).

## Where things live

| Concept | Path |
|---|---|
| Plate YAML | `content/peptides/<slug>.yaml` |
| Plate template | `content/peptides/_template.yaml` |
| Citation registry | `content/refs.yaml` |
| Generated citations | `src/generated/citations.ts` (do not hand-edit) |
| Plate schema (Zod) | `src/lib/schemas/peptide.ts` |
| Citation schema (Zod) | `src/lib/schemas/citation.ts` |
| Drafter orchestrator | `scripts/gen-plate.ts` |
| PubMed client | `scripts/lib/pubmed-client.ts` |
| Claim linker | `scripts/lib/claim-linker.ts` |
| Drafter library | `scripts/lib/draft-plate.ts` |
| Citation generator | `scripts/generate-citations.mjs` |
| Trust audit | `scripts/audit-trust-metric.ts` |
| Citation audit | `scripts/audit-citations.ts` |
| Claim audit | `scripts/audit-claims.ts` |
| Editorial audit | `scripts/audit-editorial.ts` |
| Stats + tier compute | `src/lib/peptide-stats.ts` |
| Plate page | `src/app/p/[slug]/page.tsx` |
| Compare page | `src/app/compare/[slugs]/page.tsx` |
| IndexNow ping | `scripts/ping-indexnow.ts` |
| YAML line map (build) | `scripts/yaml-line-map.ts` |
| Design system | [DESIGN.md](./DESIGN.md) |
| Editorial workflow | [docs/designs/peptide-editorial-workflow.md](./docs/designs/peptide-editorial-workflow.md) |
| Coverage pipeline plan | [docs/designs/peptide-coverage-pipeline.md](./docs/designs/peptide-coverage-pipeline.md) |
| Wave plan + skip list | [docs/designs/peptide-target-list.md](./docs/designs/peptide-target-list.md) |
| Storefront alias map | [docs/designs/peptide-alias-resolution.md](./docs/designs/peptide-alias-resolution.md) |

## Skipped peptides

Nine store SKUs were considered and deliberately skipped under the locked "peptides only" identity rule (resolved decisions #5–7 in [peptide-target-list.md](./docs/designs/peptide-target-list.md)). They live in the Skipped table there with consistent rationale, not silently omitted.

- **MK-677 / Ibutamoren** — non-peptide oral GH secretagogue (small molecule mimicking ghrelin at GHSR-1a). Decision #5; precedent for the others.
- **AICAR** — 5-aminoimidazole-4-carboxamide ribonucleoside. Nucleoside / AMPK activator.
- **Orforglipron** — oral GLP-1 receptor agonist. Peptidomimetic small molecule.
- **SLU-PP-332** — estrogen-related receptor (ERR) agonist. Small molecule.
- **Enclomiphene** — selective estrogen receptor modulator (SERM, trans-isomer of clomiphene).
- **Hyaluronic Acid** — long-chain glycosaminoglycan polysaccharide.
- **Melatonin** — N-acetyl-5-methoxytryptamine, tryptophan-derived indoleamine.
- **Methylene Blue** — phenothiazine dye / monoamine oxidase inhibitor.
- **NAD+** — nicotinamide adenine dinucleotide. Nucleotide cofactor.

The Skipped table also covers blends, bundles/kits, oral variants of existing plates, SARMs, and lab consumables — those are categorical exclusions, not identity calls.
