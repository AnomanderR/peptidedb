import { ImageResponse } from "next/og";
import { getPeptide, loadAllPeptides } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return loadAllPeptides().map((p) => ({ slug: p.slug }));
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
 * /p/[slug]/opengraph-image — auto-generated 1200×630 share card.
 * Embedded into og:image meta. Renders peptide name, class, summary,
 * three quick stats, and the brand mark. Cached per-peptide.
 */
export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPeptide(slug);
  if (!p) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#060912",
            color: "#e6ecf2",
            fontFamily: "sans-serif",
            fontSize: 48,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          PeptideDB
        </div>
      ),
      { ...size },
    );
  }

  const accent = COLOR_HEX[p.color] ?? COLOR_HEX.blue;

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
          padding: "56px 64px",
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
            fontSize: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 28,
              height: 28,
              borderRadius: 4,
              background: accent,
              opacity: 0.9,
            }}
          />
          <span style={{ display: "flex", fontWeight: 600 }}>PeptideDB</span>
          <span style={{ display: "flex", color: "rgba(230, 236, 242, 0.4)" }}>
            · Research Reference
          </span>
        </div>

        {/* Pill: peptide class */}
        <div style={{ display: "flex", marginTop: 56 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: 999,
              background: `${accent}28`,
              color: accent,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {p.peptide_class}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            color: "#ffffff",
          }}
        >
          {p.name}
        </div>

        {/* Summary */}
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 22,
            lineHeight: 1.4,
            color: "rgba(230, 236, 242, 0.78)",
            maxWidth: 1000,
          }}
        >
          {p.summary.value.slice(0, 220)}
          {p.summary.value.length > 220 ? "…" : ""}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          {p.hero_stats.map((stat, i) => (
            <div
              key={i}
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 32,
                  fontWeight: 600,
                  color: accent,
                  fontFamily: "monospace",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  color: "rgba(230, 236, 242, 0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginLeft: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 14,
                color: "rgba(230, 236, 242, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              peptidedb.org/p/{p.slug}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
