# Claim-link audit: mgf

> Generated 2026-04-27 by `bun run audit:claims mgf`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 11
- ✅ ok (score ≥ 0.85): 11
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **hero_stats[0]**: Splice variant: IGF-1Ec *(score=0.95)*
- **mechanism.primary_target**: Primary target: Satellite cells (Pax7+) in skeletal muscle *(score=0.95)*
- **mechanism.origin**: Origin / discovery: Alternative splicing of IGF-1 gene (exons 4-6) produces IGF-1Ec precursor; E-domain cleaved post-translationally *(score=0.92)*
- **mechanism.receptor_class**: Receptor class: E-domain acts via distinct receptor from mature IGF-1; identity under investigation *(score=0.88)*
- **mechanism.diagram[1].text**: Mechanism diagram step: ↓ IGF-1Ec mRNA splice variant upregulated *(score=0.92)*
- **mechanism.diagram[3].text**: Mechanism diagram step: ↓ Satellite cell (Pax7+) activation *(score=0.85)*
- **dosage.rows[2].value**: Dosage value: Single bolus within 12 hrs post-infarction *(score=0.92)*
- **dosage.rows[4].value**: Dosage value: Full-length MGF detected via LC-MS in illicit products *(score=0.92)*
- **side_effects.rows[5].value**: Side effect: Older adults (70+ yrs) show blunted IGF-1Ec response post-exercise vs young *(score=0.90)*
- **administration.steps[2]**: Animal delivery models: Rodent studies used peptide-eluting polymeric microstructures (cardiac) or direct intramuscular injection. Routes and doses non-translatable to humans. *(score=0.85)*
- **administration.steps[3]**: WADA prohibition: MGF peptides prohibited in sport since 2005. Detection via LC-MS established for full-length MGF products. *(score=0.95)*
