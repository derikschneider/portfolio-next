import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaseStudyRow } from "@/components/case-study-row";
import { LogList } from "@/components/field/log-list";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Hoverable } from "@/components/reveal/hoverable";
import { Triangle, CrosshairOpen, HalfCircle, HalfCircleC, Square, Parallelogram } from "@/components/field/shapes";
import { getCaseStudies } from "@/lib/contentful";

export const revalidate = 3600;

const stack = ["Next.js", "TypeScript", "Tailwind", "Contentful", "AWS Amplify", "GitHub Actions"];

// Real, verifiable numbers pulled from this site's own data.
//
// "UI systems shipped" is deliberately broader than "design systems" — the
// count of 5 covers all three kinds of system Derik has actually shipped,
// which the narrower label was undercounting at 2:
//   1. Aurora (Novant Health) — design system built from scratch
//   2. Bonsai (Nutrien Ag Solutions) — core platform team
//   3. Action Platform (Discover → Capital One) — legacy Sketch system
//      rebuilt as a modern Figma component library
//   4. NetherRealm game UI — Mortal Kombat (2011), Injustice
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
      <RevealGroup immediate className="relative mx-auto w-full max-w-[1180px] px-6 pt-16 pb-14 md:pt-28 md:pb-20">
        <Triangle className="top-1 right-0" />
        <CrosshairOpen className="bottom-2 left-1" />

        <p data-reveal="text" className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">
          Internal move — Lead Full Stack Engineer
        </p>

        <h1 className="mt-6 font-display text-6xl leading-[0.92] font-black tracking-[-0.02em] text-foreground uppercase sm:text-7xl lg:text-8xl">
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
              className="border-b border-transparent pb-0.5 font-mono text-xs tracking-widest text-fg-50 uppercase hover:border-fg-50 hover:text-foreground"
            >
              <span data-reveal="text" data-reveal-size="fine">
                Resume →
              </span>
            </Link>
          </Hoverable>
        </div>
      </RevealGroup>

      <RevealGroup className="relative">
        <div className="hairline" data-reveal="line" />
        <HalfCircle className="top-[-1px] left-[28%]" />
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 md:grid-cols-4">
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
        <RevealGroup>
          <p className="mb-2 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-fg-50 uppercase">
            <HalfCircleC />
            Selected work //
          </p>
        </RevealGroup>
        <LogList
          items={featured}
          keyFn={(cs) => cs.slug}
          renderItem={(cs) => <CaseStudyRow cs={cs} />}
        />
        <div className="mt-10">
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
      </section>
    </div>
  );
}
