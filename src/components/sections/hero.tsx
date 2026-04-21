'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { HeroCanvas } from './hero-canvas';
import { TypewriterDemo } from './typewriter-demo';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ['.hero-eyebrow', '.hero-line1', '.hero-line2', '.hero-sub', '.hero-buttons', '.hero-demo'],
          { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Eyebrow
      tl.from('.hero-eyebrow', { opacity: 0, y: 10, duration: 0.6 }, 0);

      // Headline lines — clip path reveal
      tl.fromTo(
        '.hero-line1',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7 },
        0.15
      );
      tl.fromTo(
        '.hero-line2',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7 },
        0.3
      );

      // Subheadline
      tl.from('.hero-sub', { opacity: 0, y: 20, duration: 0.7 }, 0.45);

      // Buttons
      tl.from('.hero-buttons', { opacity: 0, y: 10, duration: 0.6 }, 0.55);

      // Typewriter demo
      tl.from('.hero-demo', { opacity: 0, scale: 0.98, duration: 0.7 }, 0.7);
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Canvas background */}
      <HeroCanvas />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-aura pointer-events-none" aria-hidden="true" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(9,9,11,0.7) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 py-32 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div>
            <div className="hero-eyebrow mb-6">
              <Eyebrow>Enterprise AI integration platform</Eyebrow>
            </div>

            <h1 className="text-display mb-6">
              <span className="hero-line1 block overflow-hidden">
                <span className="block">Your team is ready for AI.</span>
              </span>
              <span className="hero-line2 block overflow-hidden mt-1">
                <span className="block">
                  Your stack just needs the{' '}
                  <span className="text-gradient-cyan">right bridge.</span>
                </span>
              </span>
            </h1>

            <p className="hero-sub text-body-lg text-zinc-400 mb-8 max-w-md">
              AURA AI connects your existing tools to any LLM in under 30 minutes.
              Visual workflow builder. Industry templates. Enterprise compliance.
              No ML team required.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-6">
              <Button variant="primary" size="lg">
                Start free
              </Button>
              <Button variant="secondary" size="lg">
                See it in action
              </Button>
            </div>

            <p className="text-small text-zinc-500">
              Free tier available. No credit card. Setup in minutes.
            </p>
          </div>

          {/* Right — demo */}
          <div className="hero-demo">
            <TypewriterDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
