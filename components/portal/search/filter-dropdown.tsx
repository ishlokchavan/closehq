'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/** A pill button that toggles a popover panel. Closes on outside-click / Escape. */
export function FilterDropdown({
  label,
  active = false,
  children,
  width = 'w-72',
}: {
  label: string;
  active?: boolean;
  children: (close: () => void) => React.ReactNode;
  width?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={cn(
          'inline-flex items-center gap-1.5 h-10 px-3.5 rounded-full border text-[13px] transition-colors',
          active ? 'border-accent text-accent bg-accent/5' : 'border-hairline text-ink/80 hover:border-ink/40 hover:text-ink',
        )}
      >
        {label} <ChevronDown className={cn('h-3.5 w-3.5 opacity-60 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className={cn('absolute z-50 mt-2 start-0 rounded-2xl border border-hairline bg-paper shadow-card-hover p-4', width)}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}
