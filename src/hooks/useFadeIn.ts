import { useEffect, useRef } from 'react';

export function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const fallback = setTimeout(() => el.classList.add('visible'), 800);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);

  return ref;
}
