import { useState } from 'react';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav>
      <div className="nav-inner">
        <div className="nav-brand">Shubham Kumar Gupta</div>
        <button
          className={`nav-hamburger${open ? ' nav-hamburger--open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-links${open ? ' nav-links--open' : ''}`}>
          <li><a href="#about"    onClick={close}>About</a></li>
          <li><a href="#projects" onClick={close}>Projects</a></li>
          <li><a href="#skills"   onClick={close}>Skills</a></li>
          <li><a href="#journey"  onClick={close}>Journey</a></li>
          <li><a href="#contact"  onClick={close}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
