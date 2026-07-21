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

// Content sourced from Derik's LinkedIn About section (2026-07-21), see
// content/source/linkedin-about.md for the raw paste and open questions.
// Dates/periods are still TODO — none were given in that source. Formal
// job titles for the Novant Health / Nutrien Ag Solutions stints are also
// unconfirmed; `role` uses Derik's own functional phrasing rather than a
// guessed title.
export const caseStudies: CaseStudy[] = [
  {
    slug: "capital-one-action-platform",
    company: "Capital One",
    role: "Design lead, Action agent servicing platform → Principal Product Owner, Action Platform UI",
    period: "TODO: start date – present",
    title: "Action Platform: from design leadership to production data integrity",
    summary:
      "Led design for Capital One's Action agent servicing platform, migrated the team's design system from Sketch to Figma, then moved into a Principal Product Owner role driving automated testing and production data integrity.",
    stack: ["Figma", "Sketch → Figma migration", "After Effects", "Automated testing", "Data integrity"],
    hasVisuals: false,
    body: [
      "I led design for Capital One's Action agent servicing platform and migrated the team's design system from Sketch to Figma. Part of that work was narrative: producing presentations on our agent servicing and IVR/messaging systems, editing call-recording audio, hand-animating sequences in After Effects, and building the layouts in Figma — working directly with senior product managers and directors to shape how they told their stories.",
      "I then moved into a Principal Product Owner role, where I built a 101-case automated testing suite, validated production migration events, and coordinated data integrity work across engineering teams.",
      "TODO (Derik): exact dates for both phases, and how much of the IVR/messaging system detail is safe to describe outside NDA.",
    ],
  },
  {
    slug: "novant-health-aurora",
    company: "Novant Health",
    role: "Architected the Aurora design system",
    period: "TODO: start–end dates",
    title: "Aurora: a design system built from scratch",
    summary:
      "Architected the Aurora design system from scratch, coaching the design team on responsive HTML/CSS and accessibility while partnering with engineering on tokens, grids, and components.",
    stack: ["Design systems", "HTML/CSS", "Accessibility", "Design tokens", "Component libraries"],
    hasVisuals: false,
    body: [
      "I architected the Aurora design system from scratch at Novant Health, coaching the design team on responsive HTML/CSS and accessibility while partnering with engineering on tokens, grids, and components.",
      "TODO (Derik): team size, how many product teams adopted Aurora, specific accessibility standard targeted (WCAG level, etc.), and anything about the tokens/grid architecture worth naming directly.",
    ],
  },
  {
    slug: "nutrien-bonsai",
    company: "Nutrien Ag Solutions",
    role: "Core platform team — Bonsai design system",
    period: "TODO: start–end dates",
    title: "Bonsai: documentation and adoption from the platform team",
    summary:
      "As part of the core platform team building Bonsai, authored the system's initial documentation, contributed to component development, and championed its adoption across other design teams.",
    stack: ["Design systems", "Documentation", "Component development", "Cross-team adoption"],
    hasVisuals: false,
    body: [
      "Earlier, as part of the core platform team building Bonsai at Nutrien Ag Solutions, I authored the system's initial documentation, contributed to component development, and championed its adoption across other design teams.",
      "TODO (Derik): is this the same employment stint as the Agrible case study below (Agrible was acquired by Nutrien Ag Solutions), or a separate role? Worth clarifying so these don't read as two unrelated jobs if they're actually one continuous stint.",
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
      "TODO (Derik): confirm whether this is a separate stint from the Bonsai/Nutrien Ag Solutions case study above or part of the same continuous role, what the app actually did day-to-day, team size, and anything notable about the acquisition transition.",
    ],
  },
  {
    slug: "volition-netherrealm-game-ui",
    company: "Volition / NetherRealm Studios",
    role: "Game UI/UX",
    period: "TODO: start–end dates",
    title: "Shipped UI across four titles, two studios",
    summary:
      "Shipped UI for Mortal Kombat (2011) and Injustice: Gods Among Us at NetherRealm Studios, and Saints Row 2 and Red Faction: Armageddon at Volition.",
    stack: ["Game UI/UX", "Lua", "Asset pipelines", "Console cert requirements"],
    hasVisuals: true,
    body: [
      "I shipped UI for Mortal Kombat (2011) and Injustice: Gods Among Us at NetherRealm Studios, and Saints Row 2 and Red Faction: Armageddon at Volition.",
      "Beyond the UI itself, this era is where the systems-thinking side of my toolkit shows up most directly: I designed asset pipelines that other studios' teams went on to adopt.",
      "TODO (Derik): which specific titles/features you want screenshotted, your specific contribution per title (menus? HUD? cutscene UI?), more on the asset-pipeline work, and whether anything here needs to stay out due to NDA.",
    ],
  },
  {
    slug: "state-farm-cx-patent-tool",
    company: "State Farm",
    role: "Designed and helped engineer a customer experience insights tool",
    period: "TODO: start–end dates",
    title: "A patented approach to customer experience tooling",
    summary:
      "Designed and helped engineer a customer experience insights tool at State Farm, resulting in an issued US patent.",
    stack: ["CX tooling", "Patented approach"],
    hasVisuals: false,
    patentRef: {
      label: "US Patent 10,002,393",
      // TODO (Derik): drop in the verified public link (e.g. Google Patents
      // or USPTO) once confirmed — not guessing a URL here.
      url: "",
    },
    body: [
      "I hold US Patent 10,002,393 for a customer experience insights tool I designed and helped engineer at State Farm — a public record, safe to cite directly rather than describe secondhand.",
      "TODO (Derik): the verified patent link, and how much of the underlying tool I can describe versus just pointing at the patent text.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
