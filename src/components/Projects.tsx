import { useFadeIn } from '../hooks/useFadeIn';
import { projects } from '../data/projects';
import ProductBrowser from './ProductBrowser';
import ProjectIndex from './ProjectIndex';

const selectedSlugs = [
  'hunt', 'staffly', 'chakra47', 'lowq-x1-agent-eval-harness',
  'lowq-x2-contextual-llm-gateway', 'relogged', 'flexfit-studio', 'stakrid',
  'chakra47-agentic-swarm',
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

      <ProductBrowser />
      <ProjectIndex projects={selectedProjects} />
    </section>
  );
}
