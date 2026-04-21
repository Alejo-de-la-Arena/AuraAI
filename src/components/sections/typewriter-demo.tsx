'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const PROMPT =
  'Summarize all support tickets from last week and flag anything urgent.';

const RESPONSE =
  "Found 847 tickets from Apr 13–20. 12 flagged as urgent — 8 relate to billing errors affecting enterprise accounts, 4 report API timeouts in the EU region. I've drafted a response template for the billing issues and created a Jira ticket for the infrastructure team. Want me to send the summary to the on-call channel?";

export function TypewriterDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [typing, setTyping] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedResponse(RESPONSE);
      return;
    }

    const startDelay = setTimeout(() => {
      setTyping(true);
    }, 1800);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timerRef.current);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!typing) return;

    function typeNext() {
      if (indexRef.current < RESPONSE.length) {
        setDisplayedResponse(RESPONSE.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        timerRef.current = setTimeout(typeNext, 18);
      }
    }

    timerRef.current = setTimeout(typeNext, 0);
    return () => clearTimeout(timerRef.current);
  }, [typing]);

  return (
    <div
      className="rounded-xl overflow-hidden border border-aura-700 shadow-xl-dark"
      style={{ background: '#0D0D10' }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-aura-700"
        style={{ background: '#111113' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        <span className="ml-3 text-mono text-zinc-500">AURA AI — Workflow Demo</span>
      </div>

      {/* Prompt */}
      <div className="p-4 border-b border-aura-700">
        <span
          className="inline-flex items-center text-mono text-zinc-300 text-xs font-semibold px-2 py-0.5 rounded mb-3"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          You
        </span>
        <p className="text-mono text-zinc-400">{PROMPT}</p>
      </div>

      {/* Response */}
      <div className="p-4 min-h-[160px]">
        <span
          className="inline-flex items-center text-mono text-cyan-aura text-xs font-semibold px-2 py-0.5 rounded mb-3"
          style={{ background: 'rgba(0,229,255,0.1)' }}
        >
          AURA ▸
        </span>
        <p className="text-mono text-zinc-200 whitespace-pre-wrap">
          {displayedResponse}
          {typing && indexRef.current < RESPONSE.length && (
            <span className="cursor-blink text-cyan-aura ml-0.5">▌</span>
          )}
          {!typing && !prefersReducedMotion && displayedResponse === '' && (
            <span className="cursor-blink text-cyan-aura">▌</span>
          )}
        </p>
      </div>
    </div>
  );
}
