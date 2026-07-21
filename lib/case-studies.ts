export type CaseStudy = {
  slug: string;
  company: string;
  role: string;
  period: string;
  title: string;
  summary: string;
  stack: string[];
  hasVisuals: boolean;
  patentRef?: { label: string; url: string; pdfPath?: string };
  body: string[];
};

// Content sourced from Derik's LinkedIn About + Experience sections
// (content/source/linkedin-about.md, content/source/linkedin-experience.md).
// Dates, titles, and achievement details below are Derik-confirmed facts,
// not drafts. Remaining gaps are called out explicitly per entry.
export const caseStudies: CaseStudy[] = [
  {
    slug: "action-platform-discover-capital-one",
    company: "Discover → Capital One",
    role: "Lead UX Designer, Action Design Team → Principal Product Owner, Action Platform UI",
    period: "Jan 2024 – Present (Discover Jan 2024–Apr 2025; Capital One acquired Discover, continuing May 2025–present)",
    title: "Action Platform: from design system migration to production data integrity",
    summary:
      "Rebuilt the Action platform's design infrastructure at Discover, then carried that platform through Capital One's acquisition of Discover into a Principal Product Owner role driving automated testing and production data integrity.",
    stack: ["Figma", "Sketch → Figma migration", "Automated testing", "Data integrity", "Cross-functional leadership"],
    hasVisuals: false,
    body: [
      "At Discover, as Lead UX Designer for the Action Design Team, I migrated the legacy Sketch design system to Figma, building interactive component libraries and training the design team on auto layout, responsive structure, and library management. I partnered with front-end developers to wire the design system into the development pipeline — tokens, grids, and SVG standards — cutting page layout time from days to minutes. I also built high-fidelity interactive prototypes and presentations for the Action platform and IVR/Messaging products, creating custom 2D/3D assets and animation to sell product direction to senior leadership.",
      "When Capital One acquired Discover, the Action platform work continued under Capital One, where I moved into a Principal Product Owner role. There, I designed and deployed an automated testing suite of 101 test cases in two months — covering fraud workflows, dynamic timeline suppression, and agent permissions — cutting manual regression testing and automating compliance reporting. I ran end-to-end validation and production Live Card Testing for Back Book migration events, personally verifying authentication, navigation, and feature flags through zero-defect launches. I partnered with external engineering teams to resolve an account key mismatch between the Orion and Action systems, mapping data flows to prevent leaks and converting the fix into permanent automated regression tests. I also led a cross-functional initiative to remove outdated disclosure language from the platform UI, coordinating multiple product owners to an on-schedule delivery.",
    ],
  },
  {
    slug: "novant-health-aurora",
    company: "Novant Health",
    role: "UX/UI Lead (Contract)",
    period: "Jun 2022 – Jul 2023",
    title: "Aurora: a design system built from scratch",
    summary:
      "Led integration of the Aurora Design System across web products, owning tokens, grids, SVG standards, responsive behavior, and animation, with accessibility built into components rather than patched on afterward.",
    stack: ["Design systems", "HTML/CSS", "Accessibility (WCAG)", "Design tokens", "ZeroHeight"],
    hasVisuals: false,
    body: [
      "I led integration of the Aurora Design System across web products, working directly with front-end engineers on the technical layer of the system. I owned design tokens, grids, SVG standards, responsive behavior, and animation for Aurora, with WCAG accessibility built into components rather than patched on afterward — cutting average page layout assembly from days to under an hour by building a systematic component integration workflow.",
      "I trained the design team in mobile-first HTML/CSS, Figma auto layout, and UX methods including Design Thinking and the Double Diamond process. I documented the system's evolution in ZeroHeight, then prototyped a custom internal documentation platform to replace it, and served as the primary liaison to offshore engineering teams adopting Aurora, reviewing contributions and keeping implementations consistent.",
    ],
  },
  {
    slug: "nutrien-bonsai",
    company: "Nutrien Ag Solutions",
    role: "UX Designer",
    period: "Apr 2019 – Jun 2022",
    title: "Bonsai: documentation and adoption from the platform team",
    summary:
      "As part of the core platform team building Bonsai, authored the system's initial documentation, contributed to component development, and championed adoption across other design teams.",
    stack: ["Design systems", "Documentation", "Component development", "Cross-team adoption"],
    hasVisuals: false,
    body: [
      "I contributed to the early development of the Bonsai Design System as part of the core platform team, authoring initial system documentation and assisting on component builds. I shaped component direction through user research and design feedback, working within a design lead's established framework, and championed the system's adoption across other design teams — driving alignment on shared UI standards.",
      "This followed directly from my prior front-end role at Nutrien Ag Solutions after Agrible's acquisition — see the production React/Redux case study below for that chapter.",
    ],
  },
  {
    slug: "agrible-nutrien-production-react",
    company: "Agrible → Nutrien Ag Solutions",
    role: "Front-end Developer",
    period: "Mar 2015 – Apr 2019 (Agrible Mar 2015–Aug 2018; continued at Nutrien Ag Solutions after acquisition, Aug 2018–Apr 2019)",
    title: "Production React/Redux at agricultural scale",
    summary:
      "Wrote production React and Redux for Agrible's core sustainability and field data tools through the company's growth and acquisition by Nutrien.",
    stack: ["React", "Redux", "REST APIs", "Ghost API"],
    hasVisuals: false,
    body: [
      "I wrote production React and Redux for Agrible's core sustainability and field data tools through the company's growth and acquisition by Nutrien. I built and maintained the front end of the community sustainability admin platform used by major CPG partners, and worked across the stack where needed — consuming REST APIs and devising API responses with engineers.",
      "After the acquisition, continuing as Front End Developer at Nutrien Ag Solutions, I built the React admin interface for that community sustainability program, by then adopted by Kellogg's, Anheuser-Busch InBev, and Bayer. I designed and developed the Weather Story feature end to end, integrating YouTube video into articles through the Ghost API, and co-developed Agrible's Sustainability and Field Story tools in React and Redux, including a variant that generated client-ready seasonal report PDFs.",
    ],
  },
  {
    slug: "volition-netherrealm-game-ui",
    company: "Volition / NetherRealm Studios",
    role: "User Interface Artist",
    period: "Jul 2007 – Jul 2010 (Volition); Oct 2010 – Mar 2012 (NetherRealm Studios)",
    title: "Shipped UI across four titles, two studios",
    summary:
      "Designed, built, and integrated UI for Saints Row 2 and Red Faction: Armageddon at Volition, then Mortal Kombat (2011), Mortal Kombat VITA, and Injustice: Gods Among Us at NetherRealm Studios.",
    stack: ["Game UI/UX", "Lua", "Perforce", "Asset pipelines", "Console cert requirements"],
    hasVisuals: true,
    body: [
      "At Volition, I designed, built, and integrated front-end UI for Saints Row 2 and Red Faction: Armageddon. I took UI from flows and mockups through final art, then integrated it myself using Volition's proprietary UI tool, Perforce, and custom Lua scripts driving interactions, animation, and live game data. I built the vehicle paint color rendering system for Saints Row 2 — a modular approach later carried into further Saints Row titles — and streamlined the UI asset output pipeline, training cross-discipline teams on it and speeding up UI production studio-wide.",
      "At NetherRealm Studios, I designed and produced UI for Mortal Kombat (2011), Mortal Kombat VITA, and Injustice: Gods Among Us — creating flows, concepts, mockups, and final production art for menus, HUD, and game screens, and hand-painting and 3D-rendering icons, character portraits, and backgrounds. I concepted the 2D parallax-driven Krypt navigation for Mortal Kombat VITA that shaped the shipped version.",
      "TODO (Derik): which specific titles/features you want screenshotted, and whether anything here needs to stay out due to NDA.",
    ],
  },
  {
    slug: "state-farm-cx-patent-tool",
    company: "State Farm (contract via TEKsystems)",
    role: "Lead UX Designer/Developer",
    period: "Dec 2012 – Mar 2015",
    title: "A patented approach to customer experience tooling",
    summary:
      "Designed and drove development of a CX insights tool granted US Patent 10,002,393, coordinating systems architecture, database integration, server management, and security requirements across teams.",
    stack: ["CX tooling", "HTML/CSS/JS training", "Systems architecture", "Patented approach"],
    hasVisuals: false,
    patentRef: {
      label: "US Patent 10,002,393",
      // Verified via Google Patents (2026-07-21): matches patent number,
      // State Farm Mutual Automobile Insurance Company as assignee, 2018
      // grant date. Google's record spells the inventor "Derek Schneider"
      // (vs. "Derik") - confirmed by Derik as a typo made at registration,
      // not a different person or an error on this site's part.
      url: "https://patents.google.com/patent/US10002393B1/en",
      // Original PDF from USPTO's Patent Public Search, downloaded and
      // self-hosted since the USPTO link Derik supplied was a
      // session-scoped API URL with an expiring request token, not a
      // stable permanent link.
      pdfPath: "/patents/us-10002393-b1.pdf",
    },
    body: [
      "Contracted through TEKsystems and placed at State Farm, I designed and drove development of a CX insights tool granted US Patent 10,002,393 — coordinating systems architecture, database integration, server management, and security requirements across teams.",
      "I trained a cohort of designers in HTML, CSS, and JavaScript so the team could build its own testable prototypes, shortening the loop between design and user feedback. I built the process for hosting prototypes on internal servers and piping them into UX research tools to analyze customer journeys across State Farm's insurance lines. Named TEKsystems Employee of the Month, July 2014.",
      "TODO (Derik): the patent's official title per the public record is \"Systems and methods for supporting a testing environment for a website,\" which reads as testing infrastructure rather than a customer-experience insights tool. Worth a line reconciling the two, or confirming they're the same thing described at different altitudes (the testing environment that powered the CX research work), so this doesn't look inconsistent to someone who clicks through to the patent itself.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
