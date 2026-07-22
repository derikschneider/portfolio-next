import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaseStudyRow } from "@/components/case-study-row";
import { caseStudies } from "@/lib/case-studies";

const stack = ["Next.js", "TypeScript", "Tailwind", "Contentful", "AWS Amplify", "GitHub Actions"];

// Real, verifiable numbers pulled from this site's own data — not the
// placeholder stats from the Figma Make concept this design was based on.
const stats = [
  { value: "25+", label: "Years building" },
  { value: "2", label: "Design systems shipped" },
  { value: "5", label: "Shipped game titles" },
  { value: "1", label: "US patent" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="grid min-h-[calc(100vh-60px)] border-b border-border md:grid-cols-2">
        {/* Left — identity */}
        <div className="flex flex-col justify-center gap-8 border-b border-border px-6 py-16 md:border-r md:border-b-0 md:px-14 md:py-24">
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Internal move — Lead Full Stack Engineer
          </span>

          <h1 className="font-display text-6xl leading-none font-light tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            Derik
            <br />
            <em className="text-foreground/60 italic">Schneider</em>
          </h1>

          <p className="max-w-[38ch] text-lg leading-relaxed font-light text-foreground/60">
            Principal Product Owner, Action Platform UI at Capital One. This
            site is a work sample built specifically for the Lead Full Stack
            Engineer posting — every piece of the stack below is real,
            running in production on this domain.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/work">See the work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/resume">Resume</Link>
            </Button>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-8">
            <span className="font-mono text-sm tracking-widest text-foreground/30 uppercase">
              Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right — decorative stat panel */}
        <div className="relative flex flex-col justify-end overflow-hidden bg-[#0d0d11] px-6 py-16 md:px-14 md:py-24">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(168,230,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,230,216,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18rem] leading-none font-light tracking-tighter text-primary/[0.04] select-none"
            aria-hidden
          >
            DS
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-px bg-border">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-[#0d0d11] p-6">
                <div className="font-display text-4xl leading-none font-light text-foreground">
                  {value}
                </div>
                <div className="mt-2 font-mono text-sm tracking-wide text-foreground/40 uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 flex items-baseline justify-between border-b border-border pb-6">
            <h2 className="font-display text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              Case studies
            </h2>
            <Link
              href="/work"
              className="font-mono text-sm tracking-widest text-foreground/30 uppercase hover:text-primary"
            >
              Selected work
            </Link>
          </div>
          <div className="flex flex-col">
            {caseStudies.map((cs, i) => (
              <CaseStudyRow
                key={cs.slug}
                cs={cs}
                index={i + 1}
                isLast={i === caseStudies.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
