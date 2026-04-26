import "server-only";

/* =========================================================
   Peptide motif — a deterministic SVG fingerprint per peptide.
   Built for /v3/atlas. Each slug hashes to:
   - a primary mineral pigment (drawn from the per-class palette)
   - a 12-node hexagonal arrangement of dots (suggesting molecular
     structure without claiming accuracy — this is iconography, not
     crystallography)
   - a unique ring offset and dash pattern

   The function is pure: same slug + class → same motif everywhere
   on the site, so the visual identity feels stable and learnable.
   ========================================================= */

interface MotifProps {
  slug: string;
  peptide_class?: string;
  size?: number;
  variant?: "card" | "hero";
}

/* FNV-1a-ish stable hash — small, deterministic, no deps. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

/* Per-class pigment, falling back to a deterministic class-by-hash mapping
   when a class hasn't been explicitly catalogued. Keys are normalized
   lowercase so YAML casing variations ("Actin-sequestering peptide" vs
   "Actin-sequestering Peptide") all resolve to the same pigment. */
const CLASS_PIGMENT_RAW: Record<string, string> = {
  "GHRH Analogue": "var(--at-pigment-teal)",
  "GHRH Analogue (1-29)": "var(--at-pigment-teal)",
  "GHRH Analogue (modified GRF 1-29)": "var(--at-pigment-teal)",
  "Ghrelin Receptor Agonist (oral)": "var(--at-pigment-teal)",
  "GHRP / Ghrelin Receptor Agonist": "var(--at-pigment-teal)",
  "Heptapeptide ACTH(4-10) analog": "var(--at-pigment-clay)",
  "Pentadecapeptide": "var(--at-pigment-sage)",
  "Actin-sequestering peptide": "var(--at-pigment-sage)",
  "Tripeptide (Lys-Pro-Val)": "var(--at-pigment-sage)",
  "Copper-binding tripeptide": "var(--at-pigment-sage)",
  "GLP-1 Receptor Agonist": "var(--at-pigment-rust)",
  "GLP-1 / GIP / Glucagon Triple Agonist": "var(--at-pigment-rust)",
  "GIP / GLP-1 Dual Receptor Agonist": "var(--at-pigment-rust)",
  "Mitochondrial-derived peptide": "var(--at-pigment-ochre)",
  "Mitochondrial-targeted tetrapeptide": "var(--at-pigment-ochre)",
  "Lipolytic HGH C-terminal fragment": "var(--at-pigment-fern)",
  "NNMT Inhibitor (small molecule)": "var(--at-pigment-fern)",
  "Triple monoamine reuptake inhibitor (small molecule)": "var(--at-pigment-fern)",
  "Melanocortin-4 Receptor Agonist": "var(--at-pigment-plum)",
  "α-MSH Analog (cyclic heptapeptide)": "var(--at-pigment-plum)",
  "Tetrapeptide bioregulator": "var(--at-pigment-smoke)",
  "Heptapeptide bioregulator": "var(--at-pigment-smoke)",
  "Synthetic 28-AA thymic peptide": "var(--at-pigment-smoke)",
  "Polypeptide complex (thymus-derived)": "var(--at-pigment-smoke)",
  Nonapeptide: "var(--at-pigment-clay)",
};

/* Case-insensitive index: lowercase key → pigment. Built once per process. */
const CLASS_PIGMENT: Record<string, string> = Object.fromEntries(
  Object.entries(CLASS_PIGMENT_RAW).map(([k, v]) => [k.toLowerCase(), v]),
);

const PIGMENT_FALLBACK = [
  "var(--at-pigment-sage)",
  "var(--at-pigment-rust)",
  "var(--at-pigment-teal)",
  "var(--at-pigment-ochre)",
  "var(--at-pigment-plum)",
  "var(--at-pigment-smoke)",
  "var(--at-pigment-fern)",
  "var(--at-pigment-clay)",
  "var(--at-pigment-stone)",
];

export function pigmentFor(peptide_class?: string): string {
  if (!peptide_class) return PIGMENT_FALLBACK[0];
  const key = peptide_class.toLowerCase();
  if (CLASS_PIGMENT[key]) return CLASS_PIGMENT[key];
  const idx = hash(peptide_class) % PIGMENT_FALLBACK.length;
  return PIGMENT_FALLBACK[idx];
}

/* Hex equivalents — used by OG generators (Satori) which can't resolve
   CSS variables. Keep in sync with the --at-pigment-* tokens in globals.css. */
const PIGMENT_HEX: Record<string, string> = {
  "var(--at-pigment-sage)": "#5c7459",
  "var(--at-pigment-rust)": "#a2553b",
  "var(--at-pigment-teal)": "#1f4f4f",
  "var(--at-pigment-ochre)": "#a37f3d",
  "var(--at-pigment-plum)": "#4f3d5c",
  "var(--at-pigment-smoke)": "#3d5c5c",
  "var(--at-pigment-fern)": "#3d4f24",
  "var(--at-pigment-clay)": "#8c5e3c",
  "var(--at-pigment-stone)": "#5a5a52",
};

export function pigmentHexFor(peptide_class?: string): string {
  const cssVar = pigmentFor(peptide_class);
  return PIGMENT_HEX[cssVar] ?? "#5a5a52";
}

/* =========================================================
   buildMotifNodes — D16, single source of truth for the 12-node
   hex coat-of-arms geometry. Both the in-page <PeptideMotif> and
   the /p/[slug] OG card import from here. Pure: same slug + size
   in → same nodes/cx/cy/ringR/innerR/seedRingDash/seedRotation out.
   ========================================================= */
export interface MotifNode {
  x: number;
  y: number;
  x2: number | null;
  y2: number | null;
  bigDot: boolean;
}

export interface MotifGeometry {
  hash: number;
  cx: number;
  cy: number;
  ringR: number;
  innerR: number;
  nodes: MotifNode[];
  seedRingDash: string;
  seedRotation: number;
}

export function buildMotifNodes(slug: string, motifSize: number): MotifGeometry {
  const h = hash(slug);
  const cx = motifSize / 2;
  const cy = motifSize / 2;
  const ringR = motifSize * 0.34;
  const innerR = motifSize * 0.18;

  const nodes: MotifNode[] = Array.from({ length: 12 }).map((_, i) => {
    const t = (i / 12) * Math.PI * 2;
    const jitter = ((h >> (i * 2)) & 0x07) - 3.5; // -3.5 .. +3.5
    const r = ringR + jitter * 1.3;
    const r2 =
      i % 3 === 0 ? innerR + (((h >> (i * 3)) & 0x05) - 2.5) * 1.2 : null;
    return {
      x: cx + r * Math.cos(t),
      y: cy + r * Math.sin(t),
      x2: r2 == null ? null : cx + r2 * Math.cos(t + Math.PI / 12),
      y2: r2 == null ? null : cy + r2 * Math.sin(t + Math.PI / 12),
      bigDot: ((h >> (i + 4)) & 1) === 1,
    };
  });

  const seedRingDash = `${(h & 0x07) + 2} ${((h >> 4) & 0x07) + 4}`;
  const seedRotation = (h >> 8) % 60;

  return { hash: h, cx, cy, ringR, innerR, nodes, seedRingDash, seedRotation };
}

/* Format a slug as a human-readable title for accessible labels:
   "ss-31" → "Ss 31", "tesamorelin" → "Tesamorelin". Used as the
   <title> text inside the motif SVG when no display name is passed. */
function slugToTitle(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function PeptideMotif({
  slug,
  peptide_class,
  size = 200,
  variant = "card",
}: MotifProps) {
  const pigment = pigmentFor(peptide_class);

  /* 12 anchor points in a hexagonal arrangement. Each gets a sub-jitter
     drawn from the slug hash so every peptide is visually unique. */
  const { hash: h, cx, cy, ringR, innerR, nodes, seedRingDash, seedRotation } =
    buildMotifNodes(slug, size);
  const name = slugToTitle(slug);

  const isHero = variant === "hero";
  const lineWidth = isHero ? 1.1 : 0.8;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`Specimen motif for ${slug}`}
      style={{ display: "block" }}
    >
      <title>{name} specimen motif</title>
      <desc>
        Deterministic 12-node hex coat-of-arms fingerprint for {name},
        generated from the slug hash. Decorative; the same slug always
        produces the same motif.
      </desc>
      {/* Outer compass ring with seeded dash */}
      <circle
        cx={cx}
        cy={cy}
        r={ringR + 18}
        fill="none"
        stroke={pigment}
        strokeOpacity="0.25"
        strokeDasharray={seedRingDash}
        strokeWidth={lineWidth}
        transform={`rotate(${seedRotation} ${cx} ${cy})`}
      />
      {/* Inner ring */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke={pigment}
        strokeOpacity="0.4"
        strokeWidth={lineWidth}
      />
      {/* Connector edges between adjacent nodes */}
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const opacity = ((h >> i) & 1) === 1 ? 0.55 : 0.22;
        return (
          <line
            key={`edge-${i}`}
            x1={n.x}
            y1={n.y}
            x2={next.x}
            y2={next.y}
            stroke={pigment}
            strokeOpacity={opacity}
            strokeWidth={lineWidth * 0.9}
          />
        );
      })}
      {/* Inner-radial spokes for variety */}
      {nodes
        .filter((n) => n.x2 != null && n.y2 != null)
        .map((n, i) => (
          <line
            key={`spoke-${i}`}
            x1={n.x}
            y1={n.y}
            x2={n.x2!}
            y2={n.y2!}
            stroke={pigment}
            strokeOpacity="0.32"
            strokeWidth={lineWidth * 0.7}
          />
        ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <circle
          key={`node-${i}`}
          cx={n.x}
          cy={n.y}
          r={n.bigDot ? 4.5 : 2.4}
          fill={n.bigDot ? pigment : "var(--at-bone)"}
          stroke={pigment}
          strokeWidth={lineWidth * 0.9}
        />
      ))}
      {/* Center dot — the molecule's "heart" */}
      <circle cx={cx} cy={cy} r="3.2" fill={pigment} />
      {isHero && (
        <circle
          cx={cx}
          cy={cy}
          r="9"
          fill="none"
          stroke={pigment}
          strokeOpacity="0.5"
          strokeWidth="0.6"
        />
      )}
    </svg>
  );
}

/* Tufte sparkline for citation density — a tiny inline bar that
   shows a peptide's cite-percentage as a horizontal sparkline,
   no axes, no labels, just the data. */
export function CitationSpark({
  pct,
  width = 80,
  pigment,
}: {
  pct: number;
  width?: number;
  pigment?: string;
}) {
  const filled = Math.max(0, Math.min(100, pct));
  return (
    <svg
      className="at-spark"
      viewBox={`0 0 ${width} 14`}
      width={width}
      height={14}
      role="img"
      aria-label={`Citation density ${pct} percent`}
    >
      <line
        x1="0"
        y1="7"
        x2={width}
        y2="7"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="7"
        x2={(filled / 100) * width}
        y2="7"
        stroke={pigment ?? "currentColor"}
        strokeWidth="3"
        strokeLinecap="square"
      />
      <circle
        cx={(filled / 100) * width}
        cy="7"
        r="2"
        fill={pigment ?? "currentColor"}
      />
    </svg>
  );
}
