'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const PILLS = [
  // Left column
  { label: 'Lawyer', x: '2%', y: '18%', opacity: 0.55, dur: 5.0, delay: 0.0 },
  { label: 'Financial Adviser', x: '1%', y: '36%', opacity: 0.40, dur: 6.5, delay: 0.8 },
  { label: 'Family Office', x: '3%', y: '54%', opacity: 0.45, dur: 4.5, delay: 0.4 },
  { label: 'POA', x: '4%', y: '74%', opacity: 0.35, dur: 7.0, delay: 1.2 },
  // Right column
  { label: 'Investor', x: '77%', y: '16%', opacity: 0.45, dur: 5.5, delay: 0.3 },
  { label: 'Accountant', x: '79%', y: '34%', opacity: 0.50, dur: 4.0, delay: 0.7 },
  { label: 'Asset Manager', x: '75%', y: '54%', opacity: 0.40, dur: 6.0, delay: 0.2 },
  { label: 'Broker', x: '78%', y: '72%', opacity: 0.45, dur: 5.0, delay: 1.0 },
  // Top band
  { label: 'Mortgage Broker', x: '16%', y: '7%', opacity: 0.38, dur: 6.0, delay: 0.5 },
  { label: 'Real Estate Agent', x: '60%', y: '8%', opacity: 0.35, dur: 5.5, delay: 0.9 },
  { label: 'Corporate Treasurer', x: '38%', y: '5%', opacity: 0.28, dur: 7.5, delay: 1.3 },
  // Bottom band
  { label: 'Wealth Manager', x: '15%', y: '88%', opacity: 0.35, dur: 7.0, delay: 0.6 },
  { label: 'Fund Manager', x: '40%', y: '92%', opacity: 0.28, dur: 5.0, delay: 1.4 },
  { label: 'Private Banker', x: '61%', y: '88%', opacity: 0.38, dur: 6.5, delay: 0.3 },
  { label: 'Tax Adviser', x: '2%', y: '90%', opacity: 0.30, dur: 4.5, delay: 1.1 },
  { label: 'Insurance Adviser', x: '80%', y: '88%', opacity: 0.28, dur: 6.0, delay: 0.8 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-neutral-950">

      {/* Subtle center glow */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_50%_50%] from-white/[0.03] to-transparent pointer-events-none" />

      {/* Floating profession pills */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {PILLS.map((pill) => (
          <motion.div
            key={pill.label}
            className="absolute"
            style={{ left: pill.x, top: pill.y }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: pill.opacity, y: 0 }}
            transition={{ duration: 0.8, delay: pill.delay + 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -(6 + pill.dur % 4), 0] }}
              transition={{ duration: pill.dur, repeat: Infinity, ease: 'easeInOut', delay: pill.delay }}
            >
              <span
                className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-sm text-white text-[12px] tracking-tight whitespace-nowrap"
                style={{ letterSpacing: '-0.008em' }}
              >
                {pill.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative flex-1 flex flex-col items-center justify-center container-wide text-center pt-28 pb-20 px-4">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 flex justify-center"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-[12px] text-white/80"
            style={{ letterSpacing: '-0.01em' }}
          >
            Now accepting founding members · Dubai secondary market
          </span>
        </motion.div>

        <h1 className="display-xl text-white text-balance">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            The real estate community
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            for professionals.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-white/70 text-[18px] sm:text-[20px] leading-[1.5] text-balance max-w-xl mx-auto"
          style={{ letterSpacing: '-0.015em' }}
        >
          The Dubai secondary market runs on the right expertise, the right relationships, and access to the right assets. iClose is where all three come together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex items-center justify-center gap-5 flex-wrap"
        >
          <a
            href="#who"
            onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-ink text-[15px] font-medium hover:bg-white/90 transition-colors"
            style={{ letterSpacing: '-0.01em' }}
          >
            Find your place here
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href="/specialists"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[15px]"
            style={{ letterSpacing: '-0.01em' }}
          >
            Become a Specialist
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>

    </section>
  );
}
