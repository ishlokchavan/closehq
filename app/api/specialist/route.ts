import { NextResponse } from 'next/server';
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

    const application = {
      ...parsed.data,
      type: 'specialist_application',
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || null,
      referer: request.headers.get('referer') || null,
    };

    const webhookUrl = process.env.SPECIALIST_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(application),
        });
      } catch (err) {
        console.error('Webhook forward failed:', err);
      }
    } else {
      console.log('[specialist] application received:', application);
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
