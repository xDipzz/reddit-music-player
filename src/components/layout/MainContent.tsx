'use client';

import React, { useEffect, useMemo } from 'react';
import { useSubredditStore } from '@/stores';
import { usePlaylistStore } from '@/stores';
import { useRedditPosts } from '@/hooks/useRedditPosts';
import { PageHeader } from '@/components/playlist/PageHeader';
import { SongList } from '@/components/playlist/SongList';
import { LoadingState } from '@/components/playlist/LoadingState';
import { EmptyState } from '@/components/playlist/EmptyState';
import { usePlayerController } from '@/hooks/usePlayerController';
import type { Song } from '@/types';

export function MainContent() {
  const { selectedSubreddits, sortMethod, topTimeframe } = useSubredditStore();
  const { songs, setSongs, addSongs, setQueue } = usePlaylistStore();
  const { playSong } = usePlayerController();

  // Fetch Reddit posts using React Query
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

  // Flatten all pages into a single array of songs
  const allSongs = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.songs);
  }, [data]);

  // Update playlist store when songs change
  useEffect(() => {
    setSongs(allSongs);
  }, [allSongs, setSongs]);

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
            
            {/* Load More Button */}
            {hasNextPage && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More'}
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
