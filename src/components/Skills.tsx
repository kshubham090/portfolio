import { useFadeIn } from '../hooks/useFadeIn';

const skills = [
  { label: 'AI Engineering', cls: 'hl' },
  { label: 'Backend Software', cls: '' },
  { label: 'Systems Design & Data', cls: '' },
  { label: 'Cloud & Reliability', cls: '' },
];

export default function Skills() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="skills" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">Expertise</h2>
        <a href="#education" className="sec-link">Education &amp; Certifications →</a>
      </div>
      <div className="skills-wrap" id="tour-skills">
        <div className="skills-left">
          <p className="skills-desc-text">
            Python, Java, TypeScript and SQL; FastAPI, Spring Boot and Node.js. I build RAG pipelines and agent tooling with PyTorch, LangGraph, pgvector and Neo4j, and use CUDA Python and Numba for accelerated-computing work.
          </p>
          <h3 className="skills-subheading">Systems, cloud &amp; delivery</h3>
          <p className="skills-desc-text">
            PostgreSQL, Redis, response caching, tenant isolation, idempotency and durable queues. Azure Container Apps, Managed Redis, Blob Storage and Key Vault; GCP, Bicep, managed identities and Azure DevOps staging CI with protected release controls.
          </p>
          <h3 className="skills-subheading">Currently learning</h3>
          <p className="skills-desc-text">
            LLM pruning, distillation and quantization through NVIDIA DLI. CUDA Python (8 hours) and deploying RAG pipelines at scale (4 hours) are completed.
          </p>
          <h3 className="skills-subheading">Azure Foundry deployment usage</h3>
          <p className="skills-desc-text">25 October–25 November 2026 · Deployment monitoring totals.</p>
          <p className="skills-desc-text"><code>gpt-6-astra</code>: 5.47B tokens · 49.2K requests · 111,188 average tokens/request.</p>
          <p className="skills-desc-text"><code>gpt-6.1-sol</code>: 3.81B tokens · 31.1K requests · 122,462 average tokens/request.</p>
          <p className="skills-desc-text">Usage volume measures deployment activity, not model training or performance.</p>
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
