'use client';

import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plus } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FAQS = [
  {
    question: 'How long does it take to set up AURA?',
    answer:
      'Most teams ship their first live workflow in under 30 minutes. Connect your tools using one of our 60+ native connectors, pick a template or build from scratch, and hit deploy. No staging environments, no devops, no waiting.',
  },
  {
    question: 'Do I need a developer or ML engineer to use AURA?',
    answer:
      'No. AURA was purpose-built for operations, finance, customer success, and HR teams — people who understand the business process, not the tech stack. If you can draw a flowchart, you can build an AURA workflow.',
  },
  {
    question: 'Which AI models does AURA support?',
    answer:
      'AURA connects to GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and Llama 3 out of the box. Compare models side-by-side in the API Playground before wiring anything to production, and switch models per workflow step.',
  },
  {
    question: 'Is my data used to train AI models?',
    answer:
      'Never. AURA is SOC 2 Type II certified and your data is never used for model training — by us or by the underlying model providers. You choose your data residency (US or EU), and all inputs and outputs are encrypted at rest and in transit.',
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer:
      "You'll receive an in-app notification and email alert at 80% of your monthly AI operations limit. You won't be cut off mid-workflow — we let you finish the current run. After that you can upgrade, purchase a top-up, or pause non-critical workflows until the next billing cycle.",
  },
  {
    question: 'Can I migrate from Zapier, Make, or n8n?',
    answer:
      "Yes. We offer a guided migration service for teams coming from Zapier, Make, or n8n. Our team maps your existing automations to AURA workflows, flags any gaps, and runs parallel testing before you cut over. Migration is included free on Growth and Enterprise plans.",
  },
];

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.faq-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.faq-header',
          start: 'top 85%',
          once: true,
        },
      });

      ScrollTrigger.batch('.faq-item', {
        start: 'top 88%',
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.07,
          });
        },
        once: true,
      });
    },
    { scope: sectionRef }
  );

  const toggle = useCallback(
    (index: number) => {
      const prevIndex = openIndex;
      const isOpening = openIndex !== index;
      setOpenIndex(isOpening ? index : null);

      if (prefersReducedMotion) return;

      // Close previous
      if (prevIndex !== null && contentRefs.current[prevIndex]) {
        gsap.to(contentRefs.current[prevIndex], {
          height: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        });
        gsap.to(iconRefs.current[prevIndex], {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Open new
      if (isOpening && contentRefs.current[index]) {
        const el = contentRefs.current[index]!;
        gsap.set(el, { height: 'auto' });
        const h = el.offsetHeight;
        gsap.fromTo(el, { height: 0 }, { height: h, duration: 0.4, ease: 'power2.inOut' });
        gsap.to(iconRefs.current[index], {
          rotation: 45,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    },
    [openIndex, prefersReducedMotion]
  );

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-aura-900">
      <div className="max-w-container mx-auto px-6">
        <div className="faq-header text-center mb-16">
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <h2 className="text-h1 text-zinc-50 mt-6">Common questions, straight answers.</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="faq-item border border-aura-700 rounded-xl overflow-hidden"
                style={prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(20px)' }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-aura-800 hover:bg-aura-700 transition-colors duration-150"
                  aria-expanded={isOpen}
                >
                  <span className="text-body font-semibold text-zinc-50">{faq.question}</span>
                  <div
                    ref={(el) => { iconRefs.current[i] = el; }}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-cyan-aura"
                    style={{ willChange: 'transform' }}
                  >
                    <Plus size={18} />
                  </div>
                </button>

                <div
                  ref={(el) => { contentRefs.current[i] = el; }}
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { height: 0, overflow: 'hidden' }
                  }
                >
                  <p className="px-6 py-5 text-body text-zinc-400 leading-relaxed border-t border-aura-700">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
