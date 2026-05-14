'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { LeadForm } from '@/components/lead-form';

export function FinalCTA() {
  return (
    <section id="apply" className="relative overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src="/images/hero-palm.jpg"
          alt="Palm Jumeirah"
          fill
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/80" />
      </div>

      <div className="relative container-wide py-20 sm:py-24 md:py-32 lg:py-36">
        <div className="max-w-lg mx-auto text-center mb-12">
          <Reveal>
            <h2 className="display-lg text-white text-balance">Founding members close first.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="text-white/70 mt-5 text-[18px] sm:text-[20px] leading-[1.4] max-w-sm mx-auto"
              style={{ letterSpacing: '-0.015em' }}
            >
              We're opening iClose to a select group before public launch. The agents who join now lock in founding terms — and get first access to the deal desk when we go live.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-apple p-6 sm:p-8 md:p-10 shadow-elevated">
            <LeadForm />
            <p className="mt-5 text-center text-[13px] text-graphite tracking-tight">
              No spam. You're joining as a Plus member — free, no card required.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
