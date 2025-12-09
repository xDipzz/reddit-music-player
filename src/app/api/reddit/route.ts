import { NextRequest, NextResponse } from 'next/server';

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
    // Build Reddit URL - use reddit.com/.json which works better from serverless
    let url = `https://www.reddit.com/r/${subreddits}/${sort}.json?limit=${limit}&raw_json=1`;
    
    if (after) {
      url += `&after=${after}`;
    }
    
    if (sort === 'top' && timeframe) {
      url += `&t=${timeframe}`;
    }

    // Fetch from Reddit with proper headers
    console.log('Fetching from Reddit:', url);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
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
