/**
 * SEO utility functions and constants
 */

export const SITE_CONFIG = {
  name: 'Reddit Music Player',
  shortName: 'Reddit Music',
  description: 'Free streaming music player powered by Reddit. Discover and play music from your favorite subreddits. No ads, no accounts required.',
  url: 'https://reddit.musicplayer.io',
  ogImage: '/og-image.png',
  twitterHandle: '@redditmusicplayer',
  keywords: [
    'reddit music',
    'music player',
    'streaming',
    'youtube',
    'subreddit',
    'free music',
    'online music',
    'music discovery',
    'reddit streaming',
    'music from reddit',
  ],
} as const;

export const POPULAR_SUBREDDITS = [
  { name: 'listentothis', description: 'Discover new music' },
  { name: 'music', description: 'General music discussion' },
  { name: 'hiphopheads', description: 'Hip hop music and culture' },
  { name: 'indieheads', description: 'Indie and alternative music' },
  { name: 'electronicmusic', description: 'Electronic music' },
  { name: 'metal', description: 'Heavy metal music' },
  { name: 'jazz', description: 'Jazz music' },
  { name: 'classicalmusic', description: 'Classical music' },
  { name: 'rock', description: 'Rock music' },
  { name: 'popheads', description: 'Pop music' },
] as const;

/**
 * Generate page title with template
 */
export function generateTitle(title: string): string {
  return `${title} | ${SITE_CONFIG.name}`;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

/**
 * Generate subreddit metadata
 */
export function generateSubredditMetadata(subreddit: string) {
  const title = `r/${subreddit}`;
  const description = `Listen to music from r/${subreddit} on Reddit Music Player. Stream and discover great music content from this subreddit.`;
  const url = generateCanonicalUrl(`/r/${subreddit}`);

  return {
    title,
    description,
    url,
    openGraph: {
      title: generateTitle(title),
      description,
      url,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: generateTitle(title),
      description,
    },
  };
}

/**
 * Validate and sanitize subreddit name
 */
export function sanitizeSubredditName(subreddit: string): string {
  return subreddit
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '')
    .substring(0, 21); // Reddit subreddit name max length
}
