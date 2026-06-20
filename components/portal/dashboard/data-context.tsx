'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/components/portal/auth-provider';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { fetchLeads, fetchClients, fetchDeals, fetchViewings, fetchDocuments } from '@/lib/portal/dashboard/live';
import {
  getLeads, getClients, getDeals, getViewings, getDocuments,
  type Lead, type Client, type Deal, type Viewing, type DocumentRow,
} from '@/lib/portal/dashboard/demo';

interface Live { leads?: Lead[]; clients?: Client[]; deals?: Deal[]; viewings?: Viewing[]; documents?: DocumentRow[] }

interface DataState {
  leads: Lead[]; clients: Client[]; deals: Deal[]; viewings: Viewing[]; documents: DocumentRow[];
  /** Whether each collection came from Supabase (true) or demo fallback (false). */
  live: Record<'leads' | 'clients' | 'deals' | 'viewings' | 'documents', boolean>;
}

const Ctx = createContext<DataState | null>(null);

/**
 * Loads the user's live CRM rows once, then exposes them with a per-collection
 * demo fallback. Pages read everything through `useData()` so they transparently
 * use live Supabase data when it exists and demo data otherwise.
 */
export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { persona } = usePersona();
  const [live, setLive] = useState<Live>({});

  useEffect(() => {
    if (!user) { setLive({}); return; }
    let cancelled = false;
    (async () => {
      const [leads, clients, deals, viewings, documents] = await Promise.all([
        fetchLeads(), fetchClients(), fetchDeals(), fetchViewings(), fetchDocuments(),
      ]);
      if (cancelled) return;
      setLive({
        leads: leads ?? undefined,
        clients: clients ?? undefined,
        deals: deals ?? undefined,
        viewings: viewings ?? undefined,
        documents: documents ?? undefined,
      });
    })();
    return () => { cancelled = true; };
  }, [user]);

  const value: DataState = {
    leads: live.leads ?? getLeads(persona),
    clients: live.clients ?? getClients(persona),
    deals: live.deals ?? getDeals(persona),
    viewings: live.viewings ?? getViewings(persona),
    documents: live.documents ?? getDocuments(persona),
    live: {
      leads: !!live.leads, clients: !!live.clients, deals: !!live.deals,
      viewings: !!live.viewings, documents: !!live.documents,
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useData(): DataState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useData must be used within DashboardDataProvider');
  return v;
}
