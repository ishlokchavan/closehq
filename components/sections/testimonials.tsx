'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const TESTIMONIALS = [
  {
    initials: 'A.M.',
    location: 'Off-Plan Specialist',
    quote: 'Switched six months ago. Earnings nearly doubled. Keeping the full commission is game-changing.',
  },
  {
    initials: 'F.A.',
    location: 'Independent Broker',
    quote: 'No desk fees. Paid the moment the buyer signs. This is what brokers in Dubai have been waiting for.',
  },
  {
    initials: 'M.H.',
    location: 'Senior Agent',
    quote: 'Smooth platform, reliable payouts, excellent support. Worth the switch.',
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

export function Testimonials() {
  return (
    <section className="bg-paper py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20">
          <Reveal>
            <h2 className="display-lg text-balance">
              What brokers say.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-6 max-w-2xl">
              500+ brokers already earning more. A few of them, in their own words.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.initials}
              variants={item}
              className="card-mist p-8 sm:p-10 md:p-12 flex flex-col"
            >
              <blockquote
                className="display-sm text-ink leading-[1.25] text-balance"
              >
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto pt-10 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper border border-hairline">
                  <span className="text-[13px] font-medium text-ink">
                    {t.initials}
                  </span>
                </div>
                <span className="text-sm font-medium text-graphite-dark tracking-tight">
                  {t.location}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 md:mt-20 grid grid-cols-3 gap-6 text-center max-w-2xl mx-auto"
        >
          <Stat value="500+" label="Brokers earning" />
          <Stat value="4.9★" label="Platform rating" />
          <Stat value="+150%" label="Avg earnings lift" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="display-md text-ink">{value}</div>
      <div className="mt-1 text-sm text-graphite tracking-tight">{label}</div>
    </div>
  );
}
