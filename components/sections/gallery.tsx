'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';

const GALLERY_ITEMS = [
  { src: '/images/gallery-premium_apt.jpg', alt: 'Premium developments', title: 'Premium Developments', category: 'Off-Plan' },
  { src: '/images/gallery-waterfront.jpg', alt: 'Waterfront living', title: 'Waterfront Living', category: 'Luxury' },
  { src: '/images/gallery-urban-hub.jpg', alt: 'Urban hubs', title: 'Urban Hubs', category: 'Premium' },
  { src: '/images/gallery-beachside.webp', alt: 'Beachside assets', title: 'Beachside Assets', category: 'Coastal' },
  { src: '/images/gallery-community.webp', alt: 'Integrated communities', title: 'Integrated Communities', category: 'Communities' },
  { src: '/images/gallery-commercial.webp', alt: 'Commercial spaces', title: 'Commercial Spaces', category: 'Commercial' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Gallery() {
  return (
    <section className="bg-mist py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Reveal>
            <h2 className="display-lg text-balance">
              Across every Dubai segment.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-6 mx-auto max-w-2xl">
              Transactions closed across all major Dubai markets. Names withheld — confidentiality guaranteed.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {GALLERY_ITEMS.map((g) => (
            <motion.figure key={g.title} variants={item} className="group">
              <div className="relative aspect-[4/5] rounded-apple overflow-hidden bg-paper">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
              <figcaption className="mt-5">
                <p className="text-sm font-medium text-graphite tracking-tight">
                  {g.category}
                </p>
                <p className="display-sm mt-1">{g.title}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
