// Small geometric accent marks — solid/outline yellow, used sparingly at
// section edges; the crosshair variant is red and meant to appear at most
// once or twice per page (a rare registration mark, not a UI color).
// All are decorative (`aria-hidden`) and participate in RevealGroup's
// stagger via `data-reveal="shape"` + the shared `.shape-accent` class.
// `.shape-corner` (absolute positioning) is separate from `.shape-accent`
// (opacity/reveal only) since Parallelogram is used inline next to text,
// not pinned to a section corner — see reveal.css.

import type { SVGProps } from "react";

type ShapeProps = SVGProps<SVGSVGElement> & { className?: string };

export function Triangle({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent shape-corner yellow-line ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      {...props}
    >
      <polygon points="12,2 22,20 2,20" />
    </svg>
  );
}

export function Crosshair({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent shape-corner red-line ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <line x1="12" y1="0" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="24" />
      <line x1="0" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="24" y2="12" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Same registration mark, no center dot — the gap is widened slightly
// (vs. Crosshair's) since there's no circle to visually anchor the
// middle anymore.
export function CrosshairOpen({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent shape-corner red-line ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <line x1="12" y1="0" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="24" />
      <line x1="0" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="24" y2="12" />
    </svg>
  );
}

export function HalfCircle({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent shape-corner yellow-line ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 24 12"
      width="26"
      height="13"
      aria-hidden="true"
      {...props}
    >
      <path d="M2,12 A10,10 0 0 1 22,12" />
    </svg>
  );
}

// Vertical half-circle, open on the right — reads as a hollow "C".
// Inline variant (no shape-corner) since it sits beside a label, not
// pinned to a section corner. Deliberately smaller but thicker-stroked
// than the other outline shapes (see .yellow-line.thick in reveal.css).
export function HalfCircleC({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent yellow-line thick ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 13 24"
      width="9"
      height="16.2"
      aria-hidden="true"
      {...props}
    >
      <path d="M11,2 A10,10 0 0 0 11,22" />
    </svg>
  );
}

export function Square({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent shape-corner yellow-fill ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      {...props}
    >
      <rect x="0" y="0" width="16" height="16" />
    </svg>
  );
}

export function Trapezoid({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent shape-corner yellow-line ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 30 18"
      width="30"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <polygon points="8,0 22,0 30,18 0,18" />
    </svg>
  );
}

export function Circle({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent shape-corner yellow-line ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 20 20"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <circle cx="10" cy="10" r="8.5" />
    </svg>
  );
}

// Inline variant — sits in normal flow next to a label, not corner-pinned.
export function Parallelogram({ className, ...props }: ShapeProps) {
  return (
    <svg
      className={`shape-accent yellow-fill ${className ?? ""}`}
      data-reveal="shape"
      viewBox="0 0 26 16"
      width="18"
      height="11"
      aria-hidden="true"
      {...props}
    >
      <polygon points="6,0 26,0 20,16 0,16" />
    </svg>
  );
}
