'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const input =
  'w-full h-11 px-3.5 bg-paper border border-hairline rounded-xl text-ink text-[15px] placeholder:text-graphite-light focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';

interface AuthValues {
  name?: string;
  email: string;
  password: string;
}

/** Email/password auth wired to Supabase Auth. mode = 'login' | 'signup'. */
export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({ defaultValues: { name: '', email: '', password: '' } });
  const [serverError, setServerError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function onSubmit(values: AuthValues) {
    setServerError(null);
    try {
      const { supabase } = await import('@/lib/supabase');
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password });
        if (error) throw error;
        router.push('/');
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: { data: { full_name: values.name } },
        });
        if (error) throw error;
        if (data.session) {
          router.push('/');
          router.refresh();
        } else {
          setCheckEmail(true); // email confirmation required
        }
      }
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Authentication failed');
    }
  }

  if (checkEmail) {
    return (
      <div className="card-surface p-8 text-center">
        <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-journey-listing/15 mb-4">
          <Check className="h-7 w-7 text-journey-listing" />
        </span>
        <h2 className="display-sm">Check your email</h2>
        <p className="subhead mt-3">We sent a confirmation link to finish creating your account.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-surface p-6 space-y-4">
      {mode === 'signup' && (
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">Full name</label>
          <input className={input} {...register('name', { required: 'Enter your name' })} />
          {errors.name && <p className="text-[12px] text-journey-flag mt-1">{errors.name.message}</p>}
        </div>
      )}
      <div>
        <label className="block text-[13px] font-medium text-ink mb-1.5">Email</label>
        <input type="email" className={input} {...register('email', { required: 'Enter your email' })} />
        {errors.email && <p className="text-[12px] text-journey-flag mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-[13px] font-medium text-ink mb-1.5">Password</label>
        <input type="password" className={input} {...register('password', { required: 'Enter your password', minLength: { value: 6, message: 'At least 6 characters' } })} />
        {errors.password && <p className="text-[12px] text-journey-flag mt-1">{errors.password.message}</p>}
      </div>

      {serverError && <p className="text-[14px] text-journey-flag">{serverError}</p>}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Please wait…</> : mode === 'login' ? 'Sign in' : 'Create account'}
      </Button>

      <p className="text-[13px] text-graphite text-center">
        {mode === 'login' ? (
          <>New to iClose? <Link href="/signup" className="text-accent hover:underline">Create an account</Link></>
        ) : (
          <>Already have an account? <Link href="/login" className="text-accent hover:underline">Sign in</Link></>
        )}
      </p>
    </form>
  );
}
