import { useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import type { YT, YouTubePlayerControls } from '@/types/youtube';

interface UseYouTubePlayerOptions {
  onReady?: () => void;
  onStateChange?: (state: YT.PlayerState) => void;
  onError?: (error: YT.ErrorCode) => void;
  initialVolume?: number;
}

const globalPlayerRef: { current: YT.Player | null } = { current: null };
let globalIsReady = false;
const listeners = new Set<() => void>();
let isPlayerBootstrapping = false;
let playerInitialized = false;
let apiScriptLoaded = false;

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return globalIsReady;
}

function notifyListeners() {
  listeners.forEach(listener => listener());
}

export function useYouTubePlayer(
  containerId: string,
  options: UseYouTubePlayerOptions = {}
): YouTubePlayerControls {
  const isReady = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  
  const onReadyRef = useRef(options.onReady);
  const onStateChangeRef = useRef(options.onStateChange);
  const onErrorRef = useRef(options.onError);
  const initialVolumeRef = useRef(options.initialVolume);
  const initializationAttempted = useRef(false);
  
  useEffect(() => {
    onReadyRef.current = options.onReady;
    onStateChangeRef.current = options.onStateChange;
    onErrorRef.current = options.onError;
    initialVolumeRef.current = options.initialVolume;
  }, [options.onReady, options.onStateChange, options.onError, options.initialVolume]);

  useEffect(() => {
    // Skip if no containerId, already initialized, or bootstrapping
    if (!containerId || playerInitialized || isPlayerBootstrapping || initializationAttempted.current) {
      return;
    }

    // Mark that we've attempted initialization
    initializationAttempted.current = true;

    function initPlayer() {
      // Double-check we haven't already initialized
      if (playerInitialized || isPlayerBootstrapping || globalPlayerRef.current) {
        return;
      }
      
      const container = document.getElementById(containerId);
      if (!container) {
        console.warn('YouTube player container not found:', containerId);
        initializationAttempted.current = false;
        return;
      }

      // Check if YouTube IFrame API already created an iframe here
      const existingIframe = container.querySelector('iframe');
      if (existingIframe && globalPlayerRef.current) {
        globalIsReady = true;
        playerInitialized = true;
        notifyListeners();
        return;
      }

      const handleReady = (event: YT.PlayerEvent) => {
        globalPlayerRef.current = event.target;
        globalIsReady = true;
        isPlayerBootstrapping = false;
        playerInitialized = true;
        notifyListeners();
        
        if (initialVolumeRef.current !== undefined) {
          try {
            event.target.setVolume(initialVolumeRef.current * 100);
          } catch (error) {
            console.error('Error setting initial volume:', error);
          }
        }
        onReadyRef.current?.();
      };

      const handleStateChange = (event: YT.OnStateChangeEvent) => {
        onStateChangeRef.current?.(event.data);
      };

      const handleError = (event: YT.OnErrorEvent) => {
        // Error code 2 is common (invalid video ID), handle gracefully
        if (event.data === 2) {
          console.warn('YouTube: Invalid or unavailable video (error 2)');
        } else {
          console.error('YouTube player error:', event.data);
        }
        isPlayerBootstrapping = false;
        onErrorRef.current?.(event.data);
      };

      try {
        isPlayerBootstrapping = true;
        
        // Create the player - YouTube IFrame API will replace the div
        new window.YT.Player(containerId, {
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
            controls: 1,
            disablekb: 0,
            enablejsapi: 1,
            fs: 1,
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
        isPlayerBootstrapping = false;
        playerInitialized = false;
        initializationAttempted.current = false;
      }
    }
    
    // Check if YouTube IFrame API is already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Check if script is already in the document
    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    
    if (existingScript) {
      // Script exists, wait for it to load
      if (apiScriptLoaded) {
        initPlayer();
      } else {
        const prevCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          apiScriptLoaded = true;
          prevCallback?.();
          initPlayer();
        };
      }
      return;
    }

    // Load the YouTube IFrame API script
    window.onYouTubeIframeAPIReady = () => {
      apiScriptLoaded = true;
      initPlayer();
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load YouTube IFrame API script');
      isPlayerBootstrapping = false;
      playerInitialized = false;
      initializationAttempted.current = false;
    };
    document.head.appendChild(script);

    // Cleanup - but DON'T destroy the player as it's global
    return () => {
      // Intentionally empty - player persists across component lifecycle
    };
  }, [containerId]);

  const loadVideo = useCallback((videoId: string) => {
    if (!globalPlayerRef.current || !isReady) {
      console.warn('YouTube player not ready yet. Player:', !!globalPlayerRef.current, 'Ready:', isReady);
      return;
    }
    
    if (typeof globalPlayerRef.current.loadVideoById !== 'function') {
      console.error('loadVideoById is not a function. Player state:', globalPlayerRef.current);
      return;
    }
    
    try {
      globalPlayerRef.current.loadVideoById(videoId);
    } catch (error) {
      console.error('Error loading video:', error);
    }
  }, [isReady]);

  const play = useCallback(() => {
    if (globalPlayerRef.current && isReady) {
      try {
        globalPlayerRef.current.playVideo();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  }, [isReady]);

  const pause = useCallback(() => {
    if (globalPlayerRef.current && isReady) {
      try {
        globalPlayerRef.current.pauseVideo();
      } catch (error) {
        console.error('Error pausing video:', error);
      }
    }
  }, [isReady]);

  const seekTo = useCallback((seconds: number) => {
    if (globalPlayerRef.current && isReady) {
      try {
        globalPlayerRef.current.seekTo(seconds, true);
      } catch (error) {
        console.error('Error seeking:', error);
      }
    }
  }, [isReady]);

  const setVolume = useCallback((volume: number) => {
    if (globalPlayerRef.current && isReady) {
      try {
        globalPlayerRef.current.setVolume(volume * 100);
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  }, [isReady]);

  const getCurrentTime = useCallback((): number => {
    if (globalPlayerRef.current && isReady) {
      try {
        return globalPlayerRef.current.getCurrentTime();
      } catch (error) {
        console.error('Error getting current time:', error);
      }
    }
    return 0;
  }, [isReady]);

  const getDuration = useCallback((): number => {
    if (globalPlayerRef.current && isReady) {
      try {
        return globalPlayerRef.current.getDuration();
      } catch (error) {
        console.error('Error getting duration:', error);
      }
    }
    return 0;
  }, [isReady]);

  const getPlayerState = useCallback((): YT.PlayerState | null => {
    if (globalPlayerRef.current && isReady) {
      try {
        return globalPlayerRef.current.getPlayerState();
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