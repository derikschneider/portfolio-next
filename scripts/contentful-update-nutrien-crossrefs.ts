import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = "master";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local");
}

// One-off content fix (2026-08-05). The repo's CLAUDE.md claimed these two
// entries "cross-reference each other" — only Bonsai pointed at Agrible, and
// its wording ("my prior front-end role at Nutrien Ag Solutions after
// Agrible's acquisition") stated the sequence without ever stating the
// relationship. Derik's own framing: Agrible was bought by Nutrien, and he
// worked on Bonsai there after the merger. Both entries now say that.
//
// Also drops the positional "below" — the entries are only above/below each
// other on the /work index, and the sentence renders on a detail page where
// there is no list. Naming the case study works from either surface.
const BONSAI_BODY = [
  "I contributed to the early development of the Bonsai Design System as part of the core platform team, authoring initial system documentation and assisting on component builds. I shaped component direction through user research and design feedback, working within a design lead's established framework, and championed the system's adoption across other design teams — driving alignment on shared UI standards.",
  "I also translated user research into a 14-day weather and field workability tool, achieving 87.5% user success in studies — trafficability status for every field in a grower's operation, two weeks out.",
  "I came to this work through an acquisition rather than a job change: Nutrien bought Agrible, where I'd been a front-end developer, and I carried on with that product team at Nutrien Ag Solutions before moving into UX design and onto the platform team building Bonsai. The production React/Redux case study covers that earlier chapter.",
];

const AGRIBLE_BODY = [
  "I wrote production React and Redux for Agrible's core sustainability and field data tools through the company's growth and acquisition by Nutrien. I built and maintained the front end of the community sustainability admin platform used by major CPG partners, and worked across the stack where needed — consuming REST APIs and devising API responses with engineers.",
  "After the acquisition, continuing as Front End Developer at Nutrien Ag Solutions, I built the React admin interface for that community sustainability program, by then adopted by Kellogg's, Anheuser-Busch InBev, and Bayer. I designed and developed the Weather Story feature end to end, integrating YouTube video into articles through the Ghost API, and co-developed Agrible's Sustainability and Field Story tools in React and Redux, including a variant that generated client-ready seasonal report PDFs.",
  "That acquisition is also how the design system work started. Staying on at Nutrien Ag Solutions put me in reach of a move from front-end development into UX design, and from there onto the core platform team building the Bonsai Design System — its own case study.",
];

const UPDATES: { entryId: string; body: string[] }[] = [
  { entryId: "nutrien-bonsai", body: BONSAI_BODY },
  { entryId: "agrible-nutrien-production-react", body: AGRIBLE_BODY },
];

async function main() {
  const client = createClient(
    { accessToken: MANAGEMENT_TOKEN! },
    { type: "plain", defaults: { spaceId: SPACE_ID!, environmentId: ENVIRONMENT_ID } }
  );

  for (const { entryId, body } of UPDATES) {
    const entry = await client.entry.get({ entryId });
    entry.fields.body = { "en-US": body.join("\n\n") };
    const updated = await client.entry.update({ entryId }, entry);
    await client.entry.publish({ entryId }, updated);
    console.log(`Updated and published ${entryId}.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
