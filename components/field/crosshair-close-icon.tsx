/**
 * Close "X" in the same registration-mark language as the field/shapes
 * crosshairs — a plain interactive icon (no reveal wiring), rotated 45deg so
 * the crosshair reads as an X rather than a "+".
 *
 * Shared by the mobile nav panel and the gallery lightbox so the two close
 * affordances stay identical; it lived inline in mobile-nav.tsx until the
 * lightbox needed it too (2026-08-05).
 */
export function CrosshairCloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      className={`rotate-45 ${className}`}
    >
      <line x1="12" y1="1" x2="12" y2="9" stroke="currentColor" strokeWidth="1.8" />
      <line x1="12" y1="15" x2="12" y2="23" stroke="currentColor" strokeWidth="1.8" />
      <line x1="1" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.8" />
      <line x1="15" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
