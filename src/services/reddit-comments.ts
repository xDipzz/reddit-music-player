import type { RedditComment, RedditCommentData } from '@/types';

function parseComment(commentData: RedditCommentData): RedditComment | null {
  const { data } = commentData;

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

export async function fetchRedditComments(
  permalink: string
): Promise<RedditComment[]> {
  if (!permalink) {
    throw new Error('Permalink is required');
  }

  try {
    const params = new URLSearchParams({ permalink });
    const url = `/api/reddit-comments?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Reddit Comments API error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length < 2) {
      return [];
    }

    const commentsListing = data[1];
    if (!commentsListing?.data?.children) {
      return [];
    }

    const comments = commentsListing.data.children
      .map(parseComment)
      .filter((c: RedditComment | null): c is RedditComment => c !== null);

    return comments;
  } catch (error) {
    console.error('Failed to fetch Reddit comments:', error);
    throw error;
  }
}