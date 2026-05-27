'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function WelcomeInner() {
  const params = useSearchParams();
  const code = params.get('code') ?? params.get('slug') ?? '';
  const link = `https://iclose.ae/ref/${code}`;
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold mb-2">You&rsquo;re in.</h1>
      <p className="text-gray-500 mb-8">
        Share this link and track everyone you bring to iClose.
      </p>
      <div className="flex items-center gap-2 border rounded-lg px-4 py-3 w-full max-w-md">
        <span className="flex-1 text-sm truncate">{link}</span>
        <button
          onClick={copy}
          className="text-sm font-medium text-black hover:opacity-60"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <a
        href="https://academy.iclose.ae/partner/login"
        className="mt-6 text-sm text-gray-400 underline"
      >
        View your dashboard &rarr;
      </a>
    </main>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={null}>
      <WelcomeInner />
    </Suspense>
  );
}
