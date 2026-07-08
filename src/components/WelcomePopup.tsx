import { useEffect, useState } from 'react';

const KEY = 'skg_welcome_seen';
const DELAY = 1800;
const AUTO_DISMISS = 7000;

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setVisible(true), DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => dismiss(), AUTO_DISMISS);
    return () => clearTimeout(t);
  }, [visible]);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(KEY, '1');
  }

  if (!visible) return null;

  return (
    <>
      {/* pulse ring on the agent tab */}
      <div className="welcome-ring" />

      <div className="welcome-popup" onClick={dismiss}>
        <button className="welcome-close" onClick={(e) => { e.stopPropagation(); dismiss(); }}>✕</button>
        <div className="welcome-dot" />
        <p className="welcome-title">hey, i'm skg-agent</p>
        <p className="welcome-body">shubham's ai rep — live right here. need anything? just wake me up.</p>
        <div className="welcome-arrow">↓</div>
      </div>
    </>
  );
}
