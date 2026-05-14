'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const TESTIMONIALS = [
  {
    initials: 'S.A.',
    role: 'Independent broker, Dubai',
    quote: 'I was doing AED 8M a month and keeping half of it. Now I keep 80% and no one on the buyer side knows who I work under. That is not a small thing.',
  },
  {
    initials: 'K.R.',
    role: 'Agent, secondary market',
    quote: "The deal desk is what sold me. I had a complex transaction — two buyers, a motivated seller, a tight timeline. The support I got would have cost me a partnership at any other firm.",
  },
  {
    initials: 'M.T.',
    role: 'Broker, 6 years in Dubai',
    quote: 'I spent three years building a client book at a brokerage I then had to leave behind. On iClose, those relationships are mine. Full stop.',
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
    <section className="relative bg-neutral-950 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src="/images/hero-burj.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 to-neutral-950" />
      </div>

      <div className="relative container-wide">
        <Reveal>
          <h2 className="display-lg text-white text-balance max-w-xl mb-14 md:mb-16">
            Agents who made the switch.
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
            <motion.figure
              key={t.initials}
              variants={item}
              className="rounded-apple border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10 flex flex-col"
            >
              <blockquote
                className="display-sm text-white leading-[1.3] text-balance flex-1"
              >
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10">
                  <span className="text-[12px] font-medium text-white/60">{t.initials}</span>
                </div>
                <span className="text-sm text-white/40 tracking-tight">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
