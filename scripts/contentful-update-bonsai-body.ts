import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";
const ENTRY_ID = "nutrien-bonsai";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
}

// One-off content fix, not a repeatable migration (2026-08-05, Derik's
// direction). Two changes:
//
// 1. Restores a detail that had been dropped from this entry — the 14-day
//    weather/field-workability tool and its 87.5% user-success figure.
//    Derik supplied the sentence verbatim; the supporting clause is read
//    off the tool's own screens (5-field-workability-tool.webp), not
//    invented.
// 2. `hasVisuals` back to true — images were restored the same day (see
//    lib/case-study-galleries.ts). Left false, the two sources disagree.
const bodyParagraphs = [
  "I contributed to the early development of the Bonsai Design System as part of the core platform team, authoring initial system documentation and assisting on component builds. I shaped component direction through user research and design feedback, working within a design lead's established framework, and championed the system's adoption across other design teams — driving alignment on shared UI standards.",
  "I also translated user research into a 14-day weather and field workability tool, achieving 87.5% user success in studies — trafficability status for every field in a grower's operation, two weeks out.",
  "This followed directly from my prior front-end role at Nutrien Ag Solutions after Agrible's acquisition — see the production React/Redux case study below for that chapter.",
];

async function main() {
  const client = createClient(
    { accessToken: MANAGEMENT_TOKEN! },
    { type: "plain", defaults: { spaceId: SPACE_ID!, environmentId: ENVIRONMENT_ID } }
  );

  const entry = await client.entry.get({ entryId: ENTRY_ID });
  entry.fields.body = { "en-US": bodyParagraphs.join("\n\n") };
  entry.fields.hasVisuals = { "en-US": true };
  const updated = await client.entry.update({ entryId: ENTRY_ID }, entry);
  await client.entry.publish({ entryId: ENTRY_ID }, updated);

  console.log(`Updated and published ${ENTRY_ID}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
