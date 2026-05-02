'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Banknote, Zap, Shield } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const VALUES = [
  {
    icon: TrendingUp,
    figure: '90%',
    title: 'Commission to you',
    body: 'Keep what you earn. Industry-leading splits for high performers — no hidden cuts, no desk fees.',
    accent: 'from-gold',
  },
  {
    icon: Banknote,
    figure: 'Instant',
    title: 'Advance on SPA',
    body: 'Get paid immediately when the SPA is signed. No waiting on developer cycles or escrow delays.',
    accent: 'from-blue-400',
  },
  {
    icon: Zap,
    figure: '~48h',
    title: 'Fast payouts',
    body: 'Cleared SPAs trigger instant settlements. Typical turnaround under two business days.',
    accent: 'from-emerald-400',
  },
  {
    icon: Shield,
    figure: 'AED 0',
    title: 'Monthly fees',
    body: 'Zero desk fees, zero licensing charges, zero monthly drag. You only pay when you win.',
    accent: 'from-rose-400',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Value() {
  return (
    <section
      id="commission"
      className="relative bg-gradient-to-b from-bone-100 to-white text-ink py-28 md:py-40 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-gold/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gold/3 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-x relative">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20 md:mb-24">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel
                number="01"
                label="Why we win"
                variant="light"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-8 text-balance text-ink">
                <span className="block">Economics that</span>
                <span className="block bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">
                  actually favor you
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <Reveal delay={0.2}>
              <p className="text-lg text-ink/70 leading-relaxed max-w-lg">
                Traditional brokerages were built when agents needed offices, licenses, and phone books. We stripped the overhead and passed the savings back to you — the people doing the actual work.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Premium value cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={item}
                className="group relative"
              >
                {/* Glow background */}
                <div className={`absolute -inset-px bg-gradient-to-br ${value.accent} to-transparent opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500`} />

                {/* Card */}
                <div className="relative h-full backdrop-blur-sm bg-white/40 border border-white/60 hover:border-gold/40 rounded-2xl p-8 md:p-10 transition-all duration-500 overflow-hidden">
                  {/* Inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative space-y-6">
                    {/* Icon + Figure */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className={`text-5xl md:text-6xl font-display font-light bg-gradient-to-br ${value.accent} to-transparent bg-clip-text text-transparent mb-2`}>
                          {value.figure}
                        </div>
                        <h3 className="text-lg md:text-xl font-medium text-ink group-hover:text-gold transition-colors duration-300">
                          {value.title}
                        </h3>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 group-hover:from-gold/20 group-hover:to-gold/10 border border-gold/20 transition-all duration-300">
                        <Icon className="h-6 w-6 text-ink/70 group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm md:text-base text-ink/70 group-hover:text-ink/80 leading-relaxed transition-colors duration-300">
                      {value.body}
                    </p>

                    {/* Accent line */}
                    <div className={`h-px w-0 group-hover:w-12 bg-gradient-to-r ${value.accent} to-transparent transition-all duration-500`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
