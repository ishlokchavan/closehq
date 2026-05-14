'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const STATS = [
  { value: '400+', label: 'Properties profiled' },
  { value: '20+', label: 'Dubai specialists' },
  { value: '18+', label: 'Communities covered' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-night.jpg"
          alt="Dubai at night"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
      </motion.div>

      <div className="relative flex-1 flex flex-col items-center justify-center container-wide text-center pt-28 pb-12">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 flex justify-center"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-[12px] text-white/80"
            style={{ letterSpacing: '-0.01em' }}
          >
            Founding cohort open · Dubai secondary market
          </span>
        </motion.div>

        <h1 className="display-xl text-white text-balance">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Close deals.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Keep your split.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-white/80 text-[18px] sm:text-[20px] leading-[1.45] text-balance max-w-lg mx-auto px-2"
          style={{ letterSpacing: '-0.015em' }}
        >
          iClose is Dubai's independent brokerage platform — anonymous identity, deal desk support, and up to 100% commission for agents who are done splitting 50/50.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex items-center justify-center gap-5 flex-wrap"
        >
          <a
            href="#apply"
            onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-ink text-[15px] font-medium hover:bg-white/90 transition-colors"
            style={{ letterSpacing: '-0.01em' }}
          >
            Join as a Partner
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[15px]"
            style={{ letterSpacing: '-0.01em' }}
          >
            How it works
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative border-t border-white/10 bg-black/35 backdrop-blur-md"
      >
        <div className="container-wide grid grid-cols-3 divide-x divide-white/10 py-7 sm:py-9">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center px-4 sm:px-8">
              <div className="display-md text-white">{stat.value}</div>
              <div className="mt-1.5 text-[13px] text-white/50" style={{ letterSpacing: '-0.01em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
