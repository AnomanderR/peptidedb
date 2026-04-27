# Claim-link audit: adamax

> Generated 2026-04-27 by `bun run audit:claims adamax`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 17
- ✅ ok (score ≥ 0.85): 17
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **summary**: Summary: Synthetic ACTH(4-10) analogue developed in Russia, structurally related to Semax but with distinct amino acid modifications at positions 8-10. Investigated primarily in Russian-language literature for cognitive enhancement, neuroprotection, and BDNF upregulation. Animal studies demonstrate modulation of hippocampal BDNF/trkB signaling, normalization of circadian rhythms, and attenuation of stress-related behavioral alterations. Limited human data exists; most evidence derives from rodent models. *(score=0.92)*
- **hero_stats[0]**: BDNF protein ↑: 1.4× *(score=0.95)*
- **hero_stats[1]**: BDNF mRNA (exon III): 3× *(score=0.95)*
- **hero_stats[2]**: trkB phosphorylation: 1.6× *(score=0.95)*
- **mechanism.downstream_effect**: Downstream effect: Increased hippocampal BDNF expression, trkB tyrosine phosphorylation, enhanced conditioned avoidance learning, circadian rhythm normalization *(score=0.95)*
- **mechanism.origin**: Origin / discovery: ACTH(4-10) fragment with modified amino acid sequence at positions 8, 9, 10 *(score=0.85)*
- **mechanism.feedback_intact**: Feedback loop: Non-endocrine — devoid of adrenal axis effects *(score=0.92)*
- **mechanism.receptor_class**: Receptor class: Melanocortin receptors (lower affinity than α-MSH derivatives) *(score=0.92)*
- **mechanism.diagram[1].text**: Mechanism diagram step: ↓ Binds melanocortin receptors *(score=0.92)*
- **mechanism.diagram[3].text**: Mechanism diagram step: ↓ BDNF/trkB upregulation *(score=0.92)*
- **mechanism.diagram[4].text**: Mechanism diagram step: Enhanced learning, neuroprotection, circadian synchronization *(score=0.90)*
- **dosage.rows[0].value**: Dosage value: 50 mcg/kg body weight *(score=0.95)*
- **dosage.rows[1].value**: Dosage value: Intranasal *(score=0.92)*
- **side_effects.rows[0].value**: Side effect: ACTH(4-10) fragments may have pressor and cardioaccelerator actions at high doses *(score=0.95)*
- **side_effects.rows[1].value**: Side effect: ACTH(4-10) exhibited natriuretic activity at lower doses (7 nmol/kg) *(score=0.95)*
- **side_effects.rows[2].value**: Side effect: Suppression of aggression, reduced orientation-cognition reactions in rabbits *(score=0.95)*
- **administration.steps[1]**: Route: Intranasal administration is the primary route in animal and exploratory human studies. Delivered via nasal spray or dropper to ensure mucosal absorption. *(score=0.92)*
