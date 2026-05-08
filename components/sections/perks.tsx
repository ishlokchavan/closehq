'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const PERKS = [
  {
    label: 'Yacht access',
    title: 'Bvlgari, Dubai Harbour, Canal',
    body: 'Take prospects on the water. We coordinate vessel, captain, and concierge for serious viewings.',
    image: '/images/perks-yacht.jpg',
    alt: 'Luxury yacht moored in Dubai Harbour at golden hour',
  },
  {
    label: 'Chauffeur fleet',
    title: 'Rolls-Royce & Maybach pickup',
    body: 'Move buyers between off-plan showrooms and finished units in the way they expect to be moved.',
    image: '/images/perks-car.jpg',
    alt: 'Black luxury sedan parked in front of a Dubai high-rise',
  },
  {
    label: 'Stay & rental support',
    title: 'Furnished holiday homes',
    body: 'Place out-of-town buyers in vetted short-term rentals so they can decide while living the lifestyle.',
    image: '/images/perks-apartment.jpg',
    alt: 'Modern Dubai apartment interior with skyline view',
  },
];

export function Perks() {
  return (
    <section id="perks" className="bg-ink-800 py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel number="08" label="The closing kit" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-6 text-bone text-balance">
              Tools to close
              <br />
              <span className="italic font-normal text-gold">at this level.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-bone/60 text-pretty">
              Dubai buyers expect an experience, not just a viewing. Our agents
              get access to the same arsenal a top-tier brokerage would charge
              you for — included, on deal terms.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PERKS.map((perk, i) => (
            <motion.article
              key={perk.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden bg-ink-700"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={perk.image}
                  alt={perk.alt}
                  fill
                  loading={i < 2 ? 'eager' : 'lazy'}
                  fetchPriority={i < 2 ? 'high' : 'auto'}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
                />
                <div className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold bg-ink/70 backdrop-blur px-3 py-1.5 border border-gold/30">
                  {perk.label}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <h3 className="font-display text-xl md:text-2xl text-bone font-light tracking-tight">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm text-bone/70 leading-relaxed">
                    {perk.body}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
