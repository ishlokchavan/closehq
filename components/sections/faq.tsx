'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const FAQS = [
  {
    q: 'What is iClose?',
    a: "A learning platform for Dubai's secondary real estate market. We turn agents into area specialists through courses, building guides, and content from active Dubai experts.",
  },
  {
    q: 'Who is it for?',
    a: 'New agents, experienced brokers going deeper, international professionals entering Dubai, and investors who want to buy smarter.',
  },
  {
    q: 'When does it launch?',
    a: "We're accepting early access sign-ups now. Founding members get first access and exclusive pricing when we go live.",
  },
  {
    q: 'What does the content look like?',
    a: 'Video courses, building-by-building guides, area deep-dives, and live sessions from specialists who are actively closing deals.',
  },
  {
    q: 'Do I need a real estate license?',
    a: "No. iClose is for anyone serious about Dubai property — whether you're a licensed agent, an investor, or just getting started.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-xl mb-14 md:mb-16">
            Common questions.
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
