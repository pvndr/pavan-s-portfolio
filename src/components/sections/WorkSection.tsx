import { useState } from 'react';
import { projects, type Project } from '../../data/projects';
import { SpatialProjectsCarousel } from '../canvas/SpatialProjectsCarousel';
import { ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

interface WorkSectionProps {
  onOpenDocument?: (doc: { title: string; url: string; type: 'pdf' | 'image' }) => void;
}

export function WorkSection({ onOpenDocument }: WorkSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenSpec = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="work" className="work-spatial-section">
      <div className="section-meta-heading">
        <div className="heading-row-split">
          <div>
            <span className="meta-tag">01 / SYSTEMS</span>
            <h2 className="meta-title">Selected Case Studies</h2>
            <p className="meta-desc">
              Production architectures engineered with full-stack clarity, vector databases, and responsive design.
            </p>
          </div>
          <div className="curved-spatial-badge">
            <span>CURVED 3D SPATIAL CAROUSEL</span>
          </div>
        </div>
      </div>

      {/* 3D Curved Spatial Carousel */}
      <SpatialProjectsCarousel
        projects={projects}
        onOpenModal={handleOpenSpec}
      />

      {/* Spec Modal for deep-dive technical breakdown */}
      {selectedProject && (
        <div
          className="spec-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="spec-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="spec-modal-header">
              <div>
                <span className="spec-sys-id">SYSTEM SPECIFICATION</span>
                <h3 className="spec-title">{selectedProject.title}</h3>
              </div>
              <button
                className="spec-close-btn"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
            </div>

            <div className="spec-modal-body">
              <div className="spec-section">
                <h4>Problem Statement</h4>
                <p>{selectedProject.problem}</p>
              </div>

              <div className="spec-section">
                <h4>Engineered Architecture</h4>
                <p>{selectedProject.solution}</p>
              </div>

              <div className="spec-section">
                <h4>Key Implementation Highlights</h4>
                <ul className="spec-highlights-list">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className="spec-check" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="spec-section">
                <h4>Technology Stack</h4>
                <div className="spec-tech-pills">
                  {selectedProject.stack.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="spec-modal-actions">
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="spec-link-btn primary"
                  >
                    <ExternalLink size={16} /> Open Live Deployment
                  </a>
                )}
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="spec-link-btn secondary"
                  >
                    <GithubIcon size={16} /> Source Code
                  </a>
                )}
                {selectedProject.links.caseStudy && (
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenDocument?.({
                        title: selectedProject.title + ' — Research Paper',
                        url: selectedProject.links.caseStudy!,
                        type: 'pdf',
                      });
                    }}
                    className="spec-link-btn secondary"
                  >
                    <FileText size={16} /> Read Research Paper
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
