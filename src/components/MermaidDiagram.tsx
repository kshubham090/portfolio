import { useEffect, useRef, useState } from 'react';

let initPromise: Promise<typeof import('mermaid')['default']> | null = null;
let counter = 0;

function loadMermaid() {
  if (!initPromise) {
    initPromise = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          background: '#0d0d0d',
          primaryColor: '#131313',
          primaryTextColor: '#ededeb',
          primaryBorderColor: '#60a5fa',
          lineColor: '#555555',
          secondaryColor: '#161616',
          tertiaryColor: '#161616',
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '13px',
        },
      });
      return mermaid;
    });
  }
  return initPromise;
}

export default function MermaidDiagram({ code, caption }: { code: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const idRef = useRef(`mermaid-${counter++}`);

  useEffect(() => {
    let cancelled = false;
    loadMermaid()
      .then((mermaid) => mermaid.render(idRef.current, code.trim()))
      .then(({ svg }) => {
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => { cancelled = true; };
  }, [code]);

  if (error) return null;

  return (
    <div className="mermaid-wrap">
      <div className="mermaid-diagram" ref={ref} />
      {caption && <p className="mermaid-caption">{caption}</p>}
    </div>
  );
}
