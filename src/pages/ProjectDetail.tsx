import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useFadeIn } from '../hooks/useFadeIn';
import { getProject } from '../data/projects';
import MermaidDiagram from '../components/MermaidDiagram';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const ref = useFadeIn<HTMLElement>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="site-wrap">
      <section className="section fade-in projects-page project-detail" ref={ref}>
        <a href="/#projects" className="back-link">← Back</a>

        <div className={`project-detail-hero ${project.colorClass}`}>
          <div className="project-detail-img">
            {project.img
              ? <img src={project.img} alt={project.name} style={project.imgFit === 'contain' ? { objectFit: 'contain', padding: 32 } : undefined} />
              : <span className="proj-row-mark">{project.shortName.slice(0, 2).toUpperCase()}</span>}
          </div>
          <div className="project-detail-headline">
            <h1 className="project-detail-name">{project.name}</h1>
            <p className="project-detail-tagline">{project.tagline}</p>
            <div className="proj-row-tags">
              {project.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
            </div>
            {project.links.length > 0 && (
              <div className="project-detail-links">
                {project.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="pill-btn">
                    {l.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="project-detail-sections">
          {project.sections[0] && (
            <div className="project-detail-section">
              <h2 className="project-detail-heading">{project.sections[0].heading}</h2>
              {project.sections[0].body.map((para, i) => (
                <p key={i} className="project-detail-body">{para}</p>
              ))}
            </div>
          )}

          {project.diagrams?.map((d) => (
            <div key={d.title} className="diagram-block">
              <p className="diagram-title">{d.title}</p>
              <MermaidDiagram code={d.code} caption={d.caption} />
            </div>
          ))}

          {project.sections.slice(1).map((s) => (
            <div key={s.heading} className="project-detail-section">
              <h2 className="project-detail-heading">{s.heading}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="project-detail-body">{para}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
