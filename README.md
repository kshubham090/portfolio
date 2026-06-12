# shubham.cv

Personal portfolio of **Shubham Kumar Gupta** — AI engineer building agentic systems and the reliability infra around them.

Live: [www.shubham.cv](https://www.shubham.cv)

---

## what's in here

Not a template. Not a theme. Built from scratch.

- **React + Vite + TypeScript** — single-page, zero dependencies beyond what's needed
- **skg-agent v2** — an AI rep that reads the visitor, pitches for the right role, and emails me a summary after every session
- **Dynamic hero** — heading rotates through 8 variants, fades on interval
- **Portfolio tour** — first-visit spotlight walkthrough, localStorage gated, no library
- **Session tracker** — captures full transcript, extracts visitor email, fires on 5-min idle
- **Voice call (Phase 6)** — Web Speech API → Claude → speechSynthesis loop (coming)
- **Neko** — obviously

---

## stack

| Layer | What |
|---|---|
| Frontend | React 19, Vite 8, TypeScript |
| Styling | Global CSS, CSS custom properties, `clamp()` — no Tailwind |
| AI | Claude API (Anthropic) — `claude-haiku-4-5` for chat + summaries |
| Email | Resend — `hireme@shubham.cv` → visitor + me CC'd |
| Deploy | Vercel — serverless functions in `/api`, CI from GitHub |
| Fonts | IBM Plex Mono + IBM Plex Sans (Google Fonts) |

---

## agent capabilities

| # | Capability | Status |
|---|---|---|
| 1 | Role-aware pitch (recruiter / founder / engineer / investor) | live |
| 2 | In-site voice call (Web Speech API + Claude) | planned |
| 3 | Post-session email to me + visitor copy with resume | live |
| 4 | Dynamic hero heading (8-variant rotation) | live |
| 5 | First-visit portfolio tour | live |

---

## run locally

```bash
# clone
git clone https://github.com/kshubham090/portfolio
cd portfolio

# install
npm install

# env
cp .env.local.example .env.local
# add ANTHROPIC_API_KEY to .env.local

# dev (with API routes)
vercel dev

# or just frontend
npm run dev
```

API routes won't work with `npm run dev` — use `vercel dev` if you need `/api/chat` locally.

---

## env vars

```env
ANTHROPIC_API_KEY=sk-ant-...      # required — Claude chat + summaries
RESEND_API_KEY=re_...             # required — email notifications
GROQ_API_KEY=gsk_...             # optional — Whisper STT (Phase 6)
ELEVENLABS_API_KEY=sk_...        # optional — TTS upgrade (Phase 6)
```

Set these in Vercel dashboard → Settings → Environment Variables.

---

## structure

```
api/
  chat.ts          Claude streaming endpoint
  notify.ts        Session summary + Resend email

src/
  components/      Nav, Hero, Projects, Skills, AgentDrawer, Tour, Neko...
  hooks/           useFadeIn, useDynamicHeading, useTour
  lib/             claude.ts, pitchTemplates.ts, sessionTracker.ts

public/
  resume.pdf       served at /resume
  uploads/         project images
```

---

## deploy

Vercel CI is connected to this repo. Every push to `master` deploys automatically.

Manual deploy:
```bash
vercel --prod
```

---

built by shubham. don't copy the agent — build your own.
