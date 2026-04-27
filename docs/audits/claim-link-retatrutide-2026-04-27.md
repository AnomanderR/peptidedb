# Claim-link audit: retatrutide

> Generated 2026-04-27 by `bun run audit:claims retatrutide`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 10
- ✅ ok (score ≥ 0.85): 1
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 9
- — skipped (no PMIDs available): 0

## ❌ Unsupported (P0 — must fix or remove citation)

### hero_stats[0]

- **Claim**: Weekly dose: 1–12 mg
- **Score**: 0.00
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The abstract provided is a brief editorial comment on retatrutide for obesity and contains no dosing information. It does not substantively support the claim about a weekly dose of 1-12 mg.

### hero_stats[1]

- **Claim**: Body-weight ↓: 24.2%
- **Score**: 0.00
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The cited abstract is a brief editorial comment on a retatrutide study, providing no specific efficacy data. It does not contain or support the claim of 24.2% body-weight reduction.

### mechanism.pathway

- **Claim**: Pathway: Triple-receptor activation → ↑insulin (GLP-1+GIP), ↓gastric emptying, ↑lipid handling, ↑energy expenditure (glucagon component)
- **Score**: 0.45
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The cited abstract is a brief editorial comment on retatrutide (a triple-receptor agonist) for obesity but provides no mechanistic details about insulin secretion, gastric emptying, lipid handling, or energy expenditure pathways. The claim requires specific mechanistic support that this abstract does not contain.

### mechanism.downstream_effect

- **Claim**: Downstream effect: Maximal weight loss across class. Glucagon component drives lipolysis and energy expenditure beyond GLP-1+GIP alone
- **Score**: 0.45
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The cited abstract is a brief editorial comment on retatrutide (a triple-hormone agonist) but contains no substantive discussion of mechanisms, lipolysis, energy expenditure, or comparative effects of glucagon versus GLP-1+GIP components. The abstract does not support the specific mechanistic claim about glucagon's role in driving weight loss.

### mechanism.origin

- **Claim**: Origin / discovery: Synthetic peptide engineered for balanced affinity at three incretin / glucagon receptors
- **Score**: 0.45
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The abstract mentions retatrutide as a triple-hormone-receptor agonist but does not describe its engineering, synthetic origin, or the process of achieving balanced affinity across the three incretin/glucagon receptors. The cited paper is a brief commentary without substantive methodological or discovery details.

### dosage.rows[0].value

- **Claim**: Dosage value: 12 mg / week (max efficacy)
- **Score**: 0.00
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The abstract provided is a commentary/letter to the editor about retatrutide for obesity and contains no information about dosage values, efficacy thresholds, or the specific claim of 12 mg/week maximum efficacy. The abstract does not substantively support the claim.

### dosage.rows[3].value

- **Claim**: Dosage value: Phase 2 trial; Phase 3 ongoing
- **Score**: 0.00
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The cited abstract is a brief editorial comment on retatrutide for obesity and contains no information about dosage values, phase trial status, or ongoing clinical trial phases.

### side_effects.rows[0].value

- **Claim**: Side effect: Nausea, vomiting, diarrhea (very common, dose-dependent)
- **Score**: 0.00
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The provided abstract is only a brief editorial comment on a clinical trial and contains no substantive information about side effects, gastrointestinal symptoms, dosing relationships, or the frequency of nausea, vomiting, or diarrhea. No supporting evidence for the claim is present in this abstract.

### side_effects.rows[1].value

- **Claim**: Side effect: ↑ resting HR (3–7 bpm at 12 mg)
- **Score**: 0.00
- **Citations**: jastreboff-2023-reta (PMID 37888926)
- **Rationale**: The cited abstract is a brief editorial comment on retatrutide for obesity and does not contain specific data about resting heart rate changes or side effects at the 12 mg dose. No numerical values for heart rate increases are provided in this abstract.

## ✅ OK (collapsed for brevity)

- **mechanism.primary_target**: Primary target: GLP-1R + GIPR + Glucagon receptor (triple agonism) *(score=0.95)*
