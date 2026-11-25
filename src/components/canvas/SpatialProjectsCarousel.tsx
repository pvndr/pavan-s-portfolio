import { useState, useRef, useEffect } from 'react';
import type { Project } from '../../data/projects';
import { ExternalLink, FileText, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

interface SpatialProjectsCarouselProps {
  projects: Project[];
  onOpenModal?: (project: Project) => void;
}

export function SpatialProjectsCarousel({
  projects,
  onOpenModal,
}: SpatialProjectsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const activeProject = projects[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects.length]);

  return (
    <div className="spatial-carousel-root">
      {/* HUD Header Bar */}
      <div className="carousel-control-hud">
        <div className="hud-metric">
          <span className="metric-tag">INDEX</span>
          <span className="metric-value">
            0{activeIndex + 1} / 0{projects.length}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="hud-nav-buttons">
          <button
            onClick={handlePrev}
            className="carousel-nav-btn prev"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="carousel-nav-btn next"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Main 3D Curved Spatial Stage */}
      <div
        ref={containerRef}
        className="spatial-stage"
        onMouseDown={(e) => {
          isDraggingRef.current = true;
          startXRef.current = e.pageX;
          scrollLeftRef.current = activeIndex;
        }}
        onMouseUp={(e) => {
          if (!isDraggingRef.current) return;
          isDraggingRef.current = false;
          const diff = e.pageX - startXRef.current;
          if (diff > 50) handlePrev();
          if (diff < -50) handleNext();
        }}
        onMouseLeave={() => {
          isDraggingRef.current = false;
        }}
        onTouchStart={(e) => {
          startXRef.current = e.touches[0].pageX;
        }}
        onTouchEnd={(e) => {
          const diff = e.changedTouches[0].pageX - startXRef.current;
          if (diff > 40) handlePrev();
          if (diff < -40) handleNext();
        }}
      >
        <div className="spatial-track">
          {projects.map((project, idx) => {
            const offset = idx - activeIndex;
            const absOffset = Math.abs(offset);
            const isCurrent = idx === activeIndex;

            // 3D Transform calculations for curved spatial perspective
            const translateX = offset * 340;
            const translateZ = -absOffset * 180;
            const rotateY = offset * -18;
            const opacity = Math.max(0.2, 1 - absOffset * 0.38);
            const scale = Math.max(0.78, 1 - absOffset * 0.12);

            return (
              <div
                key={project.id}
                className={`spatial-card ${isCurrent ? 'active-card' : ''}`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: 10 - absOffset,
                }}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="card-glass-body">
                  {/* Card Meta Header */}
                  <div className="card-top-row">
                    <span className="card-id">SYS_0{idx + 1}</span>
                    <span className="card-badge">
                      {project.tags[0] || 'ENGINEERING'}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="card-project-title">{project.title}</h3>
                  <p className="card-project-summary">{project.summary}</p>

                  {/* Tech Stack Pills */}
                  <div className="card-stack-pills">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="mini-pill">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="mini-pill muted">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Action Bar */}
                  <div className="card-action-bar">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="card-btn primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} /> Live System
                      </a>
                    )}

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="card-btn secondary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon size={14} /> Code
                      </a>
                    )}

                    {project.links.caseStudy && (
                      <a
                        href={project.links.caseStudy}
                        target="_blank"
                        rel="noreferrer"
                        className="card-btn secondary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FileText size={14} /> Paper
                      </a>
                    )}

                    <button
                      className="card-btn ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal?.(project);
                      }}
                    >
                      <Layers size={14} /> Spec
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dot Rail */}
      <div className="carousel-dot-rail">
        {projects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActiveIndex(idx)}
            className={`dot-pill ${idx === activeIndex ? 'active' : ''}`}
            aria-label={`Go to ${p.title}`}
          >
            <span className="dot-line" />
            <span className="dot-title">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Active Project Highlight Panel */}
      {activeProject && (
        <div className="active-project-expanded">
          <div className="expanded-grid">
            <div className="expanded-col">
              <span className="col-label">ARCHITECTURE HIGHLIGHT</span>
              <p className="col-text">{activeProject.architectureHighlight}</p>
            </div>
            <div className="expanded-col">
              <span className="col-label">KEY SPECIFICATIONS</span>
              <ul className="spec-bullet-list">
                {activeProject.highlights.slice(0, 3).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
