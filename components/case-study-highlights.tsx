import type { CaseStudyHighlight } from "@/lib/case-study-highlights";
import { RevealGroup } from "@/components/reveal/reveal-group";

/**
 * Big blocky accomplishment callouts for case studies that can't show visuals
 * (NDA). Deliberately heavier than the rest of the page's type: these are the
 * focal element on a page that would otherwise be two paragraphs of prose.
 *
 * Value sizing note — values here range from "101" to "Sketch → Figma", so the
 * display size is capped at text-5xl rather than going larger. At 2-up on
 * desktop the longest value still sets on one line; anything bigger wraps it.
 */
export function CaseStudyHighlights({
  highlights,
}: {
  highlights: CaseStudyHighlight[];
}) {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {highlights.map(({ value, label, detail }) => (
        <div
          key={label}
          // Diagonal stripe, same treatment as the Work index's figures-only
          // evidence block (components/case-study-index-row.tsx) — reads as
          // "evidence" rather than a generic stat card.
          className="flex flex-col gap-3 border border-border p-6 sm:p-7"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, color-mix(in oklab, var(--primary) 5%, transparent) 0 7px, transparent 7px 15px)",
          }}
        >
          <span
            data-reveal="text"
            data-reveal-size="fine"
            className="font-display text-3xl leading-none font-black tracking-[-0.02em] text-primary sm:text-5xl"
          >
            {value}
          </span>
          <span
            data-reveal="text"
            data-reveal-size="fine"
            className="font-mono text-[11px] tracking-[0.14em] text-fg-60 uppercase"
          >
            {label}
          </span>
          <p
            data-reveal="text"
            className="text-sm leading-relaxed text-fg-75"
          >
            {detail}
          </p>
        </div>
      ))}
    </RevealGroup>
  );
}
