import { create } from 'zustand';
import { fetchRedditComments } from '@/services/reddit-comments';
import type { RedditComment } from '@/types';

interface CommentsState {
  // State
  comments: RedditComment[];
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  currentPermalink: string | null;

  // Actions
  fetchComments: (permalink: string) => Promise<void>;
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
  reset: () => void;
}

export const useCommentsStore = create<CommentsState>((set, get) => ({
  // Initial state
  comments: [],
  isLoading: false,
  error: null,
  isOpen: false,
  currentPermalink: null,

  // Fetch comments for a post
  fetchComments: async (permalink: string) => {
    // Don't refetch if already loading same permalink
    const state = get();
    if (state.isLoading && state.currentPermalink === permalink) {
      return;
    }

    set({ isLoading: true, error: null, currentPermalink: permalink });

    try {
      const comments = await fetchRedditComments(permalink);
      set({ comments, isLoading: false });
    } catch (error) {
      set({
        comments: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load comments',
      });
    }
  },

  // Toggle panel visibility
  togglePanel: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },

  // Open panel
  openPanel: () => {
    set({ isOpen: true });
  },

  // Close panel
  closePanel: () => {
    set({ isOpen: false });
  },

  // Reset state
  reset: () => {
    set({
      comments: [],
      isLoading: false,
      error: null,
      isOpen: false,
      currentPermalink: null,
    });
  },
}));
