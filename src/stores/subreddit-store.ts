import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SortMethod, TopTimeframe } from '@/types';

interface SubredditState {
  // State
  selectedSubreddits: string[];
  sortMethod: SortMethod;
  topTimeframe: TopTimeframe;
  expandedCategories: Set<string>;

  // Actions
  addSubreddit: (subreddit: string) => void;
  removeSubreddit: (subreddit: string) => void;
  toggleSubreddit: (subreddit: string) => void;
  clearSubreddits: () => void;
  setSubreddits: (subreddits: string[]) => void;
  setSortMethod: (method: SortMethod) => void;
  setTopTimeframe: (timeframe: TopTimeframe) => void;
  toggleCategory: (category: string) => void;
  setExpandedCategories: (categories: Set<string>) => void;
}

const DEFAULT_SUBREDDITS = ['listentothis', 'music'];

export const useSubredditStore = create<SubredditState>()(
  persist(
    (set) => ({
      // Initial state - start with default subreddits so users see content immediately
      selectedSubreddits: DEFAULT_SUBREDDITS,
      sortMethod: 'hot',
      topTimeframe: 'week',
      expandedCategories: new Set(['General']),

      // Actions
      addSubreddit: (subreddit) =>
        set((state) => ({
          selectedSubreddits: state.selectedSubreddits.includes(subreddit)
            ? state.selectedSubreddits
            : [...state.selectedSubreddits, subreddit],
        })),

      removeSubreddit: (subreddit) =>
        set((state) => ({
          selectedSubreddits: state.selectedSubreddits.filter(
            (s) => s !== subreddit
          ),
        })),

      toggleSubreddit: (subreddit) =>
        set((state) => ({
          selectedSubreddits: state.selectedSubreddits.includes(subreddit)
            ? state.selectedSubreddits.filter((s) => s !== subreddit)
            : [...state.selectedSubreddits, subreddit],
        })),

      clearSubreddits: () =>
        set({
          selectedSubreddits: [],
        }),

      setSubreddits: (subreddits) =>
        set({
          selectedSubreddits: subreddits,
        }),

      setSortMethod: (method) =>
        set({
          sortMethod: method,
        }),

      setTopTimeframe: (timeframe) =>
        set({
          topTimeframe: timeframe,
        }),

      toggleCategory: (category) =>
        set((state) => {
          const newCategories = new Set(state.expandedCategories);
          if (newCategories.has(category)) {
            newCategories.delete(category);
          } else {
            newCategories.add(category);
          }
          return { expandedCategories: newCategories };
        }),

      setExpandedCategories: (categories) =>
        set({
          expandedCategories: categories,
        }),
    }),
    {
      name: 'rmp-subreddits',
      partialize: (state) => ({
        selectedSubreddits: state.selectedSubreddits,
        sortMethod: state.sortMethod,
        topTimeframe: state.topTimeframe,
        expandedCategories: Array.from(state.expandedCategories),
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Record<string, unknown>),
        expandedCategories: new Set(
          (persistedState as { expandedCategories?: string[] })?.expandedCategories || ['General']
        ),
      }),
    }
  )
);