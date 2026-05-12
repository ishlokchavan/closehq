'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const TESTIMONIALS = [
  {
    initials: 'S.A.',
    role: 'Marina Specialist',
    quote: 'Went from generic agent to area specialist in 6 weeks. Nothing else like this exists in Dubai.',
  },
  {
    initials: 'K.R.',
    role: 'JVC Expert',
    quote: 'Finally a platform that teaches what actually closes deals in the secondary market.',
  },
  {
    initials: 'M.T.',
    role: 'Downtown Agent',
    quote: 'The building profiles alone are worth it. I walk into every viewing knowing every unit.',
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
            What early members say.
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
