'use client';

import React from 'react';
import { PlayingIndicator } from '@/components/playlist/PlayingIndicator';
import { formatTime } from '@/lib/utils/format';
import type { Song } from '@/types';

interface QueueItemProps {
  song: Song;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
  onRemove: () => void;
}

export function QueueItem({
  song,
  index,
  isActive,
  isPlaying,
  onClick,
  onRemove,
}: QueueItemProps) {
  return (
    <div
      className={`group flex items-center gap-3 px-3 py-2 rounded-md ${
        isActive
          ? 'bg-accent-500/10 border border-accent-500/20'
          : 'hover:bg-white/5 border border-transparent'
      } transition-colors cursor-pointer`}
    >
      {/* Index / Playing Indicator */}
      <div
        className={`flex-shrink-0 w-6 flex justify-center items-center text-xs ${
          isActive ? 'text-accent-500' : 'text-neutral-500'
        }`}
        onClick={onClick}
      >
        {isPlaying ? <PlayingIndicator /> : <span>{index + 1}</span>}
      </div>

      {/* Thumbnail */}
      <div className="flex-shrink-0" onClick={onClick}>
        {song.thumbnail ? (
          <img
            src={song.thumbnail}
            alt={song.title}
            className={`w-8 h-8 rounded object-cover shadow-sm ${
              isActive ? '' : 'opacity-80 group-hover:opacity-100'
            } transition-opacity`}
          />
        ) : (
          <div className="w-8 h-8 rounded bg-neutral-800 flex items-center justify-center">
            <svg
              className="text-neutral-600 w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
        )}
      </div>

      {/* Title and Subreddit */}
      <div className="flex-1 min-w-0" onClick={onClick}>
        <div
          className={`text-sm font-medium ${
            isActive
              ? 'text-accent-500'
              : 'text-neutral-200 group-hover:text-white'
          } truncate leading-tight`}
        >
          {song.title}
        </div>
        <div className="text-xs text-neutral-500 truncate mt-0.5">
          r/{song.subreddit}
        </div>
      </div>

      {/* Duration */}
      <div
        className="flex-shrink-0 text-xs text-neutral-400 font-mono"
        onClick={onClick}
      >
        {song.duration ? formatTime(song.duration) : '–'}
      </div>

      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Remove from queue"
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
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
