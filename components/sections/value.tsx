'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Building2, Users, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const VALUES = [
  {
    icon: MapPin,
    title: 'Area knowledge.',
    body: "Every major Dubai community mapped to what actually drives it — demand patterns, price bands, the dynamics that move people to act. Understanding, not just information.",
  },
  {
    icon: Building2,
    title: 'Development intelligence.',
    body: 'Per-development depth: unit types, floor premiums, view differentials, price history. The difference between knowing a development exists and truly knowing everything about it.',
  },
  {
    icon: Users,
    title: 'Community intelligence.',
    body: "Dubai's communities each move to their own logic. The demand drivers, seasonal patterns, and buyer profiles that separate a well-timed move from a lucky one.",
  },
  {
    icon: TrendingUp,
    title: 'Cluster mastery.',
    body: "Inside Dubai's major communities live micro-markets most outsiders never see. The ones who understand them early become the ones others turn to for their read.",
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
    <section id="learn" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      <div className="container-wide">

        {/* Headline left + image right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
          <Reveal>
            <h2 className="display-lg text-balance">
              What the most trusted voices on Dubai real estate actually know.
            </h2>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-apple aspect-[4/3]"
          >
            <Image
              src="/images/hero-burj.jpg"
              alt="Dubai skyline"
              fill
              quality={80}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent" />
          </motion.div>
        </div>

        {/* Value cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} variants={item} className="card-mist p-8 sm:p-10">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper border border-hairline mb-6">
                  <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                </div>
                <h3 className="display-sm mb-3">{v.title}</h3>
                <p className="text-[17px] text-graphite-dark leading-[1.5]" style={{ letterSpacing: '-0.012em' }}>
                  {v.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
