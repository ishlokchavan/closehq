'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export function DealCTA() {
  return (
    <section className="bg-mist border-y border-hairline py-8 sm:py-10">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
        >
          <div>
            <p
              className="text-[17px] font-medium text-ink leading-snug"
              style={{ letterSpacing: '-0.015em' }}
            >
              Close a deal through iClose. Keep up to 100%.
            </p>
            <p className="mt-1 text-[14px] text-graphite" style={{ letterSpacing: '-0.01em' }}>
              Start at 60% on Plus — work up to keeping everything on Ultra.
            </p>
          </div>

          <a
            href="#plans"
            className="inline-flex shrink-0 items-center gap-2 px-5 py-2.5 rounded-full border border-ink/20 text-ink text-[14px] hover:border-ink/50 hover:bg-paper transition-colors"
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
