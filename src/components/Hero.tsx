import { useState } from 'react';
import ConnectPopup from './ConnectPopup';

export default function Hero() {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <section className="hero">
      <div className="hero-stats" id="tour-stats">
        <div className="hero-stat">
          <span className="stat-label">Looking For</span>
          <span className="stat-val">AI Engineer Role</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">Last Role</span>
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
        <h1 className="hero-title">ENGINEERING THE<br />AI BACKBONE.</h1>
        <button className="pill-btn" onClick={() => setConnectOpen(true)}>· Let's Connect</button>
      </div>
      <div className="hero-image-row">
        <img src="/uploads/grok-image-58f159b9-11fd-4a79-95b0-b414d5fe3471.jpg" alt="Shubham Kumar Gupta" />
      </div>

      {connectOpen && <ConnectPopup onClose={() => setConnectOpen(false)} />}
    </section>
  );
}
