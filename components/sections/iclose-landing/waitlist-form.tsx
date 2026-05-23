'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useForm, Controller, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { leadFocusValues, type LeadFormValues } from '@/lib/validations';
import { siteConfig } from '@/lib/site-config';
import styles from './iclose-landing.module.css';

/* Simplified shape. Collected as-is by the form, then split into the
   first/last+consent shape the existing /api/lead route expects. */
const intentValues = ['buyer', 'closer'] as const;

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
  intent: z.enum(intentValues, {
    errorMap: () => ({ message: 'Pick one to continue' }),
  }),
  focus: z
    .array(z.enum(leadFocusValues))
    .min(1, 'Pick at least one focus area')
    .max(3),
  website: z.string().optional(),
});
type SimpleValues = z.infer<typeof simpleSchema>;

const intentOptions: {
  value: (typeof intentValues)[number];
  label: string;
  sub: string;
}[] = [
  {
    value: 'buyer',
    label: 'Buy a property',
    sub: 'Source units, earn back up to 80% commission.',
  },
  {
    value: 'closer',
    label: 'Close / refer deals',
    sub: 'Broker, lawyer, advisor or anyone with clients.',
  },
];

const focusOptions: { value: (typeof leadFocusValues)[number]; label: string }[] = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'offplan', label: 'Offplan' },
];

type StepDef = {
  key: keyof SimpleValues;
  title: string;
  hint?: string;
  validateKeys: (keyof SimpleValues)[];
};

const STEPS: StepDef[] = [
  {
    key: 'fullName',
    title: 'First, what should we call you?',
    hint: 'Your full name.',
    validateKeys: ['fullName'],
  },
  {
    key: 'email',
    title: 'Where should we reach you?',
    hint: 'We’ll email you to confirm. Nothing else.',
    validateKeys: ['email'],
  },
  {
    key: 'phone',
    title: 'And the best number to reach you on?',
    hint: 'We only call if you ask us to.',
    validateKeys: ['phone'],
  },
  {
    key: 'intent',
    title: 'What brings you here?',
    hint: 'So we can tailor the follow-up.',
    validateKeys: ['intent'],
  },
  {
    key: 'focus',
    title: 'What are you focusing more on?',
    hint: 'Pick all that apply.',
    validateKeys: ['focus'],
  },
];

/* Configurable destinations. NEXT_PUBLIC_* vars override at deploy
   time; the defaults are the real iClose Calendly handle and a
   +971 placeholder number. */
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  'https://calendly.com/hello-iclose/30min';
const CALL_PHONE = siteConfig.phone || '+971501234567';

export function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    trigger,
    watch,
  } = useForm<SimpleValues>({
    resolver: zodResolver(simpleSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      intent: undefined,
      focus: [],
      website: '',
    },
  });

  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  /* Remember the user's name + email from the form so we can prefill
     the Calendly embed once it opens in the success state. */
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const stepRef = useRef<HTMLDivElement | null>(null);

  // Auto-focus the first input on each step.
  useEffect(() => {
    if (!stepRef.current) return;
    const el = stepRef.current.querySelector<HTMLElement>(
      'input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea',
    );
    if (el && typeof (el as HTMLInputElement).focus === 'function') {
      setTimeout(() => (el as HTMLInputElement).focus({ preventScroll: true }), 80);
    }
  }, [step]);

  /* Modal lifecycle: Esc to close, lock body scroll while open. */
  useEffect(() => {
    if (!showCalendly) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setShowCalendly(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showCalendly]);

  const total = STEPS.length;
  const current = STEPS[step];
  const progress = ((step + (success ? 1 : 0)) / total) * 100;

  const goNext = async () => {
    setServerError(null);
    const ok = await trigger(current.validateKeys);
    if (!ok) return;
    if (step < total - 1) setStep(step + 1);
  };

  const goBack = () => {
    setServerError(null);
    if (step > 0) setStep(step - 1);
  };

  const onSubmit = async (data: SimpleValues) => {
    setServerError(null);

    const trimmed = data.fullName.trim();
    const parts = trimmed.split(/\s+/);
    const firstName = parts[0] || trimmed;
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : firstName;

    // Submit one row per selected focus to keep the existing API shape
    // (focus enum was previously single-value). Pick the first as the
    // primary; pass the rest as the dealTypes array for context.
    /* Tag intent + extra focuses into the existing payload so the
       team sees them in the lead notification email without needing
       a backend migration:
         - intent goes into jobTitle ("Buyer" / "Closer")
         - any focus beyond the primary rides along in `message` */
    const intentLabel = data.intent === 'buyer' ? 'Buyer' : 'Closer';
    const extraFocus =
      data.focus.length > 1
        ? `Also interested in: ${data.focus.slice(1).join(', ')}`
        : '';

    const payload: LeadFormValues = {
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,
      jobTitle: intentLabel,
      focus: data.focus[0],
      dealTypes: [],
      message: extraFocus,
      consentPrivacy: true,
      consentMarketing: marketingOptIn,
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
      setSubmitted({ name: trimmed, email: data.email });
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

  const onInvalid = (errs: FieldErrors<SimpleValues>) => {
    const firstKey = Object.keys(errs)[0] as keyof SimpleValues;
    const idx = STEPS.findIndex((s) => s.validateKeys.includes(firstKey));
    if (idx >= 0) setStep(idx);
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;
    e.preventDefault();
    if (step === total - 1) {
      formRef.current?.requestSubmit();
    } else {
      void goNext();
    }
  };

  if (success) {
    const calendlyEmbedUrl = (() => {
      const url = new URL(CALENDLY_URL);
      url.searchParams.set('hide_gdpr_banner', '1');
      url.searchParams.set('embed_domain', 'iclose.ae');
      url.searchParams.set('embed_type', 'Inline');
      if (submitted?.name) url.searchParams.set('name', submitted.name);
      if (submitted?.email) url.searchParams.set('email', submitted.email);
      return url.toString();
    })();

    return (
      <>
        <div className={styles.tfShell}>
          <div className={styles.tfProgress}>
            <div className={styles.tfProgressBar} style={{ width: '100%' }} />
          </div>
          <div className={styles.wlSuccess}>
            <div className={styles.successBadge} aria-hidden="true">
              ✓
            </div>
            <h3 className={styles.successTitle}>You&apos;re on the list.</h3>
            <p className={styles.successBody}>
              We&apos;ll be in touch shortly. Or skip the wait. Pick how
              you&apos;d like to talk.
            </p>
            <div className={styles.wlSuccessCtas}>
              <a
                href={`tel:${CALL_PHONE.replace(/\s+/g, '')}`}
                className={styles.btnBluePrimary}
              >
                Call us now
              </a>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => setShowCalendly(true)}
              >
                Schedule a callback later
              </button>
            </div>
          </div>
        </div>

        {/* Portal the modal to document.body so it escapes any
            ancestor that has transform/filter/perspective (the
            section blur-in animation creates such ancestors, which
            otherwise re-root position:fixed and clip the overlay). */}
        {typeof document !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {showCalendly && (
                <motion.div
                  className={styles.calendlyOverlay}
                  onClick={() => setShowCalendly(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Schedule a callback"
                >
                  <motion.div
                    className={styles.calendlyModal}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 16 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      className={styles.calendlyClose}
                      onClick={() => setShowCalendly(false)}
                      aria-label="Close scheduling"
                    >
                      ×
                    </button>
                    <iframe
                      src={calendlyEmbedUrl}
                      title="Schedule a callback with iClose"
                      className={styles.calendlyFrame}
                      allow="camera; microphone; fullscreen"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className={styles.tfShell}
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

      <div className={styles.tfProgress}>
        <div
          className={styles.tfProgressBar}
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          ref={stepRef}
          key={`step-${step}`}
          className={styles.tfStep}
          onKeyDown={handleEnter}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.tfStepMeta}>
            Step {step + 1} of {total}
          </div>
          <h3 className={styles.tfTitle}>{current.title}</h3>
          {current.hint && <p className={styles.tfHint}>{current.hint}</p>}

          <div className={styles.tfField}>
            <StepField
              step={current.key}
              register={register}
              control={control}
              errors={errors}
              watch={watch}
            />
          </div>

          {/* Compliance: marketing-consent opt-in only on the final
              step, and a privacy notice under the submit button. The
              privacy consent is implicit on submission (covered by the
              notice + Privacy Policy link). */}
          {step === total - 1 && (
            <label className={styles.tfConsent}>
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
              />
              <span>
                Send me product updates and launch news. (Optional,                 we don&apos;t share your details.)
              </span>
            </label>
          )}

          <div className={styles.tfControls}>
            <button
              type="button"
              className={styles.tfBack}
              onClick={goBack}
              disabled={step === 0}
            >
              ← Back
            </button>
            {step < total - 1 ? (
              <button
                type="button"
                className={styles.tfNext}
                onClick={goNext}
              >
                Continue <span aria-hidden="true">↵</span>
              </button>
            ) : (
              <button
                type="submit"
                className={styles.tfNext}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Submit'}
              </button>
            )}
          </div>

          {serverError && (
            <p className={styles.serverError} style={{ marginTop: 16 }}>
              {serverError}
            </p>
          )}

          {step === total - 1 && (
            <p className={styles.tfLegal}>
              By submitting you agree to our{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>
              . We&apos;ll only use your details to follow up about iClose.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </form>
  );
}

function StepField({
  step,
  register,
  control,
  errors,
  watch,
}: {
  step: StepDef['key'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  errors: FieldErrors<SimpleValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: any;
}): ReactNode {
  const err = (key: keyof SimpleValues) =>
    errors[key]?.message as string | undefined;

  if (step === 'fullName') {
    return (
      <TextInput
        id="tf-name"
        type="text"
        placeholder="Your full name"
        autoComplete="name"
        error={err('fullName')}
        registration={register('fullName')}
      />
    );
  }
  if (step === 'email') {
    return (
      <TextInput
        id="tf-email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={err('email')}
        registration={register('email')}
      />
    );
  }
  if (step === 'phone') {
    return (
      <TextInput
        id="tf-phone"
        type="tel"
        placeholder="+971 50 123 4567"
        autoComplete="tel"
        error={err('phone')}
        registration={register('phone')}
      />
    );
  }
  if (step === 'intent') {
    return (
      <Controller
        control={control}
        name="intent"
        render={({ field }) => (
          <>
            <div className={styles.intentGroup} role="radiogroup">
              {intentOptions.map((opt) => {
                const checked = field.value === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`${styles.intentOption} ${
                      checked ? styles.intentOptionActive : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="intent"
                      value={opt.value}
                      checked={checked}
                      onChange={() => field.onChange(opt.value)}
                    />
                    <span className={styles.intentLabel}>{opt.label}</span>
                    <span className={styles.intentSub}>{opt.sub}</span>
                  </label>
                );
              })}
            </div>
            {err('intent') && <p className={styles.tfError}>{err('intent')}</p>}
          </>
        )}
      />
    );
  }
  if (step === 'focus') {
    return (
      <Controller
        control={control}
        name="focus"
        render={({ field }) => {
          const value: string[] = field.value ?? [];
          const toggle = (v: (typeof leadFocusValues)[number]) => {
            if (value.includes(v)) {
              field.onChange(value.filter((x) => x !== v));
            } else {
              field.onChange([...value, v]);
            }
          };
          return (
            <>
              <div className={styles.chipGrid}>
                {focusOptions.map((opt) => (
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
              {err('focus') && <p className={styles.tfError}>{err('focus')}</p>}
            </>
          );
        }}
      />
    );
  }
  return null;
}

function TextInput({
  id,
  type,
  placeholder,
  autoComplete,
  error,
  registration,
}: {
  id: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registration: any;
}) {
  return (
    <div className={styles.tfInputWrap}>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${styles.tfInput} ${error ? styles.tfInputError : ''}`}
        {...registration}
      />
      {error && <p className={styles.tfError}>{error}</p>}
    </div>
  );
}
