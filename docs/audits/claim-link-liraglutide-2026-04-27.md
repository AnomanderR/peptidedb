# Claim-link audit: liraglutide

> Generated 2026-04-27 by `bun run audit:claims liraglutide`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 14
- ✅ ok (score ≥ 0.85): 0
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 14

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Daily dose: 0.6–3.0 mg
  - Citations: fda-saxenda-label-2014
- **hero_stats[1]**: Body-weight ↓: 5–10%
  - Citations: fda-saxenda-label-2014
- **hero_stats[2]**: Half-life: ~13 hr
  - Citations: fda-saxenda-label-2014
- **mechanism.primary_target**: Primary target: GLP-1 receptor (GLP-1R)
  - Citations: fda-saxenda-label-2014
- **mechanism.pathway**: Pathway: GLP-1R agonism → ↑glucose-dependent insulin, ↓glucagon, ↓gastric emptying, ↓appetite
  - Citations: fda-saxenda-label-2014, wegovy-pioglitazone-2010
- **mechanism.downstream_effect**: Downstream effect: Glycemic improvement, modest body-weight reduction, cardiovascular event reduction in high-risk T2D
  - Citations: wegovy-pioglitazone-2010
- **mechanism.origin**: Origin / discovery: Modified GLP-1(7-37) with Lys26 substitution (Arg34) and C-16 palmitoyl-glutamate acylation for albumin binding
  - Citations: fda-saxenda-label-2014
- **dosage.rows[0].value**: Dosage value: 1.2–1.8 mg / day
  - Citations: fda-saxenda-label-2014
- **dosage.rows[1].value**: Dosage value: 3.0 mg / day (after 5-week titration)
  - Citations: fda-saxenda-label-2014
- **dosage.rows[4].value**: Dosage value: FDA-approved · Phase 3 RCTs (LEADER, SCALE)
  - Citations: wegovy-pioglitazone-2010, fda-saxenda-label-2014
- **dosage.rows[8].value**: Dosage value: ~13 hr
  - Citations: fda-saxenda-label-2014
- **side_effects.rows[0].value**: Side effect: Nausea, vomiting, diarrhea (very common during titration)
  - Citations: fda-saxenda-label-2014
- **side_effects.rows[2].value**: Side effect: Boxed warning — contraindicated in MEN2 / MTC history
  - Citations: fda-saxenda-label-2014
- **side_effects.rows[5].value**: Side effect: ↓ MACE in high-risk T2D (LEADER trial)
  - Citations: wegovy-pioglitazone-2010
