import { createClient } from "contentful";
import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import { gameUIGalleries } from "@/lib/game-ui-galleries";
import type { CaseStudy } from "@/lib/case-studies";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

interface CaseStudySkeleton extends EntrySkeletonType {
  contentTypeId: "caseStudy";
  fields: {
    slug: EntryFieldTypes.Symbol;
    order: EntryFieldTypes.Integer;
    company: EntryFieldTypes.Symbol;
    role: EntryFieldTypes.Symbol;
    period: EntryFieldTypes.Symbol;
    years: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    summary: EntryFieldTypes.Text;
    stack: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    hasVisuals: EntryFieldTypes.Boolean;
    body: EntryFieldTypes.Text;
    patentLabel?: EntryFieldTypes.Symbol;
    patentUrl?: EntryFieldTypes.Symbol;
    patentPdfPath?: EntryFieldTypes.Symbol;
  };
}

// Resolved runtime shape of CaseStudySkeleton["fields"] — the SDK's own
// mapped types (Entry<Skeleton>['fields']) don't collapse cleanly to this
// through the default client's chain-modifier generics, so this is spelled
// out directly rather than fought through the generic machinery.
type CaseStudyEntryFields = {
  slug: string;
  order: number;
  company: string;
  role: string;
  period: string;
  years: string;
  title: string;
  summary: string;
  stack: string[];
  hasVisuals: boolean;
  body: string;
  patentLabel?: string;
  patentUrl?: string;
  patentPdfPath?: string;
};

function toCaseStudy(fields: CaseStudyEntryFields): CaseStudy {
  return {
    slug: fields.slug,
    company: fields.company,
    role: fields.role,
    period: fields.period,
    years: fields.years,
    title: fields.title,
    summary: fields.summary,
    // Contentful's Array field can't hold long text, so paragraphs are
    // stored joined by a blank line in one Text field — see
    // scripts/contentful-migrate.ts for the write side of this.
    body: fields.body.split(/\n\n+/),
    stack: fields.stack,
    hasVisuals: fields.hasVisuals,
    patentRef: fields.patentLabel
      ? {
          label: fields.patentLabel,
          url: fields.patentUrl ?? "",
          pdfPath: fields.patentPdfPath,
        }
      : undefined,
    // Volition/NetherRealm screenshots stay static in public/ rather than
    // as Contentful Assets (see conversation 2026-07-27) — reattached here
    // by slug rather than modeled as a Contentful field.
    galleries: fields.slug === "volition-netherrealm-game-ui" ? gameUIGalleries : undefined,
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const entries = await client.getEntries<CaseStudySkeleton>({
    content_type: "caseStudy",
    order: ["fields.order"],
  });
  return entries.items.map((item) => toCaseStudy(item.fields as unknown as CaseStudyEntryFields));
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  const entries = await client.getEntries<CaseStudySkeleton>({
    content_type: "caseStudy",
    "fields.slug": slug,
    limit: 1,
  });
  const item = entries.items[0];
  return item ? toCaseStudy(item.fields as unknown as CaseStudyEntryFields) : undefined;
}
