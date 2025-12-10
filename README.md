# 🎵 Reddit Music Player

Modern music player powered by Reddit. Browse subreddits, play YouTube videos, discover new music.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**That's it! No API keys needed.** ✅

## ✨ Features

- 🎧 Browse 50+ music subreddits
- ▶️ YouTube video playback
- 🔍 Real-time search (⌘K)
- 💬 Reddit comments view
- 🎵 Queue management
- ⌨️ Keyboard shortcuts
- 🌙 Dark theme
- 📱 Mobile responsive
- 🔄 State persistence

## 🎹 Keyboard Shortcuts

- **Space** - Play/Pause
- **→ / ←** - Seek forward/backward 5s
- **Shift + → / ←** - Next/Previous track
- **↑ / ↓** - Volume up/down
- **M** - Mute
- **S** - Shuffle
- **R** - Repeat
- **⌘K** - Search

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **State:** Zustand
- **Data Fetching:** React Query
- **APIs:** Reddit JSON API (public), YouTube IFrame API

## 📦 Build

```bash
npm run build
npm start
```

## 🌐 Deploy

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t reddit-music-player .
docker run -p 3000:3000 reddit-music-player
```

See `PRODUCTION.md` for detailed deployment instructions.

## 📝 Environment Variables

**None required!** App works out-of-the-box.

Optional for production:
```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com  # Recommended for SEO
```

See `.env.example` for all optional variables.

## 🔧 Troubleshooting

### Dev server won't start
```bash
pkill -f "next dev"
rm -rf .next/dev
npm run dev
```

### Clear everything
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📄 License

GPLv3

---

**Modern rebuild of [reddit.musicplayer.io](https://reddit.musicplayer.io)**
# Trigger Vercel rebuild
