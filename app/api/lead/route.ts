import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validations';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Honeypot check
    if (parsed.data.website && parsed.data.website.length > 0) {
      // Pretend success to bot
      return NextResponse.json({ ok: true });
    }

    const lead = {
      ...parsed.data,
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || null,
      referer: request.headers.get('referer') || null,
    };

    // Forward to webhook (Make.com / Zapier / CRM) if configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
      } catch (err) {
        // Log but don't fail the user — they shouldn't pay for our infra issue
        console.error('Webhook forward failed:', err);
      }
    } else {
      // Dev-mode log
      console.log('[lead] received:', lead);
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
