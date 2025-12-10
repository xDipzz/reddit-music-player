import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subreddits = searchParams.get('subreddits');
  const sort = searchParams.get('sort') || 'hot';
  const limit = searchParams.get('limit') || '25';
  const after = searchParams.get('after');
  const timeframe = searchParams.get('t');

  if (!subreddits) {
    return NextResponse.json(
      { error: 'Subreddits parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Build Reddit URL - use old.reddit.com which is more reliable for API access
    let url = `https://old.reddit.com/r/${subreddits}/${sort}.json?limit=${limit}&raw_json=1`;
    
    if (after) {
      url += `&after=${after}`;
    }
    
    if (sort === 'top' && timeframe) {
      url += `&t=${timeframe}`;
    }

    // Fetch from Reddit with proper headers - simplified for edge runtime
    console.log('Fetching from Reddit:', url);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'web:reddit-music-player:v1.0.0 (by /u/musicplayer)',
        'Accept': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Reddit API error:', response.status, errorText);
      throw new Error(`Reddit API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Return the data
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Reddit API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Reddit', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
