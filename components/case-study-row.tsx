import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyRow({
  cs,
  index,
  isLast,
}: {
  cs: CaseStudy;
  index: number;
  isLast: boolean;
}) {
  return (
    <Link
      href={`/work/${cs.slug}`}
      className={`group grid grid-cols-[3rem_1fr_auto] items-start gap-4 py-8 transition-all hover:translate-x-2.5 hover:bg-muted/30 sm:gap-8 ${
        isLast ? "" : "border-b border-border"
      }`}
    >
      <span className="pt-1 font-mono text-sm tracking-widest text-foreground/50 transition-colors group-hover:text-primary">
        {String(index).padStart(2, "0")}
      </span>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-3">
          <h3 className="font-display text-xl leading-tight font-light tracking-tight text-foreground sm:text-2xl">
            {cs.title}
          </h3>
          <span className="font-mono text-sm tracking-wide text-primary">
            {cs.company}
          </span>
        </div>
        <p className="max-w-[60ch] text-sm leading-relaxed text-foreground/80">
          {cs.summary}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {cs.stack.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 pt-1">
        <span className="font-mono text-sm whitespace-nowrap text-foreground/50">
          {cs.years}
        </span>
        <span className="inline-block text-foreground/50 transition-all group-hover:translate-x-1 group-hover:text-primary">
          →
        </span>
      </div>
    </Link>
  );
}
