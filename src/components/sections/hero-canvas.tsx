'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  alphaDir: number;
  pulsePhase: number;
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

    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 32 : 72;
    const CONNECTION_RADIUS = isMobile ? 120 : 155;
    const MOUSE_RADIUS = 110;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let tick = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    function spawnNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => {
        const speed = 0.08 + Math.random() * 0.18;
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          radius: 1.5 + Math.random() * 1.8,
          alpha: 0.3 + Math.random() * 0.5,
          alphaDir: Math.random() > 0.5 ? 1 : -1,
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });
    }

    function draw() {
      tick++;
      ctx!.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update nodes
      for (const node of nodes) {
        const dx = node.x - mx;
        const dy = node.y - my;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        // Repulsion near cursor
        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = Math.pow(1 - dist / MOUSE_RADIUS, 2) * 0.7;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Drift back toward base velocity
        node.vx += (node.baseVx - node.vx) * 0.03;
        node.vy += (node.baseVy - node.vy) * 0.03;

        // Max speed clamp
        const spd = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (spd > 1.5) {
          node.vx = (node.vx / spd) * 1.5;
          node.vy = (node.vy / spd) * 1.5;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Wrap edges (instead of bounce — more fluid)
        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;

        // Pulse alpha
        node.pulsePhase += 0.012;
        node.alpha = 0.35 + Math.sin(node.pulsePhase) * 0.25;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_RADIUS) {
            const t = 1 - dist / CONNECTION_RADIUS;
            // Stronger connection near cursor
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mdx = midX - mx;
            const mdy = midY - my;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            const boostFactor = mDist < MOUSE_RADIUS ? 1 + (1 - mDist / MOUSE_RADIUS) * 1.2 : 1;

            const opacity = t * t * 0.4 * boostFactor;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(0,229,255,${Math.min(opacity, 0.75)})`;
            ctx!.lineWidth = t * 0.9;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes with glow
      for (const node of nodes) {
        // Outer soft glow
        const glowR = node.radius * 5;
        const grd = ctx!.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowR
        );
        grd.addColorStop(0, `rgba(0,229,255,${node.alpha * 0.45})`);
        grd.addColorStop(0.5, `rgba(0,229,255,${node.alpha * 0.1})`);
        grd.addColorStop(1, 'rgba(0,229,255,0)');
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx!.fillStyle = grd;
        ctx!.fill();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,229,255,${node.alpha})`;
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    spawnNodes();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
