import type { StudioGallery } from "@/lib/game-ui-galleries";

// Content lives in Contentful (content type "caseStudy") as of 2026-07-27 —
// fetched via lib/contentful.ts. This type is the shared shape both the
// migration script (scripts/contentful-migrate.ts) and the fetch layer
// map into/out of.
export type CaseStudy = {
  slug: string;
  company: string;
  role: string;
  period: string;
  /** Short year range for compact display (index rows) — full detail in `period`. */
  years: string;
  title: string;
  summary: string;
  stack: string[];
  hasVisuals: boolean;
  patentRef?: { label: string; url: string; pdfPath?: string };
  galleries?: StudioGallery[];
  body: string[];
};
