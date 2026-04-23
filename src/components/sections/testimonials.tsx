'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Quote, Star } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TESTIMONIALS = [
  {
    quote:
      'We automated our entire support ticket triage in 11 days. Our team went from spending 6 hours a day on routing to 45 minutes. AURA just works — and it works with the tools we already have.',
    name: 'Sarah Chen',
    title: 'Head of Customer Operations',
    company: 'Meridian Financial',
    initials: 'SC',
    roleLabel: 'Customer Ops',
  },
  {
    quote:
      "I was skeptical. We've tried three AI tools that promised simplicity and delivered consultant invoices. AURA was live in our logistics workflow in under two weeks. No outside help.",
    name: 'Marcus Okonkwo',
    title: 'VP of Operations',
    company: 'Brightpath Logistics',
    initials: 'MO',
    roleLabel: 'Operations',
  },
  {
    quote:
      "The compliance piece was what sold our legal team. SOC 2, EU data residency, audit logs — everything they asked for was already in the platform. We didn't have to negotiate it.",
    name: 'Elena Vasquez',
    title: 'CTO',
    company: 'Cordova Health',
    initials: 'EV',
    roleLabel: 'Technology',
  },
];

const LOGOS = [
  'Meridian Financial',
  'Brightpath Logistics',
  'Cordova Health',
  'Harven Group',
  'Stellarpoint',
  'Vantage Ops',
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.testimonials-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.testimonials-header',
          start: 'top 85%',
          once: true,
        },
      });

      ScrollTrigger.batch('.testimonial-card', {
        start: 'top 85%',
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.15,
          });
        },
        once: true,
      });

      // Infinite logo scroll
      const track = trackRef.current;
      if (!track) return;

      scrollTweenRef.current = gsap.to(track, {
        x: '-50%',
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: sectionRef }
  );

  const pauseScroll = () => scrollTweenRef.current?.pause();
  const resumeScroll = () => scrollTweenRef.current?.resume();

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-aura-950 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 15%, rgba(0,229,255,0.09) 0%, transparent 45%), radial-gradient(ellipse at 80% 30%, rgba(124,92,255,0.08) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <Eyebrow className="mb-4">Customer stories</Eyebrow>
          <h2 className="text-h1 text-zinc-50 mt-6">What teams say after the first quarter.</h2>
          <p className="text-body-lg text-zinc-400 max-w-2xl mx-auto mt-4">
            Teams adopt faster when the product is clear, compliant, and grounded in real workflows.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card relative h-full"
              style={prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(30px)' }}
            >
              <div
                className="rounded-2xl p-7 border h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    i === 1
                      ? 'linear-gradient(180deg, rgba(19,19,22,0.96) 0%, rgba(13,13,16,0.96) 100%)'
                      : 'linear-gradient(180deg, rgba(17,17,19,0.94) 0%, rgba(13,13,16,0.94) 100%)',
                  borderColor: i === 1 ? 'rgba(0,229,255,0.35)' : 'rgba(63,63,70,0.7)',
                  boxShadow:
                    i === 1
                      ? '0 0 0 1px rgba(0,229,255,0.18), 0 20px 50px rgba(0,229,255,0.12)'
                      : '0 12px 36px rgba(0,0,0,0.45)',
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-1.5" aria-label="Five star rating">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={13} className="text-cyan-aura fill-cyan-aura/80" />
                    ))}
                  </div>
                  <Quote size={18} className="text-cyan-aura/70" aria-hidden="true" />
                </div>

                <blockquote className="text-body-lg text-zinc-100 italic leading-relaxed flex-1 mb-7 relative">
                  &ldquo;{t.quote}&rdquo;
                  <span
                    className="absolute bottom-0 left-0 h-px w-full origin-left"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0,229,255,0.55), transparent)',
                    }}
                    aria-hidden="true"
                  />
                </blockquote>

                <div className="border-t border-aura-700/80 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-cyan-aura/40 bg-cyan-aura/10 text-cyan-aura text-small font-semibold flex items-center justify-center">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-small font-semibold text-zinc-50">{t.name}</p>
                    <p className="text-small text-zinc-500">
                      {t.roleLabel} · {t.title}
                    </p>
                    <p className="text-small text-zinc-500">{t.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite logo scroll — full bleed */}
      <div className="border-t border-aura-700 pt-12">
        <p className="text-small text-zinc-500 text-center mb-8 uppercase tracking-widest px-6">
          Trusted by teams at
        </p>
        <div
          className="overflow-hidden relative"
          onMouseEnter={prefersReducedMotion ? undefined : pauseScroll}
          onMouseLeave={prefersReducedMotion ? undefined : resumeScroll}
        >
          <div
            className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #09090B 0%, transparent 100%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, #09090B 0%, transparent 100%)' }}
            aria-hidden="true"
          />
          <div
            ref={trackRef}
            className="flex items-center gap-6 lg:gap-8"
            style={{ width: 'max-content' }}
          >
            {/* Original + duplicate for seamless loop */}
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="text-small lg:text-body font-semibold text-zinc-500 hover:text-zinc-300 transition-colors duration-150 cursor-default whitespace-nowrap px-4 py-2 rounded-full border border-aura-700 bg-aura-800/65"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
