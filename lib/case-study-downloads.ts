export type CaseStudyDownload = {
  /** Path under public/ — served as-is, never through next/image. */
  href: string;
  /** Button text. Renders mono/uppercase, so keep it short. */
  label: string;
};

// Downloadable artifacts attached by slug, the same pattern as the galleries
// (lib/case-study-galleries.ts) and highlights (lib/case-study-highlights.ts):
// files live in public/, the mapping lives in code, and Contentful stays out
// of it. Distinct from `patentRef.pdfPath`, which renders as a small inline
// link under the body — these render as a primary button in the page header,
// matching the Resume page's Download PDF affordance.
//
// Anything added here ships in the git repo and is downloaded whole (no
// optimization step exists for PDFs) — keep an eye on file size.
export const CASE_STUDY_DOWNLOADS: Record<string, CaseStudyDownload[]> = {
  "novant-health-aurora": [
    {
      href: "/case-studies/novant-health-aurora/aurora-iconography.pdf",
      label: "Download iconography PDF",
    },
  ],
};
