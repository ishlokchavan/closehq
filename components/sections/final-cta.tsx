'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { LeadForm } from '@/components/lead-form';

export function FinalCTA() {
  return (
    <section id="apply" className="relative overflow-hidden" style={{ minHeight: 'calc(100vh - 48px)' }}>

      <div className="absolute inset-0">
        <Image
          src="/images/hero-palm.jpg"
          alt="Palm Jumeirah"
          fill
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative container-wide flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20 py-20 lg:py-0" style={{ minHeight: 'calc(100vh - 48px)' }}>

        {/* Left: heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          <h2
            className="text-white font-display font-semibold text-balance leading-[1.05]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '-0.03em' }}
          >
            Join the<br />community.
          </h2>
          <p className="mt-6 text-white/55 text-[17px] leading-[1.55] max-w-xs" style={{ letterSpacing: '-0.012em' }}>
            Free to join. No card required. You can apply as a Specialist separately.
          </p>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[420px] shrink-0"
        >
          <div className="bg-white rounded-apple p-6 sm:p-8 shadow-elevated">
            <LeadForm />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
