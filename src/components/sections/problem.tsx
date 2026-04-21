'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Clock, Users, ShieldX, Puzzle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PAIN_POINTS = [
  {
    icon: Clock,
    headline: 'Months, not days',
    description:
      "The average enterprise AI project takes 4\u20136 months before a single workflow runs in production. That's assuming you already have the ML team to build it.",
    dataPoint: '67% of AI initiatives stall before deployment \u2014 Gartner, 2025',
  },
  {
    icon: Users,
    headline: "Skills you don't have yet",
    description:
      "Hiring a senior ML engineer costs $180K+ and takes 3\u20134 months to source. Most mid-market companies can't justify that for a first integration.",
    dataPoint: '1 in 3 companies cite lack of ML expertise as the #1 blocker',
  },
  {
    icon: ShieldX,
    headline: 'Compliance is a blocker, not a feature',
    description:
      "AWS Bedrock has the power. But configuring IAM, VPCs, and data residency policies for a 50-person ops team isn't a weekend project.",
    dataPoint: '52% of stalled AI projects cite compliance and security concerns',
  },
  {
    icon: Puzzle,
    headline: "Tools that don't talk to each other",
    description:
      'Your CRM, your helpdesk, your ERP \u2014 none of them were designed for LLM integration. Connecting them means custom code, custom maintenance, and custom failure modes.',
    dataPoint: 'The average mid-market company uses 73 SaaS tools. Almost none have native AI',
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      ScrollTrigger.batch('.problem-card', {
        start: 'top 85%',
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.08,
          });
        },
        once: true,
      });

      gsap.from('.problem-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.problem-header',
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from('.problem-bridge', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.problem-bridge',
          start: 'top 90%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="problem" className="py-24 lg:py-32 bg-aura-950">
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="problem-header text-center mb-16">
          <Eyebrow className="mb-4">The gap</Eyebrow>
          <h2 className="text-h1 text-zinc-50 mt-6 mb-4">
            You know AI can help.
            <br />
            You just can't implement it.
          </h2>
          <p className="text-body-lg text-zinc-400 max-w-2xl mx-auto">
            Most companies aren't behind on AI because they don't want it. They're behind because
            the path from idea to production is broken.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PAIN_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.headline}
                className="problem-card bg-aura-800 rounded-xl p-6 border border-aura-700"
                style={prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(30px)' }}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-cyan-aura/10 border border-cyan-aura/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-cyan-aura" />
                </div>

                <h3 className="text-h3 text-zinc-50 mb-2">{point.headline}</h3>
                <p className="text-body text-zinc-400 mb-4">{point.description}</p>

                <div className="border-t border-aura-700 pt-4">
                  <p className="text-small text-zinc-500 italic">{point.dataPoint}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bridge text */}
        <p className="problem-bridge text-center text-body-lg text-zinc-300 font-medium max-w-2xl mx-auto">
          AURA AI closes that gap. Without building a new team to do it.
        </p>
      </div>
    </section>
  );
}
