import { useDynamicHeading } from '../hooks/useDynamicHeading';

export default function Hero() {
  const { lines, swapping } = useDynamicHeading();

  return (
    <section className="hero">
      <div className="hero-stats" id="tour-stats">
        <div className="hero-stat">
          <span className="stat-label">Current Role</span>
          <span className="stat-val">AI Engineering Intern</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">Currently At</span>
          <span className="stat-val">Winniio · LifeAtlas · Sweden</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">Focus</span>
          <span className="stat-val">Agentic AI + Reliability Infra</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">Status</span>
          <span className="stat-val">Open to Roles ↗</span>
        </div>
      </div>
      <div className="hero-text-row">
        <h1 className={`hero-title${swapping ? ' swapping' : ''}`}>
          {lines[0]}<br />{lines[1]}
        </h1>
        <a href="#contact" className="pill-btn">· Let's Connect</a>
      </div>
      <div className="hero-image-row">
        <img src="/uploads/grok-image-58f159b9-11fd-4a79-95b0-b414d5fe3471.jpg" alt="Shubham Kumar Gupta" />
      </div>
    </section>
  );
}
