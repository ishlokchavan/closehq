'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const TESTIMONIALS = [
  {
    initials: 'S.A.',
    role: 'Marina Specialist',
    quote: 'Six weeks in, I stopped guessing and started knowing. Clients started asking for me by name. That had never happened before.',
  },
  {
    initials: 'K.R.',
    role: 'JVC Expert',
    quote: "Three years as an agent and I didn't know half of what the first module taught me. iClose taught me things my agency never did.",
  },
  {
    initials: 'M.T.',
    role: 'Downtown Agent',
    quote: "I walked into a viewing with floor-specific price data my client hadn't seen anywhere. We signed the same day.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Testimonials() {
  return (
    <section className="bg-mist py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-xl mb-14 md:mb-16">
            From agents who got in first.
          </h2>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure key={t.initials} variants={item} className="card-surface p-8 sm:p-10 flex flex-col">
              <blockquote className="display-sm text-ink leading-[1.3] text-balance flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mist border border-hairline">
                  <span className="text-[12px] font-medium text-ink">{t.initials}</span>
                </div>
                <span className="text-sm text-graphite-dark tracking-tight">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
