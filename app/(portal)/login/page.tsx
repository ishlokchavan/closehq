import type { Metadata } from 'next';
import { AuthForm } from '@/components/portal/auth-form';

export const metadata: Metadata = {
  title: 'Sign in | iClose',
  description: 'Sign in to your iClose account to manage listings, credits and enquiries.',
};

export default function LoginPage() {
  return (
    <div className="container-wide py-16 max-w-md">
      <header className="text-center mb-8">
        <h1 className="display-md">Welcome back</h1>
        <p className="subhead mt-3">Sign in to your iClose account.</p>
      </header>
      <AuthForm mode="login" />
    </div>
  );
}
