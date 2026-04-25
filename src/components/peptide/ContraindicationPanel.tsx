import { cn } from "@/lib/cn";
import { AlertOctagon, AlertTriangle } from "lucide-react";
import { CitationChip } from "./CitationChip";
import type { CitableValue } from "@/lib/schemas/peptide";

/**
 * Two-block contraindication panel. Each item is a CitableValue
 * post-parse so contraindication claims can carry citations.
 * Mirrors reference dashboard's absolute (red) vs relative (yellow) split.
 */
export function ContraindicationPanel({
  absolute,
  relative,
  className,
}: {
  absolute?: CitableValue[];
  relative?: CitableValue[];
  className?: string;
}) {
  if ((!absolute || absolute.length === 0) && (!relative || relative.length === 0)) {
    return null;
  }
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6", className)}>
      {absolute && absolute.length > 0 && (
        <div
          className={cn(
            "rounded-[var(--radius-lg)] border p-5",
            "border-[color:color-mix(in_oklab,var(--color-badge-red)_35%,transparent)]",
            "bg-[var(--color-badge-red-soft)]",
          )}
        >
          <div className="flex items-center gap-2 text-[var(--color-badge-red)] mb-3">
            <AlertOctagon size={16} strokeWidth={2.5} />
            <span className="font-semibold tracking-tight uppercase text-[12px]">
              Absolute Contraindications
            </span>
          </div>
          <ul className="space-y-2 text-[13px] text-[var(--color-text)]">
            {absolute.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--color-badge-red)]">·</span>
                <span>
                  {item.value}
                  {item.cite && item.cite.length > 0 && (
                    <CitationChip refs={item.cite} />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {relative && relative.length > 0 && (
        <div
          className={cn(
            "rounded-[var(--radius-lg)] border p-5",
            "border-[color:color-mix(in_oklab,var(--color-badge-yellow)_35%,transparent)]",
            "bg-[var(--color-badge-yellow-soft)]",
          )}
        >
          <div className="flex items-center gap-2 text-[var(--color-badge-yellow)] mb-3">
            <AlertTriangle size={16} strokeWidth={2.5} />
            <span className="font-semibold tracking-tight uppercase text-[12px]">
              Relative Contraindications
            </span>
          </div>
          <ul className="space-y-2 text-[13px] text-[var(--color-text)]">
            {relative.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--color-badge-yellow)]">·</span>
                <span>
                  {item.value}
                  {item.cite && item.cite.length > 0 && (
                    <CitationChip refs={item.cite} />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
