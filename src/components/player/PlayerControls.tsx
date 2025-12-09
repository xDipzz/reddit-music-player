'use client';

import { ProgressBar } from './ProgressBar';
import { usePlayerStore } from '@/stores';
import { usePlayerController } from '@/hooks/usePlayerController';
import { Icon } from '@/components/ui/Icon';

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
          <Icon icon="lucide:shuffle" width="16" strokeWidth="1.5" />
        </button>
        <button
          id="prevBtn"
          className="text-neutral-200 hover:text-white transition-colors"
          onClick={controller.playPrevious}
        >
          <Icon icon="lucide:skip-back" width="20" strokeWidth="1.5" />
        </button>
        <button
          id="playPauseBtn"
          className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow shadow-white/10"
          onClick={controller.togglePlayPause}
        >
          <Icon icon={isPlaying ? 'lucide:pause' : 'lucide:play'} width="18" strokeWidth="1.5" />
        </button>
        <button
          id="nextBtn"
          className="text-neutral-200 hover:text-white transition-colors"
          onClick={controller.playNext}
        >
          <Icon icon="lucide:skip-forward" width="20" strokeWidth="1.5" />
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
          <Icon icon={mappedRepeatMode === 'one' ? 'lucide:repeat-1' : 'lucide:repeat'} width="16" strokeWidth="1.5" />
        </button>
      </div>

      <ProgressBar />
    </div>
  );
}
