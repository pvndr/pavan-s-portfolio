import { useState } from 'react';
import { projects } from '../../data/projects';
import { ExternalLink, ChevronRight, FileText } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { playClickSound } from '../../utils/audio';

interface InacioWorkSectionProps {
  onOpenDocument?: (doc: { title: string; url: string; type: 'pdf' | 'image' }) => void;
}

export function InacioWorkSection({ onOpenDocument }: InacioWorkSectionProps) {
  const [openId, setOpenId] = useState<string | null>(projects[0].id);

  const toggleRow = (id: string) => {
    playClickSound();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="inacio-section" id="work">
      <div className="inacio-section-head">
        <div>
          <span className="inacio-head-index">01 / SELECTED WORKS</span>
          <h2 className="inacio-head-title">Engineered Systems & Repositories</h2>
        </div>
        <p className="inacio-head-desc">
          Architectural solutions built with machine learning models, vector databases, and responsive web systems.
        </p>
      </div>

      <div className="inacio-works-table">
        {projects.map((project, idx) => {
          const isOpen = openId === project.id;

          return (
            <div
              key={project.id}
              className={`inacio-work-row ${isOpen ? 'is-open' : ''}`}
            >
              <div
                className="inacio-work-header"
                onClick={() => toggleRow(project.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleRow(project.id);
                  }
                }}
              >
                <span className="inacio-work-idx">0{idx + 1}</span>

                <div className="inacio-work-title-wrap">
                  <span className="inacio-work-title">{project.title}</span>
                  <span className="inacio-work-type">{project.tags[0] || 'ENGINEERING'}</span>
                </div>

                <div className="inacio-work-stack-col">
                  {project.stack.slice(0, 3).map((t) => (
                    <span key={t} className="inacio-stack-pill">
                      {t}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="inacio-stack-pill">+{project.stack.length - 3}</span>
                  )}
                </div>

                <div className="inacio-work-metric-col">
                  {project.id === 'rag-assistant' && 'Semantic Search'}
                  {project.id === 'chronicle' && 'PostgreSQL / Prisma'}
                  {project.id === 'cricshift' && 'Published in IJARCCE'}
                  {project.id === 'labpad' && 'Offline-First PWA'}
                  {project.id === 'interactive-valentines' && 'Web Audio API'}
                </div>

                <div className="inacio-work-arrow">
                  <ChevronRight size={18} />
                </div>
              </div>

              {isOpen && (
                <div className="inacio-work-drawer">
                  <div className="inacio-drawer-col">
                    <p className="inacio-drawer-p">{project.summary}</p>
                    <p className="inacio-drawer-p" style={{ color: 'var(--inacio-fg-subtle)' }}>
                      <strong>Architecture:</strong> {project.architectureHighlight}
                    </p>

                    <div className="inacio-drawer-actions">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inacio-action-link"
                          onClick={() => playClickSound()}
                        >
                          <ExternalLink size={13} />
                          <span>Live System</span>
                        </a>
                      )}

                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inacio-action-link"
                          onClick={() => playClickSound()}
                        >
                          <GithubIcon size={13} />
                          <span>View Code</span>
                        </a>
                      )}

                      {project.links.caseStudy && (
                        <button
                          onClick={() => {
                            playClickSound();
                            onOpenDocument?.({
                              title: `${project.title} — Research Paper`,
                              url: project.links.caseStudy!,
                              type: 'pdf',
                            });
                          }}
                          className="inacio-action-link"
                        >
                          <FileText size={13} />
                          <span>Preview Paper</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="inacio-drawer-col">
                    <ul className="inacio-drawer-highlights">
                      {project.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
