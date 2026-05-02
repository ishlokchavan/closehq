'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

export function Calculator() {
  const [unitPrice, setUnitPrice] = useState(2000000);
  const [commissionRate, setCommissionRate] = useState(2);
  const [theirSplit, setTheirSplit] = useState(50);

  const calculations = useMemo(() => {
    const grossCommission = (unitPrice * commissionRate) / 100;
    const theirPayout = (grossCommission * theirSplit) / 100;
    const closeHQPayout = grossCommission * 0.8;
    const youLose = closeHQPayout - theirPayout;

    return {
      grossCommission,
      theirPayout,
      closeHQPayout,
      youLose,
    };
  }, [unitPrice, commissionRate, theirSplit]);

  const formatAED = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="relative bg-ink-800 py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gold/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container-x relative">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Reveal>
            <SectionLabel number="04" label="The cost of the wrong brokerage" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md mt-6 text-bone text-balance">
              See what you're
              <br />
              <span className="italic font-normal text-gold">leaving on the table.</span>
            </h2>
          </Reveal>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left: Inputs */}
          <motion.div variants={item} className="space-y-8">
            {/* Unit Price */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.22em] text-bone/60 mb-3">
                Unit price (AED)
              </label>
              <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full h-12 px-4 bg-ink-700 border border-gold/20 text-bone placeholder-bone/30 text-sm transition-all focus:outline-none focus:border-gold focus:bg-ink-600"
              />
            </div>

            {/* Commission Rate */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.22em] text-bone/60 mb-3">
                Commission rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full h-12 px-4 bg-ink-700 border border-gold/20 text-bone placeholder-bone/30 text-sm transition-all focus:outline-none focus:border-gold focus:bg-ink-600"
              />
            </div>

            {/* Their Split - Slider */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-[11px] font-mono uppercase tracking-[0.22em] text-bone/60">
                  Current split
                </label>
                <span className="text-sm font-display text-gold">{theirSplit}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={theirSplit}
                onChange={(e) => setTheirSplit(Number(e.target.value))}
                className="w-full h-2 bg-ink-700 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-xs text-bone/40 mt-2">
                <span>40%</span>
                <span>100%</span>
              </div>
            </div>

            {/* CloseHQ Split - Display only */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.22em] text-bone/60 mb-3">
                CloseHQ split (fixed)
              </label>
              <div className="w-full h-12 px-4 bg-gold/10 border border-gold/30 text-bone rounded-none flex items-center text-sm font-display">
                80%
              </div>
            </div>
          </motion.div>

          {/* Right: Results */}
          <motion.div
            variants={item}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow background */}
            <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-gold/5 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Results Card */}
            <div className="relative backdrop-blur-xl bg-gold/5 border border-gold/30 rounded-3xl p-8 md:p-10 space-y-6">
              {/* Gross Commission */}
              <div className="border-b border-gold/20 pb-6">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-bone/60 mb-2">
                  Gross commission
                </div>
                <div className="text-3xl md:text-4xl font-display font-light text-gold">
                  {formatAED(calculations.grossCommission)}
                </div>
              </div>

              {/* Comparison */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-bone/60 mb-2">
                    Current payout ({theirSplit}%)
                  </div>
                  <div className="text-2xl font-display font-light text-bone">
                    {formatAED(calculations.theirPayout)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-bone/60 mb-2">
                    CloseHQ payout (90%)
                  </div>
                  <div className="text-2xl font-display font-light text-bone">
                    {formatAED(calculations.closeHQPayout)}
                  </div>
                </div>
              </div>

              {/* You Lose - Highlighted */}
              <motion.div
                key={`${calculations.youLose}`}
                initial={{ scale: 1 }}
                animate={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative border-t border-gold/30 pt-6 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 p-4"
              >
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-bone/60 mb-3">
                  You lose per deal
                </div>
                <motion.div
                  key={`loss-${calculations.youLose}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl md:text-5xl font-display font-light text-gold"
                >
                  {formatAED(calculations.youLose)}
                </motion.div>
              </motion.div>

              {/* CTA */}
              <div className="pt-4">
                <a href="#apply" className="group block">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Stop losing {formatAED(calculations.youLose).split('.')[0]}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
