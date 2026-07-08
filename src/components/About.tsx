import { useFadeIn } from '../hooks/useFadeIn';

export default function About() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="about" ref={ref}>
      <div className="sec-row">
        <span className="sec-label">About</span>
      </div>
      <div className="about-body">
        <div className="about-stat-col">
          <div>
            <div className="about-big-num">&lt;200</div>
            <div className="about-big-label">ms latency achieved (Stakrid)</div>
          </div>
          <div>
            <div className="about-big-num">80%</div>
            <div className="about-big-label">manual processing cut</div>
          </div>
        </div>
        <p className="about-text">
          ai engineer, 21. i build agentic systems and the reliability infra that keeps them from breaking — eval harnesses, llm proxies, guardrails middleware. led the voice-agent pipeline at lifeatlas: rebuilt retell stack from scratch, cut cost 20x, shipped to prod. before that, founded and ran stakrid logistics solo — 40+ apis, gcp infra, cut latency 4x. currently looking for the next big problem to own. works remote. moves fast.
        </p>
      </div>
    </section>
  );
}
