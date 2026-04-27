# Claim-link audit: bpc-157

> Generated 2026-04-27 by `bun run audit:claims bpc-157`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 9
- ✅ ok (score ≥ 0.85): 0
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 2
- — skipped (no PMIDs available): 7

## ❌ Unsupported (P0 — must fix or remove citation)

### mechanism.primary_target

- **Claim**: Primary target: VEGFR2 / nitric oxide / FAK-paxillin axes (proposed)
- **Score**: 0.45
- **Citations**: chang-2014 (PMID 21030672), sikiric-2018 (no PMID)
- **Rationale**: Abstract [1] directly supports FAK-paxillin axis involvement, stating BPC 157 increases phosphorylation of both FAK and paxillin. However, the abstract contains no mention of VEGFR2 or nitric oxide, which constitute two-thirds of the claimed primary targets, making the overall claim only partially supported.

### mechanism.pathway

- **Claim**: Pathway: Upregulates VEGFR2 → angiogenesis; modulates NO synthase; promotes fibroblast outgrowth via FAK-paxillin
- **Score**: 0.45
- **Citations**: chang-2014 (PMID 21030672)
- **Rationale**: Abstract [1] explicitly supports FAK-paxillin activation and fibroblast outgrowth/migration, but provides no evidence for VEGFR2 upregulation, angiogenesis, or NO synthase modulation. The claim's first two components are entirely unsupported by the cited abstract.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Daily dose: 250–500 mcg
  - Citations: hwang-2016
- **hero_stats[1]**: Evidence level: Phase 2
  - Citations: hwang-2016, sikiric-2018
- **mechanism.downstream_effect**: Downstream effect: Accelerated tissue repair, reduced inflammation, improved gut barrier integrity
  - Citations: sikiric-2018
- **mechanism.origin**: Origin / discovery: Synthetic pentadecapeptide derived from a sequence in human gastric juice; first characterised by Sikiric et al.
  - Citations: sikiric-2018
- **dosage.rows[0].value**: Dosage value: 250–500 mcg / day
  - Citations: hwang-2016
- **dosage.rows[3].value**: Dosage value: Animal-strong + Phase 2 clinical
  - Citations: sikiric-2018, hwang-2016
- **side_effects.rows[3].value**: Side effect: Theoretical concern via VEGF angiogenesis pathway
  - Citations: sikiric-2018
