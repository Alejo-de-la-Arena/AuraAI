'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const bar = barRef.current;
    if (!bar) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => st.kill();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, #00E5FF 0%, #00FF88 100%)',
        transform: 'scaleX(0)',
      }}
      aria-hidden="true"
    />
  );
}
