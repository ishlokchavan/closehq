'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { leadSchema, dealSizeOptions, type LeadFormValues } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function LeadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      website: '',
    },
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

      trackEvent('lead_submit', {
        is_agent: data.isAgent,
        deal_size: data.dealSize,
      });

      setSuccess(true);
      reset();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
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
            className="text-center py-10"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 border border-gold/40 mb-6">
              <Check className="h-7 w-7 text-gold" strokeWidth={2} />
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-bone font-light tracking-tight">
              You&apos;re on the list.
            </h3>
            <p className="mt-3 text-bone/60 max-w-md mx-auto">
              A senior closer from our team will reach out within one business
              day. Keep an eye on WhatsApp.
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Full name"
                error={errors.name?.message}
                required
              >
                <input
                  {...register('name')}
                  type="text"
                  autoComplete="name"
                  placeholder="Ahmed Al Mansoori"
                  className="form-input"
                />
              </Field>

              <Field
                label="Phone (WhatsApp)"
                error={errors.phone?.message}
                required
              >
                <input
                  {...register('phone')}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+971 50 123 4567"
                  className="form-input"
                />
              </Field>
            </div>

            <Field label="Email (optional)" error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="form-input"
              />
            </Field>

            <Field
              label="Are you a real estate agent?"
              error={errors.isAgent?.message}
              required
            >
              <div className="grid grid-cols-2 gap-3">
                {(['yes', 'no'] as const).map((value) => {
                  const selected = isAgent === value;
                  return (
                    <label
                      key={value}
                      className={cn(
                        'flex items-center justify-center h-12 cursor-pointer border text-sm uppercase tracking-[0.18em] font-medium transition-all',
                        selected
                          ? 'bg-gold text-ink border-gold'
                          : 'bg-transparent text-bone/70 border-bone/15 hover:border-bone/40',
                      )}
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
            </Field>

            <Field
              label="Monthly deal volume"
              error={errors.dealSize?.message}
              required
            >
              <div className="relative">
                <select
                  {...register('dealSize')}
                  className="form-input appearance-none pr-10"
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
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone/40"
                >
                  ▾
                </span>
              </div>
            </Field>

            {serverError && (
              <div className="text-sm text-red-400 border border-red-400/30 bg-red-400/5 px-4 py-3">
                {serverError}
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Apply to close with us
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="mt-4 text-center text-[11px] font-mono uppercase tracking-[0.2em] text-bone/40">
                Reviewed within 1 business day · No spam
              </p>
            </div>

            <style jsx>{`
              .form-input {
                width: 100%;
                height: 3rem;
                padding: 0 1rem;
                background-color: transparent;
                border: 1px solid rgba(244, 241, 234, 0.15);
                color: #f4f1ea;
                font-size: 0.95rem;
                transition: all 0.2s ease;
                outline: none;
              }
              .form-input::placeholder {
                color: rgba(244, 241, 234, 0.3);
              }
              .form-input:focus {
                border-color: #c8a862;
                background-color: rgba(200, 168, 98, 0.04);
              }
              select.form-input {
                color: #f4f1ea;
              }
              select.form-input option {
                background-color: #0a0a0b;
                color: #f4f1ea;
              }
            `}</style>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
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
        <label className="block text-[11px] font-mono uppercase tracking-[0.22em] text-bone/60">
          {label}
          {required && <span className="text-gold ml-1">*</span>}
        </label>
        {error && (
          <span className="text-[11px] text-red-400">{error}</span>
        )}
      </div>
      {children}
    </div>
  );
}
