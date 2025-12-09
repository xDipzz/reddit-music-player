'use client';

import { Home, Search, Library } from 'lucide-react';

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[56px] bg-neutral-950 border-t border-white/5 flex items-center justify-around z-[60] pb-safe">
      <button className="flex flex-col items-center gap-1 p-2 text-white">
        <Home size={20} strokeWidth={1.5} />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-white transition-colors">
        <Search size={20} strokeWidth={1.5} />
        <span className="text-[10px] font-medium">Search</span>
      </button>
      <button className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-white transition-colors">
        <Library size={20} strokeWidth={1.5} />
        <span className="text-[10px] font-medium">Library</span>
      </button>
      <button className="flex flex-col items-center gap-1 p-2 text-neutral-500 hover:text-white transition-colors">
        <div className="w-5 h-5 rounded-full overflow-hidden border border-neutral-600">
          <div className="w-full h-full bg-gradient-to-tr from-neutral-700 to-neutral-600 flex items-center justify-center text-[8px] text-white">JD</div>
        </div>
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </nav>
  );
}
