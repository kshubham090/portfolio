import { useFadeIn } from '../hooks/useFadeIn';

export default function Quote() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="quote-section fade-in" ref={ref}>
      <div className="quote-icon">"</div>
      <div className="quote-body">
        <p className="quote-text">
          The bottleneck isn't intelligence anymore. It's the reliability layer — eval, guardrails, audit trails, rollback. That's what I build.
        </p>
        <div className="quote-author">
          <span className="quote-author-name">Shubham Kumar Gupta</span>
          <span>— AI Engineer</span>
        </div>
      </div>
    </section>
  );
}
