import { create } from 'zustand';
import { YT } from '@/types/youtube';

interface YouTubeState {
  // State
  player: YT.Player | null;
  isReady: boolean;

  // Actions
  setPlayer: (player: YT.Player | null) => void;
  setIsReady: (isReady: boolean) => void;
  reset: () => void;
}

export const useYouTubeStore = create<YouTubeState>((set) => ({
  // Initial state
  player: null,
  isReady: false,

  // Actions
  setPlayer: (player) =>
    set({
      player,
    }),

  setIsReady: (isReady) =>
    set({
      isReady,
    }),

  reset: () =>
    set({
      player: null,
      isReady: false,
    }),
}));
