"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useHoverFx } from "@/components/reveal/use-hover-fx";

/**
 * Prev/next navigation at the foot of a case study.
 *
 * Deliberately a client component that renders its own <Link>s, rather than
 * server-rendered links wrapped in <Hoverable>. Hoverable works by
 * cloneElement-ing its child to attach a ref — which means a server component
 * has to serialize that whole element tree across the RSC boundary for a
 * client component to clone. In dev, Next 15.5.20 emits repeated elements
 * (the arrow icons appear more than once per page) as back-references into
 * the flight payload, and on at least one page those indices collided with
 * React's dev-only debug-info rows, resolving to `undefined` instead of the
 * icon — "Element type is invalid ... check the render method of Hoverable".
 * Production was unaffected, but it broke local dev on that page.
 *
 * Owning the markup here means nothing crosses the boundary but plain strings,
 * so there is no element to serialize, dedupe, or mis-reference.
 *
 * Hover grammar matches the case-study rows: the direction label blinks and
 * scrambles once, the destination title scrambles and keeps cycling.
 */
function NavLink({
  href,
  direction,
  company,
  index,
  side,
}: {
  href: string;
  direction: "Previous" | "Next";
  company: string;
  /** Sibling's 1-based position among all case studies, e.g. 6 -> "· 06". */
  index: number;
  side: "start" | "end";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useHoverFx(ref, {
    blinkSelector: '[data-slot="cs-dir"]',
    scrambleOnceSelector: '[data-slot="cs-dir"]',
    scrambleSelector: '[data-slot="cs-name"]',
  });

  const isPrev = side === "start";

  return (
    <Link
      ref={ref}
      href={href}
      // duration on descendants too, not just the link: the inner text spans
      // carry no transition utility of their own, so they fall through to the
      // 0.4s base-layer rule and that — not the link's own duration — is the
      // fade you actually see. 133ms = 0.4s / 3.
      className={`group flex flex-1 cursor-pointer flex-col gap-1.5 py-2 transition-colors duration-[133ms] [&_*]:duration-[133ms] ${
        isPrev ? "items-start" : "items-end text-right"
      }`}
    >
      <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-fg-50 uppercase group-hover:text-primary">
        {isPrev && <ArrowLeft className="size-4" aria-hidden="true" />}
        <span data-slot="cs-dir" data-reveal="text" data-reveal-size="fine">
          {direction} · {String(index).padStart(2, "0")}
        </span>
        {!isPrev && <ArrowRight className="size-4" aria-hidden="true" />}
      </span>
      <span
        data-slot="cs-name"
        data-reveal="text"
        data-reveal-size="fine"
        className="text-foreground"
      >
        {company}
      </span>
    </Link>
  );
}

export function CaseStudyNav({
  prev,
  next,
}: {
  prev: { slug: string; company: string; index: number };
  next: { slug: string; company: string; index: number };
}) {
  return (
    <nav
      aria-label="More case studies"
      className="flex items-stretch justify-between gap-4"
    >
      <NavLink
        href={`/work/${prev.slug}`}
        direction="Previous"
        company={prev.company}
        index={prev.index}
        side="start"
      />
      <NavLink
        href={`/work/${next.slug}`}
        direction="Next"
        company={next.company}
        index={next.index}
        side="end"
      />
    </nav>
  );
}
