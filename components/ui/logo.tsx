import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  variant = 'light',
}: {
  className?: string;
  variant?: 'light' | 'dark';
}) {
  return (
    <Link
      href="/"
      aria-label="CloseHQ — home"
      className={cn(
        'inline-flex items-baseline gap-1.5 group',
        className,
      )}
    >
      <span
        className={cn(
          'font-display text-2xl tracking-tighter font-light',
          variant === 'light' ? 'text-bone' : 'text-ink',
        )}
      >
        Close
      </span>
      <span
        className={cn(
          'font-mono text-[10px] tracking-[0.3em] uppercase mt-1 transition-colors',
          variant === 'light' ? 'text-gold' : 'text-gold-dark',
        )}
      >
        HQ
      </span>
    </Link>
  );
}
