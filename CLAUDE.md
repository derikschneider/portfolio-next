# portfolio-next

Job-application work-sample site for Derik Schneider, built specifically to demonstrate the stack named in a Capital One Software **Lead Full Stack Engineer** posting: Next.js (App Router), TypeScript, Tailwind, Contentful, CI/CD to AWS. This is an **internal-move application** — Derik is currently Principal Product Owner, Action Platform UI at Capital One.

This is **not** the derikschneider.com creative-brand site (that's the sibling repo `derikschneider/vite-lit-1` — Lit/vanilla JS/Vite, deliberately React/Tailwind-free per Derik's creative-brand preference). This repo is intentionally React/Next/Tailwind because demonstrating that exact stack is the whole point.

## Status (as of 2026-07-21)

**Done:** Repo scaffolded and pushed to `github.com/derikschneider/portfolio-next` (public). Next.js 15.5.20 + TypeScript + Tailwind v4 + shadcn/ui (Radix primitives, Nova preset) all in place. `.github/workflows/ci.yml` (lint/typecheck/build) is green on `main`.

**Also done — AWS account unblocked, deploy pipeline wired up and verified end-to-end:** AWS CLI configured (account `213348783077`, region `us-east-1`). Created: GitHub Actions OIDC provider (`token.actions.githubusercontent.com`) in IAM; IAM role `portfolio-next-github-deploy` scoped to `amplify:StartJob`/`GetJob`/`ListJobs`/`StopJob` on this app's ARN only; Amplify Hosting app `d1dk5gzxu5499k` (platform `WEB_COMPUTE` for Next.js SSR), `main` branch connected with `enableAutoBuild: false` (Amplify's own git-triggered builds are off — GitHub Actions is the sole trigger, per the design decision below); `.github/workflows/deploy.yml` added (OIDC-authenticates, calls `aws amplify start-job --job-type RELEASE`, polls until it succeeds/fails). Repo variables `AWS_ROLE_ARN` / `AMPLIFY_APP_ID` set via `gh variable set`. Confirmed live at `https://main.d1dk5gzxu5499k.amplifyapp.com` (200, `x-powered-by: Next.js`) after a real push-triggered deploy run. Custom domain (`work.derikschneider.com`) not yet attached.

**Gotcha worth knowing if this role/provider is ever recreated:** GitHub's OIDC `sub` claim on this account uses the newer immutable-ID format — `repo:derikschneider@239501139/portfolio-next@1307245039:ref:refs/heads/main`, not the plain `repo:derikschneider/portfolio-next:ref:refs/heads/main` most examples show. The IAM role's trust-policy condition (in AWS, not tracked in this repo) must match the ID-qualified form or `AssumeRoleWithWebIdentity` fails with a generic "Not authorized" error. If in doubt, add a debug step that decodes the actual token (`curl` the `$ACTIONS_ID_TOKEN_REQUEST_URL`, base64-decode the JWT payload) rather than assuming the claim shape.

**Not yet done:** attach the `work.derikschneider.com` custom domain in Amplify (needs a DNS record in whatever registrar/DNS host derikschneider.com uses). Phase 1 — static page shell (layout, nav, Home/About/Resume pages) and distilling Derik's career history (see Content section below) into actual case-study copy — still not started, no AWS dependency, can proceed anytime.

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
