'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { leadSchema, dealSizeOptions, type LeadFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const inputClasses =
  'w-full h-12 px-4 bg-paper border border-hairline rounded-xl text-ink text-[17px] placeholder:text-graphite-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';

export function LeadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { website: '' },
  });

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const isAgent = watch('isAgent');

  const onSubmit = async (data: LeadFormValues) => {
    setServerError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Something went wrong');
      }

      trackEvent('lead_submit', { is_agent: data.isAgent, deal_size: data.dealSize });
      setSuccess(true);
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setServerError(msg);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-mist mb-5">
              <Check className="h-6 w-6 text-ink" strokeWidth={2} />
            </div>
            <h3 className="display-sm">You’re on the list.</h3>
            <p
              className="mt-3 text-[17px] text-graphite-dark max-w-md mx-auto leading-[1.5]"
              style={{ letterSpacing: '-0.012em' }}
            >
              A senior closer from our team will reach out within one business day. Keep an eye on WhatsApp.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
            noValidate
          >
            {/* Honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('website')}
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
              aria-hidden
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Full name" error={errors.name?.message} required>
                <input
                  {...register('name')}
                  type="text"
                  autoComplete="name"
                  placeholder="Ahmed Al Mansoori"
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Phone (WhatsApp)" error={errors.phone?.message} required>
                <input
                  {...register('phone')}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+971 50 123 4567"
                  className={inputClasses}
                />
              </FormField>
            </div>

            <FormField label="Email (optional)" error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClasses}
              />
            </FormField>

            <FormField label="Are you a real estate agent?" error={errors.isAgent?.message} required>
              <div className="grid grid-cols-2 gap-3">
                {(['yes', 'no'] as const).map((value) => {
                  const selected = isAgent === value;
                  return (
                    <label
                      key={value}
                      className={cn(
                        'flex items-center justify-center h-12 cursor-pointer rounded-xl border text-[15px] font-medium transition-all',
                        selected
                          ? 'bg-ink text-white border-ink'
                          : 'bg-paper text-ink border-hairline hover:border-graphite',
                      )}
                      style={{ letterSpacing: '-0.012em' }}
                    >
                      <input
                        {...register('isAgent')}
                        type="radio"
                        value={value}
                        className="sr-only"
                      />
                      {value === 'yes' ? 'Yes, I am' : 'No / Connector'}
                    </label>
                  );
                })}
              </div>
            </FormField>

            <FormField label="Monthly deal volume" error={errors.dealSize?.message} required>
              <div className="relative">
                <select
                  {...register('dealSize')}
                  className={cn(inputClasses, 'appearance-none pr-10')}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your typical volume
                  </option>
                  {dealSizeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-graphite"
                >
                  ▾
                </span>
              </div>
            </FormField>

            {serverError && (
              <div className="text-[15px] text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {serverError}
              </div>
            )}

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Apply to close with us
                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                  </>
                )}
              </Button>
              <p className="mt-4 text-center text-[13px] text-graphite tracking-tight">
                Reviewed within 1 business day. No spam.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label
          className="text-sm font-medium text-graphite-dark tracking-tight"
          style={{ letterSpacing: '-0.01em' }}
        >
          {label}
          {required && <span className="text-graphite-light ml-1">*</span>}
        </label>
        {error && <span className="text-[13px] text-red-600">{error}</span>}
      </div>
      {children}
    </div>
  );
}
