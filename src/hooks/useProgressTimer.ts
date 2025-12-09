import { useEffect, useRef } from 'react';
import { useYouTube } from '@/components/providers/YouTubeProvider';
import { usePlayerStore } from '@/stores';

/**
 * Updates currentTime and duration from YouTube player every 250ms when playing
 * Matches HTML startProgressTimer() function (lines 657-666)
 */
export function useProgressTimer() {
  const { player } = useYouTube();
  const { isPlaying, setCurrentTime, setDuration } = usePlayerStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer when playing
    if (isPlaying && player.isReady) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Update progress every 250ms
      timerRef.current = setInterval(() => {
        if (player.isReady) {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          
          setCurrentTime(currentTime);
          if (duration > 0) {
            setDuration(duration);
          }
        }
      }, 250);
    } else {
      // Stop timer when paused or not playing
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, player, setCurrentTime, setDuration]);
}
