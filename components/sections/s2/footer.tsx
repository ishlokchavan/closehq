'use client';

import { useState } from 'react';

export function S2Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer className="bg-cream border-t border-sellit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* Large faded logo + tagline */}
        <div className="mb-10">
          <div className="flex items-baseline gap-2 mb-4">
            <span
              className="font-display font-extrabold text-[#1A1A1A]/10"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              iClose
            </span>
            <span className="text-lime/30" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>✦</span>
          </div>
          <p className="text-sellit-muted text-base" style={{ letterSpacing: '-0.01em' }}>
            Join 400+ Dubai agents connecting and growing together.
          </p>

          {/* Email subscribe */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-0 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 bg-transparent border-b border-sellit-border text-[#1A1A1A] text-sm placeholder:text-sellit-muted/60 focus:outline-none focus:border-[#1A1A1A] transition-colors"
                style={{ letterSpacing: '-0.008em' }}
              />
              <button
                type="submit"
                className="h-11 px-5 border-b border-[#1A1A1A] text-[#1A1A1A] text-sm font-medium hover:border-lime hover:text-lime-text transition-colors flex-shrink-0"
                style={{ letterSpacing: '-0.01em' }}
              >
                Subscribe →
              </button>
            </form>
          ) : (
            <p className="mt-5 text-lime-text text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
              ✓ You're subscribed. We'll be in touch.
            </p>
          )}
        </div>

        {/* Links row */}
        <div className="border-t border-sellit-border pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: '#membership', label: 'Membership' },
              { href: '#plans', label: 'Plans' },
              { href: '#how', label: 'How it works' },
              { href: '#resources', label: 'Resources' },
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sellit-muted text-sm hover:text-[#1A1A1A] transition-colors"
                style={{ letterSpacing: '-0.005em' }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-sellit-muted text-xs flex-shrink-0" style={{ letterSpacing: '-0.005em' }}>
            © {new Date().getFullYear()} iClose. Dubai, UAE.
          </p>
        </div>
      </div>
    </footer>
  );
}
