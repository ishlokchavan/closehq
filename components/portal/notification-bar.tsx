import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Off-plan / credits promo bar. Sits ABOVE the nav (per Figma) and is one of
 * several entry points into the credits / developer-discounts flow.
 */
export function NotificationBar() {
  return (
    <Link href="/developers" className="block bg-[#ffd9dc] hover:bg-[#ffcdd1] transition-colors">
      <div className="container-wide py-2.5 text-center text-[13px] text-ink">
        Investing in Off-Plan? Get Special Pricing &amp; Credits
        <span className="text-accent ml-1.5 inline-flex items-center gap-0.5 font-medium">
          Learn More <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
