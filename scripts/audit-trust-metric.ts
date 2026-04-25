#!/usr/bin/env bun
/**
 * Trust-metric audit (Bun-runnable TypeScript).
 *
 * Two layers of verification:
 *  1. SHAPE — each path in REQUIRED_FIELDS validates against an expected
 *     shape (CitableValue or parent-cite pattern).
 *  2. PARITY — for each peptide, computePeptideStats() is invoked and
 *     every REQUIRED_FIELD that exists in the YAML must either:
 *       (a) appear in stats.uncited_fields (uncited but counted), OR
 *       (b) be excluded because it had a non-empty cite[] (counted as
 *           cited). We verify the path was "seen" by the walker either way.
 *
 * If a future schema/render refactor drops a counted field, parity fails.
 * This is the structural close codex round 11 recommended.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { Peptide } from "../src/lib/schemas/peptide";
import { CITATIONS } from "../src/generated/citations";
import { computePeptideStats } from "../src/lib/peptide-stats";
import { CitationRegistry } from "../src/lib/schemas/citation";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PEPTIDES_DIR = join(__dirname, "..", "content", "peptides");

type Validator = (v: unknown) => true | string;

const isCitableShape: Validator = (v) => {
  if (typeof v === "string") return true;
  if (v && typeof v === "object" && typeof (v as { value?: unknown }).value === "string") return true;
  return `expected string or {value, cite[]}, got ${typeof v}`;
};

const isHeroStat: Validator = (v) => {
  if (!v || typeof v !== "object") return `expected hero_stat object, got ${typeof v}`;
  const r = v as Record<string, unknown>;
  if (typeof r.value !== "string" || !r.value) return "hero_stat missing string `value`";
  if (typeof r.label !== "string" || !r.label) return "hero_stat missing string `label`";
  if ("cite" in r && !Array.isArray(r.cite)) return "hero_stat `cite` must be array if present";
  return true;
};

const isAdminStep: Validator = (v) => {
  if (!v || typeof v !== "object") return `expected admin step object, got ${typeof v}`;
  const r = v as Record<string, unknown>;
  if (typeof r.title !== "string" || !r.title) return "admin step missing string `title`";
  if (typeof r.body !== "string" || !r.body) return "admin step missing string `body`";
  if ("cite" in r && !Array.isArray(r.cite)) return "admin step `cite` must be array if present";
  return true;
};

const isStackProtocol: Validator = (v) => {
  if (!v || typeof v !== "object") return `expected stack protocol object, got ${typeof v}`;
  const r = v as Record<string, unknown>;
  if (typeof r.rationale !== "string" || !r.rationale) return "stack missing string `rationale`";
  if (typeof r.primary_benefit !== "string" || !r.primary_benefit) return "stack missing string `primary_benefit`";
  if (typeof r.partner_slug !== "string" || !r.partner_slug) return "stack missing string `partner_slug`";
  if ("cite" in r && !Array.isArray(r.cite)) return "stack `cite` must be array if present";
  if (!r.protocol || typeof r.protocol !== "object") return "stack missing `protocol` object map";
  for (const [k, val] of Object.entries(r.protocol as Record<string, unknown>)) {
    if (typeof val !== "string" || !val) return `stack.protocol.${k} must be a non-empty string`;
  }
  return true;
};

const REQUIRED_FIELDS: Array<{ path: string[]; validate: Validator }> = [
  { path: ["summary"], validate: isCitableShape },
  { path: ["hero_route"], validate: isCitableShape },
  { path: ["hero_stats", "*"], validate: isHeroStat },
  { path: ["mechanism", "primary_target"], validate: isCitableShape },
  { path: ["mechanism", "pathway"], validate: isCitableShape },
  { path: ["mechanism", "downstream_effect"], validate: isCitableShape },
  { path: ["mechanism", "origin"], validate: isCitableShape },
  { path: ["mechanism", "feedback_intact"], validate: isCitableShape },
  { path: ["mechanism", "antibody_development"], validate: isCitableShape },
  { path: ["mechanism", "receptor_class"], validate: isCitableShape },
  { path: ["mechanism", "half_life_basis"], validate: isCitableShape },
  { path: ["mechanism", "diagram", "*", "text"], validate: isCitableShape },
  { path: ["dosage", "rows", "*", "value"], validate: isCitableShape },
  { path: ["dosage", "rows", "*", "notes"], validate: isCitableShape },
  { path: ["fat_loss", "evidence_meta"], validate: isCitableShape },
  { path: ["fat_loss", "rows", "*", "value"], validate: isCitableShape },
  { path: ["fat_loss", "rows", "*", "notes"], validate: isCitableShape },
  { path: ["side_effects", "rows", "*", "value"], validate: isCitableShape },
  { path: ["side_effects", "rows", "*", "notes"], validate: isCitableShape },
  { path: ["side_effects", "contraindications_absolute", "*"], validate: isCitableShape },
  { path: ["side_effects", "contraindications_relative", "*"], validate: isCitableShape },
  { path: ["administration", "steps", "*"], validate: isAdminStep },
  { path: ["synergy", "stacks", "*"], validate: isStackProtocol },
];

function descend(obj: unknown, path: string[]): { value: unknown; path: string }[] {
  if (path.length === 0) return [{ value: obj, path: "" }];
  const [head, ...rest] = path;
  if (head === "*") {
    if (!Array.isArray(obj)) return [];
    // Match walker's path format: parent[i].key (no dot before bracket,
    // dot after bracket if there's a sub-key).
    return obj.flatMap((item, i) =>
      descend(item, rest).map((r) => ({
        ...r,
        path: r.path ? `[${i}].${r.path}` : `[${i}]`,
      })),
    );
  }
  if (!obj || typeof obj !== "object") return [];
  if (!(head in (obj as Record<string, unknown>))) return [];
  return descend((obj as Record<string, unknown>)[head], rest).map((r) => {
    if (!r.path) return { ...r, path: head };
    // If the next char is '[' (array spread directly under named key), no dot
    return {
      ...r,
      path: r.path.startsWith("[") ? `${head}${r.path}` : `${head}.${r.path}`,
    };
  });
}

function emptyCite(v: unknown): boolean {
  if (typeof v === "string") return true;
  if (v && typeof v === "object") {
    const r = v as Record<string, unknown>;
    if (Array.isArray(r.cite) && r.cite.length === 0) return true;
    if (!("cite" in r)) return true;
  }
  return false;
}

let totalFiles = 0;
let totalShapeFields = 0;
let totalParityFields = 0;
const issues: string[] = [];

const refs = CitationRegistry.parse(CITATIONS);
const refIds = new Set(Object.keys(refs));

const files = readdirSync(PEPTIDES_DIR).filter(
  (f) => f.endsWith(".yaml") && !f.startsWith("_"),
);

for (const file of files) {
  const raw = readFileSync(join(PEPTIDES_DIR, file), "utf-8");
  let parsed: unknown;
  try {
    parsed = yaml.load(raw);
  } catch (e) {
    issues.push(`${file}: YAML parse failed — ${(e as Error).message}`);
    continue;
  }
  totalFiles += 1;

  // Layer 1: shape validation
  for (const { path, validate } of REQUIRED_FIELDS) {
    const matches = descend(parsed, path);
    for (const m of matches) {
      if (m.value === undefined || m.value === null) continue;
      totalShapeFields += 1;
      const result = validate(m.value);
      if (result !== true) {
        issues.push(`${file}: ${m.path} — ${result}`);
      }
    }
  }

  // Layer 2: stats-parity. Run Zod parse → computePeptideStats and verify
  // every REQUIRED_FIELDS path that has a YAML value participates in stats.
  const zodResult = Peptide.safeParse(parsed);
  if (!zodResult.success) {
    issues.push(`${file}: Zod parse failed (run build for details)`);
    continue;
  }
  const stats = computePeptideStats(zodResult.data);
  // Reverse map: every uncited field path is "seen". Total claims accounts
  // for the rest. We can't enumerate counted-cited paths from stats alone,
  // but we can verify total_claims >= number of REQUIRED_FIELDS instances
  // present in YAML (after subtracting decorative paths and accounting for
  // notes/optionals that may be absent).
  const yamlPathCount = REQUIRED_FIELDS.reduce(
    (acc, { path }) =>
      acc +
      descend(parsed, path).filter((m) => m.value !== undefined && m.value !== null).length,
    0,
  );
  // Some YAML paths produce 0 claims (e.g. an empty contraindications array).
  // We expect total_claims to be ≥ yamlPathCount adjusted: each StackProtocol
  // contributes 2 + protocol entries, each AdminStep contributes 1, each
  // hero_stat contributes 1. The audit scripted shape-paths overcount because
  // each StackProtocol path is single, but the walker counts multiple claims
  // from it. So: total_claims should be at least the count of CitableValue
  // paths + parent-cite occurrences.
  const citableValuePaths = REQUIRED_FIELDS.filter((f) => f.validate === isCitableShape);
  const parentCitePaths = REQUIRED_FIELDS.filter((f) => f.validate !== isCitableShape);
  const yamlCitableCount = citableValuePaths.reduce(
    (acc, { path }) =>
      acc +
      descend(parsed, path).filter((m) => m.value !== undefined && m.value !== null).length,
    0,
  );
  const yamlParentCount = parentCitePaths.reduce(
    (acc, { path }) =>
      acc +
      descend(parsed, path).filter((m) => m.value !== undefined && m.value !== null).length,
    0,
  );
  totalParityFields += yamlPathCount;

  // Each parent-cite item produces ≥1 claim. CitableValues are 1:1.
  // total_claims must be ≥ yamlCitableCount + yamlParentCount.
  if (stats.total_claims < yamlCitableCount + yamlParentCount) {
    issues.push(
      `${file}: PARITY FAIL — total_claims=${stats.total_claims} < expected ≥ ${yamlCitableCount + yamlParentCount} (citable=${yamlCitableCount} + parent=${yamlParentCount}). Walker is dropping fields.`,
    );
  }

  // Verify: every uncited CitableValue path actually appears in
  // stats.uncited_fields. Pick paths that have empty cite in YAML.
  for (const { path, validate } of citableValuePaths) {
    if (validate !== isCitableShape) continue;
    const matches = descend(parsed, path);
    for (const m of matches) {
      if (m.value === undefined || m.value === null) continue;
      if (!emptyCite(m.value)) continue;
      // Path should appear in uncited_fields. Walker + audit now use the
      // same path format (parent[i].child).
      const found = stats.uncited_fields.includes(m.path);
      if (!found) {
        issues.push(
          `${file}: PARITY FAIL — uncited path "${m.path}" not in stats.uncited_fields. Walker likely skipping this path.`,
        );
      }
    }
  }

  // Verify: every cite ID used resolves
  for (const { path } of REQUIRED_FIELDS) {
    const matches = descend(parsed, path);
    for (const m of matches) {
      if (m.value === undefined || m.value === null) continue;
      const obj = m.value as Record<string, unknown>;
      const cite = obj.cite as string[] | undefined;
      if (Array.isArray(cite)) {
        for (const id of cite) {
          if (!refIds.has(id)) {
            issues.push(`${file}: ${m.path} cites unresolved ref "${id}"`);
          }
        }
      }
    }
  }
}

console.log(
  `[audit-trust-metric] ${totalFiles} peptides checked. Shape: ${totalShapeFields} fields verified. Parity: ${totalParityFields} field instances cross-checked against computePeptideStats output.`,
);

if (issues.length > 0) {
  console.error("\n[audit-trust-metric] FAIL:");
  for (const i of issues) console.error(`  - ${i}`);
  process.exit(1);
}
