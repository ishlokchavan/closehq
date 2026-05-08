'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const navLinks = [
  { href: '#plans', label: 'Plans' },
  { href: '#how', label: 'How it works' },
  { href: '#training', label: 'Training' },
  { href: '#perks', label: 'Perks' },
  { href: '#vs', label: 'Why iClose' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const handleCTAClick = () => {
    trackEvent('cta_click', { source: 'header' });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/72 backdrop-blur-2xl">
      <div className="container-wide flex items-center justify-between gap-3 h-12">
        {/* Mobile-only hamburger on the left */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden flex items-center justify-center h-9 w-9 -ml-1 text-ink rounded-full hover:bg-mist transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <div className="md:flex-shrink-0">
          <Logo variant="dark" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8 mx-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-normal text-ink/80 hover:text-ink transition-colors duration-200"
              style={{ letterSpacing: '-0.01em' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Always-visible Get started pill on the right */}
        <div className="flex items-center">
          <a href="#apply" onClick={handleCTAClick}>
            <Button variant="primary" size="sm">
              Get started
            </Button>
          </a>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-paper border-t border-hairline/60"
          >
            <div className="container-wide py-2 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 border-b border-hairline/60 last:border-b-0 text-ink text-[17px] font-normal"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
