import type { Metadata } from "next";
import Link from "next/link";
import { FieldHeader } from "@/components/field/field-header";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Hoverable } from "@/components/reveal/hoverable";
import { Button } from "@/components/ui/button";
import { Square } from "@/components/field/shapes";

export const metadata: Metadata = {
  title: "About — Derik Schneider",
  description:
    "Designer who writes production code, engineer who paints his own assets — 25 years working the seam between design and development.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-4 px-6 py-16">
      <FieldHeader eyebrow="About //" title="Who I am" />

      <RevealGroup className="relative flex max-w-[90ch] flex-col gap-5 text-lg leading-relaxed text-fg-80">
        <Square className="top-1 right-0" />
        <p data-reveal="text">
          I&apos;m a designer who writes production code and an engineer who
          paints his own assets. For 25 years I&apos;ve worked the seam
          between design and development, which means teams stop losing
          things in translation when I&apos;m in the room.
        </p>
        {/* Not chunk-reveal-wrapped: contains a nested styled span (the
            patent callout) that a text-reveal wrap would flatten. */}
        <p>
          I&apos;ve shipped UI for Mortal Kombat (2011), Injustice: Gods
          Among Us, Saints Row 2, and Red Faction: Armageddon. I architected
          the Aurora design system from scratch at Novant Health, coaching
          the design team on responsive HTML/CSS and accessibility while
          partnering with engineering on tokens, grids, and components.
          Earlier, as part of the core platform team building Bonsai at
          Nutrien Ag Solutions, I authored the system&apos;s initial
          documentation, contributed to component development, and
          championed its adoption across other design teams. I hold{" "}
          <span className="font-mono text-base text-primary">
            US Patent 10,002,393
          </span>{" "}
          for a customer experience insights tool I designed and helped
          engineer at State Farm.
        </p>
        <p data-reveal="text">
          Most recently at Capital One, I led design for the Action agent
          servicing platform, migrated the team&apos;s design system from
          Sketch to Figma, and produced narrative presentations on our agent
          servicing and IVR/messaging systems — editing call-recording
          audio, hand-animating sequences in After Effects, and building the
          layouts in Figma, working directly with senior product managers
          and directors to shape how they told their stories. I then moved
          into a Principal Product Owner role, where I built a 101-case
          automated testing suite, validated production migration events,
          and coordinated data integrity work across engineering teams.
        </p>
        <p data-reveal="text">
          The technical side of my toolkit: React, Redux, JavaScript,
          HTML/CSS, Lua, REST APIs, MySQL, Figma, and enough systems
          thinking to have designed asset pipelines that other studios&apos;
          teams adopted.
        </p>
        <div className="hairline" data-reveal="line" />
        <p data-reveal="text" className="pt-1 text-2xl text-fg-75 italic">
          What I&apos;m looking for: roles where the design-to-code gap is
          the real problem to solve. Design systems, UX engineering,
          technical product design, game UI. If that sounds like your team,
          let&apos;s talk.
        </p>
        <div className="pt-3">
          <Hoverable>
            <Button asChild size="lg">
              <Link href="/contact">
                <span data-reveal="text" data-reveal-size="fine">
                  Get in touch
                </span>
              </Link>
            </Button>
          </Hoverable>
        </div>
      </RevealGroup>
    </div>
  );
}
