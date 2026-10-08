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
          I build software products and tools for understanding how AI systems behave. Current work includes HUNT, Staffly and the next direction for Chakra47, alongside agent evaluation, context gateways and replay tooling. At LifeAtlas, I led a six-person team rebuilding a voice-interview pipeline in-house, reducing per-call cost approximately 20-fold. Earlier, I built and operated Stakrid Logistics: 40+ REST APIs, GCP infrastructure and faster operational workflows. I work with GCP and Azure, and have two research papers on Zenodo with a second Vyaskosh manuscript in progress. Based in Noida; completing a B.Tech in Computer Science, AI &amp; ML, at Amity University, expected July 2027.
        </p>
      </div>
    </section>
  );
}
