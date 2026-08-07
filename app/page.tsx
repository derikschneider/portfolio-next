import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaseStudyRow } from "@/components/case-study-row";
import { LogList } from "@/components/field/log-list";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Hoverable } from "@/components/reveal/hoverable";
import { Triangle, HalfCircle, HalfCircleC, Square, Parallelogram } from "@/components/field/shapes";
import { getCaseStudies } from "@/lib/contentful";
import { SITE_FACTS } from "@/lib/site-facts";
import { Hero3D } from "@/components/hero-3d";
import { experience } from "@/lib/experience";

const LINKEDIN_URL = "https://www.linkedin.com/in/derikschneider/";

// Ledger entry number, e.g. "01" — 28% --primary, the color/weight/size the
// whole five-entry section below is keyed off (see IMPLEMENTATION.md step 1).
function LedgerNumber({ n }: { n: string }) {
  return (
    <span
      aria-hidden="true"
      className="font-display text-[56px] leading-[0.9] font-black tracking-[-0.03em] text-primary/30"
    >
      {n}
    </span>
  );
}

// Reduced-scale ledger entry for the Resume/Contact half-section pair
// (IMPLEMENTATION.md step 1, entries 04/05). No hover background inversion
// here (unlike the case-study rows) — at half-section size a full gold fill
// is too much area. The whole half is still one hover target: `Hoverable`
// wraps the single root div, so blink/scramble on the h2 and looping
// scramble on the paragraph fire together no matter where inside it the
// pointer enters.
function HalfEntry({
  n,
  eyebrow,
  title,
  paragraph,
  facts,
  primary,
  secondary,
  side,
}: {
  n: string;
  eyebrow: string;
  title: string;
  paragraph: string;
  facts: string[];
  primary: ReactNode;
  secondary: ReactNode;
  side: "left" | "right";
}) {
  return (
    <div className={`bg-background py-12 ${side === "left" ? "pr-10" : "pl-10"}`}>
      <Hoverable scrambleOnceSelector="h2" blinkSelector="h2" scrambleSelector="p">
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[96px_1fr]">
          <LedgerNumber n={n} />
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">
              <span data-reveal="text" data-reveal-size="fine">
                {eyebrow}
              </span>
            </p>
            <h2
              data-reveal="text"
              data-reveal-size="fine"
              className="font-display text-[32px] leading-[1.06] font-black tracking-[-0.02em] text-foreground"
            >
              {title}
            </h2>
            <p data-reveal="text" className="max-w-[42ch] text-[15.5px] leading-relaxed text-fg-80">
              {paragraph}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] tracking-[0.08em] text-fg-50 uppercase">
              {facts.map((fact) => (
                <span key={fact} data-reveal="text" data-reveal-size="fine">
                  {fact}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-5 pt-1">
              {primary}
              {secondary}
            </div>
          </div>
        </div>
      </Hoverable>
    </div>
  );
}

export const revalidate = 3600;

const stack = ["Next.js", "TypeScript", "Tailwind", "Contentful", "AWS Amplify", "GitHub Actions"];

// Real, verifiable numbers pulled from this site's own data.
//
// "UI systems shipped" is deliberately broader than "design systems" — the
// count of 5 covers all three kinds of system Derik has actually shipped,
// which the narrower label was undercounting at 2:
//   1. Aurora (Novant Health) — an inherited first-pass system rebuilt as
//      true Figma components on re-architected foundations
//   2. Bonsai (Nutrien Ag Solutions) — co-led inception and architecture on
//      the core platform team, and built the system's documentation site
//   3. Action Platform (Discover → Capital One) — legacy Sketch system
//      rebuilt as a modern Figma component library
// 1 and 3 are genuinely separate rebuilds, two employers apart, and the
// copy on each keeps them distinct: Aurora's efficiency claim is a
// design-side win (assembling a page in Figma), Action Platform's is a
// dev-pipeline one (wiring the system into the build).
//   4. Netherrealm game UI — Mortal Kombat (2011), Injustice
//   5. Volition game UI — Saints Row 2, Red Faction: Armageddon
// Game UI systems count here because they define a title's branding and
// interface system wholesale, not just individual screens.
const stats = [
  { value: "25+", label: "Years building" },
  { value: "5", label: "UI systems shipped" },
  { value: "5", label: "Shipped game titles" },
  { value: "1", label: "US patent" },
];

export default async function Home() {
  const caseStudies = await getCaseStudies();
  const featured = caseStudies.slice(0, 3);

  return (
    <div className="flex flex-1 flex-col">
      <RevealGroup
        immediate
        className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-x-14 px-6 pt-16 pb-14 md:pt-28 md:pb-20 lg:grid-cols-[1fr_420px]"
      >
        <Triangle className="top-1 right-0" />

        <div>
          <p data-reveal="text" className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">
            Internal move — Lead Full Stack Engineer
          </p>

          <h1 className="mt-6 font-display text-6xl leading-[0.92] font-black tracking-[-0.02em] text-foreground uppercase sm:text-7xl lg:text-[88px]">
            <span data-reveal="text" data-reveal-size="fine">
              Derik
            </span>
            <br />
            <span data-reveal="text" data-reveal-size="fine">
              Schneider
            </span>
            <span className="cursor" aria-hidden="true" />
          </h1>

          <p data-reveal="text" className="mt-6 max-w-[46ch] text-lg leading-relaxed text-fg-80">
            Principal Product Owner, Action Platform UI at Capital One. This
            site is a work sample built specifically for the Lead Full Stack
            Engineer posting — every piece of the stack below is real, running
            in production on this domain.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Hoverable>
              <Button asChild size="lg">
                <Link href="/work">
                  <span data-reveal="text" data-reveal-size="fine">
                    See the work
                  </span>
                </Link>
              </Button>
            </Hoverable>
            <Hoverable>
              <Link
                href="/resume"
                className="cursor-pointer border-b border-transparent pb-0.5 font-mono text-xs tracking-widest text-fg-50 uppercase hover:border-fg-50 hover:text-foreground"
              >
                <span data-reveal="text" data-reveal-size="fine">
                  Resume →
                </span>
              </Link>
            </Hoverable>
          </div>
        </div>

        <Hero3D />
      </RevealGroup>

      <RevealGroup className="relative">
        <div className="hairline" data-reveal="line" />
        <div className="relative mx-auto grid max-w-[1180px] grid-cols-2 md:grid-cols-4">
          {/* Inside the stats grid (which is the positioning context) rather
              than a sibling of it, so the mark tracks the grid's own edges.
              Positioned by inline style only — no utility classes. `top` is
              deliberately unset: with it auto, the absolutely positioned mark
              falls at the grid's content-box top, i.e. right on the hairline
              above. */}
          <HalfCircle style={{ left: "66%" }} />
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={[
                "py-7",
                // Edge cells (mobile: alternating columns; desktop: only the
                // very first/last of the single row) get pl-6/pr-6 to match
                // every other section's 24px gutter exactly. Interior column
                // padding stays px-4 (16px) around the divider borders — a
                // flat px-4 everywhere would either overshoot the outer edge
                // (stacked on top of a container-level px-6) or undershoot it
                // (16px instead of 24px), both of which read as misaligned
                // against the hero/stack/work sections.
                i % 2 === 0 ? "pl-6 pr-4" : "pl-4 pr-6",
                i === 0 ? "md:pl-6 md:pr-4" : i === stats.length - 1 ? "md:pl-4 md:pr-6" : "md:px-4",
                "md:border-l md:border-border",
                i === 0 ? "md:border-l-0" : "",
                i % 2 === 1 ? "border-l border-border" : "",
                i >= 2 ? "border-t border-border md:border-t-0" : "",
              ].join(" ")}
            >
              <div className="font-display text-3xl leading-none font-extrabold tracking-[-0.01em] tabular-nums text-foreground">
                <span data-reveal="text" data-reveal-size="fine">
                  {value}
                </span>
              </div>
              <div className="mt-2 font-mono text-[10.5px] tracking-[0.08em] text-fg-50 uppercase">
                <span data-reveal="text" data-reveal-size="fine">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* bottom-[1px], not bottom-0: the hairline below is itself 1px tall,
            so a single pixel up still leaves the line cutting through the
            square's bottom edge. 1px sets the square flush on top of the
            line — measured 0px overlap. */}
        <Square className="right-[4%] bottom-[1px]" />
        <div className="hairline" data-reveal="line" />
      </RevealGroup>

      <RevealGroup className="mx-auto w-full max-w-[1180px] px-6 py-14">
        <p className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-fg-50 uppercase">
          <Parallelogram />
          <span data-reveal="text" data-reveal-size="fine">
            Stack //
          </span>
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <Badge key={item} variant="outline" data-reveal="text" data-reveal-size="fine">
              {item}
            </Badge>
          ))}
        </div>
      </RevealGroup>

      <section className="mx-auto w-full max-w-[1180px] px-6 pt-4 pb-20">
        <div className="hairline" data-reveal="line" />

        {/* Entry 01 — Selected work. */}
        <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-3 py-14 sm:grid-cols-[96px_1fr]">
          <LedgerNumber n="01" />
          <div className="flex flex-col gap-6">
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-fg-50 uppercase">
              <HalfCircleC />
              <span data-reveal="text" data-reveal-size="fine">
                Selected work //
              </span>
            </p>
            <h2
              data-reveal="text"
              data-reveal-size="fine"
              className="font-display text-[40px] leading-[1.05] font-black tracking-[-0.02em] text-foreground"
            >
              Six case studies, three studios, one patent
            </h2>
            <p data-reveal="text" className="max-w-[60ch] text-fg-80">
              Design systems, shipped game UI, and a patented approach to CX
              tooling, drawn from a career that runs from console game
              studios to enterprise fintech. The three below are a starting
              point, not the whole set.
            </p>
            <LogList
              items={featured}
              keyFn={(cs) => cs.slug}
              renderItem={(cs) => <CaseStudyRow cs={cs} />}
            />
            <div className="mt-4">
              <Hoverable>
                <Button asChild size="lg">
                  <Link href="/work">
                    <span data-reveal="text" data-reveal-size="fine">
                      See all 6
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              </Hoverable>
            </div>
          </div>
        </RevealGroup>

        <div className="hairline" data-reveal="line" />

        {/* Entry 02 — About. */}
        <RevealGroup className="grid grid-cols-1 gap-8 py-14 sm:grid-cols-[96px_1fr_300px]">
          <LedgerNumber n="02" />
          <div className="flex flex-col gap-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">
              <span data-reveal="text" data-reveal-size="fine">
                About //
              </span>
            </p>
            <h2
              data-reveal="text"
              data-reveal-size="fine"
              className="font-display text-[40px] leading-[1.05] font-black tracking-[-0.02em] text-foreground"
            >
              A designer who codes, an engineer who paints his own assets
            </h2>
            <p data-reveal="text" className="max-w-[56ch] text-fg-80">
              Twenty-five years across game studios, agtech, healthcare, and
              fintech, moving between design and front-end code depending on
              what a team needed. This site is built the same way: designed
              and shipped by one person, end to end.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" data-reveal="text" data-reveal-size="fine">
                Design systems
              </Badge>
              <Badge variant="outline" data-reveal="text" data-reveal-size="fine">
                Front-end engineering
              </Badge>
              <Badge variant="outline" data-reveal="text" data-reveal-size="fine">
                Game UI
              </Badge>
            </div>
            <Hoverable>
              <Link
                href="/about"
                className="w-fit cursor-pointer border-b border-transparent pb-0.5 font-mono text-xs tracking-widest text-fg-50 uppercase hover:border-fg-50 hover:text-foreground"
              >
                <span data-reveal="text" data-reveal-size="fine">
                  Read the long version →
                </span>
              </Link>
            </Hoverable>
          </div>
          <Link
            href="/about"
            data-preview
            className="relative aspect-[3/4] w-full max-w-[300px] cursor-pointer self-start border border-border"
          >
            <span data-preview-frame className="absolute inset-0 overflow-hidden">
              <Image
                src="/profile-pic.webp"
                alt="Derik Schneider"
                fill
                sizes="(min-width: 640px) 300px, 60vw"
                className="object-cover object-[center_20%] grayscale contrast-[1.08]"
              />
            </span>
          </Link>
        </RevealGroup>

        <div className="hairline" data-reveal="line" />

        {/* Entry 03 — This site. */}
        <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-3 py-14 sm:grid-cols-[96px_1fr]">
          <LedgerNumber n="03" />
          <div className="flex flex-col gap-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">
              <span data-reveal="text" data-reveal-size="fine">
                This site //
              </span>
            </p>
            <h2
              data-reveal="text"
              data-reveal-size="fine"
              className="font-display text-[40px] leading-[1.05] font-black tracking-[-0.02em] text-foreground"
            >
              The work sample is the website
            </h2>
            <p data-reveal="text" className="max-w-[62ch] text-fg-80">
              Every piece of the stack in the badges above is real and
              running in production right now, not a mockup of what it
              would look like. These three facts are how it actually works.
            </p>
            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
              {SITE_FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-2 bg-background p-6">
                  <span className="font-mono text-[10.5px] tracking-[0.08em] text-fg-50 uppercase">
                    <span data-reveal="text" data-reveal-size="fine">
                      {fact.label}
                    </span>
                  </span>
                  <span
                    data-reveal="text"
                    data-reveal-size="fine"
                    className="font-display text-lg font-bold text-primary"
                  >
                    {fact.value}
                  </span>
                  <p data-reveal="text" className="text-sm leading-relaxed text-fg-75">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealGroup>

        <div className="hairline" data-reveal="line" />

        {/* Entries 04/05 — Resume and Contact, side by side. */}
        <RevealGroup className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          <HalfEntry
            n="04"
            eyebrow="Resume //"
            title="Nineteen roles, back to 1999"
            paragraph="Every role from a Fortune 500 platform team back to a first job leading kiosk UX in 1999, with the flagship stops linking straight to the case studies above."
            facts={[`${experience.length} entries`, "PDF available"]}
            side="left"
            primary={
              <Hoverable>
                <Button asChild size="lg">
                  <Link href="/resume">
                    <span data-reveal="text" data-reveal-size="fine">
                      See full resume
                    </span>
                  </Link>
                </Button>
              </Hoverable>
            }
            secondary={
              <Hoverable>
                <a
                  href="/resume/derik_schneider_resume.pdf"
                  download
                  className="cursor-pointer border-b border-transparent pb-0.5 font-mono text-xs tracking-widest text-fg-50 uppercase hover:border-fg-50 hover:text-foreground"
                >
                  <span data-reveal="text" data-reveal-size="fine">
                    Download PDF ↓
                  </span>
                </a>
              </Hoverable>
            }
          />
          <HalfEntry
            n="05"
            eyebrow="Contact //"
            title="Say something"
            paragraph="The form on the other end sends real email through AWS SES: no third-party widget, no mailto link, no inbox I forget to check."
            facts={["POST /api/contact", "Reply within a day"]}
            side="right"
            primary={
              <Hoverable>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    <span data-reveal="text" data-reveal-size="fine">
                      Get in touch
                    </span>
                  </Link>
                </Button>
              </Hoverable>
            }
            secondary={
              <Hoverable>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer border-b border-transparent pb-0.5 font-mono text-xs tracking-widest text-fg-50 uppercase hover:border-fg-50 hover:text-foreground"
                >
                  <span data-reveal="text" data-reveal-size="fine">
                    LinkedIn →
                  </span>
                </a>
              </Hoverable>
            }
          />
        </RevealGroup>

        <div className="hairline" data-reveal="line" />
      </section>
    </div>
  );
}
