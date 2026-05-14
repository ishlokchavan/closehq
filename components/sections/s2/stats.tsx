'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '400+', label: 'Properties Profiled' },
  { value: '20+', label: 'Dubai Specialists' },
  { value: '18+', label: 'Communities Covered' },
  { value: '100%', label: 'Max Commission' },
];

export function S2Stats() {
  return (
    <section className="bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
            >
              <span
                className="text-white font-black"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                className="mt-2 text-white/40 font-medium text-sm"
                style={{ letterSpacing: '-0.01em' }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
