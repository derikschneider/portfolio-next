"use client";

import Link from "next/link";
import { useRef, type Ref } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useHoverFx } from "@/components/reveal/use-hover-fx";

export function LogRow({
  href,
  meta,
  metaTrailing,
  title,
  description,
  tags,
  accentTitle = false,
}: {
  href?: string;
  meta: string;
  metaTrailing?: string;
  title: string;
  description?: string;
  tags?: string[];
  /** Dark mode only: render the title in the yellow primary instead of
      `foreground`. Opt-in per consumer so it stays on case-study rows and
      doesn't bleed into the Resume experience rows, which share this
      component. */
  accentTitle?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useHoverFx(ref, { scrambleOnceSelector: "h3", blinkSelector: "h3", scrambleSelector: "p", enabled: !!href });

  // "group" is only added when linked — group-hover:* utilities below key
  // text/border color off it, and without an href there's no yellow
  // hover:bg-primary backdrop, so a hover-triggered switch to --on-accent
  // (a fixed dark navy, meant for text ON the yellow fill) would otherwise
  // render as navy-on-navy and fade the row to invisible.
  //
  // "case-row" (globals.css) reflows meta/content/arrow via named grid
  // areas per breakpoint instead of duplicating markup — see its comment.
  const className = cn("case-row px-4 py-8 transition-colors", href && "group hover:bg-primary");

  const content = (
    <>
      <div
        className={cn(
          "flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-mono text-[11px] tracking-[0.06em] text-fg-50 uppercase transition-colors group-hover:text-on-accent [grid-area:meta] min-[540px]:flex-col min-[540px]:flex-nowrap min-[540px]:items-start min-[540px]:gap-1 min-[540px]:pt-1",
          !href && "[grid-column:1/-1]"
        )}
      >
        <span data-reveal="text" data-reveal-size="fine">
          {meta}
        </span>
        {metaTrailing && (
          <>
            <span aria-hidden="true" className="min-[540px]:hidden">
              ·
            </span>
            <span data-reveal="text" data-reveal-size="fine" className="opacity-70">
              {metaTrailing}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 [grid-area:content]">
        <h3
          data-reveal="text"
          data-reveal-size="fine"
          className={cn(
            "font-display text-[1.15rem] leading-[1.3] font-bold text-foreground transition-colors group-hover:text-on-accent",
            // `dark:group-hover:` is spelled out rather than relying on the
            // unprefixed group-hover above: both it and `dark:text-primary`
            // are two-class utilities, so which wins in dark mode would come
            // down to stylesheet order. Without it the title can stay yellow
            // on the yellow hover fill and disappear.
            accentTitle && "dark:text-primary dark:group-hover:text-on-accent"
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            data-reveal="text"
            className="max-w-[58ch] text-[0.92rem] leading-[1.55] text-fg-80 transition-colors group-hover:text-on-accent"
          >
            {description}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                data-reveal="text"
                data-reveal-size="fine"
                className="transition-colors group-hover:border-on-accent/40 group-hover:text-on-accent"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {href && (
        <span className="inline-block pt-1 text-fg-50 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-on-accent [grid-area:arrow]">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link ref={ref as Ref<HTMLAnchorElement>} href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={className}>
      {content}
    </div>
  );
}
