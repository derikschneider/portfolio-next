"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { cn } from "@/lib/utils";
import { CrosshairCloseIcon } from "@/components/field/crosshair-close-icon";
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
        className="flex size-9 cursor-pointer items-center justify-center min-[540px]:hidden"
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
              className="group flex size-10 cursor-pointer items-center justify-center text-accent-red transition-colors hover:text-primary"
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
                    "block w-full cursor-pointer py-4 text-center font-mono text-sm tracking-[0.14em] uppercase transition-colors",
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
