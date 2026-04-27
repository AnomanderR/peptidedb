# Claim-link audit: ara-290

> Generated 2026-04-27 by `bun run audit:claims ara-290`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 15
- ✅ ok (score ≥ 0.85): 15
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **summary**: Summary: Synthetic 11-amino-acid peptide derived from erythropoietin helix B. Non-erythropoietic but tissue-protective via innate repair receptor (EPO/CD131 heterodimer). Phase 2 trials demonstrate corneal nerve fiber regeneration, reduced neuropathic pain, and improved metabolic control in sarcoidosis-associated small fiber neuropathy and type 2 diabetes with painful neuropathy. *(score=0.92)*
- **hero_route**: Administration route: SQ · Daily *(score=0.92)*
- **hero_stats[0]**: Daily dose: 4 mg *(score=0.95)*
- **hero_stats[1]**: Phase 2 duration: 28 days *(score=0.95)*
- **hero_stats[2]**: Safety profile: Non-erythropoietic *(score=0.92)*
- **mechanism.downstream_effect**: Downstream effect: Tissue protection, nerve fiber regeneration, suppression of inflammatory macrophage activation, altered T-cell differentiation (↑Treg, ↑Th2, ↓Th1) *(score=0.85)*
- **mechanism.feedback_intact**: Feedback loop: N/A — does not interact with hematopoietic EPO receptor *(score=0.92)*
- **dosage.rows[0].value**: Dosage value: 4 mg / day *(score=0.92)*
- **dosage.rows[2].value**: Dosage value: 28 days (Phase 2) *(score=0.95)*
- **dosage.rows[3].value**: Dosage value: Phase 2 RCTs *(score=0.85)*
- **dosage.rows[4].value**: Dosage value: Subcutaneous *(score=0.95)*
- **fat_loss.rows[0].value**: Fat-loss row value: Improved metabolic control (HbA1c, fasting glucose) *(score=0.90)*
- **side_effects.rows[4].value**: Side effect: Well-tolerated in Phase 2 trials *(score=0.92)*
- **administration.steps[2]**: Timing: Once daily, any time of day. Self-administered in Phase 2 trials. *(score=0.95)*
- **administration.steps[3]**: Dosing: 4 mg daily for 28 days (Phase 2 protocol). Duration for chronic use not established. *(score=0.92)*
