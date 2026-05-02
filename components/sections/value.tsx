'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Banknote, Coins, Zap } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const VALUES = [
  {
    icon: TrendingUp,
    figure: 'Up to 90%',
    title: 'Commission to you',
    body: 'Keep what you earn. Industry-leading splits for top performers — clearly tiered, no surprises.',
  },
  {
    icon: Banknote,
    figure: 'On SPA',
    title: 'Advance commission',
    body: 'Get paid as soon as the SPA is signed. No waiting on developer cycles for your cash flow.',
  },
  {
    icon: Coins,
    figure: 'AED 0',
    title: 'Monthly fees',
    body: 'No desk fees, no licensing surcharges, no recurring drag. You only pay when you win.',
  },
  {
    icon: Zap,
    figure: '~48h',
    title: 'Fast payouts',
    body: 'Cleared SPAs trigger fast settlements. Typical turnaround is under two business days.',
  },
];

export function Value() {
  return (
    <section
      id="commission"
      className="relative bg-bone-100 text-ink py-24 md:py-32"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel
                number="01"
                label="The economics"
                variant="light"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-6 text-balance">
                The math of a
                <br />
                <span className="italic font-normal text-gold-dark">
                  fairer brokerage.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <Reveal delay={0.2}>
              <p className="text-lg text-ink/70 leading-relaxed text-pretty">
                Traditional brokerages were built when agents needed an office,
                a license, and a phone book. None of that is true anymore. We
                strip the overhead and pay it back to the people doing the work
                — you.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {VALUES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-bone-100 p-8 md:p-10 hover:bg-bone-200 transition-colors duration-500"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50 mb-3">
                    0{i + 1}
                  </div>
                  <div className="font-display text-4xl md:text-5xl font-light tracking-tighter text-ink mb-2">
                    {item.figure}
                  </div>
                  <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-bone-100 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500">
                  <item.icon
                    className="h-5 w-5 text-ink/70 group-hover:text-gold-dark transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <p className="mt-6 text-ink/60 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
