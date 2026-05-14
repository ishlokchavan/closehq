'use client';

import { motion } from 'framer-motion';

export function S2GrowthEngine() {
  return (
    <section id="membership" className="bg-cream py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-lime-text font-semibold text-xs uppercase mb-5"
              style={{ letterSpacing: '0.12em' }}
            >
              Your Growth Engine
            </p>
            <h2
              className="font-serif text-[#1A1A1A] text-balance"
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 3rem)',
                lineHeight: 1.18,
              }}
            >
              With over AED 800M in referrals and a network built on discretion, iClose empowers Dubai agents to deliver results that define the standard.
            </h2>
          </motion.div>

          {/* Right: description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="pt-0 lg:pt-10"
          >
            <p
              className="text-sellit-muted leading-relaxed"
              style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em' }}
            >
              Trusted by agents across 18+ Dubai communities, iClose is the city's independent brokerage platform. Designed for ambitious agents determined to close on their own terms, iClose combines anonymous deal-desk support, live coaching, and iClose Academy — all in one place.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: '400+', label: 'Properties profiled' },
                { value: '20+', label: 'Dubai specialists' },
                { value: '18+', label: 'Communities' },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="font-display font-extrabold text-[#1A1A1A]"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    {s.value}
                  </p>
                  <p className="text-sellit-muted text-sm mt-1" style={{ letterSpacing: '-0.005em' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
