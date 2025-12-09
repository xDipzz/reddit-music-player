'use client';

import React, { useEffect, useRef } from 'react';
import { usePlaylistStore, usePlayerStore } from '@/stores';
import { QueueItem } from './QueueItem';
import { formatTime } from '@/lib/utils/format';
import { usePlayerController } from '@/hooks/usePlayerController';

export function QueuePanel() {
  const { queue, currentIndex, isQueueOpen, toggleQueue, removeFromQueue, clearQueue } =
    usePlaylistStore();
  const { currentSong, isPlaying } = usePlayerStore();
  const controller = usePlayerController();
  const panelRef = useRef<HTMLDivElement>(null);

  // Calculate total duration
  const totalDuration = queue.reduce((acc, song) => {
    return acc + (song.duration || 0);
  }, 0);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isQueueOpen) {
        toggleQueue();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isQueueOpen, toggleQueue]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isQueueOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        // Check if click is on the queue button itself
        const target = e.target as HTMLElement;
        if (target.closest('#queueBtn')) {
          return;
        }
        toggleQueue();
      }
    };

    if (isQueueOpen) {
      // Delay adding listener to avoid immediate close
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isQueueOpen, toggleQueue]);

  if (!isQueueOpen) return null;

  const handleSongClick = (index: number) => {
    controller.playSongAtIndex(index);
  };

  const handleRemove = (index: number) => {
    removeFromQueue(index);
  };

  const handleClearQueue = () => {
    if (confirm('Clear all songs from queue?')) {
      clearQueue();
    }
  };

  const handleShuffleQueue = () => {
    controller.toggleShuffle();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed right-0 top-0 md:top-16 bottom-0 md:bottom-[90px] w-full md:w-[400px] bg-neutral-950/98 border-l border-white/10 z-50 flex flex-col animate-in slide-in-from-right duration-300`}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white">Queue</h2>
              {queue.length > 0 && (
                <span className="px-2 py-0.5 bg-accent-500/20 text-accent-500 rounded-full text-xs font-medium">
                  {queue.length}
                </span>
              )}
            </div>
            <button
              onClick={toggleQueue}
              className="text-neutral-400 hover:text-white transition-colors md:hidden"
              title="Close"
            >
              <svg
                className="w-6 h-6"
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

          {/* Actions */}
          {queue.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffleQueue}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                title="Toggle shuffle"
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
                  <polyline points="16 3 21 3 21 8"></polyline>
                  <line x1="4" y1="20" x2="21" y2="3"></line>
                  <polyline points="21 16 21 21 16 21"></polyline>
                  <line x1="15" y1="15" x2="21" y2="21"></line>
                  <line x1="4" y1="4" x2="9" y2="9"></line>
                </svg>
                Shuffle
              </button>
              <button
                onClick={handleClearQueue}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-red-400 hover:bg-red-400/5 rounded-md transition-colors"
                title="Clear queue"
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
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Clear
              </button>
            </div>
          )}

          {/* Stats */}
          {queue.length > 0 && (
            <div className="mt-3 text-xs text-neutral-500">
              {queue.length} {queue.length === 1 ? 'song' : 'songs'} •{' '}
              {formatTime(totalDuration)}
            </div>
          )}
        </div>

        {/* Song List */}
        <div className="flex-1 overflow-y-auto">
          {queue.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full py-12 px-4">
              <div className="w-16 h-16 mb-4 rounded-full bg-neutral-900 flex items-center justify-center">
                <svg
                  className="text-neutral-600 w-8 h-8"
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
              <h3 className="text-base font-medium text-neutral-300 mb-2">
                Queue is empty
              </h3>
              <p className="text-sm text-neutral-500 text-center max-w-[240px]">
                Click a song to start playing
              </p>
            </div>
          ) : (
            // Queue Items
            <div className="p-2 space-y-1">
              {queue.map((song, index) => (
                <QueueItem
                  key={`${song.id}-${index}`}
                  song={song}
                  index={index}
                  isActive={index === currentIndex}
                  isPlaying={index === currentIndex && isPlaying}
                  onClick={() => handleSongClick(index)}
                  onRemove={() => handleRemove(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
