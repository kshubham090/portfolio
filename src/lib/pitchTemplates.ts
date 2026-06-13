export type VisitorType = 'recruiter' | 'founder' | 'engineer' | 'investor' | 'curious';

interface Profile {
  keywords: string[];
  pitch: string;
}

const PROFILES: Record<VisitorType, Profile> = {
  recruiter: {
    keywords: ['hire', 'hiring', 'team', 'position', 'opening', 'role', 'job', 'candidate', 'headcount', 'onboard'],
    pitch: `got it. AI engineer, 20. Ships in prod — leads the voice pipeline at LifeAtlas (Retell AI + Twilio + Claude + pgvector). Before that: founded Stakrid Logistics solo (40+ APIs, cut latency 4x in under a year). Side builds: agent eval harness, LLM gateway, guardrails middleware — all reliability infra.\n\nTargeting early-stage startups. SF is the goal, relocation-ready.\n\nWhat kind of role? Even a sentence helps me get specific.`,
  },
  founder: {
    keywords: ['startup', 'co-founder', 'cofounder', 'building', 'product', 'mvp', 'early stage', 'early-stage', 'raise', 'ship'],
    pitch: `founder to founder.\n\nShubham built Stakrid solo — 40+ endpoints, GCP infra, shipped in under a year. Now leading AI infra at LifeAtlas. High ownership, low overhead, bias for shipping over planning.\n\nWhat are you building?`,
  },
  engineer: {
    keywords: ['collaborate', 'open source', 'review', 'pr', 'contribute', 'fork', 'repo', 'library', 'sdk', 'architecture'],
    pitch: `fellow builder.\n\nChakra47-AgenticSwarm is open source — LangGraph multi-agent swarm for physical AI (github.com/kshubham090/Chakra47-AgenticSwarm). Also building an agent eval harness and LLM gateway if there's overlap.\n\nWhat are you working on?`,
  },
  investor: {
    keywords: ['portfolio', 'funding', 'invest', 'vc', 'venture', 'ai company', 'fund', 'round', 'thesis', 'traction'],
    pitch: `noted. Two products shipped: Stakrid (logistics, >80% efficiency gain, under a year, solo) and LifeAtlas voice pipeline (AI connector, in prod). Next move: own AI infra company — eval harnesses and LLM observability as the wedge.\n\nFits your thesis? kshubham04907@gmail.com — responds same day.`,
  },
  curious: {
    keywords: ['curious', 'just looking', 'browsing', 'explore', 'portfolio', 'learn', 'see', 'check out'],
    pitch: `quick pitch: Shubham, 20. AI engineer. Agentic systems + the reliability infra around them. Voice pipeline at LifeAtlas in prod. Founded Stakrid. SF-bound.\n\nAnything specific you want to dig into?`,
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
