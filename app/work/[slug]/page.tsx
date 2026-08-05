import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GameUIGalleries } from "@/components/game-ui-galleries";
import { CaseStudyHighlights } from "@/components/case-study-highlights";
import { CASE_STUDY_HIGHLIGHTS } from "@/lib/case-study-highlights";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Hoverable } from "@/components/reveal/hoverable";
import { Triangle, HalfCircle } from "@/components/field/shapes";
import { FieldDivider } from "@/components/field/field-divider";
import { getCaseStudies, getCaseStudy } from "@/lib/contentful";

export const revalidate = 3600;

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Derik Schneider`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cs, allCaseStudies] = await Promise.all([getCaseStudy(slug), getCaseStudies()]);
  if (!cs) notFound();

  const highlights = CASE_STUDY_HIGHLIGHTS[slug];

  const currentIndex = allCaseStudies.findIndex((c) => c.slug === slug);
  const hasSiblings = allCaseStudies.length > 1 && currentIndex !== -1;
  const prev = hasSiblings
    ? allCaseStudies[(currentIndex - 1 + allCaseStudies.length) % allCaseStudies.length]
    : undefined;
  const next = hasSiblings
    ? allCaseStudies[(currentIndex + 1) % allCaseStudies.length]
    : undefined;

  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-10 px-6 py-16">
      <RevealGroup immediate className="relative flex flex-col gap-8">
        <Triangle className="top-0 right-0" />
        <Hoverable>
          <Link
            href="/work"
            className="flex w-fit items-center gap-1.5 font-mono text-sm tracking-wide text-fg-50 uppercase hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            <span data-reveal="text" data-reveal-size="fine">
              All work
            </span>
          </Link>
        </Hoverable>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase">
            <span data-reveal="text" data-reveal-size="fine" className="text-primary">
              {cs.company}
            </span>
            <span aria-hidden="true" className="text-fg-50">
              ·
            </span>
            <span data-reveal="text" data-reveal-size="fine" className="text-fg-50">
              {cs.role}
            </span>
          </div>
          <h1
            data-reveal="text"
            data-reveal-size="fine"
            className="font-display text-3xl leading-tight font-black tracking-[-0.02em] text-foreground sm:text-4xl"
          >
            {cs.title}
          </h1>
          <p data-reveal="text" data-reveal-size="fine" className="font-mono text-[11px] tracking-[0.06em] text-fg-50">
            {cs.period}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {cs.stack.map((s) => (
              <Badge key={s} variant="outline" data-reveal="text" data-reveal-size="fine">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <FieldDivider />
      </RevealGroup>

      {cs.galleries && cs.galleries.length > 0 ? (
        <GameUIGalleries galleries={cs.galleries} />
      ) : (
        cs.hasVisuals && (
          <div className="rounded-md border border-dashed border-border p-8 text-center font-mono text-sm text-muted-foreground">
            Screenshots pending — placeholder for shipped game UI captures.
          </div>
        )
      )}

      {highlights && highlights.length > 0 && (
        <CaseStudyHighlights highlights={highlights} />
      )}

      <RevealGroup className="flex max-w-[85ch] flex-col gap-4">
        {cs.body.map((paragraph, i) => {
          const isTodo = paragraph.startsWith("TODO");
          return isTodo ? (
            <p
              key={i}
              className="rounded-md border border-dashed border-border bg-muted/50 p-3 font-mono text-sm text-muted-foreground"
            >
              {paragraph}
            </p>
          ) : (
            <p key={i} data-reveal="text" className="leading-relaxed text-fg-80">
              {paragraph}
            </p>
          );
        })}
      </RevealGroup>

      {cs.patentRef && (
        <p className="flex flex-wrap items-center gap-3 font-mono text-sm text-fg-60">
          {cs.patentRef.url ? (
            <a
              href={cs.patentRef.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-foreground"
            >
              {cs.patentRef.label}
            </a>
          ) : (
            cs.patentRef.label
          )}
          {cs.patentRef.pdfPath && (
            <>
              <span aria-hidden>&middot;</span>
              <a
                href={cs.patentRef.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-foreground"
              >
                View PDF
              </a>
            </>
          )}
        </p>
      )}

      {prev && next && (
        <RevealGroup className="relative">
          <HalfCircle className="-top-2 left-1/2 -translate-x-1/2" />
          <div className="hairline mb-8" data-reveal="line" />
          <nav aria-label="More case studies" className="flex items-stretch justify-between gap-4">
            {/* The direction label blinks and scrambles once; the destination
                title scrambles and keeps cycling. Selectors are explicit
                because a bare <Hoverable> targets only the first
                [data-reveal="text"], which would leave the title inert. */}
            <Hoverable
              blinkSelector='[data-slot="cs-dir"]'
              scrambleOnceSelector='[data-slot="cs-dir"]'
              scrambleSelector='[data-slot="cs-name"]'
            >
              <Link
                href={`/work/${prev.slug}`}
                className="group flex flex-1 flex-col items-start gap-1.5 py-2 transition-colors"
              >
                <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-fg-50 uppercase group-hover:text-primary">
                  <ArrowLeft className="size-4" />
                  <span data-slot="cs-dir" data-reveal="text" data-reveal-size="fine">
                    Previous
                  </span>
                </span>
                <span
                  data-slot="cs-name"
                  data-reveal="text"
                  data-reveal-size="fine"
                  className="text-foreground"
                >
                  {prev.company}
                </span>
              </Link>
            </Hoverable>
            <Hoverable
              blinkSelector='[data-slot="cs-dir"]'
              scrambleOnceSelector='[data-slot="cs-dir"]'
              scrambleSelector='[data-slot="cs-name"]'
            >
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-1 flex-col items-end gap-1.5 py-2 text-right transition-colors"
              >
                <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-fg-50 uppercase group-hover:text-primary">
                  <span data-slot="cs-dir" data-reveal="text" data-reveal-size="fine">
                    Next
                  </span>
                  <ArrowRight className="size-4" />
                </span>
                <span
                  data-slot="cs-name"
                  data-reveal="text"
                  data-reveal-size="fine"
                  className="text-foreground"
                >
                  {next.company}
                </span>
              </Link>
            </Hoverable>
          </nav>
        </RevealGroup>
      )}
    </div>
  );
}
