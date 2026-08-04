# DESIGN.md — portfolio-next (work.derikschneider.com)

Extracted from the live source (not guessed) on 2026-08-03. Written to be pasted directly into Claude Design as project context.

---

## 1. Project brief

**What this is:** a single-purpose work-sample site, not a general portfolio. It exists to support one specific internal job application — a Lead Full Stack Engineer posting at Capital One — and its entire pitch is "every piece of the stack on this page is real and running in production on this domain." The hero copy says so explicitly. The footer reinforces it ("Built with Next.js · Deployed on AWS Amplify"). Nothing on the site is a mockup or a static export; it's a live Next.js app hitting a real Contentful CMS, deployed through a real CI pipeline, with a real working contact form backed by AWS SES.

**Audience:** primarily one hiring manager/team evaluating an internal move. Secondarily, anyone else who lands on it as a general portfolio.

**Tone/positioning:** the whole point is proving two things at once — "I design" and "I write production code" — in a single artifact, rather than picking one. The visual language backs this up: it reads like a technical field-report or spec sheet, not a marketing site. Restrained, dossier-like, deliberately unglamorous in a way that itself signals engineering seriousness.

**Content ownership:** all page copy comes from Contentful (case studies) or hardcoded content files (`lib/experience.ts`, the About/Contact page bodies) — not a CMS-agnostic template, it's built specifically around Derik's own real career content.

---

## 2. Style guide

### Design system name
Internally called **"Field Report"** (per the code's own comments) — dated 2026-08-03 in its current form.

### Color
Two themes, one shared accent pair (deliberately identical between light/dark, not separately tuned):

| Token | Light | Dark |
|---|---|---|
| Background | `#fcfcfc` (near-white) | `#0b0d29` (deep navy) |
| Foreground/ink | `#0b0d29` (dark navy — light mode's *text* reuses dark mode's *background* color, so the two themes read as literal inverses of each other) | `#c7cbd3` (pale grey-blue) |
| Card/popover | `#ffffff` | `#121535` |
| Primary/accent | `hwb(41 22.75% 9%)` ≈ **`#e8b23a`**, a warm gold/amber — same value in both themes | same |
| Secondary accent | `#ed3c28`, a bright vermilion red — **reserved exclusively for a small "crosshair/registration mark" icon**, never used as a UI color (buttons, links, backgrounds) | same |
| Muted text | `#737481` | `#868b9c` |
| Border | `rgba(11,13,41,0.14)` | `rgba(199,203,211,0.16)` |

The gold accent is the only interactive/brand color — links, active nav state, button fills, focus rings, cursor caret, hover-invert backgrounds all key off it. Red is intentionally rare (at most once or twice per page) and purely decorative.

### Typography
- **Display/headings:** Helvetica Neue where installed, falling back to Space Grotesk (Google Font, weights 300–700, geometric sans with a slightly technical/mono-adjacent character). Stack is `"Helvetica Neue", var(--font-space-grotesk), sans-serif` — macOS renders Helvetica Neue, Windows renders Space Grotesk. Bare `Helvetica` is deliberately excluded (Windows substitutes it with Arial and never reaches the web font). Hero name and page H1s use it at `font-black`/`font-extrabold` — very heavy weight, tight tracking (`-0.02em`), uppercase on the hero.
- **Labels/eyebrows/nav/meta/badges:** JetBrains Mono, uppercase, wide letter-spacing (`0.06em`–`0.14em`), small size (10.5–11px) — this is the site's second voice, used everywhere for "system labels" (section eyebrows like `Work //`, nav links, stat labels, case-study meta).
- **Body copy:** falls back to the same Space Grotesk-first sans stack, relaxed leading, max-width measures (46–90ch) for readability.
- No serif anywhere.

### Shape & spacing
- Border radius is tiny — `3px` base token, scaled up only slightly for larger radii (`sm`/`md`/`lg`/`xl` etc. are all multiples of that same 3px). Everything reads sharp/technical, not soft.
- Max content width `1180px`, centered, `24px` (`px-6`) side gutters.
- Hairline dividers (1px, low-opacity) mark section boundaries throughout — a recurring structural device, not decoration.

### Iconography / decorative marks
A small hand-built SVG shape vocabulary, not an icon library: Triangle, Crosshair, CrosshairOpen, HalfCircle, HalfCircleC, Square, Trapezoid, Circle, Parallelogram. Gold outline or gold fill for most; the plain Crosshair/CrosshairOpen are red and used as rare "registration marks." Pinned to section corners (`shape-corner`) or sit inline next to labels. Purely decorative (`aria-hidden`), each one participates in the scroll-reveal system (see below).

### Components
Built on shadcn/ui + Radix primitives (Dialog for mobile nav and lightbox), Tailwind v4, `class-variance-authority` for variants. Buttons are square-cornered, monospace, uppercase, bold, wide-tracked — deliberately un-soft, matching the rest of the type system rather than a typical rounded SaaS button.

---

## 3. Motion & animation system — full technical detail

**No animation library is used** (no GSAP, no Framer Motion, no CSS animation framework beyond Tailwind's own utilities). The entire scroll-reveal/hover system is a **hand-built, framework-agnostic vanilla TypeScript engine** (`components/reveal/reveal-engine.ts`), with a thin React wrapper (`reveal-group.tsx`, `use-hover-fx.ts`, `hoverable.tsx`) that only owns mounting/teardown via `useEffect`. This is a genuinely distinctive, custom-built system worth describing precisely:

**Chunk-reveal (text):** Any element with `data-reveal="text"` gets its text content split into randomized-length "chunks" (mix of mostly-longer, occasionally-shorter pieces — not fixed-size), each wrapped in its own `<span>`. On scroll into view (via `IntersectionObserver`, 15% threshold) or immediately for above-the-fold content, chunks fade in with a **blur-to-sharp** transition (`opacity 0→1`, `blur(3px)→blur(0)`), in **shuffled random order** (not left-to-right), staggered so the *entire section* always finishes resolving within a hard **380ms budget** regardless of how much text it contains — more chunks means a smaller per-chunk stagger gap, not a longer total reveal. A visually-hidden (`sr-only`) copy of the real text sits alongside for accessibility; the animated version is `aria-hidden`.

**Hairline-reveal (dividers):** Section-divider lines (`data-reveal="line"`) rebuild from one solid div into 4–13 flex-grow `<span>` segments (width randomized per segment) and reveal via `scaleX(0.3)→scaleX(1)` + fade — reads as a dashed line assembling itself, not a simple width-grow.

**Shape-reveal:** Decorative SVG accents (`data-reveal="shape"`) scale in from 0.55→1 with a fade.

**Hover interactions (desktop):** On mouseenter, interactive elements (nav links, buttons, case-study rows) get: (1) a single sharp opacity "blink" flash on their title/label (3 alternations in 0.2s), and (2) a **text-scramble/glitch effect** on body text — random character substitution (letters/numbers/symbols) cycling for a few ticks before resolving back to the real text, then repeating on a fresh random 4–8s interval for as long as the pointer stays over the element (not a fixed metronomic loop). Reads as a terminal/hacker-style flicker. Case-study rows additionally invert to a solid gold background with dark-navy text on hover.

**Cursor caret:** A blinking `|` caret sits after the hero name, CSS `steps()` animation, terminal-style.

**Theme transition:** Switching light/dark cross-fades `background-color`/`border-color`/`color` on every element (0.4s ease), deliberately placed in Tailwind's base layer so it doesn't fight component-level transition utilities (hover slides, reveal fades) — both apply correctly at once.

**Route transitions:** Deliberately minimal — no full-page transition animation. A per-route `loading.tsx` shows a small pulsing gold square + "Loading" label (`route-loading-pulse`, 1.1s ease-in-out infinite) during navigation/data-fetch, nothing more elaborate.

**Mobile nav:** Radix `Dialog` sliding up from the bottom (slide + fade, 200–300ms), not a custom animation.

**Accessibility:** every single motion above is fully disabled under `prefers-reduced-motion: reduce` — content becomes immediately visible/static rather than degrading gracefully, and it's checked in JS (`prefersReducedMotion()`) as well as CSS media queries.

**Hover-scale on images:** Case-study gallery thumbnails scale slightly (1.05x) and lift (`-translate-y-1`) on hover, standard CSS transitions, 300–500ms.

---

## 4. Page-by-page content inventory

*(What each page contains and why — not the literal copy.)*

### `/` — Home
Hero: role title + one-line positioning statement establishing "this is a real work sample, not a mockup," oversized black display-type name with a blinking cursor. CTA row: primary button to `/work`, secondary text link to `/resume`. A 4-stat strip (years experience, design systems shipped, shipped game titles, patents held — all real, verifiable numbers). A tech-stack badge row (the actual technologies this site is built with). A "Selected work" preview: 3 of the 6 case studies as compact rows, with a "See all 6 →" button to `/work`.

### `/work` — Case study index
Section header (eyebrow/title/description framing: "platform engineering, design systems, and shipped game UI, reverse-chronological, most under NDA"). Full list of all 6 case studies as rows (company, date range, title, one-line summary, stack tags) — same row component used on the resume page.

### `/work/[slug]` — Individual case study (×6, dynamic route)
Shared layout: back-link to `/work`, company+role eyebrow, case title, date range, stack badges, then an optional image gallery section (varies per case, see below), then long-form narrative body paragraphs, then an optional patent citation (linked + PDF), then prev/next case-study navigation (circular).

The six cases, and what each is *about* (not imagery-heavy vs. text-only is meaningfully different per case):
1. **Action Platform (Discover → Capital One)** — most recent/current role; platform engineering, design-system migration, production data-integrity work during account migrations. Text-only, no image gallery.
2. **Aurora Design System (Novant Health)** — building an icon system and a physician-finder UX flow from scratch. Has a real 5-image gallery: icon system cover, design process, a research board (recognition/info-scent/aesthetics testing), and two wireframe-flow stages.
3. **Bonsai (Nutrien Ag Solutions)** — early design-system documentation and cross-team adoption work. **Deliberately no images** (removed on purpose, not missing by accident — likely NDA-driven).
4. **Production React/Redux (Agrible → Nutrien)** — engineering-focused case, sustainability/field-data tooling. Text-only.
5. **Volition/NetherRealm game UI** — by far the largest gallery (~45 real screenshots) spanning Saints Row 2, Red Faction: Armageddon, Mortal Kombat (2011), Mortal Kombat VITA, Injustice: Gods Among Us, and unreleased Batman: Arkham Lockdown icon work. Presented as a "fanned stack" preview card (3 slightly-rotated overlapping thumbnails) that opens a full lightbox with prev/next, keyboard nav, and a scrollable thumbnail strip.
6. **State Farm CX patent tool** — the case tied to a real US utility patent (10,002,393). 2 images shown side-by-side (not the fanned-stack style, since there are only 2) — both explicitly watermarked "RECREATED EXAMPLE" since the real tool can't be shown directly.

### `/about` — Personal narrative
Long-form first-person paragraphs: framing as "a designer who codes / engineer who paints his own assets," a career-highlights paragraph naming shipped games and design systems plus the patent, a most-recent-role paragraph (Capital One specifics), a technical-toolkit list, and a closing statement of what kind of role he's looking for next — ending in a CTA to `/contact`.

### `/resume` — Full work history
Header with a "Download PDF" button (real PDF file). Full reverse-chronological work history as rows — 18 entries back to 1999/2000 (design/dev roles across game studios, ag-tech, health, finance, plus early freelance/agency work) — flagship roles link out to their full case study, others are line items only. A skills badge list at the bottom.

### `/contact` — Contact form
Short framing text, then a real working form (name, email, message + a hidden honeypot field for spam) that POSTs to an API route backed by AWS SES — an actual email send, not a mailto link or a form service.

### Global chrome (every page)
**Nav:** fixed, translucent/blurred top bar. Wordmark ("D·SCHNEIDER" / "DS" on mobile) is hidden on Home (the giant hero name already carries identity there) and flickers in via the reveal engine when arriving on any child page. 4 nav links + theme toggle; collapses to a hamburger → bottom-sheet dialog under 540px.
**Footer:** copyright line + "Built with Next.js · Deployed on AWS Amplify."
**Dev-only:** a "Color Lab" panel (not shipped to production) for live-tuning the accent hue/saturation/brightness during development.

---

## 5. Imagery direction for Claude Design

**The site currently uses zero photographic or illustrated imagery of any kind** — no hero photo, no stock imagery, no generated art, no gradients/blobs. Every visual on the page is either (a) real screenshots from actual shipped work (the game-UI galleries, the watermarked "recreated example" mockups) or (b) pure typography/geometry (the shape-accent system). This restraint is a deliberate, load-bearing part of the brand — it's part of what makes the site read as a credible engineering artifact rather than a marketing page. Keep that in mind before generating anything: the honest answer to "what imagery does this site use" is "almost none, on purpose."

That said, here's where generated imagery could plausibly extend the system without breaking it:

**Full-page/section background textures** (if ever wanted): stay abstract and technical, never photographic. Good directions: fine blueprint/graph-paper grid at very low opacity, subtle topographic contour lines, oscilloscope/waveform trace patterns, halftone/dot-matrix texture, or a faint scanline/noise overlay on the dark navy background. All should read as "engineering schematic," not "marketing gradient mesh." Keep contrast extremely low — these would be texture, not focal content — and gold/red should stay reserved for real UI accents, not bleed into a busy background.

**Case-study imagery, per case:**
- **Novant Health Aurora** — if extending beyond the existing 5 images, more "icon research board" style visuals fit: grids of small icon studies with annotation marks, a clinical/healthcare-adjacent but clean palette.
- **Volition/NetherRealm** — already has ~45 real screenshots; no generated imagery needed or appropriate here (it would compete with real shipped work). If ever asked to mock up *placeholder* game UI in this style, match each title's real aesthetic: Saints Row 2 = gritty open-world urban HUD, Mortal Kombat/Injustice = fighting-game menu chrome and character-select screens, Red Faction = sci-fi industrial/military HUD.
- **State Farm** — clean enterprise dashboard/tool UI, consistent with the existing two "recreated example" mockups (explicitly labeled as recreations, not real proprietary UI) — any extension should keep that same watermark/labeling convention for legal clarity.
- **Action Platform, Bonsai, Agrible/Nutrien** — these are deliberately text-only. Don't generate imagery for them; that omission is intentional (NDA-driven), not a gap to fill.

**Decorative/accent generation:** the shape vocabulary (triangle, crosshair, half-circle, square, trapezoid, circle, parallelogram) is simple hand-coded SVG, already complete — Claude Design shouldn't need to generate new decorative marks, just stay aware of the existing set (gold outline/fill, sparing red crosshair) if extending the system.

**Overall instruction for Claude Design:** default to *not* adding imagery. If a specific request calls for it, keep it abstract/textural (backgrounds) or real-feeling/documentary (case-study "evidence" shots, watermarked if recreated) — never soft, illustrative, or stock-photo-like. The gold/navy/red-sparingly palette and the 3px-radius sharp-cornered, monospace-labeled, hairline-divided structure should govern any new surface.

---

## 6. Tech stack reference

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui + Radix UI primitives · Contentful (case-study content) · AWS SES (contact form) · AWS Amplify (hosting/CI-CD) · GitHub Actions-adjacent Amplify build pipeline. Deployed at `work.derikschneider.com`.
