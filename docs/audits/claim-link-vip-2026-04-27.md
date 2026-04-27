# Claim-link audit: vip

> Generated 2026-04-27 by `bun run audit:claims vip`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 7
- ✅ ok (score ≥ 0.85): 7
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **hero_route**: Administration route: IV infusion · Inhaled (investigational) *(score=0.92)*
- **hero_stats[0]**: Primary route: Intravenous *(score=0.95)*
- **hero_stats[1]**: Lead indication: ARDS *(score=0.92)*
- **mechanism.primary_target**: Primary target: VPAC1 and VPAC2 G-protein-coupled receptors *(score=0.92)*
- **dosage.rows[1].value**: Dosage value: 12-hour continuous IV infusion daily *(score=0.92)*
- **dosage.rows[2].value**: Dosage value: Variable dosing under clinical trial protocols *(score=0.85)*
- **dosage.rows[4].value**: Dosage value: Phase 3 RCT (TESICO) *(score=0.92)*
