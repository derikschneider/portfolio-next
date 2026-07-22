import type { Metadata } from "next";
import { CaseStudyList } from "@/components/case-study-list";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work — Derik Schneider",
  description: "Case studies from Derik Schneider's career history.",
};

export default function WorkPage() {
  return (
    <div className="px-6 py-20 md:px-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-col gap-3 border-b border-border pb-6">
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Selected work
          </span>
          <h1 className="font-display text-4xl font-light tracking-tight text-foreground sm:text-5xl">
            Work
          </h1>
          <p className="max-w-[60ch] text-fg-80">
            Six case studies spanning platform engineering, design systems,
            and shipped game UI. Most underlying work is under NDA — these
            are description-only unless noted.
          </p>
        </div>
        <CaseStudyList items={caseStudies} />
      </div>
    </div>
  );
}
