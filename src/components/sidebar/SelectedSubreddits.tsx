'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useSubredditStore } from '@/stores/subreddit-store';

const COLORS = ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ef4444', '#06b6d4'];

export default function SelectedSubreddits() {
  const selectedSubreddits = useSubredditStore((state) => state.selectedSubreddits);
  const removeSubreddit = useSubredditStore((state) => state.removeSubreddit);
  const clearSubreddits = useSubredditStore((state) => state.clearSubreddits);

  const handleRemove = (sub: string) => {
    removeSubreddit(sub);
  };

  const handleClearAll = () => {
    clearSubreddits();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Selected{' '}
          <span className="text-neutral-600 font-mono ml-1">
            {selectedSubreddits.length}
          </span>
        </span>
        <button
          onClick={handleClearAll}
          className="text-[10px] text-neutral-500 hover:text-white transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="space-y-1">
        {selectedSubreddits.length === 0 ? (
          <div className="px-2 py-3 text-xs text-neutral-500 text-center">
            No subreddits selected
          </div>
        ) : (
          selectedSubreddits.map((sub, i) => (
            <button
              key={sub}
              className="w-full flex items-center gap-3 px-2 py-1.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-md group transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              r/{sub}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(sub);
                }}
                className="ml-auto opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-white transition-opacity"
              >
                <X className="w-3 h-3" />
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
