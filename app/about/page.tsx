import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FieldHeader } from "@/components/field/field-header";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Hoverable } from "@/components/reveal/hoverable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Parallelogram } from "@/components/field/shapes";

export const metadata: Metadata = {
  title: "About — Derik Schneider",
  description:
    "Designer who writes production code, engineer who paints his own assets — 25 years working the seam between design and development.",
};

// Set to false to drop the portrait entirely. The banner collapses to a
// single full-width cell when it's off, so the lede and tags still read as a
// deliberate block rather than a half-empty box.
const SHOW_PORTRAIT = true;

const TAGS = ["Design systems", "UX engineering", "Game UI"];

// Sourced from the resume (content/source/resume-audit-2026-08-05.md flagged
// these as the one thing the resume carried that the site didn't). Kept as a
// standalone block rather than folded into the toolkit sentence: those are
// tools, these are credentials, and a run-on list ending "...MySQL, Figma,
// and also I'm certified" reads as an afterthought.
const CERTIFICATIONS = [
  {
    name: "UX Certification, Specialty in Interaction Design",
    issuer: "Nielsen Norman Group · 2020",
  },
  { name: "Product Marketing Certificate", issuer: "eCornell" },
];

/**
 * Layout is option 1b from the "About Body Layouts" Claude Design study
 * ("Banner crop — wide photo + lede, then two text columns"), translated to
 * this project's tokens rather than transcribed: the study's own palette
 * (#f2c14b gold, #07091a ground) and Outfit type are stand-ins for what the
 * real site already has, so everything below resolves through `--primary`,
 * `border-border`, the `text-fg-NN` ramp, and the existing Badge/Button.
 *
 * The study also tightened the copy to fit the shape — the lede loses its
 * "teams stop losing things in translation" clause, the Discover paragraph
 * loses "working directly with senior product managers and directors," and
 * the closing line drops its list of disciplines (the tags above carry that
 * now). Kept as designed.
 *
 * Two corrections layered on top of the study's copy (2026-08-05, from
 * Derik + a storytelling audit of the whole site):
 *   1. Aurora was NOT architected "from scratch" — he inherited a poor
 *      first-pass port and rebuilt it. Same framing as the case study.
 *   2. The Sketch-to-Figma migration and the Action design leadership
 *      happened at DISCOVER, not Capital One. The site's own case study
 *      and resume have always split the two employers correctly; this page
 *      inherited the collapsed "Most recently at Capital One..." framing
 *      from Derik's LinkedIn About section, which content/source flagged as
 *      inaccurate back in July and nobody had fixed here.
 */
export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-4 px-6 py-16">
      <FieldHeader eyebrow="About //" title="Who I am" />

      <RevealGroup className="flex flex-col gap-12">
        <div
          className={`grid overflow-hidden rounded-md border border-border ${
            SHOW_PORTRAIT ? "md:min-h-80 md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          <div className="flex flex-col justify-between gap-7 p-8 sm:p-11">
            <p
              data-reveal="text"
              className="text-2xl leading-[1.45] text-foreground"
            >
              I&apos;m a designer who writes production code and an engineer
              who paints his own assets. For 25 years I&apos;ve worked the seam
              between design and development.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  data-reveal="text"
                  data-reveal-size="fine"
                  className="uppercase"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {SHOW_PORTRAIT && (
            // `fill` needs a sized parent: on mobile that's the explicit
            // h-72, on desktop the stretched grid row, which the text cell
            // and the grid's own min-height between them always define.
            <div className="relative h-72 w-full md:h-full">
              <Image
                src="/profile-pic.webp"
                alt="Derik Schneider"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                // Framing, not a crop of convenience — centred vertically the
                // wide banner cuts the face off at the chin.
                className="object-cover object-[50%_30%]"
                priority
              />
            </div>
          )}
        </div>

        {/* Newspaper-style pair. `column-rule` has no Tailwind utility, so
            it goes through arbitrary-property syntax to stay on the token. */}
        <div className="columns-1 gap-14 [column-rule:1px_solid_var(--border)] md:columns-2">
          <p
            data-reveal="text"
            className="mb-5 text-base leading-[1.75] text-fg-80"
          >
            {/* VITA is last on purpose. It factually counts toward the five
                titles the rest of the site claims, but it was a small
                release nobody remembers — leading with it spends the
                reader's attention on the weakest item in the list. */}
            I&apos;ve shipped UI for Mortal Kombat (2011), Injustice: Gods
            Among Us, Saints Row 2, Red Faction: Armageddon, and Mortal
            Kombat VITA. At Novant Health I inherited Aurora as a first-pass
            design system — a previous design ported over, with none of the
            structure underneath it — and rebuilt it head to toe into true
            Figma components on re-architected foundations, taking page
            assembly from days to under an hour.
          </p>
          {/* Not chunk-reveal-wrapped: contains a nested styled span (the
              patent callout) that a text-reveal wrap would flatten. */}
          <p className="mb-5 text-base leading-[1.75] text-fg-80">
            Earlier, on Nutrien Ag Solutions&apos; core platform team, I
            co-led the inception and architecture of the Bonsai Design System
            and designed and built its documentation site myself — the
            front-end code, the responsive layout, and the navigation. I
            hold{" "}
            <span className="font-mono text-sm text-primary">
              US Patent 10,002,393
            </span>{" "}
            for a customer experience insights tool I designed and helped
            engineer at State Farm.
          </p>
          <p
            data-reveal="text"
            className="mb-5 text-base leading-[1.75] text-fg-80"
          >
            At Discover, I led design for the Action agent servicing platform,
            migrated the team&apos;s design system from Sketch to Figma, and
            produced narrative presentations on our agent servicing and
            IVR/messaging systems — editing call-recording audio,
            hand-animating sequences in After Effects, and building the
            layouts in Figma.
          </p>
          <p data-reveal="text" className="text-base leading-[1.75] text-fg-80">
            When Capital One acquired Discover the Action work came with it,
            and I moved into a Principal Product Owner role, where I built a
            101-case automated testing suite, validated production migration
            events, and coordinated data integrity work across engineering
            teams. Toolkit: React, Redux, JavaScript, HTML/CSS, Lua, REST APIs,
            MySQL, Figma, and enough systems thinking to have designed asset
            pipelines that other studios&apos; teams adopted.
          </p>
        </div>

        {/* Same eyebrow vocabulary as the Resume page's "Skill set //" block.
            Sits between the body and the CTA so the last thing before the ask
            is credentials, not a toolkit list. */}
        <div className="flex flex-col gap-5">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-fg-50 uppercase">
            <Parallelogram />
            <span data-reveal="text" data-reveal-size="fine">
              Certifications //
            </span>
          </p>
          <ul className="flex flex-col gap-3">
            {CERTIFICATIONS.map(({ name, issuer }) => (
              <li
                key={name}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3"
              >
                <span data-reveal="text" className="text-sm text-foreground">
                  {name}
                </span>
                <span
                  data-reveal="text"
                  data-reveal-size="fine"
                  className="font-mono text-[11px] tracking-[0.06em] text-fg-50 uppercase"
                >
                  {issuer}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-8 border-t border-border pt-10 md:flex-row md:items-center md:justify-between md:gap-12">
          <p
            data-reveal="text"
            className="max-w-[760px] text-xl leading-[1.55] text-fg-75 italic"
          >
            What I&apos;m looking for: roles where the design-to-code gap is
            the real problem to solve. If that sounds like your team,
            let&apos;s talk.
          </p>
          <Hoverable>
            <Button asChild size="lg" className="w-fit shrink-0">
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
