import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reddit.musicplayer.io';
  
  // Popular music subreddits
  const popularSubreddits = [
    'listentothis',
    'music',
    'hiphopheads',
    'indieheads',
    'electronicmusic',
    'metal',
    'jazz',
    'classicalmusic',
    'rock',
    'popheads',
    'trap',
    'edm',
    'country',
    'folk',
    'punk',
    'rnb',
    'blues',
    'reggae',
    'kpop',
    'experimentalmusic',
  ];

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Add popular subreddit routes
  popularSubreddits.forEach((subreddit) => {
    routes.push({
      url: `${baseUrl}/r/${subreddit}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    });
  });

  return routes;
}
