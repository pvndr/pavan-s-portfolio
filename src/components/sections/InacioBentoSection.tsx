import { Cpu, Layout, Server, Zap } from 'lucide-react';

export function InacioBentoSection() {
  const capabilities = [
    {
      idx: '01 / ML',
      title: 'AI & Neural Architectures',
      desc: 'Retrieval augmented generation, vector embedding stores, prompt engineering pipelines, and multi-provider LLM integrations.',
      tags: ['Python', 'ChromaDB', 'Sentence Transformers', 'Gemini API', 'RAG Pipelines'],
      icon: <Cpu size={20} color="var(--inacio-accent)" />,
    },
    {
      idx: '02 / FRONTEND',
      title: 'Frontend & Reactive Interfaces',
      desc: 'Responsive, accessible user interfaces engineered with pixel precision, kinetic WebGL canvas shaders, and sub-second renders.',
      tags: ['TypeScript', 'React', 'Next.js', 'Three.js', 'HTML5 / CSS3'],
      icon: <Layout size={20} color="var(--inacio-accent)" />,
    },
    {
      idx: '03 / BACKEND',
      title: 'Backend, APIs & Databases',
      desc: 'Robust relational and vector persistence, schema design, and high-concurrency API contracts with encrypted key management.',
      tags: ['Node.js', 'FastAPI', 'PostgreSQL', 'Prisma ORM', 'Supabase', 'SQLite'],
      icon: <Server size={20} color="var(--inacio-accent)" />,
    },
    {
      idx: '04 / SYSTEMS',
      title: 'Core Systems & Performance',
      desc: 'Deep algorithmic foundations, object-oriented design principles, clean architecture, and sub-second query performance.',
      tags: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'REST APIs', 'System Design'],
      icon: <Zap size={20} color="var(--inacio-accent)" />,
    },
  ];

  return (
    <section className="inacio-section" id="capabilities">
      <div className="inacio-section-head">
        <div>
          <span className="inacio-head-index">02 / CAPABILITIES</span>
          <h2 className="inacio-head-title">Architectural Stack & Systems</h2>
        </div>
        <p className="inacio-head-desc">
          Modular engineering capabilities across model inference, persistent backends, and high-performance clients.
        </p>
      </div>

      <div className="inacio-bento-grid">
        {capabilities.map((cap) => (
          <div key={cap.idx} className="inacio-bento-cell">
            <div className="inacio-corner-cross tl">+</div>
            <div className="inacio-corner-cross tr">+</div>
            <div className="inacio-corner-cross bl">+</div>
            <div className="inacio-corner-cross br">+</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="inacio-bento-idx">{cap.idx}</span>
              {cap.icon}
            </div>

            <h3 className="inacio-bento-title">{cap.title}</h3>
            <p className="inacio-bento-desc">{cap.desc}</p>

            <div className="inacio-bento-tags">
              {cap.tags.map((tag) => (
                <span key={tag} className="inacio-bento-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
