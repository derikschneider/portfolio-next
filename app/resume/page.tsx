import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldHeader } from "@/components/field/field-header";
import { LogRow } from "@/components/field/log-row";
import { LogList } from "@/components/field/log-list";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Hoverable } from "@/components/reveal/hoverable";
import { Parallelogram } from "@/components/field/shapes";
import { experience } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Resume — Derik Schneider",
  description: "Work history and skills.",
};

const skills = [
  "React",
  "Redux",
  "JavaScript",
  "HTML/CSS",
  "Lua",
  "REST APIs",
  "MySQL",
  "Figma",
  "Sketch",
  "After Effects",
  "Design systems",
  "Accessibility",
  "Automated testing",
];

export default function ResumePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-4 px-6 py-16">
      <FieldHeader
        eyebrow="Resume //"
        title="My experience"
        description="25 years, one throughline: the seam between design and development. Flagship stops link to a full case study."
        actions={
          <Hoverable>
            <Button asChild variant="outline">
              <a href="/resume/derik-schneider-resume.pdf" download>
                <Download />
                <span data-reveal="text" data-reveal-size="fine">
                  Download PDF
                </span>
              </a>
            </Button>
          </Hoverable>
        }
        // LogList below opens with its own hairline, so the header's divider
        // would stack a second line right under the Download PDF button.
        divider={false}
      />

      <LogList
        items={experience}
        registrationMark
        keyFn={(role) => `${role.company}-${role.period}`}
        renderItem={(role) => (
          <LogRow
            href={role.caseStudySlug ? `/work/${role.caseStudySlug}` : undefined}
            meta={role.company}
            metaTrailing={role.period}
            title={role.title}
            description={role.blurb}
            tags={[role.type, role.location]}
            // Only the roles that actually link to a case study count as
            // case-study blocks — the rest stay `foreground`.
            accentTitle={!!role.caseStudySlug}
          />
        )}
      />

      <RevealGroup className="flex flex-col gap-4 pt-10">
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-fg-50 uppercase">
          <Parallelogram />
          Skill set //
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline" data-reveal="text" data-reveal-size="fine">
              {skill}
            </Badge>
          ))}
        </div>
      </RevealGroup>
    </div>
  );
}
