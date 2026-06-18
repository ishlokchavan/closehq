import { NextResponse } from 'next/server';
import { getExperienceListings } from '@/lib/glass/get-experience';

// Client-fetched (off the render critical path) so a slow/cold database can
// never block the experience's first paint. Cached at the edge for 2 minutes.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const listings = await getExperienceListings();
    return NextResponse.json(
      { listings },
      { headers: { 'cache-control': 'public, s-maxage=120, stale-while-revalidate=600' } },
    );
  } catch {
    return NextResponse.json({ listings: [] }, { status: 200 });
  }
}
