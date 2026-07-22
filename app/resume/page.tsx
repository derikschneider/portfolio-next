import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-14 px-6 py-20 md:px-0">
      <div className="flex flex-col gap-3 border-b border-border pb-8">
        <span className="font-mono text-sm tracking-widest text-primary uppercase">
          Experience
        </span>
        <h1 className="font-display text-4xl font-light tracking-tight text-foreground sm:text-5xl">
          Resume
        </h1>
        <p className="max-w-[60ch] text-fg-80">
          25 years, one throughline: the seam between design and
          development. Flagship stops link to a full{" "}
          <Link href="/work" className="text-primary underline underline-offset-4">
            case study
          </Link>
          .
        </p>
        <p className="mt-2 rounded-md border border-dashed border-border bg-muted/50 p-3 font-mono text-sm text-muted-foreground">
          TODO (Derik): a downloadable PDF resume probably belongs here too —
          not wired up yet.
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-2xl font-light tracking-tight text-foreground">
          Work history
        </h2>
        <ol className="flex flex-col">
          {experience.map((role, i) => (
            <li
              key={`${role.company}-${role.period}`}
              className={`flex flex-col gap-1.5 py-6 ${
                i < experience.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-medium text-foreground">
                  {role.caseStudySlug ? (
                    <Link
                      href={`/work/${role.caseStudySlug}`}
                      className="text-foreground underline-offset-4 hover:text-primary hover:underline"
                    >
                      {role.company}
                    </Link>
                  ) : (
                    role.company
                  )}
                </span>
                <span className="font-mono text-sm whitespace-nowrap text-fg-50">
                  {role.period}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-fg-80">
                <span className="text-fg-80">{role.title}</span>
                <Badge variant="outline">{role.type}</Badge>
                <span className="text-fg-50">&middot;</span>
                <span className="text-fg-80">{role.location}</span>
              </div>
              {role.blurb && (
                <p className="max-w-[70ch] text-sm leading-relaxed text-fg-80">
                  {role.blurb}
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-4 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-light tracking-tight text-foreground">
          Skill set
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
