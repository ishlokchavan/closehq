'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const generateCode = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') +
  '-' +
  Math.random().toString(36).slice(2, 6);

export default function PartnerSignup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: Math.random().toString(36).slice(2, 12),
      options: { data: { role: 'partner', name: form.name, phone: form.phone } },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const code = generateCode(form.name);

    const { error: partnerError } = await supabase.from('partners').insert({
      user_id: authData.user?.id,
      name: form.name,
      email: form.email,
      phone: form.phone,
      code,
      status: 'active',
    });

    if (partnerError) {
      setError(partnerError.message);
      setLoading(false);
      return;
    }

    router.push('/partners/welcome?code=' + code);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Become a Partner</h1>
        <p className="text-gray-500">Takes 30 seconds. No approval needed.</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          className="w-full border px-4 py-3 rounded-lg"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full border px-4 py-3 rounded-lg"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border px-4 py-3 rounded-lg"
          placeholder="Phone (WhatsApp preferred)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:opacity-80 transition"
        >
          {loading ? 'Creating your link...' : 'Get My Referral Link'}
        </button>
      </div>
    </main>
  );
}
