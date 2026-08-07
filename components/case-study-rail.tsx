"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useHoverFx } from "@/components/reveal/use-hover-fx";
import type { CaseStudy } from "@/lib/case-studies";

type RailEntry = Pick<CaseStudy, "slug" | "company" | "title">;

/**
 * Sticky sidebar for the case-study detail template (IMPLEMENTATION.md step
 * 4d) — all six entries, current one highlighted. Hidden below `lg`; the
 * page's own top-of-content "All work" link (app/work/[slug]/page.tsx)
 * carries that job on smaller viewports instead.
 */
export function CaseStudyRail({ entries, currentSlug }: { entries: RailEntry[]; currentSlug: string }) {
  return (
    <nav
      aria-label="All case studies"
      className="sticky top-[76px] hidden flex-col gap-1 lg:flex"
    >
      <p className="pb-3 font-mono text-[11px] tracking-[0.14em] text-fg-50 uppercase">
        <span data-reveal="text" data-reveal-size="fine">
          All case studies //
        </span>
      </p>
      <div className="flex flex-col">
        {entries.map((entry, i) => (
          <div key={entry.slug}>
            <RailRow entry={entry} index={i} current={entry.slug === currentSlug} />
            <div className="hairline" data-reveal="line" />
          </div>
        ))}
      </div>
      <Link
        href="/work"
        className="group mt-4 flex w-fit cursor-pointer items-center gap-1.5 font-mono text-xs tracking-widest text-fg-50 uppercase transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        <span data-reveal="text" data-reveal-size="fine">
          All work
        </span>
      </Link>
    </nav>
  );
}

function RailRow({ entry, index, current }: { entry: RailEntry; index: number; current: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useHoverFx(ref, {
    scrambleOnceSelector: '[data-slot="rail-company"]',
    blinkSelector: '[data-slot="rail-company"]',
    scrambleSelector: '[data-slot="rail-title"]',
    enabled: !current,
  });

  const number = String(index + 1).padStart(2, "0");

  if (current) {
    return (
      <div className="flex flex-col gap-1 py-3">
        <span className="font-mono text-[10.5px] tracking-[0.06em] text-primary uppercase">
          <span data-reveal="text" data-reveal-size="fine">
            {number} · {entry.company}
          </span>
        </span>
        <span className="text-sm leading-snug text-foreground" data-reveal="text" data-reveal-size="fine">
          {entry.title}
        </span>
      </div>
    );
  }

  return (
    <Link
      ref={ref}
      href={`/work/${entry.slug}`}
      className="group flex cursor-pointer flex-col gap-1 py-3"
    >
      <span
        data-slot="rail-company"
        className="font-mono text-[10.5px] tracking-[0.06em] text-primary/45 uppercase transition-colors group-hover:text-primary"
      >
        <span data-reveal="text" data-reveal-size="fine">
          {number} · {entry.company}
        </span>
      </span>
      <span
        data-slot="rail-title"
        data-reveal="text"
        data-reveal-size="fine"
        className="text-sm leading-snug text-fg-50 transition-colors group-hover:text-fg-60"
      >
        {entry.title}
      </span>
    </Link>
  );
}
