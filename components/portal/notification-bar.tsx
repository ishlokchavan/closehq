'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/components/i18n/locale-provider';

/**
 * Off-plan / credits promo bar. Sits ABOVE the nav (per Figma) and rotates
 * through several entry points into the credits / developer-discounts flow.
 */
const ROTATE_MS = 4500;

export function NotificationBar() {
  const { messages } = useI18n();
  const items = messages.home.notifItems?.length
    ? messages.home.notifItems
    : [messages.home.notif];
  const [index, setIndex] = useState(0);

  // Rotate only when there's more than one item to cycle through.
  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[index % items.length] ?? items[0];
  // Bold the value half (after the first question mark) for emphasis.
  const m = current.match(/^(.*?[?؟])\s*(.*)$/);
  const lead = m ? m[1] : current;
  const tail = m ? m[2] : '';

  return (
    <Link href="/credits" className="block bg-[#ffd9dc] hover:bg-[#ffcdd1] transition-colors">
      <div className="container-wide py-3 sm:py-3.5 flex items-center justify-center gap-1.5 text-center text-[13px] sm:text-[14px] text-ink">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {lead} {tail && <strong className="font-semibold">{tail}</strong>}
          </motion.span>
        </AnimatePresence>
        <span className="text-accent inline-flex items-center gap-0.5 font-semibold whitespace-nowrap">
          {messages.home.learnMore} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}
