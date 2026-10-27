import { useFadeIn } from '../hooks/useFadeIn';

const skills = [
  { label: 'Backend Development', cls: 'hl' },
  { label: 'Software Development', cls: '' },
  { label: 'AI Platform Development', cls: '' },
  { label: 'Agentic AI', cls: '' },
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
            Backend development is my main focus, grounded in software development: APIs, services, data systems and reliable architecture. I also build AI platforms and agentic AI systems, working on inference infrastructure, model evaluation, agent orchestration and tooling.
          </p>
          <h3 className="skills-subheading">Vibe-coding stack</h3>
          <p className="skills-desc-text">
            I use the MERN stack (MongoDB, Express, React and Node.js), alongside TypeScript, Next.js and frontend tools, to build interfaces and full-stack prototypes with AI assistance.
          </p>
          <h3 className="skills-subheading">Currently learning</h3>
          <p className="skills-desc-text">
            CUDA Python and Numba through NVIDIA DLI. One of three modules is complete; further study includes profiling and accelerated computing.
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
