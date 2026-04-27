# Claim-link audit: ss-31

> Generated 2026-04-27 by `bun run audit:claims ss-31`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 9
- ✅ ok (score ≥ 0.85): 4
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 5
- — skipped (no PMIDs available): 0

## ❌ Unsupported (P0 — must fix or remove citation)

### hero_stats[0]

- **Claim**: Daily dose: 40 mg
- **Score**: 0.00
- **Citations**: szeto-2014 (PMID 24117165)
- **Rationale**: The abstract discusses SS-31, a cardiolipin-protective peptide, its mechanism of action, and therapeutic potential, but contains no mention of dosing, daily doses, or the specific dose of 40 mg.

### hero_stats[1]

- **Claim**: Evidence level: Phase 3
- **Score**: 0.00
- **Citations**: szilagyi-2009 (no PMID), szeto-2014 (PMID 24117165)
- **Rationale**: The cited abstract is a review article about SS-31's mechanisms and therapeutic potential, mentioning 'clinical development programme,' but contains no information about Phase 3 trial status, patient outcomes, or evidence level classification.

### dosage.rows[0].value

- **Claim**: Dosage value: 40 mg / day SQ (clinical trials)
- **Score**: 0.00
- **Citations**: szeto-2014 (PMID 24117165)
- **Rationale**: The abstract discusses SS-31 as a cardiolipin-protective compound and mentions its clinical development programme, but provides no specific dosage information (40 mg/day or otherwise) for any clinical trials.

### dosage.rows[3].value

- **Claim**: Dosage value: Multiple Phase 3 trials (Barth, AMD, ischemia-reperfusion)
- **Score**: 0.25
- **Citations**: szeto-2014 (PMID 24117165), szilagyi-2009 (no PMID)
- **Rationale**: The abstract mentions SS-31 clinical development but does not specify dosage values or confirm Phase 3 trials in Barth disease, AMD, or ischemia-reperfusion models. It only references 'extensive animal studies' and a general 'clinical development programme' without concrete trial details.

### side_effects.rows[4].value

- **Claim**: Side effect: Phase 3 data over 24+ months; no major safety signals
- **Score**: 0.15
- **Citations**: szeto-2014 (PMID 24117165)
- **Rationale**: The abstract is a mechanistic review of SS-31's pharmacology and therapeutic potential, but contains no Phase 3 clinical data, safety signals, or any information about 24+ month trial duration. It mentions 'clinical development programme' generically but does not substantively support the specific claim about Phase 3 safety data.

## ✅ OK (collapsed for brevity)

- **mechanism.primary_target**: Primary target: Cardiolipin in inner mitochondrial membrane *(score=0.95)*
- **mechanism.pathway**: Pathway: Cardiolipin binding → cristae stabilisation → ETC integrity → reduced ROS + preserved ATP synthesis *(score=0.92)*
- **mechanism.downstream_effect**: Downstream effect: Mitochondrial bioenergetic preservation; cardio-, neuro-, and reno-protective effects in animal + clinical studies *(score=0.92)*
- **mechanism.origin**: Origin / discovery: Synthetic tetrapeptide D-Arg-Dmt-Lys-Phe-NH₂; cell-permeable, mitochondrial-selective *(score=0.92)*
