import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";
const CONTENT_TYPE_ID = "caseStudy";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
}

// Adds the three optional Long text fields the case-study detail template
// (IMPLEMENTATION.md step 4a) reads for its "three movements" layout:
// problem / approach / outcome. Additive only — existing entries are
// untouched and keep rendering via the `body` fallback (app/work/[slug]/
// page.tsx) until Derik migrates each one by hand. Safe to re-run: skips
// any field id that already exists on the content type.
const NEW_FIELDS = [
  { id: "problem", name: "Problem", type: "Text" as const, required: false, localized: false },
  { id: "approach", name: "Approach", type: "Text" as const, required: false, localized: false },
  { id: "outcome", name: "Outcome", type: "Text" as const, required: false, localized: false },
];

async function main() {
  const client = createClient(
    { accessToken: MANAGEMENT_TOKEN! },
    { type: "plain", defaults: { spaceId: SPACE_ID!, environmentId: ENVIRONMENT_ID } }
  );

  const contentType = await client.contentType.get({ contentTypeId: CONTENT_TYPE_ID });
  const existingIds = new Set(contentType.fields.map((f) => f.id));
  const toAdd = NEW_FIELDS.filter((f) => !existingIds.has(f.id));

  if (toAdd.length === 0) {
    console.log("problem/approach/outcome fields already exist. Nothing to do.");
    return;
  }

  contentType.fields.push(...toAdd);
  const updated = await client.contentType.update({ contentTypeId: CONTENT_TYPE_ID }, contentType);
  await client.contentType.publish({ contentTypeId: CONTENT_TYPE_ID }, updated);

  console.log(`Added and published field(s): ${toAdd.map((f) => f.id).join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
