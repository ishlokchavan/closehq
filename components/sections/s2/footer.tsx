import { siteConfig } from '@/lib/site-config';

const LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#plans', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#apply', label: 'Join as a Partner' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export function S2Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">

          {/* Brand */}
          <div className="max-w-xs">
            <span className="text-white font-black text-2xl" style={{ letterSpacing: '-0.04em' }}>
              i<span className="text-gold-accent">C</span>lose
            </span>
            <p className="mt-4 text-white/25 text-sm leading-relaxed" style={{ letterSpacing: '-0.008em' }}>
              Dubai's independent brokerage platform for agents who are done splitting 50/50.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/30 hover:text-white/70 transition-colors"
                style={{ letterSpacing: '-0.008em' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-white/20" style={{ letterSpacing: '-0.005em' }}>
            © {new Date().getFullYear()} iClose. Dubai, UAE. All rights reserved.
          </p>
          <p className="text-xs text-white/15" style={{ letterSpacing: '-0.005em' }}>
            {siteConfig.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
