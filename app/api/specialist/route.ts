import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { specialistSchema } from '@/lib/validations';

export const runtime = 'edge';

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

    // Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const db = createClient(supabaseUrl, supabaseKey);
        await db.from('specialist_applications').insert({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          message,
          status: 'pending',
          user_agent: userAgent,
          referer,
        });
      } catch (err) {
        console.error('DB insert failed:', err);
      }
    }

    // Send emails via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const from = process.env.RESEND_FROM_EMAIL || 'iClose <noreply@iclose.ae>';
        const notifyEmail = process.env.RESEND_NOTIFY_EMAIL || 'start@iclose.ae';

        await Promise.all([
          // Confirmation to specialist
          resend.emails.send({
            from,
            to: email,
            subject: 'Your iClose specialist application',
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; color: #1d1d1f;">
                <p style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Application received, ${firstName}.</p>
                <p style="font-size: 17px; color: #6e6e73; line-height: 1.5; margin-bottom: 24px;">
                  We review every specialist application personally. We're looking for people with genuine, tested knowledge of the Dubai market — not theory.
                </p>
                <p style="font-size: 17px; color: #6e6e73; line-height: 1.5; margin-bottom: 24px;">
                  If your profile is the right fit, we'll be in touch within a few days to talk through the next step.
                </p>
                <p style="font-size: 15px; color: #6e6e73;">— The iClose team</p>
                <hr style="border: none; border-top: 1px solid #d2d2d7; margin: 32px 0;" />
                <p style="font-size: 12px; color: #a1a1a6;">iClose · Dubai, UAE · <a href="https://iclose.ae" style="color: #0071e3;">iclose.ae</a></p>
              </div>
            `,
          }),
          // Notification to admin
          resend.emails.send({
            from,
            to: notifyEmail,
            subject: `New specialist application: ${firstName} ${lastName}`,
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 520px; color: #1d1d1f;">
                <p style="font-size: 18px; font-weight: 600;">New specialist application</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                  <tr><td style="padding: 8px 0; color: #6e6e73; width: 100px;">Name</td><td>${firstName} ${lastName}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6e6e73;">Email</td><td>${email}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6e6e73;">Phone</td><td>${phone}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6e6e73;">Source</td><td>${referer || 'direct'}</td></tr>
                </table>
                <p style="font-size: 15px; color: #6e6e73; margin-top: 20px;"><strong>Message:</strong></p>
                <p style="font-size: 15px; color: #1d1d1f; background: #f5f5f7; padding: 16px; border-radius: 8px;">${message}</p>
              </div>
            `,
          }),
        ]);
      } catch (err) {
        console.error('Email send failed:', err);
      }
    }

    // Optional webhook forward
    const webhookUrl = process.env.SPECIALIST_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'specialist_application',
            firstName, lastName, email, phone, message,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error('Webhook forward failed:', err);
      }
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
