import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { leadSchema } from '@/lib/validations';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const { name, phone, email } = parsed.data;
    const userAgent = request.headers.get('user-agent') || undefined;
    const referer = request.headers.get('referer') || undefined;

    // Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const db = createClient(supabaseUrl, supabaseKey);
        await db.from('leads').insert({
          name,
          phone,
          email,
          plan_key: 'plus',
          source: 'landing_page',
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
          // Confirmation to the agent
          resend.emails.send({
            from,
            to: email,
            subject: "You're on the list — iClose early access",
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; color: #1d1d1f;">
                <p style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">You're in, ${name.split(' ')[0]}.</p>
                <p style="font-size: 17px; color: #6e6e73; line-height: 1.5; margin-bottom: 24px;">
                  We've added you to the iClose founding cohort. You'll be among the first to access the platform when we go live.
                </p>
                <p style="font-size: 17px; color: #6e6e73; line-height: 1.5; margin-bottom: 24px;">
                  In the meantime — if you have questions or want to talk through how iClose works, reply to this email.
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
            subject: `New lead: ${name}`,
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 520px; color: #1d1d1f;">
                <p style="font-size: 18px; font-weight: 600;">New lead submission</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                  <tr><td style="padding: 8px 0; color: #6e6e73; width: 100px;">Name</td><td>${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6e6e73;">Email</td><td>${email}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6e6e73;">Phone</td><td>${phone}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6e6e73;">Plan</td><td>Plus (default)</td></tr>
                  <tr><td style="padding: 8px 0; color: #6e6e73;">Source</td><td>${referer || 'direct'}</td></tr>
                </table>
              </div>
            `,
          }),
        ]);
      } catch (err) {
        console.error('Email send failed:', err);
      }
    }

    // Optional webhook forward
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, plan_key: 'plus', submittedAt: new Date().toISOString() }),
        });
      } catch (err) {
        console.error('Webhook forward failed:', err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Lead API error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 },
    );
  }
}
