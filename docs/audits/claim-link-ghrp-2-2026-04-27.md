# Claim-link audit: ghrp-2

> Generated 2026-04-27 by `bun run audit:claims ghrp-2`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 12
- ✅ ok (score ≥ 0.85): 0
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 1
- — skipped (no PMIDs available): 11

## ❌ Unsupported (P0 — must fix or remove citation)

### synergy.stacks[0]

- **Claim**: Stack with cjc-1295: GHRP-2 + CJC-1295-no-DAC is a higher-amplitude alternative to the ipamorelin + CJC-1295 stack. GHRP-2 produces a stronger pulse but with cortisol + prolactin signal — choose when maximum GH amplitude is the goal and the side-effect tolerance is acceptable. (primary benefit: High-amplitude GH pulse, body composition)
- **Score**: 0.15
- **Citations**: bowers-1990-ghrp2 (no PMID), teichman-2006 (PMID 16352683)
- **Rationale**: The cited abstract only describes CJC-1295's pharmacokinetics and GH-stimulating effects in isolation; it contains no information about GHRP-2, ipamorelin, stacking combinations, cortisol/prolactin effects, or comparative amplitudes between different peptide protocols. The claim requires comparative data across multiple peptides that this abstract does not provide.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Per dose: 100–300 mcg
  - Citations: bowers-1990-ghrp2
- **hero_stats[1]**: Evidence level: Phase 2
  - Citations: bowers-1990-ghrp2, sigalos-2018
- **hero_stats[2]**: Half-life: ~30 min
  - Citations: malagon-1999
- **mechanism.primary_target**: Primary target: Ghrelin receptor (GHS-R1a) on anterior pituitary
  - Citations: bowers-1990-ghrp2
- **mechanism.pathway**: Pathway: GHS-R1a → Gαq → Ca²⁺ → GH vesicle exocytosis
  - Citations: bowers-2002
- **mechanism.downstream_effect**: Downstream effect: Strong GH pulse + IGF-1 elevation; appetite increase via ghrelin agonism
  - Citations: bowers-2002
- **mechanism.origin**: Origin / discovery: Synthetic hexapeptide; developed by Bowers/Tulane group in the 1980s
  - Citations: bowers-1990-ghrp2
- **dosage.rows[0].value**: Dosage value: 100–300 mcg per injection
  - Citations: bowers-1990-ghrp2
- **dosage.rows[3].value**: Dosage value: Phase 2 + clinical diagnostic use
  - Citations: bowers-1990-ghrp2
- **dosage.rows[7].value**: Dosage value: ~30 min
  - Citations: malagon-1999
- **side_effects.rows[0].value**: Side effect: Mild but measurable
  - Citations: bowers-1990-ghrp2
