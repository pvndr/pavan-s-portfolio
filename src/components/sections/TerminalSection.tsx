import React, { useState } from 'react';
import { playTypingSound } from '../../utils/audio';

interface TerminalSectionProps {
  setIsContactModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: (title: string, documentUrl: string, type: 'image' | 'pdf', details?: { label: string, value: string }[]) => void;
}

export function TerminalSection({ setIsContactModalOpen, openModal }: TerminalSectionProps) {
  const [cliInput, setCliInput] = useState('');
  const [cliLines, setCliLines] = useState<React.ReactNode[]>([
    <div key="init-1" className="term-line">Initializing communication protocols...</div>,
    <div key="init-2" className="term-line">Type <span className="term-highlight">help</span> to see available commands.</div>
  ]);
  const [isWiping, setIsWiping] = useState(false);

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
            • <span className="term-highlight">github</span> - Open GitHub profile<br />
            • <span className="term-highlight">linkedin</span> - Open LinkedIn profile<br />
            • <span className="term-highlight">clear</span> - Clear terminal buffer
          </div>
        );
        break;
      case 'projects':
        respLine = <div key={Date.now() + 'r'} className="term-line">1. Chronicle (Personal Publishing & Reflection)<br />2. RAG Knowledge Assistant (Multi-Provider RAG Platform)<br />3. CricShift (Predictive Momentum Engine)<br />4. LabPad (Offline-First PWA)<br />5. Interactive Valentine's Experience</div>;
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
              • Chronicle (Full-Stack Publishing Platform)<br />
              • RAG Knowledge Assistant (Multi-Provider RAG Platform)<br />
              • CricShift (Momentum Shift Detection)<br />
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
      case 'github':
        window.open('https://github.com/pvndr', '_blank');
        respLine = <div key={Date.now() + 'r'} className="term-line">&gt; Opening GitHub profile...</div>;
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/pavandr-ai/', '_blank');
        respLine = <div key={Date.now() + 'r'} className="term-line">&gt; Opening LinkedIn profile...</div>;
        break;
      case 'whoami':
        respLine = <div key={Date.now() + 'r'} className="term-line">Pavan D R<br />AI Software Engineer & Full Stack Developer</div>;
        break;
      case 'skills':
        respLine = (
          <div key={Date.now() + 'r'} className="term-line">
            Languages: Python, TypeScript, Java, C, SQL<br />
            Frontend: React, Next.js, HTML/CSS<br />
            Backend & DB: Node.js, FastAPI, PostgreSQL, Prisma, Supabase, ChromaDB, SQLite<br />
            AI & ML: Machine Learning, ChromaDB, Sentence Transformers, Gemini API, RAG
          </div>
        );
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
        setIsWiping(true);
        setTimeout(() => {
          setCliLines([
            <div key="init-1" className="term-line">Initializing communication protocols...</div>,
            <div key="init-2" className="term-line">Type <span className="term-highlight">help</span> to see available commands.</div>
          ]);
          setIsWiping(false);
        }, 500);
        return;
      default:
        respLine = <div key={Date.now() + 'r'} className="term-line">Command not recognized: '<span className="term-highlight">{rawCmd}</span>'. Type <span className="term-highlight">help</span> for commands.</div>;
    }

    setCliLines(prev => [...prev, userLine, respLine]);
  };

  return (
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
        <div id="cli-output" className={`term-output ${isWiping ? 'terminal-wipe-anim' : ''}`}>
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
          <a href="https://github.com/pvndr" target="_blank" rel="noreferrer" className="magnetic-target">GitHub</a>
          <a href="https://www.linkedin.com/in/pavandr-ai/" target="_blank" rel="noreferrer" className="magnetic-target">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
