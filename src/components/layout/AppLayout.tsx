import React from 'react';
import { useKeyboardShortcuts } from '@/hooks';

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Main app layout with grid structure
 * Grid with 3 rows: header | main-area | player
 * Matches HTML design: .app-layout behavior
 */
export default function AppLayout({ children }: AppLayoutProps) {
  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <div className="grid h-screen w-screen overflow-hidden" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      {children}
    </div>
  );
}
