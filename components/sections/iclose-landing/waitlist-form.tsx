'use client';

import { useState } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  leadFocusValues,
  type LeadFormValues,
} from '@/lib/validations';
import { siteConfig } from '@/lib/site-config';
import styles from './iclose-landing.module.css';

/* Simplified form schema — collected as-is by the form, then split into
   firstName/lastName/etc on submit so the existing /api/lead contract
   stays intact. */
const simpleSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Tell us your full name')
    .max(80, 'Keep it under 80 characters'),
  email: z.string().email('Enter a valid email').max(120),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Use digits, spaces, +, - or ()'),
  focus: z.enum(leadFocusValues, {
    errorMap: () => ({ message: 'Pick one focus area' }),
  }),
  website: z.string().optional(),
});
type SimpleValues = z.infer<typeof simpleSchema>;

const focusOptions: { value: (typeof leadFocusValues)[number]; label: string }[] = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'offplan', label: 'Offplan' },
];

/* Booking + call destinations — swap CALENDLY_URL for the real one
   when the account is set up. Phone falls back to siteConfig.phone or
   a placeholder. */
const CALENDLY_URL = 'https://calendly.com/iclose-uae/intro-call';
const CALL_PHONE = siteConfig.phone || '+971501234567';

export function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SimpleValues>({
    resolver: zodResolver(simpleSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      focus: undefined,
      website: '',
    },
  });

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: SimpleValues) => {
    setServerError(null);

    // Split the single "Full name" field into the first/last shape the
    // /api/lead route still expects.
    const trimmed = data.fullName.trim();
    const parts = trimmed.split(/\s+/);
    const firstName = parts[0] || trimmed;
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : firstName;

    const payload: LeadFormValues = {
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,
      focus: data.focus,
      dealTypes: [],
      message: '',
      consentPrivacy: true,
      consentMarketing: false,
      website: data.website ?? '',
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Something went wrong');
      }
      setSuccess(true);
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    }
  };

  const onInvalid = (_errs: FieldErrors<SimpleValues>) => {
    // (Inline field errors render below each input.)
  };

  if (success) {
    return (
      <div className={styles.wlSuccess}>
        <div className={styles.successBadge} aria-hidden="true">
          ✓
        </div>
        <h3 className={styles.successTitle}>You&apos;re on the list.</h3>
        <p className={styles.successBody}>
          We&apos;ll be in touch shortly. Or skip the wait — pick how
          you&apos;d like to talk.
        </p>
        <div className={styles.wlSuccessCtas}>
          <a
            href={`tel:${CALL_PHONE.replace(/\s+/g, '')}`}
            className={styles.btnBluePrimary}
          >
            <span aria-hidden="true">📞</span> Call us now
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            <span aria-hidden="true">🗓️</span> Schedule a callback later
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className={styles.wlSimple}
      noValidate
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        data-lpignore="true"
        data-1p-ignore="true"
        data-form-type="other"
        {...register('website')}
        className={styles.honeypot}
        aria-hidden
      />

      <div className={styles.wlField}>
        <label htmlFor="wl-name">Full name</label>
        <input
          id="wl-name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          className={errors.fullName ? styles.fieldInputError : undefined}
          {...register('fullName')}
        />
        {errors.fullName && (
          <p className={styles.wlError}>{errors.fullName.message}</p>
        )}
      </div>

      <div className={styles.wlField}>
        <label htmlFor="wl-email">Email</label>
        <input
          id="wl-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={errors.email ? styles.fieldInputError : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p className={styles.wlError}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.wlField}>
        <label htmlFor="wl-phone">Phone</label>
        <input
          id="wl-phone"
          type="tel"
          autoComplete="tel"
          placeholder="+971 50 123 4567"
          className={errors.phone ? styles.fieldInputError : undefined}
          {...register('phone')}
        />
        {errors.phone && (
          <p className={styles.wlError}>{errors.phone.message}</p>
        )}
      </div>

      <div className={styles.wlField}>
        <label>Focusing more on?</label>
        <div className={styles.segGroup} role="radiogroup">
          {focusOptions.map((opt) => (
            <label key={opt.value} className={styles.segOption}>
              <input type="radio" value={opt.value} {...register('focus')} />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.focus && (
          <p className={styles.wlError}>{errors.focus.message}</p>
        )}
      </div>

      {serverError && <p className={styles.serverError}>{serverError}</p>}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}
