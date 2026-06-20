'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/portal/auth-provider';
import { useData } from '@/components/portal/dashboard/data-context';
import { useToast } from '@/components/portal/dashboard/toast';

type Kind = 'lead' | 'client';

const input = 'w-full h-10 px-3 bg-paper border border-hairline rounded-xl text-ink text-[14px] placeholder:text-graphite-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';
const label = 'block text-[12.5px] font-medium text-ink mb-1';

/**
 * Inserts a new lead or client into Supabase (RLS scopes it to the signed-in
 * user), then refreshes the live collection so the row appears immediately.
 */
export function CreateRecordModal({ kind, open, onClose }: { kind: Kind; open: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const { refresh } = useData();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({ name: '', email: '', phone: '', extra: '', value: '' });

  if (!open) return null;

  const isLead = kind === 'lead';
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim()) { toast.error('Please enter a name.'); return; }
    if (!user) { toast.error('Please sign in first.'); return; }
    setSaving(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const value = Number(f.value.replace(/[^\d.]/g, '')) || 0;
      const row: Record<string, unknown> = isLead
        ? { owner_id: user.id, name: f.name, email: f.email || null, phone: f.phone || null, interest: f.extra || null, budget_aed: value || null, source: 'Manual', stage: 'New', score: 50 }
        : { owner_id: user.id, name: f.name, email: f.email || null, phone: f.phone || null, client_type: f.extra || 'Buyer', status: 'Active', value_aed: value };
      const { error } = await supabase.from(isLead ? 'crm_leads' : 'crm_clients').insert(row as never);
      if (error) throw error;
      await refresh();
      toast.success(`${isLead ? 'Lead' : 'Client'} “${f.name}” added.`);
      setF({ name: '', email: '', phone: '', extra: '', value: '' });
      onClose();
    } catch {
      toast.error('Could not save — check your connection and try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm p-0 sm:p-4" onClick={onClose}>
      <div className="w-full sm:max-w-md bg-paper rounded-t-2xl sm:rounded-2xl shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
          <h2 className="text-[16px] font-semibold text-ink">{isLead ? 'Add lead' : 'Add client'}</h2>
          <button onClick={onClose} className="text-graphite hover:text-ink" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-3.5">
          <div><span className={label}>Full name *</span><input autoFocus className={input} value={f.name} onChange={set('name')} placeholder="e.g. Sara Khan" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><span className={label}>Email</span><input className={input} type="email" value={f.email} onChange={set('email')} placeholder="name@email.com" /></div>
            <div><span className={label}>Phone</span><input className={input} value={f.phone} onChange={set('phone')} placeholder="+971 …" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><span className={label}>{isLead ? 'Interested in' : 'Client type'}</span><input className={input} value={f.extra} onChange={set('extra')} placeholder={isLead ? '2BR · Marina' : 'Buyer'} /></div>
            <div><span className={label}>{isLead ? 'Budget (AED)' : 'Value (AED)'}</span><input className={input} value={f.value} onChange={set('value')} placeholder="2,000,000" inputMode="numeric" /></div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="md" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" size="md" disabled={saving}>{saving ? 'Saving…' : `Add ${kind}`}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
