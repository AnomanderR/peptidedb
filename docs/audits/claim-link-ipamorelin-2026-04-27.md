# Claim-link audit: ipamorelin

> Generated 2026-04-27 by `bun run audit:claims ipamorelin`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 15
- ✅ ok (score ≥ 0.85): 2
- ⚠️ partial (0.6–0.85): 3
- ❌ unsupported (< 0.6): 8
- — skipped (no PMIDs available): 2

## ❌ Unsupported (P0 — must fix or remove citation)

### hero_stats[0]

- **Claim**: Per dose: 200–300 mcg
- **Score**: 0.00
- **Citations**: raun-1998 (PMID 9849822)
- **Rationale**: The abstract discusses ipamorelin's pharmacological properties and ED50 values in animal models (expressed in nmol/kg), but does not mention any human dosing information or per-dose amounts in micrograms (mcg). The claim about 200–300 mcg per dose is not addressed in this preclinical research paper.

### hero_stats[1]

- **Claim**: Evidence level: Phase 1
- **Score**: 0.15
- **Citations**: raun-1998 (PMID 9849822), sigalos-2018 (no PMID)
- **Rationale**: The cited abstract describes preclinical pharmacology studies (in vitro rat pituitary cells, anesthetized rats, conscious swine) of ipamorelin, which represents early-stage research rather than Phase 1 clinical evidence in humans. The claim of 'Phase 1' evidence level cannot be substantiated from a paper focused on animal model studies.

### hero_stats[2]

- **Claim**: Half-life: ~2 hr
- **Score**: 0.00
- **Citations**: raun-1998 (PMID 9849822)
- **Rationale**: The cited abstract describes ipamorelin's pharmacology and GH-releasing potency but contains no information about half-life or pharmacokinetic parameters. The claim about a ~2 hour half-life is not addressed in this paper.

### mechanism.pathway

- **Claim**: Pathway: GHS-R1a binding → Gαq/11 → ↑intracellular Ca²⁺ → GH vesicle exocytosis
- **Score**: 0.15
- **Citations**: raun-1998 (PMID 9849822), bowers-1991 (no PMID)
- **Rationale**: The abstract describes ipamorelin as a GH secretagogue acting via a 'GHRP-like receptor' and confirms GH release activity, but does not address the specific downstream signaling pathway involving GHS-R1a, Gαq/11 coupling, intracellular Ca²⁺ mobilization, or vesicle exocytosis mechanisms.

### dosage.rows[0].value

- **Claim**: Dosage value: 200–300 mcg per injection
- **Score**: 0.00
- **Citations**: raun-1998 (PMID 9849822)
- **Rationale**: The cited abstract describes ipamorelin's pharmacology and potency in animal models (rats and swine) using nmol/kg dosing units, but contains no information about human dosing in mcg per injection. The abstract does not support the specific claim of a 200–300 mcg dosage range.

### dosage.rows[3].value

- **Claim**: Dosage value: Phase 1 + clinical practice
- **Score**: 0.15
- **Citations**: raun-1998 (PMID 9849822), sigalos-2018 (no PMID)
- **Rationale**: The cited abstract describes ipamorelin's pharmacology and preclinical/early development characteristics, mentioning it as 'a very interesting candidate for future clinical development,' but provides no specific Phase 1 dosage information or clinical practice dosage values. The claim requires concrete dosage data that the abstract does not supply.

### dosage.rows[7].value

- **Claim**: Dosage value: ~2 hours
- **Score**: 0.00
- **Citations**: raun-1998 (PMID 9849822)
- **Rationale**: The abstract describes ipamorelin's pharmacological properties and GH-releasing potency but contains no information about dosage duration or a ~2 hour timeframe. The cited paper does not substantiate the claim.

### synergy.stacks[1]

- **Claim**: Stack with cjc-1295: CJC-1295 (no DAC) is a short-acting GHRH analogue. Combined with ipamorelin (GHRP), the pulse is amplified across both receptor systems with timing similar to native physiology. Without the DAC modification, the stack maintains sharp peaks rather than the sustained elevation seen with CJC-1295-DAC + ipamorelin. (primary benefit: Pulsatile GH stimulation matching physiological pattern)
- **Score**: 0.15
- **Citations**: teichman-2006 (PMID 16352683), ionescu-2006 (no PMID)
- **Rationale**: The cited abstract describes CJC-1295 as a 'long-acting' GHRH analog with a half-life of 5.8-8.1 days and sustained GH elevation lasting 6+ days, directly contradicting the claim that CJC-1295 (no DAC) is 'short-acting.' The abstract does not discuss CJC-1295 without DAC, ipamorelin, pulsatile patterns, or comparative kinetics with DAC-modified versions.

## ⚠️ Partial (P1 — human review)

### mechanism.primary_target

- **Claim**: Primary target: Ghrelin receptor (GHS-R1a) on anterior pituitary
- **Score**: 0.75
- **Citations**: raun-1998 (PMID 9849822)
- **Rationale**: Abstract [1] discusses ipamorelin as a GHRP-receptor agonist that stimulates GH release from pituitary cells, supporting the general premise of pituitary targeting. However, it does not explicitly identify or confirm GHS-R1a as the primary target receptor—it only references a 'GHRP-like receptor' without molecular specificity.

### side_effects.rows[1].value

- **Claim**: Side effect: Negligible
- **Score**: 0.72
- **Citations**: raun-1998 (PMID 9849822)
- **Rationale**: Abstract [1] demonstrates ipamorelin's selectivity for GH release without affecting FSH, LH, PRL, or TSH, and notably lacks ACTH/cortisol elevation seen with other secretagogues—supporting a favorable side effect profile. However, the abstract does not explicitly characterize side effects as 'negligible' and focuses on pharmacological selectivity rather than clinical adverse event data.

### synergy.stacks[0]

- **Claim**: Stack with tesamorelin: Ipamorelin (GHRP) + tesamorelin (GHRH analogue) is the textbook dual-axis GH stack. They activate two distinct pituitary receptors — the ghrelin receptor and the GHRH receptor — producing a synergistic GH pulse larger than either alone. Ipamorelin's selectivity (no cortisol/prolactin spike) makes it the ideal GHRP partner for long-term protocols. (primary benefit: Maximal GH pulsatility, fat loss, recovery, sleep depth)
- **Score**: 0.72
- **Citations**: raun-1998 (PMID 9849822), bowers-2002 (no PMID)
- **Rationale**: Abstract [1] strongly supports ipamorelin's selectivity (no cortisol/prolactin spike) and confirms it acts via GHRP-like receptor, but does not address synergistic effects when combined with tesamorelin (GHRH analogue), dual-axis activation, or the specific benefits claimed (fat loss, recovery, sleep depth). The synergy claim remains unsupported by the cited abstract.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **mechanism.downstream_effect**: Downstream effect: GH pulse amplification, IGF-1 elevation, recovery and lipolytic effects
  - Citations: bowers-2002
- **mechanism.feedback_intact**: Feedback loop: Yes — pulsatile pattern preserved; somatostatin feedback active
  - Citations: bowers-2002

## ✅ OK (collapsed for brevity)

- **mechanism.origin**: Origin / discovery: Pentapeptide H-Aib-His-D-2-Nal-D-Phe-Lys-NH₂; rationally designed for ghrelin-receptor selectivity *(score=0.92)*
- **side_effects.rows[0].value**: Side effect: Negligible vs other GHRPs *(score=0.92)*
