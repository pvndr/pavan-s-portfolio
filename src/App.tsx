import { useEffect, useState } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Cursor } from './components/Cursor';
import { SfxToggle } from './components/SfxToggle';
import { ScrollTracker } from './components/ScrollTracker';
import { BootSequence } from './components/BootSequence';
import { MainContent } from './components/MainContent';
import { useScrollReveal } from './hooks/useScrollReveal';
import { playHoverSound, playClickSound } from './utils/audio';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);

  useScrollReveal();

  useEffect(() => {
    // Parallax logic that used to be in CSS or app.js
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((el) => {
        const speed = 0.4;
        (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
      });

    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.magnetic-target')) {
        playHoverSound();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.magnetic-target')) {
        playClickSound();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      
      <div style={{ opacity: isBooting ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <SfxToggle />
        <div id="noise-overlay"></div>
        
        <BackgroundCanvas />
        <Cursor />

        <div className="global-axis"></div>
        <ScrollTracker />

        <MainContent />
      </div>
    </>
  );
}
