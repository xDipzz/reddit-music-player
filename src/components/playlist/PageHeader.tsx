'use client';

import React from 'react';
import { useSubredditStore, usePlaylistStore } from '@/stores';

interface PageHeaderProps {
  showActions?: boolean;
  onPlayAll?: () => void;
  onShuffle?: () => void;
}

export function PageHeader({ 
  showActions = false,
  onPlayAll,
  onShuffle 
}: PageHeaderProps) {
  const { selectedSubreddits, sortMethod, topTimeframe } = useSubredditStore();
  const { songs } = usePlaylistStore();

  // Generate title based on selected subreddits
  const title = selectedSubreddits.length === 0
    ? 'Select Subreddits'
    : selectedSubreddits.length === 1
    ? `r/${selectedSubreddits[0]}`
    : `${selectedSubreddits.length} Subreddits`;

  // Generate subtitle with song count and sort method
  const getSortLabel = () => {
    if (sortMethod === 'top') {
      const timeframeLabels = {
        hour: 'Hour',
        day: 'Day',
        week: 'Week',
        month: 'Month',
        year: 'Year',
        all: 'All Time'
      };
      return `Top - ${timeframeLabels[topTimeframe]}`;
    }
    return sortMethod.charAt(0).toUpperCase() + sortMethod.slice(1);
  };

  const subtitle = selectedSubreddits.length === 0
    ? 'Choose subreddits from the sidebar to start'
    : `${songs.length} ${songs.length === 1 ? 'song' : 'songs'} • ${getSortLabel()}`;

  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          {title}
        </h1>
        <p className="text-sm text-neutral-400">
          {subtitle}
        </p>
      </div>
      {showActions && (
        <div className="hidden md:flex items-center gap-2">
          <button 
            onClick={onPlayAll}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors"
          >
            <svg 
              className="w-3.5 h-3.5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Play All
          </button>
          <button 
            onClick={onShuffle}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
