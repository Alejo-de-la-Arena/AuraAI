'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const METRICS = [
  {
    number: '73%',
    label: 'Reduction in manual processing',
    context: 'Avg. across all customers, Q4 2025',
    countTarget: 73,
    prefix: '',
    suffix: '%',
    decimals: 0,
  },
  {
    number: '4.2x',
    label: 'Faster workflow deployment',
    context: 'Compared to custom ML implementation',
    countTarget: 4.2,
    prefix: '',
    suffix: 'x',
    decimals: 1,
  },
  {
    number: '< 30 min',
    label: 'Time to first integration',
    context: 'Median across Starter and Growth customers',
    countTarget: 30,
    prefix: '< ',
    suffix: ' min',
    decimals: 0,
  },
  {
    number: '200+',
    label: 'Industry templates',
    context: 'Finance, healthcare, logistics, HR, legal & more',
    countTarget: 200,
    prefix: '',
    suffix: '+',
    decimals: 0,
  },
];

interface MetricCardProps {
  metric: (typeof METRICS)[0];
  prefersReducedMotion: boolean;
  shouldCount: boolean;
}

function MetricCard({ metric, prefersReducedMotion, shouldCount }: MetricCardProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const hasCountedRef = useRef(false);

  useEffect(() => {
    if (!shouldCount || hasCountedRef.current || prefersReducedMotion) return;
    hasCountedRef.current = true;

    const el = numRef.current;
    if (!el) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: metric.countTarget,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = metric.prefix + obj.val.toFixed(metric.decimals) + metric.suffix;
      },
      onComplete: () => {
        el.textContent = metric.number;
      },
    });
  }, [shouldCount, prefersReducedMotion, metric]);

  return (
    <div className="bg-aura-800 border border-aura-700 rounded-xl p-6 sm:p-7 text-center h-[220px] sm:h-[240px] flex flex-col justify-between">
      <div className="h-[76px] sm:h-[88px] flex items-center justify-center">
        <p
          className="text-gradient-cyan font-bold leading-none tabular-nums whitespace-nowrap"
          style={{ fontSize: 'clamp(2.25rem, 3.25vw, 3.25rem)' }}
        >
          <span ref={numRef}>{metric.number}</span>
        </p>
      </div>
      <div className="h-[58px] flex items-center justify-center">
        <p className="text-body font-semibold text-zinc-50">{metric.label}</p>
      </div>
      <div className="h-[42px] flex items-center justify-center">
        <p className="text-small text-zinc-500">{metric.context}</p>
      </div>
    </div>
  );
}

export function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldCount, setShouldCount] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      gsap.from('.metrics-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.metrics-header',
          start: 'top 85%',
          once: true,
        },
      });

      ScrollTrigger.create({
        trigger: '.metrics-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          setShouldCount(true);
          if (!prefersReducedMotion) {
            // Use gsap.to() so inline opacity:0 animates to opacity:1
            gsap.to('.metric-card', {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'expo.out',
              stagger: 0.08,
            });
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-cyan pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-container mx-auto px-6">
        <div className="metrics-header text-center mb-16">
          <Eyebrow className="mb-4">By the numbers</Eyebrow>
          <h2 className="text-h1 text-zinc-50 mt-6">
            What AURA customers see in the first 90 days.
          </h2>
        </div>

        <div className="metrics-grid grid grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric) => (
            <div
              key={metric.number}
              className="metric-card"
              style={prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(30px)' }}
            >
              <MetricCard
                metric={metric}
                prefersReducedMotion={prefersReducedMotion}
                shouldCount={shouldCount}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
