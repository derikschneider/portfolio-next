"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { CrosshairOpen } from "@/components/field/shapes";
import { useHoverFx } from "@/components/reveal/use-hover-fx";
import { collectRevealItems, prefersReducedMotion, runRevealGroup } from "@/components/reveal/reveal-engine";

const links = [
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useHoverFx(ref);

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "cursor-pointer border-b pb-1 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:text-foreground",
        active ? "border-primary text-primary" : "border-transparent text-fg-50"
      )}
    >
      <span data-reveal="text" data-reveal-size="fine">
        {label}
      </span>
    </Link>
  );
}

// Only shown on child pages (never on home, where the huge hero name
// already carries the identity). Flickers in on arrival from home —
// including a fresh/direct load landing straight on a child page — but
// not when moving between child pages, since it never actually left.
// Independently controlled (not part of the header's own RevealGroup
// scan) so its timing is driven by navigation, not mount/scroll.
function Wordmark() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const ref = useRef<HTMLAnchorElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const prevPathnameRef = useRef(pathname);
  useHoverFx(ref, { enabled: !isHome });

  useEffect(() => {
    const isFirstRun = prevPathnameRef.current === pathname;
    const cameFromHome = prevPathnameRef.current === "/";
    prevPathnameRef.current = pathname;

    if (prefersReducedMotion()) return;

    // Coming back to home: the header never remounts on client-side
    // navigation, so its own immediate RevealGroup doesn't re-run and the
    // freshly-rendered mark would sit at .shape-accent's opacity: 0 forever.
    // Reveal it here instead. First run is skipped because a real page load
    // *does* mount the header, and that RevealGroup already covers it.
    if (isHome) {
      if (isFirstRun) return;
      const el = markRef.current;
      if (!el) return;
      document.documentElement.classList.add("reveal-ready");
      runRevealGroup(collectRevealItems(el));
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (isFirstRun || cameFromHome) {
      document.documentElement.classList.add("reveal-ready");
      runRevealGroup(collectRevealItems(el));
    }
  }, [pathname, isHome]);

  // On home the hero already carries the name, so the brand slot shows the
  // red registration mark instead of the wordmark. Moving to a child page
  // swaps the mark out for the wordmark (and back again on return).
  //
  // Wrapped in a span because collectRevealItems only queries descendants —
  // handed the <svg> directly it would find nothing to reveal.
  if (isHome) {
    return (
      <span ref={markRef} className="inline-flex">
        <CrosshairOpen inline aria-hidden="true" />
      </span>
    );
  }

  return (
    <Link
      ref={ref}
      href="/"
      className="inline-block cursor-pointer font-display text-[13px] font-bold tracking-[0.12em] text-foreground transition-colors hover:text-primary"
    >
      {/* Desktop variant first in DOM: the hover scramble/blink defaults
          to the first [data-reveal="text"] match, and hover only really
          applies on pointer devices anyway (where this is the visible
          one) — narrow/touch viewports showing "DS" below don't lose
          anything meaningful by not being the hover target. */}
      <span data-reveal="text" data-reveal-size="fine" className="hidden md:inline">
        DERIK SCHNEIDER
      </span>
      <span data-reveal="text" data-reveal-size="fine" className="md:hidden">
        DS
      </span>
    </Link>
  );
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] bg-background/90 backdrop-blur-md">
      <RevealGroup immediate className="relative h-full">
        <nav className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-6">
          <div>
            <Wordmark />
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-8 min-[540px]:flex">
              <ul className="flex items-center gap-8">
                {links.map((link) => (
                  <li key={link.href}>
                    <NavLink href={link.href} label={link.label} active={pathname.startsWith(link.href)} />
                  </li>
                ))}
              </ul>
              <ThemeToggle />
            </div>
            <MobileNav links={links} />
          </div>
        </nav>
        <div className="hairline absolute inset-x-0 bottom-0" data-reveal="line" />
      </RevealGroup>
    </header>
  );
}
