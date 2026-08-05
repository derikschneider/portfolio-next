"use client";

import { cloneElement, useRef, type ReactElement, type Ref } from "react";
import { useHoverFx } from "./use-hover-fx";

/**
 * Wires the hover text-flicker onto a single child element (a Button or
 * Link) from a server component, where hooks can't be called directly.
 * The child's own text should be wrapped in `<span data-reveal="text">`
 * for the effect to have something to target.
 *
 * With no `opts`, both the blink and the scramble land on the child's FIRST
 * `[data-reveal="text"]` — fine for a single-label button. Pass selectors
 * when the child has more than one piece of text and they should behave
 * differently (e.g. a direction label that blinks over a destination title
 * that cycles). See `useHoverFx` for what each selector does.
 */
export function Hoverable({
  children,
  scrambleSelector,
  blinkSelector,
  scrambleOnceSelector,
}: {
  children: ReactElement<{ ref?: Ref<HTMLElement> }>;
  scrambleSelector?: string;
  blinkSelector?: string;
  scrambleOnceSelector?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useHoverFx(ref, { scrambleSelector, blinkSelector, scrambleOnceSelector });
  return cloneElement(children, { ref });
}
