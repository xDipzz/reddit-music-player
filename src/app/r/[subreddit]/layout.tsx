import type { Metadata } from 'next';

interface SubredditLayoutProps {
  children: React.ReactNode;
  params: Promise<{ subreddit: string }>;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ subreddit: string }> 
}): Promise<Metadata> {
  const { subreddit } = await params;
  const subredditName = decodeURIComponent(subreddit);
  
  return {
    title: `r/${subredditName}`,
    description: `Listen to music from r/${subredditName} on Reddit Music Player. Stream and discover great music content from this subreddit.`,
    openGraph: {
      title: `r/${subredditName} - Reddit Music Player`,
      description: `Listen to music from r/${subredditName}`,
      url: `https://reddit.musicplayer.io/r/${subredditName}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `r/${subredditName} - Reddit Music Player`,
      description: `Listen to music from r/${subredditName}`,
    },
    alternates: {
      canonical: `https://reddit.musicplayer.io/r/${subredditName}`,
    },
  };
}

export default function SubredditLayout({ children }: SubredditLayoutProps) {
  return <>{children}</>;
}
