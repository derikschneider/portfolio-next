"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/components/reveal/reveal-engine";

// Derik supplies the real `.splinecode` URL and poster still once the scene
// is built. Until then this renders the dashed placeholder frame from the
// spec so the hero grid layout is testable at the real 420px column width.
const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;
const POSTER_URL = process.env.NEXT_PUBLIC_SPLINE_POSTER_URL;

const VIEWER_SCRIPT_SRC = "https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js";

declare module "react" {
  // TypeScript's ambient JSX.IntrinsicElements augmentation requires the namespace form.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
        loading?: string;
      };
    }
  }
}

/**
 * 420px hero mount for the Spline scene (IMPLEMENTATION.md step 2).
 *
 * Never blocks first paint: the poster <img> renders immediately and stays
 * mounted underneath; the `<spline-viewer>` custom element is only added
 * after its script fires `onLoad`, and only on `lg`+ viewports (no Spline on
 * mobile) with motion allowed (prefersReducedMotion() bails out entirely,
 * poster-only).
 */
export function HeroSpline() {
  const [shouldLoadViewer, setShouldLoadViewer] = useState(false);
  const [viewerScriptReady, setViewerScriptReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setShouldLoadViewer(true);
    }
  }, []);

  if (!SCENE_URL || !POSTER_URL) {
    return (
      <div
        aria-hidden="true"
        className="hidden aspect-square w-[420px] items-center justify-center border border-dashed border-border lg:flex"
      >
        <span className="font-mono text-[11px] tracking-[0.14em] text-fg-50 uppercase">
          Spline scene pending
        </span>
      </div>
    );
  }

  return (
    <div className="relative hidden aspect-square w-[420px] lg:block">
      {/* eslint-disable-next-line @next/next/no-img-element -- static poster
          still, not an optimized content image; swapped out for the live
          viewer once its script loads. */}
      <img
        src={POSTER_URL}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {shouldLoadViewer && (
        <>
          <Script src={VIEWER_SCRIPT_SRC} strategy="lazyOnload" type="module" onReady={() => setViewerScriptReady(true)} />
          {viewerScriptReady && (
            <spline-viewer url={SCENE_URL} loading="lazy" className="absolute inset-0 h-full w-full" />
          )}
        </>
      )}
    </div>
  );
}
