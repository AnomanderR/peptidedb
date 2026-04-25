"use client";

import { cn } from "@/lib/cn";
import { useSectionFilter } from "./SectionFilterContext";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "mechanism", label: "Mechanism" },
  { id: "dosage", label: "Dosage" },
  { id: "fat-loss", label: "Fat Loss" },
  { id: "side-effects", label: "Side Effects" },
  { id: "synergy", label: "Synergy" },
  { id: "administration", label: "Administration" },
] as const;

/**
 * Section filter chips. Reads + writes the SectionFilterContext.
 * Hash + back-button + query-string preservation are handled by
 * the provider, not this component.
 */
export function SectionFilter({ available }: { available: string[] }) {
  const { active, setActive } = useSectionFilter();
  const visibleFilters = FILTERS.filter(
    (f) => f.id === "all" || available.includes(f.id),
  );

  return (
    <div className="sticky top-16 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-[color:color-mix(in_oklab,var(--color-background)_88%,transparent)] backdrop-blur-md border-b border-[var(--color-border)] no-print">
      <div className="flex items-center gap-3 overflow-x-auto">
        <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] shrink-0">
          Filter sections
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {visibleFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ring-1 ring-inset",
                active === f.id
                  ? "bg-[var(--color-tesamorelin)] text-white ring-[var(--color-tesamorelin)]"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] ring-[var(--color-border)] hover:text-[var(--color-text)] hover:ring-[var(--color-border-strong)]",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
