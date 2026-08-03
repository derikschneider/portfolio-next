"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

function HamburgerIcon() {
  return (
    <span className="flex w-5 flex-col items-stretch gap-[5px]" aria-hidden="true">
      <span className="h-px bg-foreground" />
      <span className="h-px bg-foreground" />
      <span className="h-px bg-foreground" />
    </span>
  );
}

// Same registration-mark language as the field/shapes crosshairs, but a
// plain interactive icon (no reveal wiring) — rotated 45deg so the
// crosshair reads as a close "X" rather than a "+".
function CrosshairCloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="rotate-45">
      <line x1="12" y1="1" x2="12" y2="9" stroke="currentColor" strokeWidth="1.8" />
      <line x1="12" y1="15" x2="12" y2="23" stroke="currentColor" strokeWidth="1.8" />
      <line x1="1" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.8" />
      <line x1="15" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on client-side navigation (Radix already handles Escape, outside
  // click, focus trap, and body scroll lock on its own).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="flex size-9 items-center justify-center min-[540px]:hidden"
      >
        <HamburgerIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[85vh] flex-col border-t border-border bg-background px-6 pt-4 pb-[max(2rem,env(safe-area-inset-bottom))] outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom data-[state=closed]:duration-200 data-[state=open]:duration-300"
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>
          <div className="flex justify-end pb-2">
            <Dialog.Close
              aria-label="Close menu"
              className="group flex size-10 items-center justify-center text-accent-red transition-colors hover:text-primary"
            >
              <CrosshairCloseIcon />
            </Dialog.Close>
          </div>
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-border first:border-t">
                <Link
                  href={link.href}
                  className={cn(
                    "block w-full py-4 text-center font-mono text-sm tracking-[0.14em] uppercase transition-colors",
                    pathname.startsWith(link.href) ? "text-primary" : "text-fg-50 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center py-6">
            <ThemeToggle />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
