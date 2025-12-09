'use client';

import { usePlayerStore } from '@/stores';
import { usePlayerController } from '@/hooks/usePlayerController';

export function VolumeControl() {
  const { volume, isMuted } = usePlayerStore();
  const controller = usePlayerController();

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return 'lucide:volume-x';
    if (volume < 0.33) return 'lucide:volume';
    if (volume < 0.66) return 'lucide:volume-1';
    return 'lucide:volume-2';
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    controller.setVolume(percentage);
  };

  return (
    <div className="flex items-center gap-2 group">
      <button
        id="volumeBtn"
        className="text-neutral-400 hover:text-white transition-colors"
        onClick={() => {
          const { toggleMute } = usePlayerStore.getState();
          toggleMute();
        }}
      >
        <span
          className="iconify"
          data-icon={getVolumeIcon()}
          data-width="18"
          data-stroke-width="1.5"
        ></span>
      </button>
      <div
        className="w-20 h-1 bg-neutral-800 rounded-full overflow-hidden cursor-pointer"
        id="volumeBar"
        onClick={handleVolumeClick}
      >
        <div
          className="h-full bg-neutral-400 group-hover:bg-white transition-colors"
          id="volumeFill"
          style={{ width: `${isMuted ? 0 : volume * 100}%` }}
        />
      </div>
    </div>
  );
}
