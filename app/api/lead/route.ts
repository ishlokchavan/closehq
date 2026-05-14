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
    const firstName = name.split(' ')[0];

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
        console.error('[partner] DB insert failed:', err);
      }
    }

    // Send emails via Resend — each send is independent so one failure doesn't block the other
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      const from = process.env.RESEND_FROM_EMAIL || 'iClose <onboarding@resend.dev>';
      const notifyEmail = process.env.RESEND_NOTIFY_EMAIL || 'start@iclose.ae';

      // Confirmation to the Closer
      try {
        await resend.emails.send({
          from,
          to: email,
          subject: "You're in — iClose founding cohort",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; color: #1d1d1f;">
              <p style="font-size: 24px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.02em;">You're in, ${firstName}.</p>
              <p style="font-size: 17px; color: #6e6e73; line-height: 1.55; margin-bottom: 20px; letter-spacing: -0.01em;">
                You've joined the iClose founding cohort as a <strong style="color: #1d1d1f;">Partner</strong> — on the Plus plan, anonymous from day one, with access to the deal desk when we go live.
              </p>
              <p style="font-size: 17px; color: #6e6e73; line-height: 1.55; margin-bottom: 20px; letter-spacing: -0.01em;">
                Founding members get first access and locked-in terms before the public launch. We'll be in touch.
              </p>
              <p style="font-size: 17px; color: #6e6e73; line-height: 1.55; margin-bottom: 28px; letter-spacing: -0.01em;">
                Questions before then? Reply to this email.
              </p>
              <p style="font-size: 15px; color: #6e6e73;">— The iClose team</p>
              <hr style="border: none; border-top: 1px solid #d2d2d7; margin: 32px 0;" />
              <p style="font-size: 12px; color: #a1a1a6;">iClose · Dubai, UAE · <a href="https://iclose.ae" style="color: #0071e3; text-decoration: none;">iclose.ae</a></p>
            </div>
          `,
        });
      } catch (err) {
        console.error('[partner] confirmation email failed:', err);
      }

      // Notification to admin
      try {
        await resend.emails.send({
          from,
          to: notifyEmail,
          subject: `New Partner: ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; color: #1d1d1f;">
              <p style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">New Partner signup</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                <tr><td style="padding: 8px 0; color: #6e6e73; width: 80px; vertical-align: top;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #6e6e73; vertical-align: top;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
                <tr><td style="padding: 8px 0; color: #6e6e73; vertical-align: top;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #6e6e73; vertical-align: top;">Plan</td><td style="padding: 8px 0;">Plus (default)</td></tr>
                <tr><td style="padding: 8px 0; color: #6e6e73; vertical-align: top;">Source</td><td style="padding: 8px 0;">${referer || 'direct'}</td></tr>
              </table>
            </div>
          `,
        });
      } catch (err) {
        console.error('[partner] admin notification failed:', err);
      }
    }

    // Optional webhook forward
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, plan_key: 'plus', type: 'partner', submittedAt: new Date().toISOString() }),
        });
      } catch (err) {
        console.error('[partner] webhook failed:', err);
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
