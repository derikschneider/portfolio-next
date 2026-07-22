"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ColorWheel } from "@/components/dev/color-wheel";
import { HSBFields } from "@/components/dev/hsb-fields";
import { hsbToHex, isLight, type HSB } from "@/lib/color";

const DEFAULT_LIGHT: HSB = { h: 45, s: 95, b: 73 };
const DEFAULT_DARK: HSB = { h: 45, s: 81, b: 76 };
const STORAGE_KEY = "color-lab-hsb";
const STYLE_ID = "color-lab-overrides";

function applyOverrides(light: HSB, dark: HSB) {
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  const lightFg = isLight(hsbToHex(light)) ? "#16161a" : "#f7f7f5";
  const darkFg = isLight(hsbToHex(dark)) ? "#0b0b0e" : "#eeedf4";
  styleEl.textContent = `
    :root {
      --primary-h: ${light.h}; --primary-s: ${light.s}; --primary-b: ${light.b};
      --primary-foreground: ${lightFg};
    }
    .dark {
      --primary-h: ${dark.h}; --primary-s: ${dark.s}; --primary-b: ${dark.b};
      --primary-foreground: ${darkFg};
    }
  `;
}

export function ColorLab() {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [light, setLight] = useState<HSB>(DEFAULT_LIGHT);
  const [dark, setDark] = useState<HSB>(DEFAULT_DARK);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { light?: HSB; dark?: HSB };
      if (parsed.light) setLight(parsed.light);
      if (parsed.dark) setDark(parsed.dark);
    } catch {
      // ignore malformed local storage value
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyOverrides(light, dark);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ light, dark }));
  }, [light, dark, mounted]);

  if (!mounted) return null;

  // Hue is locked across both themes — changing it in either panel updates both.
  function changeLight(partial: Partial<HSB>) {
    setLight((prev) => ({ ...prev, ...partial }));
    if (partial.h !== undefined) setDark((prev) => ({ ...prev, h: partial.h! }));
  }
  function changeDark(partial: Partial<HSB>) {
    setDark((prev) => ({ ...prev, ...partial }));
    if (partial.h !== undefined) setLight((prev) => ({ ...prev, h: partial.h! }));
  }

  return (
    <div className="fixed right-4 bottom-4 z-[100] font-mono text-xs">
      {open ? (
        <div className="w-[360px] rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="tracking-widest text-foreground/50 uppercase">
              Color Lab · dev only
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-foreground/50 hover:text-foreground"
              aria-label="Close color lab"
            >
              ✕
            </button>
          </div>
          <p className="mb-3 text-[10px] text-foreground/35">
            Hue is locked between themes — drag either wheel&apos;s ring or
            the H slider and both update. Saturation/brightness stay
            independent.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-foreground/50">Light</span>
              <ColorWheel value={light} onChange={changeLight} />
              <HSBFields value={light} onChange={changeLight} />
              <span>{hsbToHex(light)}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-foreground/50">Dark</span>
              <ColorWheel value={dark} onChange={changeDark} />
              <HSBFields value={dark} onChange={changeDark} />
              <span>{hsbToHex(dark)}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setLight(DEFAULT_LIGHT);
              setDark(DEFAULT_DARK);
            }}
            className="mt-3 w-full rounded-sm border border-border py-1 text-foreground/60 hover:text-foreground"
          >
            Reset to defaults
          </button>
          <p className="mt-2 text-[10px] text-foreground/35">
            Viewing: {resolvedTheme}. Values persist in this browser only —
            read the H/S/B numbers out and tell Claude when you land on
            something, so they can go into globals.css by hand.
          </p>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex size-10 items-center justify-center rounded-full border border-border bg-popover text-base shadow-lg"
          aria-label="Open color lab"
        >
          🎨
        </button>
      )}
    </div>
  );
}
