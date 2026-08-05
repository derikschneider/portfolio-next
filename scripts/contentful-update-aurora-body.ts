import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";
const ENTRY_ID = "novant-health-aurora";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
}

// One-off content fix, not a repeatable migration. Second revision in a day,
// both from Derik directly.
//
// Morning: dropped the title's "built from scratch" claim — another company
// had delivered the design, so the entry was overclaiming authorship.
//
// Afternoon: "translation" was the opposite error, underclaiming the work.
// What actually happened (Derik, 2026-08-05): a previous design had been
// ported over as a first attempt at a design system and it was poor — the
// visual language existed but wasn't built as one. He rebuilt it head to
// toe into true Figma components and re-architected the styles, effects,
// and foundational elements underneath, which is what took page assembly
// from days to about half an hour.
//
// The efficiency claim is now explicitly a DESIGN-side win, assembling a
// page in Figma. Keep it that way: the Action Platform entry carries a
// separate, real "days to minutes" claim about wiring a design system into
// the DEV pipeline at Discover, and both use the phrase "tokens, grids, and
// SVG standards" (they're adjacent bullets on Derik's own LinkedIn). Left
// undifferentiated they read as one accomplishment told twice.
//
// The figure is "under an hour", matching Derik's LinkedIn and resume PDF.
// He described it as "half an hour" in conversation and then chose the
// published wording deliberately — don't "sharpen" it back.
const title = "Aurora: rebuilding a first-pass system into real components";

const summary =
  "Rebuilt an inherited first-pass design system into true Figma components with re-architected foundations — taking page assembly from days to under an hour — then led its integration across web products with accessibility built into components rather than patched on afterward.";

const bodyParagraphs = [
  "Aurora wasn't mine from scratch, and it wasn't a blank page either. A previous design had been ported over as a first attempt at a design system: the visual language was there, but it hadn't been built as a system — no true components, no foundation underneath, nothing a designer could actually assemble a page out of. I rebuilt it head to toe into real Figma components, and re-architected the styles, effects, and foundational elements they stand on.",
  "That rebuild is what moved the number. Putting a page together in Figma went from days to under an hour — not because anyone worked faster, but because the system finally behaved like one: drag and drop, flexible enough to cover what a page actually needed, and intuitive enough that designers stopped fighting it.",
  "I led Aurora's integration across web products from there, working directly with front-end engineers on the technical layer of the system. I owned design tokens, grids, SVG standards, responsive behavior, and animation, with WCAG accessibility built into components rather than patched on afterward.",
  "I trained the design team in mobile-first HTML/CSS, Figma auto layout, and UX methods including Design Thinking and the Double Diamond process. I documented the system's evolution in ZeroHeight, then prototyped a custom internal documentation platform to replace it, and served as the primary liaison to offshore engineering teams adopting Aurora, reviewing contributions and keeping implementations consistent.",
  "That internal documentation platform is where a lot of the system's own craft landed. I built its Lottie animations, redefined Aurora's iconography, and wrote the documentation and drawing guides the design team used to produce new icons that held to the set — marks tested for recognition, information scent, and aesthetic fit rather than drawn to taste.",
];

async function main() {
  const client = createClient(
    { accessToken: MANAGEMENT_TOKEN! },
    { type: "plain", defaults: { spaceId: SPACE_ID!, environmentId: ENVIRONMENT_ID } }
  );

  const entry = await client.entry.get({ entryId: ENTRY_ID });
  entry.fields.title = { "en-US": title };
  entry.fields.summary = { "en-US": summary };
  entry.fields.body = { "en-US": bodyParagraphs.join("\n\n") };
  const updated = await client.entry.update({ entryId: ENTRY_ID }, entry);
  await client.entry.publish({ entryId: ENTRY_ID }, updated);

  console.log(`Updated and published ${ENTRY_ID}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
