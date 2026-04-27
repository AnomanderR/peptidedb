# Claim-link audit: pnc-27

> Generated 2026-04-27 by `bun run audit:claims pnc-27`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 17
- ✅ ok (score ≥ 0.85): 15
- ⚠️ partial (0.6–0.85): 1
- ❌ unsupported (< 0.6): 1
- — skipped (no PMIDs available): 0

## ❌ Unsupported (P0 — must fix or remove citation)

### side_effects.rows[4].value

- **Claim**: Side effect: Secondary mitochondrial membrane disruption in cancer cells
- **Score**: 0.00
- **Citations**: krzesaj-2024 (PMID 38802154)
- **Rationale**: API error: 429 {"type":"error","error":{"type":"rate_limit_error","message":"This request would exceed your organization's rate limit of 50,000 input tokens per minute (org: a53d8326-ba28-460d-aff5-a3963cf7388d, model: claude-haiku-4-5-20251001). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase."},"request_id":"req_011CaTsXvtFoysMQGUzVrtkk"}

## ⚠️ Partial (P1 — human review)

### side_effects.rows[2].value

- **Claim**: Side effect: Depends on membrane HDM-2 expression levels
- **Score**: 0.75
- **Citations**: thadi-2020 (PMID 32878773), sarafrazyazdi-2010 (PMID 20080680)
- **Rationale**: Paper [2] directly demonstrates that PNC-27 toxicity depends on membrane HDM-2 expression—untransformed cells lacking membrane HDM-2 are not susceptible, but become susceptible when HDM-2 is artificially expressed on their surface. Paper [1] confirms HDM-2 membrane expression correlates with PNC-27-induced necrosis in leukemia cells. However, neither abstract explicitly frames this relationship as a 'side effect' dependent on expression levels; they describe it as a selectivity mechanism.

## ✅ OK (collapsed for brevity)

- **summary**: Summary: Synthetic 32-amino-acid anticancer peptide combining the HDM-2-binding domain of p53 (residues 12-26) with a cell-penetrating peptide sequence. Selectively induces necrosis in cancer cells via transmembrane pore formation after binding to membrane-associated HDM-2, sparing normal cells which express minimal membrane HDM-2. Pre-clinical studies demonstrate efficacy across solid tumors and hematologic malignancies. *(score=0.95)*
- **hero_stats[0]**: Peptide length: 32 AA *(score=0.95)*
- **mechanism.primary_target**: Primary target: Membrane-bound HDM-2 protein on cancer cell surface *(score=0.92)*
- **mechanism.pathway**: Pathway: PNC-27 binds to membrane HDM-2 1-109 domain → transmembrane pore formation → rapid necrosis (poptosis) *(score=0.95)*
- **mechanism.downstream_effect**: Downstream effect: Immediate cell lysis and extrusion of intracellular contents; secondary mitochondrial membrane disruption *(score=0.92)*
- **mechanism.origin**: Origin / discovery: Chimeric design: p53 transactivating domain (12-26) fused to penetratin CPP sequence *(score=0.92)*
- **mechanism.receptor_class**: Receptor class: HDM-2 (Human Double Minute 2) — p53 regulatory protein *(score=0.92)*
- **mechanism.diagram[1].text**: Mechanism diagram step: ↓ PNC-27 binds membrane HDM-2 *(score=0.95)*
- **mechanism.diagram[3].text**: Mechanism diagram step: ↓ Rapid lysis & content extrusion *(score=0.92)*
- **mechanism.diagram[4].text**: Mechanism diagram step: Tumor Cell Necrosis (Poptosis) *(score=0.92)*
- **mechanism.diagram[5].text**: Mechanism diagram step: Secondary: Mitochondrial Disruption *(score=0.95)*
- **side_effects.rows[1].value**: Side effect: In vitro: no cytotoxicity to normal cells (MCF-10-2A, peripheral blood mononuclear cells) *(score=0.92)*
- **side_effects.rows[3].value**: Side effect: Necrosis (not apoptosis) — rapid membrane lysis *(score=0.92)*
- **administration.steps[0]**: Pre-clinical status: PNC-27 has not been tested in human subjects. All data derive from in vitro cancer cell line studies and limited animal models. No approved clinical formulation, dosing protocol, or safety profile exists. *(score=0.92)*
- **administration.steps[2]**: Fluorescent labeling studies: Dual-labeled PNC-27 (green on N-terminus, red on C-terminus) demonstrated intact peptide binding to cancer cell membranes with combined yellow fluorescence at 30 minutes, persisting during cell lysis. *(score=0.95)*
