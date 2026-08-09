import { useFadeIn } from '../hooks/useFadeIn';

const skills = [
  { label: 'Agentic / LLM', cls: 'hl' },
  { label: 'Machine Learning', cls: '' },
  { label: 'Computer Vision', cls: '' },
  { label: 'Backend Systems', cls: '' },
  { label: 'Cloud / DevOps', cls: 'dim' },
];

export default function Skills() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="skills" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">Expertise</h2>
        <a href="#journey" className="sec-link">Full Stack →</a>
      </div>
      <div className="skills-wrap" id="tour-skills">
        <div className="skills-left">
          <p className="skills-desc-text">
            Building at the intersection of agentic AI and reliability infrastructure. LangGraph pipelines, eval harnesses, LLM proxies, CV systems — from research to prod. Python, Java, Claude API, pgvector, YOLOv8, Spring Boot, GCP.
          </p>
          <div className="skills-cta">
            <a href="#contact" className="pill-btn">Let's Work →</a>
          </div>
        </div>
        <ul className="skills-list">
          {skills.map((s) => (
            <li key={s.label} className={s.cls}>
              {s.label} <span className="skill-arrow">→</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
