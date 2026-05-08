'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { whatsappLink } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

const HERO_IMAGE = '/images/hero-luxury.jpg';

export function Hero() {
  return (
    <section className="relative bg-paper pt-12">
      {/* Apple-style centered headline block */}
      <div className="container-wide pt-20 md:pt-28 pb-10 md:pb-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-balance"
        >
          CloseHQ.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 display-sm text-graphite-dark text-balance max-w-3xl mx-auto"
        >
          Keep 90% of your commission. Get paid in 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex items-center justify-center gap-7 flex-wrap"
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

      {/* Full-bleed hero image — Apple product shot style */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full aspect-[16/9] md:aspect-[2.4/1] overflow-hidden"
      >
        <Image
          src={HERO_IMAGE}
          alt="Dubai luxury skyline"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Stat strip — three numbers, Apple's "spec showcase" pattern */}
      <div className="container-wide py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center md:text-left">
          {[
            { value: '90%', label: 'Commission to you' },
            { value: '24h', label: 'Payout after SPA' },
            { value: 'AED 0', label: 'Monthly fees' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="md:px-8 md:border-l md:border-hairline first:md:border-l-0"
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
