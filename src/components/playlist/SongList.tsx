'use client';

import React from 'react';
import { usePlayerStore } from '@/stores';
import { SongItem, type Song } from './SongItem';

interface SongListProps {
  songs: Song[];
  onSongClick: (song: Song, index: number) => void;
}

export function SongList({ songs, onSongClick }: SongListProps) {
  const { currentSong, isPlaying } = usePlayerStore();

  return (
    <div className="space-y-1">
      {/* List Header */}
      <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[40px_1fr_200px_120px_60px] gap-4 px-4 py-2 border-b border-white/5 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
        <div className="text-center">#</div>
        <div>Title</div>
        <div className="hidden md:block">Source</div>
        <div className="hidden md:block">Score</div>
        <div className="text-right">
          <svg 
            className="inline w-3.5 h-3.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
      </div>
      
      {/* Song Items */}
      <div>
        {songs.map((song, index) => (
          <SongItem
            key={song.id}
            song={song}
            index={index}
            isActive={currentSong?.id === song.id}
            isPlaying={currentSong?.id === song.id && isPlaying}
            onClick={() => onSongClick(song, index)}
          />
        ))}
      </div>
    </div>
  );
}
