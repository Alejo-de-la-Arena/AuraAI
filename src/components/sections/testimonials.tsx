'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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
  },
  {
    quote:
      "I was skeptical. We've tried three AI tools that promised simplicity and delivered consultant invoices. AURA was live in our logistics workflow in under two weeks. No outside help.",
    name: 'Marcus Okonkwo',
    title: 'VP of Operations',
    company: 'Brightpath Logistics',
  },
  {
    quote:
      "The compliance piece was what sold our legal team. SOC 2, EU data residency, audit logs — everything they asked for was already in the platform. We didn't have to negotiate it.",
    name: 'Elena Vasquez',
    title: 'CTO',
    company: 'Cordova Health',
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
            stagger: 0.1,
          });
        },
        once: true,
      });

      gsap.from('.logos-section', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.logos-section',
          start: 'top 90%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-aura-950">
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <Eyebrow className="mb-4">Customer stories</Eyebrow>
          <h2 className="text-h1 text-zinc-50 mt-6">
            What teams say after the first quarter.
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="testimonial-card relative"
              style={prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(30px)' }}
            >
              {/* Left border accent */}
              <div
                className="rounded-xl p-7 border border-aura-700 h-full flex flex-col"
                style={{
                  background: '#111113',
                  borderLeft: '4px solid rgba(0, 229, 255, 0.5)',
                  borderRadius: '0 14px 14px 0',
                }}
              >
                <blockquote className="text-body-lg text-zinc-100 italic leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </blockquote>

                <div className="border-t border-aura-700 pt-4">
                  <p className="text-small font-semibold text-zinc-50">{t.name}</p>
                  <p className="text-small text-zinc-500">
                    {t.title} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos section */}
        <div className="logos-section border-t border-aura-700 pt-12">
          <p className="text-small text-zinc-500 text-center mb-8 uppercase tracking-widest">
            Trusted by teams at
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 lg:gap-12">
            {LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-body font-semibold text-zinc-600 hover:text-zinc-400 transition-colors duration-150 cursor-default"
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
