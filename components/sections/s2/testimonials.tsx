'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Samir A.',
    location: 'Dubai, UAE',
    initials: 'SA',
    quote: 'The iClose deal desk is absolutely the best support a Dubai agent can get. The investment has paid off tremendously through the multi-million dirham deals I've closed via their referral network.',
  },
  {
    name: 'Karen R.',
    location: 'Dubai Marina, UAE',
    initials: 'KR',
    quote: 'Two weeks before joining iClose, I was ready to leave real estate for good. When I started using the platform, the impact on my business changed everything. For the first time I'm building a real practice — anonymously.',
  },
  {
    name: 'Mohammed T.',
    location: 'Downtown Dubai, UAE',
    initials: 'MT',
    quote: 'I was doing AED 8M a month and giving half away. Now I keep 80%, my identity is protected, and I have a deal desk that helps me close. I wish I had found iClose three years earlier.',
  },
  {
    name: 'Priya S.',
    location: 'Palm Jumeirah, UAE',
    initials: 'PS',
    quote: "The iClose Academy area playbooks are exceptional. Knowing every building in JBR or Downtown at a granular level — that's the edge I needed to convert on the second call instead of the fifth.",
  },
];

export function S2Testimonials() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lime-text font-semibold text-xs uppercase mb-10"
          style={{ letterSpacing: '0.12em' }}
        >
          Hear from your peers
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl p-8 sm:p-10 border border-sellit-border flex flex-col"
            >
              <blockquote
                className="text-[#1A1A1A] font-display leading-snug flex-1"
                style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', letterSpacing: '-0.018em', lineHeight: 1.45 }}
              >
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full bg-navy flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-[#1A1A1A] text-sm font-semibold" style={{ letterSpacing: '-0.01em' }}>{t.name}</p>
                  <p className="text-sellit-muted text-xs mt-0.5">{t.location}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
