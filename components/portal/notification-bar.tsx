'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/components/i18n/locale-provider';

/**
 * Off-plan / credits promo bar. Sits ABOVE the nav (per Figma) and is one of
 * several entry points into the credits / developer-discounts flow.
 */
export function NotificationBar() {
  const { messages } = useI18n();
  return (
    <Link href="/credits" className="block bg-[#ffd9dc] hover:bg-[#ffcdd1] transition-colors">
      <div className="container-wide py-2.5 text-center text-[13px] text-ink">
        {messages.home.notif}
        <span className="text-accent ms-1.5 inline-flex items-center gap-0.5 font-medium">
          {messages.home.learnMore} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}
