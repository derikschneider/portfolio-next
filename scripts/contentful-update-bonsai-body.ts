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

// One-off content fix, not a repeatable migration. Second revision the same
// day; both from Derik.
//
// Earlier: restored the 14-day weather/field-workability tool and its 87.5%
// figure, and flipped hasVisuals back to true alongside the restored images.
//
// Now: the resume audit found this entry and Derik's resume describing two
// different jobs, and the resume was the accurate one. This entry had been
// built from his LinkedIn, which undersold the role in two ways:
//
//   1. "Contributed to the early development… working within a design lead's
//      established framework" -> he CO-LED the inception and architecture.
//      There was a lead above him and the framework was hers, but co-leading
//      is the honest description of his part, not "contributed within."
//   2. It never mentioned that he designed and BUILT the documentation site
//      itself — front-end code, responsive layout, navigation — not just the
//      content inside it. The restored gallery is that site: image 1 is
//      nutrien.design live, image 2 is his full design comp for it.
//
// ZeroHeight now appears on both this entry and Novant/Aurora, which looks
// like a copy error and isn't: at Nutrien he built a custom site and later
// ported into ZeroHeight, at Novant he documented in ZeroHeight and
// prototyped a custom platform to replace it. Opposite directions, two
// employers, both true. Don't "deduplicate" them.
//
// Deliberately NOT included: Derik's own view of how credit was distributed
// between him and the design lead. A public case study that grades a former
// colleague reads badly to exactly the audience this site is for. The copy
// claims his contribution and stops there.
const title = "Bonsai: co-leading the system and building its documentation site";

const summary =
  "Co-led the inception and architecture of Nutrien's Bonsai Design System, then designed and built its documentation site solo — front-end code, responsive layout, and navigation — before porting the content into ZeroHeight as the system matured.";

const bodyParagraphs = [
  "I co-led the inception and architecture of the Bonsai Design System as part of Nutrien Ag Solutions' core platform team, shaping component direction through user research and design feedback, contributing to component builds, and championing the system's adoption across other design teams to drive alignment on shared UI standards.",
  "I also designed and built the system's documentation site myself — the front-end code, the responsive layout, and the navigation, not only the content inside it. nutrien.design was where Bonsai lived alongside the brand and handbook material, and where designers and engineers actually went to use the system. As Bonsai matured I ported the content into ZeroHeight.",
  "I translated user research into a 14-day weather and field workability tool as well, achieving 87.5% user success in studies — trafficability status for every field in a grower's operation, two weeks out.",
  "I came to this work through an acquisition rather than a job change: Nutrien bought Agrible, where I'd been a front-end developer, and I carried on with that product team at Nutrien Ag Solutions before moving into UX design and onto the platform team building Bonsai. The production React/Redux case study covers that earlier chapter.",
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
  entry.fields.hasVisuals = { "en-US": true };
  const updated = await client.entry.update({ entryId: ENTRY_ID }, entry);
  await client.entry.publish({ entryId: ENTRY_ID }, updated);

  console.log(`Updated and published ${ENTRY_ID}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
