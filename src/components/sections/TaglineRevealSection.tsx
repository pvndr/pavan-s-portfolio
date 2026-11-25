import { useEffect, useRef } from 'react';

interface TaglineRevealProps {
  quote?: string;
  attribution?: string;
}

export function TaglineRevealSection({
  quote = 'I build software where machine learning models meet deterministic architecture — from semantic vector search to offline-first systems that hold under real constraints.',
  attribution = 'Pavan D R · AI Software Engineer',
}: TaglineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = quote.split(' ');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      const wordSpans = container.querySelectorAll<HTMLElement>('.reveal-word');
      wordSpans.forEach((span) => {
        span.style.opacity = '1';
        span.style.color = '#EFF2F7';
      });
      return;
    }

    const wordSpans = container.querySelectorAll<HTMLElement>('.reveal-word');

    // Scroll listener throttled with requestAnimationFrame per B11 / B7
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!container) return;
          const rect = container.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Activation trigger line around middle of viewport
          const progress = Math.min(
            Math.max((windowHeight * 0.85 - rect.top) / (rect.height + windowHeight * 0.5), 0),
            1
          );

          const activeCount = Math.floor(progress * wordSpans.length * 1.3);

          wordSpans.forEach((span, index) => {
            if (index <= activeCount) {
              span.classList.add('word-active');
            } else {
              span.classList.remove('word-active');
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="tagline-reveal-section" ref={containerRef}>
      <div className="tagline-reveal-container">
        <div className="tagline-kicker">ENGINEERING PHILOSOPHY</div>
        <p className="tagline-statement" style={{ textWrap: 'balance' }}>
          {words.map((word, index) => (
            <span key={index} className="reveal-word">
              {word}{' '}
            </span>
          ))}
        </p>
        <div className="tagline-attribution">{attribution}</div>
      </div>
    </section>
  );
}
