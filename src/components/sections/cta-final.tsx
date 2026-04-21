'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CtaFinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.cta-content', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 lg:py-40 text-center relative overflow-hidden bg-aura-950"
    >
      {/* Mesh background */}
      <div className="absolute inset-0 bg-mesh-cyan pointer-events-none" aria-hidden="true" />

      {/* Glow orb behind CTA */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-[400px] h-[200px] rounded-full blur-3xl pointer-events-none animate-glow-pulse"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="cta-content relative z-10 max-w-container mx-auto px-6">
        <h2 className="text-h1 lg:text-display text-zinc-50 max-w-3xl mx-auto mb-6 leading-tight">
          Your team doesn't need an ML engineer.
          <br />
          They need{' '}
          <span className="text-gradient-cyan">the right tool.</span>
        </h2>

        <p className="text-body-lg text-zinc-400 max-w-xl mx-auto mb-10">
          AURA AI gets your first workflow live in under 30 minutes. Start free — no credit card,
          no setup call.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center">
          <Button variant="primary" size="lg">
            Get started free
          </Button>
        </div>

        <p className="text-small text-zinc-500 mt-4">
          Free tier available forever. Upgrade when you need more.
        </p>
      </div>
    </section>
  );
}
