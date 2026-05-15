'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

const TESTIMONIALS = [
  {
    initials: 'T.M.',
    role: 'Secondary Market Agent',
    quote:
      'I spent four years in new developments and knew nothing about the secondary market. Six months with iClose and I can walk into any conversation about JVC, Dubai Hills, or Business Bay and hold my own. That is what the content here does.',
  },
  {
    initials: 'F.A.',
    role: 'Private Client Adviser',
    quote:
      "One of my clients had a very specific brief — Business Bay, high floor, direct canal view, quick transfer. I posted the requirement to the community. Within 24 hours a Specialist came back with three matching units. That is a network you cannot build overnight.",
  },
  {
    initials: 'K.R.',
    role: 'Downtown Dubai Specialist',
    quote:
      'I used to rely on brokers I barely knew to move my units. Now I have a community of professionals who know exactly what I specialise in. When they have a buyer for Downtown, they call me first.',
  },
];

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <figure className="rounded-apple border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10 flex flex-col h-full">
      <blockquote className="display-sm text-white leading-[1.3] text-balance flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10">
          <span className="text-[12px] font-medium text-white/60">{t.initials}</span>
        </div>
        <span className="text-sm text-white/40 tracking-tight">{t.role}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const cards = TESTIMONIALS.map((t) => <TestimonialCard key={t.initials} t={t} />);

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
            Three roles. One community. All winning.
          </h2>
        </Reveal>

        {/* Mobile carousel */}
        <MobileCarousel
          items={cards}
          className="md:hidden"
          ariaLabel="Testimonials"
          dark
        />

        {/* Desktop grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.08 }}
          className="hidden md:grid grid-cols-3 gap-4"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.initials} variants={item}>
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
