import type { Metadata } from 'next';
import { AuthForm } from '@/components/portal/auth-form';

export const metadata: Metadata = {
  title: 'Sign up | iClose',
  description: 'Create your iClose account to buy, sell, list and earn credits — never pay commission.',
};

export default function SignupPage() {
  return (
    <div className="container-wide py-16 max-w-md">
      <header className="text-center mb-8">
        <h1 className="display-md">Create your account</h1>
        <p className="subhead mt-3">Buy, sell, list and earn credits — without commission.</p>
      </header>
      <AuthForm mode="signup" />
    </div>
  );
}
