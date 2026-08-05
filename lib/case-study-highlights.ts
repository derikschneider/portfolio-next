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
// Platform is under NDA — no screenshots will ever be possible — and the
// Agrible/Nutrien front-end work has no surviving captures, so the callouts
// are what carries those pages instead of imagery. Every figure below is
// drawn from the case study's own Contentful entry (body copy, plus the
// `period` field for the date-range figures); nothing here is estimated or
// rounded. If the body copy changes, re-check these against it.
//
// To extend to another case study, add a slug key here — the render path in
// app/work/[slug]/page.tsx picks it up automatically. `nutrien-bonsai` is
// the remaining visual-less entry and the natural next candidate.
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
  "agrible-nutrien-production-react": [
    {
      value: "3",
      label: "Global CPG partners",
      detail:
        "Kellogg's, Anheuser-Busch InBev, and Bayer ran on the community sustainability admin platform I built and maintained the front end for.",
    },
    {
      value: "4 years",
      label: "React & Redux in production",
      detail:
        "Shipping continuously from March 2015 through Agrible's growth and its acquisition by Nutrien — I stayed with the codebase rather than handing it off.",
    },
    {
      value: "End to end",
      label: "Weather Story feature",
      detail:
        "Designed and developed the whole feature myself, integrating YouTube video into articles through the Ghost API.",
    },
    {
      value: "Season → PDF",
      label: "Client-ready reporting",
      detail:
        "Co-developed the Sustainability and Field Story tools, including a variant that generated seasonal report PDFs partners could hand straight to their own clients.",
    },
  ],
};
