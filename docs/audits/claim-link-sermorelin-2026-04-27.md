# Claim-link audit: sermorelin

> Generated 2026-04-27 by `bun run audit:claims sermorelin`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 11
- ✅ ok (score ≥ 0.85): 0
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 1
- — skipped (no PMIDs available): 10

## ❌ Unsupported (P0 — must fix or remove citation)

### synergy.stacks[0]

- **Claim**: Stack with ipamorelin: Sermorelin (GHRH analogue) and ipamorelin (selective GHRP) form the prototypical GHRH+GHRP dual-axis stack at the lowest cost. Both peak within 30 min and produce a sharp physiological GH pulse without cortisol/prolactin elevation. (primary benefit: Pulsatile GH stimulation, recovery, body composition)
- **Score**: 0.45
- **Citations**: raun-1998 (PMID 9849822), walker-1994 (no PMID)
- **Rationale**: The abstract confirms ipamorelin is a selective GHRP (supporting that part of the claim) and notably establishes it does not elevate cortisol/ACTH unlike other GHRPs. However, the abstract provides no information about sermorelin, GHRH+GHRP stacking, peak timing (~30 min), pulsatile GH characteristics, prolactin effects, cost comparison, or body composition outcomes. The cited paper alone cannot substantiate the stack claim or most of its purported benefits.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Per dose: 100–500 mcg
  - Citations: molteno-2013
- **hero_stats[1]**: Evidence level: Phase 3
  - Citations: walker-1994, molteno-2013
- **hero_stats[2]**: Half-life: ~12 min
  - Citations: molteno-2013
- **mechanism.primary_target**: Primary target: Pituitary GHRH receptor
  - Citations: walker-1994
- **mechanism.pathway**: Pathway: GHRH-R → Gαs → cAMP → PKA → GH vesicle exocytosis
  - Citations: walker-1994
- **mechanism.downstream_effect**: Downstream effect: Pulsatile GH release; subsequent IGF-1 elevation
  - Citations: molteno-2013
- **mechanism.origin**: Origin / discovery: Unmodified active 29-AA fragment of human GHRH (1-44)
  - Citations: walker-1994
- **dosage.rows[0].value**: Dosage value: 100–500 mcg per injection
  - Citations: molteno-2013
- **dosage.rows[3].value**: Dosage value: Phase 3 (Geref pediatric); clinical practice
  - Citations: walker-1994, molteno-2013
- **dosage.rows[7].value**: Dosage value: ~12 min (plasma)
  - Citations: molteno-2013
