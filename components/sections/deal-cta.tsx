'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export function DealCTA() {
  return (
    <section className="bg-neutral-950 py-12 sm:py-14">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto text-center"
        >
          <h2
            className="text-white font-display font-semibold text-balance leading-[1.15]"
            style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)', letterSpacing: '-0.022em' }}
          >
            Close a deal through iClose.
            Keep up to 100%.
          </h2>

          <p
            className="mt-3 text-white/50 text-[15px] leading-[1.55] max-w-md mx-auto"
            style={{ letterSpacing: '-0.012em' }}
          >
            Every membership tier includes a transaction split. Start at 60% on Plus and earn up to 100% on Ultra. The community is free to join — the upside is entirely yours.
          </p>

          <a
            href="#plans"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/70 text-[14px] hover:border-white/40 hover:text-white transition-colors"
            style={{ letterSpacing: '-0.01em' }}
          >
            See membership plans
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
