'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const AREAS = [
  { src: '/images/hero-burj.jpg', label: 'Downtown Dubai', sub: 'Burj Khalifa · Opera District' },
  { src: '/images/hero-palm.jpg', label: 'Palm Jumeirah', sub: 'Palm · JBR · Marina' },
  { src: '/images/hero-night.jpg', label: 'Dubai Creek', sub: 'Creek Harbour · Ras Al Khor' },
];

const STATS = [
  { value: '400+', label: 'Buildings covered' },
  { value: '20+', label: 'Specialist instructors' },
  { value: 'Secondary', label: 'Market focus' },
];

export function Hero() {
  return (
    <section className="relative bg-paper pt-12">
      {/* Text block */}
      <div className="container-wide pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-balance"
        >
          <span className="block">Know every building.</span>
          <span className="block">Close every deal.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 sm:mt-6 subhead text-balance max-w-xl mx-auto px-2"
        >
          The learning platform for Dubai’s secondary market. Built by specialists, for specialists.
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

      {/* Area image grid */}
      <div className="container-wide pb-0">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {AREAS.map((area, i) => (
            <motion.div
              key={area.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-apple aspect-[2/3] sm:aspect-[3/4]"
            >
              <Image
                src={area.src}
                alt={area.label}
                fill
                priority={i === 0}
                quality={80}
                sizes="(max-width: 768px) 33vw, 400px"
                className="object-cover object-center scale-[1.02] hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 md:p-5">
                <p className="text-white font-medium text-[12px] sm:text-[14px] md:text-[15px] leading-tight" style={{ letterSpacing: '-0.01em' }}>
                  {area.label}
                </p>
                <p className="text-white/60 text-[10px] sm:text-[12px] mt-0.5 hidden sm:block" style={{ letterSpacing: '-0.008em' }}>
                  {area.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stat strip */}
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
