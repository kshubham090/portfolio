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
        <span className="sec-label">Expertise</span>
        <a href="#journey" className="sec-link">Full Stack →</a>
      </div>
      <div className="skills-wrap" id="tour-skills">
        <div className="skills-left">
          <svg className="skills-blob" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M320,160 C360,200 380,260 340,310 C300,360 220,380 160,350 C100,320 60,250 80,180 C100,110 180,60 250,70 C320,80 280,120 320,160 Z" fill="white" />
          </svg>
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
