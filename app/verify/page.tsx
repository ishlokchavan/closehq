import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface Props {
  searchParams: Promise<{ status?: string; type?: string }>;
}

export default async function VerifyPage({ searchParams }: Props) {
  const { status, type } = await searchParams;

  const content = {
    success: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      title: type === 'educator' ? 'Application confirmed.' : 'Email confirmed.',
      body:
        type === 'educator'
          ? "Your Specialist application is now verified and under review. We'll be in touch within a few days."
          : "You're on the iClose founding cohort. We'll send your Academy login credentials before launch.",
    },
    already: {
      icon: Info,
      iconColor: 'text-accent',
      title: 'Already verified.',
      body: 'This link has already been used. Your email is confirmed — nothing more to do.',
    },
    expired: {
      icon: XCircle,
      iconColor: 'text-orange-400',
      title: 'Link expired.',
      body: 'This verification link has expired (links are valid for 30 days). Please resubmit the form or contact hello@iclose.ae.',
    },
    invalid: {
      icon: XCircle,
      iconColor: 'text-red-400',
      title: 'Invalid link.',
      body: 'This verification link is invalid. If you think this is a mistake, reply to your confirmation email.',
    },
  }[status ?? 'invalid'] ?? {
    icon: XCircle,
    iconColor: 'text-red-400',
    title: 'Something went wrong.',
    body: 'Please try again or reply to your confirmation email.',
  };

  const Icon = content.icon;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper flex items-center pt-12">
        <div className="container-wide w-full flex justify-center py-20">
          <div className="max-w-md w-full bg-white rounded-apple border border-hairline shadow-card p-10 text-center">
            <Icon className={`h-12 w-12 mx-auto mb-6 ${content.iconColor}`} strokeWidth={1.5} />
            <h1
              className="font-display font-semibold text-ink mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
            >
              {content.title}
            </h1>
            <p className="text-[16px] text-graphite-dark leading-[1.55]" style={{ letterSpacing: '-0.012em' }}>
              {content.body}
            </p>
            <a
              href="/"
              className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-hairline text-ink text-[14px] hover:bg-mist transition-colors"
              style={{ letterSpacing: '-0.01em' }}
            >
              Back to iClose
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
