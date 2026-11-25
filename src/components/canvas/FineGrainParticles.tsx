import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

export function FineGrainParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = mediaQuery.matches;

    // Responsive particle count (400 on mobile, 750 on desktop)
    const particleCount = width < 768 ? 380 : 720;
    const particles: Particle[] = [];

    // Color palette: mostly warm chalk/sand (#eeece8) with occasional subtle acid-lime (#c6f135) or cyan (#00f0ff)
    const colors = [
      'rgba(238, 236, 232, ', // 80% warm chalk
      'rgba(238, 236, 232, ',
      'rgba(238, 236, 232, ',
      'rgba(238, 236, 232, ',
      'rgba(198, 241, 53, ',  // 10% acid lime
      'rgba(0, 240, 255, ',   // 10% cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.12;
      const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.08, // gentle upward thermal drift
        size: Math.random() * 1.5 + 0.6,
        alpha: baseAlpha,
        baseAlpha,
        color: colorPrefix,
      });
    }

    // Mouse position for subtle air disturbance
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          // Normal ambient drift
          p.x += p.vx;
          p.y += p.vy;

          // Subtle air current from mouse
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 120;

          if (distSq < maxDist * maxDist && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 0.6;
            p.x += (dx / dist) * force * 3;
            p.y += (dy / dist) * force * 3;
            p.alpha = Math.min(p.baseAlpha * 1.8, 0.85);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }

          // Screen wrap
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Draw fine grain particle
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="inacio-grain-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
