'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const FAQS = [
  {
    q: 'What is iClose?',
    a: 'iClose is a Dubai real estate community and education platform built around three types of professionals: agents who want to build expertise in the secondary market, professionals (lawyers, accountants, advisers, family offices) whose clients have property requirements, and Specialists who have area or building expertise and inventory to match. The platform connects all three in a way that benefits everyone.',
  },
  {
    q: 'Who can join as a Member?',
    a: "Anyone with a professional connection to Dubai real estate — agents, brokers, lawyers, accountants, financial advisers, POAs, investors, and family offices. If you have clients with asset requirements, or if you're building expertise in the secondary market, iClose is built for you.",
  },
  {
    q: "I'm an agent. How does iClose help me specifically?",
    a: "iClose Academy gives you structured content from Specialists who are actively working the areas you want to enter — area playbooks, building deep-dives, and community intelligence. It's the fastest path to becoming a credible secondary market professional, built on real knowledge from people in the field.",
  },
  {
    q: "I'm a lawyer / accountant / adviser. How does this help my clients?",
    a: "When your client has a specific asset requirement, you can post it directly to the iClose community. The Specialist who knows that area or building best responds personally. You stay in control of the client relationship — we provide the expertise and the matched inventory behind it.",
  },
  {
    q: 'What is a Specialist and how is it different from a Member?',
    a: "A Specialist is a vetted community or building expert who knows a specific area of Dubai's secondary market with real depth — transaction history, current inventory, pricing nuance. Specialists apply separately and are reviewed before joining. They publish their knowledge for Members, and when a Member inquiry falls within their domain, they are the focal point to close it.",
  },
  {
    q: "Why would a Specialist join iClose?",
    a: "iClose gives Specialists access to a growing pool of professionals who have active buyers — agents, lawyers, accountants, family offices. When you share your knowledge here, you build authority with the exact people who will refer serious inquiries your way. When a Member needs a unit in your domain, you are the first and only call.",
  },
  {
    q: 'What does the transaction split mean?',
    a: "When a deal closes through the platform, the split is the share you keep versus what goes to iClose. Plus Members keep 60%. It improves at Pro (80%), Pro Max (90%), and Ultra (100%). This is an added benefit of membership — the community and education platform are available regardless of transaction activity.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-mist py-16 sm:py-20 md:py-24 lg:py-28">
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
