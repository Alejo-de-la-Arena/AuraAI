'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plug, Settings2, Rocket } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    number: '01',
    name: 'Connect',
    icon: Plug,
    headline: 'Plug in your existing stack.',
    description:
      'Connect your CRM, helpdesk, data warehouse, or any tool with an API. AURA has native connectors for 60+ platforms including Salesforce, HubSpot, Zendesk, Snowflake, and Slack. Custom connectors take under an hour.',
    microDemoLabel: '60+ native connectors',
  },
  {
    number: '02',
    name: 'Configure',
    icon: Settings2,
    headline: 'Build your workflow without code.',
    description:
      'Use the visual workflow builder to define what data goes in, what the AI does with it, and where the output lands. Choose from 200+ industry templates or start from scratch. Every step is auditable.',
    microDemoLabel: 'Visual drag-and-drop editor',
  },
  {
    number: '03',
    name: 'Deploy',
    icon: Rocket,
    headline: 'Push to production. Monitor in real time.',
    description:
      'One click deploys your workflow to a managed, scalable infrastructure. Track performance, usage, and costs from the analytics dashboard. Set alerts for anything that matters.',
    microDemoLabel: 'Real-time analytics dashboard',
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.hiw-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.hiw-header',
          start: 'top 85%',
          once: true,
        },
      });

      // Use gsap.to() so elements animate FROM inline opacity:0 TO opacity:1
      ScrollTrigger.create({
        trigger: '.hiw-steps',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to('.hiw-step', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.1,
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 lg:py-32"
      style={{ background: 'rgba(13,13,16,0.5)' }}
    >
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="hiw-header text-center mb-16">
          <Eyebrow className="mb-4">The process</Eyebrow>
          <h2 className="text-h1 text-zinc-50 mt-6 mb-4">
            From zero to production in three steps.
          </h2>
          <p className="text-body-lg text-zinc-400 max-w-2xl mx-auto">
            No consultants. No months-long implementations. Just a clear path from your existing
            tools to working AI workflows.
          </p>
        </div>

        {/* Steps */}
        <div className="hiw-steps relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-[64px] left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] border-t-2 border-dashed border-aura-600 pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="hiw-step relative"
                  style={prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(30px)' }}
                >
                  {/* Mobile vertical connector */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="lg:hidden absolute left-6 top-[128px] bottom-[-2rem] w-0.5 border-l-2 border-dashed border-aura-600"
                      aria-hidden="true"
                    />
                  )}

                  <p
                    className="text-[4rem] font-bold leading-none mb-4 select-none"
                    style={{ color: '#27272A' }}
                  >
                    {step.number}
                  </p>

                  <div className="w-12 h-12 rounded-xl bg-cyan-aura/10 border border-cyan-aura/20 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-cyan-aura" />
                  </div>

                  <p className="text-eyebrow text-cyan-aura mb-2">{step.name}</p>
                  <h3 className="text-h3 text-zinc-50 mb-3">{step.headline}</h3>
                  <p className="text-body text-zinc-400 mb-4">{step.description}</p>

                  <span className="inline-flex items-center bg-aura-700 border border-aura-600 rounded-full px-3 py-1 text-small text-zinc-300">
                    {step.microDemoLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
