/**
 * Live, auth-scoped reads for the portal-CRM tables (created by
 * supabase/migrations/20260620000000_portal_dashboard_crm.sql). RLS limits
 * every query to the signed-in user's own rows.
 *
 * Each fetcher maps DB rows to the exact UI types used by the demo layer, so
 * the dashboard renders identically whether the data is live or demo. A null /
 * empty result lets the caller fall back to demo data (e.g. before a user has
 * any CRM rows, or when Supabase isn't configured).
 */
import type { Lead, Client, Deal, Viewing, DocumentRow, LeadStage, DealStage } from './demo';

async function client() {
  const { supabase } = await import('@/lib/supabase');
  return supabase;
}

export async function fetchLeads(): Promise<Lead[] | null> {
  try {
    const sb = await client();
    const { data, error } = await sb.from('crm_leads').select('*').order('last_touch_at', { ascending: false });
    if (error || !data?.length) return null;
    return data.map((r): Lead => ({
      id: r.id, name: r.name, email: r.email ?? '', phone: r.phone ?? '',
      interest: r.interest ?? '', budgetAed: Number(r.budget_aed ?? 0), source: r.source ?? '',
      stage: (r.stage ?? 'New') as LeadStage, score: r.score ?? 0, lastTouchIso: r.last_touch_at,
    }));
  } catch { return null; }
}

export async function fetchClients(): Promise<Client[] | null> {
  try {
    const sb = await client();
    const { data, error } = await sb.from('crm_clients').select('*').order('last_contact_at', { ascending: false });
    if (error || !data?.length) return null;
    return data.map((r): Client => ({
      id: r.id, name: r.name, email: r.email ?? '', phone: r.phone ?? '',
      type: (r.client_type ?? 'Buyer') as Client['type'], status: (r.status ?? 'Active') as Client['status'],
      valueAed: Number(r.value_aed ?? 0), deals: r.deals_count ?? 0, lastContactIso: r.last_contact_at,
    }));
  } catch { return null; }
}

export async function fetchDeals(): Promise<Deal[] | null> {
  try {
    const sb = await client();
    const { data, error } = await sb.from('deals').select('*').order('updated_at', { ascending: false });
    if (error || !data?.length) return null;
    return data.map((r): Deal => ({
      id: r.id, ref: r.reference, property: r.property ?? '', community: r.community ?? '',
      client: r.client_name ?? '', stage: (r.stage ?? 'Qualified') as DealStage,
      valueAed: Number(r.value_aed ?? 0), commissionAed: Number(r.commission_aed ?? 0),
      status: (r.status ?? 'active') as Deal['status'],
      updatedIso: r.updated_at, closeIso: r.close_on ?? r.updated_at,
    }));
  } catch { return null; }
}

export async function fetchViewings(): Promise<Viewing[] | null> {
  try {
    const sb = await client();
    const { data, error } = await sb.from('viewings').select('*').order('scheduled_at', { ascending: true });
    if (error || !data?.length) return null;
    return data.map((r): Viewing => ({
      id: r.id, property: r.property ?? '', community: r.community ?? '',
      client: r.client_name ?? '', whenIso: r.scheduled_at, status: (r.status ?? 'scheduled') as Viewing['status'],
    }));
  } catch { return null; }
}

export async function fetchDocuments(): Promise<DocumentRow[] | null> {
  try {
    const sb = await client();
    const { data, error } = await sb.from('portal_documents').select('*').order('updated_at', { ascending: false });
    if (error || !data?.length) return null;
    return data.map((r): DocumentRow => ({
      id: r.id, name: r.name, kind: r.kind as DocumentRow['kind'], related: r.related ?? '',
      status: (r.status ?? 'pending') as DocumentRow['status'], updatedIso: r.updated_at,
    }));
  } catch { return null; }
}
