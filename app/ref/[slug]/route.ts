import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

export const dynamic = 'force-dynamic';

const hashIp = (ip: string) =>
  createHash('sha256').update(ip).digest('hex').slice(0, 32);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = new URL(request.url);
  const redirectUrl = new URL('/', url.origin);

  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set('referral_slug', slug, {
    maxAge: 60 * 60 * 24 * 90,
    path: '/',
    sameSite: 'lax',
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    try {
      const db = createClient(supabaseUrl, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
      await db.from('referral_clicks').insert({
        code: slug,
        ip_hash: ip ? hashIp(ip) : null,
        user_agent: request.headers.get('user-agent') ?? null,
        referer: request.headers.get('referer') ?? null,
        landing_path: `/ref/${slug}`,
      });
    } catch (err) {
      console.error('[ref] click insert failed:', err);
    }
  }

  return res;
}
