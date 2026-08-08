# Implementation spec — work.derikschneider.com

Paste this whole file to Claude Code as the brief. It is scoped, ordered, and every step names the real file.

Design decisions are made. Do not re-explore alternatives. Do not touch `/about` or `/resume`.

## Global constraints (apply to every step)

- Use existing tokens only: `--primary`, `--on-accent`, `--accent-red`, `--border`, `.text-fg-50/60/75/80`, `--radius` (3px). Introduce no new colors.
- Type: `font-display` for headings, `font-mono` uppercase for labels/eyebrows. Do not add a third family.
- Every new text node gets `data-reveal="text"`, and `data-reveal-size="fine"` on short strings (labels, titles, figures) exactly as existing components do. Every new divider is `<div className="hairline" data-reveal="line" />`. New sections are wrapped in `<RevealGroup>`; above-the-fold ones get `immediate`.
- Do not touch `components/reveal/*`, `globals.css` token blocks, or the `.text-fg-*` numbers.
- Reuse `FieldHeader`, `LogRow`, `LogList`, `Button`, `Badge`, `FieldDivider`, and the shapes in `components/field/shapes.tsx`. Do not draw new SVG marks.
- **No em-dashes in any copy you write or edit.** Use a period, colon, or comma. This is a hard rule.
- Red (`--accent-red`) stays at most once or twice per page, decorative only.

---

## Step 1 — Homepage teaser sections (option 1a, "Ledger")

File: `app/page.tsx`. Keep the hero, stats strip, and stack row exactly as they are. Replace everything from the current `Selected work //` section down with five numbered ledger entries: three full-width (Work, About, This site), then a final block splitting Resume and Contact into two halves side by side.

After this step the homepage links to every child page on the site. That is the point of the step, and the acceptance test for it.

Shared entry shape for all five: a two-column grid, `96px` number column + content column, `column-gap: 32px`. The number is `font-display text-[56px] leading-[0.9] font-black tracking-[-0.03em]` in `color: rgba(232,178,58,0.28)` (i.e. `--primary` at 28% — express it as `text-primary/30` if that resolves cleanly, otherwise inline). Entries are separated by a `hairline`.

**Entry 01 — Selected work.** Mono eyebrow `Selected work //` with the existing `HalfCircleC` inline shape, then the new middle type step: an `h2` at `text-[40px] leading-[1.05] font-black tracking-[-0.02em] text-foreground` reading "Six case studies, three studios, one patent". Then a `max-w-[60ch]` lede. Then the existing `LogList` + `CaseStudyRow` with the first 3 case studies, unchanged. Then the existing `See all 6` button.

This h2 is the single most important change in this spec. It is the missing middle type step between the 96px hero and the 11px mono labels.

**Entry 02 — About.** Three-column inner grid (number, copy, `300px` portrait). Eyebrow `About //`, h2 "A designer who codes, an engineer who paints his own assets", one paragraph at `max-w-[56ch]`, three `Badge variant="outline"` tags (Design systems / Front-end engineering / Game UI), and a mono link "Read the long version →" to `/about`. Portrait is `public/profile-pic.webp` in an `aspect-[3/4]` frame, `object-cover object-[center_20%]`, `grayscale contrast-[1.08]`, bordered. Wrap it in the existing `[data-preview]` / `[data-preview-frame]` pattern so it picks up the gold-outline hover for free.

**Entry 03 — This site.** Eyebrow `This site //`, h2 "The work sample is the website", a `max-w-[62ch]` paragraph, then a 3-up fact grid using the `gap-px bg-border` + `bg-background` cell trick (1px hairline grid, no borders per cell). Cells: Content / Contentful, Transport / AWS SES, Pipeline / AWS Amplify, each with one sentence of detail. Add the fact copy to a new `lib/site-facts.ts` rather than inlining it in the page.

**Entries 04 and 05 — Resume and Contact, side by side.** One final full-width block closing the page, split into two equal halves by a 1px vertical hairline (`grid grid-cols-1 md:grid-cols-2 gap-px bg-border`, each half `bg-background`). A `hairline` sits above the pair and below it.

Each half repeats the same `96px` number + content grid as entries 01 to 03, at reduced scale: h2 drops to `text-[32px] leading-[1.06]`, copy to `max-w-[42ch] text-[15.5px]`. Inner padding is asymmetric so the two halves breathe against the divider without breaking the page's 24px gutter: left half `pr-10`, right half `pl-10`.

- **04 Resume.** Eyebrow `Resume //`, h2 "Eighteen roles, back to 1999", one paragraph, two mono facts (18 entries / PDF available), then a primary `Button` to `/resume` and a mono `Download PDF ↓` link pointing at the same file the resume page already serves.
- **05 Contact.** Eyebrow `Contact //`, h2 "Say something", one paragraph naming the SES transport, two mono facts (`POST /api/contact` / Reply within a day), then an `outline` Button to `/contact` and a mono LinkedIn link. Use `variant="outline"` here deliberately: two solid gold buttons side by side compete, and Work in entry 01 already owns the primary fill.

Both halves are hover targets with `useHoverFx` (blink and scramble-once on the h2, looping scramble on the paragraph), matching the case-study rows. Do not add the gold background inversion on hover; at half-section size it is too much area.

Copy for all five entries is in `Home Redesign.dc.html`, option `1a`. Lift it verbatim.

## Step 2 — Hero Spline object

File: `app/page.tsx` hero `RevealGroup`. Change it to `grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-x-14 items-center`; existing hero content becomes column one. Hero name drops from `lg:text-8xl` to `text-[88px]` at the `lg` breakpoint so it does not collide with the object.

Column two: a `420px` square mount for `@splinetool/viewer` via the `<spline-viewer>` custom element, loaded with `next/script` `strategy="lazyOnload"`, rendered inside a client component `components/hero-spline.tsx`.

Non-negotiable requirements, because the site's whole value is that it paints instantly:
- The `<spline-viewer>` must not block first paint. Render a static poster (a WebP still of the scene) immediately, swap to the live viewer only after the script's load event.
- Respect `prefersReducedMotion()` from `components/reveal/reveal-engine.ts`: if it returns true, render the poster only and never load the viewer.
- Bail out below the `lg` breakpoint. No Spline on mobile.
- Art direction: wireframe or matte, gold on navy, slow idle rotation, no gloss, no bloom, no environment reflections. If the scene reads glossy, it is wrong for this site.

Derik supplies the `.splinecode` URL and the poster image. Until then, keep the dashed placeholder frame from `Home Redesign.dc.html` behind an env flag so the layout is testable.

## Step 3 — Work index (option 1f, "Evidence column")

Files: `app/work/page.tsx`, plus a new `components/case-study-index-row.tsx`.

Do not modify `LogRow`. The resume page shares it. Build a sibling row component.

Row grid: `4ch 1fr 340px`, `column-gap: 32px`, `padding: 30px 16px`, separated by hairlines exactly as `LogList` does. Column one is the entry number in mono at `--primary` 50% opacity. Column two is company · years (mono, uppercase), then title at `text-[1.35rem] leading-[1.22] font-bold text-primary` in dark mode, summary at `max-w-[56ch]`, then stack badges. Column three is the evidence block.

Evidence block, two variants keyed off whether the case study has images:
- **Has images:** a 2-up grid of `aspect-[3/2]` `object-cover` thumbnails, `gap: 6px`, wrapped in `[data-preview]` / `[data-preview-frame]`, with a mono caption in `--primary` below stating the real count ("45 images · 5 shipped titles").
- **No images:** a bordered block with a diagonal stripe background `repeating-linear-gradient(135deg, color-mix(in oklab, var(--primary) 5%, transparent) 0 7px, transparent 7px 15px)`, holding one large figure at `text-[34px] font-black text-primary`, a mono label, and a mono note naming why there is nothing to show ("Under NDA. Figures only").

Derive the thumbnails from the existing gallery data in `lib/case-study-galleries.ts` (first two images of the first gallery, or `cover` where one is defined) so nothing new is authored. Derive the figure block from `lib/case-study-highlights.ts` (first highlight). Extend `CASE_STUDY_HIGHLIGHTS` to cover `nutrien-bonsai` if it still has no entry, per the note already in that file.

Also update the `FieldHeader` on this page: title stays "Six case studies", but rewrite the description to name the split honestly. Three carry real screenshots, three are under NDA and carry the figures, and both are the point. Exact copy is in `Work Index.dc.html`, `1f`.

## Step 4 — Case study detail template

File: `app/work/[slug]/page.tsx`. This is the largest change. Reference `Case Study Detail.dc.html`, option `1g`.

**4a. Content model.** Add three optional Long text fields to the Contentful `caseStudy` type: `problem`, `approach`, `outcome`. Map them in `lib/contentful.ts` as `string[]` the same way `body` is mapped. Keep `body` and keep rendering it as the fallback when `problem` is absent, so the five unrewritten studies keep working while Derik migrates them one at a time. Do not delete `body`.

**4b. Page shell.** Change the container to `grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-x-14 items-start`.

**4c. Breadcrumb bar.** New full-width strip directly under the nav, above the content container: `border-b border-border`, background `color-mix(in oklab, var(--primary) 4%, transparent)`, `py-3`. Left side: `Work` (link, `--primary`) / `Case study NN of 06` / current title, all mono `10.5px` `tracking-[0.1em]` uppercase. Right side: six `22px × 2px` bars, the current one `bg-primary` and the rest `bg-border`. Index and total come from the `allCaseStudies` array the page already fetches for prev/next. No new data.

**4d. Sticky rail.** New `components/case-study-rail.tsx`, rendered in column one, `sticky top-[76px]`. Mono heading `All case studies //`, then all six as rows separated by hairlines: number, company (mono uppercase), short title. The current entry renders number and company in `--primary` and its title in `foreground`; the others use `--primary/45` and `.text-fg-50` / `.text-fg-60`. Foot the rail with a mono `← All work` link. Wire `useHoverFx` on each row so it matches the rest of the site's hover grammar. Hide the rail below `lg` and keep the existing `All work` back-link visible there instead.

**4e. Title block.** Add a `text-[12px] tracking-[0.22em] uppercase text-primary` eyebrow reading `Case study NN` above the company line. Bump the h1 to `text-[46px] leading-[1.04] tracking-[-0.025em]`. Collapse company, role, and period onto one mono meta line separated by middots, and shorten the role string for display (`Lead UX Designer → Principal Product Owner`) while keeping the full `role` field intact in Contentful.

**4f. Three movements.** Replace the flat `cs.body.map()` prose block with three sections, each a `grid grid-cols-[13ch_1fr] gap-x-8` where column one is a sticky-feeling label stack (mono `11px` `tracking-[0.16em]` uppercase `text-primary` reading `01 Problem` / `02 What I did` / `03 Outcome`, plus one decorative shape from the existing set) and column two is the content at `max-w-[68ch]`.

- **Problem** takes an `h2` at `text-[26px]` naming the stakes, then the `problem` paragraphs at `text-[16.5px] leading-[1.75]`.
- **What I did** renders `approach` paragraphs, and supports optional `h3` subheads at `text-[20px] font-bold text-primary`. Simplest encoding: a paragraph that starts with `## ` becomes an h3. Also support one pull-quote per case, a paragraph starting with `> `, rendered as `border-l-2 border-primary pl-[22px] font-display text-[22px] leading-[1.4] font-medium text-foreground`.
- **Outcome** renders one framing paragraph, then the existing `CaseStudyHighlights` grid, restyled with the same diagonal stripe background used in step 3 so the figures read as evidence rather than stat cards. Galleries, when present, render inside this movement above the framing paragraph.

Sections are separated by hairlines. `CaseStudyHighlights` and `GameUIGalleries` move inside movement 03; do not leave them as siblings of the body.

**4g. Prev/next.** Keep `CaseStudyNav`. Add the sibling's index number to each direction label (`← Previous · 06`, `Next · 02 →`).

**4h. Fix the shipped TODO.** `state-farm-cx-patent-tool`'s last body paragraph starts with `TODO (Derik)` and is currently rendering to production as a dashed muted box. Replace it in Contentful with one plain sentence reconciling the patent's public title with the case description. Draft: "The patent is filed as Systems and methods for supporting a testing environment for a website. That testing environment is what powered the CX research described here." Then delete the `isTodo` render branch from the page so no future TODO can ship.

## Step 5 — Contact page

Files: `app/contact/page.tsx`, `components/contact-form.tsx`. Reference `Contact.dc.html`.

Container becomes `grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-x-[72px] items-start`. Form stays in column one at its current `62ch` measure. Rewrite the `FieldHeader` description to "This form sends a real email. No third-party widget, no mailto, no inbox I forget to check."

Column two is a new `components/transmission-spec.tsx`: a bordered panel, hairline-divided rows, each a `grid grid-cols-[8ch_1fr]` of mono key plus `--primary` value plus one line of detail. Rows: Endpoint / `POST /api/contact`, Transport / AWS SES, Spam / Honeypot field, Limits / 200 & 5000 chars, Storage / None. Read the real values out of `app/api/contact/route.ts` and the form's own `maxLength` props rather than copying my numbers. If anything in the spec panel is not literally true of the implementation, fix the panel, not the implementation.

Foot the panel with mono links to LinkedIn and the resume PDF.

In `contact-form.tsx`, add three prompt chips above the textarea (About the role / About the stack / Just saying hello). Clicking one sets the textarea to a short opener. Make the textarea controlled by that state. Chips are `Badge variant="outline"` with `useHoverFx` so they match everything else. Leave the honeypot, the API call, the status states, and the success message exactly as they are.

---

## Order and verification

Do the steps in order. After each one, run `npm run build` and confirm no type errors, then check the page in dev at 1440px, 1024px, and 375px.

Two things to verify specifically, because they are what makes this site good and are easy to break:

1. **First paint.** The reveal engine chunks text on mount. Any new section must resolve within its 380ms budget and must not be visible pre-reveal as unstyled text. Hard-reload each changed page and watch it, do not assume.
2. **Light mode.** Every change above was designed against dark. Toggle to light on every changed page. Watch for the `dark:text-primary` accent-title pattern in `LogRow` and repeat that discipline in the new row component, or titles will disappear against hover fills.

Do not add a dependency other than `@splinetool/viewer`. Do not restructure `components/reveal/*`. Do not reformat files you are not otherwise changing.
