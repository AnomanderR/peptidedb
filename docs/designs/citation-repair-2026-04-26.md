# Citation Repair Proposals — refs.yaml audit follow-up

> Generated 2026-04-26 by `bun run scripts/repair-citations.ts` after Phase 1 audit.

## Summary

- **Title-only fixes (auto-applicable)**: 3
- **PMID replacements (high-confidence search match)**: 4
- **Manual review required**: 24
- **Total proposals**: 31

## Title-only fixes (safe to auto-apply)

These citations have the **correct PMID** — our stored title is just abbreviated. Same paper. Update title in refs.yaml to PubMed's canonical form.

### falutz-2010 (PMID 20554713, Dice=0.741)

- **Current title**: `Effects of tesamorelin on visceral fat and serum lipids in HIV-infected patients with abdominal fat accumulation: a pooled analysis of two multicenter, double-blind placebo-controlled phase 3 trials`
- **PubMed title**:  `Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in human immunodeficiency virus-infected patients with excess abdominal fat: a pooled analysis of two multicenter, double-blind placebo-controlled phase 3 trials with safety extension data.`

### teichman-2006 (PMID 16352683, Dice=0.753)

- **Current title**: `Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295`
- **PubMed title**:  `Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults.`

### frias-2018 (PMID 30293770, Dice=0.732)

- **Current title**: `Efficacy and safety of LY3298176, a novel dual GIP and GLP-1 receptor agonist, in patients with type 2 diabetes`
- **PubMed title**:  `Efficacy and safety of LY3298176, a novel dual GIP and GLP-1 receptor agonist, in patients with type 2 diabetes: a randomised, placebo-controlled and active comparator-controlled phase 2 trial.`

## PMID replacements (high-confidence search match)

Search by our title returned a candidate with Dice ≥ 0.85 and year within ±1. Propose: replace `pmid` + `title` in refs.yaml.

### cerovecki-2010

- **Current**: PMID `19855566` (year 2010)
  - Title: `Pentadecapeptide BPC 157 (PL 14736) improves ligament healing in the rat`
- **Proposed**: PMID `20225319` (year 2010, Dice=1.000)
  - Title: `Pentadecapeptide BPC 157 (PL 14736) improves ligament healing in the rat.`

### jastreboff-2023-reta

- **Current**: PMID `37314973` (year 2023)
  - Title: `Triple-Hormone-Receptor Agonist Retatrutide for Obesity`
- **Proposed**: PMID `37888926` (year 2023, Dice=1.000)
  - Title: `Triple-Hormone-Receptor Agonist Retatrutide for Obesity.`

### szeto-2014

- **Current**: PMID `24134698` (year 2014)
  - Title: `First-in-class cardiolipin-protective compound as a therapeutic agent for restoring mitochondrial bioenergetics`
- **Proposed**: PMID `24117165` (year 2014, Dice=0.940)
  - Title: `First-in-class cardiolipin-protective compound as a therapeutic agent to restore mitochondrial bioenergetics.`

### murphy-2001-mk677

- **Current**: PMID `9626134` (year 1998)
  - Title: `MK-677, an orally active growth hormone secretagogue, reverses diet-induced catabolism`
- **Proposed**: PMID `9467534` (year 1998, Dice=1.000)
  - Title: `MK-677, an orally active growth hormone secretagogue, reverses diet-induced catabolism.`

## Manual review required

Search by our title returned no high-confidence candidate. Either the original paper isn't in PubMed, or our title is too vague to find it via title-search. Top-3 candidates listed for human evaluation.

### clarke-2018

- **Current PMID**: `29969601`
- **Current title**: `Effects of tesamorelin on insulin sensitivity and lipid metabolism in HIV-infected patients with abdominal fat accumulation`
- **Current year**: 2018

**No candidates returned by PubMed search.** This citation may need to be deleted, or the source manually located via DOI / Google Scholar.

### clemmons-2002

- **Current PMID**: `12675491`
- **Current title**: `Roles of insulin-like growth factor-I and growth hormone in mediating insulin resistance in acromegaly`
- **Current year**: 2002

**No candidates returned by PubMed search.** This citation may need to be deleted, or the source manually located via DOI / Google Scholar.

### sevigny-2018

- **Current PMID**: `29894389`
- **Current title**: `Long-term safety and effects of tesamorelin`
- **Current year**: 2018

**Top candidates from PubMed search by our title**:

1. PMID `18690162` (year 2008, Dice=0.480)
   - `Long-term safety and effects of tesamorelin, a growth hormone-releasing factor analogue, in HIV patients with abdominal fat accumulation.`
1. PMID `31611038` (year 2019, Dice=0.397)
   - `Effects of tesamorelin on non-alcoholic fatty liver disease in HIV: a randomised, double-blind, multicentre trial.`
1. PMID `20872317` (year 2010, Dice=0.321)
   - `Growth hormone-releasing factor agonists for the treatment of HIV-associated lipodystrophy.`

### sikiric-2018

- **Current PMID**: `29879882`
- **Current title**: `Stable gastric pentadecapeptide BPC 157, an effective anti-inflammatory agent: a comprehensive review`
- **Current year**: 2018

**No candidates returned by PubMed search.** This citation may need to be deleted, or the source manually located via DOI / Google Scholar.

### chang-2014

- **Current PMID**: `24879839`
- **Current title**: `The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration`
- **Current year**: 2014

**Top candidates from PubMed search by our title**:

1. PMID `21030672` (year 2011, Dice=1.000)
   - `The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration.`

### bowers-1991

- **Current PMID**: `1841756`
- **Current title**: `GH releasing peptides — structure and kinetics`
- **Current year**: 1991

**Top candidates from PubMed search by our title**:

1. PMID `36080354` (year 2022, Dice=0.381)
   - `A Comparative Loading and Release Study of Vancomycin from a Green Mesoporous Silica.`
1. PMID `24116947` (year 2013, Dice=0.259)
   - `NMR studies of the dynamics of nitrophorin 2 bound to nitric oxide.`
1. PMID `20085747` (year 2010, Dice=0.238)
   - `Role of membranotropic sequences from herpes simplex virus type I glycoproteins B and H in the fusion process.`

### ionescu-2006

- **Current PMID**: `16873939`
- **Current title**: `Pulsatile secretion of growth hormone induced by a new GH releasing factor analog (CJC-1295) in subjects with adult GH deficiency`
- **Current year**: 2006

**No candidates returned by PubMed search.** This citation may need to be deleted, or the source manually located via DOI / Google Scholar.

### sigalos-2018

- **Current PMID**: `29097109`
- **Current title**: `The safety and efficacy of growth hormone secretagogues`
- **Current year**: 2018

**Top candidates from PubMed search by our title**:

1. PMID `38423529` (year 2024, Dice=0.482)
   - `Evaluating the Safety and Efficacy of Capromorelin in Rhesus Macaques (Macaca mulatta).`
1. PMID `36860137` (year 2023, Dice=0.411)
   - `Pilot clinical trial of macimorelin to assess safety and efficacy in patients with cancer cachexia.`
1. PMID `37493940` (year 2024, Dice=0.378)
   - `Insights on discovery, efficacy, safety and clinical applications of ghrelin receptor agonist capromorelin in veterinary medicine.`

### pickart-2018

- **Current PMID**: `29986520`
- **Current title**: `Regenerative and Protective Actions of the GHK-Cu Peptide`
- **Current year**: 2018

**Top candidates from PubMed search by our title**:

1. PMID `29986520` (year 2018, Dice=0.767)
   - `Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data.`
1. PMID `22666519` (year 2012, Dice=0.513)
   - `The human tripeptide GHK-Cu in prevention of oxidative stress and degenerative conditions of aging: implications for cognitive health.`

### goldstein-2012

- **Current PMID**: `22150295`
- **Current title**: `Thymosin β4 — A Multi-Functional Regenerative Peptide`
- **Current year**: 2012

**Top candidates from PubMed search by our title**:

1. PMID `22074294` (year 2012, Dice=0.699)
   - `Thymosin β4: a multi-functional regenerative peptide. Basic properties and clinical applications.`
1. PMID `23967050` (year 2013, Dice=0.292)
   - `Cellular trafficking of thymosin beta-4 in HEPG2 cells following serum starvation.`

### heffernan-2001

- **Current PMID**: `11691711`
- **Current title**: `The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism`
- **Current year**: 2001

**No candidates returned by PubMed search.** This citation may need to be deleted, or the source manually located via DOI / Google Scholar.

### ng-2008

- **Current PMID**: `10574575`
- **Current title**: `Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone`
- **Current year**: 2008

**Top candidates from PubMed search by our title**:

1. PMID `11146367` (year 2000, Dice=1.000)
   - `Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone.`

### malinda-1999

- **Current PMID**: `10417642`
- **Current title**: `Thymosin beta4 accelerates wound healing`
- **Current year**: 1999

**Top candidates from PubMed search by our title**:

1. PMID `31649007` (year 2019, Dice=0.358)
   - `Thymosin β4: potential to treat epidermolysis bullosa and other severe dermal injuries.`
1. PMID `34546850` (year 2021, Dice=0.350)
   - `Circular RNA PIP5K1A (circPIP5K1A) accelerates endometriosis progression by regulating the miR-153-3p/Thymosin Beta-4 X-Linked (TMSB4X) pathway.`
1. PMID `37259884` (year 2023, Dice=0.318)
   - `Bioinspired Platelet-Anchored Electrospun Meshes for Tight Inflammation Manipulation and Chronic Diabetic Wound Healing.`

### clayton-2015

- **Current PMID**: `26173683`
- **Current title**: `Bremelanotide for female sexual dysfunctions in premenopausal women`
- **Current year**: 2015

**No candidates returned by PubMed search.** This citation may need to be deleted, or the source manually located via DOI / Google Scholar.

### smith-1996-hexarelin

- **Current PMID**: `8499262`
- **Current title**: `A nonpeptidyl growth hormone secretagogue`
- **Current year**: 1996

**Top candidates from PubMed search by our title**:

1. PMID `23488781` (year 2013, Dice=0.463)
   - `Semagacestat, a γ-secretase inhibitor, activates the growth hormone secretagogue (GHS-R1a) receptor.`
1. PMID `16533152` (year 2006, Dice=0.433)
   - `Synthesis and pharmacological profile of an orally-active growth hormone secretagogue, SM-130686.`
1. PMID `17622734` (year 2007, Dice=0.372)
   - `Heterogeneity of ghrelin/growth hormone secretagogue receptors. Toward the understanding of the molecular identity of novel ghrelin/GHS receptors.`

### ghigo-1997-hexarelin

- **Current PMID**: `9302846`
- **Current title**: `Growth hormone-releasing peptides`
- **Current year**: 1997

**Top candidates from PubMed search by our title**:

1. PMID `41912291` (year 2026, Dice=0.543)
   - `Growth hormone: Synthesis and regulation.`
1. PMID `41973758` (year 2026, Dice=0.414)
   - `Peptidomimetic Long-Acting Growth Hormone-Releasing Hormone Agonists Promote Tissue Perfusion in Hindlimb Ischemia.`
1. PMID `41901314` (year 2026, Dice=0.342)
   - `Growth Hormone-Releasing Peptide-6 (GHRP-6) Ameliorates Post-Infarct Ventricular Remodeling and Systolic Dysfunction in a Model of Permanent Coronary Ligation.`

### semenistaya-2010

- **Current PMID**: `20725712`
- **Current title**: `Determination of growth hormone-releasing peptides for sports doping control`
- **Current year**: 2010

**Top candidates from PubMed search by our title**:

1. PMID `35298973` (year 2022, Dice=0.511)
   - `An antibody-free, ultrafiltration-based assay for the detection of growth hormone-releasing hormones in urine at low pg/mL concentrations using nanoLC-HRMS/MS.`
1. PMID `38716080` (year 2022, Dice=0.482)
   - `Probing for peptidic drugs (2-10 kDa) in doping control blood samples.`
1. PMID `38197510` (year 2024, Dice=0.469)
   - `Chromatographic-mass spectrometric analysis of peptidic analytes (2-10 kDa) in doping control urine samples.`

### medvedev-2007

- **Current PMID**: `17886532`
- **Current title**: `Pharmacology of Selank — anti-anxiety + cognitive effects`
- **Current year**: 2007

**Top candidates from PubMed search by our title**:

1. PMID `16963804` (year 2006, Dice=0.310)
   - `Influence of long-term treatment with tuftsin analogue TP-7 on the anxiety-phobic states and body weight.`
1. PMID `31625062` (year 2019, Dice=0.307)
   - `Selank, Peptide Analogue of Tuftsin, Protects Against Ethanol-Induced Memory Impairment by Regulating of BDNF Content in the Hippocampus and Prefrontal Cortex in Rats.`

### wegovy-pioglitazone-2010

- **Current PMID**: `27295427`
- **Current title**: `Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes`
- **Current year**: 2016

**Top candidates from PubMed search by our title**:

1. PMID `42033237` (year 2026, Dice=0.500)
   - `Cardiovascular outcomes of glucagon-like peptide-1 receptor agonists: A systematic review.`
1. PMID `41984016` (year 2026, Dice=0.471)
   - `Comparative Cardiovascular Effectiveness of Glucagon-Like Peptide 1 Receptor Agonists and Sodium-Glucose Cotransporter 2 Inhibitors in Diabetes Mellitus.`
1. PMID `42025665` (year 2026, Dice=0.448)
   - `Glucagon-Like Peptide-1 Receptor Agonists and Risk of Systemic and Ocular Vascular Complications in Patients with Type 2 Diabetes and Diabetic Retinopathy.`

### bowers-1990-ghrp2

- **Current PMID**: `2104629`
- **Current title**: `Growth hormone (GH)-releasing peptide stimulates GH release in normal men`
- **Current year**: 1990

**Top candidates from PubMed search by our title**:

1. PMID `20681993` (year 2010, Dice=0.442)
   - `The relationship between reduced testosterone, stimulated growth hormone secretion and increased carotid intima-media thickness in obese men.`
1. PMID `24291224` (year 2014, Dice=0.421)
   - `Discordance of IGF-1 and GH stimulation testing for altered GH secretion in obesity.`
1. PMID `22842679` (year 2013, Dice=0.376)
   - `GH responses to two consecutive bouts of respiratory muscle endurance training in healthy adults.`

### dorr-1996-mt2

- **Current PMID**: `8847761`
- **Current title**: `Evaluation of melanotan-II, a superpotent cyclic melanotropic peptide`
- **Current year**: 1996

**Top candidates from PubMed search by our title**:

1. PMID `8637402` (year 1996, Dice=0.798)
   - `Evaluation of melanotan-II, a superpotent cyclic melanotropic peptide in a pilot phase-I clinical study.`

### astrup-2008-tesofensine

- **Current PMID**: `18957104`
- **Current title**: `Effect of tesofensine on bodyweight loss, body composition, and quality of life in obese patients`
- **Current year**: 2008

**Top candidates from PubMed search by our title**:

1. PMID `18950853` (year 2008, Dice=0.787)
   - `Effect of tesofensine on bodyweight loss, body composition, and quality of life in obese patients: a randomised, double-blind, placebo-controlled trial.`
1. PMID `23561987` (year 2013, Dice=0.720)
   - `Expression of concern--effect of tesofensine on bodyweight loss, body composition, and quality of life in obese patients: a randomised, double-blind, placebo-controlled trial.`
1. PMID `19548858` (year 2009, Dice=0.501)
   - `Tesofensine--a novel potent weight loss medicine. Evaluation of: Astrup A, Breum L, Jensen TJ, Kroustrup JP, Larsen TM. Effect of tesofensine on bodyweight loss, body composition, and quality of life in obese patients: a randomised, double-blind, placebo-controlled trial. Lancet 2008;372:1906-13.`

### neelakantan-2018-namq

- **Current PMID**: `30343113`
- **Current title**: `Selective and membrane-permeable small molecule inhibitors of nicotinamide N-methyltransferase reverse high fat diet-induced obesity in mice`
- **Current year**: 2018

**No candidates returned by PubMed search.** This citation may need to be deleted, or the source manually located via DOI / Google Scholar.

### khavinson-2002-thymalin

- **Current PMID**: `12490620`
- **Current title**: `Peptides and Ageing`
- **Current year**: 2002

**Top candidates from PubMed search by our title**:

1. PMID `42032845` (year 2026, Dice=0.272)
   - `B Cell Subsets and Atherosclerosis: Updates and Emerging Concepts.`
1. PMID `42031194` (year 2026, Dice=0.198)
   - `Mouse embryos as In Vivo models for proteomic identification and functional analysis of missing proteins.`
1. PMID `42033162` (year 2026, Dice=0.165)
   - `Capsaicin Receptor TRPV1 Delays Aortic Aging in Atherosclerotic Mice by Inhibiting the ISG15-p53 Pathway.`
