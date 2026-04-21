'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Product', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-400',
          scrolled
            ? 'bg-aura-950/80 backdrop-blur-md border-b border-aura-700/50'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-container mx-auto px-6 h-full flex items-center justify-between">
          <a href="#" className="text-body font-bold text-zinc-50 flex items-center gap-1">
            AURA <span className="text-cyan-aura">AI</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-small text-zinc-400 hover:text-zinc-50 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="text-small text-zinc-400 hover:text-zinc-50 transition-colors duration-150 px-3 py-2"
            >
              Sign in
            </a>
            <Button variant="primary" size="sm">
              Start free
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-50 transition-colors"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-aura-900 border-l border-aura-700 flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-body font-bold text-zinc-50">
                  AURA <span className="text-cyan-aura">AI</span>
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-zinc-400 hover:text-zinc-50 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className="text-body text-zinc-300 hover:text-zinc-50 py-3 border-b border-aura-700 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-6">
                <a
                  href="#"
                  className="text-center text-small text-zinc-400 hover:text-zinc-50 transition-colors py-2"
                >
                  Sign in
                </a>
                <Button variant="primary" size="md" className="w-full">
                  Start free
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
