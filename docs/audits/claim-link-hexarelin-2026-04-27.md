# Claim-link audit: hexarelin

> Generated 2026-04-27 by `bun run audit:claims hexarelin`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 16
- ✅ ok (score ≥ 0.85): 0
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 1
- — skipped (no PMIDs available): 15

## ❌ Unsupported (P0 — must fix or remove citation)

### synergy.stacks[0]

- **Claim**: Stack with cjc-1295: Hexarelin (GHRP) + CJC-1295-no-DAC (GHRH analogue) is the higher-amplitude variant of the standard GHRH+GHRP stack. Hexarelin produces a stronger pulse than ipamorelin but with cortisol + prolactin signal — choose this stack for maximum GH amplitude when side-effect tolerance is acceptable. Cycle aggressively. (primary benefit: Maximum GH pulse amplitude (with side-effect signal))
- **Score**: 0.15
- **Citations**: smith-1996-hexarelin (no PMID), teichman-2006 (PMID 16352683)
- **Rationale**: The cited abstract only discusses CJC-1295 alone and its pharmacokinetic/pharmacodynamic profile. It provides no information about hexarelin, ipamorelin, GHRP combinations, comparative GH pulse amplitudes, or side-effect profiles (cortisol/prolactin), making it unable to substantiate the claim about stacking strategies or relative efficacy.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Per dose: 100–200 mcg
  - Citations: smith-1996-hexarelin
- **hero_stats[1]**: Evidence level: Phase 1
  - Citations: ghigo-1997-hexarelin
- **hero_stats[2]**: Half-life: ~70 min
  - Citations: semenistaya-2010
- **mechanism.primary_target**: Primary target: Ghrelin receptor (GHS-R1a) + cardiac CD36
  - Citations: smith-1996-hexarelin, ghigo-1997-hexarelin
- **mechanism.pathway**: Pathway: GHS-R1a → Gαq → Ca²⁺ → GH release. CD36 engagement → direct cardio-tropic action
  - Citations: ghigo-1997-hexarelin
- **mechanism.downstream_effect**: Downstream effect: Strong GH pulse + IGF-1 elevation; cardio-protective effects in animal MI models
  - Citations: ghigo-1997-hexarelin
- **mechanism.origin**: Origin / discovery: Synthetic hexapeptide His-D-2-Methyl-Trp-Ala-Trp-D-Phe-Lys-NH₂
  - Citations: smith-1996-hexarelin
- **mechanism.feedback_intact**: Feedback loop: Yes initially; tachyphylaxis with chronic use
  - Citations: ghigo-1997-hexarelin
- **dosage.rows[0].value**: Dosage value: 100–200 mcg per injection
  - Citations: smith-1996-hexarelin
- **dosage.rows[3].value**: Dosage value: Phase 1 / Phase 2 trials
  - Citations: smith-1996-hexarelin, ghigo-1997-hexarelin
- **dosage.rows[7].value**: Dosage value: ~70 min
  - Citations: semenistaya-2010
- **side_effects.rows[0].value**: Side effect: Modest at high doses
  - Citations: ghigo-1997-hexarelin
- **side_effects.rows[1].value**: Side effect: Modest at high doses
  - Citations: ghigo-1997-hexarelin
- **side_effects.rows[3].value**: Side effect: Receptor desensitisation with chronic dosing
  - Citations: ghigo-1997-hexarelin
- **side_effects.rows[4].value**: Side effect: Direct cardio-tropic; potential benefit in MI but unstudied in humans
  - Citations: ghigo-1997-hexarelin
