import { create } from 'zustand';
import type { Song } from '@/types';

interface PlaylistState {
  // State
  songs: Song[];
  queue: Song[];
  currentIndex: number;
  after: string | null;
  isLoading: boolean;
  isQueueOpen: boolean;

  // Actions
  setSongs: (songs: Song[]) => void;
  addSongs: (songs: Song[]) => void;
  setQueue: (queue: Song[]) => void;
  setCurrentIndex: (index: number) => void;
  setAfter: (after: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  toggleQueue: () => void;
  setQueueOpen: (isOpen: boolean) => void;
  removeFromQueue: (index: number) => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;
  playNext: () => number | null;
  playPrevious: (currentTime: number) => number | null;
  shuffleQueue: (currentIndex: number) => void;
  unshuffleQueue: (originalSongs: Song[], currentSongId: string | null) => void;
  clearQueue: () => void;
  reset: () => void;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  // Initial state
  songs: [],
  queue: [],
  currentIndex: -1,
  after: null,
  isLoading: false,
  isQueueOpen: false,

  // Actions
  setSongs: (songs) =>
    set({
      songs,
    }),

  addSongs: (songs) =>
    set((state) => ({
      songs: [...state.songs, ...songs],
    })),

  setQueue: (queue) =>
    set({
      queue,
    }),

  setCurrentIndex: (index) =>
    set({
      currentIndex: index,
    }),

  setAfter: (after) =>
    set({
      after,
    }),

  setIsLoading: (isLoading) =>
    set({
      isLoading,
    }),

  toggleQueue: () =>
    set((state) => ({
      isQueueOpen: !state.isQueueOpen,
    })),

  setQueueOpen: (isOpen) =>
    set({
      isQueueOpen: isOpen,
    }),

  removeFromQueue: (index) => {
    const state = get();
    const newQueue = [...state.queue];
    newQueue.splice(index, 1);
    
    let newCurrentIndex = state.currentIndex;
    if (index < state.currentIndex) {
      // Removed song before current, adjust index
      newCurrentIndex = state.currentIndex - 1;
    } else if (index === state.currentIndex) {
      // Removed current song, keep same index (next song moves into place)
      newCurrentIndex = Math.min(state.currentIndex, newQueue.length - 1);
    }
    
    set({
      queue: newQueue,
      currentIndex: newQueue.length === 0 ? -1 : newCurrentIndex,
    });
  },

  reorderQueue: (fromIndex, toIndex) => {
    const state = get();
    const newQueue = [...state.queue];
    const [movedSong] = newQueue.splice(fromIndex, 1);
    newQueue.splice(toIndex, 0, movedSong);
    
    // Adjust current index if needed
    let newCurrentIndex = state.currentIndex;
    if (fromIndex === state.currentIndex) {
      newCurrentIndex = toIndex;
    } else if (fromIndex < state.currentIndex && toIndex >= state.currentIndex) {
      newCurrentIndex = state.currentIndex - 1;
    } else if (fromIndex > state.currentIndex && toIndex <= state.currentIndex) {
      newCurrentIndex = state.currentIndex + 1;
    }
    
    set({
      queue: newQueue,
      currentIndex: newCurrentIndex,
    });
  },

  playNext: () => {
    const state = get();
    if (state.queue.length === 0) return null;

    const nextIndex = state.currentIndex + 1;
    if (nextIndex >= state.queue.length) {
      return null; // End of queue
    }

    set({ currentIndex: nextIndex });
    return nextIndex;
  },

  playPrevious: (currentTime) => {
    const state = get();
    if (state.queue.length === 0) return null;

    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      return state.currentIndex; // Return same index to restart
    }

    const prevIndex = state.currentIndex - 1;
    if (prevIndex < 0) {
      return 0; // Stay at first track
    }

    set({ currentIndex: prevIndex });
    return prevIndex;
  },

  shuffleQueue: (currentIndex) => {
    const state = get();
    const queue = [...state.queue];
    const currentSong = queue[currentIndex];

    // Fisher-Yates shuffle
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }

    // Keep current song at current position if it exists
    if (currentSong) {
      const newIndex = queue.findIndex((s) => s.id === currentSong.id);
      if (newIndex !== -1 && newIndex !== currentIndex) {
        [queue[currentIndex], queue[newIndex]] = [
          queue[newIndex],
          queue[currentIndex],
        ];
      }
    }

    set({ queue });
  },

  unshuffleQueue: (originalSongs, currentSongId) => {
    if (!currentSongId) {
      set({ queue: originalSongs, currentIndex: -1 });
      return;
    }

    const newIndex = originalSongs.findIndex((s) => s.id === currentSongId);
    set({
      queue: originalSongs,
      currentIndex: newIndex !== -1 ? newIndex : 0,
    });
  },

  clearQueue: () =>
    set({
      queue: [],
      currentIndex: -1,
    }),

  reset: () =>
    set({
      songs: [],
      queue: [],
      currentIndex: -1,
      after: null,
      isLoading: false,
    }),
}));
