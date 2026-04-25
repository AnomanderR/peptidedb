import { cn } from "@/lib/cn";
import { BookOpen } from "lucide-react";

/**
 * Citation density indicator. Surfaces the % of claim-bearing fields that
 * carry at least one citation. Drives contributor PRs toward filling gaps.
 *
 * Color tiers:
 *   ≥80% → green ("well-cited")
 *   ≥40% → yellow ("partial")
 *   <40% → muted ("sparse")
 */
export function CitationDensityBadge({
  cited,
  total,
  density,
  className,
}: {
  cited: number;
  total: number;
  /** Total citation references across all values (sum of all cite[] arrays). */
  density: number;
  className?: string;
}) {
  if (total === 0) return null;
  const pct = Math.round((cited / total) * 100);
  const tone =
    pct >= 80
      ? "text-[var(--color-motsc)] bg-[var(--color-motsc-soft)] ring-[color:color-mix(in_oklab,var(--color-motsc)_30%,transparent)]"
      : pct >= 40
        ? "text-[var(--color-badge-teal)] bg-[var(--color-badge-teal-soft)] ring-[color:color-mix(in_oklab,var(--color-badge-teal)_30%,transparent)]"
        : "text-[var(--color-text-muted)] bg-[var(--color-surface-offset)] ring-[var(--color-border)]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider ring-1 ring-inset",
        tone,
        className,
      )}
      title={`${density} citation reference${density === 1 ? "" : "s"} across ${total} claim${total === 1 ? "" : "s"}`}
    >
      <BookOpen size={12} strokeWidth={2.5} />
      {cited}/{total} cited
    </span>
  );
}
