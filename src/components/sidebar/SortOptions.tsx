'use client';

import React from 'react';
import { Flame, Clock, TrendingUp, Zap } from 'lucide-react';
import { useSubredditStore } from '@/stores/subreddit-store';
import type { SortMethod } from '@/types';

const SORT_OPTIONS = [
  { value: 'hot' as const, icon: Flame, label: 'Hot' },
  { value: 'new' as const, icon: Clock, label: 'New' },
  { value: 'top' as const, icon: TrendingUp, label: 'Top' },
  { value: 'rising' as const, icon: Zap, label: 'Rising' },
];

export default function SortOptions() {
  const sortMethod = useSubredditStore((state) => state.sortMethod);
  const setSortMethod = useSubredditStore((state) => state.setSortMethod);

  return (
    <div className="p-4 border-t border-border mt-auto">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
        Sort by
      </div>
      <div className="grid grid-cols-4 gap-1">
        {SORT_OPTIONS.map(({ value, icon: Icon, label }) => {
          const isActive = sortMethod === value;

          return (
            <button
              key={value}
              onClick={() => setSortMethod(value)}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'hover:bg-white/5 text-neutral-500 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
