'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const GALLERY_ITEMS = [
  {
    // src: '/images/gallery-premium-development.jpg',
    src: '/images/gallery-premium_apt.jpg',
    alt: 'Modern luxury property development',
    title: 'Premium Developments',
    category: 'Off-Plan',
  },
  {
    src: '/images/gallery-waterfront.jpg',
    alt: 'Beachfront luxury properties',
    title: 'Waterfront Living',
    category: 'Luxury',
  },
  {
    src: '/images/gallery-urban-hub.jpg',
    alt: 'Modern residential tower',
    title: 'Urban Hubs',
    category: 'Premium',
  },
  {
    src: '/images/gallery-beachside.jpg',
    alt: 'Coastal property showcase',
    title: 'Beachside Assets',
    category: 'Coastal',
  },
  {
    src: '/images/gallery-community.jpg',
    alt: 'Community development',
    title: 'Integrated Communities',
    category: 'Communities',
  },
  {
    src: '/images/gallery-commercial.jpg',
    alt: 'Commercial real estate',
    title: 'Commercial Spaces',
    category: 'Commercial',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Gallery() {
  return (
    <section className="relative bg-white py-28 md:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-gradient-to-br from-gold/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <Reveal>
            <SectionLabel number="05" label="Markets we dominate" variant="light" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-8 text-ink text-balance">
              <span className="block">Excellence across</span>
              <span className="block bg-gradient-to-r from-gold via-gold/80 to-gold/60 bg-clip-text text-transparent">
                Dubai's premium segments
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-ink/70 max-w-lg font-light leading-relaxed">
              Transactions closed across all major Dubai markets. Confidentiality guaranteed.
            </p>
          </Reveal>
        </div>

        {/* Gallery Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {GALLERY_ITEMS.map((galleryItem) => (
            <motion.div
              key={galleryItem.title}
              variants={item}
              className="group relative h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <Image
                src={galleryItem.src}
                alt={galleryItem.alt}
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent group-hover:from-ink/90 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70 mb-2">
                    {galleryItem.category}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-light text-white mb-2">
                    {galleryItem.title}
                  </h3>
                  <div className="h-px w-0 group-hover:w-8 bg-gradient-to-r from-gold to-transparent transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-20 pt-12 border-t border-ink/10 text-center"
        >
          <p className="text-ink/70 text-lg mb-6">
            Transactions closed across every segment. All confidential.
            <a href="#apply" className="block mt-4 text-gold hover:text-gold/80 transition-colors font-medium">
              Start earning 90% →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
