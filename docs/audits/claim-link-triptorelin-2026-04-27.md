# Claim-link audit: triptorelin

> Generated 2026-04-27 by `bun run audit:claims triptorelin`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 15
- ✅ ok (score ≥ 0.85): 14
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 1
- — skipped (no PMIDs available): 0

## ❌ Unsupported (P0 — must fix or remove citation)

### dosage.rows[5].value

- **Claim**: Dosage value: Advanced (metastatic or locally advanced)
- **Score**: 0.15
- **Citations**: yee-2025 (PMID 40001059), friedrich-2025 (PMID 41259022)
- **Rationale**: Neither abstract addresses dosage values or treatment intensity classification. Paper [1] discusses a 22.5 mg triptorelin formulation but does not characterize dosages as 'Advanced (metastatic or locally advanced).' Paper [2] studies adverse events from ADT across racial groups but contains no dosage information. The claim appears to be a database classification that the abstracts do not substantively support.

## ✅ OK (collapsed for brevity)

- **summary**: Summary: Synthetic decapeptide gonadotropin-releasing hormone (GnRH) agonist, FDA-approved for advanced prostate cancer, endometriosis, and central precocious puberty. Initial pituitary flare (1–3 weeks) followed by receptor downregulation produces sustained suppression of LH, FSH, and downstream sex hormones. Available in 1-month, 3-month, and 6-month depot formulations. Distinguished by biphasic mechanism: transient stimulation, then prolonged castration-level testosterone (<50 ng/dL). *(score=0.92)*
- **hero_route**: Administration route: IM · Depot Injection · Monthly to 6-Monthly *(score=0.92)*
- **hero_stats[0]**: Depot dose range: 3.75–22.5 mg *(score=0.92)*
- **hero_stats[2]**: Depot duration: 1–6 months *(score=0.92)*
- **mechanism.primary_target**: Primary target: Pituitary GnRH receptors *(score=0.92)*
- **mechanism.half_life_basis**: Half-life basis: Depot formulation: 1-month (3.75 mg), 3-month (11.25 mg), 6-month (22.5 mg) sustained release *(score=0.85)*
- **dosage.rows[1].value**: Dosage value: 11.25 mg IM *(score=0.92)*
- **dosage.rows[2].value**: Dosage value: 22.5 mg IM *(score=0.95)*
- **dosage.rows[7].value**: Dosage value: Pediatric use (≥2 years) *(score=0.90)*
- **dosage.rows[9].value**: Dosage value: Continuous or intermittent ADT protocols *(score=0.92)*
- **dosage.rows[2].notes**: Dosage notes: Long-acting formulation; improved adherence in real-world use. *(score=0.92)*
- **side_effects.rows[1].value**: Side effect: MI, stroke, arrhythmia — GnRH agonists show higher CV risk vs antagonists in meta-analyses *(score=0.92)*
- **side_effects.rows[3].value**: Side effect: Accelerated bone mineral density decline; fracture risk ↑ *(score=0.92)*
- **side_effects.rows[5].value**: Side effect: Erectile dysfunction, loss of libido (expected pharmacological effect) *(score=0.92)*
