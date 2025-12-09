import { useEffect, useRef, useState, useCallback } from 'react';
import type { YT, YouTubePlayerControls } from '@/types/youtube';

interface UseYouTubePlayerOptions {
  onReady?: () => void;
  onStateChange?: (state: YT.PlayerState) => void;
  onError?: (error: YT.ErrorCode) => void;
  initialVolume?: number;
}

export function useYouTubePlayer(
  containerId: string,
  options: UseYouTubePlayerOptions = {}
): YouTubePlayerControls {
  const playerRef = useRef<YT.Player | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setApiLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (existingScript) {
      // Script exists, wait for it to load
      window.onYouTubeIframeAPIReady = () => {
        setApiLoaded(true);
      };
      return;
    }

    // Load the API
    window.onYouTubeIframeAPIReady = () => {
      setApiLoaded(true);
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the global callback
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = undefined as any;
      }
    };
  }, []);

  // Initialize player once API is loaded
  useEffect(() => {
    if (!apiLoaded || playerRef.current) return;

    let playerInstance: YT.Player | null = null;

    const handleReady = (event: YT.PlayerEvent) => {
      console.log('YouTube player ready event fired');
      
      // CRITICAL: Store the actual player instance from the event
      // The player returned from new YT.Player() is not fully initialized
      playerRef.current = event.target;
      
      setIsReady(true);
      
      // Set initial volume if provided
      if (options.initialVolume !== undefined) {
        event.target.setVolume(options.initialVolume * 100);
      }
      
      options.onReady?.();
    };

    const handleStateChange = (event: YT.OnStateChangeEvent) => {
      options.onStateChange?.(event.data);
    };

    const handleError = (event: YT.OnErrorEvent) => {
      console.error('YouTube player error:', event.data);
      options.onError?.(event.data);
    };

    try {
      console.log('Creating YouTube player for container:', containerId);
      // Note: The player instance is not fully ready until onReady fires
      playerInstance = new window.YT.Player(containerId, {
        height: '1',
        width: '1',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: handleReady,
          onStateChange: handleStateChange,
          onError: handleError,
        },
      });
    } catch (error) {
      console.error('Failed to initialize YouTube player:', error);
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying YouTube player:', error);
        }
        playerRef.current = null;
      } else if (playerInstance) {
        try {
          playerInstance.destroy();
        } catch (error) {
          console.error('Error destroying YouTube player instance:', error);
        }
      }
    };
  }, [apiLoaded, containerId, options]);

  const loadVideo = useCallback((videoId: string) => {
    if (!playerRef.current || !isReady) {
      console.warn('YouTube player not ready yet. Player:', !!playerRef.current, 'Ready:', isReady);
      return;
    }
    
    // Check if the player has the loadVideoById method
    if (typeof playerRef.current.loadVideoById !== 'function') {
      console.error('loadVideoById is not a function. Player state:', playerRef.current);
      return;
    }
    
    try {
      playerRef.current.loadVideoById(videoId);
    } catch (error) {
      console.error('Error loading video:', error);
    }
  }, [isReady]);

  const play = useCallback(() => {
    if (playerRef.current && isReady) {
      try {
        playerRef.current.playVideo();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  }, [isReady]);

  const pause = useCallback(() => {
    if (playerRef.current && isReady) {
      try {
        playerRef.current.pauseVideo();
      } catch (error) {
        console.error('Error pausing video:', error);
      }
    }
  }, [isReady]);

  const seekTo = useCallback((seconds: number) => {
    if (playerRef.current && isReady) {
      try {
        playerRef.current.seekTo(seconds, true);
      } catch (error) {
        console.error('Error seeking:', error);
      }
    }
  }, [isReady]);

  const setVolume = useCallback((volume: number) => {
    if (playerRef.current && isReady) {
      try {
        // YouTube expects volume 0-100
        playerRef.current.setVolume(volume * 100);
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  }, [isReady]);

  const getCurrentTime = useCallback((): number => {
    if (playerRef.current && isReady) {
      try {
        return playerRef.current.getCurrentTime();
      } catch (error) {
        console.error('Error getting current time:', error);
      }
    }
    return 0;
  }, [isReady]);

  const getDuration = useCallback((): number => {
    if (playerRef.current && isReady) {
      try {
        return playerRef.current.getDuration();
      } catch (error) {
        console.error('Error getting duration:', error);
      }
    }
    return 0;
  }, [isReady]);

  const getPlayerState = useCallback((): YT.PlayerState | null => {
    if (playerRef.current && isReady) {
      try {
        return playerRef.current.getPlayerState();
      } catch (error) {
        console.error('Error getting player state:', error);
      }
    }
    return null;
  }, [isReady]);

  return {
    loadVideo,
    play,
    pause,
    seekTo,
    setVolume,
    getCurrentTime,
    getDuration,
    getPlayerState,
    isReady,
  };
}
