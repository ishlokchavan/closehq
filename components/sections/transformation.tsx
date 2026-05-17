'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const BEFORE = [
  'Agents entering the secondary market without the knowledge to compete',
  'Professionals watching clients take asset advice from strangers online',
  'Area Specialists with real inventory and no trusted channel to move it',
  'Developer RMs cold-calling brokers with no context or commitment',
  'Market knowledge locked in individual heads, never shared',
];

const AFTER = [
  'Agents who know the secondary market well enough to close with confidence',
  'Professionals with a vetted Specialist for every client requirement',
  'Area Specialists matched directly to members who need exactly what they know',
  'Developer RMs with a ready pipeline of educated, serious agents',
  'A platform where expertise is shared, recognised, and put to work',
];

export function Transformation() {
  return (
    <section className="bg-mist py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-2xl mb-14 md:mb-16">
            What being part of iClose
            actually changes.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface p-8 sm:p-10"
          >
            <p className="display-sm font-bold text-graphite tracking-tight mb-6">Without iClose</p>
            <ul className="space-y-4">
              {BEFORE.map((text) => (
                <li key={text} className="flex items-start gap-3 text-[17px] text-graphite-dark" style={{ letterSpacing: '-0.012em' }}>
                  <X className="h-5 w-5 mt-0.5 text-graphite-light flex-shrink-0" strokeWidth={2} />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface ring-1 ring-ink p-8 sm:p-10"
          >
            <p className="display-sm font-bold text-ink tracking-tight mb-6">With iClose</p>
            <ul className="space-y-4">
              {AFTER.map((text) => (
                <li key={text} className="flex items-start gap-3 text-[17px] text-ink" style={{ letterSpacing: '-0.012em' }}>
                  <Check className="h-5 w-5 mt-0.5 text-ink flex-shrink-0" strokeWidth={2} />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
