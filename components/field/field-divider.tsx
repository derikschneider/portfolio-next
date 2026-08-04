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
      {/* Offset is responsive because the margin the mark hangs in only
          exists on wide viewports. The content edge sits at
          `max((viewport - 1180) / 2, 0) + 24px`, so a full -50px only clears
          the viewport above ~1232px — below that the mark lands off-screen
          entirely (measured: at 1024px it rendered from x=-26 to x=-8, 0px
          visible). -22px keeps it inside the 24px gutter at every narrower
          size without pushing into the content column. */}
      <CrosshairOpen
        inline
        className="absolute top-1/2 left-[-22px] -translate-y-1/2 xl:left-[-50px]"
      />
    </div>
  );
}
