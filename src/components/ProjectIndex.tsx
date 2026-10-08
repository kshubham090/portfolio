import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import './ProjectIndex.css';

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('All work');
  const [query, setQuery] = useState('');
  const search = useRef<HTMLInputElement>(null);
  const categories = ['All work', ...new Set(projects.map((p) => p.category ?? 'Applications'))];
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = projects.filter((project) =>
    (category === 'All work' || (project.category ?? 'Applications') === category)
    && [project.name, project.tagline, ...project.tags].join(' ').toLocaleLowerCase().includes(normalizedQuery),
  );

  function resetFilters() {
    setCategory('All work');
    setQuery('');
    search.current?.focus();
  }

  return (
    <div className="project-index">
      <div className="project-index-tools">
        <div className="project-filters" aria-label="Filter projects">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <label className="project-search">
          <span>Search projects</span>
          <input ref={search} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name or technology…" />
        </label>
      </div>
      <p className="project-results-count" role="status">{filtered.length} of {projects.length} projects</p>

      {filtered.length > 0 ? (
        <ol className="timeline" id="tour-projects">
          {filtered.map((project) => (
            <li key={project.slug} className="timeline-item">
              <Link to={`/projects/${project.slug}`} className="timeline-card-link project-index-card">
                <div className="timeline-card">
                  <div className="timeline-card-head">
                    <h3 className="timeline-card-title">{project.name}</h3>
                    <span className="timeline-card-status">{project.status ?? 'Project'}</span>
                  </div>
                  <p className="timeline-card-desc">{project.tagline}</p>
                  <div className="project-index-card-foot">
                    <div className="project-index-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <span className="project-index-cta">Explore the build <span aria-hidden="true">↗</span></span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="project-no-results">
          <p>No projects match these filters.</p>
          <button className="pill-btn" type="button" onClick={resetFilters}>Show all projects →</button>
        </div>
      )}
    </div>
  );
}
