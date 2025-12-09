'use client';

import { NowPlaying } from './NowPlaying';
import { PlayerControls } from './PlayerControls';
import { VolumeControl } from './VolumeControl';
import { QueueButton } from './QueueButton';
import { CommentsButton } from './CommentsButton';
import { usePlayerStore, usePlaylistStore } from '@/stores';
import { usePlayerController } from '@/hooks/usePlayerController';
import { useProgressTimer } from '@/hooks/useProgressTimer';

export function PlayerBar() {
  // Initialize progress timer
  useProgressTimer();

  // Get state from stores
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
  } = usePlayerStore();

  const { queue } = usePlaylistStore();

  // Get controller
  const controller = usePlayerController();

  // Calculate progress for mobile bar
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="fixed bottom-[56px] md:bottom-0 left-0 right-0 h-[64px] md:h-[90px] bg-neutral-950/95 border-t border-white/10 z-50 backdrop-blur-xl">
      <div className="h-full flex items-center px-4">
        {/* Now Playing */}
        <NowPlaying />

        {/* Controls (Desktop) */}
        <PlayerControls />

        {/* Volume (Desktop) */}
        <div className="hidden md:flex items-center justify-end w-[30%] gap-2 pl-2">
          <VolumeControl />
          <CommentsButton />
          <QueueButton />
        </div>
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-[2px] bg-neutral-800">
        <div className="h-full bg-white transition-all" id="mobileProgress" style={{ width: `${progress}%` }} />
      </div>
    </footer>
  );
}

export default PlayerBar;
