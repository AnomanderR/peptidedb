# Claim-link audit: tesofensine

> Generated 2026-04-27 by `bun run audit:claims tesofensine`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 10
- ✅ ok (score ≥ 0.85): 5
- ⚠️ partial (0.6–0.85): 2
- ❌ unsupported (< 0.6): 3
- — skipped (no PMIDs available): 0

## ❌ Unsupported (P0 — must fix or remove citation)

### hero_stats[2]

- **Claim**: Evidence level: Phase 3
- **Score**: 0.15
- **Citations**: astrup-2008-tesofensine (PMID 18950853)
- **Rationale**: The cited abstract is explicitly described as a 'phase II' trial, not Phase 3. The abstract concludes that findings 'need confirmation in phase III trials,' indicating this study preceded Phase 3 testing. The claim of 'Evidence level: Phase 3' is directly contradicted by the source material.

### mechanism.origin

- **Claim**: Origin / discovery: Small molecule developed by NeuroSearch (Denmark) for CNS indications, repurposed for obesity
- **Score**: 0.35
- **Citations**: astrup-2008-tesofensine (PMID 18950853)
- **Rationale**: The abstract confirms tesofensine was tested for obesity and mentions it is an inhibitor of monoamine uptake, but does not explicitly state it was developed by NeuroSearch (Denmark) or that it was originally developed for other CNS indications and then repurposed for obesity. The paper demonstrates efficacy in obesity trials but lacks information about the drug's origin, developer, or original indication.

### side_effects.rows[0].value

- **Claim**: Side effect: Dose-dependent ↑ HR + BP
- **Score**: 0.45
- **Citations**: astrup-2008-tesofensine (PMID 18950853)
- **Rationale**: Abstract [1] reports that tesofensine 0.5 mg increased heart rate by 7.4 bpm (p=0.0001) but showed no significant increases in systolic or diastolic blood pressure. This partially contradicts the claim of dose-dependent increases in both HR and BP; only HR increase is supported, and BP effects are not dose-dependent or significant in this study.

## ⚠️ Partial (P1 — human review)

### mechanism.pathway

- **Claim**: Pathway: Triple monoamine reuptake inhibition → ↑synaptic 5-HT, NE, DA → appetite suppression + thermogenesis
- **Score**: 0.72
- **Citations**: astrup-2008-tesofensine (PMID 18950853)
- **Rationale**: Abstract [1] confirms tesofensine is a triple monoamine reuptake inhibitor (noradrenaline, dopamine, serotonin) and demonstrates significant weight loss, supporting the downstream effect of appetite suppression. However, the abstract does not explicitly address the mechanistic pathway to increased synaptic monoamines or thermogenesis as mechanisms of action—it only reports the clinical outcome of weight loss.

### mechanism.downstream_effect

- **Claim**: Downstream effect: Strong appetite suppression, mild thermogenic effect, weight loss
- **Score**: 0.75
- **Citations**: astrup-2008-tesofensine (PMID 18950853)
- **Rationale**: Abstract [1] directly supports appetite suppression (implied by mechanism as monoamine reuptake inhibitor and common adverse events like nausea) and strong weight loss (9.2-10.6% vs 2.0% for placebo). However, thermogenic effect is not explicitly mentioned or discussed in the abstract, making the claim only partially supported.

## ✅ OK (collapsed for brevity)

- **hero_stats[0]**: Daily dose: 0.25–0.5 mg *(score=0.95)*
- **hero_stats[1]**: Weight ↓ (24 wk): 9.2 kg *(score=0.92)*
- **mechanism.primary_target**: Primary target: Serotonin / norepinephrine / dopamine transporters (SERT / NET / DAT) *(score=0.95)*
- **dosage.rows[0].value**: Dosage value: 0.25–0.5 mg / day *(score=0.95)*
- **dosage.rows[3].value**: Dosage value: Phase 2b + ongoing Phase 3 *(score=0.85)*
