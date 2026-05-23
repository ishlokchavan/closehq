'use client';

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { useForm, Controller, type FieldErrors } from 'react-hook-form';
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

type StepDef = {
  key: keyof LeadFormValues | 'consent';
  title: string;
  hint?: string;
  optional?: boolean;
  validateKeys: (keyof LeadFormValues)[];
};

const STEPS: StepDef[] = [
  {
    key: 'firstName',
    title: 'First, what should we call you?',
    hint: 'Your first name.',
    validateKeys: ['firstName'],
  },
  {
    key: 'lastName',
    title: 'And your last name?',
    validateKeys: ['lastName'],
  },
  {
    key: 'email',
    title: 'Where should we reach you?',
    hint: 'We’ll email you to confirm — nothing else.',
    validateKeys: ['email'],
  },
  {
    key: 'phone',
    title: 'And the best number to reach you on?',
    hint: 'We’ll only call if you ask us to.',
    validateKeys: ['phone'],
  },
  {
    key: 'jobTitle',
    title: 'What do you do?',
    hint: 'e.g. Broker, Sales Director, Wealth Advisor.',
    validateKeys: ['jobTitle'],
  },
  {
    key: 'focus',
    title: 'What are you focusing on more?',
    validateKeys: ['focus'],
  },
  {
    key: 'dealTypes',
    title: 'What deals do you typically work on?',
    hint: 'Pick all that apply.',
    validateKeys: ['dealTypes'],
    optional: true,
  },
  {
    key: 'message',
    title: 'Anything else we should know?',
    hint: 'Optional. What would make iClose most useful to you?',
    optional: true,
    validateKeys: ['message'],
  },
  {
    key: 'consent',
    title: 'One last thing.',
    hint: 'Privacy & marketing preferences.',
    validateKeys: ['consentPrivacy'],
  },
];

export function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    trigger,
    watch,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: 'onTouched',
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

  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
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

  const total = STEPS.length;
  const current = STEPS[step];
  const progress = ((step + (success ? 1 : 0)) / total) * 100;

  const goNext = async () => {
    setServerError(null);
    const ok = await trigger(current.validateKeys);
    if (!ok && !current.optional) return;
    if (step < total - 1) setStep(step + 1);
  };

  const goBack = () => {
    setServerError(null);
    if (step > 0) setStep(step - 1);
  };

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

  const onInvalid = (errs: FieldErrors<LeadFormValues>) => {
    const firstKey = Object.keys(errs)[0] as keyof LeadFormValues;
    const idx = STEPS.findIndex((s) => s.validateKeys.includes(firstKey));
    if (idx >= 0) setStep(idx);
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;
    // textareas should respect newlines
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;
    e.preventDefault();
    if (step === total - 1) {
      formRef.current?.requestSubmit();
    } else {
      void goNext();
    }
  };

  if (success) {
    return (
      <div className={styles.tfShell}>
        <div className={styles.tfProgress}>
          <div className={styles.tfProgressBar} style={{ width: '100%' }} />
        </div>
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
      </div>
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

      <div
        ref={stepRef}
        className={styles.tfStep}
        onKeyDown={handleEnter}
      >
        <div className={styles.tfStepMeta}>
          Step {step + 1} of {total}
          {current.optional && <span className={styles.tfOptional}> · optional</span>}
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
              {isSubmitting ? 'Sending…' : 'Get early access'}
            </button>
          )}
        </div>

        {serverError && (
          <p className={styles.serverError} style={{ marginTop: 16 }}>
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}

/* Field for the current step */
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
  errors: FieldErrors<LeadFormValues>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: any;
}): ReactNode {
  const err = (key: keyof LeadFormValues) => errors[key]?.message as string | undefined;

  if (step === 'firstName') {
    return (
      <TextInput
        id="tf-first"
        type="text"
        placeholder="First name"
        autoComplete="given-name"
        error={err('firstName')}
        registration={register('firstName')}
      />
    );
  }
  if (step === 'lastName') {
    return (
      <TextInput
        id="tf-last"
        type="text"
        placeholder="Last name"
        autoComplete="family-name"
        error={err('lastName')}
        registration={register('lastName')}
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
  if (step === 'jobTitle') {
    return (
      <TextInput
        id="tf-job"
        type="text"
        placeholder="e.g. Broker, Sales Director, Wealth Advisor"
        autoComplete="organization-title"
        error={err('jobTitle')}
        registration={register('jobTitle')}
      />
    );
  }
  if (step === 'focus') {
    return (
      <>
        <div className={styles.segGroup} role="radiogroup">
          {focusOptions.map((opt) => (
            <label key={opt.value} className={styles.segOption}>
              <input type="radio" value={opt.value} {...register('focus')} />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {err('focus') && <p className={styles.tfError}>{err('focus')}</p>}
      </>
    );
  }
  if (step === 'dealTypes') {
    return (
      <Controller
        control={control}
        name="dealTypes"
        render={({ field }) => {
          const value = field.value ?? [];
          const toggle = (v: (typeof leadDealTypeValues)[number]) => {
            if (value.includes(v)) {
              field.onChange(value.filter((x: string) => x !== v));
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
    );
  }
  if (step === 'message') {
    return (
      <div className={styles.field}>
        <textarea
          id="tf-message"
          placeholder="What would make iClose most useful to you?"
          {...register('message')}
        />
        {err('message') && <p className={styles.tfError}>{err('message')}</p>}
      </div>
    );
  }
  if (step === 'consent') {
    const consentPrivacy = watch('consentPrivacy');
    return (
      <div className={styles.tfConsentBlock}>
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
            .<span className={styles.required}>*</span>
          </span>
        </label>
        {err('consentPrivacy') && (
          <p className={styles.consentError}>{err('consentPrivacy')}</p>
        )}
        <label className={styles.consent}>
          <input type="checkbox" {...register('consentMarketing')} />
          <span>
            I&apos;d like to receive updates and news from iClose (optional).
          </span>
        </label>
        {!consentPrivacy && (
          <p className={styles.tfHint} style={{ marginTop: 8 }}>
            Tick the privacy checkbox above to submit.
          </p>
        )}
      </div>
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
