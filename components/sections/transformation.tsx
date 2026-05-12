'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const BEFORE = [
  "Stalling when a client asks about a specific tower — and hoping they don't notice",
  "Watching a deal go to the specialist who knew one thing you didn't",
  "Cutting your commission because expertise wasn't part of your pitch",
  'Spending weeks learning a community just to sound credible',
];

const AFTER = [
  'The agent clients WhatsApp first — because you answered before they finished asking',
  'Winning deals on knowledge that no one else in the room had',
  'Charging full fee, because your intelligence is the product — not your price',
  'A specialist reputation that generates referrals while you sleep',
];

export function Transformation() {
  return (
    <section className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-2xl mb-14 md:mb-16">
            The difference between the agent clients call first and the one they call last.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-mist p-8 sm:p-10"
          >
            <p className="text-sm font-medium text-graphite tracking-tight mb-6">Without iClose</p>
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
            <p className="text-sm font-medium text-ink tracking-tight mb-6">With iClose</p>
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
