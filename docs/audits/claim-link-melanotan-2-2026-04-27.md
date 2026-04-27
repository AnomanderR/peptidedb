# Claim-link audit: melanotan-2

> Generated 2026-04-27 by `bun run audit:claims melanotan-2`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 9
- ✅ ok (score ≥ 0.85): 5
- ⚠️ partial (0.6–0.85): 1
- ❌ unsupported (< 0.6): 3
- — skipped (no PMIDs available): 0

## ❌ Unsupported (P0 — must fix or remove citation)

### mechanism.primary_target

- **Claim**: Primary target: MC1R (skin) + MC3R + MC4R (CNS sexual / appetite)
- **Score**: 0.45
- **Citations**: dorr-1996-mt2 (PMID 8637402)
- **Rationale**: The abstract describes MT-II's melanotropic activity and observed effects (pigmentation, sexual function, appetite-related somnolence) but does not identify the specific receptor targets (MC1R, MC3R, MC4R) or their anatomical distribution. The claim requires mechanistic receptor information that this clinical abstract does not provide.

### mechanism.pathway

- **Claim**: Pathway: MC1R agonism → melanocyte tyrosinase → eumelanin synthesis. MC4R → autonomic sexual arousal centres
- **Score**: 0.45
- **Citations**: dorr-1996-mt2 (PMID 8637402), simerly-2023 (no PMID)
- **Rationale**: The abstract describes MT-II (a melanotropic peptide) causing both pigmentation and spontaneous penile erections, but does not specify the mechanistic pathway through MC1R→tyrosinase→eumelanin or MC4R→autonomic sexual arousal centers. The claim's specific receptor and downstream signaling details are not addressed in this abstract.

### dosage.rows[0].value

- **Claim**: Dosage value: 0.25–0.5 mg/day SQ × 5–7 days
- **Score**: 0.15
- **Citations**: dorr-1996-mt2 (PMID 8637402)
- **Rationale**: The cited abstract describes dosing in mg/kg increments (0.01–0.03 mg/kg), not absolute mg/day doses. The study also used alternating-day dosing (not daily ×5–7 days as claimed), making the specific claim of 0.25–0.5 mg/day SQ ×5–7 days unsupported by the abstract.

## ⚠️ Partial (P1 — human review)

### hero_stats[0]

- **Claim**: Per dose: 0.25–1.0 mg
- **Score**: 0.75
- **Citations**: dorr-1996-mt2 (PMID 8637402)
- **Rationale**: Abstract [1] reports doses in mg/kg (0.01, 0.025, 0.03 mg/kg) rather than absolute mg per dose. The claim of 0.25–1.0 mg per dose cannot be directly verified without knowing participant body weight, though the recommended 0.025 mg/kg/day dose could fall within this range for heavier individuals. The abstract partially addresses dosing but not in the absolute mg terms claimed.

## ✅ OK (collapsed for brevity)

- **hero_stats[1]**: Evidence level: Phase 1 *(score=0.95)*
- **mechanism.downstream_effect**: Downstream effect: Skin darkening, photo-protection, increased sexual desire / spontaneous erection *(score=0.92)*
- **mechanism.origin**: Origin / discovery: Cyclic 7-AA modified α-MSH analog; designed at University of Arizona *(score=0.85)*
- **dosage.rows[4].value**: Dosage value: Phase 1 + anecdotal *(score=0.92)*
- **side_effects.rows[2].value**: Side effect: Common in men — MC4R cross-effect *(score=0.92)*
