'use client';

import { motion } from 'framer-motion';
import { MapPin, Building2, Users, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const VALUES = [
  {
    icon: MapPin,
    title: 'Area knowledge.',
    body: "Every Dubai residential area, broken down to what drives decisions — demand patterns, price bands, and what actually moves buyers to sign.",
  },
  {
    icon: Building2,
    title: 'Building profiles.',
    body: 'Per-tower data: unit types, floor differentials, view premiums, and price history. Walk into every viewing already knowing what others have to look up.',
  },
  {
    icon: Users,
    title: 'Community intelligence.',
    body: 'The local dynamics, seasonal patterns, and demand triggers that turn casual viewings into same-day offers.',
  },
  {
    icon: TrendingUp,
    title: 'Cluster mastery.',
    body: "Dubai's communities contain micro-markets that move independently. Spot them early. Your clients act on your intelligence — not someone else's.",
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
            What separates Dubai's top 10% from everyone else.
          </h2>
        </Reveal>

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
