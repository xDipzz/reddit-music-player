import { REDDIT_BASE_URL } from '@/lib/constants';
import type { RedditComment, RedditCommentData } from '@/types';

// ─────────────────────────────────────────────────────────────────
// REDDIT COMMENTS API SERVICE
// ─────────────────────────────────────────────────────────────────

/**
 * Parses nested comment structure from Reddit API response
 * @param commentData - Raw comment data from Reddit
 * @returns Parsed comment with nested replies
 */
function parseComment(commentData: RedditCommentData): RedditComment | null {
  const { data } = commentData;

  // Skip "more" comments and deleted/removed comments
  if (commentData.kind === 'more' || !data.body) {
    return null;
  }

  const comment: RedditComment = {
    id: data.id,
    author: data.author || '[deleted]',
    body: data.body,
    body_html: data.body_html,
    score: data.score || 0,
    created_utc: data.created_utc,
    subreddit: data.subreddit,
    permalink: data.permalink,
  };

  // Parse nested replies
  if (data.replies && typeof data.replies === 'object') {
    const replies = data.replies.data.children
      .map(parseComment)
      .filter((c): c is RedditComment => c !== null);
    
    if (replies.length > 0) {
      comment.replies = replies;
    }
  }

  return comment;
}

/**
 * Fetches comments for a Reddit post
 * @param permalink - Reddit post permalink (e.g., "/r/subreddit/comments/xyz/title")
 * @returns Array of top-level comments
 */
export async function fetchRedditComments(
  permalink: string
): Promise<RedditComment[]> {
  if (!permalink) {
    throw new Error('Permalink is required');
  }

  try {
    // Fetch directly from Reddit to avoid IP blocking on serverless
    const url = `https://www.reddit.com${permalink}.json?raw_json=1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Reddit Comments API error: ${response.status}`);
    }

    const data = await response.json();

    // Reddit returns an array with [post_data, comments_data]
    if (!Array.isArray(data) || data.length < 2) {
      return [];
    }

    const commentsListing = data[1];
    if (!commentsListing?.data?.children) {
      return [];
    }

    // Parse all top-level comments
    const comments = commentsListing.data.children
      .map(parseComment)
      .filter((c: RedditComment | null): c is RedditComment => c !== null);

    return comments;
  } catch (error) {
    console.error('Failed to fetch Reddit comments:', error);
    throw error;
  }
}
