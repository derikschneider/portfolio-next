# Resume audit — 2026-08-05

`Derik_Schneider_Resume_CapitalOne.txt`, checked against the site's own facts:
the Contentful case studies, `lib/experience.ts`, and `linkedin-experience.md`
(Derik-confirmed dates and content, 2026-07-21).

Same standard applied as the site audit: phrasing may differ freely, but a
claim must not contradict what the site says or overstate what happened.

**Already fixed:** the Novant Health bullets have picked up the corrected
Aurora story ("rebuilt a previously-ported design system into real Figma
components… days to under an hour"). That section now matches the site.

---

## RESOLVED 2026-08-05 — the resume was right, the site was wrong

### 1. Bonsai: the resume and the site describe two different jobs

**Derik's answer: the resume is accurate. The site and LinkedIn were both
underselling this role, and have been updated to match the resume.**

- He did build the documentation site. The Bonsai gallery on the case study
  is that site — image 1 is nutrien.design live, image 2 is his own full-page
  design comp for it. The claim now sits directly above its own evidence.
- "Co-led the inception and architecture" is the right description. There was
  a design lead above him and the framework was hers; co-leading is still the
  honest account of his part, and "contributed… within a design lead's
  established framework" was not.
- ZeroHeight legitimately appears in both roles, in opposite directions:
  custom site → ZeroHeight at Nutrien, ZeroHeight → custom platform at Novant.
  Not a copy error. Don't deduplicate them.

Changed: the Contentful entry (title, summary, body), the resume-page blurb,
the About page, the gallery description, and the UI-systems stat comment.
LinkedIn replacement bullets are in `linkedin-updates-2026-08-05.md` §3.

**Not carried across:** Derik's own read on how credit was split between him
and the design lead. A public case study that grades a former colleague reads
badly to exactly the audience this site is for. The copy claims his
contribution and stops there.

<details>
<summary>Original finding, kept for the record</summary>

| | |
|---|---|
| **Resume** | "**Co-led the inception and architecture** of the Bonsai Design System, then **designed and built its documentation website solo**, writing the front-end code, responsive layout, and navigation **before porting the content into ZeroHeight** as the system matured." |
| **Site / LinkedIn source** | "Contributed to the early development… as part of the core platform team, authoring initial system documentation and assisting on component builds. Shaped component direction through user research and design feedback, **working within a design lead's established framework**." |

Three separate gaps:

- **"Co-led the inception and architecture" vs "within a design lead's
  established framework."** These are not the same seniority. One says he set
  the direction; the other says he worked inside someone else's.
- **"Designed and built its documentation website solo."** Nothing on the site
  or in the LinkedIn source says he built a documentation *website* at
  Nutrien — only that he authored the system's initial documentation.
- **ZeroHeight.** In every other source, ZeroHeight belongs to **Novant /
  Aurora** ("documented the system's evolution in ZeroHeight, then prototyped
  a custom internal documentation platform to replace it"). The resume has it
  at Nutrien.

Read together, the resume looks like it moved the Novant documentation work
onto the Bonsai role and promoted "contributed" to "co-led."

This is the same class of problem as the Aurora "from scratch" line, in the
opposite direction, so it can't be resolved by guessing. **Which is right?**

- If the resume is right, the site and LinkedIn are underselling Bonsai and
  both need updating.
- If the site is right, the resume overstates and needs pulling back.
- If both are partly right (e.g. he co-led *documentation* architecture but
  not the system's), the wording needs to separate the two.

</details>

---

## Derik's rulings, 2026-08-05 — how the two acquisitions get told

He confirmed all four open items below. The through-line: **his history
contains two acquisitions, and both are now told the same way — name both
employers, name the transition date, don't collapse either one.** Applying
that rule consistently is what stops a reader wondering which parts are being
smoothed over.

| | Discover → Capital One | Agrible → Nutrien |
|---|---|---|
| Boundary | **Legal Day 1, May 2025** | Acquisition closed Aug 2018 |
| Site | Discover Jan 2024–Apr 2025, Capital One May 2025–present | Agrible Mar 2015–Aug 2018, Nutrien Aug 2018–Apr 2019 |
| Resume needs | Split the two employers | Name both on one line |

**On the Agrible side Derik's note was "I did join Nutrien in 2018, but I was
still doing Agrible things — there wasn't a clean break, it could swing either
way, we just need to be consistent."** The call: keep the split. It matches
employment records (after Aug 2018 the employer legally was Nutrien), it's
what the site already does, and it's the same shape as the Capital One
transition — which is the consistency that matters most. The "no clean break"
part is already carried in the case study body, which says he carried on with
the same product team after the acquisition.

**On the site there is no Capital One gap** — `lib/experience.ts` runs
Discover Jan 2024–Apr 2025 straight into Capital One May 2025–Present. The gap
is in this resume only, created by finding #3 below. What the site gained
today is the *reason* the boundary sits in May: Legal Day 1 is now named in
the case study body and period, so the resume and LinkedIn have one fixed date
to agree with instead of each rounding it differently.

---

## High — factual, and checkable against Capital One's own HR records

### 2. The Discover role is labelled Capital One

> Lead UX Designer, Action Design Team - **Capital One** Jan 2024 - Mar 2025

That role was at **Discover**. Capital One acquired Discover in 2025 and the
Action platform work carried across. The site, LinkedIn, and
`linkedin-experience.md` all split the two employers; only this resume merges
them.

This matters more here than anywhere else, for three reasons: it's an
**internal Capital One application**, so HR can see the actual entity history;
it makes the resume contradict the LinkedIn profile a recruiter will open
beside it; and as written it shows two consecutive Capital One roles with an
unexplained one-month gap between them.

**Replace the header line with:**

> Lead UX Designer, Action Design Team - Discover (acquired by Capital One, Legal Day 1 May 2025) Jan 2024 - Apr 2025

Confirmed by Derik 2026-08-05: he started at Discover, Capital One bought
them, and Legal Day 1 was in May — so May is the correct cut-off, and both
roles keep their own employer name.

### 3. Both dates on that transition are a month off

| | Resume | Actual |
|---|---|---|
| Discover role ends | Mar 2025 | **Apr 2025** |
| Capital One role begins | Apr 2025 | **May 2025** |

The resume shifts both boundaries back by one month, which is what creates the
apparent gap. Fix both; the Principal Product Owner line becomes:

> Principal Product Owner, Action Platform UI - Capital One May 2025 - Present

### 4. The Agrible → Nutrien acquisition erases eight months of employment

> Front End Developer - **Agrible, Inc.** Mar 2015 - **Apr 2019**

Agrible employed him Mar 2015 – **Aug 2018**. From Aug 2018 – Apr 2019 the
employer was **Nutrien Ag Solutions** (same product team, same title). The
bullet does say "through the company's acquisition by Nutrien," but the header
line still claims Agrible as the employer for eight months after it stopped
being one — and it makes the following entry look like he joined Nutrien in
2019 when he'd been there since 2018.

The site now states this relationship explicitly on both case studies. Match it:

> Front End Developer - Agrible, Inc. → Nutrien Ag Solutions Mar 2015 - Apr 2019
> Production React/Redux development | Agrible acquired by Nutrien, Aug 2018 | Urbana-Champaign, IL, then Remote

---

## Medium

### 5. "A decade architecting design systems" is not supported

From the summary. Counting the actual design-system roles as of Aug 2026:
Bonsai (Apr 2019–Jun 2022, 3.2y) + Aurora (Jun 2022–Jul 2023, 1.1y) +
Discover/Capital One (Jan 2024–present, 2.6y) ≈ **seven years**, not ten.

It only reaches a decade if the 2007–2012 game UI work counts — which the site
*does* count, but as "UI systems," not "design systems," and the resume's
phrase is "design systems alongside engineering teams," which reads as the
Figma/tokens kind. Two clean fixes:

- **Conservative:** "…including four years writing production React and Redux
  and seven years architecting design systems alongside engineering teams."
- **Keeps the decade, matches the site's own "5 UI systems shipped" stat:**
  "…and a decade architecting UI and design systems, from shipped game
  interfaces to enterprise component libraries."

### 6. Four game titles listed; everything else says five

> Shipped: Mortal Kombat (2011), Injustice: Gods Among Us, Saints Row 2, Red Faction: Armageddon

**Mortal Kombat VITA** is missing. The site's case study is titled "Shipped UI
across five titles, two studios," the homepage stat says 5, and the About page
was corrected to five this same day.

Derik, 2026-08-05: "It is 5 game titles. I don't always throw in MK VITA
because it was a stupid small project — but it does factually count, people
just don't care about that release." So: **include it, but list it last.**
The About page now orders the list that way, since leading with VITA spends
the reader's attention on the weakest item. Same treatment here:

> Shipped: Mortal Kombat (2011), Injustice: Gods Among Us, Saints Row 2, Red Faction: Armageddon, Mortal Kombat VITA

### 7. The 14-day tool: "prototype" here, "tool" on the site — RESOLVED

Both were half-right. Derik: he built the prototype, and it was turned into a
tool that shipped. The site now states both halves, so neither document has to
choose:

> …a working prototype for a 14-day weather and field workability tool — trafficability status for every field in an operation, two weeks out. It reached 87.5% task success in user studies and went on to ship as a product.

The resume's current bullet is accurate as far as it goes but stops at the
prototype, which undersells it. Worth adding "and shipped as a product."
("Trafficability" vs "workability" is cosmetic — the site uses workability for
the tool and trafficability for what it displays, which is how the product's
own screens word it.)

---

## Low — worth a look, not errors

### 8. Health Alliance Medical Plans (Apr–Nov 2012) is omitted entirely

It's on the site's resume page. Dropping it from a one-page resume is a normal
call, but it leaves an eight-month hole between NetherRealm ending Mar 2012 and
State Farm starting Dec 2012. Either fold it into the "Earlier roles" line or
accept the gap knowingly.

### 9. "User Interface Artist and Developer"

The actual title at both studios was **User Interface Artist**. "and Developer"
is defensible given the Lua integration work the bullet describes, but it's a
title embellishment on a document where every other title is exact.

---

## Not problems — checked and consistent

- US Patent 10,002,393 — matches everywhere.
- "Four years writing production React and Redux" — Mar 2015–Apr 2019 is 4y1m,
  and matches the site's own "4 years" callout.
- Next.js / TypeScript / Tailwind / Contentful / CI-CD summary line — matches
  the homepage stack exactly.
- State Farm, Volition/NetherRealm, and Capital One PPO bullets — all
  consistent with the site, with resume-appropriate trimming.
- "Django backends" and "MySQL" — extra detail beyond the site, not conflicting.
- Novant bullets — already corrected, match the site.

**One parity gap in the other direction:** the resume carries a Nielsen Norman
UX Certification and an eCornell Product Marketing Certificate that appear
nowhere on the site. The site's `/resume` page has a Skills block but no
Education/Certifications section. Worth adding.
