'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { LeadForm } from '@/components/lead-form';

export function FinalCTA() {
  return (
    <section id="apply" className="bg-mist py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <div className="max-w-lg mx-auto text-center mb-12">
          <Reveal>
            <h2 className="display-lg text-balance">Founding access. Before anyone else.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-4 max-w-sm mx-auto">
              We're releasing founding spots before launch. Once they're gone, early pricing closes with them.
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
          <div className="card-surface p-6 sm:p-8 md:p-10">
            <LeadForm />
            <p className="mt-5 text-center text-[13px] text-graphite tracking-tight">
              No spam. Unsubscribe any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
