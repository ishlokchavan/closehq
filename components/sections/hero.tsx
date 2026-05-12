'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const AREAS = [
  { src: '/images/hero-burj.jpg', alt: 'Dubai skyline' },
  { src: '/images/hero-palm.jpg', alt: 'Palm Jumeirah' },
  { src: '/images/hero-night.jpg', alt: 'Dubai Creek at night' },
];

const STATS = [
  { value: '400+', label: 'Properties covered' },
  { value: '20+', label: 'Specialist instructors' },
  { value: 'Secondary', label: 'Market focus' },
];

export function Hero() {
  return (
    <section className="relative bg-paper pt-12">
      <div className="container-wide pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-balance"
        >
          <span className="block">Know every property.</span>
          <span className="block">Close every deal.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 sm:mt-6 subhead text-balance max-w-xl mx-auto px-2"
        >
          Most people lose deals to specialists. iClose makes you one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex items-center justify-center gap-6 flex-wrap"
        >
          <a
            href="#apply"
            onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
            className="applelink-lg"
          >
            Get early access
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a href="#how" className="applelink-lg">
            How it works
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>

      <div className="container-wide pb-0">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {AREAS.map((area, i) => (
            <motion.div
              key={area.alt}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-apple aspect-[2/3] sm:aspect-[3/4]"
            >
              <Image
                src={area.src}
                alt={area.alt}
                fill
                priority={i === 0}
                quality={80}
                sizes="(max-width: 768px) 33vw, 400px"
                className="object-cover object-center scale-[1.02] hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container-wide py-12 sm:py-14 md:py-20">
        <div className="grid grid-cols-3 divide-x divide-hairline">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="px-4 sm:px-8 text-center"
            >
              <div className="display-md text-ink">{stat.value}</div>
              <div className="mt-1.5 text-sm text-graphite" style={{ letterSpacing: '-0.01em' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
