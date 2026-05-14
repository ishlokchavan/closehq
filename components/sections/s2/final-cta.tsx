'use client';

import { motion } from 'framer-motion';
import { LeadForm } from '@/components/lead-form';

export function S2FinalCTA() {
  return (
    <section id="apply" className="bg-black border-t border-white/10 py-20 sm:py-28 md:py-36 relative overflow-hidden">
      {/* Gold glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-accent/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gold-accent font-semibold text-sm mb-4 uppercase"
              style={{ letterSpacing: '0.08em' }}
            >
              Founding Cohort
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-black text-balance"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.94,
              }}
            >
              Founding members close first.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 text-white/45 leading-relaxed"
              style={{ fontSize: '1.125rem', letterSpacing: '-0.015em' }}
            >
              We're opening iClose to a select group before public launch. Partners who join now lock in founding terms — and get first access to the deal desk when we go live.
            </motion.p>

            {/* Trust bullets */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 space-y-3"
            >
              {[
                'Free to join — no card required',
                'Anonymous from day one',
                '60% commission on your first deal',
                'Founding terms locked in at signup',
              ].map((bullet) => (
                <div key={bullet} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-accent flex-shrink-0" />
                  <span className="text-white/50 text-sm" style={{ letterSpacing: '-0.01em' }}>{bullet}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-sm p-8 sm:p-10">
              <h3
                className="text-white font-black mb-1"
                style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}
              >
                Join as a Partner
              </h3>
              <p className="text-white/40 text-sm mb-8" style={{ letterSpacing: '-0.01em' }}>
                Free forever on Plus. Upgrade when you're ready.
              </p>

              {/* Wrapped lead form with dark overrides */}
              <div className="[&_input]:!bg-white/10 [&_input]:!border-white/15 [&_input]:!text-white [&_input:focus]:!border-white/40 [&_label]:!text-white/50">
                <LeadForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
