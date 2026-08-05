# LinkedIn updates to make — 2026-08-05

Ready-to-paste replacement text for Derik's LinkedIn profile, written after a
storytelling audit of the whole site found two claims that were wrong or
misleading. The site has been corrected; LinkedIn hasn't. Anyone reading both
will see the mismatch, so these should go up before the next resume PDF is
generated from them.

Sources of truth for the corrections: Derik directly (2026-08-05), plus
`linkedin-experience.md`, which already had the employer split right.

**Numbers are deliberately unchanged.** "Under an hour" stays "under an hour"
— Derik chose the published figure over the sharper "half an hour" he used in
conversation, so the site, LinkedIn, and the resume PDF all agree.

---

## 1. About section — replace entirely

The two problems: it claims Aurora was architected "from scratch" (it was an
inherited first-pass system he rebuilt), and it credits the Discover work to
Capital One (the Sketch→Figma migration and Action design leadership happened
at Discover, before the acquisition).

> I'm a designer who writes production code and an engineer who paints his own assets. For 25 years I've worked the seam between design and development, which means teams stop losing things in translation when I'm in the room.
>
> I've shipped UI for Mortal Kombat (2011), Mortal Kombat VITA, Injustice: Gods Among Us, Saints Row 2, and Red Faction: Armageddon. At Novant Health I inherited Aurora as a first-pass design system — a previous design ported over, with none of the structure underneath it — and rebuilt it head to toe into true Figma components on re-architected foundations, taking page assembly from days to under an hour. Earlier, as part of the core platform team building Bonsai at Nutrien Ag Solutions, I authored the system's initial documentation, contributed to component development, and championed its adoption across other design teams. I hold US Patent 10,002,393 for a customer experience insights tool I designed and helped engineer at State Farm.
>
> At Discover, I led design for the Action agent servicing platform, migrated the team's design system from Sketch to Figma, and produced narrative presentations on our agent servicing and IVR/messaging systems, editing call-recording audio, hand-animating sequences in After Effects, and building the layouts in Figma, working directly with senior product managers and directors to shape how they told their stories. When Capital One acquired Discover the Action work came with it, and I moved into a Principal Product Owner role, where I built a 101-case automated testing suite, validated production migration events, and coordinated data integrity work across engineering teams.
>
> The technical side of my toolkit: React, Redux, JavaScript, HTML/CSS, Lua, REST APIs, MySQL, Figma, and enough systems thinking to have designed asset pipelines that other studios' teams adopted.
>
> What I'm looking for: roles where the design-to-code gap is the real problem to solve. Design systems, UX engineering, technical product design, game UI. If that sounds like your team, let's talk.

Changes from the current version:

1. Added **Mortal Kombat VITA** to the title list — it was four titles, and
   everything else (resume, case study, the site's "5 shipped game titles"
   stat) says five.
2. Aurora sentence rewritten — no longer "architected from scratch."
3. "Most recently at Capital One…" split into **Discover** then **Capital
   One**, with the acquisition named as the bridge.

---

## 2. Experience → Novant Health, UX/UI Lead — replace headline + first two bullets

The current headline ("Led integration of the Aurora Design System…") is the
same underclaim in the other direction: integrating a finished system is not
what happened. The remaining three bullets (training, ZeroHeight, offshore
liaison) are accurate — leave them.

**Headline:**

> Rebuilt an inherited first-pass design system into true Figma components with re-architected foundations, then led Aurora's integration across web products.

**Bullet 1 — new, add above the existing ones:**

> Rebuilt a previously-ported design system into real Figma components, re-architecting the styles, effects, and foundational elements underneath, so a page could be assembled by drag and drop instead of rebuilt by hand

**Bullet 2 — replace the current "Cut average page layout assembly…" bullet:**

> Cut average page layout assembly from days to under an hour, a direct result of the component rebuild rather than a separate process change

**Bullet 3 — keep, unchanged:**

> Owned design tokens, grids, SVG standards, responsive behavior, and animation for Aurora, with WCAG accessibility built into components rather than patched on afterward

---

## 3. Experience → Nutrien Ag Solutions, UX Designer — replace all three bullets

Added after the resume audit. LinkedIn undersells this role in the same
direction the Novant one did, and the resume had it right: Derik co-led
Bonsai's inception and architecture, and designed and built the system's
documentation site himself — front-end code, not just the content in it. The
current bullets ("contributed to the early development… working within a
design lead's established framework") claim neither.

**Bullet 1:**

> Co-led the inception and architecture of the Bonsai Design System as part of Nutrien's core platform team, shaping component direction through user research and design feedback and contributing to component builds

**Bullet 2:**

> Designed and built the system's documentation site solo — front-end code, responsive layout, and navigation — as the place designers and engineers actually went to use Bonsai, later porting the content into ZeroHeight as the system matured

**Bullet 3:**

> Championed the system's adoption across other design teams, driving alignment on shared UI standards

**Bullet 4 — optional, currently only on the resume and the site:**

> Converted grower and sales-consultant research into a 14-day weather and field workability tool that reached an 87.5% task success rate in user studies

Note ZeroHeight will now appear under both Nutrien and Novant. That's correct,
not a copy error: at Nutrien he built a custom site and later ported *into*
ZeroHeight; at Novant he documented *in* ZeroHeight and prototyped a custom
platform to replace it. Opposite directions, two employers, both true. If a
reader is likely to see it as duplication, the Novant bullet already says
"then prototyped a custom internal documentation platform to replace it,"
which distinguishes them.

---

## 4. Optional — worth considering, not an error

The Novant bullet above and the Discover bullet ("Partnered with front-end
developers to wire the design system into the development pipeline, using
tokens, grids, and SVG standards to cut page layout time from days to
minutes") sit two roles apart and use nearly identical language for two
genuinely different wins. Both are true. But read back to back they look like
one accomplishment claimed twice, which invites a reader to discount both.

The site now separates them explicitly — Aurora's is a **design-side** win
(assembling a page in Figma), Discover's is a **dev-pipeline** win (wiring the
system into the build). Worth making the same distinction on LinkedIn. The
Discover bullet could become:

> Partnered with front-end developers to wire the design system into the build pipeline — tokens, grids, and SVG standards — cutting the time to lay out a production page from days to minutes
