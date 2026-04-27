# Claim-link audit: survodutide

> Generated 2026-04-27 by `bun run audit:claims survodutide`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 22
- ✅ ok (score ≥ 0.85): 21
- ⚠️ partial (0.6–0.85): 1
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ⚠️ Partial (P1 — human review)

### mechanism.pathway

- **Claim**: Pathway: Central: CVOs → hypothalamic appetite regulation. Peripheral: GLP-1R → incretin effect; GCGR → hepatic lipid metabolism, energy expenditure
- **Score**: 0.72
- **Citations**: zimmermann-2026 (PMID 41638399), long-2026 (PMID 41388343)
- **Rationale**: Abstract [1] directly supports CVOs → hypothalamic appetite regulation (survodutide accesses CVOs and activates appetite-control nuclei via GLP-1R). Abstract [2] supports GCGR → hepatic lipid metabolism and energy expenditure (hepatic GCGR required for metabolic effects), though the full abstract text is truncated. The peripheral GLP-1R incretin effect is not explicitly addressed in either abstract.

## ✅ OK (collapsed for brevity)

- **summary**: Summary: Dual GLP-1/glucagon receptor agonist developed by Boehringer Ingelheim and Zealand Pharma, currently in Phase 3 trials (SYNCHRONIZE program) for obesity and metabolic dysfunction-associated steatohepatitis (MASH). Phase 2 data demonstrated significant weight loss through reduced energy intake and increased energy expenditure. Acts centrally via circumventricular organs and peripherally on hepatic and pancreatic receptors. Once-weekly subcutaneous administration. *(score=0.92)*
- **hero_stats[1]**: Development stage: Phase 3 *(score=0.95)*
- **hero_stats[2]**: Dual target: GLP-1/GCGR *(score=0.95)*
- **mechanism.primary_target**: Primary target: GLP-1 receptor and glucagon receptor (GCGR) *(score=0.95)*
- **mechanism.downstream_effect**: Downstream effect: Decreased energy intake, increased energy expenditure, improved glucose homeostasis, hepatic fat reduction *(score=0.92)*
- **mechanism.receptor_class**: Receptor class: Class B G-protein-coupled receptors (GPCRs) *(score=0.92)*
- **mechanism.diagram[0].text**: Mechanism diagram step: Circumventricular Organs (CVOs) *(score=0.92)*
- **mechanism.diagram[1].text**: Mechanism diagram step: ↓ GLP-1R activation → appetite suppression *(score=0.92)*
- **mechanism.diagram[2].text**: Mechanism diagram step: Hypothalamic appetite centers *(score=0.85)*
- **mechanism.diagram[3].text**: Mechanism diagram step: ↓ Reduced energy intake *(score=0.92)*
- **mechanism.diagram[4].text**: Mechanism diagram step: Liver (Hepatic GCGR) *(score=0.92)*
- **mechanism.diagram[6].text**: Mechanism diagram step: Weight loss + metabolic improvement *(score=0.92)*
- **dosage.rows[2].value**: Dosage value: Subcutaneous *(score=0.85)*
- **dosage.rows[4].value**: Dosage value: Significant weight loss and metabolic marker improvement *(score=0.92)*
- **dosage.rows[5].value**: Dosage value: Under investigation for MASH-cirrhosis *(score=0.92)*
- **dosage.rows[0].notes**: Dosage notes: SYNCHRONIZE Phase 3 program underway. *(score=0.92)*
- **fat_loss.rows[1].value**: Fat-loss row value: Dual action: decreased energy intake + increased energy expenditure *(score=0.95)*
- **fat_loss.rows[3].value**: Fat-loss row value: Improvements in ALT, AST, LDL levels; significant ALT reduction (MD -22.10 vs placebo) *(score=0.92)*
- **fat_loss.rows[4].value**: Fat-loss row value: Hepatic fat reduction demonstrated in MASH trials *(score=0.92)*
- **fat_loss.rows[6].value**: Fat-loss row value: Hepatic GCGR required for maximal weight loss and metabolic effects *(score=0.95)*
- **fat_loss.rows[7].value**: Fat-loss row value: Increased energy expenditure contributes to weight loss *(score=0.90)*
