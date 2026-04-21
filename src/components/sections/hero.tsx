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
  const sectionRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // ── Reduced motion: reveal everything instantly ──────────────────────
      if (prefersReducedMotion) {
        gsap.set(
          [
            '.hero-eyebrow',
            '.hero-line1',
            '.hero-line2',
            '.hero-sub',
            '.hero-cta-1',
            '.hero-cta-2',
            '.hero-microcopy',
            '.hero-demo',
          ],
          { autoAlpha: 1, y: 0, clipPath: 'none', scale: 1 }
        );
        return;
      }

      // ── 1. Cinematic entry timeline ──────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Badge — slides in from above
      tl.fromTo(
        '.hero-eyebrow',
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.2
      );

      // Headline line 1 — clip-path left → right reveal
      tl.fromTo(
        '.hero-line1',
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75 },
        0.4
      );

      // Headline line 2 — same, offset +0.2s
      tl.fromTo(
        '.hero-line2',
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75 },
        0.6
      );

      // Subheadline — fades up from 30px below
      tl.fromTo(
        '.hero-sub',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        0.8
      );

      // CTA 1 — fade up
      tl.fromTo(
        '.hero-cta-1',
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        1.0
      );

      // CTA 2 — stagger 0.15s after CTA 1
      tl.fromTo(
        '.hero-cta-2',
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        1.15
      );

      // Microcopy — simple fade
      tl.fromTo(
        '.hero-microcopy',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        1.3
      );

      // Demo panel — fades in with subtle scale
      tl.fromTo(
        '.hero-demo',
        { autoAlpha: 0, scale: 0.97, y: 10 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.85 },
        0.7
      );

      // ── 2. Floating animation on demo panel ──────────────────────────────
      const demo = demoRef.current;
      if (!demo) return;

      gsap.set(demo, { transformPerspective: 1000 });

      // Float: -8px ↔ +8px, 4s ease-in-out, infinite loop
      gsap.to(demo, {
        y: -8,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });

      // Glow pulse on border
      gsap.fromTo(
        demo,
        { boxShadow: '0 0 0 1px rgba(0,229,255,0.15), 0 8px 32px rgba(0,229,255,0.06)' },
        {
          boxShadow: '0 0 0 1px rgba(0,229,255,0.55), 0 0 40px 8px rgba(0,229,255,0.22)',
          duration: 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.8,
        }
      );

      // ── 3. Mouse tilt (max 8° X and Y) ───────────────────────────────────
      const xTo = gsap.quickTo(demo, 'rotationY', { duration: 0.6, ease: 'power2.out' });
      const yTo = gsap.quickTo(demo, 'rotationX', { duration: 0.6, ease: 'power2.out' });

      const section = sectionRef.current;
      if (!section) return;

      const onMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 → 1
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 → 1
        xTo(nx * 8);
        yTo(-ny * 8);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      section.addEventListener('mousemove', onMouseMove, { passive: true });
      section.addEventListener('mouseleave', onMouseLeave);

      return () => {
        section.removeEventListener('mousemove', onMouseMove);
        section.removeEventListener('mouseleave', onMouseLeave);
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Neural network canvas */}
      <HeroCanvas />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-aura pointer-events-none" aria-hidden="true" />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, transparent 35%, rgba(9,9,11,0.75) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Page content */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 py-32 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ─────────────────────────────────────────────── */}
          <div>
            {/* Badge */}
            <div className="hero-eyebrow mb-6" style={{ visibility: 'hidden' }}>
              <Eyebrow>Enterprise AI integration platform</Eyebrow>
            </div>

            {/* Headline — each line is independently animated */}
            <h1 className="text-display mb-6">
              <span
                className="hero-line1 block overflow-hidden"
                style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              >
                Your team is ready for AI.
              </span>
              <span
                className="hero-line2 block overflow-hidden mt-1"
                style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              >
                Your stack just needs the{' '}
                <span className="text-gradient-cyan">right bridge.</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="hero-sub text-body-lg text-zinc-400 mb-8 max-w-md"
              style={{ visibility: 'hidden' }}
            >
              AURA AI connects your existing tools to any LLM in under 30 minutes. Visual
              workflow builder. Industry templates. Enterprise compliance. No ML team required.
            </p>

            {/* CTAs — individual spans so GSAP can stagger them */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <span className="hero-cta-1 inline-flex" style={{ visibility: 'hidden' }}>
                <Button variant="primary" size="lg">
                  Start free
                </Button>
              </span>
              <span className="hero-cta-2 inline-flex" style={{ visibility: 'hidden' }}>
                <Button variant="secondary" size="lg">
                  See it in action
                </Button>
              </span>
            </div>

            {/* Microcopy */}
            <p
              className="hero-microcopy text-small text-zinc-500"
              style={{ visibility: 'hidden' }}
            >
              Free tier available. No credit card. Setup in minutes.
            </p>
          </div>

          {/* ── Right: floating demo panel ─────────────────────────────── */}
          <div
            className="hero-demo"
            style={{ visibility: 'hidden', willChange: 'transform' }}
          >
            {/* demoRef is the tilt + float target — separate from hero-demo (entry animation) */}
            <div
              ref={demoRef}
              style={{ willChange: 'transform', borderRadius: '12px' }}
            >
              <TypewriterDemo />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
