'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';
import { Sparkles, Users, FileText, TrendingUp } from 'lucide-react';

const TOOLS = [
  {
    icon: Sparkles,
    title: 'Concierge Services',
    description: 'Premium experiences for high-value clients. All handled.',
    image: '/images/tools-concierge.jpg',
  },
  {
    icon: Users,
    title: 'Developer Relations',
    description: 'Direct partnerships with major developers. Close faster.',
    image: '/images/tools-developer.jpg',
  },
  {
    icon: FileText,
    title: 'Compliance Suite',
    description: 'RERA-approved templates and documentation. Always compliant.',
    image: '/images/tools-compliance.jpg',
  },
  {
    icon: TrendingUp,
    title: 'Performance Dashboard',
    description: 'Live analytics. Track every deal. Real-time insights.',
    image: '/images/tools-dashboard.jpg',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

export function ToolsShowcase() {
  return (
    <section className="relative bg-gradient-to-b from-bone-100 to-white text-ink py-28 md:py-40 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-1/3 h-1/3 bg-gradient-to-l from-gold/5 to-transparent blur-3xl" />
      </div>

      <div className="container-x relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <Reveal>
            <SectionLabel number="07" label="Premium tools" variant="light" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-8 text-balance text-ink">
              <span className="block">Everything a broker needs</span>
              <span className="block bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">
                to dominate their market
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-ink/70 max-w-lg font-light leading-relaxed">
              From client concierge to regulatory compliance, we've built the infrastructure so you can focus on deals.
            </p>
          </Reveal>
        </div>

        {/* Tools Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                variants={item}
                className="group relative overflow-hidden rounded-3xl"
              >
                {/* Image background */}
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/70 to-ink/40 group-hover:via-ink/80 transition-colors duration-500" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20 group-hover:bg-gold/30 border border-gold/40 transition-all duration-300">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-light text-bone mb-2 group-hover:text-gold transition-colors duration-300">
                    {tool.title}
                  </h3>
                  <p className="text-bone/80 text-sm leading-relaxed group-hover:text-bone transition-colors duration-300">
                    {tool.description}
                  </p>

                  {/* Accent line */}
                  <div className="mt-4 h-px w-0 group-hover:w-12 bg-gradient-to-r from-gold to-transparent transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
