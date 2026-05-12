'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const FAQS = [
  {
    q: 'What is iClose?',
    a: "A specialist learning platform for Dubai's secondary market. Deep, deal-level knowledge — building profiles, area intelligence, community data — from people actively closing deals today. Not generic training.",
  },
  {
    q: 'Who is it for?',
    a: "Agents done losing deals to people who know more. New entrants building their foundation. International professionals entering the market. And investors who want to buy with conviction, not guesswork.",
  },
  {
    q: 'When does it launch?',
    a: "We're taking founding member spots now. They come with the lowest price iClose will ever cost and first access to every new market we add.",
  },
  {
    q: 'What does the content look like?',
    a: 'Building-by-building guides, area deep-dives, view premium data, price history, and monthly live sessions with active Dubai specialists. Deal intelligence, not classroom theory.',
  },
  {
    q: 'Do I need a real estate license?',
    a: "No. If Dubai real estate matters to you — as an agent, connector, investor, or professional — iClose was built for you.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-xl mb-14 md:mb-16">
            Questions worth asking.
          </h2>
        </Reveal>

        <div className="max-w-3xl divide-y divide-hairline border-t border-hairline">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left"
              >
                <span className="display-sm text-ink">{faq.q}</span>
                {open === i
                  ? <Minus className="h-5 w-5 text-graphite flex-shrink-0" strokeWidth={2} />
                  : <Plus className="h-5 w-5 text-graphite flex-shrink-0" strokeWidth={2} />
                }
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-5 text-[17px] text-graphite-dark leading-[1.5]"
                      style={{ letterSpacing: '-0.012em' }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
