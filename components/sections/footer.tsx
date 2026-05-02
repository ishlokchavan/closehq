'use client';

import { Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { siteConfig, whatsappLink } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-bone/10">
      <div className="container-x py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 text-bone/60 max-w-sm leading-relaxed text-sm">
              {siteConfig.description}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40 mb-4">
              Platform
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { href: '#commission', label: 'Commission' },
                { href: '#how', label: 'How it works' },
                { href: '#perks', label: 'Perks' },
                { href: '#vs', label: 'Why us' },
                { href: '#apply', label: 'Apply' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-bone/70 hover:text-bone transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40 mb-4">
              Contact
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', { source: 'footer' })
                  }
                  className="inline-flex items-center gap-2 text-bone/70 hover:text-gold transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
                  </svg>
                  WhatsApp our desk
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-bone/70 hover:text-bone transition-colors"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-bone/60">
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
                Dubai, United Arab Emirates
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-16 mb-6" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
            © {year} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
            <a href="/privacy" className="hover:text-bone/70 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-bone/70 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
