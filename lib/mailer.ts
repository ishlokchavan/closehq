import nodemailer from 'nodemailer';

export function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  console.log('[mailer] GMAIL_USER defined:', !!process.env.GMAIL_USER);
  console.log('[mailer] GMAIL_APP_PASSWORD defined:', !!process.env.GMAIL_APP_PASSWORD);
  const transporter = createTransport();
  const from = `iClose <${process.env.GMAIL_USER}>`;
  await transporter.sendMail({ from, ...opts });
}
