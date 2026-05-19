'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HEADLINE_WORDS_L1 = ['Your', 'team', "doesn't", 'need', 'an', 'ML', 'engineer.'];
const HEADLINE_WORDS_L2_PLAIN = ['They', 'need'];
const HEADLINE_WORDS_L2_GRADIENT = ['the', 'right', 'tool.'];

export function CtaFinalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const shimmerTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const prefersReducedMotion = useReducedMotion();

  // Shimmer loop — every 3 seconds
  useEffect(() => {
    if (prefersReducedMotion) return;
    const shimmer = shimmerRef.current;
    if (!shimmer) return;

    function runShimmer() {
      gsap.fromTo(
        shimmer,
        { x: '-100%' },
        {
          x: '300%',
          duration: 0.8,
          ease: 'power1.inOut',
          onComplete: () => {
            shimmerTimerRef.current = setTimeout(runShimmer, 3000);
          },
        }
      );
    }

    shimmerTimerRef.current = setTimeout(runShimmer, 2000);

    return () => {
      clearTimeout(shimmerTimerRef.current);
      gsap.killTweensOf(shimmer);
    };
  }, [prefersReducedMotion]);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('.cta-word', { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
        return;
      }

      ScrollTrigger.create({
        trigger: '.cta-headline',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to('.cta-word', {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.55,
            ease: 'expo.out',
            stagger: 0.08,
          });

          gsap.to('.cta-sub', {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            delay: 0.5,
          });

          gsap.to('.cta-actions', {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'expo.out',
            delay: 0.7,
          });
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
      {/* Mesh background — more intense */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.09) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(0,255,136,0.06) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Glow orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[280px] rounded-full blur-3xl pointer-events-none animate-glow-pulse"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,229,255,0.16) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-container mx-auto px-6">
        {/* Word-split headline */}
        <h2 className="cta-headline text-h1 lg:text-display text-zinc-50 max-w-3xl mx-auto mb-6 leading-tight">
          {/* Line 1 */}
          <span className="block">
            {HEADLINE_WORDS_L1.map((word, i) => (
              <span
                key={i}
                className="cta-word inline-block mr-[0.25em]"
                style={
                  prefersReducedMotion
                    ? {}
                    : {
                        clipPath: 'inset(0% 0% 100% 0%)',
                        opacity: 0,
                      }
                }
              >
                {word}
              </span>
            ))}
          </span>

          {/* Line 2 */}
          <span className="block mt-1">
            {HEADLINE_WORDS_L2_PLAIN.map((word, i) => (
              <span
                key={i}
                className="cta-word inline-block mr-[0.25em]"
                style={
                  prefersReducedMotion
                    ? {}
                    : {
                        clipPath: 'inset(0% 0% 100% 0%)',
                        opacity: 0,
                      }
                }
              >
                {word}
              </span>
            ))}
            {/* El gradiente se aplica DIRECTAMENTE a cada palabra: los
                spans inline-block no heredan el background-clip del padre,
                por eso "the right tool." quedaba invisible. */}
            {HEADLINE_WORDS_L2_GRADIENT.map((word, i) => (
              <span
                key={i}
                className="cta-word inline-block mr-[0.25em]"
                style={{
                  background: 'linear-gradient(135deg, #00E5FF 0%, #00FF88 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  ...(prefersReducedMotion
                    ? {}
                    : {
                        clipPath: 'inset(0% 0% 100% 0%)',
                        opacity: 0,
                      }),
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h2>

        <p
          className="cta-sub text-body-lg text-zinc-400 max-w-xl mx-auto mb-10"
          style={prefersReducedMotion ? {} : { visibility: 'hidden', transform: 'translateY(20px)' }}
        >
          AURA AI gets your first workflow live in under 30 minutes. Start free — no credit card,
          no setup call.
        </p>

        <div
          className="cta-actions flex flex-col sm:flex-row items-center justify-center"
          style={prefersReducedMotion ? {} : { visibility: 'hidden', transform: 'translateY(20px)' }}
        >
          {/* Shimmer button wrapper */}
          <div className="relative overflow-hidden rounded-xl inline-block">
            <button
              className="relative z-10 inline-flex items-center justify-center px-8 py-4 text-body font-semibold text-aura-950 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #00E5FF 0%, #00FF88 100%)',
                fontSize: '1.0625rem',
              }}
            >
              Get started free
            </button>
            {/* Shimmer sweep */}
            <div
              ref={shimmerRef}
              className="absolute inset-y-0 w-16 pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                transform: 'translateX(-100%)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        <p
          className="text-small text-zinc-500 mt-4"
          style={prefersReducedMotion ? {} : { opacity: 0.7 }}
        >
          Free tier available forever. Upgrade when you need more.
        </p>
      </div>
    </section>
  );
}
