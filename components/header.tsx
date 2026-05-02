'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { useScrolled } from '@/hooks/use-scrolled';
import { whatsappLink } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#commission', label: 'Commission' },
  { href: '#how', label: 'How it works' },
  { href: '#perks', label: 'Perks' },
  { href: '#vs', label: 'Why us' },
];

export function Header() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);

  const handleCTAClick = () => {
    trackEvent('cta_click', { source: 'header' });
    setOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-ink/85 backdrop-blur-xl border-b border-bone/5'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Logo />

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-bone/70 hover:text-bone transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'header' })}
          >
            <Button variant="ghost" size="sm">
              WhatsApp
            </Button>
          </a>
          <a href="#apply" onClick={handleCTAClick}>
            <Button variant="gold" size="sm">
              Start closing
            </Button>
          </a>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden flex items-center justify-center h-10 w-10 -mr-2 text-bone"
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
            className="md:hidden bg-ink border-t border-bone/10"
          >
            <div className="container-x py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-bone/5 text-bone/80 hover:text-bone text-sm"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-5">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('whatsapp_click', { source: 'mobile_menu' });
                    setOpen(false);
                  }}
                >
                  <Button variant="ghost" size="md" className="w-full">
                    WhatsApp
                  </Button>
                </a>
                <a href="#apply" onClick={handleCTAClick}>
                  <Button variant="gold" size="md" className="w-full">
                    Start closing
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
