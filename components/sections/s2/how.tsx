'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Join and pick your tier.',
    body: 'Sign up free as a Plus member. Start anonymous, access the deal desk, and keep 60% of every deal from day one. Upgrade at any time.',
  },
  {
    number: '02',
    title: 'Submit leads. Work the desk.',
    body: "Bring your deals to the iClose deal desk. Our specialists guide you through structuring, negotiation, and close — without ever revealing your identity.",
  },
  {
    number: '03',
    title: 'Collect when the buyer signs.',
    body: 'Commission is structured at signing. No chasing, no delays, no politics. You sourced it — you get paid for it.',
  },
];

export function S2How() {
  return (
    <section id="how" className="bg-[#0d0d0d] py-20 sm:py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gold-accent font-semibold text-sm mb-4 uppercase"
          style={{ letterSpacing: '0.08em' }}
        >
          How It Works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black text-balance mb-16 md:mb-20"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
            letterSpacing: '-0.038em',
            lineHeight: 0.96,
            maxWidth: '20ch',
          }}
        >
          Simple by design.
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0d0d0d] p-10 sm:p-12 flex flex-col gap-6 hover:bg-white/[0.025] transition-colors"
            >
              <span
                className="font-black text-white/10"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {step.number}
              </span>
              <div>
                <h3
                  className="text-white font-black mb-4"
                  style={{
                    fontSize: 'clamp(1.3rem, 2vw, 1.75rem)',
                    letterSpacing: '-0.028em',
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-white/45 leading-relaxed"
                  style={{ fontSize: '1.0625rem', letterSpacing: '-0.012em' }}
                >
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
