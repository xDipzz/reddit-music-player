import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

// Primary font: Geist (with Inter as fallback)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Mono font: JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'Reddit Music Player - Stream Music from Reddit',
    template: '%s | Reddit Music Player'
  },
  description: 'Free streaming music player powered by Reddit. Discover and play music from your favorite subreddits. No ads, no accounts required.',
  keywords: ['reddit music', 'music player', 'streaming', 'youtube', 'subreddit', 'free music', 'online music', 'music discovery'],
  authors: [{ name: 'Reddit Music Player' }],
  creator: 'Reddit Music Player',
  publisher: 'Reddit Music Player',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://reddit.musicplayer.io'),
  openGraph: {
    title: 'Reddit Music Player',
    description: 'Stream music from Reddit for free. Discover and play music from your favorite subreddits.',
    url: 'https://reddit.musicplayer.io',
    siteName: 'Reddit Music Player',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reddit Music Player - Stream Music from Reddit',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reddit Music Player',
    description: 'Stream music from Reddit for free',
    images: ['/og-image.png'],
    creator: '@redditmusicplayer',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://reddit.musicplayer.io',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <StructuredData type="home" />
        {/* Iconify for icons */}
        <script src="https://code.iconify.design/3/3.1.0/iconify.min.js" async></script>
      </head>
      <body
        className={`${geistSans.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased font-sans selection:bg-white/20`}
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
