# Claim-link audit: hcg

> Generated 2026-04-27 by `bun run audit:claims hcg`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 12
- ✅ ok (score ≥ 0.85): 12
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **hero_stats[0]**: Typical dose (2×/wk): 2,000 IU *(score=0.92)*
- **hero_stats[1]**: Sperm induction rate: 70–90% *(score=0.92)*
- **hero_stats[2]**: Time to sperm appearance: 12–24 mo *(score=0.92)*
- **mechanism.primary_target**: Primary target: LH receptors on testicular Leydig cells *(score=0.92)*
- **mechanism.downstream_effect**: Downstream effect: Elevated intratesticular testosterone, restored spermatogenesis, virilization, secondary sex characteristic development *(score=0.92)*
- **dosage.rows[0].value**: Dosage value: 2,000 IU IM/SQ 2–3×/week *(score=0.92)*
- **dosage.rows[1].value**: Dosage value: hCG 2,000 IU 2×/wk + rFSH 75 IU 3×/wk *(score=0.95)*
- **dosage.rows[2].value**: Dosage value: hCG 2,000 IU 2×/wk + rFSH 75 IU 3×/wk + testosterone 100 mg IM q2wk *(score=0.95)*
- **dosage.rows[4].value**: Dosage value: RCT / Meta-analysis / FDA-approved *(score=0.85)*
- **dosage.rows[5].value**: Dosage value: 12–24 months (median ~18 mo) *(score=0.92)*
- **dosage.rows[6].value**: Dosage value: Intramuscular or subcutaneous *(score=0.92)*
- **dosage.rows[7].notes**: Dosage notes: Thickened seminiferous tubules (>300 μm) on ultrasound predict imminent sperm appearance. *(score=0.92)*
