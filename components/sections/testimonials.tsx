'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';

const TESTIMONIALS = [
  {
    initials: 'A.M.',
    location: 'Off-Plan Specialist',
    quote: 'Switched 6 months ago. Earnings nearly doubled. The 90% split is game-changing.',
    rating: 5,
  },
  {
    initials: 'F.A.',
    location: 'Independent Broker',
    quote: 'No desk fees. Instant SPA advances. This is what brokers need. Finally here.',
    rating: 5,
  },
  {
    initials: 'M.H.',
    location: 'Senior Agent',
    quote: 'Smooth platform. Reliable payouts. Excellent support. Worth the switch.',
    rating: 5,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Testimonials() {
  return (
    <section className="relative bg-white py-28 md:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gold/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <Reveal>
            <SectionLabel number="09" label="Success stories" variant="light" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-8 text-ink text-balance">
              <span className="block">What brokers are</span>
              <span className="block bg-gradient-to-r from-gold via-gold/80 to-gold/60 bg-clip-text text-transparent">
                saying about us
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-ink/70 max-w-lg font-light leading-relaxed">
              500+ brokers already earning more. See why they made the switch.
            </p>
          </Reveal>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.initials}
              variants={item}
              className="group relative"
            >
              {/* Glow background */}
              <div className="absolute -inset-px bg-gradient-to-br from-gold/30 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative backdrop-blur-xl bg-white/40 border border-gold/40 hover:border-gold/60 rounded-2xl p-8 h-full transition-all duration-500 overflow-hidden">
                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative space-y-6">
                  {/* Initials + Location */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/40 flex-shrink-0">
                        <span className="text-sm font-medium text-gold">{testimonial.initials}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-mono uppercase tracking-[0.1em] text-ink/50">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-gold text-gold"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-ink/80 leading-relaxed italic group-hover:text-ink transition-colors duration-300">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {/* Accent line */}
                  <div className="h-px w-0 group-hover:w-8 bg-gradient-to-r from-gold to-transparent transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-20 pt-12 border-t border-ink/10 grid grid-cols-3 gap-6 text-center"
        >
          <div>
            <div className="text-3xl font-display font-light text-gold">500+</div>
            <div className="mt-2 text-sm text-ink/60 font-mono uppercase tracking-[0.1em]">
              Brokers Earning
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-gold">4.9★</div>
            <div className="mt-2 text-sm text-ink/60 font-mono uppercase tracking-[0.1em]">
              Platform Rating
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-light text-gold">+150%</div>
            <div className="mt-2 text-sm text-ink/60 font-mono uppercase tracking-[0.1em]">
              Avg Earnings Lift
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
