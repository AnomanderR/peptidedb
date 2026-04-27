# Claim-link audit: glutathione

> Generated 2026-04-27 by `bun run audit:claims glutathione`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 4
- ✅ ok (score ≥ 0.85): 4
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **hero_stats[2]**: Biosynthesis: GCL + GS *(score=0.92)*
- **mechanism.origin**: Origin / discovery: Endogenous tripeptide; predominantly synthesized in liver, exported to extracellular space and tissues *(score=0.92)*
- **side_effects.rows[3].value**: Side effect: Extracellular GSH catabolism supplies cysteine to tumors; theoretical concern in active malignancy *(score=0.95)*
- **side_effects.contraindications_relative[0]**: Relative contraindication: Active malignancy (theoretical cysteine supply risk) *(score=0.85)*
