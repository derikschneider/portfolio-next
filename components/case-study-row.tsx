import { LogRow } from "@/components/field/log-row";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyRow({ cs }: { cs: CaseStudy }) {
  return (
    <LogRow
      href={`/work/${cs.slug}`}
      meta={cs.company}
      metaTrailing={cs.years}
      title={cs.title}
      description={cs.summary}
      tags={cs.stack}
    />
  );
}
