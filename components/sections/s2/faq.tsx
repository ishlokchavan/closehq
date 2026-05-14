'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is iClose?',
    a: "iClose is Dubai's independent brokerage platform. Agents work under the iClose structure — anonymously — and keep 60–100% of their commission depending on their plan. The deal desk handles the operational side. You handle the deals.",
  },
  {
    q: 'Who is iClose for?',
    a: "Independent agents and brokers active in Dubai's secondary real estate market who are done giving away 40–50% of every deal to a traditional brokerage.",
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
    a: 'iClose Academy is our market intelligence layer — area playbooks, development deep-dives, and community analysis built by specialists who are active in Dubai right now. It comes with Pro and above.',
  },
];

export function S2FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#0d0d0d] py-20 sm:py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: heading */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gold-accent font-semibold text-sm mb-4 uppercase"
              style={{ letterSpacing: '0.08em' }}
            >
              FAQ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-black"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                letterSpacing: '-0.038em',
                lineHeight: 0.96,
              }}
            >
              Straight answers.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-white/35"
              style={{ fontSize: '1.0625rem', letterSpacing: '-0.012em', lineHeight: 1.55 }}
            >
              Still have questions? Email us at{' '}
              <a href="mailto:hello@iclose.ae" className="text-gold-accent hover:underline">
                hello@iclose.ae
              </a>
            </motion.p>
          </div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="divide-y divide-white/10 border-t border-white/10"
          >
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span
                    className="text-white font-semibold group-hover:text-white/80 transition-colors"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', letterSpacing: '-0.018em' }}
                  >
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0 h-7 w-7 rounded-full border border-white/15 flex items-center justify-center">
                    {open === i
                      ? <Minus className="h-3.5 w-3.5 text-white/60" strokeWidth={2} />
                      : <Plus className="h-3.5 w-3.5 text-white/60" strokeWidth={2} />
                    }
                  </div>
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
                        className="pb-6 text-white/40 leading-relaxed"
                        style={{ fontSize: '1.0625rem', letterSpacing: '-0.012em' }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
