import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work — Derik Schneider",
  description: "Case studies from Derik Schneider's career history.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Work</h1>
        <p className="text-muted-foreground">
          Five case studies spanning platform engineering, design systems,
          and shipped game UI. Most underlying work is under NDA — these are
          description-only unless noted.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group flex flex-col gap-2 rounded-lg border border-border p-5 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">{cs.company}</span>
              {cs.hasVisuals && <Badge variant="secondary">Screenshots</Badge>}
            </div>
            <h2 className="text-lg font-medium group-hover:underline">
              {cs.title}
            </h2>
            <p className="text-sm text-muted-foreground">{cs.summary}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cs.stack.map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
