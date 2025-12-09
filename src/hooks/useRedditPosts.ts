import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchRedditPosts } from '@/services/reddit';
import { SortMethod, TopTimeframe } from '@/types';

// ─────────────────────────────────────────────────────────────────
// REACT QUERY HOOK FOR REDDIT POSTS
// ─────────────────────────────────────────────────────────────────

interface UseRedditPostsOptions {
  subreddits: string[];
  sort?: SortMethod;
  timeframe?: TopTimeframe;
  limit?: number;
  enabled?: boolean;
}

/**
 * React Query hook for fetching Reddit posts with infinite scroll support
 * @param options - Hook options including subreddits, sort, and pagination settings
 * @returns React Query infinite query result with data, loading states, and pagination
 */
export function useRedditPosts({
  subreddits,
  sort = 'hot',
  timeframe = 'week',
  limit = 25,
  enabled = true,
}: UseRedditPostsOptions) {
  return useInfiniteQuery({
    queryKey: ['reddit-posts', subreddits, sort, timeframe, limit],
    queryFn: ({ pageParam }) =>
      fetchRedditPosts({
        subreddits,
        sort,
        timeframe,
        limit,
        after: pageParam ?? null,
      }),
    getNextPageParam: (lastPage) => lastPage.after,
    initialPageParam: null as string | null,
    enabled: enabled && subreddits.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
