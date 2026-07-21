import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
        <p className="text-muted-foreground">
          25 years, one throughline: the seam between design and
          development. Flagship stops link to a full{" "}
          <Link href="/work" className="underline underline-offset-4">
            case study
          </Link>
          .
        </p>
        <p className="rounded-md border border-dashed border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          TODO (Derik): a downloadable PDF resume probably belongs here too —
          not wired up yet.
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
        <ol className="flex flex-col gap-6">
          {experience.map((role, i) => (
            <li key={`${role.company}-${role.period}`} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-medium">
                  {role.caseStudySlug ? (
                    <Link
                      href={`/work/${role.caseStudySlug}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {role.company}
                    </Link>
                  ) : (
                    role.company
                  )}
                </span>
                <span className="text-sm text-muted-foreground">{role.period}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{role.title}</span>
                <Badge variant="outline" className="text-[0.7rem]">
                  {role.type}
                </Badge>
                <span>&middot;</span>
                <span>{role.location}</span>
              </div>
              {role.blurb && <p className="text-sm text-muted-foreground">{role.blurb}</p>}
              {i < experience.length - 1 && <Separator className="mt-4" />}
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
        <div className="flex flex-wrap gap-1.5">
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
