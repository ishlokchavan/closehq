'use client';

import { motion } from 'framer-motion';
import { Check, X, Zap } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const ROWS = [
  {
    label: 'Commission split',
    us: 'Up to 90% to you',
    them: 'Typically 50–60%',
    usPositive: true,
    themPositive: false,
    highlight: true,
  },
  {
    label: 'Desk / monthly fees',
    us: 'None',
    them: 'AED 2,000–5,000+',
    usPositive: true,
    themPositive: false,
    highlight: true,
  },
  {
    label: 'Commission timing',
    us: 'Advance on SPA',
    them: 'After developer pays',
    usPositive: true,
    themPositive: false,
  },
  {
    label: 'Payout speed',
    us: '~48 hours',
    them: '30–90+ days',
    usPositive: true,
    themPositive: false,
    highlight: true,
  },
  {
    label: 'Schedule',
    us: 'Fully flexible',
    them: 'Office hours required',
    usPositive: true,
    themPositive: false,
  },
  {
    label: 'Closing tools',
    us: 'Yacht, chauffeur, rentals',
    them: 'Pay out of pocket',
    usPositive: true,
    themPositive: false,
    highlight: true,
  },
  {
    label: 'Lifetime referrals',
    us: '5% forever',
    them: 'One-off bonus, if any',
    usPositive: true,
    themPositive: false,
  },
];

export function Comparison() {
  return (
    <section id="vs" className="relative bg-gradient-to-b from-ink to-ink-900 py-28 md:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gold/5 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <Reveal>
            <SectionLabel number="10" label="Why we're different" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-8 text-bone text-balance font-display font-light">
              <span className="block">We've eliminated</span>
              <span className="block bg-gradient-to-r from-gold via-gold/80 to-gold/60 bg-clip-text text-transparent">
                everything expensive
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-bone/70 max-w-lg font-light leading-relaxed">
              Traditional brokerages were built for a different era. We rebuilt from scratch for modern, independent agents.
            </p>
          </Reveal>
        </div>

        {/* Comparison table */}
        <Reveal delay={0.2}>
          <div className="relative overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="border border-gold/30 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/[0.02]">
                {/* Header row */}
                <div className="grid grid-cols-[1.3fr_1.2fr_1.2fr] bg-gradient-to-r from-gold/10 via-gold/5 to-transparent border-b border-gold/20">
                  <div className="p-6 md:p-8 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-bone/60">
                    Features
                  </div>
                  <div className="p-6 md:p-8 border-l border-gold/20 bg-gold/10">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gold" />
                      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gold font-medium">
                        CloseHQ
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 border-l border-gold/20">
                    <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-bone/50">
                      Traditional Brokerage
                    </div>
                  </div>
                </div>

                {/* Table rows */}
                {ROWS.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`grid grid-cols-[1.3fr_1.2fr_1.2fr] border-b border-gold/10 last:border-0 hover:bg-white/[0.05] transition-colors duration-300 group ${
                      row.highlight ? 'bg-gold/5' : ''
                    }`}
                  >
                    <div className="p-6 md:p-8 text-bone/80 text-sm md:text-base font-medium group-hover:text-bone transition-colors">
                      {row.label}
                      {row.highlight && (
                        <div className="inline-block ml-2 px-2 py-1 text-[10px] font-mono bg-gold/20 text-gold rounded rounded-full">
                          Key
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8 border-l border-gold/20 bg-gold/5">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-sm md:text-base text-bone font-medium group-hover:text-gold transition-colors">
                          {row.us}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 border-l border-gold/20">
                      <div className="flex items-start gap-3">
                        <X className="h-5 w-5 text-bone/20 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-sm md:text-base text-bone/50 group-hover:text-bone/60 transition-colors">
                          {row.them}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 pt-12 border-t border-bone/10 text-center"
        >
          <p className="text-bone/70 font-light">
            Ready to earn what you're worth?
            <a href="#apply" className="ml-2 text-gold hover:text-gold/80 transition-colors font-medium">
              Apply now →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
