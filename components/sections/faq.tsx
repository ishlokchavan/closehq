'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const FAQS = [
  {
    q: 'What is iClose?',
    a: "A learning platform for people who want to understand Dubai real estate deeply — not just know about it. The kind of depth that makes you the most informed person in your network when Dubai property comes up.",
  },
  {
    q: 'Who is it for?',
    a: "Internationally minded professionals who keep encountering Dubai real estate and want to understand it properly. Investors who want conviction before they move. And anyone tired of relying on other people’s knowledge in a market they’re serious about.",
  },
  {
    q: 'When does it launch?',
    a: "We’re taking founding member spots now. They come with the lowest price iClose will ever offer and first access when we go live.",
  },
  {
    q: 'What does the content look like?',
    a: 'Deep-dives into Dubai’s communities, development-level intelligence, area analysis, and monthly sessions with specialists actively working this market. Less theory. More the kind of knowledge you’d only get from being on the ground.',
  },
  {
    q: 'Do I need a real estate license?',
    a: "No. iClose is for anyone who wants to understand Dubai real estate with real depth — whether you’re investing, advising, or simply want to move in this market as someone who’s done the work.",
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
