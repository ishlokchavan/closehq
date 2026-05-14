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
            <h2 className="display-lg text-white text-balance">Join the community.</h2>
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
              Free to join. No card required. You can apply as a Specialist separately.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
