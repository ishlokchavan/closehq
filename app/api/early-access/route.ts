import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { sendEmail } from '@/lib/mailer';

/* Early-access capture for the single-field hero form. The hero only asks
   for an email; we store it (plus which audience toggle they were on) in
   the leads table, send the user an audience-specific welcome email with
   the App Store link, and notify the team. Emails are best-effort so a
   send failure never fails the signup. */

const schema = z.object({
  email: z.string().email('Enter a valid email').max(120),
  audience: z.enum(['buyers', 'agents']).optional().default('buyers'),
});

const APP_STORE_URL = 'https://apps.apple.com/in/app/iclose/id6783816832';
const ACCENT = '#c6ff3d';
/* All iClose mail is sent from and replied to at hello@iclose.ae so it
   aligns with the domain (deliverability) and replies reach the team. */
const MAIL_FROM = 'iClose <hello@iclose.ae>';
const MAIL_REPLY_TO = 'hello@iclose.ae';

const emailFooter = () => {
  const contact = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@iclose.ae';
  return `
    <hr style="border:none;border-top:1px solid rgba(255,255,255,.12);margin:28px 0;"/>
    <p style="font-size:11px;color:#8a8a8a;line-height:1.6;">
      iClose · Dubai, UAE · <a href="https://iclose.ae" style="color:${ACCENT};text-decoration:none;">iclose.ae</a><br/>
      You received this because you joined the early-access list at iclose.ae.
      To unsubscribe or request data removal, email
      <a href="mailto:${contact}" style="color:${ACCENT};">${contact}</a>.
    </p>`;
};

const WELCOME = {
  buyers: {
    subject: "You're in. Welcome to iClose early access",
    heading: "You're on the list.",
    body: "Welcome to iClose early access. Skip the agent fees and close your ready or off-plan Dubai deal directly, with exclusive agent-free discounts you can't get anywhere else. We'll email you as we roll out invites.",
  },
  agents: {
    subject: "You're in. Start keeping 100% of your commission",
    heading: "You're on the list.",
    body: "Welcome to iClose early access. Stop splitting your hard-earned money. With iClose you keep 100% of your commission on every personal lead. We'll email you as we roll out invites.",
  },
} as const;

const welcomeEmailHtml = (audience: 'buyers' | 'agents') => {
  const w = WELCOME[audience];
  return `
  <div style="background:#050505;padding:32px 0;">
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:520px;margin:0 auto;background:#0c0c0c;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:36px 32px;color:#ffffff;">
      <p style="font-size:22px;font-weight:800;letter-spacing:-.02em;margin:0 0 6px;">
        ${w.heading.replace('.', `<span style="color:${ACCENT};">.</span>`)}
      </p>
      <p style="font-size:16px;color:rgba(255,255,255,.7);line-height:1.6;margin:0 0 22px;">
        ${w.body}
      </p>
      <p style="font-size:15px;color:rgba(255,255,255,.7);line-height:1.6;margin:0 0 18px;">
        iClose is live on <strong style="color:#fff;">iOS</strong>. Download it now to get started:
      </p>
      <a href="${APP_STORE_URL}" style="display:inline-block;background:${ACCENT};color:#050505;font-size:16px;font-weight:800;text-decoration:none;padding:14px 26px;border-radius:12px;">
        Download on the App Store
      </a>
      <p style="font-size:13px;color:rgba(255,255,255,.45);margin:16px 0 0;">
        Android app coming soon.
      </p>
      ${emailFooter()}
    </div>
  </div>`;
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
    const source = referer ? new URL(referer).hostname : 'direct';
    // Store the audience on the lead. The leads table's intent enum is
    // buyer | closer, so an agent maps to "closer".
    const intent = audience === 'agents' ? 'closer' : 'buyer';

    // Persist the lead. The leads table requires a non-null phone, but its
    // unique index on phone is partial (excludes empty strings), so an
    // empty phone is safe for these email-only signups.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const db = createClient(supabaseUrl, supabaseKey);
        const { error } = await db.from('leads').insert({
          name: email.split('@')[0],
          phone: '',
          email,
          source: 'early_access',
          intent,
          consent_marketing: true,
          consented_at: new Date().toISOString(),
          user_agent: userAgent,
          referer,
        });
        if (error && error.code !== '23505') {
          // 23505 = duplicate email; already on the list, not an error.
          console.warn('[early-access] lead insert failed:', error.message);
        }
      } catch (err) {
        console.warn('[early-access] DB unavailable:', err);
      }
    }

    // Welcome email to the user (audience-specific).
    try {
      await sendEmail({
        to: email,
        from: MAIL_FROM,
        replyTo: MAIL_REPLY_TO,
        subject: WELCOME[audience].subject,
        html: welcomeEmailHtml(audience),
      });
    } catch (err) {
      console.warn('[early-access] welcome email failed:', err);
    }

    // Admin notification to the team.
    const adminEmail = process.env.NOTIFY_EMAIL || 'hello@iclose.ae';
    try {
      await sendEmail({
        to: adminEmail,
        from: MAIL_FROM,
        replyTo: MAIL_REPLY_TO,
        subject: `New early-access signup (${audience}): ${email}`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;color:#1d1d1f;">
            <p style="font-size:18px;font-weight:600;margin-bottom:16px;">New early-access signup</p>
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr><td style="padding:8px 0;color:#6e6e73;width:120px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6e6e73;">Type</td><td style="padding:8px 0;">${audience === 'agents' ? 'Agent' : 'Buyer'}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6e73;">Source</td><td style="padding:8px 0;">${source}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6e73;">Signed up</td><td style="padding:8px 0;">${new Date().toUTCString()}</td></tr>
            </table>
          </div>
        `,
      });
    } catch (err) {
      console.warn('[early-access] admin notification failed:', err);
    }

    return NextResponse.json({ ok: true, appStoreUrl: APP_STORE_URL });
  } catch (err) {
    console.error('[early-access] error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 },
    );
  }
}
