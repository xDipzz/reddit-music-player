'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSubredditStore } from '@/stores/subreddit-store';

export default function CustomSubredditInput() {
  const [inputValue, setInputValue] = useState('');
  const addSubreddit = useSubredditStore((state) => state.addSubreddit);

  const handleAdd = () => {
    if (inputValue.trim()) {
      addSubreddit(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="subreddit"
            className="w-full h-8 bg-neutral-900 border border-white/10 rounded-md pl-6 pr-2 text-xs text-white focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <button
          onClick={handleAdd}
          className="h-8 w-8 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
