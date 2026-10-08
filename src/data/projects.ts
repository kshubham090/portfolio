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
  status?: string;
  category?: 'Products' | 'Agent systems' | 'Research' | 'Applications';
  img?: string;
  imgFit?: 'cover' | 'contain';
  tags: string[];
  links: ProjectLink[];
  sections: ProjectSection[];
  diagrams?: ProjectDiagram[];
}

export const projects: Project[] = [
  {
    "slug": "hunt",
    "name": "HUNT — Accounts Receivable",
    "shortName": "HUNT",
    "tagline": "Invoice workflows, financial visibility and AI-assisted payment follow-ups with human approval.",
    "status": "Early access",
    "category": "Products",
    "tags": [
      "TypeScript / React",
      "Node.js / Fastify",
      "PostgreSQL",
      "Azure OpenAI"
    ],
    "links": [
      {
        "label": "Visit HUNT",
        "url": "https://www.gogethunt.com"
      },
      {
        "label": "Explore the demo",
        "url": "https://demo.gogethunt.com"
      }
    ],
    "sections": [
      {
        "heading": "What it is",
        "body": [
          "An accounts-receivable workspace for B2B teams: create and review invoices, understand outstanding balances, and prepare payment follow-ups with configurable AI personas and human approval controls.",
          "HUNT is in early access. The public demo uses fictional records and scripted conversations so visitors can explore the product without connecting a business account."
        ]
      },
      {
        "heading": "What I built",
        "body": [
          "A TypeScript and React frontend backed by Node.js/Fastify REST APIs, PostgreSQL and a derived Neo4j graph. The invoice workspace supports creation, draft editing, issuance, customer records, payment allocations and reviewed CSV, XLSX and text-PDF imports.",
          "Owner/admin permissions and PostgreSQL row-level security scope access to each workspace. Transactions, request idempotency and balance checks protect ledger updates from duplicate allocations and overpayment."
        ]
      },
      {
        "heading": "Engineering and current scope",
        "body": [
          "Vitest API tests and Playwright browser journeys cover imports, access controls and invoice workflows. GitHub Actions runs linting, type checks, builds and integration checks against disposable PostgreSQL and Neo4j services.",
          "Azure OpenAI and Key Vault integrations support AI-assisted workflows and credential handling. Public demo access is separate from the authenticated product and does not establish live outreach or payment-provider activation."
        ]
      },
      {
        "heading": "Startup programs",
        "body": [
          "HUNT has been accepted into Microsoft for Startups, NVIDIA Inception and Sarvam's Startup Program."
        ]
      }
    ]
  },
  {
    "slug": "staffly",
    "name": "Staffly — Staffing & Workforce Management",
    "shortName": "Staffly",
    "tagline": "AI-assisted, human-led staffing: requests, reviewed offers, shifts, hours and approval documents in one workflow.",
    "status": "Live MVP",
    "category": "Products",
    "tags": [
      "Next.js / React",
      "TypeScript",
      "PostgreSQL",
      "Azure OpenAI"
    ],
    "links": [
      {
        "label": "Open Staffly",
        "url": "https://staffly-navy-psi.vercel.app"
      }
    ],
    "sections": [
      {
        "heading": "What it is",
        "body": [
          "A staffing and workforce-management MVP with public onboarding and an isolated demo. Company, operator, worker and finance interfaces connect staffing requests to reviewed offers, shift acceptance, reported hours and approval drafts.",
          "The product is AI-assisted and human-led: people review matches, offers and documents before acting. English, Swedish and French interfaces support the workflow."
        ]
      },
      {
        "heading": "What I built",
        "body": [
          "TypeScript, React and Next.js interfaces with Node.js server workflows, Supabase/PostgreSQL persistence and Azure OpenAI for structured assistance and reviewed document drafts.",
          "Transactional workflow commands, idempotent retries and tenant isolation handle repeated requests and concurrent acceptance. Database checks prevent overlapping assignments and overbooking."
        ]
      },
      {
        "heading": "Verification and scope",
        "body": [
          "Local verification recorded on 5 October 2026 includes 768 unit/regression tests and 42 database concurrency scenarios covering workflow behavior and access boundaries.",
          "Generated PDFs support review and approval. Payroll processing and legally issued invoices are outside the current MVP scope."
        ]
      }
    ]
  },
  {
    "slug": "chakra47",
    "name": "Chakra47 — Apps for the Physical World",
    "shortName": "Chakra47",
    "tagline": "An application and management layer above Linux, RTOS environments and robot controllers.",
    "status": "In development",
    "category": "Products",
    "img": "/uploads/47 (3).png",
    "tags": [
      "Physical-world applications",
      "Application management",
      "Linux / RTOS",
      "In development"
    ],
    "links": [
      {
        "label": "Visit Chakra47",
        "url": "https://chakra47.com"
      },
      {
        "label": "Earlier AgenticSwarm research",
        "url": "https://github.com/kshubham090/Chakra47-AgenticSwarm"
      }
    ],
    "sections": [
      {
        "heading": "Apps for the physical world",
        "body": [
          "Chakra47 is being developed as an application and management layer for physical systems. The direction is to help teams work with applications above the Linux, RTOS and robot-controller software already running on their devices."
        ]
      },
      {
        "heading": "Current stage",
        "body": [
          "The current work is product and architecture development. The public site introduces the concept; hardware integration and device deployment remain development goals.",
          "Existing operating systems and controllers remain underneath the proposed layer. Chakra47 is not a shipped replacement for those systems."
        ]
      },
      {
        "heading": "Research background",
        "body": [
          "Earlier work explored governed multi-agent orchestration, policy checks and auditable decisions. That work remains available separately as the AgenticSwarm research prototype, associated with the Symbiote-X presentation at the India AI Impact Summit 2026."
        ]
      }
    ]
  },
  {
    "slug": "chakra47-agentic-swarm",
    "name": "AgenticSwarm — Governed Multi-Agent Research",
    "shortName": "AgenticSwarm",
    "tagline": "A research prototype combining structured orchestration, policy checks and a hash-linked decision record.",
    "status": "Research prototype",
    "category": "Research",
    "tags": [
      "Python orchestration",
      "Policy checks",
      "SHA-256 audit chain",
      "Multi-agent research"
    ],
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/kshubham090/Chakra47-AgenticSwarm"
      }
    ],
    "sections": [
      {
        "heading": "What it explores",
        "body": [
          "A four-layer approach to multi-agent systems: structured input, a symbolic rule engine, a SHA-256 audit chain and a custom Python orchestrator. Deterministic checks handle defined conditions, with uncertain cases routed for model assistance or human review."
        ]
      },
      {
        "heading": "Research history",
        "body": [
          "Related Chakra47 research was presented as Symbiote-X at the India AI Impact Summit 2026. This public prototype is distinct from the newer Chakra47 application and management layer now in development.",
          "The repository provides an implementation to inspect and experiment with; it does not establish deployment of an operating system or physical-device control platform."
        ]
      }
    ]
  },
  {
    "slug": "lowq-x1-agent-eval-harness",
    "name": "Lowq X1 — Agent Eval Harness",
    "shortName": "Agent Eval Harness",
    "tagline": "Evaluate agent outputs and tool trajectories, compare repeated runs, and catch dataset or scoring-protocol regressions.",
    "status": "Open source",
    "category": "Agent systems",
    "img": "/uploads/lowq-logo.png",
    "imgFit": "contain",
    "tags": [
      "Python",
      "Codex / Claude Code adapters",
      "Trajectory scoring",
      "Regression gates"
    ],
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/kshubham090/Agent-Eval-Harness"
      }
    ],
    "sections": [
      {
        "heading": "What it is",
        "body": [
          "An evaluation harness for testing changes to agent behavior. It scores final outputs and tool-call trajectories, saves comparable baselines, and produces reports that make regressions easier to investigate.",
          "Adapters support Codex, Claude Code, Python callables, command-line programs and HTTP endpoints. Codex trace parsing recognizes MCP tool names when they appear in protocol events."
        ]
      },
      {
        "heading": "How it works",
        "body": [
          "Output scorers include exact match, regular expressions, embedding similarity and LLM-as-judge. Trajectory scoring examines the sequence of tool calls alongside the final answer.",
          "Dataset fingerprints and scoring-protocol checks protect baseline comparisons. Repeated runs report variation, while configurable regression gates provide a CI pass/fail result."
        ]
      },
      {
        "heading": "Verification — 4 October 2026",
        "body": [
          "407 tests passed on Linux, with CI coverage across Linux, macOS and Windows. Offline protocol tests exercise adapter parsing; they are not authenticated live Codex or Claude Code benchmark runs.",
          "Judge calibration and agent evaluation are separate experiments. A high judge score on a benchmark does not, by itself, establish agreement with human grading."
        ]
      }
    ],
    "diagrams": [
      {
        "title": "Evaluation flow",
        "caption": "Adapters normalize agent responses before output and trajectory scoring; comparisons check both the dataset and scoring protocol.",
        "code": "flowchart LR\n    D[\"Dataset + fingerprint\"] --> R[\"Evaluation runner\"]\n    A[\"Codex / Claude Code / Python / CLI / HTTP adapters\"] --> R\n    R --> O[\"Output + trajectory scorers\"]\n    O --> S[\"Results + repeated-run statistics\"]\n    S --> C[\"Dataset and protocol checks\"]\n    B[\"Saved baseline\"] --> C\n    C --> G[\"Regression gate + report\"]"
      }
    ]
  },
  {
    "slug": "lowq-x2-contextual-llm-gateway",
    "name": "Lowq X2 — Contextual LLM Gateway",
    "shortName": "Contextual LLM Gateway",
    "tagline": "Scoped context, exact caching and durable graph updates around an observable LLM request pipeline.",
    "status": "Open source",
    "category": "Agent systems",
    "img": "/uploads/lowq-logo.png",
    "imgFit": "contain",
    "tags": [
      "FastAPI",
      "PostgreSQL / Neo4j",
      "Transactional outbox",
      "Inference benchmarks"
    ],
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/kshubham090/contextual-llm-gateway"
      }
    ],
    "sections": [
      {
        "heading": "What it is",
        "body": [
          "A FastAPI gateway for LLM requests with scoped PostgreSQL and Neo4j context, exact caching, provider routing and usage records. It makes retrieved context and request behavior inspectable without assuming that more stored history automatically improves an answer."
        ]
      },
      {
        "heading": "Durability and isolation",
        "body": [
          "PostgreSQL records durable state and graph-update outbox work together. An outbox worker delivers changes to Neo4j, so derived graph updates can recover from interruption rather than depending on an untracked background task.",
          "Tenant scoping, circuit breakers and Prometheus metrics address access boundaries and service failures. Context retrieval and caching respect request scope; generated-answer quality still needs evaluation for the application using the gateway."
        ]
      },
      {
        "heading": "Verification — 4 October 2026",
        "body": [
          "158 tests passed, including nine service integration tests covering the gateway and its service boundaries."
        ]
      },
      {
        "heading": "Embedding experiment — 4 October 2026",
        "body": [
          "A three-trial MiniLM experiment measured 8.36× higher warm embedding throughput on Apple MPS with batch size 32 versus 1. This result is specific to the embedding workload, batching comparison and tested hardware.",
          "Optional CPU, CUDA and MPS inference backends are implemented. The MPS result is neither an end-to-end gateway speedup nor a measured CUDA result."
        ]
      }
    ],
    "diagrams": [
      {
        "title": "Context and durable graph updates",
        "caption": "PostgreSQL holds durable state; Neo4j is updated through the outbox worker. Exact caching and retrieved context stay within request scope.",
        "code": "flowchart LR\n    C[\"Client request\"] --> G[\"FastAPI gateway + scope checks\"]\n    G --> E[\"Exact cache / scoped context\"]\n    E -->|cache miss| P[\"Model provider\"]\n    E <--> DB[(\"PostgreSQL + pgvector\")]\n    E <--> N[(\"Neo4j context graph\")]\n    P --> W[\"Record result + outbox work\"]\n    W --> DB\n    DB --> O[\"Outbox worker\"]\n    O --> N\n    G --> M[\"Circuit breakers + Prometheus metrics\"]"
      }
    ]
  },
  {
    "slug": "flexfit-studio",
    "name": "FlexFit Studio — Gym Management",
    "shortName": "FlexFit Studio",
    "tagline": "A full-stack application for bookings, memberships, payments and waitlists, with transactional domain workflows.",
    "status": "Application prototype",
    "category": "Applications",
    "tags": [
      "TypeScript / Next.js",
      "tRPC",
      "Drizzle / SQLite",
      "Vitest"
    ],
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/kshubham090/flexfit-studio"
      }
    ],
    "sections": [
      {
        "heading": "What it is",
        "body": [
          "A gym-management application built with TypeScript, React, Next.js, Node.js and tRPC. Role-aware interfaces cover bookings, memberships, rescheduling and administrative workflows."
        ]
      },
      {
        "heading": "Data and domain logic",
        "body": [
          "Typed API routers are separated from domain services. A Drizzle/SQLite model connects 14 related tables, with transactional cancellations, credit refunds and waitlist promotion.",
          "Loading and error states, cache updates and authorization-aware controls connect the frontend to the underlying workflow rules."
        ]
      },
      {
        "heading": "Verification",
        "body": [
          "The inspected repository includes 76 Vitest tests across 12 files covering booking, payment and administrative behavior."
        ]
      }
    ]
  },
  {
    "slug": "stakrid",
    "name": "Stakrid Logistics",
    "shortName": "Stakrid",
    "tagline": "A logistics platform built and operated end to end, from REST APIs and cloud infrastructure to daily workflows.",
    "status": "Completed · Jan 2025–Jan 2026",
    "category": "Applications",
    "tags": [
      "Java / Spring Boot",
      "40+ REST endpoints",
      "GCP",
      "CI/CD"
    ],
    "links": [
      {
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/company/stakrid"
      }
    ],
    "sections": [
      {
        "heading": "What I built",
        "body": [
          "40+ Spring Boot REST endpoints and GCP infrastructure with CI/CD and monitoring, supporting a logistics platform and its operational workflows.",
          "I handled product engineering, infrastructure and operations from January 2025 to January 2026."
        ]
      },
      {
        "heading": "Results",
        "body": [
          "Workflow automation reduced manual processing by 80%.",
          "Query optimization and connection pooling reduced API latency from 800 ms to under 200 ms. These are separate operational and performance improvements."
        ]
      }
    ]
  },
  {
    slug: 'relogged',
    name: 'Relogged — Tool-Call Replay Debugger',
    shortName: 'Relogged',
    status: 'Open source',
    category: 'Agent systems',
    tagline: 'Record and inspect LangGraph runs, then replay a trace or resume from a checkpoint to investigate a decision.',
    tags: ['LangGraph', 'Record & Replay', 'Fork-and-Fix', 'Postgres'],
    links: [
      { label: 'GitHub', url: 'https://github.com/kshubham090/relogged' },
    ],
    sections: [
      {
        heading: 'What it is',
        body: [
          'Debugging a failed agent run normally means re-running the whole thing and hoping the bug repros — expensive, non-deterministic, and it burns real API calls every time. Relogged records every tool call and state transition during a real run, then lets you read the stored trace without live model or tool calls.',
          'One decorator — @record(project=...) around your existing entry point — and everything is instrumented automatically. No changes to agent code.',
        ],
      },
      {
        heading: 'Why it exists',
        body: [
          "There's no stack trace for a bad agent decision. The agent doesn't crash — a tool returns a bad value and the agent confidently builds a wrong answer on top of it.",
          'Observability platforms (LangSmith, Langfuse, Braintrust) solve monitoring at scale. They don\'t solve the narrow, personal workflow this targets: "this one run failed — let me step backward through exactly what happened, fix one step, and see if that would have fixed it, without hitting real APIs again."',
        ],
      },
      {
        heading: 'How it works',
        body: [
          'Recording: temporarily monkeypatches CompiledStateGraph.invoke at the class level (scoped by a ContextVar), installs wrap_tool_call on every ToolNode, and logs interleaved tool calls and state snapshots to Postgres with a thread-safe step counter.',
          'Pure replay is a plain SQL read — no LangGraph object is ever touched, so there is no code path by which it can call a real tool. A sandbox-guarantee test proves it by poisoning the real tools and asserting they are never invoked.',
          'Fork/override replay resumes the graph live from LangGraph\'s own checkpoint history: steps before the fork never re-run, the fork step gets your corrected value instead of the real tool, and everything after runs for real — does the fix actually change the outcome?',
          'Recorded-trace replay and live fork replay are separate modes: later steps in a fork can call models and tools, while reading a stored trace does not.',
        ],
      },
    ],
    diagrams: [
      {
        title: 'Architecture',
        caption: 'One decorator instruments everything; Postgres holds the trace; replay never has to touch your agent.',
        code: `
flowchart TB
    subgraph UserCode["Your agent code (unchanged)"]
        Fn["run_agent(input)<br/>@record(project=...)"]
        Graph["graph.invoke(...)"]
        Fn --> Graph
    end

    subgraph Relogged["relogged package"]
        Patch["patch.py<br/>monkeypatched invoke/stream"]
        Interceptor["interceptor.py<br/>ToolInterceptor"]
        Callbacks["callbacks.py<br/>state + LLM logging"]
        Recorder["recorder.py<br/>Recorder + ContextVar"]
        Replay["replay.py<br/>pure_replay · override_replay"]
        CLI["cli.py<br/>list / show / replay"]
    end

    subgraph Storage["Postgres"]
        Runs[("runs")]
        Steps[("steps")]
        Sessions[("replay_sessions")]
    end

    Graph -. "patched only inside record()" .-> Patch
    Patch --> Interceptor
    Patch --> Callbacks
    Interceptor --> Recorder
    Callbacks --> Recorder
    Recorder --> Runs
    Recorder --> Steps
    CLI --> Replay
    Replay --> Steps
    Replay --> Sessions
    Replay -. "override mode only:<br/>resume from checkpoint" .-> Graph
        `,
      },
      {
        title: 'Fork / Override Replay',
        caption: 'Fix one step, resume live from there — the broken tool is never called again.',
        code: `
sequenceDiagram
    participant CLI as relogged replay --override
    participant RP as replay.py
    participant DB as Postgres
    participant G as Graph (checkpointer)
    participant I as ToolInterceptor

    CLI->>RP: override_replay(run_id, from_step, fix.json)
    RP->>DB: load original run + steps
    RP->>G: get_state_history(thread_id)
    Note over RP,G: find checkpoint matching from_step
    RP->>G: graph.invoke(None, resume_checkpoint)

    Note over G: nodes before the fork never re-run

    G->>I: wrap_tool_call() — fork point
    I-->>G: override output (real tool never called)

    G->>I: wrap_tool_call() — later steps
    I->>G: real tool call (live)

    G-->>RP: result
    RP->>DB: INSERT forked run + replay_session
    RP-->>CLI: new_run_id
        `,
      },
    ],
  },
  {
    slug: 'military-deployment-decision-system',
    name: 'Military Deployment Decision System',
    shortName: 'Deployment Decision System',
    tagline: 'A 4-layer deployment pipeline — perception, deterministic planning, blocking rules-of-engagement verification, and an on-chain audit trail.',
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
