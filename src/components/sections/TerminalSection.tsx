import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Mail, Terminal, Sparkles } from 'lucide-react';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { educationTimeline } from '../../data/experience';
import { publications } from '../../data/publications';
import { playClickSound, playTypingSound } from '../../utils/audio';

export function TerminalSection() {
  const [cliInput, setCliInput] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cliLines, setCliLines] = useState<React.ReactNode[]>([
    <div key="init-1" className="inacio-term-line sys">
      [PROTOCOL: ONLINE] Inácio-styled engineering console initialized.
    </div>,
    <div key="init-2" className="inacio-term-line">
      Query systems, inspect architecture, or click a topic chip below. Type <span className="inacio-term-highlight">help</span> for commands.
    </div>,
  ]);

  const copyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(profile.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCommand = (rawCmd: string) => {
    playTypingSound();
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const userLine = (
      <div key={Date.now() + 'u'} className="inacio-term-line user">
        <span className="inacio-term-prompt">pavan:~$</span> {rawCmd}
      </div>
    );

    let respLine: React.ReactNode;

    if (cmd.includes('rag') || cmd === 'project 1') {
      const rag = projects.find((p) => p.id === 'rag-assistant');
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-block">
          <div className="inacio-term-highlight">&gt; RAG Knowledge Assistant (Full Stack AI System)</div>
          <div>{rag?.summary}</div>
          <div style={{ color: 'var(--inacio-fg-dim)' }}>
            <strong>Architecture:</strong> {rag?.architectureHighlight}
          </div>
          <div style={{ color: 'var(--inacio-fg-subtle)' }}>
            Stack: React, TypeScript, FastAPI, ChromaDB, SQLite, Gemini API, Sentence Transformers.
          </div>
        </div>
      );
    } else if (cmd.includes('paper') || cmd.includes('cricket') || cmd.includes('cricshift')) {
      const pub = publications[0];
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-block">
          <div className="inacio-term-highlight">&gt; Published Survey &amp; CricShift Model</div>
          <div style={{ color: 'var(--inacio-fg)', fontWeight: 600 }}>{pub.title}</div>
          <div style={{ color: 'var(--inacio-fg-dim)' }}>
            Venue: {pub.venue} ({pub.date}) · DOI: {pub.doi}
          </div>
          <div style={{ color: 'var(--inacio-fg-subtle)' }}>
            {pub.abstract}
          </div>
        </div>
      );
    } else if (cmd.includes('edu') || cmd.includes('cgpa') || cmd.includes('college')) {
      const cse = educationTimeline[0];
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-block">
          <div className="inacio-term-highlight">&gt; Academic Foundation &amp; Performance</div>
          <div style={{ color: 'var(--inacio-fg)', fontWeight: 600 }}>
            {cse.title} — {cse.organization} ({cse.period})
          </div>
          <div style={{ color: 'var(--inacio-accent)' }}>
            Cumulative Grade Point Average: 8.56 CGPA
          </div>
          <div style={{ color: 'var(--inacio-fg-dim)' }}>
            Pre-University: Anubhava Mantapa (Science) · High School: Jain Vidyalaya
          </div>
        </div>
      );
    } else if (cmd.includes('chronicle') || cmd.includes('labpad')) {
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-block">
          <div className="inacio-term-highlight">&gt; Chronicle &amp; LabPad Deployments</div>
          <div>• <strong>Chronicle:</strong> Daily journal with Next.js, Prisma ORM, PostgreSQL, and Supabase. Live: <span style={{ color: 'var(--inacio-accent)' }}>chronicle-app-tau.vercel.app</span></div>
          <div>• <strong>LabPad:</strong> Offline-first PWA for technical note logging with IndexedDB disk-writes and background Supabase sync. Live: <span style={{ color: 'var(--inacio-accent)' }}>project-d81ht.vercel.app</span></div>
        </div>
      );
    } else if (cmd.includes('skills') || cmd.includes('stack')) {
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-block">
          <div><span className="inacio-term-highlight">AI / ML:</span> Python, Machine Learning, ChromaDB, Sentence Transformers, Gemini API, RAG</div>
          <div><span className="inacio-term-highlight">Frontend:</span> TypeScript, JavaScript, React, Next.js, Three.js, HTML5/CSS3</div>
          <div><span className="inacio-term-highlight">Backend:</span> Node.js, FastAPI, PostgreSQL, Prisma ORM, Supabase, MySQL</div>
          <div><span className="inacio-term-highlight">Core:</span> Data Structures &amp; Algorithms, OOP, DBMS, Sub-second API design</div>
        </div>
      );
    } else if (cmd.includes('whoami')) {
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-line">
          <span className="inacio-term-highlight">{profile.name}</span> — {profile.role}
          <br />
          {profile.bio}
        </div>
      );
    } else if (cmd.includes('hire') || cmd.includes('contact') || cmd.includes('email')) {
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-line">
          Direct Email: <span className="inacio-term-highlight">{profile.links.email}</span> · Based in Bengaluru, Karnataka, India.
        </div>
      );
    } else if (cmd === 'clear') {
      setCliLines([
        <div key="init-1" className="inacio-term-line sys">
          Terminal buffer cleared.
        </div>,
      ]);
      return;
    } else if (cmd.includes('sudo')) {
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-line" style={{ color: '#f87171' }}>
          pavan is not in the sudoers file. Incident logged to telemetry monitor.
        </div>
      );
    } else {
      respLine = (
        <div key={Date.now() + 'r'} className="inacio-term-block">
          <div style={{ color: 'var(--inacio-fg-dim)' }}>Command '{rawCmd}' processed. Available topics:</div>
          <div className="inacio-term-help-grid">
            <span className="inacio-term-cmd">rag</span>
            <span className="inacio-term-desc">Inspect RAG Knowledge Assistant architecture</span>
            <span className="inacio-term-cmd">paper</span>
            <span className="inacio-term-desc">View published IJARCCE cricket ML paper</span>
            <span className="inacio-term-cmd">edu</span>
            <span className="inacio-term-desc">View 8.56 CGPA academic credentials</span>
            <span className="inacio-term-cmd">skills</span>
            <span className="inacio-term-desc">View full engineering stack</span>
            <span className="inacio-term-cmd">email</span>
            <span className="inacio-term-desc">Display direct email and hiring contact</span>
            <span className="inacio-term-cmd">clear</span>
            <span className="inacio-term-desc">Clear console display</span>
          </div>
        </div>
      );
    }

    setCliLines((prev) => [...prev, userLine, respLine]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    handleCommand(cliInput);
    setCliInput('');
  };

  const quickPrompts = [
    { label: 'Explain RAG Assistant', cmd: 'rag' },
    { label: 'Cricket ML Paper Details', cmd: 'paper' },
    { label: 'Academics & 8.56 CGPA', cmd: 'edu' },
    { label: 'Chronicle & LabPad', cmd: 'chronicle' },
    { label: 'Full Tech Stack', cmd: 'skills' },
    { label: 'Hiring & Availability', cmd: 'email' },
  ];

  return (
    <section id="terminal" className="inacio-section">
      <div className="inacio-section-head">
        <div>
          <span className="inacio-head-index">05 / PROTOCOL</span>
          <h2 className="inacio-head-title">Direct Console &amp; Inquiry</h2>
        </div>
        <p className="inacio-head-desc">
          Query the system architecture directly, inspect verified credentials, or initiate communication.
        </p>
      </div>

      <div className="inacio-terminal-shell">
        <div className="inacio-corner-cross tl">+</div>
        <div className="inacio-corner-cross tr">+</div>
        <div className="inacio-corner-cross bl">+</div>
        <div className="inacio-corner-cross br">+</div>

        {/* Console Header Bar */}
        <div className="inacio-term-top">
          <div className="inacio-term-session">
            <Terminal size={14} style={{ color: 'var(--inacio-accent)' }} />
            <span>[SESSION: GUEST@PAVANDR]</span>
          </div>
          <div className="inacio-term-status">
            <span className="inacio-pulse-dot" />
            <span>BLR / UTC+5:30 · READY [200]</span>
          </div>
        </div>

        {/* Topic Chips */}
        <div className="inacio-term-chips-bar">
          <span className="inacio-chips-label">
            <Sparkles size={12} style={{ color: 'var(--inacio-accent)' }} />
            Quick Query:
          </span>
          {quickPrompts.map((p) => (
            <button
              key={p.cmd}
              onClick={() => handleCommand(p.cmd)}
              className="inacio-term-chip"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Console Scroll Output */}
        <div className="inacio-term-output">
          {cliLines}
        </div>

        {/* Console Input Line */}
        <form onSubmit={handleSubmit} className="inacio-term-input-row">
          <span className="inacio-term-prompt">pavan:~$</span>
          <input
            type="text"
            className="inacio-term-input"
            placeholder="Type a command or question (e.g. 'rag', 'paper', 'edu', 'skills')..."
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            onKeyDown={() => playTypingSound()}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>

      {/* Direct Contact Bar */}
      <div className="inacio-terminal-direct-contact">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={`mailto:${profile.links.email}`}
            className="inacio-btn-primary"
            onClick={() => playClickSound()}
          >
            <Mail size={15} />
            <span>Email me directly</span>
          </a>

          <button onClick={copyEmail} className="inacio-btn-secondary">
            {copiedEmail ? <Check size={14} style={{ color: 'var(--inacio-accent)' }} /> : <Copy size={14} />}
            <span>{copiedEmail ? 'Copied to clipboard' : profile.links.email}</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inacio-action-link"
            onClick={() => playClickSound()}
          >
            <ExternalLink size={13} />
            <span>GitHub</span>
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inacio-action-link"
            onClick={() => playClickSound()}
          >
            <ExternalLink size={13} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
