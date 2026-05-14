'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function S2Hero() {
  return (
    <section className="bg-white">
      {/* Above-fold intro strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left spacer on desktop */}
          <div className="hidden md:block md:w-1/2" />

          {/* Right: intro text + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 max-w-sm"
          >
            <p className="text-[13px] text-sellit-muted leading-relaxed mb-5" style={{ letterSpacing: '-0.005em' }}>
              Learn from the specialists behind Dubai's secondary market, and transform your business with proven deal-desk support, commission structures, and area intelligence for any level agent.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#apply"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-lime text-[#1A1A1A] text-sm font-semibold hover:bg-lime-dark transition-all"
                style={{ letterSpacing: '-0.01em' }}
              >
                Explore Membership →
              </a>
              <a
                href="#plans"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#C5C0BA] text-[#1A1A1A] text-sm font-medium hover:border-[#1A1A1A] transition-all"
                style={{ letterSpacing: '-0.01em' }}
              >
                Explore Plans →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero image with text overlay */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 55vw, 680px)' }}>
        <Image
          src="/images/hero-night.jpg"
          alt="Dubai real estate"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

        {/* Headline overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14"
        >
          <h1
            className="text-white font-display font-extrabold leading-none text-balance max-w-4xl"
            style={{
              fontSize: 'clamp(2.2rem, 6.5vw, 5.5rem)',
              letterSpacing: '-0.035em',
              lineHeight: 0.95,
            }}
          >
            Real estate training for Dubai's most relentless agents
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
