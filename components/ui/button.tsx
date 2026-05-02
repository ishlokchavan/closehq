import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'gold' | 'ghost' | 'outline' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  gold:
    'bg-gold text-ink hover:bg-gold-light shadow-[0_8px_30px_-8px_rgba(200,168,98,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(200,168,98,0.7)]',
  ghost:
    'bg-transparent text-bone border border-bone/20 hover:border-bone/60 hover:bg-bone/5',
  outline:
    'bg-transparent text-ink border border-ink/20 hover:border-ink/80 hover:bg-ink/5',
  dark:
    'bg-ink text-bone hover:bg-ink-700 border border-ink',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-xs',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-9 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
