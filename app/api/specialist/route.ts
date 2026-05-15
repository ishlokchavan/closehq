import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { specialistSchema } from '@/lib/validations';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = specialistSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const { firstName, lastName, email, phone, message } = parsed.data;
    const userAgent = request.headers.get('user-agent') || undefined;
    const referer = request.headers.get('referer') || undefined;
    const origin = new URL(request.url).origin;

    // Generate token server-side — no need to read it back from DB
    const verificationToken = randomUUID();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const db = createClient(supabaseUrl, supabaseKey);

    try {
      const { error } = await db
        .from('educators')
        .insert({
          name: `${firstName} ${lastName}`.trim(),
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          expertise: message,
          status: 'pending',
          verification_token: verificationToken,
        });
      if (error) console.error('[specialist] DB insert failed:', error.message);
    } catch (err) {
      console.error('[specialist] DB insert failed:', err);
    }

    const notifyEmail = process.env.NOTIFY_EMAIL || 'ishlokchavan@gmail.com';
    const verifyUrl = `${origin}/api/verify?token=${verificationToken}&type=educator`;

    // Verification email to specialist
    try {
      await sendEmail({
        to: email,
        subject: 'Confirm your iClose Specialist application',
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#1d1d1f;">
            <p style="font-size:24px;font-weight:600;margin-bottom:8px;letter-spacing:-0.02em;">Application received, ${firstName}.</p>
            <p style="font-size:17px;color:#6e6e73;line-height:1.55;margin-bottom:20px;letter-spacing:-0.01em;">
              We review every Specialist application personally. First, please confirm your email to complete your submission.
            </p>
            <a href="${verifyUrl}" style="display:inline-block;margin-bottom:24px;padding:14px 28px;background:#1d1d1f;color:#ffffff;border-radius:100px;font-size:15px;font-weight:500;text-decoration:none;letter-spacing:-0.01em;">
              Confirm my email
            </a>
            <p style="font-size:13px;color:#a1a1a6;margin-bottom:20px;">Or copy this link: <a href="${verifyUrl}" style="color:#0071e3;">${verifyUrl}</a></p>
            <p style="font-size:17px;color:#6e6e73;line-height:1.55;margin-bottom:28px;letter-spacing:-0.01em;">
              Once confirmed, our team will review your application and be in touch within a few days.
            </p>
            <p style="font-size:15px;color:#6e6e73;">— The iClose team</p>
            <hr style="border:none;border-top:1px solid #d2d2d7;margin:32px 0;"/>
            <p style="font-size:12px;color:#a1a1a6;">iClose · Dubai, UAE · <a href="https://iclose.ae" style="color:#0071e3;text-decoration:none;">iclose.ae</a></p>
          </div>
        `,
      });
    } catch (err) {
      console.error('[specialist] verification email failed:', err);
    }

    // Admin notification
    try {
      await sendEmail({
        to: notifyEmail,
        subject: `New Specialist application: ${firstName} ${lastName}`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;color:#1d1d1f;">
            <p style="font-size:18px;font-weight:600;margin-bottom:16px;">New Specialist application</p>
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr><td style="padding:8px 0;color:#6e6e73;width:80px;">Name</td><td style="padding:8px 0;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6e73;">Email</td><td style="padding:8px 0;">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6e73;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6e73;">Source</td><td style="padding:8px 0;">${referer || 'direct'}</td></tr>
            </table>
            <p style="font-size:15px;color:#6e6e73;margin-top:20px;margin-bottom:6px;"><strong style="color:#1d1d1f;">Expertise / Message</strong></p>
            <p style="font-size:15px;color:#1d1d1f;background:#f5f5f7;padding:16px;border-radius:8px;line-height:1.55;">${message}</p>
          </div>
        `,
      });
    } catch (err) {
      console.error('[specialist] admin notification failed:', err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Specialist API error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 },
    );
  }
}
