import { NextRequest, NextResponse } from 'next/server';

// EXACT replication of original reddit.musicplayer.io proxy strategy
// Original code: req.get(url, {headers: headers}).pipe(response)
// Only passes user-agent header, nothing else

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
    // Build Reddit URL - EXACT match to original
    let url = `https://www.reddit.com/r/${subreddits}/${sort}.json?limit=${limit}`;
    
    if (after) {
      url += `&after=${after}`;
    }
    
    if (sort === 'top' && timeframe) {
      url += `&t=${timeframe}`;
    }

    // CRITICAL: Only pass user-agent header like the original
    // Original: headers = {'user-agent': request.headers['user-agent']}
    const clientUserAgent = request.headers.get('user-agent') || 
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

    console.log('Reddit proxy:', url);
    
    const response = await fetch(url, {
      headers: {
        'user-agent': clientUserAgent,  // ONLY user-agent, matching original exactly
      },
      // No caching - fetch fresh each time like the original
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Reddit API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Reddit API error', status: response.status, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return with minimal headers
    return NextResponse.json(data);
  } catch (error) {
    console.error('Reddit proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Reddit', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
