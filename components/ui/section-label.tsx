import { cn } from '@/lib/utils';

interface SectionLabelProps {
  number: string;
  label: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export function SectionLabel({
  number,
  label,
  variant = 'dark',
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em]',
        variant === 'light' ? 'text-ink/60' : 'text-bone/60',
        className,
      )}
    >
      <span className="text-gold">[{number}]</span>
      <span
        className={cn(
          'h-px w-10',
          variant === 'light' ? 'bg-ink/20' : 'bg-bone/20',
        )}
        aria-hidden
      />
      <span>{label}</span>
    </div>
  );
}
