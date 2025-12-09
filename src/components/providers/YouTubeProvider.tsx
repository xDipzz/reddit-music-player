'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';
import { usePlayerStore } from '@/stores';
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

export function YouTubeProvider({ children }: YouTubeProviderProps) {
  const { setIsPlaying } = usePlayerStore();

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
    if (error === YT.ErrorCode.InvalidParam) {
      return;
    }
    console.error('YouTube player error:', error);
  };

  const player = useYouTubePlayer('youtubePlayer', {
    onStateChange: handleStateChange,
    onError: handleError,
    initialVolume: usePlayerStore.getState().volume,
  });

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
      <div
        id="youtubeContainer"
        className="fixed -left-[9999px] w-1 h-1 overflow-hidden"
      >
        <div id="youtubePlayer" />
      </div>
      {children}
    </YouTubeContext.Provider>
  );
}