import { skillClusters } from '../../data/skills';
import { Cpu, Globe, Database, Sparkles } from 'lucide-react';

export function SkillsSection() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'ai-ml':
        return <Cpu size={24} className="cluster-icon cyan" />;
      case 'fullstack':
        return <Globe size={24} className="cluster-icon purple" />;
      case 'systems':
        return <Database size={24} className="cluster-icon green" />;
      default:
        return <Sparkles size={24} className="cluster-icon" />;
    }
  };

  return (
    <section id="skills" className="skills-spatial-section">
      <div className="section-meta-heading">
        <span className="meta-tag">02 / CAPABILITIES</span>
        <h2 className="meta-title">Engineering Systems & Competencies</h2>
        <p className="meta-desc">
          Modular capabilities spanning neural architectures, reactive user interfaces, and robust persistent backends.
        </p>
      </div>

      <div className="capabilities-grid">
        {skillClusters.map((cluster) => (
          <div key={cluster.id} className="capability-card">
            <div className="card-ambient-glow" />
            
            <div className="card-top-header">
              <div className="cluster-icon-shell">{getIcon(cluster.id)}</div>
              <span className="cluster-coord">{cluster.coordinate}</span>
            </div>

            <h3 className="cluster-label">{cluster.label}</h3>
            <p className="cluster-desc">{cluster.description}</p>

            <div className="cluster-skills-wrap">
              {cluster.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  <span className="chip-bullet" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
