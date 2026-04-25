import { ImageResponse } from "next/og";
import { getPeptide, loadAllPeptides } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = true;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const peptides = loadAllPeptides();
  const params: { slugs: string }[] = [];
  for (let i = 0; i < peptides.length; i++) {
    for (let j = i + 1; j < peptides.length; j++) {
      const sorted = [peptides[i].slug, peptides[j].slug].sort();
      params.push({ slugs: `${sorted[0]}-vs-${sorted[1]}` });
      if (params.length >= 100) return params;
    }
  }
  return params;
}

const COLOR_HEX: Record<string, string> = {
  blue: "#5b8cff",
  green: "#34d399",
  purple: "#a78bfa",
  amber: "#fbbf24",
  rose: "#f87171",
  cyan: "#22d3ee",
  teal: "#2dd4bf",
};

/**
 * Comparison OG card. Renders "A vs B" with both peptides' hero stats
 * side-by-side. Drives one-click sharing of any compare URL.
 */
export default async function ComparisonOGImage({
  params,
}: {
  params: Promise<{ slugs: string }>;
}) {
  const { slugs: combined } = await params;
  const parts = combined.split("-vs-");
  const peptides = parts.map((s) => getPeptide(s)).filter((p) => p !== undefined);
  if (peptides.length < 2) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#060912",
            color: "#e6ecf2",
            fontSize: 48,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          PeptideDB · Compare
        </div>
      ),
      { ...size },
    );
  }
  const a = peptides[0]!;
  const b = peptides[1]!;
  const accentA = COLOR_HEX[a.color] ?? COLOR_HEX.blue;
  const accentB = COLOR_HEX[b.color] ?? COLOR_HEX.green;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #060912 0%, #0d1320 100%)",
          color: "#e6ecf2",
          padding: "48px 56px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "rgba(230, 236, 242, 0.65)",
            fontSize: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 24,
              height: 24,
              borderRadius: 4,
              background: accentA,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              display: "flex",
              width: 24,
              height: 24,
              borderRadius: 4,
              background: accentB,
              opacity: 0.9,
              marginLeft: -8,
            }}
          />
          <span style={{ display: "flex", fontWeight: 600, marginLeft: 8 }}>
            PeptideDB · Comparison
          </span>
        </div>

        {/* Title row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 28,
            marginTop: 36,
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: 1.0,
          }}
        >
          <span style={{ display: "flex", color: accentA }}>{a.name}</span>
          <span
            style={{
              display: "flex",
              fontSize: 36,
              color: "rgba(230, 236, 242, 0.45)",
              fontFamily: "monospace",
            }}
          >
            vs
          </span>
          <span style={{ display: "flex", color: accentB }}>{b.name}</span>
        </div>

        {/* Two-column stats */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 48,
          }}
        >
          {[
            { p: a, accent: accentA },
            { p: b, accent: accentB },
          ].map(({ p, accent }, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 12,
                padding: 24,
                borderRadius: 12,
                background: `${accent}10`,
                border: `1px solid ${accent}40`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  color: "rgba(230, 236, 242, 0.55)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {p.peptide_class}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {p.hero_stats.map((stat, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        fontSize: 13,
                        color: "rgba(230, 236, 242, 0.55)",
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        fontSize: 22,
                        color: accent,
                        fontFamily: "monospace",
                        fontWeight: 600,
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            fontSize: 14,
            color: "rgba(230, 236, 242, 0.5)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          peptidedb.org/compare/{combined}
        </div>
      </div>
    ),
    { ...size },
  );
}
