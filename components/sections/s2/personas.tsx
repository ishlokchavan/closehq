'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PERSONAS = [
  {
    title: "I'm Building\nmy Business",
    body: "I'm on a trajectory to sustainable income and I'm ready to develop a framework to close more deals, more appointments, and more transactions — and keep the commission I've earned.",
  },
  {
    title: "I'm on a Fast\nTrack to Success",
    body: "I'm ready to build a solid foundation of the key activities, tactics, and tools that will power a successful independent career from the ground up.",
  },
  {
    title: "I'm Ready to\nRaise the Bar",
    body: "I understand the value of better systems and accountability. I'm ready to unlock my next level, take advantage of more opportunity, and fine-tune the habits that will get me there.",
  },
  {
    title: "I'm a Team\nLead",
    body: "I'm ready to be the principal broker of my own business. I'm investing in the systems and strategy to scale, amplify my work, and keep growth going even when I step away.",
  },
];

const GALLERY = [
  '/images/gallery-beachside.jpg',
  '/images/gallery-community.jpg',
  '/images/gallery-waterfront.jpg',
  '/images/gallery-commercial.jpg',
];

export function S2Personas() {
  return (
    <section id="how" className="bg-cream pt-20 sm:pt-28 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lime-text font-semibold text-xs uppercase mb-5" style={{ letterSpacing: '0.12em' }}>
              Choose Your Plan
            </p>
            <h2
              className="font-serif text-[#1A1A1A] text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3.5vw, 3rem)', lineHeight: 1.18 }}
            >
              Choose your path to accelerate your growth
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-sellit-muted leading-relaxed self-end pb-2"
            style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em' }}
          >
            Unlock a future where you keep what you earn, build a reputation that commands trust, and close more deals with iClose's platform and deal-desk support.
          </motion.p>
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PERSONAS.map((p, i) => (
            <motion.a
              href="#apply"
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-navy rounded-2xl p-7 flex flex-col justify-between min-h-[220px] hover:bg-navy-light transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <h3
                  className="text-white font-display font-bold whitespace-pre-line"
                  style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                >
                  {p.title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-white/40 flex-shrink-0 ml-2 mt-0.5 group-hover:text-white/80 transition-colors" strokeWidth={1.5} />
              </div>
              <p className="text-white/50 text-sm leading-relaxed mt-4" style={{ letterSpacing: '-0.005em' }}>
                {p.body}
              </p>
            </motion.a>
          ))}
        </div>

        {/* "Journey starts here" + photo gallery */}
        <div className="mt-16 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-8 text-center"
          >
            <p className="text-lime-text font-semibold text-xs uppercase mb-4" style={{ letterSpacing: '0.12em' }}>
              Choose Your Plan
            </p>
            <h2
              className="font-serif text-[#1A1A1A] mb-4"
              style={{ fontSize: 'clamp(1.85rem, 3.5vw, 3rem)', lineHeight: 1.18 }}
            >
              Your commission journey starts here
            </h2>
            <p className="text-sellit-muted max-w-xl mx-auto" style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em' }}>
              Close more deals, keep more commission, and grow your business with Dubai's independent brokerage platform and coaching community.
            </p>
          </motion.div>

          {/* Photo strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {GALLERY.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: '4/3' }}
              >
                <Image src={src} alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
