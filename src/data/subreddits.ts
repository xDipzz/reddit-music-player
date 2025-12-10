// Comprehensive subreddit library matching original site functionality
// Organized by category for easy browsing

export interface SubredditCategory {
  name: string;
  icon: string;
  color: string;
  subreddits: string[];
  description?: string;
}

export const SUBREDDIT_DATABASE: Record<string, SubredditCategory> = {
  // ==================== MUSIC GENRES ====================
  
  Alternative: {
    name: 'Alternative',
    icon: 'lucide:guitar',
    color: '#f97316',
    subreddits: [
      'alternative', '90spunk', 'emomusic', 'screamo', 'garagepunk',
      'punkskahardcore', 'ska', 'crustpunk', 'grunge', 'poppunkers',
      'postpunk', 'punk', 'indie'
    ],
  },

  Electronic: {
    name: 'Electronic',
    icon: 'lucide:zap',
    color: '#8b5cf6',
    subreddits: [
      'electronicmusic', 'house', 'techno', 'trance', 'edm', 'deephouse',
      '80selectro', 'atmosphericdnb', 'brostep', 'chipbreak', 'complextro',
      'disco', 'dnb', 'ebm', 'electronicjazz', 'electropop', 'frenchhouse',
      'glitchhop', 'glitchop', 'industrialtechno', 'minimaltech',
      'realproghouse', 'skweee', 'vaporwave', 'afrobeat', 'ambient',
      'astateoftrance', 'bassheavy', 'breakbeat', 'breakcore', 'chillstep',
      'chiptunes', 'classic_beats', 'danceparty', 'darkstep', 'downtempo',
      'dreampop', 'drumstep', 'dubstep', 'electro', 'electrohouse',
      'electronica', 'electronicmagic', 'electroswing', 'fidget', 'footwork',
      'funkhouse', 'futurebeats', 'futurefunkairlines', 'futuregarage',
      'futurepopmusic', 'futuresynth', 'gabber', 'glitch', 'grime',
      'hardtek', 'idm', 'juke', 'jumpup', 'moombahton', 'progressivetrance',
      'progtrance', 'psytrance', 'purplemusic', 'raggajungle', 'realdubstep',
      'swinghouse', 'synthpop', 'synthwave', 'techstep', 'tranceandbass',
      'trap', 'triphop'
    ],
  },

  'Hip Hop': {
    name: 'Hip Hop / Rap',
    icon: 'lucide:mic',
    color: '#f59e0b',
    subreddits: [
      'hiphopheads', 'hiphop', 'hiphop101', 'rap', 'trapmuzik',
      'makinghiphop', 'rapbattles', '90shiphop', 'germanrap',
      'hiphopinstrumentals', 'dystopianhiphop', 'jazzyhiphop'
    ],
  },

  Rock: {
    name: 'Rock',
    icon: 'lucide:guitar',
    color: '#ef4444',
    subreddits: [
      'rock', 'alternativerock', 'classicrock', 'hardrock', 'krautrock',
      'punk_rock', 'bluesrock', 'mathrock', 'noiserock', 'psychedelicrock',
      'stonerrock', 'indieheads', 'metal', 'metalcore', 'powermetal',
      'trueblackmetal', 'epicmetal', 'folkmetal', 'melodicdeathmetal',
      'melodicmetal', 'postmetal', 'progmetal', 'headbangtothis'
    ],
  },

  Metal: {
    name: 'Metal / Core',
    icon: 'lucide:flame',
    color: '#dc2626',
    subreddits: [
      'metal', 'metalcore', 'deathcore', 'hardcore', 'posthardcore',
      'allcore', 'christcore', 'grindcore', 'melodichardcore',
      'powermetal', 'trueblackmetal', 'epicmetal', 'folkmetal',
      'melodicdeathmetal', 'melodicmetal', 'postmetal', 'progmetal'
    ],
  },

  'Blues / Jazz / Soul': {
    name: 'Blues / Jazz / Soul',
    icon: 'lucide:music',
    color: '#0ea5e9',
    subreddits: [
      'blues', 'jazz', 'deepfunk', 'funksoumusic', 'soulies',
      'darkjazz', 'jazznoir', 'electronicjazz'
    ],
  },

  'Folk / Country': {
    name: 'Folk / Country',
    icon: 'lucide:guitar',
    color: '#84cc16',
    subreddits: [
      'country', 'countrymusic', 'folkpunk', 'indiefolk',
      'outlawcountry'
    ],
  },

  Asian: {
    name: 'Asian Music',
    icon: 'lucide:globe',
    color: '#ec4899',
    subreddits: [
      'kpop', 'jpop', 'cpop', 'japanesemusic', 'asiancpop'
    ],
  },

  Chill: {
    name: 'Chill / Ambient',
    icon: 'lucide:cloud',
    color: '#06b6d4',
    subreddits: [
      'chillmusic', 'chillwave', 'lofi', 'ambient', 'downtempo',
      'psybient', 'ambientmusic', 'chillstep', 'dreampop'
    ],
  },

  General: {
    name: 'General Music',
    icon: 'lucide:music',
    color: '#10b981',
    subreddits: [
      'listentothis', 'music', 'newmusic', 'letstalkmusic',
      'musicvideos', 'republicofmusic', 'listentoconcerts',
      'listentomusic', 'listentous', 'redditmusicclub',
      'under10k', 'obscuremusic', 'tunejerk'
    ],
  },

  Decades: {
    name: 'By Decade',
    icon: 'lucide:clock',
    color: '#a855f7',
    subreddits: [
      '1960s', '80smusic', '90smusic', '90salternative',
      'vintageobscura', 'oldiemusic', 'soundsvintage'
    ],
  },

  World: {
    name: 'World Music',
    icon: 'lucide:globe',
    color: '#14b8a6',
    subreddits: [
      'worldmusic', 'brazilianmusic', 'calireggae', 'reggae',
      'rootsreggae', 'reggaeton', 'rocksteady', 'dub',
      'afrobeat', 'nolamusic'
    ],
  },

  'Classical / Opera': {
    name: 'Classical / Opera',
    color: '#7c3aed',
    icon: 'lucide:music',
    subreddits: [
      'classicalmusic', 'opera', 'choralmusic', 'orchestra'
    ],
  },

  Indie: {
    name: 'Indie',
    icon: 'lucide:star',
    color: '#f472b6',
    subreddits: [
      'indieheads', 'indiefolk', 'indiewok', 'indie'
    ],
  },

  Experimental: {
    name: 'Experimental',
    icon: 'lucide:sparkles',
    color: '#fbbf24',
    subreddits: [
      'avantgardemusic', 'experimental', 'obscuremusic',
      'illbient', 'noise', 'industrialmusic'
    ],
  },

  // ==================== VIDEO SUBREDDITS ====================
  
  Video: {
    name: 'Video',
    icon: 'lucide:video',
    color: '#f43f5e',
    subreddits: [
      'artisanvideos', 'contagiouslaughter', 'deepintoyoutube',
      'documentaries', 'fastworkers', 'foodvideos', 'kidsafevideos',
      'nottimanderic', 'obscuremedia', 'themakingof', 'themakingofgames',
      'thewaywewereonvideo', 'animation', 'barbervideos', 'bestofworldstar',
      'cringe', 'fullmoviesonyoutube', 'happycrowds', 'mealtimevideos',
      'montageparodies', 'redditpicks', 'sciencevideos', 'shoptours',
      'theocho', 'trailers', 'video', 'videos', 'youtubehaiku'
    ],
  },

  // ==================== OTHER / MISC ====================
  
  Other: {
    name: 'Other / Misc',
    icon: 'lucide:more-horizontal',
    color: '#64748b',
    subreddits: [
      'motivatedmusic', 'gamemusic', 'soundtracks', 'coversongs',
      'acousticoriginals', 'thisIsourmusic', 'partymusic',
      'partymusicstation', 'djmixes', 'mixes', 'cratedigging',
      'musicforprogramming', 'spacemusic', 'cyberpunk_music',
      'touhoumusic', 'mlptunes', 'christianmusic'
    ],
  },
};

// Quick access to all subreddits
export const ALL_SUBREDDITS = Object.values(SUBREDDIT_DATABASE)
  .flatMap(category => category.subreddits)
  .sort();

// Total count: 200+ subreddits
export const TOTAL_SUBREDDITS = ALL_SUBREDDITS.length;
