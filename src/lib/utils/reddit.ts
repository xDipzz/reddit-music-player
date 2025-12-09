import { YOUTUBE_REGEX, SUPPORTED_DOMAINS } from '@/lib/constants';
import { RedditPost, Song } from '@/types';

// ─────────────────────────────────────────────────────────────────
// REDDIT UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────

/**
 * Extracts YouTube video ID from a URL
 * @param url - The URL to extract from
 * @returns YouTube video ID or null if not found
 */
export function extractYouTubeId(url: string): string | null {
  const match = url.match(YOUTUBE_REGEX);
  return match ? match[1] : null;
}

/**
 * Checks if a Reddit post is playable (contains a supported domain)
 * @param post - The Reddit post to check
 * @returns True if the post is playable
 */
export function isPlayable(post: RedditPost): boolean {
  if (post.is_self) return false;
  const domain = post.domain?.toLowerCase() || '';
  return SUPPORTED_DOMAINS.some((d) => domain.includes(d));
}

/**
 * Gets the best available thumbnail for a Reddit post
 * Prioritizes YouTube thumbnails, then Reddit preview images, then fallback thumbnail
 * @param post - The Reddit post
 * @returns Thumbnail URL or null if not found
 */
export function getBestThumbnail(post: RedditPost): string | null {
  // Try YouTube thumbnail first
  const ytId = extractYouTubeId(post.url);
  if (ytId) {
    return `https://i.ytimg.com/vi/${ytId}/mqdefault.jpg`;
  }

  // Try Reddit preview
  if (post.preview?.images?.[0]?.source?.url) {
    return post.preview.images[0].source.url.replace(/&amp;/g, '&');
  }

  // Try thumbnail
  if (post.thumbnail && post.thumbnail.startsWith('http')) {
    return post.thumbnail;
  }

  return null;
}

/**
 * Transforms a Reddit post into a Song object
 * @param post - The Reddit post to transform
 * @returns Song object
 */
export function transformPost(post: RedditPost): Song {
  const ytId = extractYouTubeId(post.url);
  return {
    id: post.id,
    redditId: post.name,
    title: post.title,
    author: post.author,
    subreddit: post.subreddit,
    score: post.score,
    numComments: post.num_comments,
    createdUtc: post.created_utc,
    permalink: post.permalink,
    url: post.url,
    type: ytId ? 'youtube' : 'unknown',
    playable: !!ytId,
    thumbnail: getBestThumbnail(post),
    youtubeId: ytId,
    duration: null,
    raw: post,
  };
}
