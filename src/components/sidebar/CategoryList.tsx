'use client';

import React from 'react';
import {
  Zap,
  Mic2,
  Guitar,
  Music,
  Cloud,
  ChevronDown,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useSubredditStore } from '@/stores/subreddit-store';

const SUBREDDIT_CATEGORIES = {
  Electronic: {
    icon: Zap,
    color: '#8b5cf6',
    subreddits: ['electronicmusic', 'house', 'techno', 'trance', 'edm', 'deephouse'],
  },
  'Hip Hop': {
    icon: Mic2,
    color: '#f59e0b',
    subreddits: ['hiphopheads', 'rap', 'trapmuzik', 'makinghiphop'],
  },
  Rock: {
    icon: Guitar,
    color: '#ef4444',
    subreddits: ['rock', 'indieheads', 'metal', 'punk', 'alternativerock'],
  },
  General: {
    icon: Music,
    color: '#10b981',
    subreddits: ['listentothis', 'music', 'newmusic', 'letstalkmusic'],
  },
  Chill: {
    icon: Cloud,
    color: '#06b6d4',
    subreddits: ['chillmusic', 'lofi', 'ambient', 'chillwave'],
  },
};

export default function CategoryList() {
  const selectedSubreddits = useSubredditStore((state) => state.selectedSubreddits);
  const expandedCategories = useSubredditStore((state) => state.expandedCategories);
  const toggleSubreddit = useSubredditStore((state) => state.toggleSubreddit);
  const toggleCategory = useSubredditStore((state) => state.toggleCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Browse
        </span>
      </div>

      <div className="space-y-1">
        {Object.entries(SUBREDDIT_CATEGORIES).map(([name, category]) => {
          const isExpanded = expandedCategories.has(name);
          const Icon = category.icon;

          return (
            <div key={name} className="mb-2">
              <button
                onClick={() => toggleCategory(name)}
                className={`w-full flex items-center justify-between px-2 py-1.5 text-sm font-medium ${
                  isExpanded
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white'
                } hover:bg-white/5 rounded-md transition-colors`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className="w-4 h-4"
                    style={{ color: category.color }}
                  />
                  {name}
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                )}
              </button>
              {isExpanded && (
                <div className="mt-1 ml-2 pl-2 border-l border-white/5 space-y-0.5">
                  {category.subreddits.map((sub) => {
                    const isSelected = selectedSubreddits.includes(sub);

                    return (
                      <div
                        key={sub}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 cursor-pointer group"
                        onClick={() => toggleSubreddit(sub)}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded border ${
                            isSelected
                              ? 'border-white bg-white'
                              : 'border-neutral-700 group-hover:border-neutral-500'
                          } flex items-center justify-center transition-colors`}
                        >
                          {isSelected && (
                            <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            isSelected
                              ? 'text-white font-medium'
                              : 'text-neutral-400 group-hover:text-neutral-200'
                          }`}
                        >
                          r/{sub}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
