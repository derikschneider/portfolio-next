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
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <Link
        href="/work"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All work
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{cs.company}</span>
          <span>&middot;</span>
          <span>{cs.role}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{cs.title}</h1>
        <p className="text-sm text-muted-foreground">{cs.period}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
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
                  ? "rounded-md border border-dashed border-border bg-muted/50 p-3 text-sm text-muted-foreground"
                  : "leading-relaxed"
              }
            >
              {paragraph}
            </p>
          );
        })}
      </div>

      {cs.patentRef && (
        <p className="text-sm text-muted-foreground">
          {cs.patentRef.url ? (
            <a
              href={cs.patentRef.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {cs.patentRef.label}
            </a>
          ) : (
            cs.patentRef.label
          )}
        </p>
      )}

      {cs.hasVisuals && (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Screenshots pending — placeholder for shipped game UI captures.
        </div>
      )}
    </div>
  );
}
