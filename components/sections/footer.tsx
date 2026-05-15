'use client';

import { Logo } from '@/components/ui/logo';

const openCookieSettings = () =>
  window.dispatchEvent(new Event('iclose:open-cookie-settings'));

const NAV_COLUMNS = [
  {
    heading: 'Platform',
    links: [
      { href: '#how', label: 'How it works' },
      { href: '#apply', label: 'Who it\'s for' },
      { href: '#plans', label: 'Plans' },
      { href: '#faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Join',
    links: [
      { href: '#apply', label: 'Join as a Member' },
      { href: '/specialists', label: 'Apply as a Specialist' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { href: 'mailto:hello@iclose.ae', label: 'hello@iclose.ae' },
      { href: 'tel:+800425673', label: '(800) 425-673' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-mist border-t border-hairline">
      <div className="container-wide pt-14 pb-8">

        <div className="grid grid-cols-2 md:grid-cols-[1fr_auto] gap-10 md:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 max-w-xs">
            <Logo variant="dark" />
            <p className="mt-4 text-[13px] text-graphite leading-[1.6]" style={{ letterSpacing: '-0.008em' }}>
              The community and education platform for Dubai&apos;s secondary real estate market.
            </p>
          </div>

          {/* Nav columns */}
          <div className="col-span-2 md:col-span-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {NAV_COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-graphite-light mb-3">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-[13px] text-graphite hover:text-ink transition-colors"
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
        </div>

        <div className="hairline mt-12 mb-5" />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="text-[12px] text-graphite tracking-tight">
            © {new Date().getFullYear()} iClose. Dubai, UAE.
          </p>
          <button
            onClick={openCookieSettings}
            className="text-[12px] text-graphite-light hover:text-graphite transition-colors tracking-tight"
          >
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
}
