'use client';

import React, { useState } from 'react';
import { LoadingState, EmptyState } from '@/components/playlist';

export default function DemoPage() {
  const [view, setView] = useState<'loading' | 'empty'>('loading');

  return (
    <div className="h-screen bg-neutral-950 overflow-hidden">
      <main className="flex-1 overflow-y-auto bg-neutral-950 relative scroll-smooth pb-32 md:pb-32">
        <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-neutral-400 mb-3">Demo Controls:</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setView('loading')}
                className={`px-3 py-1.5 rounded text-sm ${
                  view === 'loading' 
                    ? 'bg-accent-500 text-white' 
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                }`}
              >
                Loading State
              </button>
              <button
                onClick={() => setView('empty')}
                className={`px-3 py-1.5 rounded text-sm ${
                  view === 'empty' 
                    ? 'bg-accent-500 text-white' 
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                }`}
              >
                Empty State
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                Demo Components
              </h1>
              <p className="text-sm text-neutral-400">
                Viewing {view} state
              </p>
            </div>
          </div>

          {view === 'loading' && <LoadingState />}
          {view === 'empty' && <EmptyState />}
        </div>
      </main>
    </div>
  );
}
