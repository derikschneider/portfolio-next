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

// One-off content fix, not a repeatable migration.
//
// contentful-update-bonsai-body.ts (2026-08-05) upgraded this entry from
// "contributed... within a design lead's established framework" to "co-led
// the inception and architecture," per Derik's ruling that day that the
// resume was the accurate version and the site had been underselling the
// role. Derik has since reconsidered and asked to revert title, summary, and
// the body's opening line back to the "contributed" framing — the rest of
// that script's changes (documenting that he designed and built the
// documentation site himself, the ZeroHeight/nutrien.design details, the
// field-workability paragraph, the Agrible acquisition paragraph) are
// unrelated findings and stay as-is.
const title = "Bonsai: early contributions to the system, and its documentation site built solo";

const summary =
  "Contributed to the early development of Nutrien's Bonsai Design System, then designed and built its documentation site solo — front-end code, responsive layout, and navigation — before porting the content into ZeroHeight as the system matured.";

const bodyParagraphs = [
  "I contributed to the early development of the Bonsai Design System as part of Nutrien Ag Solutions' core platform team, authoring initial system documentation and assisting on component builds. I shaped component direction through user research and design feedback, working within a design lead's established framework.",
  "I also designed and built the system's documentation site myself — the front-end code, the responsive layout, and the navigation, not only the content inside it. nutrien.design was where Bonsai lived alongside the brand and handbook material, and where designers and engineers actually went to use the system. As Bonsai matured I ported the content into ZeroHeight.",
  "I turned grower and sales-consultant research into a working prototype for a 14-day weather and field workability tool as well — trafficability status for every field in an operation, two weeks out. It reached 87.5% task success in user studies and went on to ship as a product.",
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
  const updated = await client.entry.update({ entryId: ENTRY_ID }, entry);
  await client.entry.publish({ entryId: ENTRY_ID }, updated);

  console.log(`Updated and published ${ENTRY_ID}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
