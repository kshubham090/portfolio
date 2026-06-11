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
          AI engineer. building agentic systems + the reliability infra around them. currently leading the voice pipeline track at winniio/lifeatlas — voice interviews, profile extraction via claude, ranked matches via pgvector. previously founded stakrid. b.tech cse ai/ml @ amity noida. based in noida, india. target: ai engineer at a startup. sf is the goal.
        </p>
      </div>
    </section>
  );
}
