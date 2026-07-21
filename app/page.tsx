import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/case-studies";

const stack = ["Next.js", "TypeScript", "Tailwind", "Contentful", "AWS Amplify", "GitHub Actions"];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-20">
      <section className="flex flex-col gap-6">
        <Badge variant="secondary" className="w-fit">
          Internal move — Lead Full Stack Engineer
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Derik Schneider
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Principal Product Owner, Action Platform UI at Capital One. This
          site is a work sample built specifically for the Lead Full Stack
          Engineer posting — every piece of the stack below is real, running
          in production on this domain.
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <Button asChild>
            <Link href="/work">See the work</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/resume">Resume</Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Case studies</h2>
          <Link
            href="/work"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {caseStudies.slice(0, 4).map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group flex flex-col gap-1 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <span className="text-xs text-muted-foreground">{cs.company}</span>
              <span className="font-medium group-hover:underline">{cs.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
