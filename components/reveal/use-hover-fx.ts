"use client";

import { useEffect, type RefObject } from "react";
import {
  blinkOnce,
  prefersReducedMotion,
  resolveBlinkTarget,
  resolveScrambleTarget,
  scheduleNextScramble,
  scrambleOnce,
  stopScramble,
} from "./reveal-engine";

/**
 * Wires hover text-scramble + single blink onto `ref`'s element.
 * `scrambleSelector`/`blinkSelector` scope which descendant text
 * animates — defaults to the element's own `[data-reveal="text"]`.
 * The title/callout (blinkSelector, or scrambleOnceSelector if given a
 * separate target) blinks and scrambles exactly once per hover-in; the
 * main scramble target (scrambleSelector) fires immediately then keeps
 * repeating on a fresh random 4-8s delay for as long as the pointer
 * stays over the element. Pass `enabled: false` for blocks that aren't
 * actually clickable (e.g. a resume entry with no linked case study) —
 * these effects only make sense as affordance for something interactive.
 */
export function useHoverFx(
  ref: RefObject<HTMLElement | null>,
  opts?: {
    scrambleSelector?: string;
    blinkSelector?: string;
    scrambleOnceSelector?: string;
    enabled?: boolean;
  }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || opts?.enabled === false || prefersReducedMotion()) return;

    function onEnter() {
      if (!el) return;
      const scrambleEl = resolveScrambleTarget(el, opts?.scrambleSelector);
      const scrambleOnceEl = opts?.scrambleOnceSelector
        ? resolveScrambleTarget(el, opts.scrambleOnceSelector)
        : null;
      const blinkEl = resolveBlinkTarget(el, opts?.blinkSelector);
      blinkOnce(blinkEl);
      if (scrambleOnceEl) scrambleOnce(scrambleOnceEl);
      if (scrambleEl) {
        scrambleOnce(scrambleEl);
        scheduleNextScramble(scrambleEl);
      }
    }

    function onLeave() {
      if (!el) return;
      stopScramble(resolveScrambleTarget(el, opts?.scrambleSelector));
      if (opts?.scrambleOnceSelector) {
        stopScramble(resolveScrambleTarget(el, opts.scrambleOnceSelector));
      }
    }

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      onLeave();
    };
  }, [ref, opts?.scrambleSelector, opts?.blinkSelector, opts?.scrambleOnceSelector, opts?.enabled]);
}
