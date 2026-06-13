import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer>
      <div className="footer-inner">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">Shubham Gupta</div>
          <p className="footer-tagline">AI engineer. agentic systems + the reliability infra around them. noida. remote. open to relocation.</p>
          <div className="newsletter">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => setEmail('')}>Subscribe →</button>
          </div>
        </div>
        <div>
          <p className="footer-col-title">Main Pages</p>
          <ul className="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#journey">Journey</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Projects</p>
          <ul className="footer-links">
            <li><a href="#">Chakra47</a></li>
            <li><a href="#">Symbiote-X</a></li>
            <li><a href="#">Military Deploy System</a></li>
            <li><a href="#">Posture Analysis</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Links</p>
          <ul className="footer-links">
            <li><a href="https://linkedin.com/in/shubhamgupta04907" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/kshubham090" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://x.com/skg_curious" target="_blank" rel="noreferrer">X / Twitter</a></li>
            <li><a href="/uploads/Shubham_Kumar_GuptaResume2026_ (2).pdf" target="_blank" rel="noreferrer">Resume PDF</a></li>
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
