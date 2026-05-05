'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const OFFPLAN_BENEFITS = [
  'Instant SPA advances',
  '90% split',
  'Developer access',
  'Early deal priority',
];

const SECONDARY_BENEFITS = [
  '90% split',
  'Fast payouts (~24h)',
  'Yacht, car & rentals',
  'No capital required',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AgentTypes() {
  return (
    <section className="relative bg-white py-28 md:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-gold/5 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-gold/5 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Reveal>
            <SectionLabel number="02" label="Pick your lane" variant="light" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-8 text-ink text-balance">
              <span className="block">Off-plan or</span>
              <span className="block bg-gradient-to-r from-gold via-gold/80 to-gold/60 bg-clip-text text-transparent">
                secondary market?
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Offplan card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="group relative"
          >
            {/* Glow background */}
            <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 via-gold/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Card */}
            <div className="relative backdrop-blur-xl bg-white/40 border border-gold/30 rounded-3xl p-10 md:p-12 h-full">
              {/* Header accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold/20 to-transparent rounded-t-3xl" />

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-display font-light text-ink mb-1">
                Off-Plan
              </h3>
              <p className="text-sm text-gold mb-8 font-light">
                Pre-launch properties · Developer networks
              </p>

              {/* Benefits list */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {OFFPLAN_BENEFITS.map((benefit) => (
                  <motion.div
                    key={benefit}
                    variants={item}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm text-ink/80 group-hover:text-ink transition-colors">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.15em] text-gold hover:text-gold/80 transition-colors"
                >
                  I'm in
                  <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Secondary card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
            className="group relative"
          >
            {/* Glow background */}
            <div className="absolute -inset-1 bg-gradient-to-bl from-gold/30 via-gold/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Card */}
            <div className="relative backdrop-blur-xl bg-white/40 border border-gold/30 rounded-3xl p-10 md:p-12 h-full">
              {/* Header accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold/20 to-transparent rounded-t-3xl" />

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-display font-light text-ink mb-1">
                Secondary Market
              </h3>
              <p className="text-sm text-gold mb-8 font-light">
                Resale properties · Quick closings
              </p>

              {/* Benefits list */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {SECONDARY_BENEFITS.map((benefit) => (
                  <motion.div
                    key={benefit}
                    variants={item}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm text-ink/80 group-hover:text-ink transition-colors">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.15em] text-gold hover:text-gold/80 transition-colors"
                >
                  I'm in
                  <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 pt-10 border-t border-ink/10 text-center"
        >
          <p className="text-xs text-ink/60 font-light">
            No long-term commitment. Work when you want. Both paths: 90% split, zero fees, closing tools.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
