import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Song, RepeatMode } from '@/types';

interface PlayerState {
  // State
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  previousVolume: number;

  // Actions
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setRepeatMode: (mode: RepeatMode) => void;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSong: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 0.75,
      isMuted: false,
      isShuffled: false,
      repeatMode: 'none',
      previousVolume: 0.75,

      // Actions
      setCurrentSong: (song) =>
        set({
          currentSong: song,
          currentTime: 0,
          duration: 0,
        }),

      setIsPlaying: (isPlaying) =>
        set({
          isPlaying,
        }),

      setCurrentTime: (time) =>
        set({
          currentTime: time,
        }),

      setDuration: (duration) =>
        set({
          duration,
        }),

      setVolume: (volume) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        set({
          volume: clampedVolume,
          isMuted: clampedVolume === 0,
        });
      },

      toggleMute: () => {
        const state = get();
        if (state.isMuted) {
          set({
            volume: state.previousVolume || 0.75,
            isMuted: false,
          });
        } else {
          set({
            previousVolume: state.volume,
            volume: 0,
            isMuted: true,
          });
        }
      },

      toggleShuffle: () =>
        set((state) => ({
          isShuffled: !state.isShuffled,
        })),

      toggleRepeat: () =>
        set((state) => {
          const modes: RepeatMode[] = ['none', 'all', 'one'];
          const currentIndex = modes.indexOf(state.repeatMode);
          const nextIndex = (currentIndex + 1) % modes.length;
          return { repeatMode: modes[nextIndex] };
        }),

      setRepeatMode: (mode) =>
        set({
          repeatMode: mode,
        }),

      play: () =>
        set({
          isPlaying: true,
        }),

      pause: () =>
        set({
          isPlaying: false,
        }),

      seek: (time) =>
        set({
          currentTime: time,
        }),

      reset: () =>
        set({
          currentSong: null,
          isPlaying: false,
          currentTime: 0,
          duration: 0,
        }),
    }),
    {
      name: 'rmp-volume',
      // Only persist volume-related settings
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
        previousVolume: state.previousVolume,
        isShuffled: state.isShuffled,
        repeatMode: state.repeatMode,
      }),
    }
  )
);
