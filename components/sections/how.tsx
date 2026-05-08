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
    body: 'Buyer signs, commission clears, payout triggers. You keep up to 100% of your share, paid within 24 hours.',
  },
];

export function How() {
  return (
    <section id="how" className="bg-mist py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20">
          <Reveal>
            <h2 className="display-lg text-balance">
              Three steps from lead to payout.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-surface p-8 sm:p-10 md:p-12"
            >
              <div className="display-md text-graphite-light font-display mb-8">
                {step.number}
              </div>
              <h3 className="display-sm">{step.title}</h3>
              <p
                className="mt-4 text-[17px] text-graphite-dark leading-[1.5]"
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
