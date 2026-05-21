import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { leadSchema } from '@/lib/validations';
import { sendEmail } from '@/lib/mailer';

const emailFooter = () => {
  const contact = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@iclose.ae';
  return `
  <hr style="border:none;border-top:1px solid #d2d2d7;margin:32px 0;"/>
  <p style="font-size:11px;color:#a1a1a6;line-height:1.6;">
    iClose · Dubai, UAE · <a href="https://iclose.ae" style="color:#0071e3;text-decoration:none;">iclose.ae</a><br/>
    You received this because you submitted a form at iclose.ae.
    To unsubscribe or request data removal, email <a href="mailto:${contact}" style="color:#0071e3;">${contact}</a>.
  </p>
`};

const maskEmail = (e: string) => {
  const [local, domain] = e.split('@');
  return `${local.slice(0, 2)}${'*'.repeat(Math.max(local.length - 2, 3))}@${domain}`;
};
const maskPhone = (p: string) => `****${p.replace(/\D/g, '').slice(-4)}`;

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

    const {
      firstName,
      lastName,
      phone,
      email,
      consentMarketing,
      jobTitle,
      focus,
      dealTypes,
      message,
    } = parsed.data;
    const focusLabels: Record<string, string> = {
      offplan: 'Offplan',
      secondary: 'Secondary',
      both: 'Both',
    };
    const dealTypeLabels: Record<string, string> = {
      apartments: 'Apartments',
      villas: 'Villas',
      townhouses: 'Townhouses',
      commercial: 'Commercial',
      other: 'Other',
    };
    const focusLabel = focus ? focusLabels[focus] : '—';
    const dealTypesLabel =
      dealTypes && dealTypes.length
        ? dealTypes.map((d) => dealTypeLabels[d] ?? d).join(', ')
        : '—';
    const escapeHtml = (s: string) =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    const name = `${firstName} ${lastName}`.trim();
    const userAgent = request.headers.get('user-agent') || undefined;
    const referer = request.headers.get('referer') || undefined;
    const origin = new URL(request.url).origin;
    const verificationToken = randomUUID();

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) {
        console.error('[member] Missing Supabase env vars');
      } else {
        const db = createClient(supabaseUrl, supabaseKey);
        const { error } = await db.from('leads').insert({
          name,
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
          plan_key: 'plus',
          source: 'landing_page',
          user_agent: userAgent,
          referer,
          verification_token: verificationToken,
          consent_marketing: consentMarketing ?? false,
          consented_at: new Date().toISOString(),
        });
        if (error) console.error('[member] DB insert failed:', error.message);
      }
    } catch (err) {
      console.error('[member] DB insert failed:', err);
    }

    const notifyEmail = process.env.NOTIFY_EMAIL;
    const verifyUrl = `${origin}/api/verify?token=${verificationToken}&type=member`;

    // Verification email to member
    try {
      await sendEmail({
        to: email,
        subject: "You're in — confirm your iClose email",
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;color:#1d1d1f;">
            <p style="font-size:24px;font-weight:600;margin-bottom:8px;letter-spacing:-0.02em;">Welcome, ${firstName}.</p>
            <p style="font-size:17px;color:#6e6e73;line-height:1.55;margin-bottom:20px;letter-spacing:-0.01em;">
              You've joined the iClose founding cohort as a <strong style="color:#1d1d1f;">Member</strong>. One last step — confirm your email to secure your place.
            </p>
            <a href="${verifyUrl}" style="display:inline-block;margin-bottom:24px;padding:14px 28px;background:#1d1d1f;color:#ffffff;border-radius:100px;font-size:15px;font-weight:500;text-decoration:none;letter-spacing:-0.01em;">
              Confirm my email
            </a>
            <p style="font-size:13px;color:#a1a1a6;margin-bottom:20px;">Or copy this link: <a href="${verifyUrl}" style="color:#0071e3;">${verifyUrl}</a></p>
            <p style="font-size:17px;color:#6e6e73;line-height:1.55;margin-bottom:28px;letter-spacing:-0.01em;">
              Founding members get first access and locked-in terms before public launch.
            </p>
            <p style="font-size:15px;color:#6e6e73;">— The iClose team</p>
            ${emailFooter()}
          </div>
        `,
      });
    } catch (err) {
      console.error('[member] verification email failed:', err);
    }

    // Admin notification — PII masked
    if (notifyEmail) {
      try {
        await sendEmail({
          to: notifyEmail,
          subject: `New Member signup: ${name}`,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;color:#1d1d1f;">
              <p style="font-size:18px;font-weight:600;margin-bottom:16px;">New Member signup</p>
              <table style="width:100%;border-collapse:collapse;font-size:15px;">
                <tr><td style="padding:8px 0;color:#6e6e73;width:120px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;">Email</td><td style="padding:8px 0;">${maskEmail(email)}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;">Phone</td><td style="padding:8px 0;">${maskPhone(phone)}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;">Job title</td><td style="padding:8px 0;">${jobTitle ? escapeHtml(jobTitle) : '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;">Focus</td><td style="padding:8px 0;">${focusLabel}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;">Deal types</td><td style="padding:8px 0;">${dealTypesLabel}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;vertical-align:top;">Notes</td><td style="padding:8px 0;white-space:pre-wrap;">${message ? escapeHtml(message) : '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;">Marketing</td><td style="padding:8px 0;">${consentMarketing ? 'Opted in' : 'Not opted in'}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;">Source</td><td style="padding:8px 0;">${referer ? new URL(referer).hostname : 'direct'}</td></tr>
                <tr><td style="padding:8px 0;color:#6e6e73;">Status</td><td style="padding:8px 0;">Pending email confirmation</td></tr>
              </table>
            </div>
          `,
        });
      } catch (err) {
        console.error('[member] admin notification failed:', err);
      }
    } else {
      console.warn('[member] NOTIFY_EMAIL not set — skipping admin notification');
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
