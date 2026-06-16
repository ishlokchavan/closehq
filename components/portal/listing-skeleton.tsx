import { ImageIcon } from 'lucide-react';

/**
 * Placeholder results grid shown while the listings data layer is built.
 * Real cards (driven by the Supabase `listings` table) replace this next.
 */
export function ListingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-surface overflow-hidden">
          <div className="aspect-[4/3] bg-mist flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-hairline" />
          </div>
          <div className="p-4 space-y-2.5">
            <div className="h-3.5 w-1/2 rounded bg-mist" />
            <div className="h-3 w-3/4 rounded bg-mist" />
            <div className="h-3 w-2/3 rounded bg-mist" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Generic empty-state used by verticals whose data layer isn't built yet. */
export function ComingSoonNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-mist rounded-apple px-6 py-5 text-[14px] text-graphite-dark">
      {children}
    </div>
  );
}
