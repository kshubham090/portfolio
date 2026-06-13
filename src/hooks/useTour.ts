import { useState, useEffect, useCallback, useRef } from 'react';

export interface TourStep {
  targetId: string;
  text: string;
}

const STEPS: TourStep[] = [
  { targetId: 'tour-stats', text: 'These four numbers are the TL;DR — role, company, focus, and availability at a glance.' },
  { targetId: 'tour-call',  text: 'Or just call. The voice agent picks up and talks on my behalf.' },
];

const STORAGE_KEY = 'skg_tour_done';

export function useTour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    if (!localStorage.getItem(STORAGE_KEY)) {
      const id = setTimeout(() => setActive(true), 1200);
      return () => clearTimeout(id);
    }
  }, []);

  const next = useCallback(() => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      finish();
    }
  }, [step]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const finish = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, '1');
    setActive(false);
    setStep(0);
  }, []);

  return {
    active,
    step,
    steps: STEPS,
    current: STEPS[step],
    next,
    prev,
    finish,
  };
}
