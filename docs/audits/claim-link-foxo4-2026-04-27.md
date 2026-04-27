# Claim-link audit: foxo4

> Generated 2026-04-27 by `bun run audit:claims foxo4`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 9
- ✅ ok (score ≥ 0.85): 9
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **summary**: Summary: D-retro-inverso peptide derived from the FOXO4 transcription factor's p53-binding domain. Disrupts FOXO4-p53 interaction selectively in senescent cells, triggering apoptosis while sparing healthy tissue. Cleared senescent cells in aged mice, restored cerebral blood flow, and improved physical function. Pre-clinical only — no human trials completed. *(score=0.92)*
- **hero_stats[0]**: Molecular target: p53-TAD *(score=0.95)*
- **mechanism.primary_target**: Primary target: FOXO4-p53 protein complex in senescent cells *(score=0.92)*
- **mechanism.downstream_effect**: Downstream effect: Selective apoptosis of senescent cells; clearance restores tissue homeostasis *(score=0.92)*
- **mechanism.diagram[1].text**: Mechanism diagram step: ↓ FOXO4-DRI binds p53-TAD *(score=0.95)*
- **mechanism.diagram[3].text**: Mechanism diagram step: ↓ p53 nuclear exclusion *(score=0.92)*
- **side_effects.rows[0].value**: Side effect: Senescent cell elimination promoted PH development/progression in rodent models *(score=0.95)*
- **side_effects.rows[1].value**: Side effect: Beneficial effects may be tissue/context-specific; elimination not universally protective *(score=0.92)*
- **side_effects.contraindications_absolute[0]**: Absolute contraindication: Pulmonary hypertension or vascular disease (preclinical evidence of harm) *(score=0.85)*
