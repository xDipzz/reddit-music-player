import { NextRequest, NextResponse } from 'next/server';

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
    const REDDIT_BASE_URL = 'https://old.reddit.com';
    const url = `${REDDIT_BASE_URL}${permalink}.json?raw_json=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'web:reddit-music-player:v1.0.0 (by /u/redditmusicplayer)',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Reddit comments API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments from Reddit' },
      { status: 500 }
    );
  }
}
