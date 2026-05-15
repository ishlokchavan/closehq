import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from '@/lib/mailer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const type = searchParams.get('type'); // 'member' | 'educator'

  const origin = new URL(request.url).origin;

  if (!token || !type) {
    return NextResponse.redirect(`${origin}/verify?status=invalid`);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.redirect(`${origin}/verify?status=invalid`);
  }
  const db = createClient(supabaseUrl, supabaseKey);

  // Admin client for creating auth users (service role bypasses RLS)
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminDb = serviceKey ? createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  }) : null;

  if (type === 'member') {
    const { data, error } = await db
      .from('leads')
      .select('id, first_name, email, is_verified')
      .eq('verification_token', token)
      .single();

    if (error || !data) {
      return NextResponse.redirect(`${origin}/verify?status=invalid`);
    }
    if (data.is_verified) {
      return NextResponse.redirect(`${origin}/verify?status=already`);
    }

    await db
      .from('leads')
      .update({ is_verified: true, verified_at: new Date().toISOString() })
      .eq('verification_token', token);

    // Provision a Supabase Auth user — triggers handle_new_user() → profiles insert
    if (adminDb) {
      try {
        const { error: authError } = await adminDb.auth.admin.createUser({
          email: data.email,
          email_confirm: true,
          user_metadata: { full_name: data.first_name },
        });
        if (authError && !authError.message.includes('already been registered')) {
          console.error('[member] auth user creation failed:', authError.message);
        }
      } catch (err) {
        console.error('[member] auth user creation failed:', err);
      }
    }

    // Send welcome email confirming verification
    try {
      await sendEmail({
        to: data.email,
        subject: 'Email confirmed — welcome to iClose',
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#1d1d1f;">
            <p style="font-size:24px;font-weight:600;margin-bottom:8px;letter-spacing:-0.02em;">You're confirmed, ${data.first_name}.</p>
            <p style="font-size:17px;color:#6e6e73;line-height:1.55;margin-bottom:20px;letter-spacing:-0.01em;">
              Your email is verified. You're on the founding cohort list — we'll send your iClose Academy login credentials before launch.
            </p>
            <p style="font-size:17px;color:#6e6e73;line-height:1.55;margin-bottom:28px;letter-spacing:-0.01em;">
              Questions? Reply to this email and we'll get back to you.
            </p>
            <p style="font-size:15px;color:#6e6e73;">— The iClose team</p>
            <hr style="border:none;border-top:1px solid #d2d2d7;margin:32px 0;"/>
            <p style="font-size:12px;color:#a1a1a6;">iClose · Dubai, UAE · <a href="https://iclose.ae" style="color:#0071e3;text-decoration:none;">iclose.ae</a></p>
          </div>
        `,
      });
    } catch (_) {}

    return NextResponse.redirect(`${origin}/verify?status=success&type=member`);
  }

  if (type === 'educator') {
    const { data, error } = await db
      .from('educators')
      .select('id, first_name, email, is_verified')
      .eq('verification_token', token)
      .single();

    if (error || !data) {
      return NextResponse.redirect(`${origin}/verify?status=invalid`);
    }
    if (data.is_verified) {
      return NextResponse.redirect(`${origin}/verify?status=already`);
    }

    await db
      .from('educators')
      .update({ is_verified: true, verified_at: new Date().toISOString() })
      .eq('verification_token', token);

    try {
      await sendEmail({
        to: data.email,
        subject: 'Application confirmed — iClose Specialist',
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#1d1d1f;">
            <p style="font-size:24px;font-weight:600;margin-bottom:8px;letter-spacing:-0.02em;">Email confirmed, ${data.first_name}.</p>
            <p style="font-size:17px;color:#6e6e73;line-height:1.55;margin-bottom:20px;letter-spacing:-0.01em;">
              Your Specialist application is confirmed and under review. We review every application personally and will be in touch within a few days.
            </p>
            <p style="font-size:15px;color:#6e6e73;">— The iClose team</p>
            <hr style="border:none;border-top:1px solid #d2d2d7;margin:32px 0;"/>
            <p style="font-size:12px;color:#a1a1a6;">iClose · Dubai, UAE · <a href="https://iclose.ae" style="color:#0071e3;text-decoration:none;">iclose.ae</a></p>
          </div>
        `,
      });
    } catch (_) {}

    return NextResponse.redirect(`${origin}/verify?status=success&type=educator`);
  }

  return NextResponse.redirect(`${origin}/verify?status=invalid`);
}
