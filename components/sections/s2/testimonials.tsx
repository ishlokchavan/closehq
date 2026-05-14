'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: 'I was doing AED 8M a month and keeping half of it. Now I keep 80% and no one on the buyer side knows who I work under. That is not a small thing.',
    name: 'S.A.',
    role: 'Independent Broker, Dubai',
  },
  {
    quote: "The deal desk is what sold me. I had a complex transaction — two buyers, a motivated seller, a tight timeline. The support I got would have cost me a full partnership at any other firm.",
    name: 'K.R.',
    role: 'Agent, Secondary Market',
  },
  {
    quote: 'I spent three years building a client book at a brokerage I then had to leave behind. On iClose, those relationships are mine. Full stop.',
    name: 'M.T.',
    role: 'Broker, 6 Years in Dubai',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function S2Testimonials() {
  return (
    <section className="relative bg-black py-20 sm:py-28 md:py-36 overflow-hidden border-t border-white/10">

      {/* Subtle background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-burj.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.05, filter: 'saturate(0)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gold-accent font-semibold text-sm mb-4 uppercase"
            style={{ letterSpacing: '0.08em' }}
          >
            Agent Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-black"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              letterSpacing: '-0.038em',
              lineHeight: 0.96,
              maxWidth: '18ch',
            }}
          >
            Agents who made the switch.
          </motion.h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={item}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 sm:p-10 hover:bg-white/[0.07] hover:border-white/20 transition-all"
            >
              {/* Quote mark */}
              <span
                className="text-gold-accent font-black mb-6 leading-none"
                style={{ fontSize: '3.5rem', letterSpacing: '-0.04em', lineHeight: 1 }}
              >
                "
              </span>
              <blockquote
                className="text-white font-semibold leading-snug flex-1"
                style={{
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.375rem)',
                  letterSpacing: '-0.022em',
                  lineHeight: 1.35,
                }}
              >
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-white/50">{t.name.split('.')[0]}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold" style={{ letterSpacing: '-0.01em' }}>{t.name}</p>
                  <p className="text-white/35 text-xs mt-0.5" style={{ letterSpacing: '-0.005em' }}>{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
