export type VisitorType = 'recruiter' | 'founder' | 'engineer' | 'investor' | 'curious';

interface Profile {
  keywords: string[];
  pitch: string;
}

const PROFILES: Record<VisitorType, Profile> = {
  recruiter: {
    keywords: ['hire', 'hiring', 'team', 'position', 'opening', 'role', 'job', 'candidate', 'headcount', 'onboard'],
    pitch: `got it — recruiter mode.\n\nShubham is an AI engineer specialising in agentic systems and the reliability infra around them: eval harnesses, LLM proxies, guardrails middleware. He learns fast, owns end-to-end, and is actively targeting startup roles. Relocation-ready, SF is the goal.\n\nStack: Python, LangGraph, Claude API, Spring Boot, GCP. Ask me anything specific, or grab his resume via the footer.`,
  },
  founder: {
    keywords: ['startup', 'co-founder', 'cofounder', 'building', 'product', 'mvp', 'early stage', 'early-stage', 'raise', 'ship'],
    pitch: `founder to founder, then.\n\nShubham built Stakrid Logistics from scratch — 40+ endpoints, GCP CI/CD, cut manual processing 80% in under a year. He works with low overhead, high ownership, and a bias for shipping over planning. Currently deep in agentic AI at LifeAtlas.\n\nIf you're building something in AI infrastructure, agents, or reliability — worth a conversation. What are you working on?`,
  },
  engineer: {
    keywords: ['collaborate', 'open source', 'review', 'pr', 'contribute', 'fork', 'repo', 'library', 'sdk', 'architecture'],
    pitch: `fellow engineer — nice.\n\nChakra47-AgenticSwarm is open source on GitHub (github.com/kshubham090/Chakra47-AgenticSwarm) — LangGraph multi-agent swarm for physical AI. He's also building an agent eval harness and LLM gateway proxy if either of those overlap with your work.\n\nAlways up for architectural review, collab, or contribution. What's your angle?`,
  },
  investor: {
    keywords: ['portfolio', 'funding', 'invest', 'vc', 'venture', 'ai company', 'fund', 'round', 'thesis', 'traction'],
    pitch: `noted — investor lens.\n\nShubham has shipped two products: Stakrid (logistics, >80% efficiency gain) and currently at LifeAtlas building a voice-first AI connector. He's building toward his own AI infra company — eval harnesses and LLM observability are the wedge.\n\nIf that fits your thesis, his contact is kshubham04907@gmail.com. Fast to respond.`,
  },
  curious: {
    keywords: ['curious', 'just looking', 'browsing', 'explore', 'portfolio', 'learn', 'see', 'check out'],
    pitch: `welcome — take your time.\n\nShort version: AI engineer from Noida, India. Builds agentic systems and the infra that keeps them reliable. Current work: LifeAtlas voice pipeline (Sweden, remote). Previous: founded Stakrid Logistics. Target: SF.\n\nAnything specific you want to dig into — projects, stack, background?`,
  },
};

export function classifyVisitor(text: string): VisitorType {
  const t = text.toLowerCase();
  for (const [type, profile] of Object.entries(PROFILES) as [VisitorType, Profile][]) {
    if (profile.keywords.some((k) => t.includes(k))) return type;
  }
  return 'curious';
}

export function getPitch(type: VisitorType): string {
  return PROFILES[type].pitch;
}
