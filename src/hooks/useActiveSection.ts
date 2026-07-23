import { useEffect, useState } from "react";

/**
 * Scroll spy: returns the id of the section currently intersecting the top
 * viewport band. Only runs client-side.
 */
export function useActiveSection(sectionIds: string[], offset = 120) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return active;
}
