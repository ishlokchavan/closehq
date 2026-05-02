'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const ROWS = [
  {
    label: 'Commission split',
    us: 'Up to 90% to you',
    them: 'Typically 50–60%',
    usPositive: true,
    themPositive: false,
  },
  {
    label: 'Desk / monthly fees',
    us: 'None',
    them: 'AED 2,000–5,000+',
    usPositive: true,
    themPositive: false,
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
    <section id="vs" className="bg-ink py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel number="05" label="The comparison" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-6 text-bone text-balance">
              Us vs. the
              <br />
              <span className="italic font-normal text-gold">
                traditional brokerage.
              </span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 md:mt-16 border border-bone/10 overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] bg-ink-800 border-b border-bone/10">
              <div className="p-5 md:p-6 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-bone/40">
                Criteria
              </div>
              <div className="p-5 md:p-6 border-l border-bone/10 bg-gold/5">
                <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gold">
                  CloseHQ
                </div>
              </div>
              <div className="p-5 md:p-6 border-l border-bone/10">
                <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-bone/40">
                  Traditional brokerage
                </div>
              </div>
            </div>

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
                className="grid grid-cols-[1.2fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] border-b border-bone/10 last:border-b-0 hover:bg-ink-800/60 transition-colors"
              >
                <div className="p-5 md:p-6 text-bone/80 text-sm md:text-base">
                  {row.label}
                </div>
                <div className="p-5 md:p-6 border-l border-bone/10 bg-gold/5">
                  <div className="flex items-start gap-2.5">
                    <Check
                      className="h-4 w-4 md:h-5 md:w-5 text-gold mt-0.5 shrink-0"
                      strokeWidth={2}
                    />
                    <span className="text-sm md:text-base text-bone font-medium">
                      {row.us}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6 border-l border-bone/10">
                  <div className="flex items-start gap-2.5">
                    <X
                      className="h-4 w-4 md:h-5 md:w-5 text-bone/30 mt-0.5 shrink-0"
                      strokeWidth={2}
                    />
                    <span className="text-sm md:text-base text-bone/50">
                      {row.them}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
