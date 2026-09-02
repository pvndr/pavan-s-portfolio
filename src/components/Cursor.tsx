import { useEffect, useRef } from 'react';

// Extend Window interface for GlobalCursor
declare global {
  interface Window {
    GlobalCursor?: {
      x: number;
      y: number;
      radius: number;
    };
  }
}

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Disable entirely on touch devices / mobile to prevent sticky hovers
    if (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) {
      window.GlobalCursor = { x: -1000, y: -1000, radius: 0 };
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hasMoved = false;
    let isHiddenContext = false;
    let animationFrameId: number;

    window.GlobalCursor = {
      x: -1000,
      y: -1000,
      radius: 120
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      window.GlobalCursor!.x = mouseX;
      window.GlobalCursor!.y = mouseY;

      if (!hasMoved) {
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        hasMoved = true;
      }
    };

    const handleMouseLeave = () => {
      window.GlobalCursor!.x = -1000;
      window.GlobalCursor!.y = -1000;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      hasMoved = false;
    };

    const interactiveSelectors = 'a, button, .magnetic-target';
    const textSelectors = 'p, h1, h2, h3, h4, h5, h6, span, li, input[type="text"], textarea, code, pre';

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest(interactiveSelectors)) {
        document.body.classList.add('cursor-hover');
      }
      
      if (target.closest(textSelectors) || target.closest('iframe')) {
        document.body.classList.add('cursor-hidden');
        isHiddenContext = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest(interactiveSelectors)) {
        document.body.classList.remove('cursor-hover');
      }
      
      if (target.closest(textSelectors) || target.closest('iframe')) {
        document.body.classList.remove('cursor-hidden');
        isHiddenContext = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    function render() {
      const isModalOpen = document.body.classList.contains('modal-open');
      
      if (isModalOpen && !isHiddenContext) {
        document.body.classList.add('cursor-hidden');
        isHiddenContext = true;
      } else if (!isModalOpen && isHiddenContext && !document.querySelector(textSelectors + ', iframe:hover')) {
        document.body.classList.remove('cursor-hidden');
        isHiddenContext = false;
      }

      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (dot && ring) {
        dot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
        ring.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('cursor-hover', 'cursor-hidden');
    };
  }, []);

  return (
    <>
      <style>{`
        body, a, button, .magnetic-target {
          cursor: none !important;
        }
        p, h1, h2, h3, h4, h5, h6, span, li, input[type="text"], textarea, code, pre {
          cursor: text !important;
        }
        
        .custom-cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px; height: 6px;
          background-color: var(--accent-primary, #00ffcc);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10002;
          opacity: 0;
          transition: width 0.15s, height 0.15s, background-color 0.15s, opacity 0.2s;
          will-change: transform;
        }
        .custom-cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 32px; height: 32px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10001;
          opacity: 0;
          transition: width 0.25s, height 0.25s, border-color 0.25s, background-color 0.25s, opacity 0.2s;
          will-change: transform;
        }

        body.cursor-hover .custom-cursor-dot {
          width: 10px; height: 10px;
          background-color: #fff;
        }
        body.cursor-hover .custom-cursor-ring {
          width: 54px; height: 54px;
          border-color: var(--accent-primary, #00ffcc);
          background: rgba(0, 255, 204, 0.1);
        }
        
        body.cursor-hidden .custom-cursor-dot,
        body.cursor-hidden .custom-cursor-ring {
          opacity: 0 !important;
        }
      `}</style>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
