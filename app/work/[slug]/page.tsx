import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GameUIGalleries } from "@/components/game-ui-galleries";
import { CaseStudyHighlights } from "@/components/case-study-highlights";
import { CASE_STUDY_HIGHLIGHTS } from "@/lib/case-study-highlights";
import { CASE_STUDY_DOWNLOADS } from "@/lib/case-study-downloads";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Hoverable } from "@/components/reveal/hoverable";
import { Triangle, HalfCircle, HalfCircleC } from "@/components/field/shapes";
import { FieldDivider } from "@/components/field/field-divider";
import { CaseStudyNav } from "@/components/case-study-nav";
import { CaseStudyRail } from "@/components/case-study-rail";
import { shortenRole } from "@/lib/case-studies";
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
    title: `${cs.title}, Derik Schneider`,
    description: cs.summary,
  };
}

// A paragraph starting "## " renders as an h3 subhead, one starting "> " as
// a pull-quote — the "What I did" movement's simplest possible encoding
// (IMPLEMENTATION.md step 4f) so Contentful's plain Text field doesn't need
// a real rich-text/markdown model for two rare cases.
function ApproachParagraph({ paragraph }: { paragraph: string }) {
  if (paragraph.startsWith("## ")) {
    return (
      <h3 data-reveal="text" data-reveal-size="fine" className="font-bold text-[20px] text-primary">
        {paragraph.slice(3)}
      </h3>
    );
  }
  if (paragraph.startsWith("> ")) {
    return (
      <p
        data-reveal="text"
        className="border-l-2 border-primary pl-[22px] font-display text-[22px] leading-[1.4] font-medium text-foreground"
      >
        {paragraph.slice(2)}
      </p>
    );
  }
  return (
    <p data-reveal="text" className="text-[16.5px] leading-[1.75] text-fg-80">
      {paragraph}
    </p>
  );
}

function MovementLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-start gap-2 font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
      <HalfCircleC />
      <span data-reveal="text" data-reveal-size="fine">
        {n} {title}
      </span>
    </div>
  );
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
  const downloads = CASE_STUDY_DOWNLOADS[slug];

  const currentIndex = allCaseStudies.findIndex((c) => c.slug === slug);
  const total = allCaseStudies.length;
  const displayIndex = currentIndex + 1;
  const hasSiblings = total > 1 && currentIndex !== -1;
  const prevIndex = hasSiblings ? (currentIndex - 1 + total) % total : -1;
  const nextIndex = hasSiblings ? (currentIndex + 1) % total : -1;
  const prev = hasSiblings ? allCaseStudies[prevIndex] : undefined;
  const next = hasSiblings ? allCaseStudies[nextIndex] : undefined;

  const galleries = cs.galleries && cs.galleries.length > 0 ? <GameUIGalleries galleries={cs.galleries} /> : null;

  return (
    <div className="flex flex-1 flex-col">
      {/* 4c. Breadcrumb bar — full-bleed, directly under the nav. */}
      <div
        className="border-b border-border py-3"
        style={{ backgroundColor: "color-mix(in oklab, var(--primary) 4%, transparent)" }}
      >
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] tracking-[0.1em] uppercase">
            <Link href="/work" className="text-primary transition-colors hover:text-foreground">
              Work
            </Link>
            <span aria-hidden="true" className="text-fg-50">
              /
            </span>
            <span className="text-fg-50">
              Case study {String(displayIndex).padStart(2, "0")} of {String(total).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="text-fg-50">
              /
            </span>
            <span className="text-fg-60">{cs.title}</span>
          </div>
          <div className="flex items-center gap-1" aria-hidden="true">
            {allCaseStudies.map((c, i) => (
              <span key={c.slug} className={`h-[2px] w-[22px] ${i === currentIndex ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1180px] flex-1 grid-cols-1 gap-x-14 px-6 py-16 lg:grid-cols-[220px_1fr]">
        <CaseStudyRail entries={allCaseStudies} currentSlug={slug} />

        <div className="flex flex-1 flex-col gap-10">
          <RevealGroup immediate className="relative flex flex-col gap-8">
            <Triangle className="top-0 right-0" />

            {/* Below `lg` the rail (with its own "All work" foot link) is
                hidden, so this stays the only way back. */}
            <div className="lg:hidden">
              <Hoverable>
                <Link
                  href="/work"
                  className="flex w-fit cursor-pointer items-center gap-1.5 font-mono text-sm tracking-wide text-fg-50 uppercase transition-colors duration-[133ms] hover:text-primary [&_*]:duration-[133ms]"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  <span data-reveal="text" data-reveal-size="fine">
                    All work
                  </span>
                </Link>
              </Hoverable>
            </div>

            <div className="flex flex-col gap-3">
              <p
                data-reveal="text"
                data-reveal-size="fine"
                className="font-mono text-[12px] tracking-[0.22em] text-primary uppercase"
              >
                Case study {String(displayIndex).padStart(2, "0")}
              </p>
              <h1
                data-reveal="text"
                data-reveal-size="fine"
                className="font-display text-[46px] leading-[1.04] font-black tracking-[-0.025em] text-foreground"
              >
                {cs.title}
              </h1>
              <p data-reveal="text" data-reveal-size="fine" className="font-mono text-[11px] tracking-[0.06em] text-fg-50 uppercase">
                {cs.company} &middot; {shortenRole(cs.role)} &middot; {cs.period}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {cs.stack.map((s) => (
                  <Badge key={s} variant="outline" data-reveal="text" data-reveal-size="fine">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {downloads && downloads.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-1">
                {downloads.map((file) => (
                  <Hoverable key={file.href}>
                    <Button asChild size="lg">
                      <a href={file.href} download>
                        <Download />
                        <span data-reveal="text" data-reveal-size="fine">
                          {file.label}
                        </span>
                      </a>
                    </Button>
                  </Hoverable>
                ))}
              </div>
            )}

            <FieldDivider />
          </RevealGroup>

          {/* 4f. Three movements, when Contentful has been migrated for this
              entry — falls back to the flat `body` prose otherwise. */}
          {cs.problem && cs.problem.length > 0 ? (
            <>
              <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[13ch_1fr]">
                <MovementLabel n="01" title="Problem" />
                <div className="flex max-w-[68ch] flex-col gap-4">
                  <h2 className="font-display text-[26px] leading-tight font-black text-foreground" data-reveal="text" data-reveal-size="fine">
                    {cs.summary}
                  </h2>
                  {cs.problem.map((p, i) => (
                    <p key={i} data-reveal="text" className="text-[16.5px] leading-[1.75] text-fg-80">
                      {p}
                    </p>
                  ))}
                </div>
              </RevealGroup>

              <div className="hairline" data-reveal="line" />

              {cs.approach && cs.approach.length > 0 && (
                <>
                  <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[13ch_1fr]">
                    <MovementLabel n="02" title="What I did" />
                    <div className="flex max-w-[68ch] flex-col gap-4">
                      {cs.approach.map((p, i) => (
                        <ApproachParagraph key={i} paragraph={p} />
                      ))}
                    </div>
                  </RevealGroup>
                  <div className="hairline" data-reveal="line" />
                </>
              )}

              <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[13ch_1fr]">
                <MovementLabel n="03" title="Outcome" />
                <div className="flex max-w-[68ch] flex-col gap-6">
                  {galleries}
                  {cs.outcome?.map((p, i) => (
                    <p key={i} data-reveal="text" className="text-[16.5px] leading-[1.75] text-fg-80">
                      {p}
                    </p>
                  ))}
                  {highlights && highlights.length > 0 && <CaseStudyHighlights highlights={highlights} />}
                </div>
              </RevealGroup>
            </>
          ) : (
            <>
              {galleries}
              {highlights && highlights.length > 0 && <CaseStudyHighlights highlights={highlights} />}
              <RevealGroup className="flex max-w-[85ch] flex-col gap-4">
                {cs.body.map((paragraph, i) => (
                  <p key={i} data-reveal="text" className="leading-relaxed text-fg-80">
                    {paragraph}
                  </p>
                ))}
              </RevealGroup>
            </>
          )}

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
              <HalfCircle
                style={{
                  position: "absolute",
                  top: "10px",
                  rotate: "90deg",
                  right: "32px",
                }}
              />
              <div className="hairline mb-8" data-reveal="line" />
              <CaseStudyNav
                prev={{ slug: prev.slug, company: prev.company, index: prevIndex + 1 }}
                next={{ slug: next.slug, company: next.company, index: nextIndex + 1 }}
              />
            </RevealGroup>
          )}
        </div>
      </div>
    </div>
  );
}
