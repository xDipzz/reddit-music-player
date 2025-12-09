'use client';

import { YouTubeProvider } from '@/components/providers/YouTubeProvider';
import AppLayout from '@/components/layout/AppLayout';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import MainContent from '@/components/layout/MainContent';
import PlayerBar from '@/components/player/PlayerBar';
import { QueuePanel } from '@/components/player/QueuePanel';
import { CommentsPanel } from '@/components/player/CommentsPanel';
import { MobileNav } from '@/components/layout/MobileNav';

export default function Home() {
  return (
    <YouTubeProvider>
      <AppLayout>
        <Header />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar />
          <MainContent />
          <QueuePanel />
          <CommentsPanel />
        </div>
        <PlayerBar />
        <MobileNav />
      </AppLayout>
    </YouTubeProvider>
  );
}
