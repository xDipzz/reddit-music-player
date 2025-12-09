import { useEffect } from 'react';
import { usePlayerController } from './usePlayerController';
import { usePlayerStore } from '@/stores';

/**
 * Keyboard shortcuts hook
 * Matches HTML keyboard shortcuts (lines 1340-1380)
 * 
 * Shortcuts:
 * - Space: Toggle play/pause
 * - ArrowRight: Seek forward 5s (Shift: next track)
 * - ArrowLeft: Seek backward 5s (Shift: previous track)
 * - ArrowUp: Volume +10%
 * - ArrowDown: Volume -10%
 * - m: Toggle mute
 * - s: Toggle shuffle
 * - r: Cycle repeat mode
 * - Cmd/Ctrl + K: Focus search input
 */
export function useKeyboardShortcuts() {
  const {
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
  } = usePlayerController();

  const {
    currentTime,
    volume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Handle Cmd/Ctrl + K to focus search (works everywhere)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        return;
      }

      // Don't trigger shortcuts when user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Handle keyboard shortcuts
      switch (e.key) {
        case ' ': // Space: Toggle play/pause
          e.preventDefault();
          togglePlayPause();
          break;

        case 'ArrowRight': // Right: Seek forward 5s or next track (with Shift)
          e.preventDefault();
          if (e.shiftKey) {
            playNext();
          } else {
            seekTo(currentTime + 5);
          }
          break;

        case 'ArrowLeft': // Left: Seek backward 5s or previous track (with Shift)
          e.preventDefault();
          if (e.shiftKey) {
            playPrevious();
          } else {
            seekTo(Math.max(0, currentTime - 5));
          }
          break;

        case 'ArrowUp': // Up: Volume +10%
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;

        case 'ArrowDown': // Down: Volume -10%
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;

        case 'm': // M: Toggle mute
        case 'M':
          e.preventDefault();
          toggleMute();
          break;

        case 's': // S: Toggle shuffle
        case 'S':
          e.preventDefault();
          toggleShuffle();
          break;

        case 'r': // R: Cycle repeat mode (none → all → one → none)
        case 'R':
          e.preventDefault();
          toggleRepeat();
          break;

        default:
          break;
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    currentTime,
    volume,
  ]);
}
