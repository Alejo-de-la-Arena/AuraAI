'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaSpeed: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (prefersReducedMotion) {
      // Static dark background — no animation
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 30 : 70;
    const CONNECTION_RADIUS = isMobile ? 120 : 150;
    const CYAN = { r: 0, g: 229, b: 255 };

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];

    function resize() {
      width = canvas!.width = canvas!.offsetWidth;
      height = canvas!.height = canvas!.offsetHeight;
    }

    function createNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1.5,
        alpha: Math.random() * 0.5 + 0.3,
        alphaSpeed: (Math.random() - 0.5) * 0.004,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const node of nodes) {
        // Mouse repulsion
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const INFLUENCE = 100;

        if (dist < INFLUENCE && dist > 0) {
          const force = (1 - dist / INFLUENCE) * (1 - dist / INFLUENCE);
          node.x += (dx / dist) * force * 0.5;
          node.y += (dy / dist) * force * 0.5;
        }

        // Drift
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Alpha drift
        node.alpha += node.alphaSpeed;
        if (node.alpha > 0.8 || node.alpha < 0.2) node.alphaSpeed *= -1;
        node.alpha = Math.max(0.2, Math.min(0.8, node.alpha));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_RADIUS) {
            const opacity = (1 - dist / CONNECTION_RADIUS) * 0.35;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(${CYAN.r}, ${CYAN.g}, ${CYAN.b}, ${opacity})`;
            ctx!.lineWidth = 0.8;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${CYAN.r}, ${CYAN.g}, ${CYAN.b}, ${node.alpha})`;
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    createNodes();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
