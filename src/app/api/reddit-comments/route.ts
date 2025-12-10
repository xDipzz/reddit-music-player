import { NextRequest, NextResponse } from 'next/server';

// Force Node.js runtime (not Edge) for Reddit API compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// EXACT replication of original reddit.musicplayer.io proxy strategy
// Only passes user-agent header, matching original exactly

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const permalink = searchParams.get('permalink');

  if (!permalink) {
    return NextResponse.json(
      { error: 'Permalink parameter is required' },
      { status: 400 }
    );
  }

  try {
    const url = `https://www.reddit.com${permalink}.json`;

    // CRITICAL: Only pass user-agent header like the original
    const clientUserAgent = request.headers.get('user-agent') || 
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

    const response = await fetch(url, {
      headers: {
        'user-agent': clientUserAgent,  // ONLY user-agent
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Reddit comments error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Reddit API error', status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Reddit comments proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments from Reddit' },
      { status: 500 }
    );
  }
}
