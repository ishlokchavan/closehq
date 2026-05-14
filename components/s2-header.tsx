'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

const NAV = [
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#plans', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function S2Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span className="text-white font-black text-xl tracking-tight" style={{ letterSpacing: '-0.04em' }}>
            i<span className="text-gold-accent">C</span>lose
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              style={{ letterSpacing: '-0.01em' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#apply"
            onClick={() => trackEvent('cta_click', { source: 'header' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-all"
            style={{ letterSpacing: '-0.01em' }}
          >
            Join Free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden flex items-center justify-center h-10 w-10 text-white rounded-full hover:bg-white/10 transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 border-b border-white/10 last:border-b-0 text-white text-[17px] font-medium"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 pb-2">
                <a
                  href="#apply"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 rounded-full bg-white text-black font-bold text-[17px]"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  Join Free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
