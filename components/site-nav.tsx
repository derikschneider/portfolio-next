"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-full max-w-4xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-mono text-base font-medium tracking-wide text-primary"
        >
          DS
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "border-b pb-1 font-mono text-sm tracking-widest uppercase transition-colors hover:text-foreground",
                      active
                        ? "border-primary text-primary"
                        : "border-transparent text-fg-50"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
