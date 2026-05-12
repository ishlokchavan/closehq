'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const VALUES = [
  {
    title: 'Area knowledge.',
    body: "Deep dives into Dubai's most active residential areas — from Marina to Creek Harbour.",
  },
  {
    title: 'Building profiles.',
    body: 'Unit types, floor plans, price history, and view premiums for every major secondary tower.',
  },
  {
    title: 'Community intelligence.',
    body: 'The demand drivers and buying patterns that turn viewings into signed contracts.',
  },
  {
    title: 'Cluster mastery.',
    body: 'Spot micro-market moves within communities before clients — or competitors — do.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Value() {
  return (
    <section id="learn" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-2xl mb-14 md:mb-16">
            Everything you need to become the specialist.
          </h2>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {VALUES.map((v) => (
            <motion.div key={v.title} variants={item} className="card-mist p-8 sm:p-10">
              <h3 className="display-sm mb-3">{v.title}</h3>
              <p className="text-[17px] text-graphite-dark leading-[1.5]" style={{ letterSpacing: '-0.012em' }}>
                {v.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
