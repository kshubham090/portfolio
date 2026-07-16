import { useFadeIn } from '../hooks/useFadeIn';

interface Post {
  url: string;
  platform: 'LinkedIn' | 'X';
  date: string;
  title?: string;
  excerpt: string;
  tags: string[];
}

const POSTS: Post[] = [
  {
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7435354971174486016/',
    platform: 'LinkedIn',
    date: '4mo ago',
    excerpt:
      "Spent last week at the AI Impact Summit 2026 — rooms full of people who actually move things: ministries, MNCs, founders who've been in the trenches long enough to smell a real problem. Put Symbiote-X on the table with the Ministry of Home Affairs, Fortune-level executives, and early-stage founders in the room. Physical AI isn't a bet anymore — it's a direction.",
    tags: ['#PhysicalAI', '#Symbiotex', '#AIImpactSummit2026', '#DeepTech'],
  },
  {
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7481089527252549633/',
    platform: 'LinkedIn',
    date: '6d ago',
    excerpt:
      "Released two new projects — calling the series Lowq (\"low IQ\"; AI isn't that smart yet, it just pretends well). Agent Eval Harness catches when a prompt change or model swap quietly makes your agent worse before it ships. Contextual LLM Gateway is an LLM gateway with real memory — Neo4j knowledge graph, semantic caching, cost attribution. Both live, both open source.",
    tags: ['#Lowq', '#AgentEvalHarness', '#LLMGateway', '#OpenSource'],
  },
  {
    url: 'https://x.com/skg_curious/status/2064070781110464992',
    platform: 'X',
    date: 'Jun 9',
    title: 'Why your agent works in the demo and fails in production',
    excerpt:
      "A demo succeeds because nothing is allowed to go wrong — one input, one path, you at the keyboard. Production is different: unexpected inputs, silent tool failures, a context window that keeps growing until the original instructions get buried. The fix isn't glamorous — traces on every action, scored evals in CI, hard limits on tokens and retries. That's what separates a product from a prototype.",
    tags: ['#AgentReliability', '#Evals', '#ProductionAI'],
  },
];

export default function Thoughts() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" ref={ref}>
      <div className="sec-row">
        <span className="sec-label">Writing</span>
        <div className="sec-links-group">
          <a href="https://linkedin.com/in/shubhamgupta04907" target="_blank" rel="noreferrer" className="sec-link">LinkedIn →</a>
          <a href="https://x.com/skg_curious" target="_blank" rel="noreferrer" className="sec-link">X →</a>
        </div>
      </div>

      <div className="li-post-grid">
        {POSTS.map((p) => (
          <a key={p.url} href={p.url} target="_blank" rel="noreferrer" className="li-post-card">
            <div className="li-post-head">
              <span className="li-post-platform">{p.platform}</span>
              <span className="li-post-date">{p.date}</span>
            </div>
            {p.title && <p className="li-post-title">{p.title}</p>}
            <p className="li-post-excerpt">{p.excerpt}</p>
            <div className="li-post-tags">
              {p.tags.map((t) => <span key={t} className="li-post-tag">{t}</span>)}
            </div>
            <span className="li-post-link">View on {p.platform} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
