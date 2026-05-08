'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const VALUES = [
  {
    figure: 'Up to 100%.',
    title: 'Commission to you.',
    body: 'Industry-leading splits, all the way to a true 100% on Atelier. No hidden cuts, no surprises at month-end.',
  },
  {
    figure: '24 hours.',
    title: 'Paid when buyer signs.',
    body: 'The moment the buyer commits, your commission lands. Same-day settlement, up to 90/10 advance.',
  },
  {
    figure: 'Anonymous.',
    title: 'Always private.',
    body: 'Your name, your buyers, and your pipeline are never visible to anyone outside the desk. Ever.',
  },
  {
    figure: 'AED 0.',
    title: 'Free to start.',
    body: 'Test the platform on the Starter tier with zero monthly cost. Upgrade only when you’re closing.',
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
    <section id="commission" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-32">
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
              className="card-mist p-8 sm:p-10 md:p-12"
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
