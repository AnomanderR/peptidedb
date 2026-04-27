# Claim-link audit: mazdutide

> Generated 2026-04-27 by `bun run audit:claims mazdutide`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 19
- ✅ ok (score ≥ 0.85): 19
- ⚠️ partial (0.6–0.85): 0
- ❌ unsupported (< 0.6): 0
- — skipped (no PMIDs available): 0

## ✅ OK (collapsed for brevity)

- **summary**: Summary: Oxyntomodulin-based dual GLP-1 receptor and glucagon receptor agonist developed by Innovent Biologics in collaboration with Eli Lilly. Phase 3 trials in China demonstrate 12–16% body weight reduction at 24–48 weeks in non-diabetic adults with obesity (BMI ≥30 kg/m²). Once-weekly subcutaneous administration targets dual metabolic pathways — GLP-1-mediated appetite suppression and glucagon-driven energy expenditure. *(score=0.92)*
- **hero_route**: Administration route: SQ · Abdomen · Once Weekly *(score=0.92)*
- **hero_stats[0]**: Weekly dose: 9 mg *(score=0.95)*
- **hero_stats[1]**: Weight loss: 12.4% *(score=0.95)*
- **mechanism.primary_target**: Primary target: GLP-1 receptor and glucagon receptor *(score=0.95)*
- **mechanism.pathway**: Pathway: Dual agonism: GLP-1R → satiety, insulin secretion, gastric emptying delay; GCGR → hepatic lipolysis, energy expenditure, thermogenesis *(score=0.92)*
- **dosage.rows[0].value**: Dosage value: 9 mg / week *(score=0.95)*
- **dosage.rows[1].value**: Dosage value: Once weekly *(score=0.92)*
- **dosage.rows[2].value**: Dosage value: Subcutaneous *(score=0.92)*
- **dosage.rows[4].value**: Dosage value: Phase 2 RCT / Phase 3 ongoing *(score=0.92)*
- **dosage.rows[7].value**: Dosage value: Semaglutide 1 mg/week (DREAMS-3 trial) *(score=0.95)*
- **dosage.rows[0].notes**: Dosage notes: Highest efficacy dose in obesity trial (BMI ≥30 kg/m²). *(score=0.92)*
- **fat_loss.evidence_meta**: Fat-loss evidence summary: Phase 2 RCT (Chinese adults BMI ≥30 kg/m²) · Phase 3 ongoing vs semaglutide · 24–48 weeks *(score=0.92)*
- **fat_loss.rows[1].value**: Fat-loss row value: 9.8 kg (mean) *(score=0.92)*
- **fat_loss.rows[3].value**: Fat-loss row value: Appetite suppression (GLP-1) + energy expenditure (glucagon) *(score=0.92)*
- **fat_loss.rows[4].value**: Fat-loss row value: Significant reduction in Chinese adults BMI ≥30 kg/m² *(score=0.95)*
- **fat_loss.rows[7].value**: Fat-loss row value: Head-to-head vs semaglutide 1 mg (Phase 3 pending publication) *(score=0.90)*
- **fat_loss.rows[0].notes**: Fat-loss row notes: 95% CI: -16.15% to -8.68%, random-effects model. *(score=0.95)*
- **fat_loss.rows[1].notes**: Fat-loss row notes: 95% CI: -13.15 to -6.37 kg. *(score=0.95)*
