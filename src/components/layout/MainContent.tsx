'use client';

import { useEffect, useMemo } from 'react';
import { useSubredditStore } from '@/stores';
import { usePlaylistStore } from '@/stores';
import { useRedditPosts } from '@/hooks/useRedditPosts';
import { PageHeader } from '@/components/playlist/PageHeader';
import { SongList } from '@/components/playlist/SongList';
import { LoadingState } from '@/components/playlist/LoadingState';
import { EmptyState } from '@/components/playlist/EmptyState';
import { usePlayerController } from '@/hooks/usePlayerController';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import type { Song } from '@/types';

export function MainContent() {
  const { selectedSubreddits, sortMethod, topTimeframe } = useSubredditStore();
  const { songs, setSongs, setQueue } = usePlaylistStore();
  const { playSong } = usePlayerController();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useRedditPosts({
    subreddits: selectedSubreddits,
    sort: sortMethod,
    timeframe: topTimeframe,
    limit: 25,
    enabled: selectedSubreddits.length > 0,
  });

  const allSongs = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.songs);
  }, [data]);

  useEffect(() => {
    setSongs(allSongs);
  }, [allSongs, setSongs]);

  // Auto-load more songs up to 100 total
  useEffect(() => {
    const MAX_SONGS = 100;
    
    // Only auto-fetch if:
    // 1. Not currently loading
    // 2. Not fetching next page
    // 3. Has more pages
    // 4. Haven't reached 100 songs yet
    if (
      !isLoading &&
      !isFetchingNextPage &&
      hasNextPage &&
      allSongs.length < MAX_SONGS &&
      allSongs.length > 0 // Only start auto-loading after first page is loaded
    ) {
      // Use a small delay to avoid overwhelming the API
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, isFetchingNextPage, hasNextPage, allSongs.length, fetchNextPage]);

  // Handle Play All
  const handlePlayAll = () => {
    if (songs.length === 0) return;
    setQueue(songs);
    playSong(songs[0], 0);
  };

  // Handle Shuffle All
  const handleShuffleAll = () => {
    if (songs.length === 0) return;
    const shuffled = [...songs];
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setQueue(shuffled);
    playSong(shuffled[0], 0);
  };

  // Handle song click
  const handleSongClick = (song: Song, index: number) => {
    setQueue(songs);
    playSong(song, index);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-neutral-950 relative scroll-smooth pb-32 md:pb-32">
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Video Player Section */}
        <div className="mb-8">
          <VideoPlayer />
        </div>

        <PageHeader
          showActions={songs.length > 0}
          onPlayAll={handlePlayAll}
          onShuffle={handleShuffleAll}
        />

        {/* Loading state */}
        {isLoading && <LoadingState />}

        {/* Empty state */}
        {!isLoading && songs.length === 0 && <EmptyState />}

        {/* Song list */}
        {!isLoading && songs.length > 0 && (
          <>
            <SongList songs={songs} onSongClick={handleSongClick} />
            
            {/* Auto-loading indicator */}
            {isFetchingNextPage && songs.length < 100 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading more songs...</span>
                </div>
              </div>
            )}
            
            {/* Load More Button - only show after 100 songs or if auto-load stopped */}
            {hasNextPage && !isFetchingNextPage && songs.length >= 100 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default MainContent;