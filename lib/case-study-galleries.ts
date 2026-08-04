import type { StudioGallery } from "@/lib/game-ui-galleries";

// Pulled from _source/portfolio_assets 2026-07-28. State Farm images are
// explicitly watermarked "RECREATED EXAMPLE" by Derik — recreations of the
// tool's UI, not real State Farm screens, so no NDA concern.
//
// layout: "sideBySide" (2026-07-29, Derik's request) — just 2 images, shown
// directly rather than hidden behind the fanned "collection preview" card
// used everywhere else. Still opens the same Lightbox, still navigable.
export const stateFarmGallery: StudioGallery[] = [
  {
    id: "state-farm",
    studio: "CX Testing Environment",
    description:
      "The testing environment behind the patented CX tooling — journey configuration and prototype playback.",
    layout: "sideBySide",
    images: [
      {
        src: "/case-studies/state-farm/prototype-viewer.webp",
        alt: "State Farm prototype viewer, recreated example",
        caption: "Prototype viewer — end-to-end journey playback (recreated example)",
      },
      {
        src: "/case-studies/state-farm/prototype-stitcher.webp",
        alt: "State Farm prototype stitcher tool, recreated example",
        caption: "Prototype stitcher — journey and URL configuration (recreated example)",
      },
    ],
  },
];

// Nutrien Ag Solutions gallery removed 2026-07-29 per Derik — cut entirely,
// not replaced. If case-study visuals ever come back for this entry, also
// flip `hasVisuals` back to true on the nutrien-bonsai Contentful entry
// (Derik needs to do that directly, CONTENTFUL_MANAGEMENT_TOKEN isn't
// stored locally) or the page will show the "Screenshots pending"
// placeholder instead of nothing.

// Refreshed 2026-07-29 — Derik reorganized/renumbered these (see
// public/case-studies/novant-health-aurora/), replacing the previous
// 3-image set. Order follows the numbered filenames.
export const novantGallery: StudioGallery[] = [
  {
    id: "novant-health",
    studio: "Aurora Design System",
    description:
      "Icon research methodology and the physician-finder UX flow from the Aurora rollout.",
    images: [
      {
        src: "/case-studies/novant-health-aurora/1-novant-health-aurora-iconography-cover.webp",
        alt: "Aurora icon system, cover",
        caption: "Aurora icon system — cover",
      },
      {
        src: "/case-studies/novant-health-aurora/2-iconography-process-c.webp",
        alt: "Aurora icon system design process",
        caption: "Aurora icon system — design process",
      },
      {
        src: "/case-studies/novant-health-aurora/3-icon-research-board.webp",
        alt: "Aurora icon design research board, Urgent Care icon",
        caption: "Icon design research — recognition, info scent, aesthetics testing",
      },
      {
        src: "/case-studies/novant-health-aurora/4-physician-finder-initial-wireframe.webp",
        alt: "Physician Finder feature, initial wireframe flow",
        caption: "Physician Finder — initial wireframe flow",
      },
      {
        src: "/case-studies/novant-health-aurora/5-physician-finder-refined-flow.webp",
        alt: "Physician Finder feature, refined booking flow",
        caption: "Physician Finder — refined booking flow",
      },
    ],
  },
];
