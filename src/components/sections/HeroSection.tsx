

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
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
      <div 
        className="scroll-indicator magnetic-target" 
        onClick={() => scrollToSection('case-studies')}
        role="button"
        tabIndex={0}
        aria-label="Scroll to Case Studies"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToSection('case-studies');
          }
        }}
      >
        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
        <span className="scroll-label">SCROLL TO DISCOVER</span>
      </div>
    </section>
  );
}
