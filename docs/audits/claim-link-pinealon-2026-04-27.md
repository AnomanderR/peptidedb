# Claim-link audit: pinealon

> Generated 2026-04-27 by `bun run audit:claims pinealon`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 9
- ✅ ok (score ≥ 0.85): 0
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 1
- — skipped (no PMIDs available): 8

## ❌ Unsupported (P0 — must fix or remove citation)

### synergy.stacks[0]

- **Claim**: Stack with epitalon: Pinealon (neuroprotection) + Epitalon (telomerase activation) form the canonical Khavinson "longevity stack" — both pineal-derived bioregulators with complementary axes. Pinealon supports neuronal antioxidant defense; Epitalon supports telomere maintenance. Anecdotally cycled together 1–2× per year. (primary benefit: Neuroprotection + telomere preservation)
- **Score**: 0.45
- **Citations**: khavinson-2014-pinealon (no PMID), khavinson-2003 (PMID 12937682)
- **Rationale**: The cited abstract supports only the Epitalon component (telomerase activation and telomere elongation), which is explicitly demonstrated. However, the claim requires substantiation for: (1) Pinealon's neuroprotective and antioxidant properties, (2) the designation of this pairing as Khavinson's 'canonical longevity stack,' and (3) complementary mechanistic axes between the two peptides. No abstract for Pinealon is provided, and the single abstract does not establish the stack concept or cycling protocol.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Per cycle dose: 5–10 mg
  - Citations: khavinson-2014-pinealon
- **hero_stats[1]**: Mechanistic: Human
  - Citations: khavinson-2014-pinealon
- **mechanism.primary_target**: Primary target: Antioxidant defense + neuronal gene expression (proposed)
  - Citations: khavinson-2014-pinealon
- **mechanism.pathway**: Pathway: Modulation of antioxidant enzymes (SOD, catalase) + neurotrophic factor expression
  - Citations: khavinson-2014-pinealon
- **mechanism.downstream_effect**: Downstream effect: Reduced oxidative stress in neurons; improved cognitive function in age-related decline
  - Citations: khavinson-2014-pinealon
- **mechanism.origin**: Origin / discovery: Synthetic 4-AA peptide derived from pineal gland extract
  - Citations: khavinson-2014-pinealon
- **dosage.rows[0].value**: Dosage value: 5–10 mg / day for 10 days
  - Citations: khavinson-2014-pinealon
- **dosage.rows[3].value**: Dosage value: Russian clinical trials + in vitro
  - Citations: khavinson-2014-pinealon
