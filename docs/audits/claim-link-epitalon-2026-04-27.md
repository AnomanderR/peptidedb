# Claim-link audit: epitalon

> Generated 2026-04-27 by `bun run audit:claims epitalon`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 8
- ✅ ok (score ≥ 0.85): 2
- ⚠️ partial (0.6–0.85): 1
- ❌ unsupported (< 0.6): 5
- — skipped (no PMIDs available): 0

## ❌ Unsupported (P0 — must fix or remove citation)

### hero_stats[0]

- **Claim**: Per cycle dose: 5–10 mg
- **Score**: 0.00
- **Citations**: khavinson-2003 (PMID 12937682)
- **Rationale**: The abstract describes in vitro effects of Epithalon peptide on telomerase activity in cell culture but contains no information about dosing, per-cycle doses, or any dosage parameters (5–10 mg or otherwise).

### mechanism.pathway

- **Claim**: Pathway: Activation of telomerase reverse transcriptase (hTERT) in somatic cells; pineal-axis modulation supports endogenous melatonin
- **Score**: 0.45
- **Citations**: khavinson-2003 (PMID 12937682)
- **Rationale**: Abstract [1] supports the first part of the claim (hTERT activation in somatic cells via Epithalon peptide) but contains no information about pineal-axis modulation or melatonin. The claim's second component is entirely unsupported by the cited abstract.

### mechanism.downstream_effect

- **Claim**: Downstream effect: Telomere elongation, improved sleep architecture, reported lifespan extension in aged mice
- **Score**: 0.55
- **Citations**: khavinson-2003 (PMID 12937682)
- **Rationale**: Abstract [1] directly supports telomere elongation and suggests lifespan extension potential, but only in cultured human fibroblasts, not aged mice. It contains no data on sleep architecture or actual lifespan extension in any organism, making the claim only partially supported.

### mechanism.origin

- **Claim**: Origin / discovery: Synthetic 4-AA peptide derived from epithalamin (a natural pineal extract)
- **Score**: 0.00
- **Citations**: khavinson-2003 (PMID 12937682)
- **Rationale**: The cited abstract discusses Epithalon peptide and its effects on telomerase, but provides no information about the peptide's origin, whether it is a synthetic 4-amino acid derivative, or its derivation from epithalamin (pineal extract). The abstract does not address the claim's foundational factual content.

### dosage.rows[0].value

- **Claim**: Dosage value: 5–10 mg / day for 10–20 days, 1–2× per year
- **Score**: 0.00
- **Citations**: khavinson-2003 (PMID 12937682)
- **Rationale**: The cited abstract describes an in vitro study of Epithalon's effects on telomerase activity in fibroblast cultures and makes no mention of dosage, treatment duration, frequency, or any human dosing regimens.

## ⚠️ Partial (P1 — human review)

### dosage.rows[3].value

- **Claim**: Dosage value: In-vitro telomerase + Russian clinical trials
- **Score**: 0.65
- **Citations**: khavinson-2003 (PMID 12937682)
- **Rationale**: The abstract describes an in-vitro study (Epithalon peptide effects on human fibroblasts) and is from Russian researchers, partially matching the claim's components. However, the abstract does not specify dosage values, and there is no mention of clinical trials—only cell culture work. The claim's reference to 'Russian clinical trials' is not substantiated by this in-vitro study abstract.

## ✅ OK (collapsed for brevity)

- **hero_stats[1]**: Mechanistic: Human *(score=0.92)*
- **mechanism.primary_target**: Primary target: Telomerase activity (proposed); pineal melatonin axis modulation *(score=0.85)*
