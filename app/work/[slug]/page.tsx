import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
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
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 md:px-0">
      <Link
        href="/work"
        className="flex items-center gap-1.5 font-mono text-sm tracking-wide text-fg-50 uppercase hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        All work
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-sm tracking-wide text-primary">
          <span className="text-primary">{cs.company}</span>
          <span className="text-fg-50">&middot;</span>
          <span className="text-fg-50">{cs.role}</span>
        </div>
        <h1 className="font-display text-3xl font-light tracking-tight text-foreground sm:text-4xl">
          {cs.title}
        </h1>
        <p className="font-mono text-sm text-fg-50">{cs.period}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {cs.stack.map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        {cs.body.map((paragraph, i) => {
          const isTodo = paragraph.startsWith("TODO");
          return (
            <p
              key={i}
              className={
                isTodo
                  ? "rounded-md border border-dashed border-border bg-muted/50 p-3 font-mono text-sm text-muted-foreground"
                  : "leading-relaxed font-light text-fg-80"
              }
            >
              {paragraph}
            </p>
          );
        })}
      </div>

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

      {cs.hasVisuals && (
        <div className="rounded-md border border-dashed border-border p-8 text-center font-mono text-sm text-muted-foreground">
          Screenshots pending — placeholder for shipped game UI captures.
        </div>
      )}
    </div>
  );
}
