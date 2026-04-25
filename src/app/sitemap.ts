import type { MetadataRoute } from "next";
import { loadAllPeptides } from "@/lib/content";

const SITE = "https://peptidedb.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const peptides = loadAllPeptides();
  const now = new Date().toISOString().split("T")[0];

  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  // Per-peptide pages
  for (const p of peptides) {
    entries.push({
      url: `${SITE}/p/${p.slug}`,
      lastModified: p.last_reviewed,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // All pairwise comparisons (canonical: alphabetical pair)
  for (let i = 0; i < peptides.length; i++) {
    for (let j = i + 1; j < peptides.length; j++) {
      entries.push({
        url: `${SITE}/compare/${peptides[i].slug}-vs-${peptides[j].slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
