# Claim-link audit: humanin

> Generated 2026-04-27 by `bun run audit:claims humanin`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 12
- ✅ ok (score ≥ 0.85): 12
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **summary**: Summary: 24-amino-acid mitochondrial-derived peptide encoded in the 16S rRNA region of mtDNA. Cytoprotective via direct binding to Bax, Bim, and tBid, preventing mitochondrial outer membrane permeabilization and caspase-dependent apoptosis. Studied in models of Alzheimer's disease, premature ovarian insufficiency, testicular aging, and bone growth retardation. Acts intracellularly and as a secreted factor via FPRL1/2 receptors. *(score=0.92)*
- **hero_stats[0]**: Peptide length: 24-AA *(score=0.92)*
- **hero_stats[1]**: Encoded origin: mtDNA *(score=0.95)*
- **hero_stats[2]**: Primary target: Bax/Bim *(score=0.92)*
- **mechanism.primary_target**: Primary target: Intracellular: Bax, Bim, tBid (pro-apoptotic Bcl-2 family). Extracellular: FPRL1/2 G-protein-coupled receptors *(score=0.95)*
- **mechanism.downstream_effect**: Downstream effect: Suppression of apoptosis, mitochondrial stabilization, reduced oxidative stress, preservation of germ cells and neurons under stress *(score=0.92)*
- **mechanism.origin**: Origin / discovery: Encoded by short open reading frame in mitochondrial 16S rRNA gene (MTRNR2). 24-28 amino acids. 13 homologous variants (MTRNR2L1-L13) identified. *(score=0.92)*
- **mechanism.receptor_class**: Receptor class: Intracellular (Bcl-2 family) + Extracellular (FPRL1/2 GPCR) *(score=0.95)*
- **mechanism.diagram[1].text**: Mechanism diagram step: ↓ Humanin binds Bax/Bim/tBid *(score=0.95)*
- **mechanism.diagram[3].text**: Mechanism diagram step: ↓ Prevent cytochrome c release *(score=0.92)*
- **dosage.rows[4].value**: Dosage value: Animal models (rat, mouse) *(score=0.85)*
- **side_effects.rows[4].value**: Side effect: Protective in POI model (cyclophosphamide-induced), no adverse effects on fertility noted *(score=0.92)*
