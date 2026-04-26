# Peptide Target List — Wave Plan

Generated 2026-04-26. Source: CertaPeptides WooCommerce store, **131 published products** (page 1 + page 2). Cross-referenced against peptidesdb's 30 existing plates.

> ⚠️ **Scope correction**: Original CEO plan estimated ~36 net-new plates. Actual gap is **60 net-new plates** covering 61 store SKUs after full audit + slug-collision resolution (2026-04-26: P21 collapsed to one canonical plate). Update [peptide-coverage-pipeline.md](./peptide-coverage-pipeline.md) effort estimates accordingly: literature review for 60 plates ≈ 15-20 working days at 4 hr/day reviewer pace (per [peptide-editorial-workflow.md](./peptide-editorial-workflow.md)).

## Already in DB (30 confirmed via slug or alias)

- `5-amino-1mq` — 5-amino-1mq (GLP-1 and Incretin Research Peptides)
- `aod-9604` — AOD-9604 (GLP-1 and Incretin Research Peptides)
- `bpc-157` — BPC-157 (Growth Factors)
- `cjc-1295` — CJC-1295 DAC (Hormones)
- `cjc-1295` — CJC-1295 Without DAC (Hormones)
- `dsip` — DSIP (Cyclic and Neuropeptide Research Compounds)
- `epitalon` — Epitalon (Copper and Mitochondrial Research Peptides)
- `ghk-cu` — GHK-Cu (Copper and Mitochondrial Research Peptides)
- `ghrp-2` — GHRP-2 Acetate (Hormones)
- `ghrp-6` — GHRP-6 Acetate (Hormones)
- `hexarelin` — Hexarelin Acetate (Hormones)
- `ipamorelin` — Ipamorelin (Hormones)
- `kpv` — KPV (GLP-1 and Incretin Research Peptides)
- `liraglutide` — Liraglutide (GLP-1 and Incretin Research Peptides)
- `melanotan-2` — MT-2 (Melanotan 2 Acetate) (Melanocortin and Pigment Research Peptides)
- `mots-c` — MOTS-c (Copper and Mitochondrial Research Peptides)
- `pinealon` — Pinealon (Bioregulators)
- `pt-141` — PT-141 10mg (Gonadotropic Research Peptides)
- `retatrutide` — Retatrutide (GLP-1 and Incretin Research Peptides)
- `selank` — Selank (Cyclic and Neuropeptide Research Compounds)
- `semaglutide` — Semaglutide (GLP-1 and Incretin Research Peptides)
- `semax` — Semax (Cyclic and Neuropeptide Research Compounds)
- `sermorelin` — Sermorelin Acetate (Hormones)
- `ss-31` — SS-31 (Copper and Mitochondrial Research Peptides)
- `tb-500` — TB-500 (Growth Factors)
- `tesamorelin` — Tesamorelin (Hormones)
- `tesofensine` — Tesofensine 500mcg (GLP-1 and Incretin Research Peptides)
- `thymalin` — Thymalin 10mg (Thymic Research Peptides)
- `thymosin-alpha-1` — Thymosin Alpha-1 (Thymic Research Peptides)
- `tirzepatide` — Tirzepatide (GLP-1 and Incretin Research Peptides)

## Wave 1 — Well-evidenced GLP-1s + Growth Factors (17 plates)

Target: peptides with substantial peer-reviewed literature (RCTs / human clinical / strong animal). Pipeline first wave — builds confidence in the drafting + verification chain.

| # | Store name | Proposed slug | Category | Notes |
|---|---|---|---|---|
| 1 | ACE-031 1mg | `ace-031` | Growth Factors |  |
| 2 | Adipotide | `adipotide` | GLP-1 and Incretin Research Peptides |  |
| 3 | AICAR | `aicar` | GLP-1 and Incretin Research Peptides |  |
| 4 | Ara-290 10mg | `ara-290` | GLP-1 and Incretin Research Peptides |  |
| 5 | Cagrilintide | `cagrilintide` | GLP-1 and Incretin Research Peptides |  |
| 6 | Dermorphin | `dermorphin` | GLP-1 and Incretin Research Peptides |  |
| 7 | Follistatin 344 1mg | `follistatin-344` | Growth Factors |  |
| 8 | GDF-8 1mg | `gdf-8` | Growth Factors |  |
| 9 | GLP-1 5mg | `glp-1-7-37` | GLP-1 and Incretin Research Peptides | slug specifies the bioactive C-terminal fragment (most common research form). Verify isoform from supplier COA before authoring; fall back to `glp-1-native` if isoform is unconfirmed. |
| 10 | IGF-1LR3 | `igf-1lr3` | Growth Factors |  |
| 11 | IGF-DES 2mg | `igf-des` | Growth Factors |  |
| 12 | Mazdutide | `mazdutide` | GLP-1 and Incretin Research Peptides |  |
| 13 | MGF 2mg | `mgf` | Growth Factors |  |
| 14 | Orforglipron | `orforglipron` | GLP-1 and Incretin Research Peptides |  |
| 15 | PEG MGF 2mg | `peg-mgf` | Growth Factors |  |
| 16 | SLU-PP-332 | `slu-pp-332` | GLP-1 and Incretin Research Peptides |  |
| 17 | Survodutide 10mg | `survodutide` | GLP-1 and Incretin Research Peptides |  |

## Wave 2 — Medium-evidenced (30 plates)

Target: cyclic neuropeptides, melanocortins, copper/mitochondrial, gonadotropic, thymic. Mixed evidence quality — some have RCTs (HCG, Triptorelin), others are mechanistic only.

| # | Store name | Proposed slug | Category | Notes |
|---|---|---|---|---|
| 1 | Adamax 5mg | `adamax` | Cyclic and Neuropeptide Research Compounds |  |
| 2 | AHK-Cu 100mg | `ahk-cu` | Melanocortin and Pigment Research Peptides |  |
| 3 | Cerebrolysin 60mg | `cerebrolysin` | Cyclic and Neuropeptide Research Compounds |  |
| 4 | Dihexa 20mg | `dihexa` | Cyclic and Neuropeptide Research Compounds |  |
| 5 | Enclomiphene | `enclomiphene` | Gonadotropic Research Peptides |  |
| 6 | FOXO4 10mg | `foxo4` | Copper and Mitochondrial Research Peptides |  |
| 7 | Glutathione 1500mg | `glutathione` | Copper and Mitochondrial Research Peptides |  |
| 8 | Gonadorelin Acetate 2mg | `gonadorelin` | Gonadotropic Research Peptides |  |
| 9 | HCG | `hcg` | Hormones | miscategorized in store as Hormones; is a peptide |
| 10 | HGH 191AA | `hgh-191aa` | Hormones | miscategorized in store as Hormones; is a peptide |
| 11 | HGH Fragment 176-191 | `hgh-fragment-176-191` | Hormones | miscategorized in store as Hormones; is a peptide |
| 12 | Humanin 10mg | `humanin` | Copper and Mitochondrial Research Peptides |  |
| 13 | Hyaluronic Acid 5mg | `hyaluronic-acid` | Melanocortin and Pigment Research Peptides |  |
| 14 | KissPeptin-10 | `kisspeptin-10` | Gonadotropic Research Peptides |  |
| 15 | LL-37 5mg | `ll-37` | Thymic Research Peptides |  |
| 16 | Matrixyl 10mg | `matrixyl` | Melanocortin and Pigment Research Peptides |  |
| 17 | Melatonin 10mg | `melatonin` | Copper and Mitochondrial Research Peptides |  |
| 18 | Methylene Blue 20mg | `methylene-blue` | Cyclic and Neuropeptide Research Compounds |  |
| 19 | MT-1 10mg | `mt-1` | Melanocortin and Pigment Research Peptides |  |
| 20 | N-Acetyl Epitalon Amidate 5mg | `n-acetyl-epitalon-amidate` | Copper and Mitochondrial Research Peptides |  |
| 21 | NAD+ | `nad` | Copper and Mitochondrial Research Peptides |  |
| 22 | Oxytocin Acetate | `oxytocin` | Gonadotropic Research Peptides |  |
| 23 | P21 10mg + P21 (Adamantane) 10mg | `p21` | Cyclic and Neuropeptide Research Compounds | one canonical plate covers both store SKUs (parent peptide + adamantane-conjugated delivery variant). Adamantane variant noted in Administration section per design decision 2026-04-26. |
| 24 | PE 22-28 10mg | `pe-22-28` | Cyclic and Neuropeptide Research Compounds |  |
| 25 | PNC-27 | `pnc-27` | Copper and Mitochondrial Research Peptides |  |
| 26 | PTD-DBM 5mg | `ptd-dbm` | Cyclic and Neuropeptide Research Compounds |  |
| 27 | SNAP-8 10mg | `snap-8` | Melanocortin and Pigment Research Peptides |  |
| 28 | Teriparatide 10mg | `teriparatide` | Copper and Mitochondrial Research Peptides |  |
| 29 | Triptorelin Acetate 2mg | `triptorelin` | Gonadotropic Research Peptides |  |
| 30 | VIP | `vip` | Thymic Research Peptides |  |

## Wave 3 — Bioregulators (13 plates)

Target: Russian-tradition peptide bioregulators. Apply `evidence_tier` framing per DESIGN.md § 14 (TBD). Khavinson school — mostly Russian-language journals, not in PubMed. Plate evidence sections need explicit framing.

| # | Store name | Proposed slug | Category |
|---|---|---|---|
| 1 | Bronchogen 20mg | `bronchogen` | Bioregulators |
| 2 | Cardiogen 20mg | `cardiogen` | Bioregulators |
| 3 | Cartalax 20mg | `cartalax` | Bioregulators |
| 4 | Chonluten 20mg | `chonluten` | Bioregulators |
| 5 | Cortagen 20mg | `cortagen` | Bioregulators |
| 6 | Crystagen 20mg | `crystagen` | Bioregulators |
| 7 | Livagen 20mg | `livagen` | Bioregulators |
| 8 | Ovagen 20mg | `ovagen` | Bioregulators |
| 9 | Pancragen 20mg | `pancragen` | Bioregulators |
| 10 | Prostamax 20mg | `prostamax` | Bioregulators |
| 11 | Testagen | `testagen` | Bioregulators |
| 12 | Vesugen 20mg | `vesugen` | Bioregulators |
| 13 | Vilon 20mg | `vilon` | Bioregulators |

## Skipped (40 entries)

| Store name | Category | Reason |
|---|---|---|
| 3ml Syringes 10-Pack | Laboratory Consumables | lab consumable |
| Acetic Acid Water 10ml | Laboratory Consumables | lab consumable |
| Andarine S4 25mg | SARMs | SARM (not a peptide) |
| BAM15 Capsule 50mg | GLP-1 and Incretin Research Peptides | capsule variant; primary plate is `bam15` |
| BPC-157 + TB-500 Blend | Growth Factors | blend (multi-peptide) |
| Bacteriostatic Water | Laboratory Consumables | lab consumable |
| CJC-1295 + Ipamorelin Blend | Hormones | blend (multi-peptide) |
| CNS Peptide Research Stack | Bundles | bundle/kit |
| Cellular Biology Research Stack | Bundles | bundle/kit |
| Complete Lab Starter Kit | Bundles | bundle/kit |
| GW-501516/Cardarine 10mg | SARMs | SARM (not a peptide) |
| Glow Blend (BPC-157 + GHK-Cu + TB-500) 70mg | Peptide Blends | blend (multi-peptide) |
| Growth Hormone Research Stack | Bundles | bundle/kit |
| Injection Pen | Laboratory Consumables | lab consumable |
| Injection Pen (10-Pack) | Laboratory Consumables | lab consumable |
| Insulin Syringes 10-Pack | Laboratory Consumables | lab consumable |
| KPV Oral Capsules 500mcg | GLP-1 and Incretin Research Peptides | oral variant of existing kpv |
| Klow Blend (BPC-157 + GHK-Cu + TB-500 + KPV) 80mg | Peptide Blends | blend (multi-peptide) |
| LGD-4033/Ligandrol 10mg | SARMs | SARM (not a peptide) |
| MK-677/Ibutamoren 10mg | SARMs | SARM (not a peptide) |
| Metabolic Research Stack | Bundles | bundle/kit |
| Oral BPC-157 + TB-500 Blend 1000mcg | Growth Factors | blend (multi-peptide) |
| Oral BPC-157 Capsules 500mcg (60 capsules) | Growth Factors | oral variant of existing bpc-157 |
| Oral TB-500 500mcg | Growth Factors | oral variant of existing tb-500 |
| Ostarine/MK-2866 25mg | SARMs | SARM (not a peptide) |
| Peptide Mixing Kit | Laboratory Consumables | lab consumable |
| RAD140 10mg | SARMs | SARM (not a peptide) |
| Retatrutide + Cagrilintide Blend 10mg | Peptide Blends | blend (multi-peptide) |
| Retatrutide Research Starter Kit | Bundles+GLP-1 | bundle/kit |
| SLU-PP-332 + BAM15 Blend 300mcg | GLP-1 and Incretin Research Peptides | blend (multi-peptide) |
| SLU-PP-332 Capsule 100mg | GLP-1 and Incretin Research Peptides | capsule variant; primary plate is `slu-pp-332` |
| SR9009 10mg | SARMs | SARM (not a peptide) |
| Semaglutide Oral Capsules | GLP-1 and Incretin Research Peptides | oral variant of existing semaglutide |
| Semaglutide Research Starter Kit | Bundles+GLP-1 | bundle/kit |
| Semax + Selank Blend 20mg | Peptide Blends | blend (multi-peptide) |
| Storage Vials 10ml (5-Pack) | Laboratory Consumables | lab consumable |
| Tesamorelin + Ipamorelin Blend 18mg | Peptide Blends | blend (multi-peptide) |
| Tirzepatide Research Starter Kit | Bundles+GLP-1 | bundle/kit |
| Tissue Biology Research Stack | Bundles | bundle/kit |
| YK11 10mg | SARMs | SARM (not a peptide) |

## Summary

| Bucket | Count |
|---|---|
| Already in DB | 30 |
| **Wave 1 (well-evidenced)** | **17** |
| **Wave 2 (medium-evidenced)** | **30** |
| **Wave 3 (bioregulators)** | **13** |
| Skipped (bundles/blends/SARMs/consumables/oral-variants) | 40 |
| **TOTAL net-new plates to author** | **60** |
| Store SKUs covered by net-new plates | 61 |
| Total store products audited | 131 |

> **Note**: 60 plates cover 61 store SKUs because the canonical `p21` plate aliases to two store products (P21 + P21 Adamantane).

## Resolved decisions (2026-04-26)

1. **`p21` slug collision** — RESOLVED. One canonical plate `p21` covers both store SKUs ("P21 10mg" + "P21 (Adamantane) 10mg"). Adamantane delivery variant noted in the plate's Administration section. Both store SKUs alias to `/p/p21` per the storefront-side ResearchRef component (Option A from [peptide-alias-resolution.md](./peptide-alias-resolution.md)).
2. **`glp-1` generic slug** — RESOLVED. Slug = `glp-1-7-37` (specifies the bioactive C-terminal fragment, the most common research form). Action item before authoring: verify isoform from supplier COA. Fall back to `glp-1-native` only if the COA is silent on isoform identity.
3. **CJC-1295 SKUs vs single peptidesdb plate** — RESOLVED (no change). Existing single `cjc-1295` plate stays as-is and continues to cover both DAC and non-DAC store SKUs. Both alias to `/p/cjc-1295`. This matches the existing pattern and avoids unnecessary plate duplication.
4. **MOTS-c not in store but in DB** — RESOLVED (no change). Plate stays. peptidesdb is a research reference, not a SKU mirror — research-relevant peptides can exist without active store SKUs. Optional follow-up: if traffic warrants it, surface a "not currently stocked" note on plates with no store SKU. Defer until post-launch.
5. **MK-677 categorized as SARM in store** — RESOLVED. **Skip permanently.** MK-677/Ibutamoren is a non-peptide small molecule (oral growth-hormone secretagogue mimicking ghrelin at GHSR-1a). Including it would open scope to all GH secretagogues, then to other adjuncts — slippery slope that dilutes peptidesdb's "peptides only" identity. Stays in the Skipped table. peptidesdb already covers the peptide-based GH secretagogues (GHRP-2, GHRP-6, hexarelin, ipamorelin, sermorelin, tesamorelin) — that's the correct lane.
