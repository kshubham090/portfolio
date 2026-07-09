import { Link } from 'react-router-dom';
import { useFadeIn } from '../hooks/useFadeIn';

const timeline = [
  { name: 'Chakra47', desc: '4-layer autonomous OS for physical AI. Open source — LangGraph swarm, SHA-256 audit chain.', status: 'Shipped', slug: 'chakra47' },
  { name: 'Lowq X1 — Agent Eval Harness', desc: 'CI-based behavioral regression testing for agents, built from scratch. 96 tests passing.', status: 'Shipped', slug: 'lowq-x1-agent-eval-harness' },
  { name: 'Lowq X2 — Contextual LLM Gateway', desc: 'Neo4j memory graph — cost attribution, semantic caching, model routing with fallback.', status: 'Shipped', slug: 'lowq-x2-contextual-llm-gateway' },
  { name: 'Military Deployment System', desc: 'CNN threat detection + Claude reasoning + RoE validation. AI Impact Summit 2026.', status: 'Shipped', slug: 'military-deployment-decision-system' },
  { name: 'Real-Time Posture Analysis', desc: '25+ FPS on CPU. MediaPipe pipeline with model quantization.', status: 'Shipped', slug: 'real-time-posture-analysis' },
  { name: 'Agent Guardrails Middleware', desc: 'Pre-action validation, retry-with-repair, kill switch.', status: 'Building', slug: null },
];

export default function Projects() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="projects" ref={ref}>
      <div className="sec-row">
        <span className="sec-label">Projects</span>
      </div>

      <ol className="timeline" id="tour-projects">
        {timeline.map((p) => {
          const card = (
            <div className="timeline-card">
              <div className="timeline-card-head">
                <span className="timeline-card-title">{p.name}</span>
                <span className={`timeline-card-status${p.status === 'Building' ? ' timeline-card-status--building' : ''}`}>
                  {p.status}
                </span>
              </div>
              <p className="timeline-card-desc">{p.desc}</p>
            </div>
          );
          return (
            <li key={p.name} className="timeline-item">
              <span className="timeline-dot" />
              {p.slug ? (
                <Link to={`/projects/${p.slug}`} className="timeline-card-link">{card}</Link>
              ) : card}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
