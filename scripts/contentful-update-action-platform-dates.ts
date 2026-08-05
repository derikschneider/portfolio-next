import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";
const ENTRY_ID = "action-platform-discover-capital-one";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
}

// One-off content fix (2026-08-05). The dates here were already right —
// Discover Jan 2024–Apr 2025, Capital One May 2025–present, contiguous. What
// was missing is WHY the boundary falls exactly there. Derik: Capital One's
// acquisition of Discover had Legal Day 1 in May 2025, which is what moved
// him onto Capital One's books and into the Principal Product Owner role on
// the same platform.
//
// Naming it preempts the obvious question from anyone reading two employers
// with back-to-back dates and one continuous product, and it gives the
// resume and LinkedIn a fixed date to agree with rather than each rounding
// the transition differently (the resume currently has Mar/Apr, a month off
// on both sides, which is what creates a gap there that doesn't exist here).
const period =
  "Jan 2024 – Present (Discover Jan 2024–Apr 2025; Capital One from Legal Day 1, May 2025)";

const bodyParagraphs = [
  "At Discover, as Lead UX Designer for the Action Design Team, I migrated the legacy Sketch design system to Figma, building interactive component libraries and training the design team on auto layout, responsive structure, and library management. I partnered with front-end developers to wire the design system into the development pipeline — tokens, grids, and SVG standards — cutting page layout time from days to minutes. I also built high-fidelity interactive prototypes and presentations for the Action platform and IVR/Messaging products, creating custom 2D/3D assets and animation to sell product direction to senior leadership.",
  "Capital One acquired Discover, with Legal Day 1 in May 2025, and the Action platform work carried across with me. At Capital One I moved into a Principal Product Owner role. There, I designed and deployed an automated testing suite of 101 test cases in two months — covering fraud workflows, dynamic timeline suppression, and agent permissions — cutting manual regression testing and automating compliance reporting. I ran end-to-end validation and production Live Card Testing for Back Book migration events, personally verifying authentication, navigation, and feature flags through zero-defect launches. I partnered with external engineering teams to resolve an account key mismatch between the Orion and Action systems, mapping data flows to prevent leaks and converting the fix into permanent automated regression tests. I also led a cross-functional initiative to remove outdated disclosure language from the platform UI, coordinating multiple product owners to an on-schedule delivery.",
];

async function main() {
  const client = createClient(
    { accessToken: MANAGEMENT_TOKEN! },
    { type: "plain", defaults: { spaceId: SPACE_ID!, environmentId: ENVIRONMENT_ID } }
  );

  const entry = await client.entry.get({ entryId: ENTRY_ID });
  entry.fields.period = { "en-US": period };
  entry.fields.body = { "en-US": bodyParagraphs.join("\n\n") };
  const updated = await client.entry.update({ entryId: ENTRY_ID }, entry);
  await client.entry.publish({ entryId: ENTRY_ID }, updated);

  console.log(`Updated and published ${ENTRY_ID}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
