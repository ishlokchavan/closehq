'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PORTAL_NAV, LOCALES, type NavItem } from '@/lib/portal-config';

function isActive(pathname: string, item: NavItem) {
  return pathname === item.href || pathname.startsWith(item.href + '/');
}

export function PortalHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-2xl border-b border-hairline/60">
      <div className="container-wide flex items-center justify-between h-14">
        <Link href="/" aria-label="iClose home">
          <Logo variant="dark" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {PORTAL_NAV.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.href)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-1 px-4 py-1.5 text-[15px] rounded-full transition-colors',
                  isActive(pathname, item)
                    ? 'text-ink font-medium'
                    : 'text-ink/80 hover:text-ink hover:bg-mist',
                )}
                style={{ letterSpacing: '-0.01em' }}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>

              <AnimatePresence>
                {item.children && openMenu === item.href && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-2 w-64"
                  >
                    <div className="card-surface shadow-elevated p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-2.5 hover:bg-mist transition-colors"
                        >
                          <span className="block text-[14px] text-ink" style={{ letterSpacing: '-0.01em' }}>
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="block text-[12px] text-graphite mt-0.5">{child.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Desktop right: language + auth */}
        <div className="hidden md:flex items-center gap-2">
          <LanguagePill />
          <Link href="/login">
            <Button variant="outline" size="sm">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">Sign up</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((s) => !s)}
          className="md:hidden flex items-center justify-center h-9 w-9 text-ink rounded-full hover:bg-mist transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-paper border-t border-hairline shadow-elevated"
          >
            <div className="container-wide py-2 flex flex-col">
              {PORTAL_NAV.map((item) => (
                <div key={item.href} className="border-b border-hairline/60 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-ink text-[17px]"
                    style={{ letterSpacing: '-0.012em' }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pb-3 pl-4 flex flex-col gap-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[15px] text-graphite-dark"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="py-4 flex gap-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" size="md" className="w-full">Sign in</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="primary" size="md" className="w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Language switcher pill (the "Lorem" pill next to Sign in in the Figma).
 * UI-only for now — wires into the i18n layer in a later pass.
 */
function LanguagePill() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((s) => !s)}
        onMouseEnter={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-hairline text-[13px] text-ink/80 hover:text-ink hover:border-ink/40 transition-colors"
      >
        <Globe className="h-3.5 w-3.5" />
        EN
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full pt-2 w-40"
          >
            <div className="card-surface shadow-elevated p-1.5">
              {LOCALES.map((locale) => (
                <button
                  key={locale.code}
                  type="button"
                  className="w-full text-left rounded-lg px-3 py-2 text-[13px] text-ink hover:bg-mist transition-colors"
                >
                  {locale.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
