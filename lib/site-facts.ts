export type SiteFact = {
  label: string;
  value: string;
  detail: string;
};

// Backs the homepage "This site //" fact grid (app/page.tsx). Every value is
// read off this site's own real infrastructure — see the CI/CD and hosting
// notes in this repo's CLAUDE.md if any of these ever needs re-verifying.
export const SITE_FACTS: SiteFact[] = [
  {
    label: "Content",
    value: "Contentful",
    detail: "Case study copy is CMS-driven with hourly ISR, not hardcoded in the repo.",
  },
  {
    label: "Transport",
    value: "AWS SES",
    detail: "The contact form sends real email through a Route Handler, no third-party form service.",
  },
  {
    label: "Pipeline",
    value: "AWS Amplify",
    detail: "GitHub Actions authenticates over OIDC and triggers every deploy, no stored AWS keys.",
  },
];
