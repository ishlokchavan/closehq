import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL ?? 'iClose <noreply@iclose.ae>';
  await resend.emails.send({ from, ...opts });
}
