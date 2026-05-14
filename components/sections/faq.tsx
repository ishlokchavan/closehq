'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const FAQS = [
  {
    q: 'What is iClose?',
    a: "iClose is Dubai's independent brokerage platform. Agents work under the iClose structure — anonymously — and keep 60–100% of their commission depending on their plan. The deal desk handles the operational side. You handle the deals.",
  },
  {
    q: 'Who is it for?',
    a: "Independent agents and brokers active in Dubai's secondary real estate market who are done giving away 40–50% of every deal to a traditional brokerage. If you're producing and want to keep more of what you close, iClose is built for you.",
  },
  {
    q: 'What does "anonymous" mean in practice?',
    a: "Your clients know you as their agent — they don't know which brokerage structure you operate under. iClose handles the legal and operational layer. Your name, your relationships, your reputation stay entirely yours.",
  },
  {
    q: 'How does the commission split work?',
    a: 'It depends on your plan. Plus gives you 60%, Pro gives you 80%, Pro Max gives you 90%, and Ultra gives you 100%. Everyone starts as a Plus member for free. You upgrade when the numbers make sense for your volume.',
  },
  {
    q: 'When do I get paid?',
    a: "Commission is structured at the point the buyer signs. No chasing, no month-end delays, no approval queues. The deal closes — you get paid.",
  },
  {
    q: 'What is iClose Academy?',
    a: 'iClose Academy is our market intelligence layer — area playbooks, development deep-dives, and community analysis built by specialists who are active in Dubai right now. It comes with Pro and above, and gives you the kind of deal-level knowledge that most agents spend years accumulating.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-xl mb-14 md:mb-16">
            Straight answers.
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
