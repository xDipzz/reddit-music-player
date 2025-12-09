import { REDDIT_BASE_URL } from '@/lib/constants';
import { isPlayable, transformPost } from '@/lib/utils/reddit';
import {
  FetchRedditOptions,
  RedditApiResponse,
  RedditResponse,
  Song,
} from '@/types';

// ─────────────────────────────────────────────────────────────────
// REDDIT API SERVICE
// ─────────────────────────────────────────────────────────────────

/**
 * Fetches posts from Reddit's JSON API
 * @param options - Fetch options including subreddits, sort method, pagination
 * @returns Object containing songs array and pagination cursor
 */
export async function fetchRedditPosts(
  options: FetchRedditOptions
): Promise<{ songs: Song[]; after: string | null }> {
  const {
    subreddits,
    sort = 'hot',
    limit = 25,
    after = null,
    timeframe = 'week',
  } = options;

  // Join multiple subreddits with +
  const subString = subreddits.join('+');

  // Use our Next.js API route instead of calling Reddit directly
  // This avoids CORS issues
  const params = new URLSearchParams({
    subreddits: subString,
    sort,
    limit: limit.toString(),
  });

  if (after) {
    params.append('after', after);
  }

  if (sort === 'top') {
    params.append('t', timeframe);
  }

  const url = `/api/reddit?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data: RedditApiResponse = await response.json();

    // Filter and transform posts
    const songs = data.data.children
      .map((child) => child.data)
      .filter(isPlayable)
      .map(transformPost)
      .filter((song) => song.playable);

    return {
      songs,
      after: data.data.after,
    };
  } catch (error) {
    console.error('Failed to fetch Reddit posts:', error);
    throw error;
  }
}
