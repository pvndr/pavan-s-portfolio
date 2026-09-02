import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const handleIntersect = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach(entry => {
        const isOnce = entry.target.hasAttribute('data-reveal-once');
        
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          if (isOnce) {
            obs.unobserve(entry.target);
          }
        } else {
          if (!isOnce) {
            entry.target.classList.remove('in-view');
          }
        }
      });
    };

    const defaultObserver = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    const halfObserver = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    });

    revealElements.forEach(el => {
      if (el.hasAttribute('data-threshold-half')) {
        halfObserver.observe(el);
      } else {
        defaultObserver.observe(el);
      }
    });

    return () => {
      revealElements.forEach(el => {
        defaultObserver.unobserve(el);
        halfObserver.unobserve(el);
      });
      defaultObserver.disconnect();
      halfObserver.disconnect();
    };
  }, []);
}
