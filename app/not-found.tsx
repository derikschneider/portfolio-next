import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FieldDivider } from "@/components/field/field-divider";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Hoverable } from "@/components/reveal/hoverable";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Page not found — Derik Schneider",
};

const destinations = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/about", label: "About" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-10 px-6 py-20">
      {/* Wrapped in RevealGroup, not left bare: the reveal engine is what
          rebuilds a `data-reveal="line"` into dashed segments and what clears
          `.shape-accent`'s opacity:0. Outside a group the hairlines render
          solid and the registration mark stays invisible. */}
      <RevealGroup immediate className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            404 //
          </span>
          <h1 className="font-display text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Page not found
          </h1>
          <p className="max-w-[60ch] text-lg leading-relaxed font-light text-fg-80">
            That page doesn&apos;t exist, or moved. Where would you like to go?
          </p>
        </div>

        {/* Section separators match the rest of the site's hairlines rather
            than a solid <Separator />. The registration mark rides the first
            one, as on every other page's title/content divider. */}
        <FieldDivider />

        <div className="flex flex-wrap gap-3">
          {destinations.map((d) => (
            <Hoverable key={d.href}>
              <Button asChild variant={d.href === "/" ? "default" : "outline"}>
                <Link href={d.href}>
                  <span data-reveal="text" data-reveal-size="fine">
                    {d.label}
                  </span>
                </Link>
              </Button>
            </Hoverable>
          ))}
        </div>

        <div className="hairline" data-reveal="line" />
      </RevealGroup>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Or
          </span>
          <h2 className="font-display text-2xl font-light tracking-tight text-foreground">
            Send a message
          </h2>
          <p className="max-w-[60ch] text-sm leading-relaxed text-fg-80">
            Looking for something specific, or just want to say hello — this goes straight to me.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
