# Claim-link audit: igf-1lr3

> Generated 2026-04-27 by `bun run audit:claims igf-1lr3`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 8
- ✅ ok (score ≥ 0.85): 7
- ⚠️ partial (0.6–0.85): 1
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ⚠️ Partial (P1 — human review)

### mechanism.pathway

- **Claim**: Pathway: IGF-1R → IRS-1 → PI3K/Akt → Cell proliferation, protein synthesis, anti-apoptosis
- **Score**: 0.82
- **Citations**: muhlbradt-2009 (PMID 19258508)
- **Rationale**: Abstract [1] directly describes the IGF-1R → IRS-1 → PI3K → Akt phosphorylation cascade in the context of IGF-I signaling in prostate cancer cells, explicitly stating that NKX3.1 expression 'attenuated the ability of insulin-like growth factor-I (IGF-I) to induce phosphorylation of type I IGF receptor (IGF-IR), insulin receptor substrate 1, phosphatidylinositol 3-kinase, and AKT.' However, the abstract focuses on pathway inhibition rather than the downstream effects (cell proliferation, protein synthesis, anti-apoptosis), which are only partially implied through the discussion of PC-3 cell proliferation suppression.

## ✅ OK (collapsed for brevity)

- **mechanism.primary_target**: Primary target: IGF-1 receptor (IGF-1R) *(score=0.95)*
- **dosage.rows[1].value**: Dosage value: 10–1000 ng/mL *(score=0.92)*
- **dosage.rows[2].value**: Dosage value: 0.6 nM LR3 vs 1.5 nM native IGF-1 *(score=0.95)*
- **fat_loss.rows[2].value**: Fat-loss row value: Reduced stenosis and core size in ApoE-KO mice *(score=0.92)*
- **side_effects.rows[2].value**: Side effect: 2–10-fold increase in prostate cancer cells (PC-3, DU-145, LAPC-4) *(score=0.92)*
- **side_effects.rows[3].value**: Side effect: Increased oocyte degeneration at high doses (≥1000 ng/mL) in bovine follicles *(score=0.92)*
- **administration.steps[1]**: Typical research route: Subcutaneous or intraperitoneal injection in animal models. In vitro: added directly to culture medium at concentrations of 10–1000 ng/mL. *(score=0.92)*
