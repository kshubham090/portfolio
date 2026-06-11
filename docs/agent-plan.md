# skg-agent v2 — Full Capability Plan

> Owner: Shubham Kumar Gupta  
> Contact: kshubham04907@gmail.com  
> Stack: React + Vite, Claude API (Anthropic), Web Speech API / Groq / ElevenLabs, Resend, Supabase Edge Functions

---

## Overview

The portfolio agent goes from a static FAQ chatbot to a live, proactive AI rep that:
- Reads the visitor and pitches Shubham for the right role
- Lets visitors call and talk to an AI voice that speaks on his behalf
- Emails Shubham a brief + suggestions after every interaction
- Keeps the hero heading fresh and attention-grabbing
- Walks first-time visitors through the portfolio

---

## Capability 1 — Role-Aware Text Pitch

### What it does
When a visitor opens the chat, the agent asks one question to identify the visitor type
(recruiter, founder, engineer, investor), then delivers a tailored pitch instead of a
generic FAQ response.

### Visitor profiles & pitch angles

| Visitor type | Detected by keywords | Pitch angle |
|---|---|---|
| Recruiter / HR | "hire", "team", "position", "opening" | Reliability infra + agentic AI skills, fast learner, relocation-ready |
| Founder / early-stage | "startup", "co-founder", "building", "product" | Bias for shipping, end-to-end ownership (Stakrid), low overhead |
| Senior engineer | "collaborate", "open source", "review", "PR" | Chakra47, eval harness work, code quality |
| Investor / VC | "portfolio", "funding", "AI company" | Track record, current LifeAtlas traction, SF target |

### Implementation

```
User opens chat
  → Agent: "What brings you here — hiring, building, or just curious?"
  → User reply classified by keyword match (no API needed for triage)
  → Pitch template injected as system context for Claude
  → Claude writes a personalized 3-sentence pitch
  → Shown as a bot message in the existing terminal drawer
```

**Files to create/modify:**
- `src/components/AgentDrawer.tsx` — add `visitorType` state, opening question flow
- `src/lib/pitchTemplates.ts` — role-keyed prompt templates
- `src/lib/claude.ts` — thin wrapper around `fetch('/api/chat')` (streaming)

**Backend (Supabase Edge Function or Vercel serverless):**

```ts
// /api/chat
POST { messages: Message[], visitorType: string }
→ Anthropic SDK → stream response back
```

**Env vars needed:**
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Capability 2 — In-Site Voice Call

### What it does
A "Call Shubham's Agent" button appears in the hero or chat drawer. Visitor clicks it,
microphone opens, speech is converted to text, Claude responds, and the browser speaks
the reply aloud. No paid voice service required.

---

### Stack options (cheapest first)

#### Option A — 100% Free: Web Speech API + Claude (RECOMMENDED to start)

| Component | Service | Cost |
|---|---|---|
| Speech-to-text | `window.SpeechRecognition` (browser built-in) | $0 |
| AI brain | Claude API (already in use) | ~$0.001 / turn |
| Text-to-speech | `window.speechSynthesis` (browser built-in) | $0 |
| WebRTC / infra | None needed | $0 |

**Limitations:** Voice quality depends on the OS. On Chrome/Edge (Windows/Mac) it sounds
decent. On mobile it varies. No custom voice cloning.

**Browser support:** Chrome, Edge, Safari 14+. Firefox has partial support.

```
User clicks "Call"
  → Request mic permission
  → SpeechRecognition.start() — browser STT, streams transcript
  → On speechend → POST text to /api/chat (existing Claude endpoint)
  → Response text → speechSynthesis.speak() with a low-pitch voice setting
  → Loop: listen → think → speak → listen
```

---

#### Option B — Near Free: Groq Whisper STT + Browser TTS

| Component | Service | Cost |
|---|---|---|
| Speech-to-text | Groq Whisper API | Free tier: generous (no credit card for dev) |
| AI brain | Groq `llama-3.3-70b` or Claude | Groq free tier / Claude at cost |
| Text-to-speech | `window.speechSynthesis` | $0 |

**Why Groq over browser STT:** Groq's Whisper is far more accurate, handles accents,
and doesn't fail in noisy environments. Still $0 in development.

```bash
# Groq free tier signup: console.groq.com — no credit card needed
GROQ_API_KEY=gsk_...
```

```
User speaks → MediaRecorder captures audio blob
  → POST audio blob to /api/stt → Groq Whisper transcribes → returns text
  → POST text to /api/chat → Claude/Groq LLM responds
  → Browser speaks reply via speechSynthesis
```

---

#### Option C — Free tier with good voice: Groq STT + ElevenLabs TTS

| Component | Service | Cost |
|---|---|---|
| Speech-to-text | Groq Whisper | Free tier |
| AI brain | Claude API | ~$0.001 / turn |
| Text-to-speech | ElevenLabs free tier | 10,000 chars/month free |

**Best quality voice** without paying. ElevenLabs free tier gives ~2–3 hours of audio/month
which is more than enough for a portfolio. Sign up at elevenlabs.io — no credit card.

```
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=...     # pick a voice from their free library
```

**ElevenLabs TTS call:**
```ts
const audio = await fetch('https://api.elevenlabs.io/v1/text-to-speech/{voice_id}', {
  method: 'POST',
  headers: {
    'xi-api-key': process.env.ELEVENLABS_API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: reply, model_id: 'eleven_turbo_v2' }),
});
const blob = await audio.blob();
new Audio(URL.createObjectURL(blob)).play();
```

---

### Recommended path

```
Start with Option A (zero setup, ships in 2h)
  → If voice quality complaints → swap in Option B (Groq STT, still $0)
  → If still want better voice → add ElevenLabs free tier (Option C)
```

No Retell, no Vapi, no monthly subscription.

---

### Voice agent persona (system prompt for Claude / Groq)

```
You are an AI representative speaking on behalf of Shubham Kumar Gupta,
an AI engineer from Noida, India. Speak conversationally, confidently,
and in short sentences — this is a voice call, not a chat. Max 2–3 sentences per turn.
Never say you are an AI unless directly asked.

Key facts:
- Currently: AI Engineering Intern at Winniio / LifeAtlas (Sweden, remote)
- Focus: agentic AI systems + reliability infra (eval harnesses, LLM proxies, guardrails)
- Previously: founded Stakrid Logistics — cut manual processing 80%, latency <200ms
- Education: B.Tech CSE AI/ML, Amity University Noida (2023–2027)
- Goal: AI engineer at a startup, targeting SF

If asked about hiring or availability: express strong interest,
ask for their email, and say Shubham will follow up within 24 hours.
```

---

### Implementation

**Files to create:**
- `src/components/CallButton.tsx` — trigger button in AgentDrawer or Hero
- `src/components/CallOverlay.tsx` — modal UI with waveform + mute + end
- `src/hooks/useVoiceCall.ts` — manages mic, STT, TTS, conversation loop

**Install (Option A — nothing):**
```bash
# No install needed for Web Speech API
```

**Install (Option B/C):**
```bash
npm install groq-sdk
# ElevenLabs: no SDK needed, just fetch()
```

**Env vars needed:**
```
# Option A: none beyond existing ANTHROPIC_API_KEY
# Option B adds:
GROQ_API_KEY=gsk_...
# Option C adds:
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB   # "Adam" voice, free
```

**Call UI sketch:**
```
┌─────────────────────────────────────┐
│  ◉  skg-agent · listening           │
│                                     │
│     ▂▄▆▄▂▁▄▆▄▂  (waveform)         │
│                                     │
│  [  🎤 Mute  ]    [  ✕ End call  ] │
└─────────────────────────────────────┘
```

---

## Capability 3 — Post-Interaction Email to Shubham

### What it does
After every chat session ends (tab close, inactivity timeout, or explicit close) and
after every voice call, a structured summary is emailed to kshubham04907@gmail.com.

### Email contents

**Chat summary email:**
```
Subject: [skg-agent] New visitor — {visitorType} · {date}

Visitor type:    Recruiter / Founder / Engineer / Unknown
Messages:        8 exchanges
Duration:        4 min
Key questions:   ["What's your stack?", "Are you open to relocation?"]
Sentiment:       Positive — asked for contact info at end

Suggested follow-up:
  - This visitor asked about SF relocation twice. Send a LinkedIn note.
  - They asked about Spring Boot — you mentioned it briefly. Add it to the skills section.

Raw transcript:
  [user]  What is his tech stack?
  [agent] Languages: Python, Java...
  ...
```

**Call summary email:**
```
Subject: [skg-agent] Voice call — {duration} · {date}

Duration:   3m 22s
Topics:     Role fit, Chakra47, availability
Hot signal: Visitor asked "can he start in August?" — likely recruiter

Suggestions:
  - Add a "Available from: Aug 2026" badge to the hero stats row.
  - Chakra47 came up twice. Consider making it the first project card.

Transcript: [attached as plain text]
```

### Implementation

```
Chat/call ends
  → Summarize transcript via Claude API (haiku — cheap)
  → Generate 2-3 actionable suggestions
  → POST to /api/notify with { type, transcript, summary, suggestions }
  → Edge function sends email via Resend API
```

**Files to create:**
- `src/lib/sessionTracker.ts` — accumulates messages, fires on session end
- `/api/notify` (edge function) — summarizes + sends email

**Install:**
```bash
npm install resend
```

**Edge function:**
```ts
import { Resend } from 'resend';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: Request) {
  const { transcript, type } = await req.json();

  const client = new Anthropic();
  const summary = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `Summarize this portfolio visitor ${type} transcript in 3 bullets.
                Then give 2 actionable suggestions for Shubham to improve his portfolio or follow up.
                Transcript: ${transcript}`
    }]
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'skg-agent <agent@yourdomain.com>',
    to: 'kshubham04907@gmail.com',
    subject: `[skg-agent] ${type} session · ${new Date().toLocaleDateString()}`,
    text: summary.content[0].type === 'text' ? summary.content[0].text : '',
  });

  return Response.json({ ok: true });
}
```

**Env vars needed:**
```
RESEND_API_KEY=re_...
ANTHROPIC_API_KEY=sk-ant-...
```

**Session-end triggers:**
- `visibilitychange` → document hidden + 30s → fire
- Chat drawer close button → fire
- `useVoiceCall.ts` call-ended callback → fire
- `beforeunload` → `navigator.sendBeacon('/api/notify', ...)` for tab close

---

## Capability 4 — Dynamic Hero Heading

### What it does
The hero `SHIPPING AI / ON NO SLEEP.` heading rotates through short, punchy variants.
Changes on: page load (random), scroll back to top, or a 45-second timer.
Optionally, a new heading is generated by Claude on each visit.

### Heading bank (static, always available)

```ts
export const HEADINGS = [
  ["SHIPPING AI", "ON NO SLEEP."],
  ["BUILDING AGENTS", "THAT DON'T BREAK."],
  ["EVAL. DEPLOY.", "REPEAT."],
  ["RELIABILITY IS", "THE FEATURE."],
  ["FROM NOIDA", "TO THE FRONTIER."],
  ["AGENTIC AI.", "PRODUCTION-GRADE."],
  ["NO FLUFF.", "JUST INFERENCE."],
  ["THE GUARDRAIL", "IS THE PRODUCT."],
];
```

### Dynamic generation (optional, on page load)

```ts
// /api/heading
GET → returns { lines: [string, string] }

// Edge function calls Claude with:
"Generate a 2-line hero heading for an AI engineer's portfolio.
 Style: all-caps, punchy, 3-5 words per line, no punctuation except period on last line.
 About: agentic AI systems, reliability infra, eval harnesses, SF target.
 Return JSON: { lines: ['LINE ONE', 'LINE TWO'] }"
```

### Implementation

```
Page loads
  → fetch('/api/heading') with 800ms timeout
  → If response arrives: animate to new heading with a fade-swap
  → If timeout: use random from HEADINGS bank
  → On 45s interval: pick next from HEADINGS bank, fade-swap
```

**Files to create:**
- `src/hooks/useDynamicHeading.ts` — manages heading state + rotation
- `src/components/Hero.tsx` — consume hook, add CSS transition on heading
- `/api/heading` — edge function (optional, skip if static bank is enough)

**CSS for heading transition:**
```css
.hero-title {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.hero-title.swapping {
  opacity: 0;
  transform: translateY(-8px);
}
```

---

## Capability 5 — Portfolio Walkthrough (First-Visit Tour)

### What it does
On first visit (checked via `localStorage`), a floating tooltip-style tour appears
that highlights each section in sequence. User can skip at any time.
Tour does NOT use a library — custom React implementation to avoid bundle bloat.

### Tour steps

```
Step 1 / 5  →  Hero stats bar
  "These four numbers are the TL;DR. Role, company, focus, status."

Step 2 / 5  →  Projects section
  "In Progress = what I'm actually building right now. Done = what shipped."

Step 3 / 5  →  Skills section
  "Hover each skill. The stack behind it is in the left panel."

Step 4 / 5  →  Agent chat button (bottom-right)
  "Ask the agent anything — it knows my full background and can answer questions live."

Step 5 / 5  →  Call button (if voice is enabled)
  "Or just call. The voice agent picks up and talks on my behalf."
```

### Implementation

```
Page load
  → Check localStorage.getItem('skg_tour_done')
  → If null: show tour after 1.2s delay (let page settle)
  → Tour renders a floating tooltip anchored to target element via getBoundingClientRect
  → Backdrop: semi-transparent overlay with a cutout around the target (box-shadow trick)
  → Navigation: Prev / Next / Skip
  → On finish or skip: localStorage.setItem('skg_tour_done', '1')
```

**Files to create:**
- `src/components/Tour.tsx` — full tour component
- `src/hooks/useTour.ts` — step state, localStorage check, scroll-to-target

**Tour tooltip positioning:**
```ts
// Anchor tooltip to target element
const rect = targetEl.getBoundingClientRect();
setPosition({
  top: rect.bottom + 12,
  left: rect.left + rect.width / 2,
});
```

**Spotlight effect (CSS only, no canvas):**
```css
.tour-backdrop {
  position: fixed;
  inset: 0;
  z-index: 8999;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.72);
  border-radius: 4px;
  pointer-events: none;
  transition: all 0.3s ease;
}
```
The backdrop `box-shadow` is positioned to match the target element's bounding rect,
creating a cutout spotlight without any canvas.

**Tour card sketch:**
```
╔══════════════════════════════════╗
║  Step 2 of 5                 ✕  ║
║                                  ║
║  In Progress = what I'm          ║
║  actually building right now.    ║
║  Done = what shipped.            ║
║                                  ║
║  [Skip tour]        [Next →]     ║
╚══════════════════════════════════╝
```

---

## Architecture Diagram

```
Browser
├── Hero.tsx                ← dynamic heading (useDynamicHeading hook)
├── Tour.tsx                ← first-visit walkthrough (localStorage gated)
├── AgentDrawer.tsx         ← text chat (role-aware pitch)
│   └── sessionTracker.ts  ← captures transcript on close
├── CallButton.tsx          ← triggers voice call
└── CallOverlay.tsx
    └── useVoiceCall.ts     ← SpeechRecognition → Claude → speechSynthesis loop
                               (upgrade: Groq STT → Claude → ElevenLabs TTS)

Edge Functions (Supabase / Vercel)
├── /api/chat               ← Claude API proxy (streaming)
├── /api/stt                ← Groq Whisper (Option B/C only, skip for Option A)
├── /api/tts                ← ElevenLabs TTS proxy (Option C only)
├── /api/heading            ← Claude generates hero headline
└── /api/notify             ← summarize transcript → Resend email

External Services
├── Anthropic API           ← claude-sonnet-4-6 for chat/pitch
│                              claude-haiku-4-5 for summaries/headings
├── Web Speech API          ← browser built-in STT + TTS (Option A, free)
├── Groq API                ← Whisper STT, free tier (Option B/C upgrade)
├── ElevenLabs              ← TTS, 10k chars/month free (Option C upgrade)
└── Resend                  ← transactional email to Shubham (free: 100/day)
```

---

## Build Order

| Phase | What to build | Est. effort |
|---|---|---|
| 1 | Heading bank + useDynamicHeading hook (no API needed) | 1h |
| 2 | Tour component (5 steps, skip button, localStorage) | 2h |
| 3 | Role-aware pitch in existing AgentDrawer (static templates) | 2h |
| 4 | /api/chat edge function + Claude streaming | 2h |
| 5 | Session tracker + /api/notify + Resend email | 2h |
| 6 | Voice call (Option A: Web Speech API) + CallButton + CallOverlay + useVoiceCall | 3h |
| 7 | Wire call-ended into sessionTracker → /api/notify email | 1h |

Total: ~13h across phases. Each phase is independently shippable.

---

## Env Vars Summary

```env
# Claude / Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Groq (Option B/C only — Whisper STT, free tier)
GROQ_API_KEY=gsk_...

# ElevenLabs (Option C only — TTS, 10k chars/month free)
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB

# Resend (email notifications, 100 emails/day free)
RESEND_API_KEY=re_...
FROM_EMAIL=agent@yourdomain.com
NOTIFY_EMAIL=kshubham04907@gmail.com
```

---

## Notes

- All Claude calls go through a server-side edge function — API key never exposed to client.
- Groq and ElevenLabs keys are server-side only — never in client bundle.
- The heading generation endpoint is optional. The static bank of 8 headings works fine alone
  and avoids cold-start latency on the hero.
- Tour uses `localStorage` not cookies — no consent banner needed.
- Email summaries use `navigator.sendBeacon` for tab-close events so they fire reliably
  even when the user navigates away mid-session.
