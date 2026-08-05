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

// One-off content fix (2026-08-05), revised twice the same day.
//
// First pass named Legal Day 1 (May 2025) as the boundary between the two
// employers, matching the dates in Derik's LinkedIn.
//
// Then Derik asked for the site to use his resume's dates instead: the Lead
// UX Designer role ending Mar 2025 and the Principal Product Owner role
// starting Apr 2025. Those are ROLE dates and they sit a month before Legal
// Day 1 — which is normal in an acquisition, org moves rarely land on the
// legal close — but stated flatly next to "Capital One from Legal Day 1, May
// 2025" they read as a contradiction on one page.
//
// So both are kept and the relationship between them is spelled out: the
// role changed in April, the legal entities merged in May. Neither date is
// wrong and neither should be "corrected" to match the other.
//
// NOTE this now differs from Derik's LinkedIn (Apr/May). He is reconciling
// that himself — see content/source/linkedin-updates-2026-08-05.md.
const period =
  "Jan 2024 – Present (Discover Jan 2024–Mar 2025; Principal Product Owner from Apr 2025, through Capital One's acquisition)";

const bodyParagraphs = [
  "At Discover, as Lead UX Designer for the Action Design Team, I migrated the legacy Sketch design system to Figma, building interactive component libraries and training the design team on auto layout, responsive structure, and library management. I partnered with front-end developers to wire the design system into the development pipeline — tokens, grids, and SVG standards — cutting page layout time from days to minutes. I also built high-fidelity interactive prototypes and presentations for the Action platform and IVR/Messaging products, creating custom 2D/3D assets and animation to sell product direction to senior leadership.",
  "I moved into a Principal Product Owner role in April 2025, as Capital One's acquisition of Discover closed — Legal Day 1 landed that May — and the Action platform work carried across with me. There, I designed and deployed an automated testing suite of 101 test cases in two months — covering fraud workflows, dynamic timeline suppression, and agent permissions — cutting manual regression testing and automating compliance reporting. I ran end-to-end validation and production Live Card Testing for Back Book migration events, personally verifying authentication, navigation, and feature flags through zero-defect launches. I partnered with external engineering teams to resolve an account key mismatch between the Orion and Action systems, mapping data flows to prevent leaks and converting the fix into permanent automated regression tests. I also led a cross-functional initiative to remove outdated disclosure language from the platform UI, coordinating multiple product owners to an on-schedule delivery.",
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
