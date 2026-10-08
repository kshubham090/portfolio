import { useFadeIn } from '../hooks/useFadeIn';

const skills = [
  { label: 'AI / Agent Systems', cls: 'hl' },
  { label: 'Full-Stack Applications', cls: '' },
  { label: 'Data / Backend Systems', cls: '' },
  { label: 'Cloud / Engineering Quality', cls: '' },
  { label: 'Accelerated Computing · Learning', cls: 'dim' },
];

export default function Skills() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="skills" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">Expertise</h2>
        <a href="#journey" className="sec-link">Experience &amp; Learning →</a>
      </div>
      <div className="skills-wrap" id="tour-skills">
        <div className="skills-left">
          <p className="skills-desc-text">
            TypeScript, React and Next.js for product interfaces; Node.js, Fastify, Python and Spring Boot for APIs and services. PostgreSQL, transactional workflows, LangGraph, model evaluation, TensorFlow/Keras training and PyTorch inference. GCP and Azure, with automated tests, CI/CD and monitoring around the work.
          </p>
          <p className="skills-desc-text">
            Currently learning CUDA Python and Numba through NVIDIA DLI. One of three modules is complete; further study includes profiling and accelerated computing.
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
