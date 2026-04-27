# Claim-link audit: tesamorelin

> Generated 2026-04-27 by `bun run audit:claims tesamorelin`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 23
- ✅ ok (score ≥ 0.85): 5
- ⚠️ partial (0.6–0.85): 3
- ❌ unsupported (< 0.6): 2
- — skipped (no PMIDs available): 13

## ❌ Unsupported (P0 — must fix or remove citation)

### dosage.rows[2].value

- **Claim**: Dosage value: 1 mg / day
- **Score**: 0.00
- **Citations**: falutz-2010 (PMID 20554713)
- **Rationale**: The cited abstract describes tesamorelin dosing at 2 mg daily, not 1 mg/day. No mention of 1 mg/day dosage appears in the study design or interventions section.

### fat_loss.rows[8].value

- **Claim**: Fat-loss row value: Falutz et al. NEJM 2007 · Falutz JCEM 2010 · FDA approval 2010
- **Score**: 0.45
- **Citations**: falutz-2007 (PMID 18057338), falutz-2010 (PMID 20554713), fda-egrifta-label-2010 (no PMID)
- **Rationale**: The cited abstracts discuss tesamorelin's effects on visceral fat reduction in HIV patients, but neither abstract mentions 'fat-loss row value' (an undefined term), and neither demonstrates FDA approval in 2010. The abstracts are about clinical trial results, not regulatory approval status.

## ⚠️ Partial (P1 — human review)

### fat_loss.rows[1].value

- **Claim**: Fat-loss row value: 15–20% VAT ↓
- **Score**: 0.75
- **Citations**: falutz-2010 (PMID 20554713)
- **Rationale**: Abstract [1] reports tesamorelin treatment achieved a VAT reduction of -15.4% at week 26 (within the claimed 15-20% range) and -17.5% at week 52 (slightly below the upper bound). The claim appears to reference fat-loss intervention outcomes, and the abstract substantively demonstrates VAT reductions in this range, though the exact mechanism or context of "fat-loss row" is unclear from the abstract alone.

### fat_loss.rows[2].value

- **Claim**: Fat-loss row value: +66 ng/mL (2 mg dose) · +81% mean elevation
- **Score**: 0.75
- **Citations**: falutz-2007 (PMID 18057338)
- **Rationale**: The abstract reports IGF-I levels increased by 81.0% in the tesamorelin group (matching the claim's '81% mean elevation'), and the study used a 2 mg dose of tesamorelin as stated. However, the abstract does not specify an absolute value change of '+66 ng/mL' for IGF-I or relate this to 'fat-loss row value,' so the claim is only partially supported by the cited abstract.

### synergy.stacks[0]

- **Claim**: Stack with ipamorelin: Tesamorelin (GHRH analogue) and ipamorelin (GHRP / ghrelin mimetic) act on two distinct receptor systems to amplify GH release synergistically — GHRH receptor + ghrelin receptor. This dual-axis stimulation produces a more robust, sustained GH pulse than either alone while maintaining physiological pulsatility. Ipamorelin is highly selective with minimal cortisol or prolactin elevation, making it the preferred GHRP pairing. (primary benefit: Maximal GH pulsatility, fat loss, recovery, sleep quality)
- **Score**: 0.62
- **Citations**: raun-1998 (PMID 9849822)
- **Rationale**: Abstract [1] confirms ipamorelin is a GHRP-receptor agonist with minimal cortisol/prolactin elevation and high GH selectivity, supporting those specific claims. However, it does not address synergistic effects with tesamorelin (GHRH), dual-axis stimulation, sustained pulsatility comparisons, or the functional benefits (fat loss, recovery, sleep). The claim's core mechanism—synergistic interaction between GHRH and GHRP receptors—remains unsupported by the cited abstract.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Daily dose: 2 mg
  - Citations: fda-egrifta-label-2010
- **hero_stats[2]**: Half-life: ~26 min
  - Citations: fda-egrifta-label-2010
- **mechanism.primary_target**: Primary target: Hypothalamic GHRH receptors
  - Citations: fda-egrifta-label-2010
- **mechanism.origin**: Origin / discovery: Synthetic 44-AA GHRH analogue with trans-3-hexenoic-acid modification for stability
  - Citations: fda-egrifta-label-2010
- **mechanism.antibody_development**: Antibody development: ~50% after 26 wks (non-neutralising in most)
  - Citations: sevigny-2018
- **dosage.rows[0].value**: Dosage value: 2 mg / day
  - Citations: fda-egrifta-label-2010
- **dosage.rows[7].value**: Dosage value: ~26 min (plasma)
  - Citations: fda-egrifta-label-2010
- **fat_loss.rows[4].value**: Fat-loss row value: Neutral to slight impairment (monitor HbA1c)
  - Citations: clarke-2018
- **fat_loss.rows[6].value**: Fat-loss row value: Generally neutral; 4.5% HbA1c elevation risk
  - Citations: clarke-2018
- **side_effects.rows[2].value**: Side effect: HbA1c ↑ in 4.5% vs 1.3% placebo; HbA1c ≥6.5% hazard OR 3.3
  - Citations: clarke-2018
- **side_effects.rows[4].value**: Side effect: Contraindicated in active malignancy (GH/IGF-1 axis); theoretical tumour growth risk
  - Citations: fda-egrifta-label-2010
- **side_effects.rows[5].value**: Side effect: ~50% at 26 weeks; non-neutralising in most; rare hypersensitivity (<1%)
  - Citations: sevigny-2018
- **side_effects.rows[7].value**: Side effect: Contraindicated
  - Citations: fda-egrifta-label-2010

## ✅ OK (collapsed for brevity)

- **hero_stats[1]**: VAT reduction: 15–20% *(score=0.92)*
- **mechanism.pathway**: Pathway: GHRH → Pituitary GH release → Liver IGF-1 synthesis *(score=0.85)*
- **mechanism.downstream_effect**: Downstream effect: Increased GH pulsatility, elevated IGF-1, lipolysis of visceral adipose tissue *(score=0.92)*
- **dosage.rows[3].value**: Dosage value: RCT / FDA-approved *(score=0.92)*
- **fat_loss.rows[5].value**: Fat-loss row value: Significant TG reduction noted in Phase 3 *(score=0.92)*
