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
  /** Optional narrative fields for the "three movements" detail template
      (IMPLEMENTATION.md step 4). `body` stays the fallback rendering path
      when `problem` is absent, so unmigrated case studies keep working. */
  problem?: string[];
  approach?: string[];
  outcome?: string[];
};

/**
 * Shortens a `role` string for the case-study detail header (IMPLEMENTATION.md
 * step 4e) — display-only, the full string stays intact in Contentful. Drops
 * each " → "-separated segment's trailing ", <team/department>" clause, e.g.
 * "Lead UX Designer, Action Design Team → Principal Product Owner, Action
 * Platform UI" becomes "Lead UX Designer → Principal Product Owner". Roles
 * with no comma or arrow pass through unchanged.
 */
export function shortenRole(role: string): string {
  return role
    .split(" → ")
    .map((part) => part.split(",")[0].trim())
    .join(" → ");
}
