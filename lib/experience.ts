export type Experience = {
  company: string;
  title: string;
  type: "Full-time" | "Contract" | "Freelance";
  period: string;
  location: string;
  blurb?: string;
  caseStudySlug?: string;
};

// Full work history, source: content/source/linkedin-experience.md
// (Derik-confirmed dates and content, pasted 2026-07-21). Reverse
// chronological. `caseStudySlug` links flagship roles to their full
// write-up in lib/case-studies.ts — most early-career roles don't have
// one and just show here as a line item.
export const experience: Experience[] = [
  {
    company: "Capital One",
    title: "Principal Product Owner, Action Platform UI",
    type: "Full-time",
    period: "May 2025 – Present",
    location: "Remote",
    blurb:
      "Owned product quality and cross-functional delivery for Capital One's core agent servicing platform during high-scale account migration waves.",
    caseStudySlug: "action-platform-discover-capital-one",
  },
  {
    company: "Discover",
    title: "Lead UX Designer, Action Design Team",
    type: "Full-time",
    period: "Jan 2024 – Apr 2025",
    location: "Remote",
    blurb:
      "Translated complex servicing requirements into responsive interfaces and rebuilt the team's design infrastructure.",
    caseStudySlug: "action-platform-discover-capital-one",
  },
  {
    company: "Novant Health",
    title: "UX/UI Lead",
    type: "Contract",
    period: "Jun 2022 – Jul 2023",
    location: "Remote",
    blurb:
      "Led integration of the Aurora Design System across web products, working directly with front-end engineers on the technical layer of the system.",
    caseStudySlug: "novant-health-aurora",
  },
  {
    company: "Nutrien Ag Solutions",
    title: "UX Designer",
    type: "Full-time",
    period: "Apr 2019 – Jun 2022",
    location: "Remote",
    blurb:
      "Contributed to the early development of the Bonsai Design System as part of the core platform team.",
    caseStudySlug: "nutrien-bonsai",
  },
  {
    company: "Nutrien Ag Solutions",
    title: "Front End Developer",
    type: "Full-time",
    period: "Aug 2018 – Apr 2019",
    location: "Remote",
    blurb:
      "Continued Agrible's React/Redux product work under Nutrien following the acquisition.",
    caseStudySlug: "agrible-nutrien-production-react",
  },
  {
    company: "Agrible, Inc.",
    title: "Front-end Developer",
    type: "Full-time",
    period: "Mar 2015 – Aug 2018",
    location: "Urbana-Champaign Area",
    blurb:
      "Wrote production React and Redux for Agrible's core sustainability and field data tools through the company's growth and acquisition by Nutrien.",
    caseStudySlug: "agrible-nutrien-production-react",
  },
  {
    company: "TEKsystems (at State Farm)",
    title: "Lead UX Designer/Developer",
    type: "Contract",
    period: "Dec 2012 – Mar 2015",
    location: "Greater Bloomington, Illinois Area",
    blurb: "Designed and helped engineer a patented customer experience research platform.",
    caseStudySlug: "state-farm-cx-patent-tool",
  },
  {
    company: "Health Alliance Medical Plans",
    title: "UI/UX Designer",
    type: "Contract",
    period: "Apr 2012 – Nov 2012",
    location: "Urbana-Champaign Area",
    blurb:
      "Redesigned registration, admin access, and claims inquiry flows, carrying designs from low-fidelity wireframes to production-ready comps through iterative usability testing.",
  },
  {
    company: "NetherRealm Studios",
    title: "User Interface Artist",
    type: "Full-time",
    period: "Oct 2010 – Mar 2012",
    location: "Chicago, IL",
    blurb: "Designed and produced UI for Mortal Kombat (2011), Mortal Kombat VITA, and Injustice: Gods Among Us.",
    caseStudySlug: "volition-netherrealm-game-ui",
  },
  {
    company: "Volition, Inc. (THQ, Inc.)",
    title: "User Interface Artist",
    type: "Full-time",
    period: "Jul 2007 – Jul 2010",
    location: "Champaign, IL",
    blurb: "Designed, built, and integrated front-end UI for Saints Row 2 and Red Faction: Armageddon.",
    caseStudySlug: "volition-netherrealm-game-ui",
  },
  {
    company: "Freelance",
    title: "Graphic and Web Designer",
    type: "Freelance",
    period: "Aug 2006 – Jan 2007",
    location: "Kingston, Ontario, Canada",
  },
  {
    company: "Wyeth",
    title: "Flash Designer",
    type: "Contract",
    period: "Mar 2006 – Jul 2006",
    location: "Philadelphia, PA",
  },
  {
    company: "Freelance",
    title: "Graphic and Web Designer",
    type: "Freelance",
    period: "Jun 2005 – Mar 2006",
    location: "Philadelphia, PA",
  },
  {
    company: "Stelex",
    title: "Web Designer",
    type: "Full-time",
    period: "Apr 2004 – Oct 2005",
    location: "Philadelphia, PA",
  },
  {
    company: "Radian Guaranty",
    title: "UX Designer",
    type: "Contract",
    period: "Apr 2003 – Mar 2004",
    location: "Philadelphia, PA",
  },
  {
    company: "D&D Interactive",
    title: "Web and Graphic Designer",
    type: "Freelance",
    period: "Mar 2001 – Apr 2003",
    location: "Philadelphia, PA",
  },
  {
    company: "CoreTech Consulting Group",
    title: "Web Designer",
    type: "Contract",
    period: "Oct 2000 – Mar 2001",
    location: "Philadelphia, PA",
  },
  {
    company: "Art4Business",
    title: "Digital Photo Editor / Web Designer",
    type: "Freelance",
    period: "Jun 2000 – Aug 2000",
    location: "Philadelphia, PA",
  },
  {
    company: "GM/Saturn",
    title: "Lead UX Designer",
    type: "Contract",
    period: "Oct 1999 – May 2000",
    location: "Wilmington, Delaware",
    blurb:
      "Led my first design team at 22, directing three designers through the development of touchscreen kiosk interfaces — building a UX practice from scratch before \"UX\" was a common job title.",
  },
];
