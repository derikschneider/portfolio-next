import type { ReactNode } from "react";
import { RevealGroup } from "@/components/reveal/reveal-group";
import { Triangle } from "@/components/field/shapes";
import { FieldDivider } from "@/components/field/field-divider";

export function FieldHeader({
  eyebrow,
  title,
  description,
  actions,
  divider = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  /** Set false when the content right below already opens with its own
      hairline (e.g. LogList) — avoids two dividers stacked back to back.
      Note the red registration mark rides on this divider, so whatever
      renders the replacement line should carry the mark instead (LogList
      takes a `registrationMark` prop for exactly this). */
  divider?: boolean;
}) {
  return (
    <RevealGroup immediate className="relative flex flex-col gap-4 pb-10">
      <Triangle className="top-0 right-0" />

      <p
        data-reveal="text"
        className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase"
      >
        {eyebrow}
      </p>
      <h1
        data-reveal="text"
        data-reveal-size="fine"
        className="font-display text-4xl leading-[0.95] font-black tracking-[-0.02em] text-foreground sm:text-5xl"
      >
        {title}
      </h1>
      {description && (
        <p data-reveal="text" className="max-w-[62ch] text-fg-80">
          {description}
        </p>
      )}
      {actions && <div className="flex flex-wrap gap-3 pt-1">{actions}</div>}
      {divider && <FieldDivider className="mt-4" />}
    </RevealGroup>
  );
}
