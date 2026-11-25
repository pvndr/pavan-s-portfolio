import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

/**
 * Initialises Lenis smooth scroll.
 * Automatically disables smooth scrolling when user prefers reduced motion.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [reduced]);

  return lenisRef;
}
