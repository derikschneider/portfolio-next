import { CaseStudyRow } from "@/components/case-study-row";
import { LogList } from "@/components/field/log-list";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyList({ items }: { items: CaseStudy[] }) {
  return (
    <LogList
      items={items}
      keyFn={(cs) => cs.slug}
      renderItem={(cs) => <CaseStudyRow cs={cs} />}
    />
  );
}
