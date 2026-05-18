'use client';

import { motion } from 'framer-motion';
import { UserPlus, BookOpenCheck, Handshake } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const STEPS = [
  {
    number: '1',
    icon: UserPlus,
    title: 'Join for free.',
    body: 'Instant access to the community and Academy. No desk fees, no lock-in. Start learning the same day.',
  },
  {
    number: '2',
    icon: BookOpenCheck,
    title: 'Learn from the people closing it.',
    body: 'Access area playbooks from vetted experts and developer briefings from RMs. Real knowledge from professionals who are actively in the market, not theory.',
  },
  {
    number: '3',
    icon: Handshake,
    title: 'Close a deal. Keep the commission.',
    body: 'Post a requirement, get matched with the right expert. The deal flows through iClose, and your commission is paid directly to you when the buyer signs.',
  },
];

export function How() {
  return (
    <section id="how" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-xl mb-3">
            How it works.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="subhead mb-14 md:mb-16 max-w-xl">
            Three steps from sign-up to your first closed deal.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card-mist p-8 sm:p-10"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="display-md text-graphite-light">{step.number}</span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper border border-hairline">
                    <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="display-sm mb-3">{step.title}</h3>
                <p className="text-[17px] text-graphite-dark leading-[1.5]" style={{ letterSpacing: '-0.012em' }}>
                  {step.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
