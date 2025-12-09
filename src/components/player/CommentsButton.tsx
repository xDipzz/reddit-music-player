'use client';

import { MessageSquare } from 'lucide-react';
import { useCommentsStore, usePlayerStore } from '@/stores';
import { cn } from '@/lib/utils';

interface CommentsButtonProps {
  onClick?: () => void;
}

export function CommentsButton({ onClick }: CommentsButtonProps) {
  const { togglePanel, isOpen } = useCommentsStore();
  const { currentSong } = usePlayerStore();

  const handleClick = () => {
    togglePanel();
    onClick?.();
  };

  // Disable if no song is playing
  const isDisabled = !currentSong;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        'p-2.5 rounded-lg transition-all relative group',
        isOpen
          ? 'bg-white text-neutral-900'
          : 'text-neutral-400 hover:bg-white/10 hover:text-white',
        isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral-400'
      )}
      aria-label="Toggle comments"
      title={isDisabled ? 'No song playing' : 'Comments'}
    >
      <MessageSquare className="w-5 h-5" />
      
      {/* Comment count badge */}
      {currentSong && currentSong.numComments > 0 && (
        <span className={cn(
          'absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1',
          'flex items-center justify-center',
          'text-[10px] font-bold rounded-full',
          'bg-orange-500 text-white',
          'pointer-events-none'
        )}>
          {currentSong.numComments > 99 ? '99+' : currentSong.numComments}
        </span>
      )}
    </button>
  );
}
