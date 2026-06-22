'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const input =
  'w-full h-11 px-3.5 bg-paper border border-hairline rounded-xl text-ink text-[15px] placeholder:text-graphite-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';

type Role = 'buyer_seller' | 'agent';

interface CloseDealValues {
  name: string;
  email: string;
  phone: string;
  property: string;
  message: string;
  consentPrivacy: boolean;
  website?: string; // honeypot
}

/**
 * "Close a deal" — for people who already know the property (a ready buyer or
 * seller) or agents who want to close directly on iClose. Posts to the shared
 * lead pipeline with the right intent so the deals desk can pick it up fast.
 */
export function CloseDealForm() {
  const [role, setRole] = useState<Role>('buyer_seller');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CloseDealValues>({ defaultValues: { consentPrivacy: false, website: '' } });
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(values: CloseDealValues) {
    setServerError(null);
    const [firstName, ...rest] = values.name.trim().split(' ');
    const roleLabel = role === 'agent' ? 'Agent' : 'Buyer/Seller';
    const payload = {
      firstName: firstName || values.name,
      lastName: rest.join(' ') || '—',
      email: values.email,
      phone: values.phone,
      intent: (role === 'agent' ? 'closer' : 'buyer') as 'closer' | 'buyer',
      message: `[Close a deal · ${roleLabel}] Property: ${values.property}${values.message ? ` — ${values.message}` : ''}`,
      consentPrivacy: values.consentPrivacy,
      website: values.website,
    };
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Something went wrong');
      }
      setSuccess(true);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Something went wrong');
    }
  }

  if (success) {
    return (
      <div className="card-surface p-8 text-center">
        <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-journey-agent/25 mb-4">
          <Check className="h-7 w-7 text-[#b45309]" />
        </span>
        <h2 className="display-sm">Let&apos;s close it</h2>
        <p className="subhead mt-3">
          Our deals desk has your details and will be in touch right away to move things forward —
          commission-free, every step handled.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-surface p-6 space-y-4">
      {/* Who's closing */}
      <div>
        <label className="block text-[13px] font-medium text-ink mb-1.5">I&apos;m a…</label>
        <div className="grid grid-cols-2 gap-2">
          {([['buyer_seller', 'Buyer / Seller'], ['agent', 'Agent']] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setRole(key)}
              className={cn(
                'h-11 rounded-xl border text-[14px] font-medium transition-all',
                role === key ? 'border-accent ring-2 ring-accent/30 bg-accent/[0.03] text-ink' : 'border-hairline text-graphite-dark hover:border-ink/30',
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-[12.5px] text-graphite mt-2">
          {role === 'agent'
            ? 'Bring your buyer or seller and close on iClose — keep 100% of your commission.'
            : 'Know the property you want? Skip the back-and-forth and close it directly.'}
        </p>
      </div>

      <div>
        <label className="block text-[13px] font-medium text-ink mb-1.5">Property reference or link</label>
        <input className={input} placeholder="e.g. IC-4821, a listing URL, or building + unit" {...register('property', { required: 'Tell us which property' })} />
        {errors.property && <p className="text-[12px] text-journey-flag mt-1">{errors.property.message}</p>}
      </div>

      <div>
        <label className="block text-[13px] font-medium text-ink mb-1.5">Full name</label>
        <input className={input} {...register('name', { required: 'Enter your name' })} />
        {errors.name && <p className="text-[12px] text-journey-flag mt-1">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">Email</label>
          <input type="email" className={input} {...register('email', { required: 'Enter your email' })} />
          {errors.email && <p className="text-[12px] text-journey-flag mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">Phone</label>
          <input className={input} {...register('phone', { required: 'Enter your phone' })} />
          {errors.phone && <p className="text-[12px] text-journey-flag mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-[13px] font-medium text-ink mb-1.5">Deal details <span className="text-graphite font-normal">(optional)</span></label>
        <textarea rows={3} className={input + ' h-auto py-2.5'} placeholder="Offer price, stage you're at, timeline…" {...register('message')} />
      </div>
      <label className="flex items-start gap-2.5 text-[13px] text-ink">
        <input type="checkbox" className="h-4 w-4 mt-0.5 accent-[#0071e3]" {...register('consentPrivacy', { required: true })} />
        I agree to be contacted about this deal.
      </label>
      {errors.consentPrivacy && <p className="text-[12px] text-journey-flag">You must agree to continue</p>}

      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register('website')} />
      {serverError && <p className="text-[14px] text-journey-flag">{serverError}</p>}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : 'Start closing'}
      </Button>
    </form>
  );
}
