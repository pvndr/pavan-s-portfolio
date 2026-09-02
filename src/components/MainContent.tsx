import React, { useState } from 'react';
import { playTypingSound } from '../utils/audio';
import { DocumentModal } from './DocumentModal';
import { ContactModal } from './ContactModal';

export function MainContent() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    documentUrl: '',
    type: 'image' as 'image' | 'pdf',
    details: [] as { label: string, value: string }[]
  });

  const openModal = (title: string, documentUrl: string, type: 'image' | 'pdf', details: { label: string, value: string }[] = []) => {
    setModalState({ isOpen: true, title, documentUrl, type, details });
  };

  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  const [cliInput, setCliInput] = useState('');
  const [cliLines, setCliLines] = useState<React.ReactNode[]>([
    <div key="init-1" className="term-line">Initializing communication protocols...</div>,
    <div key="init-2" className="term-line">Type <span className="term-highlight">help</span> to see available commands.</div>
  ]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmailToClipboard = () => {
    const email = "pavandr715@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      const btnText = document.getElementById('copy-email-btn-text');
      if (btnText) {
        const originalText = btnText.textContent;
        btnText.textContent = "✓ Email Copied!";
        setTimeout(() => {
          btnText.textContent = originalText;
        }, 2000);
      }
    });
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;

    const rawCmd = cliInput.trim();
    const cmd = rawCmd.toLowerCase();
    setCliInput('');

    const userLine = (
      <div key={Date.now() + 'u'} className="term-line">
        <span className="term-prompt">guest@pavan:~$</span> {rawCmd}
      </div>
    );

    let respLine: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        respLine = (
          <div key={Date.now() + 'r'} className="term-line" style={{ animation: 'term-fade-up 0.3s forwards' }}>
            Available commands:<br />
            • <span className="term-highlight">resume</span> - Fetch engineering curriculum vitae<br />
            • <span className="term-highlight">hire</span> - View recruitment information<br />
            • <span className="term-highlight">projects</span> - List product case studies<br />
            • <span className="term-highlight">skills</span> - Display capability matrix<br />
            • <span className="term-highlight">whoami</span> - Display current user identity<br />
            • <span className="term-highlight">theme [matrix|onyx]</span> - Change system visual theme<br />
            • <span className="term-highlight">contact</span> - Display communication channels<br />
            • <span className="term-highlight">clear</span> - Clear terminal buffer
          </div>
        );
        break;
      case 'projects':
        respLine = <div key={Date.now() + 'r'} className="term-line">1. CricShift (AI Momentum Prediction)<br />2. VITALIQ (Recovery Dashboard)<br />3. RAG Knowledge Assistant</div>;
        break;
      case 'cv':
      case 'resume':
        respLine = (
          <div key={Date.now() + 'r'} className="term-line">
            <div style={{ animation: 'typingDots 1.5s steps(3, end)' }}>&gt; EXTRACTING ENCRYPTED DOSSIER...</div>
            <div style={{ animation: 'term-fade-up 0.3s forwards', animationDelay: '1.5s', opacity: 0, marginTop: '8px' }}>
              =====================================<br />
              <span style={{ color: '#fff' }}>IDENTITY : PAVAN D R</span><br />
              CLASS    : AI SOFTWARE ENGINEER<br />
              LOCATION : BENGALURU, KARNATAKA<br />
              CONTACT  : PAVANDR715@GMAIL.COM<br />
              STATUS   : ACTIVELY BUILDING<br />
              =====================================<br />
              <br />
              <span style={{ color: '#fff' }}>[ SKILLS ]</span><br />
              Python, Java, C, SQL, React, FastAPI, Machine Learning, RAG<br />
              <br />
              <span style={{ color: '#fff' }}>[ EDUCATION ]</span><br />
              B.E. Computer Science Engineering (CGPA: 8.56)<br />
              <br />
              <span style={{ color: '#fff' }}>[ PROJECTS ]</span><br />
              • Full-Stack RAG Application<br />
              • CricShift (Momentum Shift Detection)<br />
              • FurEver Pet Care<br />
              <br />
              <button 
                className="cmd-input" 
                style={{ display: 'inline-flex', marginTop: '8px', textDecoration: 'none', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: 'inherit', font: 'inherit' }}
                onClick={() => openModal(
                  'Pavan D R - Resume',
                  '/resume.pdf',
                  'pdf',
                  [
                    { label: 'Role', value: 'AI Software Engineer' },
                    { label: 'Location', value: 'Bengaluru, India' }
                  ]
                )}
              >
                <span className="cmd-prompt">&gt;</span> [PREVIEW_FULL_PDF]<span className="cursor-blink">_</span>
              </button>
            </div>
          </div>
        );
        break;
      case 'hire':
        respLine = <div key={Date.now() + 'r'} className="term-line">Currently exploring opportunities for AI/ML Engineering roles.<br />Please reach out via email.</div>;
        break;
      case 'contact':
        setIsContactModalOpen(true);
        respLine = <div key={Date.now() + 'r'} className="term-line">&gt; Initiating secure communication channel...</div>;
        break;
      case 'whoami':
        respLine = <div key={Date.now() + 'r'} className="term-line">Pavan D R<br />AI Software Engineer & Full Stack Developer</div>;
        break;
      case 'skills':
        respLine = <div key={Date.now() + 'r'} className="term-line">Neural Architecture [OK]<br />Full Stack Data Pipelines [OK]<br />Product UX Rendering [OK]</div>;
        break;
      case 'sudo':
        respLine = <div key={Date.now() + 'r'} className="term-line">pavan is not in the sudoers file. This incident will be reported.</div>;
        break;
      case 'theme matrix':
        document.body.className = 'theme-matrix';
        respLine = <div key={Date.now() + 'r'} className="term-line">System theme set to: <span className="term-highlight">MATRIX</span></div>;
        break;
      case 'theme onyx':
        document.body.className = 'theme-onyx';
        respLine = <div key={Date.now() + 'r'} className="term-line">System theme set to: <span className="term-highlight">ONYX</span></div>;
        break;
      case 'clear':
        setCliLines([
          <div key="init-1" className="term-line">Initializing communication protocols...</div>,
          <div key="init-2" className="term-line">Type <span className="term-highlight">help</span> to see available commands.</div>
        ]);
        return;
      default:
        respLine = <div key={Date.now() + 'r'} className="term-line">Command not recognized: '<span className="term-highlight">{rawCmd}</span>'. Type <span className="term-highlight">help</span> for commands.</div>;
    }

    setCliLines(prev => [...prev, userLine, respLine]);
  };

  return (
    <>
      <main id="app-container" className="cinematic-flow">

        {/**/}
        <section id="hero" className="flow-section hero-section reveal">
          <div className="hero-content">
            <div className="hero-status-bar magnetic-target">
              <span className="status-indicator"></span>
              <span className="status-text">SYSTEM.STATUS: ONLINE</span>
            </div>

            <h1 className="editorial-title">
              <span className="title-line reveal fade-up delay-1">ENGINEERING</span>
              <span className="title-line title-accent reveal fade-up delay-2">INTELLIGENT</span>
              <span className="title-line reveal fade-up delay-3">SYSTEMS</span>
            </h1>

            <p className="hero-description reveal fade-up delay-4">
              I am Pavan D R, an AI Software Engineer & Full Stack Developer. I design and architect scalable solutions at
              the intersection of machine learning models, product architecture, and human-centered engineering.
            </p>

            {/**/}
            <div className="system-readout reveal fade-up delay-5">
              <div className="readout-line"><span className="prompt">&gt;</span> <span className="typing">Loading competencies...</span>
              </div>
              <div className="readout-line success"><span className="prompt">&gt;</span> Neural Architecture [OK]</div>
              <div className="readout-line success"><span className="prompt">&gt;</span> Full Stack Data Pipelines [OK]</div>
              <div className="readout-line success"><span className="prompt">&gt;</span> Product UX Rendering [OK]</div>
            </div>

            <div className="hero-actions reveal fade-up delay-6" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button className="cmd-input magnetic-target" onClick={() => scrollToSection('case-studies')}>
                <span className="cmd-prompt">&gt;</span> Execute Case Studies<span className="cursor-blink">_</span>
              </button>
            </div>
          </div>

          {/**/}
          <div className="scroll-indicator magnetic-target" onClick={() => scrollToSection('case-studies')}>
            <div className="mouse-icon">
              <div className="wheel"></div>
            </div>
            <span className="scroll-label">SCROLL TO DISCOVER</span>
          </div>
        </section>

        {/**/}
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
                <span className="eb-meta">2025 // Generative AI</span>
                <h3 className="eb-title">RAG Knowledge Assistant</h3>
                <h4 className="eb-subtitle">Vector Search Chat Interface</h4>

                <div className="eb-text">
                  <p><strong>Overview:</strong> Flagship enterprise AI assistant grounding responses in documentation to
                    prevent LLM hallucinations.</p>
                  <p><strong>Problem:</strong> Standard LLMs hallucinate domain-specific knowledge and cannot provide
                    accurate enterprise citations.</p>
                  <p><strong>Solution:</strong> A Retrieval-Augmented Generation pipeline using LangChain, Pinecone vector
                    DB, and OpenAI embeddings.</p>
                  <p><strong>Key Engineering Decisions:</strong> Engineered optimized chunking strategies and implemented
                    Server-Sent Events (SSE) for low-latency streaming text generation.</p>
                  <p><strong>Outcome:</strong> Highly accurate retrieval system delivering context-aware responses with
                    source citations.</p>
                </div>

                <div className="eb-tech">
                  <span>LangChain</span> <span>Pinecone</span> <span>Next.js</span> <span>OpenAI API</span>
                </div>

                <div className="eb-actions">
                  <a href="#" className="cmd-input magnetic-target" style={{ textDecoration: "none" }}>
                    <span className="cmd-prompt">&gt;</span> GitHub<span className="cursor-blink">_</span>
                  </a>
                  <a href="#" className="cmd-input magnetic-target" style={{ textDecoration: "none" }}>
                    <span className="cmd-prompt">&gt;</span> Live Demo<span className="cursor-blink">_</span>
                  </a>
                </div>
              </div>

              <div className="eb-visual reveal">
                {/**/}
                <svg className="blueprint-svg" style={{ aspectRatio: '360/140' }} viewBox="30 130 360 140" xmlns="http://www.w3.org/2000/svg">
                  <rect className="box-draw" x="50" y="150" width="80" height="100" rx="4" />
                  <path className="draw-path" d="M 130 200 L 200 200" strokeDasharray="5 5" />
                  <polygon className="draw-poly" points="240,150 280,200 240,250 200,200" />
                  <path className="draw-path delay-2" d="M 280 200 L 330 200" />
                  <rect className="box-draw" x="330" y="180" width="60" height="40" rx="4" />
                  <text x="90" y="205" className="svg-label center">Doc</text>
                  <text x="240" y="205" className="svg-label center">Vector DB</text>
                  <text x="360" y="205" className="svg-label center">LLM</text>
                </svg>
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
                  <a href="#" className="cmd-input magnetic-target" style={{ textDecoration: "none" }}>
                    <span className="cmd-prompt">&gt;</span> GitHub<span className="cursor-blink">_</span>
                  </a>
                  <a href="#" className="cmd-input magnetic-target" style={{ textDecoration: "none" }}>
                    <span className="cmd-prompt">&gt;</span> Live Demo<span className="cursor-blink">_</span>
                  </a>
                </div>
              </div>
            </article>

            {/**/}
            <h3 className="category-heading reveal fade-up">Other Projects</h3>

            <div className="project-cards reveal fade-up">

              {/**/}
              <div className="project-card">
                <div className="pc-visual">
                  <svg className="blueprint-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                    <path className="draw-path"
                      d="M 100 90 C 100 90, 40 40, 40 20 C 40 0, 70 0, 100 30 C 130 0, 160 0, 160 20 C 160 40, 100 90, 100 90"
                      strokeWidth="2" fill="none" />
                    <circle className="node-pulse" cx="100" cy="90" r="3" />
                    <circle className="node-pulse delay-1" cx="40" cy="20" r="3" />
                    <circle className="node-pulse delay-2" cx="160" cy="20" r="3" />
                  </svg>
                </div>
                <div className="pc-content">
                  <h4 className="pc-title">Interactive Valentine's Experience</h4>
                  <p className="pc-desc">A romantic, interactive web application that transforms a traditional Valentine's
                    proposal into a personalized digital experience with mock authentication.</p>
                  <ul className="pc-highlights">
                    <li>Mock authentication flow</li>
                    <li>Interactive proposal interface</li>
                    <li>Responsive card-based date selection</li>
                    <li>Smooth micro-animations and transitions</li>
                  </ul>
                  <div className="pc-tech">
                    <span>HTML</span> <span>CSS</span> <span>JavaScript</span> <span>Bootstrap</span>
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <a href="https://our-valentinestory.netlify.app/" target="_blank" rel="noreferrer" className="cmd-input magnetic-target" style={{ textDecoration: "none", display: "inline-flex" }}>
                      <span className="cmd-prompt">{">"}</span> Live Demo
                    </a>
                  </div>
                </div>
              </div>


            </div>

          </div>
        </section>

        {/**/}
        <section id="capability-map" className="flow-section capability-section">
          <div className="section-heading reveal fade-up">
            <span className="heading-num">02 / CAPABILITIES</span>
            <h2 className="heading-title">Engineering Systems</h2>
          </div>

          {/**/}
          <div className="network-diagram reveal fade-up delay-2">

            <div className="network-cluster core-node">
              <div className="node-circle magnetic-target">AI / ML</div>
              <div className="branch-nodes">
                <span className="leaf-node">Python</span>
                <span className="leaf-node">Machine Learning</span>
                <span className="leaf-node">Prompt Engineering</span>
              </div>
            </div>

            <div className="network-cluster core-node">
              <div className="node-circle magnetic-target">Full Stack</div>
              <div className="branch-nodes">
                <span className="leaf-node">HTML5</span>
                <span className="leaf-node">CSS3</span>
                <span className="leaf-node">JavaScript</span>
                <span className="leaf-node">React</span>
                <span className="leaf-node">Node.js</span>
                <span className="leaf-node">MySQL</span>
                <span className="leaf-node">Git &amp; GitHub</span>
              </div>
            </div>

            <div className="network-cluster core-node">
              <div className="node-circle magnetic-target">Engineering</div>
              <div className="branch-nodes">
                <span className="leaf-node">Data Structures &amp; Algorithms</span>
                <span className="leaf-node">Object-Oriented Programming</span>
                <span className="leaf-node">DBMS</span>
                <span className="leaf-node">FastAPI</span>
                <span className="leaf-node">Responsive Web Design</span>
                <span className="leaf-node">Problem Solving</span>
              </div>
            </div>

          </div>
        </section>

        {/**/}
        <section id="engineering-journey" className="flow-section journey-section">
          <div className="section-heading reveal fade-up">
            <span className="heading-num">03 / PIPELINE</span>
            <h2 className="heading-title">Commit History</h2>
          </div>

          {/**/}
          <div className="git-timeline">
            <svg className="git-branch-line reveal" viewBox="0 0 100 800" preserveAspectRatio="none" data-reveal-once="true" data-threshold-half="true">
              <path className="draw-path" d="M 50 0 L 50 800" />
              <path className="draw-path branch" d="M 50 200 C 80 250, 80 350, 50 400" />
            </svg>

            <div className="commit-node reveal fade-up" data-reveal-once="true" data-threshold-half="true">
              <div className="commit-dot edu-dot"></div>
              <div className="commit-content">
                <span className="commit-hash">init repository</span>
                <span className="commit-date">Class of 2021</span>
                <h3 className="commit-title">High School Education</h3>
                <span className="commit-org">Jain Vidyalaya</span>
                <p className="commit-desc">Early academic years focusing on core subjects, building discipline, and developing a foundational curiosity for science and technology.</p>
              </div>
            </div>

            <div className="commit-node reveal fade-up delay-2" data-reveal-once="true" data-threshold-half="true">
              <div className="commit-dot"></div>
              <div className="commit-content">
                <span className="commit-hash">branch feature/science</span>
                <span className="commit-date">[2021] — [2023]</span>
                <h3 className="commit-title">Science Student</h3>
                <span className="commit-org">Anubhava Mantapa</span>
                <p className="commit-desc">Developed core problem-solving skills through comprehensive study of fundamental sciences, bridging the gap to applied technology.
                </p>
              </div>
            </div>

            <div className="commit-node reveal fade-up delay-3" data-reveal-once="true" data-threshold-half="true">
              <div className="commit-dot"></div>
              <div className="commit-content">
                <span className="commit-hash">merge branch 'bachelors/cse'</span>
                <span className="commit-date">[2023] — Present</span>
                <h3 className="commit-title">Bachelor of Engineering [B.E] in CSE</h3>
                <span className="commit-org">K.S.School of Engineering and Management</span>
                <p className="commit-desc">Exploring core computing principles alongside emerging technologies like artificial intelligence and distributed systems.</p>
              </div>
            </div>

            <div className="commit-node reveal fade-up delay-4" data-reveal-once="true" data-threshold-half="true">
              <div className="commit-dot"></div>
              <div className="commit-content">
                <span className="commit-hash">commit HEAD</span>
                <span className="commit-date">Present</span>
                <h3 className="commit-title">Aspiring AI Software Engineer</h3>
                <span className="status-indicator">● Available for Full-Time Opportunities</span>
                <p className="commit-desc">Actively building AI-powered applications, Retrieval-Augmented Generation (RAG) systems, machine learning solutions, and modern full-stack web applications through personal projects and continuous learning. Passionate about solving real-world problems with intelligent software while preparing for a full-time software engineering career.</p>
              </div>
            </div>
          </div>
        </section>

        {/**/}
        <section id="notebook" className="flow-section notebook-section">
          <div className="section-heading reveal fade-up">
            <span className="heading-num">04 / LOGS</span>
            <h2 className="heading-title">Engineering Journal</h2>
          </div>

          {/**/}
          <div className="terminal-logs-container reveal fade-up delay-2">

            <div className="log-entry magnetic-target">
              <div className="log-type">INFO: RESEARCH PUBLICATION</div>
              <div className="log-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                A Survey on Machine Learning Approach for Momentum Shift Detection and Win Prediction in Cricket Matches
              </div>
              <div className="log-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <span>Status: ✓ PUBLISHED</span>
                <button
                  className="cmd-input magnetic-target"
                  onClick={() => openModal(
                    'Research Publication',
                    '/research-paper.pdf',
                    'pdf',
                    [
                      { label: 'Journal', value: 'IJARCCE' },
                      { label: 'Published', value: 'May 2026' },
                      { label: 'DOI', value: '10.17148/IJARCCE.2026.155194' }
                    ]
                  )}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
                >
                  <span className="cmd-prompt">&gt;</span> Preview Publication<span className="cursor-blink">_</span>
                </button>
              </div>
            </div>

            <div className="log-entry magnetic-target">
              <div className="log-type">INFO: CERTIFICATION ACQUIRED</div>
              <div className="log-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                Certificate of Publication - IJARCCE
              </div>
              <div className="log-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <span>Status: ✓ VERIFIED</span>
                <button
                  className="cmd-input magnetic-target"
                  onClick={() => openModal(
                    'Certificate of Publication',
                    '/publication-certificate.pdf',
                    'pdf',
                    [
                      { label: 'Issued By', value: 'IJARCCE' },
                      { label: 'Date', value: 'May 2026' },
                      { label: 'DOI', value: '10.17148/IJARCCE.2026.155194' }
                    ]
                  )}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
                >
                  <span className="cmd-prompt">&gt;</span> Preview Certificate<span className="cursor-blink">_</span>
                </button>
              </div>
            </div>

            <div className="log-entry magnetic-target">
              <div className="log-type">INFO: CERTIFICATION</div>
              <div className="log-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                IBM SkillsBuild Hackathon-integrated Guided Learning Experience (GLE)
              </div>
              <div className="log-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <span>Status: ✓ COMPLETED</span>
                <button
                  className="cmd-input magnetic-target"
                  onClick={() => openModal(
                    'IBM SkillsBuild Certificate',
                    '/ibm-skillsbuild-certificate.pdf',
                    'pdf',
                    [
                      { label: 'Issued By', value: 'Edunet Foundation & IBM SkillsBuild' },
                      { label: 'Status', value: 'COMPLETED' }
                    ]
                  )}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
                >
                  <span className="cmd-prompt">&gt;</span> Preview Certificate<span className="cursor-blink">_</span>
                </button>
              </div>
            </div>

            <div className="log-entry magnetic-target">
              <div className="log-type">INFO: CERTIFICATION</div>
              <div className="log-title" style={{ marginTop: '0.5rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                Explore Machine Learning using Python
              </div>
              <div className="log-status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <span>Status: ✓ COMPLETED</span>
                <button
                  className="cmd-input magnetic-target"
                  onClick={() => openModal(
                    'Explore Machine Learning using Python',
                    '/infosys-ml-certificate.pdf',
                    'pdf',
                    [
                      { label: 'Issued By', value: 'Infosys Springboard' },
                      { label: 'Issued On', value: 'April 13, 2026' },
                      { label: 'Status', value: 'COMPLETED' }
                    ]
                  )}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textTransform: 'uppercase' }}
                >
                  <span className="cmd-prompt">&gt;</span> Preview Certificate<span className="cursor-blink">_</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/**/}
        <section id="terminal" className="flow-section terminal-section">
          <div className="section-heading reveal fade-up">
            <span className="heading-num">05 / TERMINAL</span>
            <h2 className="heading-title">Establish Connection</h2>
          </div>

          <div className="interactive-terminal reveal fade-up delay-2">
            <div className="term-top-bar">
              <span className="term-btn"></span><span className="term-btn"></span><span className="term-btn"></span>
              <span className="term-title">guest@pavan: ~/contact</span>
            </div>
            <div id="cli-output" className="term-output">
              {cliLines}
            </div>
            <form id="cli-form" className="term-input-line" onSubmit={handleCliSubmit}>
              <span className="term-prompt">guest@pavan:~$</span>
              <input
                type="text"
                id="cli-input"
                className="term-input"
                placeholder="Enter command..."
                autoComplete="off"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') {
                    playTypingSound();
                  }
                }}
              />
            </form>
          </div>

          <div className="fallback-contact reveal fade-up delay-4">
            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginBottom: "24px" }}>
              <button 
                className="cmd-input magnetic-target" 
                style={{ textDecoration: "none", border: "none", background: "transparent", cursor: "pointer", padding: 0, color: "inherit", font: "inherit" }}
                onClick={() => setIsContactModalOpen(true)}
              >
                <span className="cmd-prompt">&gt;</span> Email Me<span className="cursor-blink">_</span>
              </button>
              <button className="cmd-input magnetic-target" onClick={copyEmailToClipboard}>
                <span className="cmd-prompt">&gt;</span> <span id="copy-email-btn-text">Copy Email Address</span><span
                  className="cursor-blink">_</span>
              </button>
            </div>
            <div className="social-links">
              <a href="https://github.com/pvndr" target="_blank" className="magnetic-target">GitHub</a>
              <a href="https://www.linkedin.com/in/pavandr-ai/" target="_blank" className="magnetic-target">LinkedIn</a>
            </div>
          </div>
        </section>

      </main>

      <DocumentModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        documentUrl={modalState.documentUrl}
        type={modalState.type}
        details={modalState.details}
      />

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
