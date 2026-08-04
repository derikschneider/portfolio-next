import { CrosshairOpen } from "@/components/field/shapes";

/**
 * The hairline that separates a page's title block from its content, with the
 * red registration mark sitting in the gutter to its left.
 *
 * The mark is a flex sibling of the line rather than absolutely positioned, so
 * it stays locked to the line's vertical center no matter how the title block
 * above it reflows (the previous `bottom-8 left-0` pinning drifted off the
 * line whenever the description wrapped to a different number of lines). It
 * also keeps the mark inside the content column, so it can't push the page
 * into horizontal overflow on narrow viewports the way a negative offset would.
 *
 * Use at most once per page — this is a rare registration mark, not a rule
 * style. Plain `<div className="hairline" data-reveal="line" />` is the
 * unmarked divider used everywhere else.
 */
export function FieldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CrosshairOpen inline className="shrink-0" />
      <div className="hairline grow" data-reveal="line" />
    </div>
  );
}
