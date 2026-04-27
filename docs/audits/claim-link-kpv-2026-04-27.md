# Claim-link audit: kpv

> Generated 2026-04-27 by `bun run audit:claims kpv`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 10
- ✅ ok (score ≥ 0.85): 0
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 10

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Daily dose: 200–500 mcg
  - Citations: dalle-pang-2024
- **hero_stats[1]**: Evidence level: Animal
  - Citations: dalle-pang-2024
- **mechanism.primary_target**: Primary target: Intracellular targets bypassing melanocortin receptors (proposed)
  - Citations: dalle-pang-2024
- **mechanism.pathway**: Pathway: NF-κB inhibition + cytokine modulation (TNF-α, IL-1β, IL-6) → reduced inflammation
  - Citations: dalle-pang-2024
- **mechanism.downstream_effect**: Downstream effect: Anti-inflammatory action without α-MSH pigmentation effects; gut barrier protection
  - Citations: dalle-pang-2024
- **mechanism.origin**: Origin / discovery: Synthetic tripeptide; the C-terminal Lys-Pro-Val residues of α-MSH (residues 11-13)
  - Citations: dalle-pang-2024
- **dosage.rows[0].value**: Dosage value: 200–500 mcg / day SQ or oral
  - Citations: dalle-pang-2024
- **dosage.rows[3].value**: Dosage value: Animal-strong + emerging clinical data in IBD
  - Citations: dalle-pang-2024
- **side_effects.rows[2].value**: Side effect: None (unlike full α-MSH)
  - Citations: dalle-pang-2024
- **synergy.stacks[0]**: Stack with bpc-157: KPV (NF-κB inhibition, cytokine reduction) + BPC-157 (VEGF-driven angiogenesis, tissue regeneration) form the classic gut-healing stack. KPV reduces inflammatory drive; BPC-157 promotes mucosal repair. Anecdotally favoured for IBD, ulcerative colitis, and post-surgical gut recovery. (primary benefit: Combined anti-inflammation + mucosal repair for gut conditions)
  - Citations: dalle-pang-2024, sikiric-2018
