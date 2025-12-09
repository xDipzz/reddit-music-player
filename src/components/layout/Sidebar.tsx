import React from 'react';

/**
 * Sidebar Component
 * Width: w-[280px]
 * Hidden on mobile, visible on md+
 * Matches HTML design exactly
 */
export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-[280px] flex-col border-r border-[rgba(255,255,255,0.08)] bg-neutral-950">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {/* Selected Subreddits */}
        <div>
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Selected <span className="text-neutral-600 font-mono ml-1">0</span>
            </span>
            <button className="text-[10px] text-neutral-500 hover:text-white transition-colors">
              Clear
            </button>
          </div>
          <div className="space-y-1">
            <div className="px-2 py-3 text-xs text-neutral-500 text-center">
              No subreddits selected
            </div>
          </div>
        </div>

        {/* Browse Categories */}
        <div>
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Browse
            </span>
          </div>
          <div className="space-y-1">
            <div className="px-2 py-3 text-xs text-neutral-400">
              Categories will be listed here
            </div>
          </div>
        </div>

        {/* Custom Subreddit */}
        <div>
          <div className="px-2 mb-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Add Custom
            </span>
          </div>
          <div className="flex gap-2 px-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-medium">
                r/
              </span>
              <input
                type="text"
                placeholder="subreddit"
                className="w-full h-8 bg-neutral-900 border border-white/10 rounded-md pl-6 pr-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white transition-colors">
              +
            </button>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)] mt-auto">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
          Sort by
        </div>
        <div className="grid grid-cols-4 gap-1">
          <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-md bg-white/10 text-white transition-colors">
            <span>🔥</span>
            <span className="text-[10px] font-medium">Hot</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-md hover:bg-white/5 text-neutral-500 hover:text-white transition-colors">
            <span>🕐</span>
            <span className="text-[10px] font-medium">New</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-md hover:bg-white/5 text-neutral-500 hover:text-white transition-colors">
            <span>📈</span>
            <span className="text-[10px] font-medium">Top</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-md hover:bg-white/5 text-neutral-500 hover:text-white transition-colors">
            <span>⚡</span>
            <span className="text-[10px] font-medium">Rising</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
