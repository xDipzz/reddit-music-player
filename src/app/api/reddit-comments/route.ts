import { NextRequest, NextResponse } from 'next/server';

// Using Node.js runtime for better Reddit API compatibility
// Edge runtime IPs are blocked by Reddit

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
    const url = `https://old.reddit.com${permalink}.json?raw_json=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
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
