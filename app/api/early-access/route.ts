import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { sendEmail } from '@/lib/mailer';

/* Early-access capture for the single-field hero form. Deliberately
   lightweight: the hero only asks for an email, so we store what we
   have (email + which audience toggle they were on) and notify the
   team. DB persistence is best-effort — if the leads table rejects a
   name/phone-less row we still email the team so no signup is lost. */

const schema = z.object({
  email: z.string().email('Enter a valid email').max(120),
  audience: z.enum(['buyers', 'agents']).optional().default('buyers'),
});

const maskEmail = (e: string) => {
  const [local, domain] = e.split('@');
  return `${local.slice(0, 2)}${'*'.repeat(Math.max(local.length - 2, 3))}@${domain}`;
};

export async function POST(request: Request) {
  let email = '';
  let audience: 'buyers' | 'agents' = 'buyers';
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Enter a valid email address.' },
        { status: 400 },
      );
    }
    email = parsed.data.email.trim().toLowerCase();
    audience = parsed.data.audience;

    const userAgent = request.headers.get('user-agent') || undefined;
    const referer = request.headers.get('referer') || undefined;

    // Best-effort persistence.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const db = createClient(supabaseUrl, supabaseKey);
        const { error } = await db.from('leads').insert({
          email,
          name: email.split('@')[0],
          source: 'early_access',
          intent: audience === 'agents' ? 'closer' : 'buyer',
          user_agent: userAgent,
          referer,
        });
        if (error && error.code === '23505') {
          // Already on the list — treat as success from the user's side.
          return NextResponse.json({ ok: true });
        }
        if (error) {
          console.warn('[early-access] lead insert skipped:', error.message);
        }
      } catch (err) {
        console.warn('[early-access] DB unavailable:', err);
      }
    }

    // Notify the team (best-effort).
    const notifyEmail = process.env.NOTIFY_EMAIL;
    if (notifyEmail) {
      try {
        await sendEmail({
          to: notifyEmail,
          subject: `New early-access signup (${audience})`,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1d1d1f;">
              <p style="font-size:18px;font-weight:600;margin-bottom:12px;">New early-access signup</p>
              <p style="font-size:15px;margin:4px 0;">Email: ${email}</p>
              <p style="font-size:15px;margin:4px 0;">Audience: ${audience}</p>
              <p style="font-size:15px;margin:4px 0;">Source: ${referer ? new URL(referer).hostname : 'direct'}</p>
            </div>
          `,
        });
      } catch (err) {
        console.warn(
          '[early-access] admin notification failed for',
          maskEmail(email),
          err,
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[early-access] error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 },
    );
  }
}
