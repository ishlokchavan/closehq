'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EyeOff, Headphones, BookOpen, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const VALUES = [
  {
    icon: EyeOff,
    title: 'Anonymous, always.',
    body: 'Your name never enters the deal. iClose operates the transaction — you keep the client relationship and collect your commission. No exposure. No conflict.',
  },
  {
    icon: Headphones,
    title: 'Deal desk on every transaction.',
    body: "Submit a lead and get structured support from people who know Dubai's secondary market inside out. You focus on sourcing. We help you close.",
  },
  {
    icon: BookOpen,
    title: 'iClose Academy.',
    body: 'Area intelligence, development deep-dives, and community playbooks built by specialists active in the market right now. Not theory — the knowledge that actually moves deals.',
  },
  {
    icon: TrendingUp,
    title: 'Up to 100% commission.',
    body: 'Start at 60/40 for free. Upgrade your plan and keep more of every deal — all the way to 100%. The platform earns when you earn. That alignment is the point.',
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
          <Reveal>
            <h2 className="display-lg text-balance">
              Everything a top-tier brokerage offers. None of the politics.
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
