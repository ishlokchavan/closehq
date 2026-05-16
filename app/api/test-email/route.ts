import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_KEY;
  const from = process.env.BREVO_FROM_EMAIL ?? 'iClose <noreply.iclose@gmail.com>';

  if (!user || !pass) {
    return NextResponse.json({ error: 'Missing BREVO_SMTP_USER or BREVO_SMTP_KEY env vars' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from,
      to: user,
      subject: 'Brevo SMTP test',
      html: '<p>SMTP is working correctly.</p>',
    });
    return NextResponse.json({ ok: true, from, to: user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message, from, smtpUser: user }, { status: 500 });
  }
}
