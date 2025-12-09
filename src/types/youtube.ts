// ─────────────────────────────────────────────────────────────────
// YOUTUBE IFRAME API TYPES
// ─────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    YT: {
      Player: YT.PlayerConstructor;
      PlayerState: typeof YT.PlayerState;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export namespace YT {
  export enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }

  export interface PlayerVars {
    autoplay?: 0 | 1;
    cc_load_policy?: 0 | 1;
    color?: 'red' | 'white';
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    enablejsapi?: 0 | 1;
    end?: number;
    fs?: 0 | 1;
    hl?: string;
    iv_load_policy?: 1 | 3;
    list?: string;
    listType?: 'playlist' | 'search' | 'user_uploads';
    loop?: 0 | 1;
    modestbranding?: 0 | 1;
    origin?: string;
    playlist?: string;
    playsinline?: 0 | 1;
    rel?: 0 | 1;
    start?: number;
    widget_referrer?: string;
  }

  export interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    playerVars?: PlayerVars;
    events?: PlayerEvents;
  }

  export interface PlayerEvents {
    onReady?: (event: PlayerEvent) => void;
    onStateChange?: (event: OnStateChangeEvent) => void;
    onError?: (event: OnErrorEvent) => void;
    onPlaybackQualityChange?: (event: PlayerEvent) => void;
    onPlaybackRateChange?: (event: PlayerEvent) => void;
    onApiChange?: (event: PlayerEvent) => void;
  }

  export interface PlayerEvent {
    target: Player;
  }

  export interface OnStateChangeEvent extends PlayerEvent {
    data: PlayerState;
  }

  export interface OnErrorEvent extends PlayerEvent {
    data: ErrorCode;
  }

  export enum ErrorCode {
    InvalidParam = 2,
    Html5Error = 5,
    VideoNotFound = 100,
    NotAllowed = 101,
    NotAllowedDisguise = 150,
  }

  export interface Player {
    // Playback controls
    loadVideoById(videoId: string, startSeconds?: number): void;
    cueVideoById(videoId: string, startSeconds?: number): void;
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;

    // Volume controls
    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;

    // Playback status
    getPlayerState(): PlayerState;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;

    // Playback rate
    getPlaybackRate(): number;
    setPlaybackRate(suggestedRate: number): void;
    getAvailablePlaybackRates(): number[];

    // Playlist controls
    nextVideo(): void;
    previousVideo(): void;
    getPlaylistIndex(): number;

    // Video information
    getVideoData(): {
      video_id: string;
      title: string;
      author: string;
    };

    // Player management
    destroy(): void;
  }

  export interface PlayerConstructor {
    new (elementId: string | HTMLElement, options: PlayerOptions): Player;
  }
}

export interface YouTubePlayerControls {
  loadVideo: (videoId: string) => void;
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => YT.PlayerState | null;
  isReady: boolean;
}
