"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useHoverFx } from "@/components/reveal/use-hover-fx";
import { CASE_STUDY_HIGHLIGHTS } from "@/lib/case-study-highlights";
import type { CaseStudy } from "@/lib/case-studies";

// Second clause of the evidence caption ("N images · ___") — not derivable
// from the gallery data itself, so kept as a small per-slug lookup rather
// than guessed generically. Falls back to just the image count when a slug
// isn't listed.
const EVIDENCE_DESCRIPTORS: Record<string, string> = {
  "volition-netherrealm-game-ui": "5 shipped titles",
  "novant-health-aurora": "icon system + physician finder",
  "nutrien-bonsai": "design system + field tool",
  "state-farm-cx-patent-tool": "recreated examples",
};

/**
 * Work-index row for the "Evidence column" layout (IMPLEMENTATION.md step
 * 3). Sibling to `LogRow`, not a variant of it — the Resume page shares
 * `LogRow` and shouldn't inherit this page's 3-column evidence layout.
 */
export function CaseStudyIndexRow({ cs, index }: { cs: CaseStudy; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useHoverFx(ref, { scrambleOnceSelector: "h3", blinkSelector: "h3", scrambleSelector: "p" });

  const hasImages = !!cs.galleries && cs.galleries.length > 0;

  return (
    <Link
      ref={ref}
      href={`/work/${cs.slug}`}
      className="group grid grid-cols-1 gap-6 px-4 py-[30px] transition-colors hover:bg-primary lg:grid-cols-[4ch_1fr_340px] lg:items-start lg:gap-x-8 lg:gap-y-0"
    >
      <span
        aria-hidden="true"
        className="font-mono text-sm text-primary/50 transition-colors group-hover:text-on-accent/60"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-[11px] tracking-[0.06em] text-fg-50 uppercase transition-colors group-hover:text-on-accent">
          <span data-reveal="text" data-reveal-size="fine">
            {cs.company}
          </span>
          <span aria-hidden="true">·</span>
          <span data-reveal="text" data-reveal-size="fine" className="opacity-70">
            {cs.years}
          </span>
        </div>
        <h3
          data-reveal="text"
          data-reveal-size="fine"
          className="font-display text-[1.35rem] leading-[1.22] font-bold text-foreground transition-colors group-hover:text-on-accent dark:text-primary dark:group-hover:text-on-accent"
        >
          {cs.title}
        </h3>
        <p
          data-reveal="text"
          className="max-w-[56ch] text-[0.92rem] leading-[1.55] text-fg-80 transition-colors group-hover:text-on-accent"
        >
          {cs.summary}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {cs.stack.map((tag) => (
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
      </div>

      {hasImages ? (
        <ImageEvidence cs={cs} />
      ) : (
        <FigureEvidence cs={cs} />
      )}
    </Link>
  );
}

function ImageEvidence({ cs }: { cs: CaseStudy }) {
  const galleries = cs.galleries ?? [];
  const firstGallery = galleries[0];
  const totalImages = galleries.reduce((sum, g) => sum + g.images.length, 0);
  const thumbs = firstGallery
    ? firstGallery.cover
      ? [firstGallery.cover, firstGallery.images[0]]
      : [firstGallery.images[0], firstGallery.images[1]]
    : [];
  const descriptor = EVIDENCE_DESCRIPTORS[cs.slug];

  return (
    <div data-preview className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-[6px]">
        {thumbs.map((img, i) => (
          <span key={img.src + i} data-preview-frame className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={img.src}
              alt=""
              fill
              sizes="170px"
              className="object-cover"
            />
          </span>
        ))}
      </div>
      <span className="font-mono text-[10.5px] tracking-[0.08em] text-primary uppercase transition-colors group-hover:text-on-accent">
        <span data-reveal="text" data-reveal-size="fine">
          {descriptor ? `${totalImages} images · ${descriptor}` : `${totalImages} images`}
        </span>
      </span>
    </div>
  );
}

function FigureEvidence({ cs }: { cs: CaseStudy }) {
  const highlight = CASE_STUDY_HIGHLIGHTS[cs.slug]?.[0];

  return (
    <div
      className="flex flex-col gap-2 border border-border p-5"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, color-mix(in oklab, var(--primary) 5%, transparent) 0 7px, transparent 7px 15px)",
      }}
    >
      {highlight && (
        <>
          <span
            data-reveal="text"
            data-reveal-size="fine"
            className="font-display text-[34px] leading-none font-black tracking-[-0.02em] text-primary transition-colors group-hover:text-on-accent"
          >
            {highlight.value}
          </span>
          <span
            data-reveal="text"
            data-reveal-size="fine"
            className="font-mono text-[10.5px] tracking-[0.08em] text-fg-60 uppercase transition-colors group-hover:text-on-accent/80"
          >
            {highlight.label}
          </span>
        </>
      )}
      <span className="font-mono text-[10.5px] tracking-[0.08em] text-fg-50 uppercase transition-colors group-hover:text-on-accent/70">
        <span data-reveal="text" data-reveal-size="fine">
          Under NDA. Figures only.
        </span>
      </span>
    </div>
  );
}
