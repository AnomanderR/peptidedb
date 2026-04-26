import type { Peptide } from "./schemas/peptide";

/* =========================================================
   Stack-conflict detection. Pure rule-based — no AI involved.
   These are the structural class-level rules that hold for
   any reasonable peptide stack regardless of dose.

   Each rule scans a multi-peptide selection and emits warnings
   that the UI surfaces as inline alerts in the stack designer.
   ========================================================= */

export type ConflictSeverity = "info" | "caution" | "warn" | "block";

export interface StackConflict {
  severity: ConflictSeverity;
  title: string;
  detail: string;
  peptides: string[];
}

/**
 * Generic stack-rule type. Receives selected peptides; returns
 * any conflicts the rule detects.
 */
type Rule = (selected: Peptide[]) => StackConflict[];

const RULES: Rule[] = [
  // === Multiple GLP-1 RAs simultaneously ===
  (s) => {
    const glp1 = s.filter((p) => p.categories.includes("glp-1"));
    if (glp1.length >= 2) {
      return [
        {
          severity: "block",
          title: "Multiple GLP-1 receptor agonists selected",
          detail:
            "Stacking two or more GLP-1-class drugs (semaglutide, tirzepatide, retatrutide, liraglutide) is not clinically validated and risks additive GI toxicity, pancreatitis, and dose-stacking adverse effects without synergy. Choose one GLP-1 RA at a time.",
          peptides: glp1.map((p) => p.slug),
        },
      ];
    }
    return [];
  },

  // === Multiple GHRPs simultaneously (cortisol/prolactin stacking) ===
  (s) => {
    const ghrps = s.filter((p) => p.categories.includes("ghrp"));
    if (ghrps.length >= 2) {
      const hasIpa = ghrps.some((p) => p.slug === "ipamorelin");
      // Ipa + non-selective GHRP-2/6/Hexarelin defeats the selectivity argument
      if (hasIpa && ghrps.length >= 2) {
        return [
          {
            severity: "warn",
            title: "Multiple GHRPs at the same time",
            detail:
              "Stacking ipamorelin (selective) with another GHRP (GHRP-2, GHRP-6, hexarelin) introduces the cortisol/prolactin signal that ipamorelin's selectivity was meant to avoid. Pick one GHRP per dosing window — use ipamorelin if selectivity matters, GHRP-2 / hexarelin if amplitude matters.",
            peptides: ghrps.map((p) => p.slug),
          },
        ];
      }
      return [
        {
          severity: "warn",
          title: "Multiple GHRPs at the same time",
          detail:
            "GHRPs share the GHS-R1a receptor and at multi-dose chronic use trigger receptor desensitisation faster than monotherapy. Cycle on/off and avoid simultaneous dosing of two GHRPs.",
          peptides: ghrps.map((p) => p.slug),
        },
      ];
    }
    return [];
  },

  // === GH-axis stack on top of GLP-1 (weight cycling concerns) ===
  (s) => {
    const glp1 = s.filter((p) => p.categories.includes("glp-1"));
    const ghrh = s.filter((p) => p.categories.includes("ghrh"));
    if (glp1.length > 0 && ghrh.length > 0) {
      return [
        {
          severity: "caution",
          title: "GLP-1 RA + GH-axis stimulation",
          detail:
            "Combining GLP-1-driven weight loss with GH-axis stimulation may improve body composition (preserve lean mass while losing fat), but elevated IGF-1 plus GLP-1 effects on glucose/insulin should be monitored. Track HbA1c quarterly.",
          peptides: [...glp1.map((p) => p.slug), ...ghrh.map((p) => p.slug)],
        },
      ];
    }
    return [];
  },

  // === Cancer-axis warning ===
  (s) => {
    const ghAxis = s.filter(
      (p) =>
        p.categories.includes("ghrh") ||
        p.categories.includes("ghrp") ||
        p.categories.includes("gh-axis"),
    );
    const angiogenic = s.filter(
      (p) => p.slug === "bpc-157" || p.slug === "tb-500",
    );
    if (ghAxis.length > 0 && angiogenic.length > 0) {
      return [
        {
          severity: "caution",
          title: "GH/IGF-1 axis + angiogenesis-promoting stack",
          detail:
            "GH/IGF-1 is mitogenic; BPC-157 + TB-500 promote angiogenesis. The combination is theoretically pro-tumour in active or pre-malignant tissue. Strict contraindication in any cancer history. Otherwise monitor and cycle aggressively.",
          peptides: [...ghAxis.map((p) => p.slug), ...angiogenic.map((p) => p.slug)],
        },
      ];
    }
    return [];
  },

  // === Information: complementary stacks recognised in synergy data ===
  (s) => {
    const conflicts: StackConflict[] = [];
    for (const p of s) {
      if (!p.synergy) continue;
      for (const stack of p.synergy.stacks) {
        const partner = s.find((other) => other.slug === stack.partner_slug);
        if (partner) {
          conflicts.push({
            severity: "info",
            title: `Recognised stack: ${p.name} + ${partner.name}`,
            detail: `Documented ${stack.synergy} synergy. ${stack.primary_benefit}.`,
            peptides: [p.slug, partner.slug],
          });
        }
      }
    }
    return conflicts;
  },

  // === Methylation interference (5-Amino-1MQ + B-vitamin stacks) ===
  (s) => {
    if (s.some((p) => p.slug === "5-amino-1mq")) {
      const b3 = s.filter(
        (p) => p.slug.includes("nad") || p.aliases.some((a) => /niacin/i.test(a)),
      );
      if (b3.length > 0) {
        return [
          {
            severity: "warn",
            title: "5-Amino-1MQ + niacin / NAD+ pathway",
            detail:
              "5-Amino-1MQ inhibits NNMT to preserve cellular methylation. Concurrent niacin or NAD+ precursor supplementation may interfere with the mechanism by altering the niacin / nicotinamide pool.",
            peptides: [
              "5-amino-1mq",
              ...b3.map((p) => p.slug),
            ],
          },
        ];
      }
    }
    return [];
  },

  // === Melanocortin overlap ===
  (s) => {
    const mc = s.filter(
      (p) =>
        p.categories.includes("melanocortin") ||
        p.categories.includes("mc4r"),
    );
    if (mc.length >= 2) {
      return [
        {
          severity: "warn",
          title: "Multiple melanocortin agonists",
          detail:
            "Combining MC4R agonists (PT-141, MT-2) saturates the receptor pathway. Choose one per session. MT-2 carries melanoma signal; PT-141 carries transient hypertension.",
          peptides: mc.map((p) => p.slug),
        },
      ];
    }
    return [];
  },
];

/** Run every rule and aggregate conflicts. */
export function detectStackConflicts(selected: Peptide[]): StackConflict[] {
  if (selected.length < 2) return [];
  const all = RULES.flatMap((r) => r(selected));
  // Deduplicate by title + sorted peptide list
  const seen = new Set<string>();
  return all.filter((c) => {
    const key = `${c.title}|${[...c.peptides].sort().join(",")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
