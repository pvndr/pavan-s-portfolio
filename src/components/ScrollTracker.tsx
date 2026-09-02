import { useEffect, useState } from 'react';

export function ScrollTracker() {
  const [activeSection, setActiveSection] = useState('hero');
  const [fillHeight, setFillHeight] = useState('0%');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollPos / docHeight) * 100;
      setFillHeight(`${Math.min(100, Math.max(0, scrollPercent))}%`);

      const sections = document.querySelectorAll('.flow-section');
      let currentActive = activeSection;
      
      sections.forEach(sec => {
        const secTop = (sec as HTMLElement).offsetTop - 300;
        if (scrollPos >= secTop) {
          currentActive = sec.id;
        }
      });

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="scroll-tracker" aria-hidden="true">
      <div className="tracker-line">
        <div id="tracker-fill" className="tracker-fill" style={{ height: fillHeight }}></div>
      </div>
      <div className="tracker-labels">
        <span 
          className={`tracker-label ${activeSection === 'hero' ? 'active' : ''}`} 
          onClick={() => scrollTo('hero')}
        >00 / INIT</span>
        <span 
          className={`tracker-label ${activeSection === 'case-studies' ? 'active' : ''}`} 
          onClick={() => scrollTo('case-studies')}
        >01 / ARCHITECTURE</span>
        <span 
          className={`tracker-label ${activeSection === 'capability-map' ? 'active' : ''}`} 
          onClick={() => scrollTo('capability-map')}
        >02 / CAPABILITIES</span>
        <span 
          className={`tracker-label ${activeSection === 'engineering-journey' ? 'active' : ''}`} 
          onClick={() => scrollTo('engineering-journey')}
        >03 / PIPELINE</span>
        <span 
          className={`tracker-label ${activeSection === 'notebook' ? 'active' : ''}`} 
          onClick={() => scrollTo('notebook')}
        >04 / LOGS</span>
        <span 
          className={`tracker-label ${activeSection === 'terminal' ? 'active' : ''}`} 
          onClick={() => scrollTo('terminal')}
        >05 / TERMINAL</span>
      </div>
    </aside>
  );
}
