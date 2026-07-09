export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface Project {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  colorClass: string;
  img?: string;
  imgFit?: 'cover' | 'contain';
  tags: string[];
  links: ProjectLink[];
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'chakra47',
    name: 'Chakra47 — Agentic Swarm',
    shortName: 'Chakra47',
    tagline: 'A governed multi-agent framework for environments where you have to prove what your AI did.',
    colorClass: 'proj-color-chakra',
    img: '/uploads/47 (3).png',
    tags: ['4-Layer Architecture', 'LangGraph Swarm', 'SHA-256 Audit Chain', 'Physical AI'],
    links: [
      { label: 'Visit Site', url: 'https://chakra47.com' },
      { label: 'GitHub', url: 'https://github.com/kshubham090/Chakra47-AgenticSwarm' },
    ],
    sections: [
      {
        heading: 'What it is',
        body: [
          'An open-source, general-purpose framework for building governed, multi-agent systems — a central orchestrator coordinates specialist agents to perceive, reason, decide, and act.',
          'Built for anything that needs structured, auditable, multi-agent behavior: SaaS automation pipelines, PaaS orchestration layers, decision engines, monitoring systems — any domain where deterministic reliability matters more than raw LLM flexibility.',
        ],
      },
      {
        heading: 'Why it exists',
        body: [
          'Most agentic frameworks hand every decision to an LLM. That works in a demo and falls apart the moment something needs to be provable after the fact.',
          'Chakra47 flips the default: code runs everything it can, and the LLM only gets called when code genuinely cannot decide. The mission is the best open-source agentic swarm framework governed by neuro-symbolic AI, where code is the default and LLMs are the exception.',
        ],
      },
      {
        heading: 'How it works',
        body: [
          'Layer 1 — Perception: ingests input from any source and normalizes it into structured context.',
          'Layer 2 — Symbolic Rule Engine: deterministic decision trees handle known situations in code; an exception classifier routes only genuine unknowns to a local LLM (Ollama) for a PASS / BLOCK / ESCALATE gate.',
          'Layer 3 — Cryptographic Audit Chain: every decision is SHA-256 hash-chained and tagged with its source (code vs LLM) — tamper-evident and fully traceable.',
          'Layer 4 — Agentic Orchestrator + Swarm: ten specialist agent classes (MissionPlanner, RiskAgent, RuleValidator, AuditAgent and others) run code-first, with human-in-the-loop approval on anything escalated.',
          'The golden rule: code decides, LLM advises. That keeps the system fast, predictable, auditable, and offline-capable.',
        ],
      },
    ],
  },
  {
    slug: 'stakrid',
    name: 'Stakrid Logistics',
    shortName: 'Stakrid',
    tagline: 'Founded and built solo — a logistics platform taken from zero to production in under a year.',
    colorClass: 'proj-color-stakrid',
    tags: ['Founder & Lead Engineer', 'GCP Infra', 'Solo Build', 'Payments + SMS'],
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/stakrid' },
    ],
    sections: [
      {
        heading: 'What it is',
        body: [
          'A logistics company founded and run solo — product, backend, infra, and operations all built and shipped by one person, start to finish.',
          '40+ REST endpoints backing the core platform, deployed on GCP with CI/CD, Supabase for data and auth, and integrated payments and SMS for the operational workflow.',
        ],
      },
      {
        heading: 'Why it exists',
        body: [
          'Logistics operations were running on manual, error-prone processes. The goal was to replace that with software that was fast, reliable, and cheap to run — without a team, without outside funding, without cutting corners on infra.',
        ],
      },
      {
        heading: 'What shipped',
        body: [
          'Manual processing cut by 80% after the platform went live.',
          'API latency brought down from 800ms to under 200ms.',
          'Ran for a full year (Jan 2025 – Jan 2026) as the founder\'s sole technical and operational owner.',
        ],
      },
    ],
  },
  {
    slug: 'lowq-x1-agent-eval-harness',
    name: 'Lowq X1 — Agent Eval Harness',
    shortName: 'Agent Eval Harness',
    tagline: 'A production-grade eval system for AI agents, built from scratch — no eval frameworks.',
    colorClass: 'proj-color-lowq',
    img: '/uploads/lowq-logo.png',
    imgFit: 'contain',
    tags: ['CI Regression Gate', 'LLM-as-Judge', 'Trajectory Scoring', 'Python 3.12'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kshubham090/Agent-Eval-Harness' },
    ],
    sections: [
      {
        heading: 'What it is',
        body: [
          'The harness answers one question — "is my agent getting better or worse?" — and blocks deploys when the answer is worse.',
          'A dataset and an agent go in; a pass/fail decision comes out. Pluggable scorers (exact match, regex, embedding similarity, LLM-as-judge) all implement one protocol, plus LCS-based trajectory scoring that checks the agent\'s tool-call sequence, not just its final answer.',
        ],
      },
      {
        heading: 'Why it exists',
        body: [
          'Agents regress silently. A prompt tweak or a model swap can quietly make an agent worse in ways that never show up until a user hits it in production.',
          'This closes that gap: save a baseline from a known-good run, and any metric that drops past a threshold fails the CI check with exit code 1 — wired directly into GitHub Actions.',
        ],
      },
      {
        heading: 'How it works',
        body: [
          'Cases run concurrently in a thread pool; one crashing case scores 0.0 and the run continues — failure isolation, not failure cascade.',
          'Multi-run statistics report mean ± std across repeated runs, so the gate reacts to real signal, not single-run noise. Dataset fingerprinting refuses to compare runs against a different dataset version.',
          'A meta-eval step calibrates the LLM judge against human-graded cases before anyone trusts its scores.',
        ],
      },
      {
        heading: 'Real numbers, one agent, three verdicts',
        body: [
          'Run on a 60-case dataset against the same agent: exact-match scores 0.867 (docked for formatting differences like "Six" vs "6"). Embedding similarity rescues most of that, landing at 0.984 — but stumbles on "H₂O" vs "H2O" because the subscript breaks tokenization. The calibrated LLM judge scores 1.000, correctly grading all 60 as right.',
          'Same agent, three different pass rates — which is exactly why the scorer ladder exists, and why you calibrate the judge before trusting it.',
        ],
      },
    ],
  },
  {
    slug: 'lowq-x2-contextual-llm-gateway',
    name: 'Lowq X2 — Contextual LLM Gateway',
    shortName: 'Contextual LLM Gateway',
    tagline: 'An LLM gateway with memory — every call makes the next one smarter.',
    colorClass: 'proj-color-lowq',
    img: '/uploads/lowq-logo.png',
    imgFit: 'contain',
    tags: ['Neo4j Memory Graph', 'Semantic Cache', 'Cost Attribution', 'FastAPI'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kshubham090/contextual-llm-gateway' },
    ],
    sections: [
      {
        heading: 'What it is',
        body: [
          'An LLM gateway that doesn\'t just proxy and cache calls — it builds a knowledge graph of every call it handles and feeds relevant history back into new calls, so responses get better the more the system is used.',
          'Five backing services behind one FastAPI process: Redis for rate limiting, pgvector for the vector math, Neo4j for relationship traversal, and Claude reached through a provider abstraction so a second model slots in without touching the pipeline.',
        ],
      },
      {
        heading: 'Why it exists',
        body: [
          'Most gateways are dumb pipes with a cache bolted on — request in, check for an exact match, miss, forward, log. That treats every call as disconnected from the last.',
          'This one treats every call as a node in a growing graph, connected to the user, the feature it came from, the model that served it, and the calls semantically related to it. A new prompt doesn\'t get a binary cache hit or miss — the gateway walks the neighborhood of similar past calls and injects that context, so the model answers with awareness of history it was never explicitly given.',
        ],
      },
      {
        heading: 'How it works',
        body: [
          'One embedding call serves three purposes: cache lookup, graph seeding, and write-back — so the "smart" path costs exactly one extra external call versus a plain proxy.',
          'Cache hits (similarity ≥ 0.95) return instantly at zero LLM cost. On a miss, the gateway walks 1–2 hops from graph seeds (≥ 0.75 similarity), ranks the neighborhood by similarity × recency × feature-affinity, and injects a compact context blob into the prompt before it reaches Claude.',
          'Persistence happens off the request path — the client gets its answer as soon as the model responds, while Postgres and Neo4j writes complete in the background.',
        ],
      },
      {
        heading: 'Why it belongs in production',
        body: [
          'Every call writes a cost row attributed to user, feature, and day — GET /v1/usage is the finance answer, not an estimate.',
          'Rate-limit errors, timeouts, and 5xxs auto-retry on a secondary model tier, and the failover is recorded so degraded periods are visible after the fact.',
          'Every response\'s metadata lists the exact context call IDs used to ground it — grounding is inspectable, not a black box.',
        ],
      },
    ],
  },
  {
    slug: 'military-deployment-decision-system',
    name: 'Military Deployment Decision System',
    shortName: 'Deployment Decision System',
    tagline: 'CNN threat detection, Claude reasoning, and Rules-of-Engagement validation in one decision pipeline.',
    colorClass: 'proj-color-military',
    img: '/uploads/f7a57771-15ab-46ac-8882-97eafd241b96.jpg',
    tags: ['CNN Threat Detection', 'Claude Reasoning', 'RoE Validation'],
    links: [],
    sections: [
      {
        heading: 'What it is',
        body: [
          'A decision-support pipeline that combines a CNN for visual threat detection with Claude for contextual reasoning, gated by a Rules-of-Engagement validation layer before any recommendation is surfaced.',
        ],
      },
      {
        heading: 'Why it exists',
        body: [
          'Presented at the AI Impact Summit 2026, Government of India — built to explore how perception, reasoning, and hard procedural constraints can work together in a domain where a wrong call has real consequences and every recommendation needs to be defensible.',
        ],
      },
    ],
  },
  {
    slug: 'real-time-posture-analysis',
    name: 'Real-Time Posture Analysis',
    shortName: 'Posture Analysis',
    tagline: 'Real-time identity and posture detection running 25+ FPS on CPU — no GPU required.',
    colorClass: 'proj-color-posture',
    img: '/uploads/image.png',
    tags: ['25+ FPS on CPU', 'MediaPipe', 'Quantization'],
    links: [],
    sections: [
      {
        heading: 'What it is',
        body: [
          'A real-time identity and posture detection system built on a MediaPipe pipeline, tuned to run at 25+ frames per second entirely on CPU.',
        ],
      },
      {
        heading: 'Why it exists',
        body: [
          'Most posture/pose systems assume GPU availability, which rules them out for a lot of real deployment environments. This was built to prove the same accuracy is reachable on commodity hardware through model quantization and a tightly optimized inference pipeline.',
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
