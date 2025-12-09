import React from 'react';
import { PlayingIndicator } from './PlayingIndicator';
import type { Song } from '@/types';

export type { Song };

interface SongItemProps {
  song: Song;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

function formatTimeAgo(utcTimestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - utcTimestamp;
  
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`;
  return `${Math.floor(diff / 2592000)}mo ago`;
}

export function SongItem({ song, index, isActive, isPlaying, onClick }: SongItemProps) {
  return (
    <div 
      className={`song-item group flex items-center grid grid-cols-[auto_1fr_auto] md:grid-cols-[40px_1fr_200px_120px_60px] gap-4 px-4 py-2 rounded-md ${
        isActive ? 'bg-white/5 border border-white/5' : 'hover:bg-white/5 border border-transparent'
      } transition-colors cursor-pointer`}
      onClick={onClick}
    >
      {/* Index / Playing Indicator */}
      <div className={`flex justify-center items-center ${isActive ? 'text-accent-500' : 'text-neutral-500'} w-full`}>
        {isPlaying ? (
          <PlayingIndicator />
        ) : (
          <>
            <span className="group-hover:hidden">{index + 1}</span>
            <span className="hidden group-hover:block">
              <svg 
                className="w-3 h-3" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </span>
          </>
        )}
      </div>

      {/* Title & Thumbnail */}
      <div className="flex items-center gap-3 min-w-0">
        {song.thumbnail ? (
          <img 
            src={song.thumbnail} 
            alt={song.title} 
            className={`w-10 h-10 rounded object-cover shadow-sm ${
              isActive ? '' : 'opacity-80 group-hover:opacity-100'
            } transition-opacity`}
          />
        ) : (
          <div className="w-10 h-10 rounded bg-neutral-800 flex items-center justify-center">
            <svg 
              className="text-neutral-600 w-4 h-4" 
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
        <div className="min-w-0">
          <div className={`text-sm font-medium ${
            isActive ? 'text-accent-500' : 'text-neutral-200 group-hover:text-white'
          } truncate`}>
            {song.title}
          </div>
          <div className="text-xs text-neutral-500 truncate md:hidden">
            {song.author} • r/{song.subreddit}
          </div>
        </div>
      </div>

      {/* Source (Desktop) */}
      <div className="hidden md:flex items-center text-xs text-neutral-400 hover:text-white hover:underline truncate">
        r/{song.subreddit}
      </div>

      {/* Score (Desktop) */}
      <div className="hidden md:flex items-center gap-1.5 text-xs text-neutral-400">
        <svg 
          className="text-neutral-500 w-4 h-4" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        {formatNumber(song.score)}
      </div>

      {/* Time Ago */}
      <div className="text-xs text-neutral-400 text-right font-mono">
        {formatTimeAgo(song.createdUtc)}
      </div>
    </div>
  );
}
