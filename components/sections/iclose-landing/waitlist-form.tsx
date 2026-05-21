'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  leadSchema,
  leadDealTypeValues,
  leadFocusValues,
  type LeadFormValues,
} from '@/lib/validations';
import styles from './iclose-landing.module.css';

const focusOptions: { value: (typeof leadFocusValues)[number]; label: string }[] = [
  { value: 'offplan', label: 'Offplan' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'both', label: 'Both' },
];

const dealTypeOptions: {
  value: (typeof leadDealTypeValues)[number];
  label: string;
}[] = [
  { value: 'apartments', label: 'Apartments' },
  { value: 'villas', label: 'Villas' },
  { value: 'townhouses', label: 'Townhouses' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'other', label: 'Other' },
];

export function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      jobTitle: '',
      focus: undefined,
      dealTypes: [],
      message: '',
      consentPrivacy: false,
      consentMarketing: false,
      website: '',
    },
  });

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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

  if (success) {
    return (
      <div className={styles.success}>
        <div className={styles.successBadge} aria-hidden="true">
          ✓
        </div>
        <h3 className={styles.successTitle}>You&apos;re on the list.</h3>
        <p className={styles.successBody}>
          Check your inbox to confirm your email. We&apos;ll reach out before
          launch to walk you through how iClose works for someone like you.
        </p>
      </div>
    );
  }

  const inputErrCls = (hasErr: boolean) =>
    hasErr ? styles.fieldInputError : undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.wlFormFull}
      noValidate
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register('website')}
        className={styles.honeypot}
        aria-hidden
      />

      <div className={styles.formRow}>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>
            <label htmlFor="wl-first">First name</label>
            {errors.firstName && (
              <span className={styles.fieldError}>
                {errors.firstName.message}
              </span>
            )}
          </div>
          <input
            id="wl-first"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            className={inputErrCls(Boolean(errors.firstName))}
            {...register('firstName')}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>
            <label htmlFor="wl-last">Last name</label>
            {errors.lastName && (
              <span className={styles.fieldError}>
                {errors.lastName.message}
              </span>
            )}
          </div>
          <input
            id="wl-last"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            className={inputErrCls(Boolean(errors.lastName))}
            {...register('lastName')}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>
            <label htmlFor="wl-email">Email</label>
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
            )}
          </div>
          <input
            id="wl-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputErrCls(Boolean(errors.email))}
            {...register('email')}
          />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>
            <label htmlFor="wl-phone">Phone</label>
            {errors.phone && (
              <span className={styles.fieldError}>{errors.phone.message}</span>
            )}
          </div>
          <input
            id="wl-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+971 50 123 4567"
            className={inputErrCls(Boolean(errors.phone))}
            {...register('phone')}
          />
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>
          <label htmlFor="wl-job">Job title</label>
          {errors.jobTitle && (
            <span className={styles.fieldError}>{errors.jobTitle.message}</span>
          )}
        </div>
        <input
          id="wl-job"
          type="text"
          autoComplete="organization-title"
          placeholder="e.g. Broker, Sales Director, Wealth Advisor"
          className={inputErrCls(Boolean(errors.jobTitle))}
          {...register('jobTitle')}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>
          <label>What are you focusing on more?</label>
        </div>
        <div className={styles.segGroup} role="radiogroup">
          {focusOptions.map((opt) => (
            <label key={opt.value} className={styles.segOption}>
              <input type="radio" value={opt.value} {...register('focus')} />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>
          <label>What deals do you typically work on?</label>
        </div>
        <Controller
          control={control}
          name="dealTypes"
          render={({ field }) => {
            const value = field.value ?? [];
            const toggle = (v: (typeof leadDealTypeValues)[number]) => {
              if (value.includes(v)) {
                field.onChange(value.filter((x) => x !== v));
              } else {
                field.onChange([...value, v]);
              }
            };
            return (
              <div className={styles.chipGrid}>
                {dealTypeOptions.map((opt) => (
                  <label key={opt.value} className={styles.segOption}>
                    <input
                      type="checkbox"
                      checked={value.includes(opt.value)}
                      onChange={() => toggle(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            );
          }}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>
          <label htmlFor="wl-message">Anything else? (optional)</label>
          {errors.message && (
            <span className={styles.fieldError}>{errors.message.message}</span>
          )}
        </div>
        <textarea
          id="wl-message"
          placeholder="What would make iClose most useful to you?"
          className={inputErrCls(Boolean(errors.message))}
          {...register('message')}
        />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" {...register('consentPrivacy')} />
        <span>
          I have read and agree to the{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
          .
        </span>
      </label>
      {errors.consentPrivacy && (
        <p className={styles.consentError}>{errors.consentPrivacy.message}</p>
      )}

      <label className={styles.consent}>
        <input type="checkbox" {...register('consentMarketing')} />
        <span>
          I&apos;d like to receive updates and news from iClose (optional).
        </span>
      </label>

      {serverError && <p className={styles.serverError}>{serverError}</p>}

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Get early access'}
      </button>
    </form>
  );
}
