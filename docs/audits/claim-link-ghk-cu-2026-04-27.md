# Claim-link audit: ghk-cu

> Generated 2026-04-27 by `bun run audit:claims ghk-cu`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 8
- ✅ ok (score ≥ 0.85): 2
- ⚠️ partial (0.6–0.85): 2
- ❌ unsupported (< 0.6): 4
- — skipped (no PMIDs available): 0

## ❌ Unsupported (P0 — must fix or remove citation)

### hero_stats[0]

- **Claim**: SQ dose: 1–2 mg
- **Score**: 0.00
- **Citations**: pickart-2018 (PMID 29986520)
- **Rationale**: The abstract discusses GHK-Cu peptide's biological actions and mechanisms but contains no information about SQ (subcutaneous) dosing or any dose specifications of 1–2 mg. The claim is completely unrelated to the content of the cited paper.

### mechanism.origin

- **Claim**: Origin / discovery: Endogenous tripeptide first isolated from human plasma; declines from ~200 ng/mL at age 20 to ~80 ng/mL at age 60
- **Score**: 0.15
- **Citations**: pickart-2018 (PMID 29986520)
- **Rationale**: The abstract confirms GHK is a human peptide with multiple biological actions but provides no information about its isolation from plasma, plasma concentration levels, or age-related decline. The cited paper does not substantiate any of the specific quantitative claims about discovery origin or concentration changes.

### dosage.rows[0].value

- **Claim**: Dosage value: 1–2 mg / day
- **Score**: 0.00
- **Citations**: pickart-2018 (PMID 29986520)
- **Rationale**: The abstract discusses GHK-Cu peptide's biological actions and mechanisms but contains no information about dosage values, administration amounts, or any specific dosing recommendations like '1–2 mg/day'.

### dosage.rows[4].value

- **Claim**: Dosage value: Human-mechanistic + topical clinical studies
- **Score**: 0.15
- **Citations**: pickart-2018 (PMID 29986520)
- **Rationale**: The abstract discusses GHK-Cu's biological actions and mechanisms but does not specify dosage values, human-mechanistic studies, or topical clinical studies. It reviews regenerative/protective actions broadly without providing the dosage data or clinical study specifications claimed.

## ⚠️ Partial (P1 — human review)

### mechanism.primary_target

- **Claim**: Primary target: Copper-dependent enzymes (lysyl oxidase, SOD); regulator of >4000 human genes
- **Score**: 0.75
- **Citations**: pickart-2018 (PMID 29986520)
- **Rationale**: Abstract [1] supports that GHK-Cu targets copper-dependent enzymes and regulates multiple genes/pathways, but does not explicitly state the specific enzymes (lysyl oxidase, SOD) or quantify the number of regulated genes (>4000). The abstract mentions GHK's diverse biological actions regulated by 'multiple biochemical pathways' and 'multiple gene data,' partially supporting the claim without full specificity.

### mechanism.pathway

- **Claim**: Pathway: Cu(II) delivery via GHK chelation → ↑collagen / elastin / GAG synthesis; ↓inflammatory cytokines; ↑hair follicle growth-factor signaling
- **Score**: 0.82
- **Citations**: pickart-2018 (PMID 29986520)
- **Rationale**: Abstract [1] directly supports most of the claim: it explicitly states GHK stimulates collagen, elastin, and glycosaminoglycan synthesis, possesses anti-inflammatory actions, and mentions activation of multiple biochemical pathways. However, the abstract does not specifically address Cu(II) delivery mechanism or hair follicle growth-factor signaling, limiting full support.

## ✅ OK (collapsed for brevity)

- **hero_stats[1]**: Mechanistic: Human *(score=0.92)*
- **mechanism.downstream_effect**: Downstream effect: Skin firmness + texture improvement, accelerated wound healing, hair regrowth, anti-inflammatory action *(score=0.92)*
