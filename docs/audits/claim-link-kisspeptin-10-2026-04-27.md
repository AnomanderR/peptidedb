# Claim-link audit: kisspeptin-10

> Generated 2026-04-27 by `bun run audit:claims kisspeptin-10`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 8
- ✅ ok (score ≥ 0.85): 7
- ⚠️ partial (0.6–0.85): 1
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ⚠️ Partial (P1 — human review)

### mechanism.feedback_intact

- **Claim**: Feedback loop: Yes — integrates estradiol, leptin, and IGF-1 signals to modulate HPG axis
- **Score**: 0.82
- **Citations**: silva-2026 (PMID 41423875), rnnekleiv-2026 (PMID 41407546)
- **Rationale**: Abstract [2] directly supports the claim by stating that arcuate kisspeptin (KNDy) neurons 'express both steroid hormone receptors and metabolic hormone receptors' and are 'excited by insulin and leptin,' and that 'E2 [estradiol] can regulate their excitability.' Abstract [1] demonstrates IGF-1 modulation of KNDy neurons. Together, the abstracts substantiate integration of estradiol, leptin, and IGF-1 signals to modulate the HPG axis through KNDy neurons, though neither explicitly uses the term 'feedback loop.'

## ✅ OK (collapsed for brevity)

- **hero_stats[0]**: Primary role: GnRH pulse generator *(score=0.95)*
- **hero_stats[2]**: Target receptor: GPR54/Kiss1R *(score=0.90)*
- **mechanism.primary_target**: Primary target: GPR54/Kiss1R on hypothalamic GnRH neurons *(score=0.92)*
- **mechanism.pathway**: Pathway: Kisspeptin → GPR54 activation → GnRH neuronal depolarization → Pulsatile GnRH release → Pituitary LH/FSH secretion *(score=0.92)*
- **mechanism.downstream_effect**: Downstream effect: Pulsatile LH surge, FSH elevation, gonadal steroidogenesis, gametogenesis initiation *(score=0.92)*
- **mechanism.diagram[0].text**: Mechanism diagram step: Hypothalamus (KNDy neurons) *(score=0.92)*
- **mechanism.diagram[6].text**: Mechanism diagram step: Gonadal steroidogenesis & gametogenesis *(score=0.92)*
