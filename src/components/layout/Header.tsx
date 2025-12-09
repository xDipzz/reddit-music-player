"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, RefreshCw, Bell, ChevronDown, X } from "lucide-react";
import { useSearchStore } from "@/stores/search-store";
import { usePlaylistStore } from "@/stores";
import { SUBREDDIT_CATEGORIES } from "@/lib/constants";
import SearchResults from "./SearchResults";

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const {
    query,
    isOpen,
    setQuery,
    search,
    setIsOpen,
    selectNext,
    selectPrev,
    selectResult,
    clearSearch,
    addRecentSearch,
  } = useSearchStore();

  const { songs } = usePlaylistStore();

  // Debounce search query (300ms)
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      // Get all available subreddits from categories
      const availableSubreddits = Object.values(SUBREDDIT_CATEGORIES).flatMap(
        (category) => category.subreddits
      );
      search(debouncedQuery, songs, availableSubreddits);
    } else if (debouncedQuery.trim().length === 0) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, songs]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setQuery(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        selectNext();
        break;

      case "ArrowUp":
        e.preventDefault();
        selectPrev();
        break;

      case "Enter":
        e.preventDefault();
        const result = selectResult();
        if (result) {
          handleSelectResult();
        }
        break;

      case "Escape":
        e.preventDefault();
        handleCloseSearch();
        break;
    }
  };

  // Handle result selection
  const handleSelectResult = () => {
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
    }
    handleCloseSearch();
  };

  // Close search and clear
  const handleCloseSearch = useCallback(() => {
    clearSearch();
    setSearchQuery("");
    searchInputRef.current?.blur();
  }, [clearSearch]);

  // Clear input
  const handleClear = () => {
    setSearchQuery("");
    setQuery("");
    setIsOpen(false);
    searchInputRef.current?.focus();
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <header className="h-16 border-b border-[rgba(255,255,255,0.08)] bg-neutral-950/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 z-40 relative">
      {/* Logo Section */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center shadow-lg shadow-white/5 transition-transform group-hover:scale-105">
            <span className="font-bold tracking-tighter text-sm">RMP</span>
          </div>
          <span className="font-semibold tracking-tight text-white hidden md:block">
            Reddit Music Player
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-4" ref={searchContainerRef}>
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            id="searchInput"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchQuery.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            placeholder="Search subreddits or songs..."
            className="w-full h-10 bg-neutral-900 border border-[rgba(255,255,255,0.08)] rounded-lg pl-10 pr-12 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 focus:bg-neutral-800 transition-all"
          />
          
          {/* Clear button or keyboard shortcut hint */}
          {searchQuery ? (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 bg-neutral-800 border border-white/5 rounded">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          )}

          {/* Search Results Dropdown */}
          {isOpen && <SearchResults onClose={handleCloseSearch} />}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          id="refreshBtn"
          title="Refresh"
        >
          <RefreshCw size={20} strokeWidth={1.5} />
        </button>
        <button className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 rounded-md transition-colors relative">
          <Bell size={20} strokeWidth={1.5} />
        </button>
        <div className="h-6 w-px bg-white/10 mx-1 hidden md:block"></div>
        <button className="flex items-center gap-2 pl-2 rounded-full hover:bg-white/5 transition-colors p-1 pr-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-600 border border-white/10 flex items-center justify-center text-[10px] font-medium text-white shadow-inner">
            JD
          </div>
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className="text-neutral-500"
          />
        </button>
      </div>
    </header>
  );
}
