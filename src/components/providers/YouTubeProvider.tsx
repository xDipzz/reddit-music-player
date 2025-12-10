'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';
import { usePlayerStore, usePlaylistStore } from '@/stores';
import type { YouTubePlayerControls } from '@/types/youtube';
import { YT } from '@/types/youtube';

interface YouTubeContextValue {
  player: YouTubePlayerControls;
}

const YouTubeContext = createContext<YouTubeContextValue | null>(null);

export function useYouTube() {
  const context = useContext(YouTubeContext);
  if (!context) {
    throw new Error('useYouTube must be used within YouTubeProvider');
  }
  return context;
}

interface YouTubeProviderProps {
  children: React.ReactNode;
}

const PLAYER_ELEMENT_ID = 'youtube-player-element';

export function YouTubeProvider({ children }: YouTubeProviderProps) {
  const { setIsPlaying } = usePlayerStore();
  const [isContainerReady, setIsContainerReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const playerRef = useRef<YouTubePlayerControls | null>(null);

  // Client-side mounting check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Wait for VideoPlayer component to create the element
    const checkElement = setInterval(() => {
      const element = document.getElementById(PLAYER_ELEMENT_ID);
      if (element) {
        clearInterval(checkElement);
        setIsContainerReady(true);
      }
    }, 100);

    return () => clearInterval(checkElement);
  }, [isMounted]);

  const handleStateChange = (state: YT.PlayerState) => {
    switch (state) {
      case YT.PlayerState.PLAYING:
        setIsPlaying(true);
        break;
      case YT.PlayerState.PAUSED:
        setIsPlaying(false);
        break;
      case YT.PlayerState.ENDED:
        setIsPlaying(false);
        break;
    }
  };

  const handleError = (error: YT.ErrorCode) => {
    // Error codes:
    // 2 = Invalid video ID
    // 5 = HTML5 player error
    // 100 = Video not found or private
    // 101/150 = Video not allowed to be played in embedded players
    
    console.warn('YouTube player error:', {
      code: error,
      currentSong: usePlayerStore.getState().currentSong?.title
    });
    
    // For invalid video errors, skip to next song
    if (error === 2 || error === 100 || error === 101 || error === 150) {
      console.log('Invalid or unavailable video, will skip to next...');
      // Give user a moment to see the error, then skip
      setTimeout(() => {
        const { queue, currentIndex } = usePlaylistStore.getState();
        const player = playerRef.current;
        
        if (currentIndex < queue.length - 1 && player) {
          // Skip to next song
          const nextIndex = currentIndex + 1;
          const nextSong = queue[nextIndex];
          if (nextSong && nextSong.youtubeId) {
            usePlayerStore.getState().setCurrentSong(nextSong);
            usePlaylistStore.getState().setCurrentIndex(nextIndex);
            if (player.isReady) {
              player.loadVideo(nextSong.youtubeId);
            }
          }
        }
      }, 1500);
    }
  };

  const player = useYouTubePlayer(isContainerReady ? PLAYER_ELEMENT_ID : '', {
    onStateChange: handleStateChange,
    onError: handleError,
    initialVolume: usePlayerStore.getState().volume,
  });

  // Store player reference
  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    let prevVolume = usePlayerStore.getState().volume;
    const unsubscribe = usePlayerStore.subscribe((state) => {
      if (state.volume !== prevVolume) {
        prevVolume = state.volume;
        if (player.isReady) {
          player.setVolume(state.volume);
        }
      }
    });

    return unsubscribe;
  }, [player]);

  return (
    <YouTubeContext.Provider value={{ player }}>
      {children}
    </YouTubeContext.Provider>
  );
}