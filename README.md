# shubham.cv

Personal portfolio of **Shubham Kumar Gupta**, focused on backend development, software development, AI platform development and agentic AI. MERN, TypeScript, Next.js and frontend tools are presented as a vibe-coding stack for AI-assisted interfaces and full-stack prototypes.

Live: [www.shubham.cv](https://www.shubham.cv)

## Current work

- **HUNT** — early-access accounts-receivable product. The public demo uses fictional records and scripted conversations.
- **Staffly** — live staffing MVP with public onboarding and an isolated demo; AI-assisted workflows with human review.
- **Chakra47** — an application and management layer for physical systems, currently in development above existing Linux, RTOS and controller software.
- **Agent Eval Harness and Contextual LLM Gateway** — agent evaluation, scoped context, durable graph updates and inference experiments.
- **Relogged and FlexFit Studio** — agent replay tooling and a full-stack gym-management application.
- **Research** — two Zenodo preprints, a second Vyaskosh manuscript in progress, and the earlier AgenticSwarm prototype.

Project descriptions separate product availability, local verification and research. Test totals and performance measurements carry their verification dates and workload scope. Historical research articles and PDFs remain available as dated artifacts.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, TypeScript, React Router |
| Styling | Global CSS and CSS custom properties |
| Diagrams | Mermaid |
| Server endpoints | Vercel functions in `api/` |
| Fonts | IBM Plex Mono with the existing Georgia/Cambria serif display stack |

## Local development

```sh
npm ci
npm run dev
```

The Vite development server serves the frontend. Server endpoints under `api/` require the corresponding deployment configuration; use `vercel dev` when working with those endpoints locally.

```sh
npm run build
npm run lint
```

## Content structure

- `src/data/projects.ts` — shared project descriptions, categories, status, links and diagrams.
- `src/components/` — homepage sections and reusable UI.
- `public/llms.txt` — a concise, dated description of current work.
- `public/sitemap.xml` — public routes, including historical research artifacts.
- `index.html` — page metadata and structured profile data.
- `public/uploads/` — existing project artwork.

The project data distinguishes Products, Agent systems, Research and Applications. The current Chakra47 product direction and earlier AgenticSwarm research have separate entries.

## VAYAS research paper

Read the [VAYAS HTML article](https://www.shubham.cv/research/vayas-age-stratified-asr), [download the PDF](https://www.shubham.cv/research/vayas-age-stratified-asr.pdf), or visit the [Zenodo record](https://doi.org/10.5281/zenodo.22176362).

`public/paper-vayas.html` is the standalone article and contains its scholarly metadata. The PDF is served from `public/research/vayas-age-stratified-asr.pdf`. The Research card uses document navigation to `/research/vayas-age-stratified-asr`; Vercel rewrites that URL to the HTML file before the SPA fallback. Vite applies the same mapping during development and `npm run preview`, including an optional trailing slash and query parameters. The article is maintained in one HTML file, without a duplicate React page.

When updating the paper, keep its canonical URL, citation metadata, PDF link, sitemap and `llms.txt` entry consistent. Check direct loads and the Research card, internal section links, figures and PDF access, plus narrow-screen and print layouts.

## Interactive project explorer

`ProductBrowser` provides live frames for HUNT and Chakra47, with product/view selection, restart, a narrow preview width and a persistent link to the original site. Only the active live view is mounted. Frame content stays on its original origin; the displayed address identifies the selected starting page rather than tracking cross-origin navigation. The HUNT demo currently asks for an email and subscribes entrants to its early-access list, which the preview caption makes explicit.

Staffly disallows framing. Its preview uses three labelled, dated demo images with fit/detail zoom and a keyboard-scrollable region. See `public/previews/staffly/README.md` for image provenance. No framing headers or application authentication are changed.

Configure products and views in `src/data/previews.ts`. The same browser appears on each of the three product detail pages. `ProjectIndex` filters the selected projects by category and name/technology, announces the result count, and offers a reset when nothing matches.

When changing this UI, check product/view switching, frame restart, desktop/narrow mode, screenshot zoom and keyboard scrolling, combined search/category filters, empty-result reset, and navigation to each product page. Check at a phone width as well as desktop, and keep external-site availability separate from local UI correctness.

## Deployment

The repository is configured for Vercel. Review a preview deployment before merging website changes into the production branch. API credentials belong in deployment configuration and must not be committed.

## Sixty: unlisted Java DSA study guide

`/sixty` is a directly accessible study page with no password or login. It is intentionally absent from the portfolio navigation and sitemap. The page and its `/sixty/` and `/sixty.html` aliases send `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`; the HTML repeats the directive for robots and Googlebot. This is search-indexing guidance, not access control. Known search crawlers can fetch the page and see the directive; adding a robots.txt crawl block would prevent that.

The 60-day curriculum assigns **two LeetCode problems and one Codeforces problem each day**, with 180 distinct links, staged hints, worked examples, a review queue, notes, and mock clocks. The separate interview track does not affect DSA completion. Topic resources link to free study material and clearly distinguish read sources, Reddit search excerpts, and discovery searches. Some theory references use C++ or Python; the guide explicitly directs the learner to implement in Java.

Sources are maintained in `src/sixty/`. `scripts/build-sixty.mjs` validates the daily platform split and URL uniqueness, then creates the ignored `public/sixty.html`. It runs before `npm run dev` and `npm run build`. The generator reuses the current portfolio design tokens from `src/index.css` and font links from `index.html`; it does not import the homepage's analytics or SEO metadata. `portfolio.css` applies the same monochrome surfaces, Georgia display text, IBM Plex Mono body, navigation, borders, and controls to the study workspace.

The study page defaults to the portfolio's dark appearance. Its Light mode / Dark mode control remembers the choice in the guide's local progress storage. The theme styles and control are included only on `/sixty`; navigating to the homepage does not apply the study-page preference there.

```sh
npm run sixty:build
npm run test:sixty
npm run build
```

Vite development/preview and Vercel both map the route before the SPA fallback and apply the indexing headers. Check all three aliases with and without a query string. Existing `/prep` authentication and other public pages are unchanged.

Progress is stored in localStorage on the current origin and can be exported/imported as JSON. No study progress or notes are sent to a backend. Version 2 backups match solved state by problem URL so later reordering cannot transfer credit to another problem. Version 1 backups from the earlier two-problem guide preserve notes, review flags, and learning checks, but reset practice completion because the assignments changed. All three problems and three learning checks are required to complete a day. Backups from localhost must be explicitly imported on the deployed domain.

Open tabs synchronize progress and merge their changed fields with the latest saved record. A reset or backup restore starts a new progress generation so stale tabs cannot restore the previous record. Pending notes are saved when the page becomes hidden or is left, as well as after the typing delay.
