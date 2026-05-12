'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#how', label: 'How it works' },
  { href: '#learn', label: 'What you learn' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-2xl">
      <div className="container-wide flex items-center justify-between h-12">
        <Logo variant="dark" />

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((s) => !s)}
          className="flex items-center justify-center h-9 w-9 text-ink rounded-full hover:bg-mist transition-colors"
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
            className="bg-paper border-t border-hairline shadow-elevated"
          >
            <div className="container-wide py-2 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-4 border-b border-hairline/60 last:border-b-0 text-ink text-[17px] font-normal"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="py-4">
                <a href="#apply" onClick={() => setOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Get early access
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
