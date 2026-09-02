import { useEffect, useRef } from 'react';

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isActive = true;
    let nodes: Node[] = [];
    let packets: DataPacket[] = [];
    const GRID_SIZE = 80;
    const MAX_NODES = 100;
    const CONNECTION_DISTANCE = 140;

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Snap to rough grid for architectural feel
        this.x = Math.round(this.x / GRID_SIZE) * GRID_SIZE + (Math.random() * 20 - 10);
        this.y = Math.round(this.y / GRID_SIZE) * GRID_SIZE + (Math.random() * 20 - 10);
        
        // Very slow drift
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() > 0.8 ? 2 : 1; 
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Subtle magnetic push from global cursor
        const mouse = window.GlobalCursor || { x: -1000, y: -1000, radius: 120 };
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 0.5;
          this.y -= (dy / dist) * force * 0.5;
        }
      }

      draw(hue: number) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 40%, 60%, 0.6)`;
        ctx.fill();
      }
    }

    class DataPacket {
      start: Node;
      end: Node;
      progress: number;
      speed: number;

      constructor(startNode: Node, endNode: Node) {
        this.start = startNode;
        this.end = endNode;
        this.progress = 0;
        this.speed = 0.005 + Math.random() * 0.01;
      }

      update() {
        this.progress += this.speed;
        return this.progress >= 1;
      }

      draw(hue: number) {
        if (!ctx) return;
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;
        
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, 0.9)`;
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${hue}, 80%, 70%, 1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createNetwork() {
      nodes = [];
      packets = [];
      
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      const numNodes = Math.min(MAX_NODES, Math.floor((w * h) / 15000));
      
      for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node(w, h));
      }
    }

    function animateCanvas() {
      if (!isActive || !canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      // Dynamic colors based on theme
      const computedStyle = getComputedStyle(document.body);
      const bgSpace = computedStyle.getPropertyValue('--bg-space').trim() || '#07090a';
      const hue = parseInt(computedStyle.getPropertyValue('--hue-primary').trim() || '155');

      // Convert hex to rgba for trail
      let r = 7, g = 9, b = 10;
      if (bgSpace.startsWith('#')) {
        const hex = bgSpace.replace('#', '');
        if (hex.length === 6) {
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
        }
      }
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
      ctx.fillRect(0, 0, w, h);

      const connections: {n1: Node, n2: Node}[] = [];

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(w, h);
        nodes[i].draw(hue);

        // Draw connection to mouse
        const mouse = window.GlobalCursor || { x: -1000, y: -1000, radius: 120 };
        if (mouse.x > -1000) {
          const dxMouse = nodes[i].x - mouse.x;
          const dyMouse = nodes[i].y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < mouse.radius * 1.5) {
            const alphaMouse = (1 - distMouse / (mouse.radius * 1.5)) * 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${alphaMouse})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            connections.push({n1: nodes[i], n2: nodes[j]});
            
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(${hue}, 20%, 50%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Randomly spawn data packet along connection
            if (Math.random() < 0.001) {
              packets.push(new DataPacket(nodes[i], nodes[j]));
            }
          }
        }
      }

      // Draw data packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const isDone = packets[p].update();
        packets[p].draw(hue);
        if (isDone) {
          packets.splice(p, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animateCanvas);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    createNetwork();
    animateCanvas();

    return () => {
      isActive = false;
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} />;
}
