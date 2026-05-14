'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { href: '#membership', label: 'Membership' },
  { href: '#plans', label: 'Plans' },
  { href: '#how', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
  { href: '#resources', label: 'Resources' },
];

export function S2Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-sellit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">

        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 flex-shrink-0">
          <span className="font-display font-bold text-[#1A1A1A] text-lg" style={{ letterSpacing: '-0.025em' }}>
            iClose
          </span>
          <span className="text-lime text-base">✦</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-[13px] font-medium text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors rounded-md hover:bg-cream/60"
              style={{ letterSpacing: '-0.005em' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#apply"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-lime text-[#1A1A1A] text-[13px] font-semibold hover:bg-lime-dark transition-all"
            style={{ letterSpacing: '-0.01em' }}
          >
            Join Membership ↗
          </a>
          <a
            href="#login"
            className="text-[13px] font-medium text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
            style={{ letterSpacing: '-0.005em' }}
          >
            Login
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden flex items-center justify-center h-9 w-9 text-[#1A1A1A] rounded-full hover:bg-cream transition-colors"
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white border-t border-sellit-border"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
              {NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 border-b border-sellit-border last:border-b-0 text-[#1A1A1A] text-base font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="py-4">
                <a
                  href="#apply"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-full bg-lime text-[#1A1A1A] font-semibold text-base"
                >
                  Join Membership ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
