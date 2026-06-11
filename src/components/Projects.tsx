import { useFadeIn } from '../hooks/useFadeIn';

const ongoing = [
  { name: 'Agent Eval Harness', desc: 'CI-based behavioral regression testing for agents', status: 'Building' },
  { name: 'LLM Gateway / Proxy', desc: 'Cost attribution, semantic caching, model routing', status: 'Building' },
  { name: 'Agent Guardrails Middleware', desc: 'Pre-action validation, retry-with-repair, kill switch', status: 'Building' },
];

const done = [
  { num: '01', name: 'Chakra47', colorClass: 'proj-color-chakra', img: '/uploads/47 (3).png', tags: ['4-Layer Autonomous OS', 'LangGraph Swarm', 'Physical AI'] },
  { num: '02', name: 'Symbiote-X', colorClass: 'proj-color-symbiote', img: '/uploads/Black and Orange Square Art & Design Logo.png', tags: ['Neuro-Symbolic', 'OPA Validation', 'AI Safety'] },
  { num: '03', name: 'Military Deployment System', colorClass: 'proj-color-military', img: '/uploads/f7a57771-15ab-46ac-8882-97eafd241b96.jpg', tags: ['CNN Threat Detection', 'Claude Reasoning', 'RoE Validation'] },
  { num: '04', name: 'Real-Time Posture Analysis', colorClass: 'proj-color-posture', img: '/uploads/image.png', tags: ['25+ FPS on CPU', 'MediaPipe', 'Quantization'] },
];

export default function Projects() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="projects" ref={ref}>
      <div className="sec-row">
        <span className="sec-label">Projects</span>
        <a href="https://github.com/kshubham090" target="_blank" rel="noreferrer" className="sec-link">View All →</a>
      </div>

      <div className="ongoing-label">In Progress</div>
      <ul className="ongoing-list" id="tour-projects">
        {ongoing.map((p) => (
          <li key={p.name} className="ongoing-item">
            <div className="ongoing-left">
              <span className="ongoing-dot" />
              <span className="ongoing-name">{p.name}</span>
            </div>
            <span className="ongoing-desc">{p.desc}</span>
            <span className="ongoing-status">{p.status}</span>
          </li>
        ))}
        <li className="ongoing-item ongoing-item--oss">
          <div className="ongoing-left">
            <span className="ongoing-dot ongoing-dot--oss" />
            <span className="ongoing-name">Chakra47 — AgenticSwarm</span>
          </div>
          <span className="ongoing-desc">Open source. Use it if you're a developer — or simply contribute.</span>
          <a href="https://github.com/kshubham090/Chakra47-AgenticSwarm" target="_blank" rel="noreferrer" className="ongoing-gh-link">GitHub →</a>
        </li>
      </ul>

      <div className="ongoing-label" style={{ marginTop: 56 }}>Done</div>
      <ul className="proj-list">
        {done.map((p, i) => (
          <li key={p.num} className={`proj-row ${p.colorClass}${i % 2 !== 0 ? ' proj-row--reverse' : ''}`}>
            <div className="proj-row-img">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="proj-row-content">
              <span className="proj-row-name">{p.name}</span>
              <div className="proj-row-tags">
                {p.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
              </div>
            </div>
            <span className="proj-row-cta">→</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
