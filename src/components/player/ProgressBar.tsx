'use client';

import { useState } from 'react';
import { usePlayerStore } from '@/stores';
import { usePlayerController } from '@/hooks/usePlayerController';

export function ProgressBar() {
  const [isHovering, setIsHovering] = useState(false);
  const { currentTime, duration } = usePlayerStore();
  const controller = usePlayerController();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    controller.seekTo(newTime);
  };

  return (
    <div className="w-full flex items-center gap-2 group">
      <span className="text-[10px] text-neutral-500 font-mono w-8 text-right" id="currentTime">
        {formatTime(currentTime)}
      </span>
      <div
        className="relative flex-1 h-1 bg-neutral-800 rounded-full cursor-pointer"
        id="progressBar"
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="absolute inset-y-0 left-0 bg-white rounded-full transition-all"
          id="progressFill"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
          id="progressThumb"
          style={{ left: `${progress}%` }}
        />
      </div>
      <span className="text-[10px] text-neutral-500 font-mono w-8" id="duration">
        {formatTime(duration)}
      </span>
    </div>
  );
}
