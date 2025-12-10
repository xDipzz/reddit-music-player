// ─────────────────────────────────────────────────────────────────
// SHARED TYPES
// ─────────────────────────────────────────────────────────────────

export interface Song {
  id: string;
  redditId: string;
  title: string;
  author: string;
  subreddit: string;
  score: number;
  numComments: number;
  createdUtc: number;
  permalink: string;
  url: string;
  type: 'youtube' | 'unknown';
  playable: boolean;
  thumbnail: string | null;
  youtubeId: string | null;
  duration: number | null;
  raw?: Record<string, unknown>;
}

export interface Category {
  name: string;
  subreddits: string[];
}

export type SortMethod = 'hot' | 'new' | 'top' | 'rising';

export type TopTimeframe = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export type RepeatMode = 'none' | 'all' | 'one';

export interface RedditResponse {
  songs: Song[];
  after: string | null;
}

// ─────────────────────────────────────────────────────────────────
// REDDIT API TYPES
// ─────────────────────────────────────────────────────────────────

export interface RedditPost {
  id: string;
  name: string;
  title: string;
  author: string;
  subreddit: string;
  score: number;
  num_comments: number;
  created_utc: number;
  permalink: string;
  url: string;
  domain: string;
  is_self: boolean;
  thumbnail?: string;
  preview?: {
    images?: Array<{
      source?: {
        url: string;
      };
    }>;
  };
}

export interface RedditApiResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
    after: string | null;
    before: string | null;
  };
}

export interface FetchRedditOptions {
  subreddits: string[];
  sort?: 'hot' | 'new' | 'top' | 'rising';
  limit?: number;
  after?: string | null;
  timeframe?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
}

// ─────────────────────────────────────────────────────────────────
// CATEGORY TYPES
// ─────────────────────────────────────────────────────────────────

export interface SubredditCategory {
  icon: string;
  color: string;
  subreddits: string[];
}

export type SubredditCategories = {
  [key: string]: SubredditCategory;
};

// ─────────────────────────────────────────────────────────────────
// COMMENT TYPES
// ─────────────────────────────────────────────────────────────────

export interface RedditComment {
  id: string;
  author: string;
  body: string;
  body_html: string;
  score: number;
  created_utc: number;
  replies?: RedditComment[];
  subreddit?: string;
  permalink?: string;
}

export interface RedditCommentData {
  kind: string;
  data: RedditComment & {
    replies?: {
      kind: string;
      data: {
        children: RedditCommentData[];
      };
    };
  };
}

// ─────────────────────────────────────────────────────────────────
// YOUTUBE TYPES
// ─────────────────────────────────────────────────────────────────

export * from './youtube';