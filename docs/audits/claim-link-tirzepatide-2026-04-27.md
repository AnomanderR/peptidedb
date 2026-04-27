# Claim-link audit: tirzepatide

> Generated 2026-04-27 by `bun run audit:claims tirzepatide`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 14
- ✅ ok (score ≥ 0.85): 2
- ⚠️ partial (0.6–0.85): 2
- ❌ unsupported (< 0.6): 4
- — skipped (no PMIDs available): 6

## ❌ Unsupported (P0 — must fix or remove citation)

### hero_stats[1]

- **Claim**: Body-weight ↓: 20.9%
- **Score**: 0.00
- **Citations**: jastreboff-2022 (PMID 35658024)
- **Rationale**: API error: 429 {"type":"error","error":{"type":"rate_limit_error","message":"This request would exceed your organization's rate limit of 50,000 input tokens per minute (org: a53d8326-ba28-460d-aff5-a3963cf7388d, model: claude-haiku-4-5-20251001). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase."},"request_id":"req_011CaUYrK3oFwzcKrG8WQ37w"}

### mechanism.primary_target

- **Claim**: Primary target: GIP receptor (GIPR) + GLP-1 receptor (GLP-1R)
- **Score**: 0.00
- **Citations**: frias-2018 (PMID 30293770)
- **Rationale**: API error: 429 {"type":"error","error":{"type":"rate_limit_error","message":"This request would exceed your organization's rate limit of 50,000 input tokens per minute (org: a53d8326-ba28-460d-aff5-a3963cf7388d, model: claude-haiku-4-5-20251001). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase."},"request_id":"req_011CaUYrHgwkNhBwokkw43Zw"}

### mechanism.downstream_effect

- **Claim**: Downstream effect: Profound glycemic improvement and weight reduction; cardiometabolic benefits
- **Score**: 0.00
- **Citations**: jastreboff-2022 (PMID 35658024)
- **Rationale**: API error: 429 {"type":"error","error":{"type":"rate_limit_error","message":"This request would exceed your organization's rate limit of 50,000 input tokens per minute (org: a53d8326-ba28-460d-aff5-a3963cf7388d, model: claude-haiku-4-5-20251001). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase."},"request_id":"req_011CaUYs1Mi4wzasM65C7LE2"}

### mechanism.origin

- **Claim**: Origin / discovery: 39-AA peptide with C-20 fatty-acid acylation. Single molecule with balanced GIP + GLP-1 affinity
- **Score**: 0.00
- **Citations**: frias-2018 (PMID 30293770)
- **Rationale**: API error: 429 {"type":"error","error":{"type":"rate_limit_error","message":"This request would exceed your organization's rate limit of 50,000 input tokens per minute (org: a53d8326-ba28-460d-aff5-a3963cf7388d, model: claude-haiku-4-5-20251001). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase."},"request_id":"req_011CaUYs1ozjydH9GgVYytc2"}

## ⚠️ Partial (P1 — human review)

### mechanism.pathway

- **Claim**: Pathway: Dual GIPR/GLP-1R agonism → ↑insulin (glucose-dependent), ↓glucagon, ↓gastric emptying, ↓appetite, ↑energy expenditure (via GIP component)
- **Score**: 0.72
- **Citations**: jastreboff-2022 (PMID 35658024), frias-2018 (PMID 30293770)
- **Rationale**: Paper [2] directly supports the claim by demonstrating that dual GIP/GLP-1 agonism (LY3298176) produces decreased appetite (20-25.5% incidence at higher doses) and weight loss (up to -11.3 kg), consistent with the appetite suppression and metabolic effects claimed. However, the abstracts do not explicitly address the mechanistic pathway components of glucose-dependent insulin stimulation, glucagon suppression, gastric emptying reduction, or energy expenditure via the GIP component—these mechanisms are not described in either abstract, only the clinical outcomes are reported.

### side_effects.rows[0].value

- **Claim**: Side effect: Nausea, vomiting, diarrhea (common, dose-dependent)
- **Score**: 0.75
- **Citations**: jastreboff-2022 (PMID 35658024)
- **Rationale**: Abstract [1] states that 'the most common adverse events with tirzepatide were gastrointestinal' and occurred 'primarily during dose escalation,' supporting gastrointestinal side effects in a dose-dependent manner. However, the abstract does not explicitly enumerate nausea, vomiting, and diarrhea individually or characterize them as 'common' with specific frequencies.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **hero_stats[0]**: Weekly dose: 2.5–15 mg
  - Citations: fda-zepbound-label-2023
- **hero_stats[2]**: Half-life: ~5 days
  - Citations: fda-zepbound-label-2023
- **dosage.rows[0].value**: Dosage value: 5–15 mg / week
  - Citations: fda-zepbound-label-2023
- **dosage.rows[7].value**: Dosage value: ~5 days (116 h)
  - Citations: fda-zepbound-label-2023
- **side_effects.rows[2].value**: Side effect: Rare; discontinue if suspected
  - Citations: fda-zepbound-label-2023
- **side_effects.rows[3].value**: Side effect: Boxed warning — contraindicated in MEN2 / MTC history
  - Citations: fda-zepbound-label-2023

## ✅ OK (collapsed for brevity)

- **dosage.rows[1].value**: Dosage value: 5, 10, or 15 mg / week (titrated) *(score=0.95)*
- **dosage.rows[3].value**: Dosage value: FDA-approved · Phase 3 RCTs (SURMOUNT, SURPASS) *(score=0.92)*
