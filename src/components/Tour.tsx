import { useLayoutEffect, useRef, useState } from 'react';
import { useTour } from '../hooks/useTour';

interface Rect { top: number; left: number; width: number; height: number; }

const PAD = 10;

export default function Tour() {
  const { active, step, steps, current, next, prev, finish } = useTour();
  const [spotlight, setSpotlight] = useState<Rect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active) return;
    const el = document.getElementById(current.targetId);
    if (!el) {
      setSpotlight(null);
      setTooltipPos(null);
      return;
    }

    // Scroll first, then calculate positions after scroll settles
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const id = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const spot: Rect = {
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
      };
      setSpotlight(spot);

      const cardHeight = cardRef.current?.offsetHeight ?? 160;
      const cardWidth = cardRef.current?.offsetWidth ?? 320;
      const below = rect.bottom + PAD + 12 + cardHeight < window.innerHeight;
      const tipTop = below ? rect.bottom + PAD + 12 : rect.top - PAD - 12 - cardHeight;
      let tipLeft = rect.left + rect.width / 2 - cardWidth / 2;
      tipLeft = Math.max(16, Math.min(tipLeft, window.innerWidth - cardWidth - 16));
      setTooltipPos({ top: tipTop, left: tipLeft });
    }, 350);

    return () => clearTimeout(id);
  }, [active, step, current.targetId]);

  if (!active || !spotlight || !tooltipPos) return null;

  return (
    <>
      <div
        className="tour-backdrop"
        style={{
          top: spotlight.top,
          left: spotlight.left,
          width: spotlight.width,
          height: spotlight.height,
        }}
      />
      <div
        ref={cardRef}
        className="tour-card"
        style={{ top: tooltipPos.top, left: tooltipPos.left }}
      >
        <div className="tour-card-header">
          <span className="tour-step-label">Step {step + 1} of {steps.length}</span>
          <button className="tour-close" onClick={finish} aria-label="Close tour">✕</button>
        </div>
        <p className="tour-text">{current.text}</p>
        <div className="tour-actions">
          <button className="tour-skip" onClick={finish}>Skip tour</button>
          <div className="tour-nav">
            {step > 0 && (
              <button className="tour-btn tour-btn--prev" onClick={prev}>← Prev</button>
            )}
            <button className="tour-btn tour-btn--next" onClick={next}>
              {step === steps.length - 1 ? 'Done' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
