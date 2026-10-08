# shubham.cv

Personal portfolio of **Shubham Kumar Gupta**, a software engineer building AI systems and full-stack products.

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
| Fonts | IBM Plex Mono and IBM Plex Sans |

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

## Deployment

The repository is configured for Vercel. Review a preview deployment before merging website changes into the production branch. API credentials belong in deployment configuration and must not be committed.
