import { NextRequest, NextResponse } from 'next/server';

// Using Node.js runtime for better Reddit API compatibility
// Implements the same proxy strategy as the original reddit.musicplayer.io
// Uses client's user-agent to bypass Reddit's bot detection

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
    // Build Reddit URL - use www.reddit.com like the original
    let url = `https://www.reddit.com/r/${subreddits}/${sort}.json?limit=${limit}&raw_json=1`;
    
    if (after) {
      url += `&after=${after}`;
    }
    
    if (sort === 'top' && timeframe) {
      url += `&t=${timeframe}`;
    }

    // KEY: Use the client's user-agent (from their browser)
    // This is what makes Reddit think it's a real user
    const clientUserAgent = request.headers.get('user-agent') || 
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

    console.log('Fetching from Reddit:', url);
    const response = await fetch(url, {
      headers: {
        'User-Agent': clientUserAgent,  // Use CLIENT's user-agent, not server's!
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
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
