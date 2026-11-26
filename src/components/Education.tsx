import { useFadeIn } from '../hooks/useFadeIn';

const credentials = [
  { name: 'B.Tech CSE (AI & ML) — Amity University Noida', status: 'Expected Jul 2027' },
  { name: 'Fundamentals of Accelerated Computing with CUDA Python — NVIDIA DLI', status: 'Completed · 8 hours' },
  { name: 'Introduction to Deploying RAG Pipelines for Production at Scale — NVIDIA DLI', status: 'Completed · 4 hours' },
  { name: 'Machine Learning Specialization — Stanford / Coursera', status: 'Completed' },
  { name: 'Java Spring Framework 6 with Spring Boot 3 — Udemy', status: 'Completed' },
  { name: 'Build and Secure Networks in Google Cloud — Google Cloud Skills Boost', status: 'Completed' },
  { name: 'Korea Business Culture Training — KOSME–Amity University', status: 'Completed · Aug 2026 · 16 hours' },
  { name: 'The Art of Compressing LLMs: Pruning, Distillation, and Quantization Demystified — NVIDIA DLI', status: 'Enrolled · In progress' },
];

export default function Education() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="education" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">Education &amp; Certifications</h2>
      </div>
      <ul className="journey-list">
        {credentials.map((credential, index) => (
          <li key={credential.name}>
            <div className={`j-row${index === 0 ? ' featured' : ''}`}>
              <span className="j-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="j-name">{credential.name}</span>
              <span className="j-date">{credential.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
