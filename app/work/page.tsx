import type { Metadata } from "next";
import { FieldHeader } from "@/components/field/field-header";
import { LogList } from "@/components/field/log-list";
import { CaseStudyIndexRow } from "@/components/case-study-index-row";
import { getCaseStudies } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Work — Derik Schneider",
  description: "Case studies from Derik Schneider's career history.",
};

export const revalidate = 3600;

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 py-16">
      <FieldHeader
        eyebrow="Work //"
        title="Six case studies"
        description="Platform engineering, design systems, and shipped game UI, in reverse-chronological order. Four carry real screenshots below; two are under NDA and carry figures instead. Both are the point: what shipped, and what it did."
        divider={false}
      />
      <LogList
        items={caseStudies}
        registrationMark
        keyFn={(cs) => cs.slug}
        renderItem={(cs, i) => <CaseStudyIndexRow cs={cs} index={i} />}
      />
    </div>
  );
}
