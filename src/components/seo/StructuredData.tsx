'use client';

import { usePathname } from 'next/navigation';

interface Song {
  id: string;
  title: string;
  url: string;
}

interface StructuredDataProps {
  type?: 'home' | 'subreddit' | 'playlist';
  subreddit?: string;
  songs?: Song[];
}

export function StructuredData({ type = 'home', subreddit, songs }: StructuredDataProps) {
  const pathname = usePathname();

  const getWebApplicationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reddit Music Player',
    url: 'https://reddit.musicplayer.io',
    description: 'Free streaming music player powered by Reddit. Discover and play music from your favorite subreddits.',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Stream music from Reddit',
      'Browse multiple subreddits',
      'YouTube integration',
      'Queue management',
      'No ads or registration required',
    ],
  });

  const getMusicPlaylistSchema = () => {
    if (!songs || songs.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'MusicPlaylist',
      name: subreddit ? `r/${subreddit} Playlist` : 'Current Queue',
      description: subreddit 
        ? `Music playlist from r/${subreddit} subreddit`
        : 'Currently playing music queue',
      numTracks: songs.length,
      track: songs.slice(0, 10).map((song, index) => ({
        '@type': 'MusicRecording',
        position: index + 1,
        name: song.title,
        url: song.url,
      })),
    };
  };

  const getBreadcrumbSchema = () => {
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://reddit.musicplayer.io',
      },
    ];

    if (subreddit) {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: `r/${subreddit}`,
        item: `https://reddit.musicplayer.io/r/${subreddit}`,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    };
  };

  const schemas = [];

  // Always include web application schema on home page
  if (type === 'home') {
    schemas.push(getWebApplicationSchema());
  }

  // Include playlist schema if songs are provided
  if (songs && songs.length > 0) {
    const playlistSchema = getMusicPlaylistSchema();
    if (playlistSchema) {
      schemas.push(playlistSchema);
    }
  }

  // Include breadcrumb schema
  schemas.push(getBreadcrumbSchema());

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
