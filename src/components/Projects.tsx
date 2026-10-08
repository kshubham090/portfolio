import { Link } from 'react-router-dom';
import { useFadeIn } from '../hooks/useFadeIn';
import { projects } from '../data/projects';

const selectedSlugs = [
  'hunt', 'staffly', 'chakra47', 'lowq-x1-agent-eval-harness',
  'lowq-x2-contextual-llm-gateway', 'relogged', 'flexfit-studio', 'stakrid',
];

const selectedProjects = projects
  .filter((project) => selectedSlugs.includes(project.slug))
  .sort((a, b) => selectedSlugs.indexOf(a.slug) - selectedSlugs.indexOf(b.slug));

export default function Projects() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section className="section fade-in" id="projects" ref={ref}>
      <div className="sec-row">
        <h2 className="sec-label">Projects</h2>
      </div>

      <ol className="timeline" id="tour-projects">
        {selectedProjects.map((p) => {
          const card = (
            <div className="timeline-card">
              <div className="timeline-card-head">
                <span className="timeline-card-title">{p.name}</span>
                <span className="timeline-card-status">
                  {p.status}
                </span>
              </div>
              <p className="timeline-card-desc">{p.tagline}</p>
            </div>
          );
          return (
            <li key={p.name} className="timeline-item">
              {p.slug ? (
                <Link to={`/projects/${p.slug}`} className="timeline-card-link">{card}</Link>
              ) : card}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
