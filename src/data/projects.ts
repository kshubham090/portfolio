export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectSection {
  heading: string;
  body: string[];
}

export interface ProjectDiagram {
  title: string;
  code: string;
  caption?: string;
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
  diagrams?: ProjectDiagram[];
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
    diagrams: [
      {
        title: 'Component Architecture',
        caption: 'A dataset and an agent go in; a pass/fail decision comes out.',
        code: `
flowchart LR
    subgraph Input
        DS[("Golden Dataset<br/>JSONL")]
        AG["Agent Under Test<br/>get_agent()"]
    end

    subgraph Core["harness/ core"]
        DL["dataset.py<br/>load + validate + hash"]
        ER["eval_runner.py<br/>ThreadPoolExecutor"]
        SC["scorers/*<br/>exact · regex · embedding · llm_judge"]
        TR["trajectory.py<br/>LCS step-match"]
        AGG["results.py<br/>aggregate + multi-run stats"]
    end

    subgraph Storage
        RES[("results/*.json")]
        BASE[("baselines/*.json")]
    end

    subgraph Output
        REP["report.py<br/>self-contained HTML"]
        GATE{{"baseline.py<br/>compare_to_baseline"}}
        CI["exit 0 / exit 1"]
    end

    DS --> DL --> ER
    AG --> ER
    ER --> SC --> AGG
    ER --> TR --> AGG
    AGG --> RES
    RES -.save.-> BASE
    RES --> REP
    RES --> GATE
    BASE --> GATE
    GATE --> CI
        `,
      },
      {
        title: 'Eval Run — Process Flow',
        caption: 'What happens inside a single agent-eval eval invocation.',
        code: `
sequenceDiagram
    participant U as You
    participant CLI as agent-eval CLI
    participant D as Dataset Loader
    participant P as Thread Pool
    participant A as Agent
    participant S as Scorers
    participant G as Baseline Gate

    U->>CLI: eval --dataset --agent --compare-baseline ci
    CLI->>D: load_dataset(path)
    D-->>CLI: cases[] + dataset_sha

    par for every case, up to --concurrency
        P->>A: run(input)
        A-->>P: output + trajectory
        P->>S: score(expected, actual)
        S-->>P: 0.0 - 1.0
        Note over P: exceptions caught here — one bad case never kills the run
    end

    P-->>CLI: CaseResult[] (order preserved)
    CLI->>CLI: aggregate() -> means, pass_rate, errors
    CLI->>G: compare_to_baseline(result, baseline)
    G-->>CLI: regressions[] (metric, delta)
    CLI-->>U: HTML report + console table + exit code
        `,
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
    diagrams: [
      {
        title: 'System Architecture',
        caption: 'Five backing services, one FastAPI process, each doing the one thing it\'s best at.',
        code: `
flowchart LR
    client["Client<br/>(any app or service)"]

    subgraph gateway["Contextual LLM Gateway — FastAPI"]
        direction LR
        rl["Rate Limiter"]
        emb["Embedding<br/>Client"]
        cache["Semantic Cache<br/>(similarity >= 0.95)"]
        ctx["Graph Context<br/>Retriever (>= 0.75)"]
        router["Model Router<br/>+ Fallback"]
        wb["Write-back<br/>(parallel)"]
    end

    redis[("Redis<br/>per-user windows")]
    pg[("Postgres + pgvector<br/>call log · cost rows · HNSW index")]
    neo[("Neo4j<br/>memory graph")]
    voyage(["Voyage AI<br/>voyage-3.5 embeddings"])
    claude(["Claude API<br/>Haiku 4.5 / Sonnet 5"])

    client -->|POST /v1/chat| rl

    rl --> redis
    emb --> voyage
    cache -->|nearest-neighbor query| pg
    ctx -->|1-2 hop walk from seeds| neo
    router -->|routed call<br/>auto-fallback on 429/timeout/5xx| claude
    wb -->|cost + usage row| pg
    wb -->|Call node + edges| neo

    rl ~~~ emb
    emb ~~~ cache
    cache ~~~ ctx
    ctx ~~~ router
    router ~~~ wb
        `,
      },
      {
        title: 'The Life of a Request',
        caption: 'Persistence happens off the request path — the client never waits on it.',
        code: `
sequenceDiagram
    actor Client
    participant GW as Gateway (FastAPI)
    participant R as Redis
    participant V as Voyage AI
    participant PG as Postgres + pgvector
    participant N4J as Neo4j
    participant LLM as Claude API

    Client->>GW: POST /v1/chat {prompt, user_id, feature_tag}
    GW->>R: rate-limit check (per user / minute)

    alt limit exceeded
        GW-->>Client: 429 + Retry-After
    else allowed
        GW->>V: embed(prompt)
        V-->>GW: 1024-dim vector

        GW->>PG: nearest neighbors (one query, two thresholds)
        PG-->>GW: similar calls + scores

        alt best match >= 0.95 (semantic cache HIT)
            GW->>PG: log cost row (cache_hit, dollar0)
            GW->>N4J: Call node -> SERVED_FROM_CACHE -> original
            GW-->>Client: cached response (zero LLM cost, fast path)
        else cache miss
            GW->>N4J: walk 1-2 hops from seeds >= 0.75
            N4J-->>GW: topical cluster of past calls

            Note over GW: Rank candidates: similarity x recency x feature-affinity

            GW->>LLM: prompt + injected context (Haiku <-> Sonnet routing)

            alt primary model 429 / timeout / 5xx
                GW->>LLM: retry on secondary tier
            end

            LLM-->>GW: response + token usage
            GW-->>Client: response + metadata

            par background write-back
                GW->>PG: cost row (tokens, dollar, latency, model)
            and
                GW->>N4J: new Call node + all edges
            end
        end
    end
        `,
      },
    ],
  },
  {
    slug: 'military-deployment-decision-system',
    name: 'Military Deployment Decision System',
    shortName: 'Deployment Decision System',
    tagline: 'A 4-layer deployment pipeline — perception, deterministic planning, blocking rules-of-engagement verification, and an on-chain audit trail.',
    colorClass: 'proj-color-military',
    img: '/uploads/f7a57771-15ab-46ac-8882-97eafd241b96.jpg',
    tags: ['4-Layer Architecture', 'RoE Verification', 'On-Chain Audit Trail', 'YOLOv8 + Semantic NLP'],
    links: [],
    sections: [
      {
        heading: 'What it is',
        body: [
          'Symbiote-X — a 4-layer autonomous deployment-decision pipeline, driven end to end from a Streamlit command interface. Perception (image + text intelligence) feeds a deterministic planner, which proposes a deployment plan that a pure-logic verifier checks against Rules of Engagement before anything is approved, with every decision written to an immutable on-chain audit trail.',
        ],
      },
      {
        heading: 'Why it exists',
        body: [
          'Presented at the AI Impact Summit 2026, Government of India. Built to explore how perception, planning, and hard procedural constraints can compose into a system where every recommendation is both generated and provably checked — not a model making a judgment call that has to be trusted after the fact.',
        ],
      },
      {
        heading: 'How it works — Layer 1, Perception',
        body: [
          'YOLOv8n detects and categorizes people, vehicles, and aircraft in surveillance imagery. Separately, the report text is embedded with sentence-transformers (all-MiniLM-L6-v2) and scored against four threat tiers — critical, high, medium, low — via cosine similarity. Both signals combine into a structured intelligence report.',
        ],
      },
      {
        heading: 'How it works — Layer 4, Planning',
        body: [
          'A deterministic DeploymentPlanner — fixed rules, no model — converts the intelligence report into a concrete plan: action type, force size (enemy estimate × a threat-based multiplier, bounded 50–5,000 troops), coordinates, and a civilian-safety flag pulled from keyword matches in the report text.',
          'Claude is used here, but only to narrate the plan the rules already produced. The prompts are explicit about the boundary: "present recommendations as system-generated, not as your personal judgment" — the model explains a decision, it doesn\'t make one.',
        ],
      },
      {
        heading: 'How it works — Layer 2, Verification',
        body: [
          '"NO AI — pure logic only," per the module\'s own docstring. The plan runs through four blocking gates: syntactic (is the plan well-formed), semantic (does the action match the threat level), dimensional (is the force size proportionate — checked against min/max force ratios), and regulatory (does the requesting officer\'s rank authorize this, is the target inside a restricted zone by haversine distance, are civilians within the minimum safe distance).',
          'Any gate failure raises a typed, blocking exception — not a warning. The deployment is DENIED outright and the specific rule violation is logged. There is no soft-fail path.',
        ],
      },
      {
        heading: 'How it works — Layer 3, Blockchain',
        body: [
          'An approved-or-denied decision, along with keccak256 hashes of the perception and plan payloads, is written to MilitaryAuditChain — a Solidity contract deployed via Foundry to Arc L1. Every record links to its causal parent, so a full decision chain can be traced and independently verified on-chain, including a function that recomputes a hash and checks it against what was stored.',
        ],
      },
    ],
    diagrams: [
      {
        title: 'Component Architecture',
        caption: 'Four layers, each doing one job — perception, planning, verification, accountability.',
        code: `
flowchart TB
    UI["Streamlit Command Interface"]

    subgraph L1["Layer 1 — Perception"]
        IMG["YOLOv8n<br/>image detection"]
        TXT["sentence-transformers<br/>semantic threat scoring"]
    end

    subgraph L4["Layer 4 — Planning + Narration"]
        PLAN["DeploymentPlanner<br/>deterministic force/action rules"]
        LLM["Claude<br/>narrates the decision, does not make it"]
    end

    subgraph L2["Layer 2 — Verification, no AI"]
        GATES["4 blocking gates<br/>syntactic, semantic, dimensional, regulatory"]
    end

    subgraph L3["Layer 3 — Blockchain"]
        CHAIN["MilitaryAuditChain.sol<br/>Arc L1, causal chain of hashes"]
    end

    UI --> IMG
    UI --> TXT
    IMG --> PLAN
    TXT --> PLAN
    PLAN --> LLM
    PLAN --> GATES
    GATES -->|approved or denied| CHAIN
    CHAIN --> UI
        `,
      },
      {
        title: 'Process Flow',
        caption: 'One deployment request, start to finish — denial can happen at any of four gates.',
        code: `
sequenceDiagram
    participant Officer
    participant UI as Streamlit UI
    participant P as Layer 1 Perception
    participant PL as Layer 4 Planner
    participant V as Layer 2 Verifier
    participant BC as Layer 3 Blockchain

    Officer->>UI: submit report + image + credentials
    UI->>P: analyze(text, image)
    P-->>UI: threat level, detections, confidence

    UI->>PL: generate_plan(perception, officer)
    PL->>PL: force size = enemy estimate x threat multiplier
    PL-->>UI: deployment plan (action, force, justification)

    UI->>V: verify_deployment(plan, perception)
    V->>V: Gate 1 syntactic -> Gate 2 semantic -> Gate 3 dimensional -> Gate 4 regulatory

    alt any gate fails
        V-->>UI: DENIED, blocking exception with reason
    else all gates pass
        V-->>UI: APPROVED
        UI->>BC: logDecision(hashes, approved, officer address)
        BC-->>UI: recordId, tx hash, causal chain
    end

    UI->>Officer: final decision + audit trail
        `,
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
      {
        heading: 'How it works',
        body: [
          'Every frame runs through two parallel YOLOv8n passes — one filtered to the person class for tracking, one across the rest of COCO for scene objects — then MediaPipe Pose estimates joint angles (spine angle, shoulder tilt, forward-head ratio) to classify posture and body position.',
          'Identities persist across frames via IoU bounding-box matching, not re-detection from scratch each frame; faces are resolved against a pickled face-encoding database so the same person keeps their name across a session. A live Q&A panel generates posture-specific prompts per tracked person, rendered both as an OpenCV overlay and a parallel Gradio dashboard.',
        ],
      },
    ],
    diagrams: [
      {
        title: 'Component Architecture',
        caption: 'Built from the actual module layout — detection, tracking, pose, and dual output.',
        code: `
flowchart LR
    CAM["Webcam Frame<br/>cv2.VideoCapture"]

    subgraph Detect["Detection"]
        PD["detector.py<br/>PersonDetector (YOLOv8n)"]
        OD["object_detector.py<br/>ObjectDetector (YOLOv8n, COCO)"]
    end

    subgraph Track["Tracking + Identity"]
        IM["identity_manager.py<br/>IoU bbox matching, UID assign"]
        FM["face_manager.py<br/>face_recognition, pickled DB"]
    end

    subgraph PoseGesture["Pose + Gesture"]
        PE["pose_estimator.py<br/>MediaPipe Pose, joint-angle math"]
        HF["MediaPipe Tasks<br/>HandLandmarker + FaceLandmarker"]
    end

    QA["qa_engine.py<br/>live QA panel from posture scores"]
    AN["annotator.py<br/>skeleton + bbox overlay"]

    CAM --> PD --> IM
    CAM --> OD
    IM --> FM
    IM --> PE
    PE --> QA
    IM --> AN
    OD --> AN
    PE --> AN

    AN --> CV["OpenCV Window<br/>live feed + overlays"]
    QA --> GR["Gradio Dashboard<br/>:7860"]
        `,
      },
      {
        title: 'Per-Frame Process Flow',
        caption: 'What runs on every single frame, start to finish.',
        code: `
sequenceDiagram
    participant Cam as Webcam
    participant App as app.py loop
    participant PD as PersonDetector
    participant IM as IdentityManager
    participant FM as FaceManager
    participant PE as PoseEstimator
    participant QA as QAEngine
    participant UI as OpenCV + Gradio

    Cam->>App: frame
    App->>PD: detect(frame)
    PD-->>App: person bboxes
    App->>IM: match bboxes to tracked identities (IoU)
    IM-->>App: identity per bbox (UID, name or Unknown)
    App->>FM: identify(face crop) if unresolved
    FM-->>App: matched name or None
    App->>PE: estimate(landmarks)
    PE-->>App: posture label, spine angle, issues
    App->>QA: generate_panel(summaries)
    QA-->>App: live question per identity
    App->>UI: draw_frame() -> OpenCV window
    App->>UI: push panel -> Gradio :7860
        `,
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
