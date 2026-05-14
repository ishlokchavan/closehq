'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ARTICLES = [
  {
    tag: 'WORKSHOP SERIES',
    readTime: '60 min',
    title: 'Dubai Business Series — 6-Part Workshop',
    body: 'Our 6-part workshop series gives you a complete, actionable business plan to align goals, sharpen systems, and outperform in the Dubai secondary market.',
    img: '/images/tools-dashboard.jpg',
  },
  {
    tag: 'AREA GUIDE',
    readTime: '7 min',
    title: "The Agent's Guide to JBR & Dubai Marina",
    body: "Leverage cutting-edge area knowledge to move faster, know every development, and close on the second call — not the fifth.",
    img: '/images/gallery-waterfront.jpg',
  },
  {
    tag: 'TRAINING',
    readTime: '12 min',
    title: 'Top 5 Benefits of iClose Deal-Desk Support',
    body: 'Relationships and positioning are at the top of every high-performing agent in Dubai. Here is how the deal desk gives you the edge.',
    img: '/images/gallery-community.jpg',
  },
];

export function S2Resources() {
  return (
    <section id="resources" className="bg-cream py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="text-lime-text font-semibold text-xs uppercase mb-4" style={{ letterSpacing: '0.12em' }}>
            What's New
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
            <h2
              className="font-serif text-[#1A1A1A] text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3.5vw, 3rem)', lineHeight: 1.18 }}
            >
              Real estate training, courses & Dubai market insights
            </h2>
            <p className="text-sellit-muted leading-relaxed self-end" style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em' }}>
              Stay sharp and keep closing. Explore our latest workshops, courses, and expert insights from iClose specialists — designed to keep you one step ahead.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ARTICLES.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className="bg-white rounded-2xl overflow-hidden border border-sellit-border group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={a.img}
                  alt={a.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold text-lime-text bg-lime/15 px-2.5 py-1 rounded-full uppercase" style={{ letterSpacing: '0.08em' }}>
                    {a.tag}
                  </span>
                  <span className="text-sellit-muted text-xs">{a.readTime}</span>
                </div>
                <h3 className="text-[#1A1A1A] font-display font-semibold leading-snug mb-2" style={{ fontSize: '1.0625rem', letterSpacing: '-0.018em' }}>
                  {a.title}
                </h3>
                <p className="text-sellit-muted text-sm leading-relaxed" style={{ letterSpacing: '-0.005em' }}>
                  {a.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
