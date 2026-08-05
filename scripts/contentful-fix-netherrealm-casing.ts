import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";
const ENTRY_ID = "volition-netherrealm-game-ui";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
}

// One-off spelling fix: "NetherRealm" -> "Netherrealm" throughout, per Derik.
async function main() {
  const client = createClient(
    { accessToken: MANAGEMENT_TOKEN! },
    { type: "plain", defaults: { spaceId: SPACE_ID!, environmentId: ENVIRONMENT_ID } }
  );

  const entry = await client.entry.get({ entryId: ENTRY_ID });
  const fix = (s: string) => s.replaceAll("NetherRealm", "Netherrealm");

  entry.fields.company = { "en-US": fix(entry.fields.company["en-US"]) };
  entry.fields.period = { "en-US": fix(entry.fields.period["en-US"]) };
  entry.fields.summary = { "en-US": fix(entry.fields.summary["en-US"]) };
  entry.fields.body = { "en-US": fix(entry.fields.body["en-US"]) };

  const updated = await client.entry.update({ entryId: ENTRY_ID }, entry);
  await client.entry.publish({ entryId: ENTRY_ID }, updated);

  console.log(`Updated and published ${ENTRY_ID}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
