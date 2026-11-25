import { educationTimeline } from '../../data/experience';
import { GitBranch, GitCommit, GraduationCap, Award } from 'lucide-react';

export function JourneySection() {
  return (
    <section id="journey" className="journey-spatial-section">
      <div className="section-meta-heading">
        <span className="meta-tag">03 / PIPELINE</span>
        <h2 className="meta-title">Commit History & Academic Foundation</h2>
        <p className="meta-desc">
          Structured progression from foundational sciences to core computer science and engineering.
        </p>
      </div>

      <div className="git-pipeline-container">
        {/* Central connecting branch line */}
        <div className="pipeline-branch-line" />

        <div className="timeline-nodes-stack">
          {educationTimeline.map((item) => (
            <div key={item.id} className="timeline-node-card">
              <div className="node-marker">
                <div className="marker-glow-core">
                  <GitCommit size={16} />
                </div>
              </div>

              <div className="node-content-glass">
                <div className="node-header-row">
                  <span className="git-branch-tag">
                    <GitBranch size={13} /> {item.branch}
                  </span>
                  <span className="git-date-tag">{item.period}</span>
                </div>

                <div className="node-main-info">
                  <h3 className="node-title">{item.title}</h3>
                  <div className="node-institution-row">
                    <GraduationCap size={16} className="edu-icon" />
                    <span className="node-org">{item.organization}</span>
                    {item.badge && (
                      <span className="node-score-pill">
                        <Award size={13} /> {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="node-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
