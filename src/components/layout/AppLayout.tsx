'use client';

import React from 'react';
import { usePlaylistStore } from '@/stores';
import { useKeyboardShortcuts } from '@/hooks';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isQueueOpen } = usePlaylistStore();
  useKeyboardShortcuts();

  return (
    <div className="flex h-screen w-full flex-col bg-background/80 text-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent-500/10 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Dynamic mesh gradient background effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-500/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-1 flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}