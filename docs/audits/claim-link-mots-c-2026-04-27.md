# Claim-link audit: mots-c

> Generated 2026-04-27 by `bun run audit:claims mots-c`. Model: claude-haiku-4-5.
>
> The claim-linker is a SIGNAL, not a GATE. P0 (unsupported) and P1 (partial) claims must be reviewed by a human before the plate is promoted past `auto-drafted`. See [peptide-editorial-workflow.md](../designs/peptide-editorial-workflow.md).

## Summary

- Total claims with citations: 16
- ✅ ok (score ≥ 0.85): 6
- ⚠️ partial (0.6–0.85): 2
- ❌ unsupported (< 0.6): 7
- — skipped (no PMIDs available): 1

## ❌ Unsupported (P0 — must fix or remove citation)

### hero_stats[0]

- **Claim**: Weekly dose: 5–10 mg
- **Score**: 0.00
- **Citations**: lee-2015 (PMID 25738459)
- **Rationale**: The abstract describes MOTS-c as a mitochondrial peptide and its metabolic effects in mice, but contains no information about dosing, weekly doses, or any dosage range of 5–10 mg.

### dosage.rows[0].value

- **Claim**: Dosage value: 5–10 mg / week
- **Score**: 0.00
- **Citations**: lee-2015 (PMID 25738459)
- **Rationale**: The abstract describes MOTS-c peptide's metabolic effects in mice but contains no dosage information whatsoever. The claim of 5–10 mg/week is not supported by this abstract.

### dosage.rows[3].value

- **Claim**: Dosage value: Animal + anecdotal
- **Score**: 0.15
- **Citations**: lee-2015 (PMID 25738459), reynolds-2021 (PMID 33473109), cb4211-phase1-2021 (no PMID)
- **Rationale**: The claim requests a dosage value categorized as 'Animal + anecdotal,' but neither abstract provides dosage information or anecdotal (human case report) data. Both papers describe controlled animal studies with specific treatment protocols (e.g., 'intermittent MOTS-c treatment 3x/week' in abstract 2), not anecdotal evidence. The abstracts are unrelated to documenting a dosage classification.

### fat_loss.rows[4].value

- **Claim**: Fat-loss row value: Reversed HFD insulin resistance in 7 days (mice)
- **Score**: 0.45
- **Citations**: lee-2015 (PMID 25738459)
- **Rationale**: Abstract [1] discusses MOTS-c peptide preventing HFD-induced insulin resistance in mice, but does not specify a 7-day timeframe or describe a 'fat-loss row value' intervention. The claim's specific parameters (7 days, 'reversed' vs 'prevented') are not substantiated by the provided abstract.

### fat_loss.rows[6].value

- **Claim**: Fat-loss row value: Improved glucose tolerance; GLUT4 upregulation
- **Score**: 0.45
- **Citations**: lee-2015 (PMID 25738459)
- **Rationale**: The abstract discusses MOTS-c improving insulin sensitivity and preventing insulin resistance, which relates to glucose metabolism, but does not explicitly mention glucose tolerance testing or GLUT4 upregulation specifically. The claim's specific mechanisms are not substantiated by this abstract.

### fat_loss.rows[8].value

- **Claim**: Fat-loss row value: No effect in normal-chow mice; requires metabolic stress
- **Score**: 0.15
- **Citations**: reynolds-2021 (PMID 33473109)
- **Rationale**: The abstract discusses MOTS-c's effects on physical performance and muscle homeostasis in mice of various ages, but makes no mention of fat loss, row value, normal-chow diet conditions, or metabolic stress requirements. The cited paper is about an exercise-induced mitochondrial peptide and aging, not about the specific claim regarding fat-loss effects.

### fat_loss.rows[9].value

- **Claim**: Fat-loss row value: Lee Cell Metab 2015 · Reynolds Nat Commun 2021 · Kim Cell Metab 2018
- **Score**: 0.15
- **Citations**: lee-2015 (PMID 25738459), reynolds-2021 (PMID 33473109), kim-2018 (PMID 29983246)
- **Rationale**: The claim appears to be a citation row format rather than a substantive claim. The abstracts discuss MOTS-c's role in metabolic homeostasis, obesity reduction, physical performance, and nuclear gene regulation, but none explicitly address 'fat-loss row value' as a defined metric or concept. The cited papers support that MOTS-c affects metabolism and obesity, but not the specific claim as stated.

## ⚠️ Partial (P1 — human review)

### mechanism.pathway

- **Claim**: Pathway: Folate cycle inhibition → ↑AICAR → AMPK phosphorylation → PGC-1α upregulation
- **Score**: 0.65
- **Citations**: lee-2015 (PMID 25738459), kim-2018 (PMID 29983246)
- **Rationale**: Abstract [1] directly supports folate cycle inhibition → AMPK activation, stating MOTS-c 'inhibit[s] the folate cycle and its tethered de novo purine biosynthesis, leading to AMPK activation.' However, neither abstract explicitly addresses AICAR accumulation, AMPK phosphorylation as a specific mechanism, or PGC-1α upregulation, leaving key steps of the claimed pathway unsupported.

### mechanism.downstream_effect

- **Claim**: Downstream effect: Enhanced fatty acid oxidation, GLUT4-mediated glucose uptake, mitochondrial bioenergetics, anti-inflammation
- **Score**: 0.65
- **Citations**: lee-2015 (PMID 25738459)
- **Rationale**: Abstract [1] supports some elements of the claim (metabolic homeostasis, insulin resistance reduction, mitochondrial involvement) and mentions AMPK activation which relates to metabolic regulation, but does not explicitly address fatty acid oxidation, GLUT4-mediated glucose uptake, or anti-inflammatory effects.

## — Skipped (citation has no PMID — author-time DOI lookup needed)

- **side_effects.rows[9].value**: Side effect: Phase 1 analog (CB4211); preclinical; anecdotal human
  - Citations: cb4211-phase1-2021

## ✅ OK (collapsed for brevity)

- **hero_stats[1]**: Evidence level: Animal *(score=0.95)*
- **mechanism.primary_target**: Primary target: Mitochondrial 12S rRNA sORF → folate-AICAR-AMPK axis *(score=0.92)*
- **mechanism.origin**: Origin / discovery: Endogenous 16-AA mitokine; mtDNA-encoded; declines with age; upregulated by exercise *(score=0.92)*
- **mechanism.feedback_intact**: Feedback loop: Stress-responsive, AMPK-dependent nuclear translocation *(score=0.95)*
- **fat_loss.rows[1].value**: Fat-loss row value: Significant HFD fat gain ↓ *(score=0.88)*
- **side_effects.rows[2].value**: Side effect: Improves glucose tolerance *(score=0.92)*
