// Chunk-reveal + hover-scramble engine. Framework-agnostic DOM logic —
// React only owns mounting/teardown (see reveal-group.tsx / use-hover-fx.ts).
// Ported from the "Field Report" design exploration; see that artifact
// for the original vanilla build this was lifted from.

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Mostly-big-some-small chunking: fewer, longer pieces resolve a section
// faster in aggregate, while an occasional small piece keeps visible
// texture instead of uniform blocks.
function buildChunks(text: string, small: [number, number], big: [number, number]): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    const range = Math.random() < 0.7 ? big : small;
    const len = range[0] + Math.floor(Math.random() * (range[1] - range[0] + 1));
    chunks.push(text.slice(i, i + len));
    i += len;
  }
  return chunks;
}

// Wraps an element's text in an sr-only fallback (real content for
// assistive tech) plus a visual chunk-wrap the reveal engine animates
// independently. Idempotent — a second call on an already-wrapped
// element is a no-op, which matters under React StrictMode's
// dev-only double-effect invocation.
export function wrapTextReveal(el: HTMLElement): HTMLElement[] {
  if (el.querySelector(":scope > .chunk-wrap")) return [];
  const original = el.textContent?.trim();
  if (!original) return [];
  const fine = el.dataset.revealSize === "fine";
  const chunks = buildChunks(original, fine ? [1, 3] : [3, 8], fine ? [4, 10] : [16, 42]);

  el.innerHTML = "";
  const sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = original;

  const wrap = document.createElement("span");
  wrap.className = "chunk-wrap";
  wrap.setAttribute("aria-hidden", "true");

  const spans = chunks.map((c) => {
    const s = document.createElement("span");
    s.className = "chunk";
    s.textContent = c;
    wrap.appendChild(s);
    return s;
  });

  el.appendChild(sr);
  el.appendChild(wrap);
  return spans;
}

export function buildLineSegments(el: HTMLElement): HTMLElement[] {
  if (el.classList.contains("segmented")) return [];
  const width = el.getBoundingClientRect().width || 200;
  const count = Math.max(4, Math.min(13, Math.round(width / 65)));
  el.innerHTML = "";
  el.classList.add("segmented");
  const spans: HTMLElement[] = [];
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "seg";
    const big = Math.random() < 0.72;
    s.style.flexGrow = big ? (2 + Math.random() * 2.5).toFixed(2) : (0.3 + Math.random() * 0.4).toFixed(2);
    el.appendChild(s);
    spans.push(s);
  }
  return spans;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Hard ceiling: a section must fully resolve within ~0.75s of entering
// view no matter how much content it holds. Stagger per item at a
// pleasant ~18ms when the group is small; compress that gap as the
// group grows so the LAST item's delay never exceeds the budget,
// leaving headroom for its own reveal transition (<=160ms) after.
const REVEAL_BUDGET_MS = 380;

export function runRevealGroup(items: Element[]): void {
  const order = shuffle(items.slice());
  const n = order.length;
  const perItem = n > 1 ? Math.min(18, REVEAL_BUDGET_MS / (n - 1)) : 0;
  order.forEach((item, idx) => {
    const delay = idx * perItem + Math.random() * perItem * 0.5;
    setTimeout(() => item.classList.add("revealed"), delay);
  });
}

export function collectRevealItems(group: Element): Element[] {
  let items: Element[] = [];
  group.querySelectorAll<HTMLElement>('[data-reveal="text"]').forEach((el) => {
    items = items.concat(wrapTextReveal(el));
  });
  group.querySelectorAll<HTMLElement>('[data-reveal="line"]').forEach((el) => {
    items = items.concat(buildLineSegments(el));
  });
  group.querySelectorAll<HTMLElement>('[data-reveal="shape"]').forEach((el) => {
    items.push(el);
  });
  return items;
}

// ---------- hover scramble + blink ----------

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/\\-_";
function randChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

type ScrambleRange = { start: number; len: number; ticks: number; maxTicks: number };

function pickRanges(len: number): ScrambleRange[] {
  const count = len > 6 && Math.random() < 0.5 ? 2 : 1;
  const ranges: ScrambleRange[] = [];
  for (let i = 0; i < count; i++) {
    const spanLen = Math.max(1, Math.min(6, Math.floor(Math.random() * 6) + 1, len - 1));
    const start = Math.floor(Math.random() * Math.max(1, len - spanLen));
    ranges.push({ start, len: spanLen, ticks: 0, maxTicks: 6 });
  }
  return ranges;
}

type ScrambleEl = HTMLElement & { _tickTimer?: ReturnType<typeof setInterval> | null; _cycleTimer?: ReturnType<typeof setTimeout> | null };

export function scrambleOnce(el: ScrambleEl | null): void {
  if (!el) return;
  let original = el.dataset.original;
  if (original === undefined) {
    original = el.textContent ?? "";
    el.dataset.original = original;
  }
  if (original.length < 2) return;
  const chars = original.split("");
  const ranges = pickRanges(chars.length);
  if (el._tickTimer) clearInterval(el._tickTimer);
  el._tickTimer = setInterval(() => {
    let alive = false;
    ranges.forEach((r) => {
      if (r.ticks < r.maxTicks) {
        for (let k = 0; k < r.len; k++) chars[r.start + k] = randChar();
        r.ticks++;
        alive = true;
      } else {
        for (let k = 0; k < r.len; k++) chars[r.start + k] = original![r.start + k];
      }
    });
    el.textContent = chars.join("");
    if (!alive) {
      clearInterval(el._tickTimer!);
      el._tickTimer = null;
      el.textContent = original!;
    }
  }, 45);
}

// Schedules the next flicker cycle at a fresh random 4-8s delay each
// time (not a fixed-interval repeat), so cadence never feels metronomic.
export function scheduleNextScramble(el: ScrambleEl): void {
  const delay = 4000 + Math.random() * 4000;
  el._cycleTimer = setTimeout(() => {
    scrambleOnce(el);
    scheduleNextScramble(el);
  }, delay);
}

export function stopScramble(el: ScrambleEl | null): void {
  if (!el) return;
  if (el._cycleTimer) {
    clearTimeout(el._cycleTimer);
    el._cycleTimer = null;
  }
  if (el._tickTimer) {
    clearInterval(el._tickTimer);
    el._tickTimer = null;
  }
  if (el.dataset.original !== undefined) el.textContent = el.dataset.original;
}

export function blinkOnce(el: Element | null): void {
  if (!el) return;
  el.classList.remove("blink");
  void (el as HTMLElement).offsetWidth;
  el.classList.add("blink");
}

export function resolveScrambleTarget(hoverEl: HTMLElement, selector?: string): ScrambleEl | null {
  const host = selector ? hoverEl.querySelector<HTMLElement>(selector) : hoverEl.querySelector<HTMLElement>('[data-reveal="text"]');
  if (!host) return null;
  return (host.querySelector<HTMLElement>(".chunk-wrap") ?? host) as ScrambleEl;
}

export function resolveBlinkTarget(hoverEl: HTMLElement, selector?: string): Element | null {
  return selector ? hoverEl.querySelector(selector) : hoverEl.querySelector('[data-reveal="text"]');
}
