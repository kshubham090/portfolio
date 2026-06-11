import { useFadeIn } from '../hooks/useFadeIn';

const posts = [
  {
    label: 'AI Impact Summit 2026',
    cat: 'Deep Tech',
    date: '3 months ago',
    title: "Presenting to the Ministry of Home Affairs: why hard-coded RoE validation isn't optional when Claude is reasoning over deployment decisions.",
    read: '3 min read',
  },
  {
    label: 'Chakra47 — Dev Log',
    cat: 'Agentic AI',
    date: '1 month ago',
    title: "Why I'm building an agent eval harness before shipping anything else. Behavioral regression testing is the reliability layer nobody talks about.",
    read: '5 min read',
  },
  {
    label: 'Year in Review',
    cat: 'Reflection',
    date: '5 months ago',
    title: '2025: stopped theorizing, started shipping. Stakrid taught me that 80% cuts in manual work come from boring, reliable backend infrastructure.',
    read: '2 min read',
  },
];

export default function Thoughts() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" ref={ref}>
      <div className="sec-row">
        <span className="sec-label">Thoughts</span>
        <a href="https://linkedin.com/in/shubhamgupta04907" target="_blank" rel="noreferrer" className="sec-link">View All →</a>
      </div>
      <div className="blog-grid">
        {posts.map((p) => (
          <div key={p.label} className="blog-card">
            <div className="blog-img-wrap">
              <span className="blog-img-label">{p.label}</span>
            </div>
            <div className="blog-meta">
              <span className="blog-cat">{p.cat}</span>
              <span className="blog-dot">·</span>
              <span className="blog-date">{p.date}</span>
            </div>
            <p className="blog-title-text">{p.title}</p>
            <span className="blog-read">{p.read}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
