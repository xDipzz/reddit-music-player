import React from 'react';

/**
 * Player Bar Component
 * Fixed bottom position
 * Height: h-[64px] on mobile, h-[90px] on desktop
 * Matches HTML design exactly
 */
export default function PlayerBar() {
  return (
    <>
      {/* Player Bar */}
      <footer className="fixed bottom-[56px] md:bottom-0 left-0 right-0 h-[64px] md:h-[90px] bg-neutral-950/95 border-t border-white/10 z-50 backdrop-blur-xl">
        <div className="h-full flex items-center px-4">
          {/* Now Playing */}
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-[30%] min-w-0 pr-2">
            <div className="relative group cursor-pointer flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-neutral-800 flex items-center justify-center">
                <span className="text-neutral-600">🎵</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-400 truncate">
                  No track playing
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-500 truncate">
                Select a track to play
              </div>
            </div>

            <button className="md:hidden w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              ▶️
            </button>
          </div>

          {/* Controls (Desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center w-[40%] max-w-xl px-4">
            <div className="flex items-center gap-6 mb-1">
              <button className="text-neutral-400 hover:text-white transition-colors" title="Shuffle">
                🔀
              </button>
              <button className="text-neutral-200 hover:text-white transition-colors">
                ⏮️
              </button>
              <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow shadow-white/10">
                ▶️
              </button>
              <button className="text-neutral-200 hover:text-white transition-colors">
                ⏭️
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors" title="Repeat">
                🔁
              </button>
            </div>
            
            <div className="w-full flex items-center gap-2 group">
              <span className="text-[10px] text-neutral-500 font-mono w-8 text-right">
                0:00
              </span>
              <div className="relative flex-1 h-1 bg-neutral-800 rounded-full cursor-pointer">
                <div className="absolute inset-y-0 left-0 bg-white rounded-full transition-all" style={{ width: '0%' }}></div>
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: '0%' }}></div>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono w-8">
                0:00
              </span>
            </div>
          </div>

          {/* Volume (Desktop) */}
          <div className="hidden md:flex items-center justify-end w-[30%] gap-4 pl-2">
            <div className="flex items-center gap-2 group">
              <button className="text-neutral-400 hover:text-white transition-colors">
                🔊
              </button>
              <div className="w-20 h-1 bg-neutral-800 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-neutral-400 group-hover:bg-white transition-colors" style={{ width: '75%' }}></div>
              </div>
            </div>
            <button className="text-neutral-400 hover:text-white transition-colors relative" title="Queue">
              🎶
              <span className="hidden absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium"></span>
            </button>
          </div>
        </div>
        
        {/* Mobile Progress */}
        <div className="md:hidden absolute top-0 left-0 right-0 h-[2px] bg-neutral-800">
          <div className="h-full bg-white transition-all" style={{ width: '0%' }}></div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[56px] bg-neutral-950 border-t border-white/5 flex items-center justify-around z-[60]">
        <button className="flex flex-col items-center gap-1 p-2 text-white">
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-white transition-colors">
          <span className="text-xl">🔍</span>
          <span className="text-[10px] font-medium">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-white transition-colors">
          <span className="text-xl">📚</span>
          <span className="text-[10px] font-medium">Library</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-white transition-colors">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-neutral-600">
            <div className="w-full h-full bg-gradient-to-tr from-neutral-700 to-neutral-600 flex items-center justify-center text-[8px] text-white">
              JD
            </div>
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </>
  );
}
