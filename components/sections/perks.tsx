'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const PERKS = [
  {
    label: 'Yacht access',
    title: 'Bvlgari, Harbour, Canal.',
    body: 'Take prospects on the water. We coordinate vessel, captain, and concierge for serious viewings.',
    image: '/images/perks-yacht.jpg',
    alt: 'Luxury yacht moored in Dubai Harbour at golden hour',
  },
  {
    label: 'Chauffeur fleet',
    title: 'Rolls-Royce. Maybach.',
    body: 'Move buyers between off-plan showrooms and finished units in the way they expect.',
    image: '/images/perks-car.jpg',
    alt: 'Black luxury sedan in front of a Dubai high-rise',
  },
  {
    label: 'Stay & rentals',
    title: 'Furnished holiday homes.',
    body: 'Place out-of-town buyers in vetted short-term rentals so they can decide while living the lifestyle.',
    image: '/images/perks-apartment.jpg',
    alt: 'Modern Dubai apartment interior with skyline view',
  },
];

export function Perks() {
  return (
    <section id="perks" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20">
          <Reveal>
            <h2 className="display-lg text-balance">
              Tools to close at this level.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-6 max-w-2xl">
              Dubai buyers expect an experience, not just a viewing. Our agents get the same arsenal a top-tier brokerage would charge you for — included.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PERKS.map((perk, i) => (
            <motion.figure
              key={perk.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] rounded-apple overflow-hidden bg-mist">
                <Image
                  src={perk.image}
                  alt={perk.alt}
                  fill
                  loading={i < 2 ? 'eager' : 'lazy'}
                  fetchPriority={i < 2 ? 'high' : 'auto'}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5">
                <p className="text-sm font-medium text-graphite tracking-tight">
                  {perk.label}
                </p>
                <p className="display-sm mt-1">{perk.title}</p>
                <p
                  className="mt-3 text-[17px] text-graphite-dark leading-[1.5]"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  {perk.body}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
