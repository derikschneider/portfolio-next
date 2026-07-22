import type { Metadata } from "next";
import { CaseStudyRow } from "@/components/case-study-row";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work — Derik Schneider",
  description: "Case studies from Derik Schneider's career history.",
};

export default function WorkPage() {
  return (
    <div className="px-6 py-20 md:px-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col gap-3 border-b border-border pb-6">
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Selected work
          </span>
          <h1 className="font-display text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Work
          </h1>
          <p className="max-w-[60ch] text-muted-foreground">
            Six case studies spanning platform engineering, design systems,
            and shipped game UI. Most underlying work is under NDA — these
            are description-only unless noted.
          </p>
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
    </div>
  );
}
