import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function RefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [supabase, hdrs, cookieStore] = await Promise.all([
    createClient(),
    headers(),
    cookies(),
  ]);

  const ip = hdrs.get('x-forwarded-for') ?? 'unknown';
  const userAgent = hdrs.get('user-agent') ?? 'unknown';
  const referer = hdrs.get('referer') ?? null;

  await supabase.from('referral_clicks').insert({
    code: slug,
    ip_hash: ip,
    user_agent: userAgent,
    referer,
    landing_path: `/ref/${slug}`,
  });

  cookieStore.set('referral_slug', slug, {
    maxAge: 60 * 60 * 24 * 90,
    path: '/',
    sameSite: 'lax',
  });

  redirect('/');
}
