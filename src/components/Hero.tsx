import { useState } from 'react';
import ConnectPopup from './ConnectPopup';

export default function Hero() {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <section className="hero">
      <div className="hero-row">
        <div className="hero-text">
          <h1 className="hero-title">Shubham Kumar Gupta</h1>
          <p className="hero-sub">
            Software engineer building AI systems and full-stack products — from everyday workflows to agent evaluation and inference infrastructure.
          </p>
          <div className="hero-cta-row">
            <button className="pill-btn" onClick={() => setConnectOpen(true)}>Let's connect →</button>
          </div>
        </div>
        <div className="hero-photo">
          <img src="/uploads/grok-image-58f159b9-11fd-4a79-95b0-b414d5fe3471.jpg" alt="Shubham Kumar Gupta" width={1280} height={653} />
        </div>
      </div>

      <div className="hero-stats" id="tour-stats">
        <div className="hero-stat">
          <span className="stat-label">Looking For</span>
          <span className="stat-val">Software &amp; AI Roles</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">Last Role</span>
          <span className="stat-val">LifeAtlas · Sweden (Remote)</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">Focus</span>
          <span className="stat-val">Products + Reliable AI Systems</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">Status</span>
          <span className="stat-val">Open to Roles ↗</span>
        </div>
      </div>

      {connectOpen && <ConnectPopup onClose={() => setConnectOpen(false)} />}
    </section>
  );
}
