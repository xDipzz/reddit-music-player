'use client';

import { usePlayerStore } from '@/stores';
import { usePlayerController } from '@/hooks/usePlayerController';
import { formatNumber } from '@/lib/utils/format';

export function NowPlaying() {
  const { currentSong, isPlaying } = usePlayerStore();
  const controller = usePlayerController();

  // Determine display values
  const albumArt = currentSong?.thumbnail || undefined;
  const title = currentSong?.title || 'No track playing';
  const info = currentSong
    ? `r/${currentSong.subreddit} • ${formatNumber(currentSong.score)} upvotes`
    : 'Select a track to play';

  return (
    <div className="flex items-center gap-3 md:gap-4 w-full md:w-[30%] min-w-0 pr-2">
      <div className="relative group cursor-pointer flex-shrink-0" id="nowPlayingArt">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-neutral-800 flex items-center justify-center">
          {albumArt ? (
            <img src={albumArt} alt={title} className="w-full h-full object-cover rounded" />
          ) : (
            <span className="iconify text-neutral-600" data-icon="lucide:music" data-width="20"></span>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-400 truncate" id="nowPlayingTitle">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-neutral-500 truncate" id="nowPlayingInfo">
          {info}
        </div>
      </div>

      <button
        id="mobilePlayBtn"
        className="md:hidden w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"
        onClick={controller.togglePlayPause}
      >
        <span
          className="iconify"
          data-icon={isPlaying ? 'lucide:pause' : 'lucide:play'}
          data-width="16"
        ></span>
      </button>
    </div>
  );
}
