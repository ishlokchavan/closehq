'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/portal/auth-provider';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { PageHeader, Panel, Avatar } from '@/components/portal/dashboard/ui';
import { PERSONAS } from '@/lib/portal/dashboard/persona';

const input = 'w-full h-11 px-3.5 bg-paper border border-hairline rounded-xl text-ink text-[14px] placeholder:text-graphite-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';
const label = 'block text-[13px] font-medium text-ink mb-1.5';

export default function SettingsPage() {
  const { user } = useAuth();
  const { persona, setPersona } = usePersona();
  const meta = user?.user_metadata ?? {};
  const name = (meta.full_name as string) || (meta.name as string) || '';
  const [notif, setNotif] = useState({ leads: true, viewings: true, priceDrops: true, payouts: true, marketing: false });

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your profile, account type and notifications." />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Panel title="Profile">
            <div className="flex items-center gap-4 mb-5">
              <Avatar name={name || 'U'} src={(meta.avatar_url as string) || (meta.picture as string) || null} size={64} />
              <div><Button variant="outline" size="sm">Change photo</Button><p className="text-[12px] text-graphite mt-1.5">JPG or PNG, up to 5MB.</p></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><span className={label}>Full name</span><input className={input} defaultValue={name} placeholder="Your name" /></div>
              <div><span className={label}>Email</span><input className={input} defaultValue={user?.email ?? ''} disabled /></div>
              <div><span className={label}>Phone</span><input className={input} defaultValue={(meta.phone as string) || ''} placeholder="+971 …" /></div>
              <div><span className={label}>Preferred language</span><input className={input} defaultValue="English" /></div>
            </div>
            <div className="mt-4"><span className={label}>Headline</span><input className={input} defaultValue={(meta.headline as string) || ''} placeholder="e.g. Marina & Downtown specialist" /></div>
            <div className="mt-5 flex justify-end"><Button variant="primary" size="md">Save changes</Button></div>
          </Panel>

          <Panel title="Account type" subtitle="Choose the dashboard that matches how you use iClose.">
            <div className="grid sm:grid-cols-3 gap-3">
              {PERSONAS.map((p) => (
                <button key={p.key} onClick={() => setPersona(p.key)}
                  className={cn('text-start rounded-2xl border p-4 transition-all', persona === p.key ? 'border-accent ring-2 ring-accent/30 bg-accent/[0.03]' : 'border-hairline hover:border-ink/30')}>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-ink">{p.label}</span>
                    {persona === p.key && <Check className="h-4 w-4 text-accent" />}
                  </div>
                  <p className="text-[12.5px] text-graphite mt-1.5 leading-snug">{p.description}</p>
                </button>
              ))}
            </div>
            <p className="text-[12px] text-graphite mt-3">Your selection is saved to your account and updates the dashboard immediately.</p>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Notifications">
            <ul className="space-y-1">
              {[
                ['leads', 'New leads & enquiries'],
                ['viewings', 'Viewing reminders'],
                ['priceDrops', 'Saved property price drops'],
                ['payouts', 'Commission & payouts'],
                ['marketing', 'Product news & tips'],
              ].map(([key, lbl]) => (
                <li key={key} className="flex items-center justify-between py-2">
                  <span className="text-[13.5px] text-ink">{lbl}</span>
                  <button onClick={() => setNotif((n) => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                    className={cn('relative h-6 w-10 rounded-full transition-colors', notif[key as keyof typeof notif] ? 'bg-accent' : 'bg-hairline')}>
                    <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all', notif[key as keyof typeof notif] ? 'start-[18px]' : 'start-0.5')} />
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Security">
            <div className="space-y-2.5">
              <Button variant="outline" size="md" className="w-full justify-start">Change password</Button>
              <Button variant="outline" size="md" className="w-full justify-start">Two-factor authentication</Button>
              <Button variant="outline" size="md" className="w-full justify-start">Active sessions</Button>
            </div>
            <button className="text-[13px] text-[#c81e3f] hover:underline mt-4">Delete account</button>
          </Panel>
        </div>
      </div>
    </>
  );
}
