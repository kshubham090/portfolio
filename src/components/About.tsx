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
          I build AI and backend systems with reliable data flows, caching and durable queues. Current work includes TripTalkiez (Plaanzy), HUNT and Staffly, alongside agent evaluation and context gateways. At LifeAtlas, I led a six-person team rebuilding a production voice-interview pipeline, reducing per-call cost approximately 20-fold with zero downtime. Earlier, I built 40+ Spring Boot REST APIs and GCP infrastructure at Stakrid Logistics. I have two published Zenodo preprints; Vyaskosh training and a second manuscript remain in progress. Based in Noida; completing a B.Tech CSE (AI &amp; ML) at Amity University Noida, expected July 2027.
        </p>
      </div>
    </section>
  );
}
