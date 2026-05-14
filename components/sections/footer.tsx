'use client';

import { Logo } from '@/components/ui/logo';

const LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#learn', label: 'Why iClose' },
  { href: '/specialists', label: 'Become a Specialist' },
  { href: '#plans', label: 'Plans' },
  { href: '#faq', label: 'FAQ' },
  { href: '#apply', label: 'Join as a Member' },
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms of service' },
];

export function Footer() {
  return (
    <footer className="bg-mist border-t border-hairline">
      <div className="container-wide pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-xs">
            <Logo variant="dark" />
            <p className="mt-4 text-[13px] text-graphite leading-[1.6]" style={{ letterSpacing: '-0.008em' }}>
              The learning platform for Dubai’s secondary real estate market.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-graphite hover:text-ink transition-colors"
                  style={{ letterSpacing: '-0.008em' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-graphite-light mb-1">Contact</p>
              <a
                href="mailto:hello@iclose.ae"
                className="text-[13px] text-graphite hover:text-ink transition-colors"
                style={{ letterSpacing: '-0.008em' }}
              >
                hello@iclose.ae
              </a>
              <a
                href="tel:+800425673"
                className="text-[13px] text-graphite hover:text-ink transition-colors"
                style={{ letterSpacing: '-0.008em' }}
              >
                (800) 425-673
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mt-10 mb-5" />

        <p className="text-[12px] text-graphite tracking-tight">
          © {new Date().getFullYear()} iClose. Dubai, UAE.
        </p>
      </div>
    </footer>
  );
}
