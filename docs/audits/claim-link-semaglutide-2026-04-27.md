# Claim-link audit: semaglutide

> Generated 2026-04-27 by `bun run audit:claims semaglutide`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 15
- ✅ ok (score ≥ 0.85): 5
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 1
- — skipped (no PMIDs available): 9

## ❌ Unsupported (P0 — must fix or remove citation)

### mechanism.pathway

- **Claim**: Pathway: GLP-1R agonism → ↑glucose-dependent insulin secretion, ↓glucagon, ↓gastric emptying, ↓appetite via hypothalamic centres
- **Score**: 0.35
- **Citations**: wilding-2021 (PMID 33567185)
- **Rationale**: The cited abstract reports clinical outcomes of semaglutide treatment (weight loss, cardiometabolic improvements) but does not substantively address the mechanistic pathway claimed—specifically glucose-dependent insulin secretion, glucagon suppression, gastric emptying effects, or appetite regulation via hypothalamic centres. The abstract focuses on efficacy in obesity rather than the underlying physiological mechanisms of GLP-1R agonism.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Weekly dose: 0.25–2.4 mg
  - Citations: fda-wegovy-label-2021
- **hero_stats[2]**: Half-life: ~7 days
  - Citations: fda-wegovy-label-2021
- **mechanism.primary_target**: Primary target: GLP-1 receptor (GLP-1R)
  - Citations: fda-wegovy-label-2021
- **mechanism.origin**: Origin / discovery: Modified GLP-1(7-37) with two amino-acid substitutions and C-18 fatty-acid acylation for albumin binding and 168-h half-life
  - Citations: fda-wegovy-label-2021
- **dosage.rows[0].value**: Dosage value: 0.5–1.0 mg / week
  - Citations: fda-wegovy-label-2021
- **dosage.rows[8].value**: Dosage value: ~7 days (168 h)
  - Citations: fda-wegovy-label-2021
- **side_effects.rows[2].value**: Side effect: Rare; discontinue if suspected
  - Citations: fda-wegovy-label-2021
- **side_effects.rows[3].value**: Side effect: Boxed warning — contraindicated in MEN2 / personal or family MTC history
  - Citations: fda-wegovy-label-2021
- **side_effects.rows[6].value**: Side effect: Contraindicated
  - Citations: fda-wegovy-label-2021

## ✅ OK (collapsed for brevity)

- **hero_stats[1]**: Body-weight ↓: 14.9% *(score=0.95)*
- **mechanism.downstream_effect**: Downstream effect: Improved glycemic control, reduced caloric intake, body-weight reduction, cardiovascular risk reduction *(score=0.92)*
- **dosage.rows[1].value**: Dosage value: 2.4 mg / week (after 16-wk titration) *(score=0.90)*
- **dosage.rows[4].value**: Dosage value: FDA-approved · Phase 3 RCTs *(score=0.92)*
- **side_effects.rows[0].value**: Side effect: Nausea, vomiting, diarrhea, constipation (very common) *(score=0.85)*
