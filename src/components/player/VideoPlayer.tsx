'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '@/stores';

const PLAYER_ELEMENT_ID = 'youtube-player-element';

/**
 * VideoPlayer Component
 * Displays the YouTube video player in a visible container
 * Creates the target element for YouTube IFrame API
 */
export function VideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { currentSong } = usePlayerStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    // Create or find the YouTube player element
    let playerElement = document.getElementById(PLAYER_ELEMENT_ID);
    
    if (!playerElement) {
      playerElement = document.createElement('div');
      playerElement.id = PLAYER_ELEMENT_ID;
      playerElement.setAttribute('data-youtube-player', 'true');
      playerElement.style.cssText = 'width:100%;height:100%;';
    }

    // Append to our container if not already there
    if (playerElement.parentElement !== containerRef.current) {
      containerRef.current.appendChild(playerElement);
    }
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="w-full aspect-video bg-neutral-900 rounded-lg flex items-center justify-center">
        <div className="text-neutral-600">Loading player...</div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-neutral-900 rounded-lg overflow-hidden relative">
      {!currentSong && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 z-10 pointer-events-none">
          <svg
            className="w-16 h-16 mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm">Select a track to start playing</p>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full absolute inset-0" />
    </div>
  );
}
