'use client';

import { Logo } from '@/components/ui/logo';
import { siteConfig, whatsappLink } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

const SECTIONS = [
  {
    title: 'Platform',
    links: [
      { href: '#commission', label: 'Commission' },
      { href: '#how', label: 'How it works' },
      { href: '#perks', label: 'Perks' },
      { href: '#vs', label: 'Why CloseHQ' },
      { href: '#apply', label: 'Apply' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '#commission', label: 'Commission split' },
      { href: '#how', label: 'Onboarding' },
      { href: '#perks', label: 'Concierge' },
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mist border-t border-hairline">
      <div className="container-wide pt-16 md:pt-20 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2">
            <Logo variant="dark" />
            <p
              className="mt-5 text-[13px] text-graphite max-w-sm leading-[1.5]"
              style={{ letterSpacing: '-0.008em' }}
            >
              {siteConfig.description}
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3
                className="text-[13px] font-semibold text-ink tracking-tight mb-4"
                style={{ letterSpacing: '-0.01em' }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-[12px] text-graphite hover:text-ink hover:underline underline-offset-2 transition-colors"
                      style={{ letterSpacing: '-0.008em' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-14 mb-6" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-[12px] text-graphite tracking-tight">
          <div>
            © {year} {siteConfig.name}. All rights reserved. Dubai, UAE.
          </div>
          <div className="flex gap-5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'footer' })}
              className="hover:text-ink hover:underline underline-offset-2 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-ink hover:underline underline-offset-2 transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
