import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";
const ENTRY_ID = "state-farm-cx-patent-tool";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
}

// One-off content fix, not a repeatable migration: replaces the TODO
// paragraph in the patent case study's body with real reconciling copy,
// per Derik confirming directly (2026-07-27) that the testing environment
// named in the patent's public title IS the CX tool he built and led.
const bodyParagraphs = [
  "Contracted through TEKsystems and placed at State Farm, I designed and drove development of a CX insights tool granted US Patent 10,002,393 — coordinating systems architecture, database integration, server management, and security requirements across teams.",
  "I trained a cohort of designers in HTML, CSS, and JavaScript so the team could build its own testable prototypes, shortening the loop between design and user feedback. I built the process for hosting prototypes on internal servers and piping them into UX research tools to analyze customer journeys across State Farm's insurance lines. Named TEKsystems Employee of the Month, July 2014.",
  "The patent's public title, \"Systems and methods for supporting a testing environment for a website,\" describes this same work from its technical core: the CX insights tooling I built was that testing environment — the platform that let the team deploy and evaluate live, customer-facing prototypes and generate the actual journey data the research relied on. I designed and led development of it end to end, from systems architecture through to what shipped.",
];

async function main() {
  const client = createClient(
    { accessToken: MANAGEMENT_TOKEN! },
    { type: "plain", defaults: { spaceId: SPACE_ID!, environmentId: ENVIRONMENT_ID } }
  );

  const entry = await client.entry.get({ entryId: ENTRY_ID });
  entry.fields.body = { "en-US": bodyParagraphs.join("\n\n") };
  const updated = await client.entry.update({ entryId: ENTRY_ID }, entry);
  await client.entry.publish({ entryId: ENTRY_ID }, updated);

  console.log(`Updated and published ${ENTRY_ID}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
