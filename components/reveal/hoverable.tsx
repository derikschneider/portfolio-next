"use client";

import { cloneElement, useRef, type ReactElement, type Ref } from "react";
import { useHoverFx } from "./use-hover-fx";

/**
 * Wires the hover text-flicker onto a single child element (a Button or
 * Link) from a server component, where hooks can't be called directly.
 * The child's own text should be wrapped in `<span data-reveal="text">`
 * for the effect to have something to target.
 */
export function Hoverable({ children }: { children: ReactElement<{ ref?: Ref<HTMLElement> }> }) {
  const ref = useRef<HTMLElement>(null);
  useHoverFx(ref);
  return cloneElement(children, { ref });
}
