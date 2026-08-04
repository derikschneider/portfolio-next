import { CrosshairOpen } from "@/components/field/shapes";

/**
 * The hairline that separates a page's title block from its content, with the
 * red registration mark hanging in the margin to its left.
 *
 * The mark is absolutely positioned out of flow rather than being a flex
 * sibling, so the line still starts at the content column's left edge and
 * stays aligned with everything below it. (A flex row indents the line by the
 * mark's width, which reads as a misalignment against the rows underneath.)
 *
 * Use at most once per page — this is a rare registration mark, not a rule
 * style. Plain `<div className="hairline" data-reveal="line" />` is the
 * unmarked divider used everywhere else.
 */
export function FieldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="hairline" data-reveal="line" />
      {/* Flat -50px on purpose, not a responsive offset. The margin the mark
          hangs in only exists on wide viewports — the content edge sits at
          `max((viewport - 1180) / 2, 0) + 24px`, so below ~1232px this puts
          the mark partly or fully off-screen (at 1024px it lands at x=-26).
          That's accepted: it's decorative accent art, and Derik's call
          (2026-08-04) is that it's allowed to run off the edge rather than
          be nudged inward on smaller screens. Don't "fix" this into a
          responsive offset. It's clipped, not overflowing — no scrollbar. */}
      <CrosshairOpen
        inline
        className="absolute top-1/2 left-[-50px] -translate-y-1/2"
      />
    </div>
  );
}
