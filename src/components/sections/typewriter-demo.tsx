'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const DEMOS = [
  {
    prompt: 'Summarize all support tickets from last week and flag anything urgent.',
    response:
      "Found 847 tickets from Apr 13\u201320. 12 flagged as urgent \u2014 8 relate to billing errors affecting enterprise accounts, 4 report API timeouts in the EU region. I've drafted a response template for the billing issues and created a Jira ticket for the infrastructure team. Want me to send the summary to the on-call channel?",
  },
  {
    prompt: 'Pull all Q1 deals from Salesforce and draft a pipeline review for leadership.',
    response:
      "Pulled 134 active deals from Salesforce. Pipeline total: $4.2M. 12 deals are at risk \u2014 9 have had no activity in 14+ days. I've drafted a 5-slide pipeline review with risk highlights, owner assignments, and recommended next steps. Ready to export to Slides or Notion?",
  },
  {
    prompt: 'Flag any invoices in QuickBooks that are 30+ days overdue and draft follow-ups.',
    response:
      "Found 23 invoices past 30 days \u2014 total outstanding: $87,400. 6 accounts are 60+ days overdue. I've drafted personalized follow-up emails for each, sorted by amount owed. Three of the largest accounts haven't opened our last two emails. Want me to escalate those to your account team?",
  },
];

const CHAR_DELAY = 30;
const LOOP_PAUSE = 2000;
const START_DELAY = 1600;

export function TypewriterDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [demoIndex, setDemoIndex] = useState(0);
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const charIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const currentDemo = DEMOS[demoIndex];

  function clearTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  // Initial start + loop restart
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedResponse(currentDemo.response);
      return;
    }

    charIndexRef.current = 0;
    setDisplayedResponse('');
    setIsTyping(false);

    timerRef.current = setTimeout(() => setIsTyping(true), START_DELAY);
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoIndex, prefersReducedMotion]);

  // Character-by-character typing
  useEffect(() => {
    if (!isTyping || prefersReducedMotion) return;

    const response = currentDemo.response;

    function typeNext() {
      if (charIndexRef.current < response.length) {
        charIndexRef.current += 1;
        setDisplayedResponse(response.slice(0, charIndexRef.current));
        timerRef.current = setTimeout(typeNext, CHAR_DELAY);
      } else {
        // Done — pause then move to next demo
        timerRef.current = setTimeout(() => {
          setDemoIndex((prev) => (prev + 1) % DEMOS.length);
        }, LOOP_PAUSE);
      }
    }

    timerRef.current = setTimeout(typeNext, 0);
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);

  const showCursor =
    !prefersReducedMotion &&
    (isTyping ? charIndexRef.current < currentDemo.response.length : displayedResponse === '');

  return (
    <div
      className="rounded-xl overflow-hidden border border-aura-700"
      style={{ background: '#0D0D10' }}
    >
      {/* macOS-style header bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-aura-700"
        style={{ background: '#111113' }}
      >
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#FEBC2E' }} />
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#28C840' }} />
        <span className="ml-3 text-mono text-zinc-500 truncate">AURA AI \u2014 Workflow Demo</span>
      </div>

      {/* Prompt */}
      <div className="px-4 pt-4 pb-3 border-b border-aura-700">
        <span
          className="inline-flex items-center text-xs font-semibold text-zinc-300 px-2 py-0.5 rounded mb-2 font-mono"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          You
        </span>
        <p className="text-mono text-zinc-400 text-sm leading-relaxed">
          {currentDemo.prompt}
        </p>
      </div>

      {/* Response */}
      <div className="px-4 pt-4 pb-5 min-h-[170px]">
        <span
          className="inline-flex items-center text-xs font-semibold text-cyan-aura px-2 py-0.5 rounded mb-2 font-mono"
          style={{ background: 'rgba(0,229,255,0.1)' }}
        >
          AURA &#9658;
        </span>
        <p className="text-mono text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">
          {displayedResponse}
          {showCursor && (
            <span className="cursor-blink text-cyan-aura ml-px" aria-hidden="true">
              &#9612;
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
