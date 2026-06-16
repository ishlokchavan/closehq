'use client';

import { useState } from 'react';
import { User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComingSoonNote } from '@/components/portal/listing-skeleton';

type Tab = 'agents' | 'companies';

/** Agents | Companies sub-tab toggle + placeholder result cards. */
export function AgentsDirectory() {
  const [tab, setTab] = useState<Tab>('agents');

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-6 border-b border-hairline">
        {(['agents', 'companies'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'pb-3 -mb-px text-[15px] capitalize border-b-2 transition-colors',
              tab === t ? 'border-accent text-ink font-medium' : 'border-transparent text-graphite hover:text-ink',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <ComingSoonNote>
        Agent and agency profiles are populated from the <code>agents</code> / <code>agencies</code>{' '}
        data layer next.
      </ComingSoonNote>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-surface p-5 flex items-center gap-4">
            <span className="flex items-center justify-center h-14 w-14 rounded-full bg-mist text-hairline">
              {tab === 'agents' ? <User className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
            </span>
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-1/2 rounded bg-mist" />
              <div className="h-3 w-3/4 rounded bg-mist" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
