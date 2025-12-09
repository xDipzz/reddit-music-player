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
  const { setIsPlaying, setDuration, setCurrentTime } = usePlayerStore();

  const handleReady = () => {
    // YouTube player initialized successfully
  };

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
        // Track end will be handled by usePlayerController
        break;
      case YT.PlayerState.BUFFERING:
        // Could add buffering state if needed
        break;
    }
  };

  const handleError = (error: YT.ErrorCode) => {
    // Ignore error 2 (Invalid Parameter) on initial load - this is expected
    if (error === YT.ErrorCode.InvalidParam) {
      return;
    }
    
    console.error('YouTube player error:', error);
    
    let errorMessage = 'Failed to play this track';
    
    switch (error) {
      case YT.ErrorCode.Html5Error:
        errorMessage = 'HTML5 player error';
        break;
      case YT.ErrorCode.VideoNotFound:
        errorMessage = 'Video not found or removed';
        break;
      case YT.ErrorCode.NotAllowed:
      case YT.ErrorCode.NotAllowedDisguise:
        errorMessage = 'Video cannot be played in embedded player';
        break;
    }
    
    // TODO: Display error notification to user
    // For now, just log it
  };

  const player = useYouTubePlayer('youtubePlayer', {
    onReady: handleReady,
    onStateChange: handleStateChange,
    onError: handleError,
    initialVolume: usePlayerStore.getState().volume,
  });

  // Sync volume changes with YouTube player
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
      {/* Hidden YouTube player container - matches HTML design (line 376-378) */}
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
