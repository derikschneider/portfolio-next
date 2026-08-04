import { CaseStudyRow } from "@/components/case-study-row";
import { LogList } from "@/components/field/log-list";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyList({
  items,
  registrationMark = false,
}: {
  items: CaseStudy[];
  /** Passed through to LogList — see its own docs. Set true when the
      FieldHeader above was given `divider={false}`, so this list's opening
      hairline is standing in as the page's title/content separator. */
  registrationMark?: boolean;
}) {
  return (
    <LogList
      items={items}
      registrationMark={registrationMark}
      keyFn={(cs) => cs.slug}
      renderItem={(cs) => <CaseStudyRow cs={cs} />}
    />
  );
}
