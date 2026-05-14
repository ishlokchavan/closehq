'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function S2CTABanner() {
  return (
    <section id="apply" className="bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[420px]">

          {/* Left: copy */}
          <div className="py-16 sm:py-20 lg:py-24 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold text-lime text-balance"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                letterSpacing: '-0.035em',
                lineHeight: 0.96,
              }}
            >
              Ready to close on your own terms?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-5 text-white/60 leading-relaxed max-w-sm"
              style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em' }}
            >
              Join hundreds of Dubai agents who have elevated their commission, protected their identity, and built a business on their own terms with iClose.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-8 flex items-center gap-3 flex-wrap"
            >
              <a
                href="#apply"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-lime text-[#1A1A1A] font-semibold text-sm hover:bg-lime-dark transition-all"
                style={{ letterSpacing: '-0.01em' }}
              >
                Join membership ↗
              </a>
              <a
                href="#plans"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-white/30 text-white font-medium text-sm hover:border-white/60 transition-all"
                style={{ letterSpacing: '-0.01em' }}
              >
                Explore Plans
              </a>
            </motion.div>
          </div>

          {/* Right: image/phone mockup */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 flex items-end justify-center pb-0">
              <div className="relative w-72 h-full">
                <Image
                  src="/images/hero-palm.jpg"
                  alt="iClose platform"
                  fill
                  className="object-cover object-top"
                  style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)' }}
                />
                {/* App mockup overlay */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-52 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-4 shadow-2xl">
                  <p className="text-white/60 text-xs mb-2" style={{ letterSpacing: '-0.005em' }}>Everything you need to get started in one place.</p>
                  <div className="bg-white/15 rounded-xl p-3 mb-2">
                    <p className="text-white font-bold text-sm">Start Here</p>
                    <p className="text-white/60 text-xs mt-1">Welcome to the iClose family! 💙</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl p-2.5">
                    <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center text-xs font-bold text-black">iC</div>
                    <p className="text-white text-xs font-medium">Deal desk is live →</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
