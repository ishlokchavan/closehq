'use client';

import { motion } from 'framer-motion';
import { EyeOff, Headphones, GraduationCap, TrendingUp } from 'lucide-react';

const FEATURES = [
  {
    icon: EyeOff,
    tag: 'Privacy',
    title: 'Anonymous, Always.',
    body: 'Your identity stays protected on every deal. iClose operates the legal layer — your name, your relationships, and your reputation remain entirely yours. No exposure, no conflict of interest.',
  },
  {
    icon: Headphones,
    tag: 'Support',
    title: 'Deal Desk on Every Transaction.',
    body: "Submit a lead and get structured support from specialists who know Dubai's secondary market inside out. You focus on sourcing. We help you close — every single time.",
  },
  {
    icon: GraduationCap,
    tag: 'Training',
    title: 'iClose Academy.',
    body: 'Area intelligence, development deep-dives, and community playbooks built by active market specialists. Not theory — the exact knowledge that moves deals in Dubai right now.',
  },
  {
    icon: TrendingUp,
    tag: 'Earnings',
    title: 'Up to 100% Commission.',
    body: 'Start at 60% on our free plan. Upgrade as your volume grows and keep more of every deal — all the way to 100%. The platform earns when you earn. That alignment is the entire point.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function S2Features() {
  return (
    <section id="features" className="bg-black py-20 sm:py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold-accent font-semibold text-sm mb-4 uppercase"
            style={{ letterSpacing: '0.08em' }}
          >
            Why iClose
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-black text-balance"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.038em',
              lineHeight: 0.96,
            }}
          >
            Everything a top-tier brokerage offers.{' '}
            <span className="text-white/30">None of the politics.</span>
          </motion.h2>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={item}
                className="bg-black p-10 sm:p-12 flex flex-col gap-5 group hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                    <Icon className="h-5 w-5 text-white/60" strokeWidth={1.5} />
                  </div>
                  <span className="text-white/30 text-xs font-semibold uppercase" style={{ letterSpacing: '0.1em' }}>
                    {f.tag}
                  </span>
                </div>
                <h3
                  className="text-white font-black"
                  style={{
                    fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-white/45 leading-relaxed"
                  style={{ fontSize: '1.0625rem', letterSpacing: '-0.012em' }}
                >
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
