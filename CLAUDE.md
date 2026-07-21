# portfolio-next

Job-application work-sample site for Derik Schneider, built specifically to demonstrate the stack named in a Capital One Software **Lead Full Stack Engineer** posting: Next.js (App Router), TypeScript, Tailwind, Contentful, CI/CD to AWS. This is an **internal-move application** — Derik is currently Principal Product Owner, Action Platform UI at Capital One.

This is **not** the derikschneider.com creative-brand site (that's the sibling repo `derikschneider/vite-lit-1` — Lit/vanilla JS/Vite, deliberately React/Tailwind-free per Derik's creative-brand preference). This repo is intentionally React/Next/Tailwind because demonstrating that exact stack is the whole point.

## Key decisions (why, not just what)

- **Pinned to Next.js 15.5.x, not 16.** AWS Amplify Hosting's official Next.js support currently tops out at v15 — v16 adapter support was still in progress as of mid-2026 (tracked in `aws-amplify/amplify-js` issues #14600 / #14614). Re-verify Amplify's supported version before ever bumping past 15.x.
- **Hosting: AWS Amplify Hosting**, not S3+CloudFront. Amplify has no *verified* Next.js adapter per Next.js's own docs (only Vercel and Bun currently do — see `node_modules/next/dist/docs/01-app/03-api-reference/07-adapters/`), but it's AWS's own long-standing SSR/ISR-capable integration, and Capital One is a famous AWS-native, all-in shop, so leaning into a real AWS service (not a workaround) is the credible choice.
- **CI/CD split across two workflows on purpose:** `.github/workflows/ci.yml` owns lint/typecheck/test/build as required PR checks. `.github/workflows/deploy.yml` authenticates to AWS via **GitHub OIDC** (no stored AWS keys) and calls `aws amplify start-job --job-type RELEASE` on push to `main`. Amplify's own git-triggered auto-build is disabled so GitHub Actions is the sole deploy trigger — this is the actual "CI/CD to AWS" story, not just Amplify's default webhook.
- **Contentful-driven pages use classic ISR** (`export const revalidate`), not Next 16's newer opt-in Cache Components model (`cacheComponents: true`). Deliberate: avoid stacking a brand-new caching primitive on top of an already-unverified Amplify adapter.
- **Contact form** is a custom Route Handler → AWS SES (`@aws-sdk/client-sesv2`), not a form SaaS — more AWS surface area to speak to.
- **Domain:** `work.derikschneider.com` — a subdomain, kept separate from the root creative-brand site.

## Content

Five case studies drawn from Derik's career history: Capital One Action Platform (automated testing + production data integrity), Novant/Nutrien design systems (Aurora + Bonsai), Agrible/Nutrien production React/Redux, Volition/NetherRealm shipped game UI, and the State Farm CX patent tool. Most source work is under NDA — **only the game UI case study has real screenshots**; the rest are description-only or reference public artifacts (e.g. US Patent 10,002,393). Don't add visuals to the other entries without checking first.

@AGENTS.md
