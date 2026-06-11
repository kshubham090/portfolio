import { useState, useEffect, useRef } from 'react';

const HEADINGS: [string, string][] = [
  ['SHIPPING AI', 'ON NO SLEEP.'],
  ['BUILDING AGENTS', "THAT DON'T BREAK."],
  ['EVAL. DEPLOY.', 'REPEAT.'],
  ['RELIABILITY IS', 'THE FEATURE.'],
  ['FROM NOIDA', 'TO THE FRONTIER.'],
  ['AGENTIC AI.', 'PRODUCTION-GRADE.'],
  ['NO FLUFF.', 'JUST INFERENCE.'],
  ['THE GUARDRAIL', 'IS THE PRODUCT.'],
];

export function useDynamicHeading(intervalMs = 45_000) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * HEADINGS.length));
  const [swapping, setSwapping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function rotateTo(next: number) {
    setSwapping(true);
    timerRef.current = setTimeout(() => {
      setIndex(next);
      setSwapping(false);
    }, 400);
  }

  useEffect(() => {
    const id = setInterval(() => {
      rotateTo((index + 1) % HEADINGS.length);
    }, intervalMs);
    return () => {
      clearInterval(id);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, intervalMs]);

  return { lines: HEADINGS[index], swapping };
}
