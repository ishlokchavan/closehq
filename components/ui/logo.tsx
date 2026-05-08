import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  variant = 'dark',
}: {
  className?: string;
  variant?: 'light' | 'dark';
}) {
  return (
    <Link
      href="/"
      aria-label="CloseHQ — home"
      className={cn('inline-flex items-baseline gap-0.5', className)}
    >
      <span
        className={cn(
          'font-display text-[22px] font-semibold tracking-tight',
          variant === 'light' ? 'text-white' : 'text-ink',
        )}
        style={{ letterSpacing: '-0.02em' }}
      >
        Close
      </span>
      <span
        className={cn(
          'font-display text-[22px] font-normal tracking-tight',
          variant === 'light' ? 'text-white/60' : 'text-graphite',
        )}
        style={{ letterSpacing: '-0.02em' }}
      >
        HQ
      </span>
    </Link>
  );
}
