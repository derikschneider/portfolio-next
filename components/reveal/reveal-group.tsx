"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { buildLineSegments, collectRevealItems, prefersReducedMotion, runRevealGroup } from "./reveal-engine";

export function RevealGroup({
  children,
  className,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  /** Reveal as soon as mounted instead of waiting for scroll-into-view (above-the-fold content). */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hairlines build their dashed-segment structure right away, regardless
    // of scroll position — unlike text/shapes (which only animate opacity/
    // blur on already-final markup), a line's segments are a DOM rebuild
    // (one solid div -> N spans). Deferring that rebuild until scroll-into-
    // view means below-the-fold lines render solid, then visibly restructure
    // into dashes as the user scrolls past them — reads as a glitch, not a
    // reveal. Building eagerly and marking them revealed immediately keeps
    // the dashed look constant; only text/shapes still fade in on scroll.
    el.querySelectorAll<HTMLElement>('[data-reveal="line"]').forEach((line) => {
      buildLineSegments(line).forEach((seg) => seg.classList.add("revealed"));
    });

    if (prefersReducedMotion()) return;

    document.documentElement.classList.add("reveal-ready");

    if (immediate) {
      runRevealGroup(collectRevealItems(el));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runRevealGroup(collectRevealItems(entry.target));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
