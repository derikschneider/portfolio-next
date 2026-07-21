import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Derik Schneider",
  description: "About Derik Schneider.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="flex flex-col gap-4 text-muted-foreground">
        <p>
          I&apos;m Derik Schneider, currently Principal Product Owner for
          Action Platform UI at Capital One. Before that, my path ran through
          design systems, production React/Redux apps, and shipped game UI —
          the case studies on this site walk through each of those in more
          detail.
        </p>
        <p>
          I&apos;ve coded, designed, and owned product across that path,
          which is less a career-ladder story and more a habit of going
          wherever the interesting problem is. This site itself is an
          example: it&apos;s a work sample built to demonstrate the stack
          named in the role I&apos;m applying for internally, not a generic
          portfolio template.
        </p>
        <p className="rounded-md border border-dashed border-border bg-muted/50 p-3 text-sm">
          TODO (Derik): this page is a placeholder in your voice, not mine —
          rewrite it as you actually want to sound to whoever&apos;s
          reviewing this internally.
        </p>
      </div>
    </div>
  );
}
