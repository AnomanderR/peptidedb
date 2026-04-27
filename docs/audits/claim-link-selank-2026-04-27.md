# Claim-link audit: selank

> Generated 2026-04-27 by `bun run audit:claims selank`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 11
- ✅ ok (score ≥ 0.85): 0
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 11

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Intranasal: 150–300 mcg/dose
  - Citations: zaderej-2014
- **hero_stats[1]**: Mechanistic: Human
  - Citations: zaderej-2014, medvedev-2007
- **mechanism.primary_target**: Primary target: Monoamine system (serotonin / GABA modulation) + immunomodulation via tuftsin domain
  - Citations: zaderej-2014
- **mechanism.pathway**: Pathway: Tuftsin-derived immune signaling + CNS monoamine modulation → reduced anxiety + improved mood / cognition
  - Citations: medvedev-2007
- **mechanism.downstream_effect**: Downstream effect: Anxiolytic + cognitive enhancement; immunomodulation via increased IL-6 + IFN-γ
  - Citations: medvedev-2007, zaderej-2014
- **mechanism.origin**: Origin / discovery: Synthetic 7-AA peptide derived from human tuftsin (immune-system tetrapeptide)
  - Citations: zaderej-2014
- **mechanism.feedback_intact**: Feedback loop: No GABA-receptor binding; no dependence reported
  - Citations: medvedev-2007
- **dosage.rows[0].value**: Dosage value: 150–300 mcg / dose intranasal
  - Citations: zaderej-2014
- **dosage.rows[3].value**: Dosage value: Human-mechanistic + Russian clinical trials
  - Citations: medvedev-2007
- **side_effects.rows[1].value**: Side effect: None — distinct from benzodiazepines
  - Citations: medvedev-2007
- **side_effects.rows[2].value**: Side effect: None reported in clinical use
  - Citations: zaderej-2014
