import type { StudioGallery } from "@/lib/game-ui-galleries";

// Pulled from _source/portfolio_assets 2026-07-28. State Farm images are
// explicitly watermarked "RECREATED EXAMPLE" by Derik — recreations of the
// tool's UI, not real State Farm screens, so no NDA concern.
export const stateFarmGallery: StudioGallery[] = [
  {
    id: "state-farm",
    studio: "CX Testing Environment",
    description:
      "The testing environment behind the patented CX tooling — journey configuration and prototype playback.",
    images: [
      {
        src: "/case-studies/state-farm/prototype-viewer.png",
        alt: "State Farm prototype viewer, recreated example",
        caption: "Prototype viewer — end-to-end journey playback (recreated example)",
      },
      {
        src: "/case-studies/state-farm/prototype-stitcher.png",
        alt: "State Farm prototype stitcher tool, recreated example",
        caption: "Prototype stitcher — journey and URL configuration (recreated example)",
      },
    ],
  },
];

export const nutrienGallery: StudioGallery[] = [
  {
    id: "nutrien",
    studio: "Bonsai Design System",
    description:
      "nutrien.design, the public documentation site, and a field-management app built on the system.",
    images: [
      {
        src: "/case-studies/nutrien-bonsai/field-app.png",
        alt: "Nutrien field management app, three-phone mockup",
        caption: "Field management app built on Bonsai",
      },
      {
        src: "/case-studies/nutrien-bonsai/homepage.png",
        alt: "nutrien.design homepage",
        caption: "nutrien.design — homepage",
      },
      {
        src: "/case-studies/nutrien-bonsai/data-visualization.png",
        alt: "Bonsai design system Data Visualization documentation page",
        caption: "Bonsai docs — Data Visualization patterns",
      },
      {
        src: "/case-studies/nutrien-bonsai/drawers-modals.png",
        alt: "Bonsai design system Drawers and Modals documentation page",
        caption: "Bonsai docs — Drawers and Modals patterns",
      },
    ],
  },
];

export const novantGallery: StudioGallery[] = [
  {
    id: "novant-health",
    studio: "Aurora Design System",
    description:
      "Icon research methodology and the physician-finder UX flow from the Aurora rollout.",
    images: [
      {
        src: "/case-studies/novant-health-aurora/icon-research-board.png",
        alt: "Aurora icon design research board, Urgent Care icon",
        caption: "Icon design research — recognition, info scent, aesthetics testing",
      },
      {
        src: "/case-studies/novant-health-aurora/physician-finder-initial-wireframe.png",
        alt: "Physician Finder feature, initial wireframe flow",
        caption: "Physician Finder — initial wireframe flow",
      },
      {
        src: "/case-studies/novant-health-aurora/physician-finder-refined-flow.png",
        alt: "Physician Finder feature, refined booking flow",
        caption: "Physician Finder — refined booking flow",
      },
    ],
  },
];
