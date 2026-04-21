'use client';

import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: '$0',
    annualPrice: '$0',
    unit: '/month',
    annualNote: null,
    positioning: 'For individuals and small teams exploring AI automation.',
    features: [
      'Up to 3 active workflows',
      '500 AI operations / month',
      '10 native connectors',
      'Community templates (50+)',
      'API Playground access',
      'Email support',
    ],
    cta: 'Start free',
    ctaVariant: 'secondary' as const,
    recommended: false,
    badge: null,
    revealFrom: { x: -40, opacity: 0, scale: 1 },
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: '$99',
    annualPrice: '$79',
    unit: '/month',
    annualNote: 'billed $948 / year',
    positioning: 'For teams that need full automation power and collaboration.',
    features: [
      'Unlimited active workflows',
      '25,000 AI operations / month',
      '60+ native connectors',
      'All 200+ industry templates',
      'Usage analytics dashboard',
      'Team collaboration (up to 15 seats)',
      'Role-based access control',
      'Priority support (< 4h response)',
    ],
    cta: 'Start 14-day trial',
    ctaVariant: 'primary' as const,
    recommended: true,
    badge: 'Most popular',
    revealFrom: { x: 0, opacity: 0, scale: 0.9 },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    unit: '',
    annualNote: null,
    positioning: 'For organizations that need compliance, scale, and dedicated support.',
    features: [
      'Everything in Growth',
      'Unlimited AI operations',
      'SSO (Okta, SAML, Google Workspace)',
      'SOC 2 Type II + EU data residency',
      'Audit logs — 90 days retained',
      'Custom SLA (99.9% uptime)',
      'Dedicated customer success manager',
      'Custom integrations and templates',
    ],
    cta: 'Talk to us',
    ctaVariant: 'secondary' as const,
    recommended: false,
    badge: null,
    revealFrom: { x: 40, opacity: 0, scale: 1 },
  },
];

function PricingCard({
  plan,
  billing,
  prefersReducedMotion,
}: {
  plan: (typeof PLANS)[0];
  billing: 'monthly' | 'annual';
  prefersReducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEnterprise = plan.id === 'enterprise';

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion) return;
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: plan.recommended
        ? '0 0 0 1px rgba(0,229,255,0.45), 0 24px 64px rgba(0,229,255,0.18)'
        : '0 0 0 1px rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.6)',
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [plan.recommended, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: plan.recommended
        ? '0 0 0 1px rgba(0,229,255,0.35), 0 16px 48px rgba(0,229,255,0.1)'
        : '0 0 0 0px transparent, 0 0px 0px transparent',
      duration: 0.5,
      ease: 'expo.out',
    });
  }, [plan.recommended, prefersReducedMotion]);

  const price = billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative bg-aura-800 rounded-2xl p-8 border h-full flex flex-col',
        plan.recommended
          ? 'border-cyan-aura/35 shadow-[0_0_0_1px_rgba(0,229,255,0.15),_0_16px_48px_rgba(0,229,255,0.1)]'
          : isEnterprise
          ? 'border-violet-aura/20'
          : 'border-aura-700'
      )}
      style={{ willChange: 'transform, box-shadow' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Badge */}
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-aura text-aura-950 text-small font-semibold px-3 py-1 rounded-full whitespace-nowrap">
          {plan.badge}
        </span>
      )}

      {/* Name */}
      <p className="text-body font-semibold text-zinc-50 mb-2">{plan.name}</p>

      {/* Price */}
      <div className="flex items-end gap-1 mb-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={`${plan.id}-${billing}`}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-[3rem] font-bold text-zinc-50 leading-none"
          >
            {price}
          </motion.span>
        </AnimatePresence>
        {plan.unit && <span className="text-body text-zinc-500 mb-1">{plan.unit}</span>}
      </div>

      {/* Annual note */}
      <div className="h-5 mb-4">
        {billing === 'annual' && plan.annualNote && (
          <p className="text-small text-zinc-500">{plan.annualNote}</p>
        )}
      </div>

      {/* Positioning */}
      <p className="text-small text-zinc-400 mb-6">{plan.positioning}</p>

      {/* Divider */}
      <div className="border-t border-aura-700 mb-6" />

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={16} className="text-cyan-aura flex-shrink-0 mt-0.5" />
            <span className="text-small text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        <Button variant={plan.ctaVariant} size="md" className="w-full">
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.pricing-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.pricing-header',
          start: 'top 85%',
          once: true,
        },
      });

      // Directional reveal per card
      ScrollTrigger.create({
        trigger: '.pricing-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          PLANS.forEach((plan, i) => {
            const el = cardWrapperRefs.current[i];
            if (!el) return;
            gsap.fromTo(
              el,
              { opacity: 0, x: plan.revealFrom.x, scale: plan.revealFrom.scale },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.75,
                ease: 'expo.out',
                delay: i * 0.1,
              }
            );
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="pricing" className="py-24 lg:py-32 bg-aura-950">
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="pricing-header text-center mb-12">
          <Eyebrow className="mb-4">Pricing</Eyebrow>
          <h2 className="text-h1 text-zinc-50 mt-6 mb-4">Transparent pricing. No surprises.</h2>
          <p className="text-body-lg text-zinc-400 max-w-xl mx-auto">
            Start free. Scale when you&apos;re ready. Monthly or annual — switch any time.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="relative inline-flex bg-aura-800 border border-aura-700 rounded-full p-1">
            <motion.div
              layout
              layoutId="billing-pill"
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                'absolute top-1 bottom-1 rounded-full bg-cyan-aura/15 border border-cyan-aura/30',
                billing === 'monthly' ? 'left-1' : 'left-[calc(50%)]'
              )}
              style={{ width: 'calc(50% - 4px)' }}
            />

            <button
              onClick={() => setBilling('monthly')}
              className={cn(
                'relative z-10 text-small px-5 py-1.5 rounded-full transition-colors duration-150',
                billing === 'monthly' ? 'text-zinc-50' : 'text-zinc-400'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={cn(
                'relative z-10 text-small px-5 py-1.5 rounded-full transition-colors duration-150',
                billing === 'annual' ? 'text-zinc-50' : 'text-zinc-400'
              )}
            >
              Annual (-20%)
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              ref={(el) => { cardWrapperRefs.current[i] = el; }}
              style={
                prefersReducedMotion
                  ? {}
                  : { opacity: 0, transform: `translateX(${plan.revealFrom.x}px) scale(${plan.revealFrom.scale})` }
              }
            >
              <PricingCard
                plan={plan}
                billing={billing}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
