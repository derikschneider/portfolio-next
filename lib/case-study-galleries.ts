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

// Nutrien Ag Solutions was cut entirely on 2026-07-29, then restored
// 2026-08-05 from _source/portfolio_assets/nutrien with a different set of
// images and a different shape: two galleries rather than one, so the
// design-system work and the field-workability product sit side by side in
// the two-column stack grid (same arrangement as the two studio stacks on
// the game-UI case study). `hasVisuals` on the Contentful entry was flipped
// back to true in the same pass.
// Both stacks below share lightboxGroup "bonsai" (2026-08-05, Derik's
// request): each still renders as its own preview card (4-image stack,
// solo image), but clicking either opens ONE Lightbox spanning all 5
// images — the design-system stack opens at position 1, the solo field-
// workability shot opens at position 5, and paging wraps between them.
export const nutrienBonsaiGalleries: StudioGallery[] = [
  {
    id: "bonsai-design-system",
    studio: "Bonsai Design System",
    lightboxGroup: "bonsai",
    // Reworded 2026-08-05: "the pattern documentation I authored inside it"
    // undersold this — Derik designed and built the site itself, front-end
    // code included. Images 1 and 2 are the evidence (the live site, and his
    // own full-page comp for it), which is exactly why this claim belongs
    // next to them.
    description:
      "nutrien.design — the documentation site I designed and built for the system, and the pattern documentation inside it.",
    images: [
      {
        src: "/case-studies/nutrien-bonsai/1-bonsai-nutrien-design-home.webp",
        alt: "nutrien.design homepage, with Bonsai, Handbook, and Brand entry points",
        caption: "nutrien.design live — Bonsai alongside the Handbook and Brand material",
      },
      {
        src: "/case-studies/nutrien-bonsai/2-bonsai-home-design-comp.webp",
        alt: "Full-page design comp for the nutrien.design home page",
        caption: "My home page design comp — resources, then the five design principles",
      },
      {
        src: "/case-studies/nutrien-bonsai/3-bonsai-drawers-and-modals.webp",
        alt: "Bonsai documentation page for the Drawers and Modals pattern",
        caption: "Drawers and Modals — concepts, types, and usage, with the Figma and code kits linked",
      },
      {
        src: "/case-studies/nutrien-bonsai/4-bonsai-data-visualization.webp",
        alt: "Bonsai documentation page for the Data Visualization pattern",
        caption: "Data Visualization — chart types, part-to-whole charts, legends, and scale types",
      },
    ],
  },
  {
    id: "field-workability",
    studio: "14-Day Field Workability",
    lightboxGroup: "bonsai",
    description:
      "The weather and field-workability tool the research turned into: trafficability status across a grower's whole operation, two weeks out.",
    images: [
      {
        src: "/case-studies/nutrien-bonsai/5-field-workability-tool.webp",
        alt: "Mobile screens showing field status, a field map, and 14-day tractor-time conditions",
        caption: "Field list, field map, and the 14-day tractor-time forecast",
      },
    ],
  },
];

// Refreshed 2026-07-29 — Derik reorganized/renumbered these (see
// public/case-studies/novant-health-aurora/), replacing the previous
// 3-image set. Order follows the numbered filenames.
//
// Retitled 2026-08-05: "Aurora Design System" promised component-library
// screens that were never archived. The heading now names what's actually
// here — iconography plus the physician-finder flow — so the page doesn't
// set up an expectation the images can't meet.
//
// Cover replaced 2026-08-05: image 1 was cropping the N:|Aurora lockup out
// of the aspect-4/3 preview frame (the old 1920x1049 slide lost ~260px per
// side to object-cover). Derik authored a proper 1600x1200 cover in its
// place, same filename, so no src changes were needed here.
//
// Cover pulled out of `images` entirely, same day, second revision: it's a
// title/cover graphic, not a real content shot, so Derik doesn't want it
// navigable as a lightbox slide. `cover` (StudioGallery, game-ui-galleries.ts)
// is what the card thumbnail renders; the carousel now opens straight into
// the 4 real images.
export const novantGallery: StudioGallery[] = [
  {
    id: "novant-health",
    studio: "Iconography & Physician Finder",
    description:
      "Not the component library itself — the icon system I redefined for Aurora, the research behind those marks, and the physician-finder flow built on top of it.",
    cover: {
      src: "/case-studies/novant-health-aurora/1-novant-health-aurora-iconography-cover.webp",
      alt: "Aurora icon system, cover",
      caption: "Aurora icon system — cover",
    },
    images: [
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
