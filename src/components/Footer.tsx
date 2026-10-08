import { useState } from 'react';
import { Link } from 'react-router-dom';

type SubStatus = 'idle' | 'sending' | 'done' | 'error';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubStatus>('idle');

  async function subscribe() {
    if (status === 'sending' || status === 'done') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer>
      <div className="footer-inner">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">Shubham Gupta</div>
          <p className="footer-tagline">Software engineer. AI systems and full-stack products. Noida. Open to engineering opportunities.</p>
          <div className="newsletter">
            <input
              type="email"
              placeholder={status === 'done' ? "you're in — check your inbox" : 'Your email address'}
              value={email}
              disabled={status === 'sending' || status === 'done'}
              onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
              onKeyDown={(e) => { if (e.key === 'Enter') subscribe(); }}
            />
            <button onClick={subscribe} disabled={status === 'sending' || status === 'done'}>
              {status === 'sending' ? 'Sending…' : status === 'done' ? 'Subscribed ✓' : 'Subscribe →'}
            </button>
          </div>
          {status === 'error' && <p className="newsletter-error">enter a valid email</p>}
        </div>
        <div>
          <p className="footer-col-title">Main Pages</p>
          <ul className="footer-links">
            <li><a href="/#about">About</a></li>
            <li><a href="/#projects">Projects</a></li>
            <li><a href="/#skills">Skills</a></li>
            <li><a href="/#journey">Journey</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Projects</p>
          <ul className="footer-links">
            <li><Link to="/projects/hunt">HUNT</Link></li>
            <li><Link to="/projects/staffly">Staffly</Link></li>
            <li><Link to="/projects/chakra47">Chakra47</Link></li>
            <li><Link to="/projects/lowq-x1-agent-eval-harness">Lowq X1 — Eval Harness</Link></li>
            <li><Link to="/projects/lowq-x2-contextual-llm-gateway">Lowq X2 — LLM Gateway</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Links</p>
          <ul className="footer-links">
            <li><a href="https://linkedin.com/in/shubhamgupta04907" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/kshubham090" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://x.com/skg_curious" target="_blank" rel="noreferrer">X / Twitter</a></li>
            <li><a href="/resume">Resume PDF</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 Shubham Kumar Gupta — All rights reserved.</p>
        <div className="footer-socials">
          <a href="https://linkedin.com/in/shubhamgupta04907" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/kshubham090" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://x.com/skg_curious" target="_blank" rel="noreferrer">X</a>
        </div>
      </div>
      </div>
    </footer>
  );
}
