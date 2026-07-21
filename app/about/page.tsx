import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Derik Schneider",
  description:
    "Designer who writes production code, engineer who paints his own assets — 25 years working the seam between design and development.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="flex flex-col gap-4 text-muted-foreground">
        <p>
          I&apos;m a designer who writes production code and an engineer who
          paints his own assets. For 25 years I&apos;ve worked the seam
          between design and development, which means teams stop losing
          things in translation when I&apos;m in the room.
        </p>
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
          <span className="text-foreground">US Patent 10,002,393</span> for
          a customer experience insights tool I designed and helped
          engineer at State Farm.
        </p>
        <p>
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
        <p>
          The technical side of my toolkit: React, Redux, JavaScript,
          HTML/CSS, Lua, REST APIs, MySQL, Figma, and enough systems
          thinking to have designed asset pipelines that other studios&apos;
          teams adopted.
        </p>
        <p className="text-foreground">
          What I&apos;m looking for: roles where the design-to-code gap is
          the real problem to solve. Design systems, UX engineering,
          technical product design, game UI. If that sounds like your team,
          let&apos;s talk.
        </p>
      </div>
    </div>
  );
}
