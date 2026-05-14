'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'What is iClose?',
    a: "iClose is Dubai's independent brokerage platform. You work under the iClose structure — anonymously — and keep 60–100% of your commission depending on your plan. The deal desk handles the operational side. You handle the deals.",
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
    a: 'It depends on your plan. Starter gives you 60%, Plus gives you 80%, and Pro gives you 90–100%. Everyone starts on Starter for free. You upgrade when the numbers make sense for your volume.',
  },
  {
    q: 'When do I get paid?',
    a: "Commission is structured at the point the buyer signs. No chasing, no month-end delays, no approval queues. The deal closes — you get paid.",
  },
  {
    q: 'What is iClose Academy?',
    a: 'iClose Academy is our market intelligence layer — area playbooks, development deep-dives, and community analysis built by specialists who are active in Dubai right now. It comes with Plus and above.',
  },
];

export function S2FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

          {/* Left */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lime-text font-semibold text-xs uppercase mb-5"
              style={{ letterSpacing: '0.12em' }}
            >
              FAQ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-[#1A1A1A]"
              style={{ fontSize: 'clamp(1.85rem, 3vw, 2.75rem)', lineHeight: 1.18 }}
            >
              Straight answers.
            </motion.h2>
            <p className="mt-4 text-sellit-muted text-sm leading-relaxed" style={{ letterSpacing: '-0.005em' }}>
              Still have questions?{' '}
              <a href="mailto:hello@iclose.ae" className="text-[#1A1A1A] underline underline-offset-2 hover:text-lime-text transition-colors">
                Email us →
              </a>
            </p>
          </div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="divide-y divide-sellit-border border-t border-sellit-border"
          >
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                >
                  <span
                    className="font-display font-semibold text-[#1A1A1A] group-hover:text-[#1A1A1A]/70 transition-colors"
                    style={{ fontSize: 'clamp(1rem, 1.3vw, 1.125rem)', letterSpacing: '-0.018em' }}
                  >
                    {faq.q}
                  </span>
                  <span className="text-sellit-muted text-xl font-light flex-shrink-0">
                    {open === i ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-5 text-sellit-muted leading-relaxed"
                        style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em' }}
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
