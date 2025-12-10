import { useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSubredditStore } from '@/stores';

/**
 * Syncs subreddit selection with URL for sharing
 * URL format: /r/subreddit1+subreddit2+subreddit3
 * Or query param: /?subs=subreddit1+subreddit2
 */
export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { selectedSubreddits, setSubreddits, sortMethod, topTimeframe } = useSubredditStore();

  // Load state from URL on mount
  useEffect(() => {
    // Check if we're on /r/[subreddits] route
    const subredditRoute = pathname?.match(/^\/r\/(.+)/);
    if (subredditRoute) {
      const subs = subredditRoute[1].split('+');
      if (subs.length > 0) {
        setSubreddits(subs);
      }
    }
    
    // Check query params
    const subsParam = searchParams?.get('subs');
    if (subsParam) {
      const subs = subsParam.split('+');
      if (subs.length > 0) {
        setSubreddits(subs);
      }
    }
  }, [pathname, searchParams, setSubreddits]);

  // Generate shareable URL
  const getShareableUrl = useCallback(() => {
    if (selectedSubreddits.length === 0) {
      return typeof window !== 'undefined' ? window.location.origin : '';
    }

    const subredditsString = selectedSubreddits.join('+');
    const params = new URLSearchParams();
    
    if (sortMethod !== 'hot') {
      params.append('sort', sortMethod);
    }
    
    if (sortMethod === 'top' && topTimeframe !== 'week') {
      params.append('t', topTimeframe);
    }

    const queryString = params.toString();
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    
    return `${baseUrl}/r/${subredditsString}${queryString ? '?' + queryString : ''}`;
  }, [selectedSubreddits, sortMethod, topTimeframe]);

  // Generate short share URL (for display)
  const getShortShareUrl = useCallback(() => {
    if (selectedSubreddits.length === 0) return '';
    
    const subredditsString = selectedSubreddits.join('+');
    const host = typeof window !== 'undefined' ? window.location.host : 'reddit.musicplayer.io';
    
    return `${host}/r/${subredditsString}`;
  }, [selectedSubreddits]);

  // Update URL when selection changes
  const updateUrl = useCallback(() => {
    if (selectedSubreddits.length === 0) {
      router.push('/');
      return;
    }

    const url = getShareableUrl();
    if (typeof window !== 'undefined' && url !== window.location.href) {
      router.push(url, { scroll: false });
    }
  }, [selectedSubreddits, router, getShareableUrl]);

  return {
    getShareableUrl,
    getShortShareUrl,
    updateUrl,
  };
}
