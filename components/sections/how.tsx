'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const STEPS = [
  {
    number: '1',
    title: 'Bring your deal.',
    body: 'A buyer, a unit, a tip — anything from a casual lead to a signed reservation. Send it through the agent desk.',
  },
  {
    number: '2',
    title: 'We structure & support.',
    body: 'Developer relations, paperwork, RERA-side compliance, viewings, yacht and chauffeur experiences — we handle the production.',
  },
  {
    number: '3',
    title: 'You close & earn.',
    body: 'SPA signed, commission cleared, payout triggered. You keep the lion’s share, and the lifetime value of your network.',
  },
];

export function How() {
  return (
    <section id="how" className="bg-ink text-white py-24 md:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20">
          <Reveal>
            <h2 className="display-lg text-balance text-white">
              Three steps from lead to payout.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-apple overflow-hidden">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-ink p-10 md:p-12"
            >
              <div className="display-md text-white/30 font-display mb-8">
                {step.number}
              </div>
              <h3 className="display-sm text-white">{step.title}</h3>
              <p
                className="mt-4 text-[17px] text-white/70 leading-[1.5]"
                style={{ letterSpacing: '-0.012em' }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
