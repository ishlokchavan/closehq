'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { whatsappLink } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

// Three Dubai-coded shots that cycle: villa, waterfront, skyline
const HERO_IMAGES = [
  { src: '/images/property-villa.jpg', alt: 'Modern Dubai villa on the Palm' },
  { src: '/images/property-beachfront.jpg', alt: 'Dubai waterfront residence' },
  { src: '/images/property-downtown.jpg', alt: 'Dubai skyline with Burj Khalifa' },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-paper pt-12">
      <div className="container-wide pt-16 sm:pt-20 md:pt-28 pb-8 sm:pb-10 md:pb-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-balance"
        >
          <span className="block">Earn up to 100%.</span>
          <span className="block">Paid within 24h.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 sm:mt-6 subhead text-balance max-w-2xl mx-auto px-2"
        >
          Dubai’s broker platform. Keep more of your commission, get paid faster, and stay completely anonymous.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex items-center justify-center gap-5 sm:gap-7 flex-wrap"
        >
          <a
            href="#apply"
            onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
            className="applelink-lg"
          >
            Apply now
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'hero_secondary' })}
            className="applelink-lg"
          >
            Talk to us
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>

      {/* Full-bleed rotating Dubai imagery */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.4/1] overflow-hidden bg-mist">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[index].src}
              alt={HERO_IMAGES[index].alt}
              fill
              priority={index === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={
                'h-1.5 rounded-full transition-all duration-500 ' +
                (i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70')
              }
            />
          ))}
        </div>
      </div>

      {/* Stat strip */}
      <div className="container-wide py-14 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
          {[
            { value: 'Up to 100%', label: 'Commission to you' },
            { value: '24h', label: 'Payout when buyer signs' },
            { value: 'Anonymous', label: 'Always private' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="py-8 md:py-0 md:px-6 lg:px-8 text-center md:text-left first:pt-0 last:pb-0"
            >
              <div className="display-md text-ink">{stat.value}</div>
              <div className="mt-2 text-base text-graphite" style={{ letterSpacing: '-0.01em' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
