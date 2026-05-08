'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { whatsappLink } from '@/lib/site-config';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/72 backdrop-blur-2xl border-b border-hairline/60">
      <div className="container-wide flex items-center justify-between h-12">
        <Logo variant="dark" />

        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
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

        <div className="hidden md:flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'header' })}
            className="text-[12px] text-ink/80 hover:text-ink transition-colors px-3"
            style={{ letterSpacing: '-0.01em' }}
          >
            WhatsApp
          </a>
          <a href="#apply" onClick={handleCTAClick}>
            <Button variant="primary" size="sm">
              Apply
            </Button>
          </a>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden flex items-center justify-center h-10 w-10 -mr-2 text-ink"
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
            transition={{ duration: 0.25 }}
            className="md:hidden bg-paper border-t border-hairline max-h-[calc(100svh-3rem)] overflow-y-auto"
          >
            <div className="container-wide py-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-4 border-b border-hairline/60 text-ink text-[17px] font-normal"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2.5 pt-5 pb-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('whatsapp_click', { source: 'mobile_menu' });
                    setOpen(false);
                  }}
                >
                  <Button variant="secondary" size="md" className="w-full">
                    WhatsApp
                  </Button>
                </a>
                <a href="#apply" onClick={handleCTAClick}>
                  <Button variant="primary" size="md" className="w-full">
                    Apply
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
