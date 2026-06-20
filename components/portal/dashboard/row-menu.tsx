'use client';

import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

export interface MenuItem { label: string; onClick: () => void; danger?: boolean }

/** Compact "⋯" dropdown menu with outside-click + Escape to close. */
export function RowMenu({ items, label = 'More actions', triggerClassName, iconClassName }: { items: MenuItem[]; label?: string; triggerClassName?: string; iconClassName?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((o) => !o); }}
        className={triggerClassName ?? 'h-7 w-7 -me-1 inline-flex items-center justify-center rounded-full hover:bg-mist'}
        aria-haspopup="menu" aria-expanded={open} aria-label={label}
      >
        <MoreHorizontal className={iconClassName ?? 'h-4 w-4 text-graphite'} />
      </button>
      {open && (
        <div role="menu" className="absolute end-0 top-8 z-30 w-44 rounded-xl border border-hairline bg-paper py-1 shadow-lg shadow-black/10">
          {items.map((it) => (
            <button
              key={it.label}
              role="menuitem"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); it.onClick(); }}
              className={`block w-full px-3.5 py-2 text-start text-[13px] hover:bg-mist ${it.danger ? 'text-[#c81e3f]' : 'text-ink'}`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
