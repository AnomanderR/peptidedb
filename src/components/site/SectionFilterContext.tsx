"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* =========================================================
   Section filter — React-state-driven instead of imperative
   DOM manipulation. The provider owns the active filter; each
   <FilteredSection> reads it and self-hides when the filter
   doesn't match its category. Hash + popstate are tracked so
   shareable URLs and back-button work cleanly.
   ========================================================= */

type SectionFilterValue = {
  active: string;
  setActive: (id: string) => void;
};

const SectionFilterContext = createContext<SectionFilterValue | null>(null);

export function SectionFilterProvider({
  available,
  initialActive = "all",
  children,
}: {
  available: string[];
  initialActive?: string;
  children: ReactNode;
}) {
  const [active, setActiveState] = useState<string>(initialActive);

  // Read hash on mount (preserves shareable URLs)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && (hash === "all" || available.includes(hash))) {
      setActiveState(hash);
    }
    // listen for back/forward navigation
    const onPop = () => {
      const h = window.location.hash.replace("#", "");
      if (h && (h === "all" || available.includes(h))) {
        setActiveState(h);
      } else {
        setActiveState("all");
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [available]);

  const setActive = useCallback((id: string) => {
    setActiveState(id);
    // Preserve any existing query string while updating the hash
    const url = new URL(window.location.href);
    url.hash = id === "all" ? "" : `#${id}`;
    history.replaceState(null, "", url.toString());
  }, []);

  const value = useMemo(() => ({ active, setActive }), [active, setActive]);

  return (
    <SectionFilterContext.Provider value={value}>
      {children}
    </SectionFilterContext.Provider>
  );
}

export function useSectionFilter(): SectionFilterValue {
  const ctx = useContext(SectionFilterContext);
  if (!ctx) {
    // Default no-op when outside a provider — keeps server-only renders
    // (and any test-bed snapshot) safe.
    return { active: "all", setActive: () => {} };
  }
  return ctx;
}
