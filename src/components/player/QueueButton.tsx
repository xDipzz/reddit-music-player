'use client';

import { usePlaylistStore } from '@/stores';
import { Icon } from '@/components/ui/Icon';

export function QueueButton() {
  const { queue, isQueueOpen, toggleQueue } = usePlaylistStore();
  const count = queue.length;
  
  return (
    <button
      id="queueBtn"
      className={`${
        isQueueOpen ? 'text-accent-500' : 'text-neutral-400 hover:text-white'
      } transition-colors relative`}
      title="Queue"
      onClick={toggleQueue}
    >
      <Icon icon="lucide:list-music" width="18" strokeWidth="1.5" />
      <span
        id="queueBadge"
        className={`${
          count > 0 ? 'flex' : 'hidden'
        } absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full text-[10px] text-white items-center justify-center font-medium`}
        suppressHydrationWarning
      >
        {count > 9 ? '9+' : count}
      </span>
    </button>
  );
}
