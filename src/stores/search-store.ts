import { create } from 'zustand';
import type { Song } from '@/types';

interface SearchResult {
  type: 'song' | 'subreddit';
  item: Song | string;
  matchedFields: string[];
}

interface SearchState {
  // State
  query: string;
  results: SearchResult[];
  isOpen: boolean;
  selectedIndex: number;
  isLoading: boolean;
  recentSearches: string[];

  // Actions
  setQuery: (query: string) => void;
  search: (query: string, songs: Song[], availableSubreddits: string[]) => void;
  setIsOpen: (isOpen: boolean) => void;
  selectNext: () => void;
  selectPrev: () => void;
  selectResult: () => SearchResult | null;
  clearSearch: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

// Helper to highlight matching text in search results
export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Helper to search songs by query
function searchSongs(query: string, songs: Song[]): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery || normalizedQuery.length < 2) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const song of songs) {
    const matchedFields: string[] = [];
    
    // Check title
    if (song.title.toLowerCase().includes(normalizedQuery)) {
      matchedFields.push('title');
    }
    
    // Check author
    if (song.author.toLowerCase().includes(normalizedQuery)) {
      matchedFields.push('author');
    }
    
    // Check subreddit
    if (song.subreddit.toLowerCase().includes(normalizedQuery)) {
      matchedFields.push('subreddit');
    }

    // If any field matches, add to results
    if (matchedFields.length > 0) {
      results.push({
        type: 'song',
        item: song,
        matchedFields,
      });
    }
  }

  return results;
}

// Helper to search subreddits by query
function searchSubreddits(query: string, subreddits: string[]): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery || normalizedQuery.length < 2) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const subreddit of subreddits) {
    if (subreddit.toLowerCase().includes(normalizedQuery)) {
      results.push({
        type: 'subreddit',
        item: subreddit,
        matchedFields: ['name'],
      });
    }
  }

  return results;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial state
  query: '',
  results: [],
  isOpen: false,
  selectedIndex: -1,
  isLoading: false,
  recentSearches: [],

  // Actions
  setQuery: (query) =>
    set({
      query,
    }),

  search: (query, songs, availableSubreddits) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery || normalizedQuery.length < 2) {
      set({
        results: [],
        isOpen: false,
        selectedIndex: -1,
      });
      return;
    }

    // Search songs and subreddits
    const songResults = searchSongs(normalizedQuery, songs);
    const subredditResults = searchSubreddits(normalizedQuery, availableSubreddits);

    // Combine and limit results (max 10 songs + 5 subreddits)
    const results = [
      ...songResults.slice(0, 10),
      ...subredditResults.slice(0, 5),
    ];

    set({
      results,
      isOpen: results.length > 0,
      selectedIndex: results.length > 0 ? 0 : -1,
    });
  },

  setIsOpen: (isOpen) =>
    set({
      isOpen,
      selectedIndex: isOpen && get().results.length > 0 ? 0 : -1,
    }),

  selectNext: () => {
    const state = get();
    if (state.results.length === 0) return;

    const nextIndex = (state.selectedIndex + 1) % state.results.length;
    set({ selectedIndex: nextIndex });
  },

  selectPrev: () => {
    const state = get();
    if (state.results.length === 0) return;

    const prevIndex =
      state.selectedIndex <= 0
        ? state.results.length - 1
        : state.selectedIndex - 1;
    set({ selectedIndex: prevIndex });
  },

  selectResult: () => {
    const state = get();
    if (state.selectedIndex < 0 || state.selectedIndex >= state.results.length) {
      return null;
    }

    return state.results[state.selectedIndex];
  },

  clearSearch: () =>
    set({
      query: '',
      results: [],
      isOpen: false,
      selectedIndex: -1,
    }),

  addRecentSearch: (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    set((state) => {
      const filtered = state.recentSearches.filter((q) => q !== trimmedQuery);
      return {
        recentSearches: [trimmedQuery, ...filtered].slice(0, 5), // Keep last 5
      };
    });
  },

  clearRecentSearches: () =>
    set({
      recentSearches: [],
    }),
}));
