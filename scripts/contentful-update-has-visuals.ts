import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
}

// One-off: these three entries just got real galleries wired in
// (lib/case-study-galleries.ts) — hasVisuals was still false from the
// original migration snapshot.
const ENTRY_IDS = ["state-farm-cx-patent-tool", "nutrien-bonsai", "novant-health-aurora"];

async function main() {
  const client = createClient(
    { accessToken: MANAGEMENT_TOKEN! },
    { type: "plain", defaults: { spaceId: SPACE_ID!, environmentId: ENVIRONMENT_ID } }
  );

  for (const entryId of ENTRY_IDS) {
    const entry = await client.entry.get({ entryId });
    entry.fields.hasVisuals = { "en-US": true };
    const updated = await client.entry.update({ entryId }, entry);
    await client.entry.publish({ entryId }, updated);
    console.log(`Updated and published ${entryId}: hasVisuals = true`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
