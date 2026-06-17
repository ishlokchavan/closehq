import { NextResponse } from 'next/server';

/**
 * "Why this matches you" — generates a one-line, grounded explanation of why a
 * listing fits the user's behaviour. Uses Claude when ANTHROPIC_API_KEY is set;
 * otherwise the client keeps its instant deterministic reason. The recommender
 * still does the ranking — this only *explains* it (never invents facts).
 */

interface Body {
  liked?: string[];
  listing?: {
    title?: string;
    community?: string;
    city?: string;
    type?: string;
    beds?: number | null;
    price?: string;
    hook?: string;
    credits?: string;
  };
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Not configured — tell the client to keep its deterministic line.
    return NextResponse.json({ reason: null }, { status: 200 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const listing = body.listing ?? {};
  const liked = (body.liked ?? []).filter(Boolean).slice(0, 6);

  const facts = [
    listing.title && `Title: ${listing.title}`,
    listing.community && `Community: ${listing.community}${listing.city ? `, ${listing.city}` : ''}`,
    listing.type && `Type: ${listing.type}`,
    listing.beds != null && `Bedrooms: ${listing.beds === 0 ? 'studio' : listing.beds}`,
    listing.price && `Price: ${listing.price}`,
    listing.hook && `Tag: ${listing.hook}`,
    listing.credits && `iClose credits earned: ${listing.credits}`,
  ]
    .filter(Boolean)
    .join('\n');

  const taste = liked.length
    ? `So far this person keeps engaging with: ${liked.join(', ')}.`
    : `This person is new — no strong preferences yet.`;

  try {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 120,
      system:
        'You write one short, warm sentence (max 22 words) telling a home buyer why a property fits them, in second person ("you"). ' +
        'Ground every claim ONLY in the facts provided — never invent amenities, prices, or features. ' +
        'If the person is new with no preferences, highlight one concrete appealing fact about the home instead. ' +
        'No preamble, no quotes, no emoji — just the sentence.',
      messages: [
        {
          role: 'user',
          content: `${taste}\n\nProperty facts:\n${facts}\n\nWrite the one-sentence reason.`,
        },
      ],
    });

    const reason = response.content
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join(' ')
      .trim();

    return NextResponse.json({ reason: reason || null });
  } catch {
    // Any API/network failure → client falls back to the deterministic line.
    return NextResponse.json({ reason: null }, { status: 200 });
  }
}
