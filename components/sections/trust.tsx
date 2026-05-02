'use client';

import { motion } from 'framer-motion';

const TRUST_ITEMS = [
  'Off-Plan Specialists',
  'Emaar · Damac · Sobha',
  'Palm Jumeirah · Downtown · Marina',
  'RERA Compliant',
  'Advance on SPA',
  'Multilingual Support',
  'Yacht & Chauffeur Concierge',
  'Verified Buyers Only',
];

export function Trust() {
  return (
    <section
      aria-label="Trusted by Dubai's deal makers"
      className="relative bg-gradient-to-r from-ink via-ink/95 to-ink border-y border-gold/10 py-10 md:py-12 overflow-hidden"
    >
      {/* Subtle accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 pointer-events-none" />

      <div className="container-x relative mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-bone/50"
        >
          <span className="h-px w-6 md:w-8 bg-gold/30" />
          <span className="text-gold/70">Trusted by 500+ Elite Brokers</span>
          <span className="h-px w-6 md:w-8 bg-gold/30" />
        </motion.div>
      </div>

      <div className="relative mask-fade-x overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 md:gap-16 whitespace-nowrap will-change-transform"
          aria-hidden
        >
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-12 md:gap-16 font-display text-base md:text-lg text-bone/60 hover:text-bone/80 font-light tracking-tight transition-colors duration-300"
            >
              <span className="shrink-0">{item}</span>
              <span className="text-gold/30">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
