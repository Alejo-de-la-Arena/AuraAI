'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  GitBranch,
  LayoutTemplate,
  BarChart3,
  ShieldCheck,
  Users2,
} from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FEATURES = [
  {
    name: 'API Playground',
    icon: FlaskConical,
    headline: 'Test any LLM before you commit.',
    description:
      'Experiment with GPT-4o, Claude, Gemini, and Llama 3 side by side. Compare outputs, costs, and latency on your actual data before wiring anything to production.',
  },
  {
    name: 'Workflow Builder',
    icon: GitBranch,
    headline: 'Build without engineering sprints.',
    description:
      'Visual, node-based editor. Connect data sources, AI steps, conditional logic, and output destinations. If you can draw a flowchart, you can build an AURA workflow.',
  },
  {
    name: 'Industry Templates',
    icon: LayoutTemplate,
    headline: 'Start from 200+ battle-tested templates.',
    description:
      'Pre-built workflows for finance, healthcare, logistics, customer success, HR, and legal. Each template was built from real customer implementations \u2014 not marketing demos.',
  },
  {
    name: 'Usage Analytics',
    icon: BarChart3,
    headline: 'See exactly what your AI is doing.',
    description:
      'Per-workflow usage, cost breakdown by model, latency percentiles, and error rates. Know which automations drive value and which ones need tuning.',
  },
  {
    name: 'Security & Compliance',
    icon: ShieldCheck,
    headline: 'Enterprise-ready from day one.',
    description:
      'SOC 2 Type II certified. SSO with Okta, Google, and SAML. Data never used for model training. EU and US data residency. Audit logs with 90-day retention.',
  },
  {
    name: 'Team Collaboration',
    icon: Users2,
    headline: 'AI workflows your whole team can own.',
    description:
      'Role-based access control, version history on every workflow, inline comments, and live collaboration. When the ops manager makes a change, the whole team sees it.',
  },
];

interface FeatureCardProps {
  feature: (typeof FEATURES)[0];
  prefersReducedMotion: boolean;
}

function FeatureCard({ feature, prefersReducedMotion }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = feature.icon;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      gsap.to(card, {
        rotateY: dx * 6,
        rotateX: -dy * 6,
        y: -4,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: 0.5, ease: 'expo.out' });
  }, [prefersReducedMotion]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-aura-800 rounded-xl p-6 border border-aura-700 cursor-default h-full"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              borderColor: 'rgba(0,229,255,0.2)',
              backgroundColor: '#131316',
              boxShadow: '0 0 0 1px rgba(0,229,255,0.15), 0 8px 32px rgba(0,229,255,0.08)',
            }
      }
      transition={{ duration: 0.3 }}
    >
      <div className="w-11 h-11 rounded-xl bg-cyan-aura/[0.08] border border-cyan-aura/15 flex items-center justify-center mb-4">
        <Icon size={18} className="text-cyan-aura" />
      </div>
      <p className="text-eyebrow text-zinc-500 mb-2">{feature.name}</p>
      <h3 className="text-h3 text-zinc-50 mb-2">{feature.headline}</h3>
      <p className="text-body text-zinc-400 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.features-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.features-header',
          start: 'top 85%',
          once: true,
        },
      });

      // Batch targets .feature-card-wrapper (the outer div with opacity:0)
      // and uses gsap.to() to reveal them
      ScrollTrigger.batch('.feature-card-wrapper', {
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="features" className="py-24 lg:py-32 bg-aura-950">
      <div className="max-w-container mx-auto px-6">
        <div className="features-header text-center mb-16">
          <Eyebrow className="mb-4">What&apos;s included</Eyebrow>
          <h2 className="text-h1 text-zinc-50 mt-6 mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-body-lg text-zinc-400 max-w-2xl mx-auto">
            Six integrated capabilities &mdash; each designed to reduce the time between idea and
            working workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            // feature-card-wrapper is the GSAP target — it holds the opacity:0
            <div
              key={feature.name}
              className="feature-card-wrapper"
              style={prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(30px)' }}
            >
              <FeatureCard feature={feature} prefersReducedMotion={prefersReducedMotion} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
