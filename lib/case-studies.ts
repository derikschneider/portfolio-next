export type CaseStudy = {
  slug: string;
  company: string;
  role: string;
  period: string;
  title: string;
  summary: string;
  stack: string[];
  hasVisuals: boolean;
  patentRef?: { label: string; url: string };
  body: string[];
};

// DRAFT: distilled from career history notes, not yet reviewed by Derik.
// Dates/periods are placeholders (TODO) pending confirmation. Only the
// Volition/NetherRealm entry currently has real screenshots to add — the
// rest are description-only or reference public artifacts, per NDA
// constraints on the underlying work.
export const caseStudies: CaseStudy[] = [
  {
    slug: "capital-one-action-platform",
    company: "Capital One",
    role: "Principal Product Owner, Action Platform UI",
    period: "TODO: start date – present",
    title: "Action Platform: automated testing & production data integrity",
    summary:
      "Owning the UI layer of Capital One's Action Platform, with a focus on automated testing coverage and production data integrity for a system operating at bank scale.",
    stack: ["React", "TypeScript", "automated testing", "production data pipelines"],
    hasVisuals: false,
    body: [
      "As Principal Product Owner for Action Platform UI, I own the product direction for the front-end layer of an internal platform used across the bank's automated action/workflow systems.",
      "A recurring theme of this work is trust: because the platform triggers real actions against production data, the team invested heavily in automated test coverage and data-integrity safeguards so that UI-driven actions are provably correct before they ship.",
      "TODO (Derik): fill in specifics — team size, scope of the automated testing initiative, concrete before/after outcomes, any metrics that are safe to share outside NDA.",
    ],
  },
  {
    slug: "novant-nutrien-design-systems",
    company: "Novant Health / Nutrien",
    role: "TODO: confirm title",
    period: "TODO: start–end dates",
    title: "Aurora & Bonsai: design systems for two very different enterprises",
    summary:
      "Built and drove adoption of two component-based design systems — Aurora and Bonsai — bringing consistency to product UI across large, multi-team organizations.",
    stack: ["design systems", "component libraries", "React", "cross-team UI governance"],
    hasVisuals: false,
    body: [
      "Design systems succeed or fail on adoption, not on the component library itself. Both Aurora (Novant Health) and Bonsai (Nutrien) were built with that as the starting premise — documentation, contribution paths, and cross-team buy-in mattered as much as the components.",
      "TODO (Derik): which system came first, what the actual scope/component count was, how many product teams adopted it, and any specific design decisions worth highlighting (theming, accessibility work, Figma-to-code pipeline, etc.).",
    ],
  },
  {
    slug: "agrible-nutrien-production-react",
    company: "Agrible / Nutrien",
    role: "TODO: confirm title",
    period: "TODO: start–end dates",
    title: "Production React/Redux at agricultural scale",
    summary:
      "Shipped and maintained production React/Redux applications for Agrible, an ag-tech platform later acquired by Nutrien Ag Solutions.",
    stack: ["React", "Redux", "production web app"],
    hasVisuals: false,
    body: [
      "Agrible's platform gave growers and agronomists field-level data to inform real decisions — the UI work here was less about visual polish and more about making dense agricultural data legible and fast under real field conditions.",
      "TODO (Derik): what the app actually did day-to-day, team size/role, anything notable about the acquisition transition into Nutrien, technical challenges worth naming.",
    ],
  },
  {
    slug: "volition-netherrealm-game-ui",
    company: "Volition / NetherRealm Studios",
    role: "TODO: confirm title",
    period: "TODO: start–end dates",
    title: "Shipped game UI, from concept to cert",
    summary:
      "UI/UX work on shipped titles at Volition (Saints Row) and NetherRealm Studios (Mortal Kombat) — the one case study here with real screenshots to show.",
    stack: ["game UI/UX", "console cert requirements", "shipped AAA titles"],
    hasVisuals: true,
    body: [
      "Game UI has constraints most web work never sees: strict platform cert requirements, controller-first input, and no second chance to patch a broken menu flow on disc. This is the one entry in this set with real, shippable screenshots instead of NDA-safe description only.",
      "TODO (Derik): which specific titles/features you want screenshotted, what to say about your actual contribution (menus? HUD? cutscene UI?), and whether NDA covers anything from either studio that needs to stay out of this.",
    ],
  },
  {
    slug: "state-farm-cx-patent-tool",
    company: "State Farm",
    role: "TODO: confirm title",
    period: "TODO: start–end dates",
    title: "A patented approach to customer experience tooling",
    summary:
      "Contributed to a customer-experience tool at State Farm that resulted in an issued US patent.",
    stack: ["CX tooling", "patented approach"],
    hasVisuals: false,
    patentRef: {
      label: "US Patent 10,002,393",
      // TODO (Derik): drop in the verified public link (e.g. Google Patents
      // or USPTO) once confirmed — not guessing a URL here.
      url: "",
    },
    body: [
      "One of the more unusual outcomes of this work: the approach we built was novel enough to result in an issued US patent (10,002,393), which is a public record and safe to link directly rather than describe secondhand.",
      "TODO (Derik): confirm the patent number/link is correct, your specific role on the inventing team, and how much of the underlying tool itself I can describe versus just pointing at the patent text.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
