'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const STEPS = [
  {
    number: '01',
    title: 'Bring your deal',
    body: 'A buyer, a unit, a tip — anything from a casual lead to a signed reservation. Send it to us through the agent desk.',
    keyword: 'Lead in',
  },
  {
    number: '02',
    title: 'We structure & support',
    body: 'Developer relations, paperwork, RERA-side compliance, viewings, yacht/chauffeur experiences — we handle the production.',
    keyword: 'We close beside you',
  },
  {
    number: '03',
    title: 'You close & earn',
    body: 'SPA signed, commission cleared, payout triggered. You get the lion\u2019s share, and the lifetime value of your network.',
    keyword: 'Cash out',
  },
];

export function How() {
  return (
    <section id="how" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      {/* Decorative gold gradient blob */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel number="06" label="How it works" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-6 text-bone text-balance">
              Three steps from
              <br />
              <span className="italic font-normal text-gold">lead to payout.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-bone/10 border border-bone/10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-ink p-8 md:p-10 hover:bg-ink-800 transition-colors duration-500"
            >
              <div className="font-display text-7xl md:text-8xl font-light text-bone/10 group-hover:text-gold/30 transition-colors duration-700 leading-none">
                {step.number}
              </div>

              <div className="mt-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                  {step.keyword}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light text-bone tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-4 text-bone/60 leading-relaxed">{step.body}</p>
              </div>

              {/* Connector line for desktop */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:block absolute top-12 right-0 translate-x-1/2 h-px w-12 bg-gradient-to-r from-gold/40 to-transparent"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
