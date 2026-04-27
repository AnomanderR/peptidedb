# Claim-link audit: cerebrolysin

> Generated 2026-04-27 by `bun run audit:claims cerebrolysin`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 9
- ✅ ok (score ≥ 0.85): 8
- ⚠️ partial (0.6–0.85): 1
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ⚠️ Partial (P1 — human review)

### dosage.rows[1].value

- **Claim**: Dosage value: 10–20 mL / day IV or IM
- **Score**: 0.75
- **Citations**: khatkova-2026 (PMID 41661016)
- **Rationale**: Abstract [1] mentions intravenous Cerebrolysin administration at 20 ml (10 infusions), which falls within the claimed 10–20 mL/day IV range, but does not explicitly specify 'per day' dosing—it describes course dosing rather than daily dosage.

## ✅ OK (collapsed for brevity)

- **hero_stats[0]**: Standard dose: 30 mL/day *(score=0.92)*
- **hero_stats[2]**: mRS 0-2 at 12 mo: 49% vs 35% *(score=0.95)*
- **mechanism.diagram[4].text**: Mechanism diagram step: Anti-apoptotic (Bcl-2 ↑, Bax ↓) *(score=0.85)*
- **mechanism.diagram[5].text**: Mechanism diagram step: Anti-inflammatory (TNF-α ↓) *(score=0.92)*
- **dosage.rows[0].value**: Dosage value: 30–50 mL / day IV *(score=0.92)*
- **dosage.rows[2].value**: Dosage value: 50 mL / day IV *(score=0.95)*
- **side_effects.rows[3].value**: Side effect: Mild, transient; incidence not significantly elevated vs placebo *(score=0.92)*
- **side_effects.rows[5].value**: Side effect: Reduced incidence vs control (52% reduction in high-risk post-thrombolysis cohort) *(score=0.92)*
