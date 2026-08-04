import type { Metadata } from "next";
import { FieldHeader } from "@/components/field/field-header";
import { CaseStudyList } from "@/components/case-study-list";
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
        description="Platform engineering, design systems, and shipped game UI, in reverse-chronological order. Most underlying work is under NDA — these are description-only unless noted."
        divider={false}
      />
      <CaseStudyList items={caseStudies} registrationMark />
    </div>
  );
}
