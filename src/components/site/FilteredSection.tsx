"use client";

import { cn } from "@/lib/cn";
import { useSectionFilter } from "./SectionFilterContext";

/**
 * Section wrapper that hides itself when the active section filter
 * does not match its `category`. Pure React state — no DOM mutation.
 */
export function FilteredSection({
  category,
  id,
  children,
  className,
}: {
  category: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { active } = useSectionFilter();
  const hidden = active !== "all" && active !== category;
  return (
    <section
      data-category={category}
      id={id}
      className={cn(className, hidden && "hidden")}
    >
      {children}
    </section>
  );
}
