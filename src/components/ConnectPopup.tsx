import { useEffect, useState } from 'react';
import { useAgentDrawer } from '../context/AgentDrawerContext';

const CALENDLY_URL = 'https://calendly.com/kshubham04907/shubham-kumar-sync';

function CalendlyEmbed() {
  useEffect(() => {
    const w = window as any;
    if (w.Calendly) return;
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={CALENDLY_URL}
      style={{ minWidth: '280px', height: 'min(650px, 75vh)' }}
    />
  );
}

export default function ConnectPopup({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<'menu' | 'calendly'>('menu');
  const { setOpen: setAgentOpen } = useAgentDrawer();

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`connect-card${view === 'calendly' ? ' connect-card--wide' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {view === 'calendly' ? (
          <>
            <button className="modal-back" onClick={() => setView('menu')}>← Back</button>
            <p className="modal-title">Book a Call</p>
            <CalendlyEmbed />
          </>
        ) : (
          <>
            <p className="modal-title">Let's Connect</p>
            <p className="modal-sub">Pick whatever's fastest for you.</p>

            <div className="connect-options">
              <a href="mailto:kshubham04907@gmail.com" className="connect-option" onClick={onClose}>
                <span className="connect-option-label">Email Me</span>
                <span className="connect-option-desc">kshubham04907@gmail.com — direct, no form</span>
              </a>
              <button className="connect-option" onClick={() => setView('calendly')}>
                <span className="connect-option-label">Book a Call</span>
                <span className="connect-option-desc">Pick a slot right here</span>
              </button>
              <button className="connect-option" onClick={() => { onClose(); setAgentOpen(true); }}>
                <span className="connect-option-label">Chat with skg-agent</span>
                <span className="connect-option-desc">Ask questions, get pitched, get his contact</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
