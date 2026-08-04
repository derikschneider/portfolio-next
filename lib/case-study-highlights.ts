export type CaseStudyHighlight = {
  /** Short, punchy figure. Kept brief — it renders at display size. */
  value: string;
  /** Mono uppercase label sitting under the value. */
  label: string;
  /** One sentence of supporting detail. */
  detail: string;
};

// Blocky accomplishment callouts, attached by slug the same way galleries are
// (see lib/contentful.ts). Code-side rather than Contentful fields for the
// same reason the galleries are: no CONTENTFUL_MANAGEMENT_TOKEN is stored
// locally, so adding a field to the content model isn't a self-service edit.
//
// These exist specifically for case studies that CANNOT show visuals. Action
// Platform is under NDA — no screenshots will ever be possible — so the
// callouts are what carries the page instead of imagery. Every figure below
// is drawn directly from the case study's own body copy (Contentful, entry
// `action-platform-discover-capital-one`); nothing here is estimated or
// rounded. If the body copy changes, re-check these against it.
//
// To extend to another case study, add a slug key here — the render path in
// app/work/[slug]/page.tsx picks it up automatically. `agrible-nutrien-
// production-react` and `nutrien-bonsai` are the other two with no visuals
// and would be the natural next candidates.
export const CASE_STUDY_HIGHLIGHTS: Record<string, CaseStudyHighlight[]> = {
  "action-platform-discover-capital-one": [
    {
      value: "101",
      label: "Automated test cases",
      detail:
        "Designed and deployed in two months, covering fraud workflows, dynamic timeline suppression, and agent permissions — replacing manual regression passes and automating compliance reporting.",
    },
    {
      value: "Zero",
      label: "Defect launches",
      detail:
        "End-to-end validation and production Live Card Testing across Back Book migration events, personally verifying authentication, navigation, and feature flags.",
    },
    {
      value: "Days → minutes",
      label: "Page layout time",
      detail:
        "Cut by partnering with front-end developers to wire the design system into the development pipeline — tokens, grids, and SVG standards.",
    },
    {
      value: "Sketch → Figma",
      label: "Design system migrated",
      detail:
        "Legacy system rebuilt as interactive component libraries, with the design team trained on auto layout, responsive structure, and library management.",
    },
  ],
};
