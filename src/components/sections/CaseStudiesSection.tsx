import React from 'react';

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectData {
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
  links: ProjectLink[];
  VisualComponent: React.FC;
}

const ChronicleSvgRenderer: React.FC = () => (
  <svg className="blueprint-svg" viewBox="0 0 360 140" xmlns="http://www.w3.org/2000/svg">
    <rect className="box-draw" x="40" y="40" width="50" height="60" rx="4" />
    <line className="draw-path" x1="50" y1="55" x2="80" y2="55" />
    <line className="draw-path" x1="50" y1="70" x2="70" y2="70" />
    <text x="65" y="120" className="svg-label center" style={{ fontSize: '10px' }}>Journal</text>

    <path className="draw-path" d="M 90 70 L 160 70" strokeDasharray="4 4" />
    <circle className="node-pulse" cx="125" cy="70" r="3" />

    <path className="box-draw" d="M 160 50 C 160 40, 200 40, 200 50 L 200 90 C 200 100, 160 100, 160 90 Z" fill="none" />
    <path className="box-draw" d="M 160 50 C 160 60, 200 60, 200 50" fill="none" />
    <text x="180" y="120" className="svg-label center" style={{ fontSize: '10px' }}>PostgreSQL</text>

    <path className="draw-path delay-1" d="M 200 70 L 270 70" />
    <circle className="node-pulse delay-1" cx="235" cy="70" r="3" />

    <rect className="box-draw" x="270" y="40" width="50" height="60" rx="2" />
    <path className="draw-path delay-2" d="M 270 55 L 320 55" />
    <text x="295" y="120" className="svg-label center" style={{ fontSize: '10px' }}>Dispatch</text>
  </svg>
);

const ragHighlights: string[] = [
  "Multi-document knowledge base",
  "PDF, DOCX and TXT document ingestion",
  "Semantic search with vector embeddings",
  "Persistent ChromaDB vector database",
  "Multi-provider LLM support",
  "Secure per-user encrypted API key management",
  "Structured AI responses with citations and metadata",
  "Conversation history and persistent chat sessions",
  "Clean architecture with separated application layers",
  "Responsive modern interface"
];

const ragTechStack: string[] = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "FastAPI",
  "Python",
  "ChromaDB",
  "SQLite",
  "Gemini API",
  "Sentence Transformers",
  "Pydantic"
];

const RagArchitectureSvgRenderer: React.FC = () => (
  <svg
    className="blueprint-svg rag-architecture-svg"
    viewBox="0 0 380 490"
    xmlns="http://www.w3.org/2000/svg"
    style={{ aspectRatio: '380/490', width: '100%', maxWidth: '420px' }}
  >
    <defs>
      <linearGradient id="ragNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--surface-2)" stopOpacity="0.85" />
        <stop offset="100%" stopColor="var(--surface-1)" stopOpacity="0.45" />
      </linearGradient>
    </defs>

    {/* Stage 1: Documents */}
    <g className="pipeline-node">
      <rect className="box-draw" x="75" y="8" width="230" height="44" rx="4" fill="url(#ragNodeGrad)" />
      <text x="190" y="27" className="svg-label center" style={{ fill: '#fff', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5px' }}>
        Documents
      </text>
      <text x="190" y="42" className="svg-label center" style={{ fill: 'var(--text-dim)', fontSize: '8.5px' }}>
        PDF • DOCX • TXT Ingestion
      </text>
    </g>

    {/* Downward Connector 1 -> 2 */}
    <path className="draw-path" d="M 190 52 L 190 70" />
    <polygon points="187,69 193,69 190,75" fill="var(--accent-primary)" />
    <circle className="node-pulse" cx="190" cy="61" r="2.5" />

    {/* Stage 2: Document Processing */}
    <g className="pipeline-node">
      <rect className="box-draw delay-1" x="75" y="75" width="230" height="44" rx="4" fill="url(#ragNodeGrad)" />
      <text x="190" y="94" className="svg-label center" style={{ fill: '#fff', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5px' }}>
        Document Processing
      </text>
      <text x="190" y="109" className="svg-label center" style={{ fill: 'var(--text-dim)', fontSize: '8.5px' }}>
        Text Extraction &amp; Chunking
      </text>
    </g>

    {/* Downward Connector 2 -> 3 */}
    <path className="draw-path delay-1" d="M 190 119 L 190 137" />
    <polygon points="187,136 193,136 190,142" fill="var(--accent-primary)" />
    <circle className="node-pulse delay-1" cx="190" cy="128" r="2.5" />

    {/* Stage 3: Embedding Generation */}
    <g className="pipeline-node">
      <rect className="box-draw delay-2" x="75" y="142" width="230" height="44" rx="4" fill="url(#ragNodeGrad)" />
      <text x="190" y="161" className="svg-label center" style={{ fill: '#fff', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5px' }}>
        Embedding Generation
      </text>
      <text x="190" y="176" className="svg-label center" style={{ fill: 'var(--text-dim)', fontSize: '8.5px' }}>
        Sentence Transformers (Dense Vectors)
      </text>
    </g>

    {/* Downward Connector 3 -> 4 */}
    <path className="draw-path delay-2" d="M 190 186 L 190 204" />
    <polygon points="187,203 193,203 190,209" fill="var(--accent-primary)" />
    <circle className="node-pulse delay-2" cx="190" cy="195" r="2.5" />

    {/* Stage 4: ChromaDB Vector Store */}
    <g className="pipeline-node">
      <rect className="box-draw delay-3" x="55" y="209" width="270" height="48" rx="4" fill="url(#ragNodeGrad)" strokeWidth="1.8" />
      <path className="draw-path delay-3" d="M 75 210 C 75 216, 305 216, 305 210" strokeDasharray="3 3" opacity="0.6" />
      <text x="190" y="230" className="svg-label center" style={{ fill: 'var(--accent-primary)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.5px' }}>
        ChromaDB Vector Store
      </text>
      <text x="190" y="246" className="svg-label center" style={{ fill: 'var(--text-dim)', fontSize: '8.5px' }}>
        Persistent Vector Collection &amp; SQLite Storage
      </text>
    </g>

    {/* Downward Connector 4 -> 5 */}
    <path className="draw-path delay-3" d="M 190 257 L 190 275" />
    <polygon points="187,274 193,274 190,280" fill="var(--accent-primary)" />
    <circle className="node-pulse delay-3" cx="190" cy="266" r="2.5" />

    {/* Stage 5: Semantic Retrieval */}
    <g className="pipeline-node">
      <rect className="box-draw delay-4" x="75" y="280" width="230" height="44" rx="4" fill="url(#ragNodeGrad)" />
      <text x="190" y="299" className="svg-label center" style={{ fill: '#fff', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5px' }}>
        Semantic Retrieval
      </text>
      <text x="190" y="314" className="svg-label center" style={{ fill: 'var(--text-dim)', fontSize: '8.5px' }}>
        Cosine Similarity &amp; Top-K Ranked Context
      </text>
    </g>

    {/* Downward Connector 5 -> 6 */}
    <path className="draw-path delay-4" d="M 190 324 L 190 342" />
    <polygon points="187,341 193,341 190,347" fill="var(--accent-primary)" />
    <circle className="node-pulse delay-4" cx="190" cy="333" r="2.5" />

    {/* Stage 6: LLM Provider (Gemini / User-selected Provider) */}
    <g className="pipeline-node">
      <rect className="box-draw delay-5" x="50" y="347" width="280" height="48" rx="4" fill="url(#ragNodeGrad)" />
      <text x="190" y="367" className="svg-label center" style={{ fill: '#fff', fontWeight: 700, fontSize: '11.5px', letterSpacing: '0.5px' }}>
        LLM Provider
      </text>
      <text x="190" y="383" className="svg-label center" style={{ fill: 'var(--accent-primary)', fontSize: '9px', fontWeight: 500 }}>
        Gemini / User-selected Provider
      </text>
    </g>

    {/* Downward Connector 6 -> 7 */}
    <path className="draw-path delay-5" d="M 190 395 L 190 413" />
    <polygon points="187,412 193,412 190,418" fill="var(--accent-primary)" />
    <circle className="node-pulse delay-5" cx="190" cy="404" r="2.5" />

    {/* Stage 7: Structured AI Response */}
    <g className="pipeline-node">
      <rect className="box-draw delay-6" x="60" y="418" width="260" height="46" rx="4" fill="url(#ragNodeGrad)" strokeWidth="1.8" />
      <text x="190" y="438" className="svg-label center" style={{ fill: '#fff', fontWeight: 700, fontSize: '11.5px', letterSpacing: '0.5px' }}>
        Structured AI Response
      </text>
      <text x="190" y="454" className="svg-label center" style={{ fill: 'var(--text-dim)', fontSize: '8.5px' }}>
        Document-Grounded Answer + Citations &amp; Metadata
      </text>
    </g>

    {/* Pipeline Subtitle */}
    <text x="190" y="482" className="svg-label center" style={{ fill: 'var(--text-dim)', fontSize: '8px', letterSpacing: '2px', opacity: 0.7 }}>
      RAG PIPELINE FLOW
    </text>
  </svg>
);

const fullStackProjects: ProjectData[] = [
  {
    title: "Chronicle — Personal Publishing & Reflection Platform",
    description: "An editorial journaling and publishing platform with private reflections, public essays, authentication, analytics, and a production PostgreSQL backend.",
    highlights: [
      "Multi-user authentication & authorization",
      "Private journaling & public publishing",
      "Server-side search, filtering & analytics",
      "Production PostgreSQL + Vercel deployment"
    ],
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Supabase"],
    links: [
      { label: "Live Demo", url: "https://chronicle-app-tau.vercel.app" },
      { label: "GitHub", url: "https://github.com/pvndr/chronicle-app" }
    ],
    VisualComponent: ChronicleSvgRenderer
  }
];

const LabPadSvgRenderer: React.FC = () => (
  <svg className="blueprint-svg" viewBox="0 0 360 140" xmlns="http://www.w3.org/2000/svg">
    {/* User */}
    <circle className="box-draw" cx="40" cy="70" r="15" fill="none" />
    <path className="box-draw" d="M 25 110 C 25 80, 55 80, 55 110" fill="none" />
    <text x="40" y="125" className="svg-label center" style={{ fontSize: '10px' }}>User</text>

    {/* User -> React Frontend */}
    <path className="draw-path" d="M 65 70 L 95 70" />
    <circle className="node-pulse" cx="80" cy="70" r="3" />

    {/* React Frontend */}
    <rect className="box-draw" x="95" y="45" width="50" height="50" rx="4" />
    <text x="120" y="125" className="svg-label center" style={{ fontSize: '10px' }}>React</text>

    {/* Frontend -> IndexedDB */}
    <path className="draw-path" d="M 145 70 L 175 70" />
    
    {/* IndexedDB (Local DB cylinder) */}
    <path className="box-draw" d="M 175 55 C 175 45, 205 45, 205 55 L 205 85 C 205 95, 175 95, 175 85 Z" fill="none" />
    <path className="box-draw" d="M 175 55 C 175 65, 205 65, 205 55" fill="none" />
    <text x="190" y="125" className="svg-label center" style={{ fontSize: '10px' }}>IndexedDB</text>

    {/* IndexedDB <-> Sync Engine */}
    <path className="draw-path delay-1" d="M 205 70 L 235 70" strokeDasharray="4 4" />
    <circle className="node-pulse delay-1" cx="220" cy="70" r="3" />

    {/* Sync Engine */}
    <polygon className="box-draw" points="235,70 250,50 265,70 250,90" fill="none" />
    <text x="250" y="125" className="svg-label center" style={{ fontSize: '10px' }}>Sync</text>

    {/* Sync Engine <-> Supabase */}
    <path className="draw-path delay-2" d="M 265 70 L 295 70" strokeDasharray="4 4" />
    <circle className="node-pulse delay-2" cx="280" cy="70" r="3" />

    {/* Supabase */}
    <path className="box-draw" d="M 295 55 C 295 45, 325 45, 325 55 L 325 85 C 325 95, 295 95, 295 85 Z" fill="none" />
    <path className="box-draw" d="M 295 55 C 295 65, 325 65, 325 55" fill="none" />
    <text x="310" y="125" className="svg-label center" style={{ fontSize: '10px' }}>Supabase</text>
  </svg>
);

const ValentineSvgRenderer: React.FC = () => (
  <svg className="blueprint-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
    <path className="draw-path"
      d="M 100 90 C 100 90, 40 40, 40 20 C 40 0, 70 0, 100 30 C 130 0, 160 0, 160 20 C 160 40, 100 90, 100 90"
      strokeWidth="2" fill="none" />
    <circle className="node-pulse" cx="100" cy="90" r="3" />
    <circle className="node-pulse delay-1" cx="40" cy="20" r="3" />
    <circle className="node-pulse delay-2" cx="160" cy="20" r="3" />
  </svg>
);

const otherProjects: ProjectData[] = [
  {
    title: "LabPad",
    description: "LabPad is an offline-first Progressive Web Application (PWA) built for engineering students to securely store and manage code snippets and notes. Users can join a shared room, create and edit notes online or offline, and seamlessly synchronize their data with the cloud using Supabase. The application continues to function without an internet connection by leveraging IndexedDB and localStorage, then automatically synchronizes changes once connectivity is restored.",
    highlights: [
      "Offline-first architecture",
      "Progressive Web App (PWA)",
      "Automatic cloud synchronization",
      "Supabase + PostgreSQL backend",
      "IndexedDB and localStorage caching",
      "Intelligent timestamp-based conflict resolution",
      "Real-time online/offline status detection",
      "Installable application with Service Worker support"
    ],
    techStack: ["React 18", "Vite", "Supabase", "PostgreSQL", "IndexedDB", "Workbox", "JavaScript", "HTML", "CSS"],
    links: [
      { label: "Live Demo", url: "https://project-d81ht.vercel.app/" },
      { label: "GitHub", url: "https://github.com/pvndr/LabPad.git" }
    ],
    VisualComponent: LabPadSvgRenderer
  },
  {
    title: "Interactive Valentine's Experience",
    description: "Interactive Valentine's Experience is a frontend-focused web application that transforms a traditional Valentine's proposal into an engaging digital journey. The application combines a mock authentication flow, state-driven UI transitions, playful user interactions, responsive card-based navigation, and subtle micro-animations to create a memorable user experience. Built entirely with Vanilla JavaScript, the project demonstrates creative frontend engineering, interaction design, and seamless user flow without relying on frontend frameworks.",
    highlights: [
      "Mock authentication using the Web Crypto API",
      "State-driven user interaction flow",
      "Interactive proposal experience",
      "Escaping 'No' button with dynamic positioning",
      "Responsive card-based date selection",
      "Scene-based background transitions",
      "Smooth micro-animations and transitions",
      "Google Forms integration for response collection",
      "Mobile-first responsive design",
      "Clean Vanilla JavaScript architecture"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Web Crypto API", "Google Forms"],
    links: [
      { label: "Live Demo", url: "https://our-valentinestory.netlify.app/" },
      { label: "GitHub", url: "https://github.com/pvndr/valentine-app" }
    ],
    VisualComponent: ValentineSvgRenderer
  }
];

const ProjectCard: React.FC<{ data: ProjectData }> = ({ data }) => {
  return (
    <div className="project-card">
      <div className="pc-visual">
        <data.VisualComponent />
      </div>
      <div className="pc-content">
        <h4 className="pc-title">{data.title}</h4>
        <p className="pc-desc">{data.description}</p>
        <ul className="pc-highlights">
          {data.highlights.map((highlight, idx) => (
            <li key={idx}>{highlight}</li>
          ))}
        </ul>
        <div className="pc-tech">
          {data.techStack.map((tech, idx) => (
            <span key={idx}>{tech}</span>
          ))}
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {data.links.map((link, idx) => (
            <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="cmd-input magnetic-target" style={{ textDecoration: "none", display: "inline-flex" }}>
              <span className="cmd-prompt">{">"}</span> {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="flow-section case-studies-section">
      <div className="section-heading reveal fade-up">
        <span className="heading-num">01 / ARCHITECTURE</span>
        <h2 className="heading-title">Product Engineering</h2>
      </div>

      <div className="editorial-blocks">

        {/**/}
        <h3 className="category-heading reveal fade-up">Featured Projects</h3>

        {/**/}
        <article className="editorial-block asymmetric-left">
          <div className="eb-content reveal fade-right">
            <span className="eb-meta">AI Engineering • Retrieval-Augmented Generation (RAG)</span>
            <h3 className="eb-title">RAG Knowledge Assistant</h3>
            <h4 className="eb-subtitle">
              Production-ready AI knowledge assistant with multi-provider LLM support and document-grounded conversations.
            </h4>

            <div className="eb-text">
              <p>
                RAG Knowledge Assistant is a production-ready Retrieval-Augmented Generation (RAG) application that enables users to upload documents and interact with them through AI-powered conversations. The application combines semantic search, vector embeddings, and large language models to generate context-aware, document-grounded responses while supporting multiple AI providers through secure per-user API key management. Built with a clean, scalable architecture, it emphasizes reliability, extensibility, and an intuitive user experience.
              </p>

              <div className="eb-highlights-wrapper">
                <strong>Key Architectural Highlights:</strong>
                <ul className="eb-highlights">
                  {ragHighlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="eb-tech">
              {ragTechStack.map((tech, idx) => (
                <span key={idx}>{tech}</span>
              ))}
            </div>

            <div className="eb-actions">
              <a
                href="https://rag-application-ashy.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="cmd-input magnetic-target"
                style={{ textDecoration: "none" }}
              >
                <span className="cmd-prompt">&gt;</span> Live Demo<span className="cursor-blink">_</span>
              </a>
              <a
                href="https://github.com/pvndr/rag-application"
                target="_blank"
                rel="noreferrer"
                className="cmd-input magnetic-target"
                style={{ textDecoration: "none" }}
              >
                <span className="cmd-prompt">&gt;</span> GitHub<span className="cursor-blink">_</span>
              </a>
            </div>
          </div>

          <div className="eb-visual reveal">
            <RagArchitectureSvgRenderer />
          </div>
        </article>

        {/**/}
        <article className="editorial-block asymmetric-right">
          <div className="eb-visual reveal">
            {/**/}
            <svg className="blueprint-svg" style={{ aspectRatio: '360/280' }} viewBox="30 60 360 280" xmlns="http://www.w3.org/2000/svg">
              <path className="draw-path" d="M 50 200 L 150 200 L 200 100 L 300 100" />
              <path className="draw-path delay-2" d="M 150 200 L 200 300 L 300 300" />
              <circle className="node-pulse" cx="150" cy="200" r="4" />
              <circle className="node-pulse" cx="300" cy="100" r="4" />
              <circle className="node-pulse" cx="300" cy="300" r="4" />
              <rect className="box-draw" x="320" y="80" width="60" height="40" rx="4" />
              <rect className="box-draw" x="320" y="280" width="60" height="40" rx="4" />
              <text x="350" y="105" className="svg-label">LSTM</text>
              <text x="350" y="305" className="svg-label">WSS</text>
            </svg>
          </div>

          <div className="eb-content reveal fade-left">
            <span className="eb-meta">2026 // AI Analytics</span>
            <h3 className="eb-title">CricShift</h3>
            <h4 className="eb-subtitle">Predictive Momentum Engine</h4>

            <div className="eb-text">
              <p><strong>Problem:</strong> Traditional cricket analytics rely on static historical averages, failing to
                capture real-time momentum shifts during live play.</p>
              <p><strong>Architecture:</strong> Engineered a sequential deep learning pipeline (LSTMs) processing live
                ball-by-ball telemetry to output a real-time momentum index via sub-50ms WebSockets.</p>
              <p><strong>Technical Decisions:</strong> Prioritized edge-inference efficiency and sparse-data anomaly
                handling.</p>
              <p><strong>Outcomes:</strong> Highly performant real-time UI rendering without frame drops during data
                ingestion.</p>
            </div>

            <div className="eb-tech">
              <span>Python</span> <span>TensorFlow</span> <span>React</span> <span>WebSockets</span>
            </div>

            <div className="eb-actions">
              <a
                href="https://github.com/pvndr"
                target="_blank"
                rel="noreferrer"
                className="cmd-input magnetic-target"
                style={{ textDecoration: "none" }}
              >
                <span className="cmd-prompt">&gt;</span> GitHub<span className="cursor-blink">_</span>
              </a>
              <a
                href="https://github.com/pvndr"
                target="_blank"
                rel="noreferrer"
                className="cmd-input magnetic-target"
                style={{ textDecoration: "none" }}
              >
                <span className="cmd-prompt">&gt;</span> Architecture Preview<span className="cursor-blink">_</span>
              </a>
            </div>
          </div>
        </article>

        {/**/}
        <h3 className="category-heading reveal fade-up">Full Stack</h3>
        <div className="project-cards reveal fade-up" style={{ marginBottom: '4rem' }}>
          {fullStackProjects.map((proj, idx) => (
            <ProjectCard key={idx} data={proj} />
          ))}
        </div>

        {/**/}
        <h3 className="category-heading reveal fade-up">Other Projects</h3>

        <div className="project-cards reveal fade-up">
          {otherProjects.map((proj, idx) => (
            <ProjectCard key={idx} data={proj} />
          ))}
        </div>

      </div>
    </section>
  );
}
