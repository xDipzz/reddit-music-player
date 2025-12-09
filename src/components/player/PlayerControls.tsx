'use client';

import { ProgressBar } from './ProgressBar';
import { usePlayerStore } from '@/stores';
import { usePlayerController } from '@/hooks/usePlayerController';

export function PlayerControls() {
  const { isPlaying, isShuffled, repeatMode } = usePlayerStore();
  const controller = usePlayerController();

  // Map repeatMode to component format
  const mappedRepeatMode: 'off' | 'all' | 'one' =
    repeatMode === 'none' ? 'off' : repeatMode;
  return (
    <div className="hidden md:flex flex-col items-center justify-center w-[40%] max-w-xl px-4">
      <div className="flex items-center gap-6 mb-1">
        <button
          id="shuffleBtn"
          className={`transition-colors ${
            isShuffled ? 'text-accent-500' : 'text-neutral-400 hover:text-white'
          }`}
          title="Shuffle"
          onClick={() => {
            const { toggleShuffle } = usePlayerStore.getState();
            toggleShuffle();
          }}
        >
          <span className="iconify" data-icon="lucide:shuffle" data-width="16" data-stroke-width="1.5"></span>
        </button>
        <button
          id="prevBtn"
          className="text-neutral-200 hover:text-white transition-colors"
          onClick={controller.playPrevious}
        >
          <span className="iconify" data-icon="lucide:skip-back" data-width="20" data-stroke-width="1.5"></span>
        </button>
        <button
          id="playPauseBtn"
          className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow shadow-white/10"
          onClick={controller.togglePlayPause}
        >
          <span
            className="iconify"
            data-icon={isPlaying ? 'lucide:pause' : 'lucide:play'}
            data-width="18"
            data-stroke-width="1.5"
          ></span>
        </button>
        <button
          id="nextBtn"
          className="text-neutral-200 hover:text-white transition-colors"
          onClick={controller.playNext}
        >
          <span className="iconify" data-icon="lucide:skip-forward" data-width="20" data-stroke-width="1.5"></span>
        </button>
        <button
          id="repeatBtn"
          className={`transition-colors ${
            mappedRepeatMode !== 'off' ? 'text-accent-500' : 'text-neutral-400 hover:text-white'
          }`}
          title="Repeat"
          onClick={() => {
            const { toggleRepeat } = usePlayerStore.getState();
            toggleRepeat();
          }}
        >
          <span
            className="iconify"
            data-icon={mappedRepeatMode === 'one' ? 'lucide:repeat-1' : 'lucide:repeat'}
            data-width="16"
            data-stroke-width="1.5"
          ></span>
        </button>
      </div>

      <ProgressBar />
    </div>
  );
}
