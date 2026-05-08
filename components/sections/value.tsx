'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const VALUES = [
  {
    figure: '90%',
    title: 'Commission to you.',
    body: 'Industry-leading splits for high performers. No hidden cuts, no desk fees, no surprises at month-end.',
  },
  {
    figure: 'Instant.',
    title: 'Advance on SPA.',
    body: 'Get paid the moment the SPA is signed. No waiting on developer cycles or escrow delays.',
  },
  {
    figure: '24h.',
    title: 'Fast payouts.',
    body: 'Cleared SPAs trigger same-day settlement. Typical turnaround under two business days.',
  },
  {
    figure: 'AED 0.',
    title: 'Monthly fees.',
    body: 'Zero desk fees, zero licensing charges, zero monthly drag. You only pay when you win.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Value() {
  return (
    <section id="commission" className="bg-paper py-24 md:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20">
          <Reveal>
            <h2 className="display-lg text-balance">
              Economics built around the broker.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-6 max-w-2xl">
              Traditional brokerages were built when agents needed offices, licenses, and phone books. We stripped the overhead and passed the savings back to you.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {VALUES.map((value) => (
            <motion.div
              key={value.title}
              variants={item}
              className="card-mist p-10 md:p-12"
            >
              <div className="display-md text-ink mb-5">{value.figure}</div>
              <h3 className="display-sm mb-3">{value.title}</h3>
              <p className="text-[17px] text-graphite-dark leading-[1.5] max-w-md" style={{ letterSpacing: '-0.012em' }}>
                {value.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
