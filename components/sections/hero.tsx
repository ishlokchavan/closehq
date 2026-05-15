'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const PILLS = [
  // top-left cluster
  { label: 'Real Estate Agent', x: '8%',  y: '6%',  dur: 5.0, delay: 0.0 },
  { label: 'Investor',          x: '52%', y: '2%',  dur: 6.0, delay: 0.5 },
  // upper-mid
  { label: 'Mortgage Broker',   x: '2%',  y: '22%', dur: 6.5, delay: 0.3 },
  { label: 'Accountant',        x: '44%', y: '18%', dur: 5.5, delay: 0.7 },
  // mid row
  { label: 'Lawyer',            x: '16%', y: '38%', dur: 4.5, delay: 0.2 },
  { label: 'Asset Manager',     x: '55%', y: '35%', dur: 6.0, delay: 0.4 },
  // centre cluster
  { label: 'Financial Adviser', x: '4%',  y: '54%', dur: 7.0, delay: 0.6 },
  { label: 'Fund Manager',      x: '46%', y: '52%', dur: 5.0, delay: 0.1 },
  // lower-mid
  { label: 'Wealth Manager',    x: '14%', y: '68%', dur: 6.5, delay: 0.8 },
  { label: 'Private Banker',    x: '52%', y: '66%', dur: 4.0, delay: 0.35 },
  // bottom
  { label: 'Family Office',     x: '2%',  y: '82%', dur: 5.5, delay: 0.55 },
  { label: 'Broker',            x: '38%', y: '80%', dur: 7.5, delay: 0.15 },
  { label: 'Tax Adviser',       x: '64%', y: '84%', dur: 5.0, delay: 0.65 },
  // scattered
  { label: 'POA',               x: '72%', y: '48%', dur: 6.0, delay: 0.45 },
  { label: 'Insurance Adviser', x: '66%', y: '16%', dur: 5.5, delay: 0.9 },
  { label: 'Corporate Treasurer', x: '28%', y: '92%', dur: 4.5, delay: 0.25 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-paper flex items-center">

      {/* Very subtle dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d2d2d7 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.45,
        }}
      />

      {/* Soft radial fade on the right to bleed into pills area */}
      <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none bg-gradient-to-l from-mist/60 to-transparent" />

      <div className="relative container-wide w-full flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0 pt-28 pb-20 lg:py-0" style={{ minHeight: '100vh' }}>

        {/* ── Left: text ── */}
        <div className="lg:w-[52%] lg:pr-12 flex flex-col justify-center">

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5"
          >
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist border border-hairline text-[12px] font-medium text-graphite tracking-tight"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0" />
              Dubai · Secondary Market
            </span>
          </motion.div>

          <h1
            className="font-display font-semibold text-ink text-balance"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.032em' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              The real estate
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              community for
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="block text-graphite"
            >
              professionals.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-graphite-dark leading-[1.5] text-balance max-w-lg"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', letterSpacing: '-0.015em' }}
          >
            The Dubai secondary market runs on the right expertise, the right
            relationships, and access to the right assets. iClose is where all
            three come together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex items-center gap-4 flex-wrap"
          >
            <a
              href="#apply"
              onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white text-[15px] font-medium hover:bg-ink/85 transition-colors"
              style={{ letterSpacing: '-0.01em' }}
            >
              Join now
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a
              href="/specialists"
              className="inline-flex items-center gap-2 text-graphite hover:text-ink transition-colors text-[15px]"
              style={{ letterSpacing: '-0.01em' }}
            >
              Apply as a Specialist
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>

        {/* ── Right: floating profession pills ── */}
        <div className="hidden lg:block lg:w-[48%] relative" style={{ height: '100vh' }}>
          {PILLS.map((pill, i) => (
            <motion.div
              key={pill.label}
              className="absolute"
              style={{ left: pill.x, top: pill.y }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -(5 + (pill.dur % 4)), 0] }}
                transition={{ duration: pill.dur, repeat: Infinity, ease: 'easeInOut', delay: pill.delay }}
              >
                <span
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-hairline shadow-card text-ink text-[13px] font-medium whitespace-nowrap"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {pill.label}
                </span>
              </motion.div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
