import { SubredditCategories } from '@/types';

// ─────────────────────────────────────────────────────────────────
// REDDIT API CONSTANTS
// ─────────────────────────────────────────────────────────────────

export const REDDIT_BASE_URL = 'https://www.reddit.com';

export const SUPPORTED_DOMAINS = [
  'youtube.com',
  'youtu.be',
  'm.youtube.com',
  'www.youtube.com',
];

export const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

// ─────────────────────────────────────────────────────────────────
// SUBREDDIT CATEGORIES
// ─────────────────────────────────────────────────────────────────

export const SUBREDDIT_CATEGORIES: SubredditCategories = {
  Electronic: {
    icon: 'lucide:zap',
    color: '#8b5cf6',
    subreddits: ['electronicmusic', 'house', 'techno', 'trance', 'edm', 'deephouse'],
  },
  'Hip Hop': {
    icon: 'lucide:mic-2',
    color: '#f59e0b',
    subreddits: ['hiphopheads', 'rap', 'trapmuzik', 'makinghiphop'],
  },
  Rock: {
    icon: 'lucide:guitar',
    color: '#ef4444',
    subreddits: ['rock', 'indieheads', 'metal', 'punk', 'alternativerock'],
  },
  General: {
    icon: 'lucide:music',
    color: '#10b981',
    subreddits: ['listentothis', 'music', 'newmusic', 'letstalkmusic'],
  },
  Chill: {
    icon: 'lucide:cloud',
    color: '#06b6d4',
    subreddits: ['chillmusic', 'lofi', 'ambient', 'chillwave'],
  },
};
