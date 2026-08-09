import { useFadeIn } from '../hooks/useFadeIn';

export default function About() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="about" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">About</h2>
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
          AI Engineer, 21. I build agentic systems and the reliability infrastructure that keeps them from breaking: eval harnesses, LLM proxies, guardrails middleware. Led the voice-agent pipeline at LifeAtlas: rebuilt the Retell stack from scratch, cut cost 20x, shipped to production. Before that, founded and ran Stakrid Logistics solo: 40+ APIs, GCP infrastructure, cut latency 4x. Latest build: Relogged, a sandboxed replay debugger for LangGraph agents; record a run once, replay it free, fork it at the broken step. Now starting a research journey as well: a weekly dose of papers, both reading and writing; first one out is a leakage audit of F1 race-strategy ML. Currently looking for the next big problem to own. Works remote. Moves fast.
        </p>
      </div>
    </section>
  );
}
