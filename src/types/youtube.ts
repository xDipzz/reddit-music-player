// ─────────────────────────────────────────────────────────────────
// YOUTUBE IFRAME API TYPES
// ─────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    YT: {
      Player: YTPlayerConstructor;
      PlayerState: typeof YTPlayerState;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export enum YTPlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

export interface YTPlayerVars {
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

export interface YTPlayerOptions {
  height?: string | number;
  width?: string | number;
  videoId?: string;
  playerVars?: YTPlayerVars;
  events?: YTPlayerEvents;
}

export interface YTPlayerEvents {
  onReady?: (event: YTPlayerEvent) => void;
  onStateChange?: (event: YTOnStateChangeEvent) => void;
  onError?: (event: YTOnErrorEvent) => void;
  onPlaybackQualityChange?: (event: YTPlayerEvent) => void;
  onPlaybackRateChange?: (event: YTPlayerEvent) => void;
  onApiChange?: (event: YTPlayerEvent) => void;
}

export interface YTPlayerEvent {
  target: YTPlayer;
}

export interface YTOnStateChangeEvent extends YTPlayerEvent {
  data: YTPlayerState;
}

export interface YTOnErrorEvent extends YTPlayerEvent {
  data: YTErrorCode;
}

export enum YTErrorCode {
  InvalidParam = 2,
  Html5Error = 5,
  VideoNotFound = 100,
  NotAllowed = 101,
  NotAllowedDisguise = 150,
}

export interface YTPlayer {
  loadVideoById(videoId: string, startSeconds?: number): void;
  cueVideoById(videoId: string, startSeconds?: number): void;
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  getVolume(): number;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getPlayerState(): YTPlayerState;
  getCurrentTime(): number;
  getDuration(): number;
  getVideoUrl(): string;
  getVideoEmbedCode(): string;
  getPlaybackRate(): number;
  setPlaybackRate(suggestedRate: number): void;
  getAvailablePlaybackRates(): number[];
  nextVideo(): void;
  previousVideo(): void;
  getPlaylistIndex(): number;
  getVideoData(): {
    video_id: string;
    title: string;
    author: string;
  };
  destroy(): void;
}

export interface YTPlayerConstructor {
  new (elementId: string | HTMLElement, options: YTPlayerOptions): YTPlayer;
}

export interface YouTubePlayerControls {
  loadVideo: (videoId: string) => void;
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => YTPlayerState | null;
  isReady: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace YT {
  export type PlayerState = YTPlayerState;
  export const PlayerState = YTPlayerState;
  export type ErrorCode = YTErrorCode;
  export const ErrorCode = YTErrorCode;
  export type Player = YTPlayer;
  export type PlayerEvent = YTPlayerEvent;
  export type OnStateChangeEvent = YTOnStateChangeEvent;
  export type OnErrorEvent = YTOnErrorEvent;
  export type PlayerConstructor = YTPlayerConstructor;
  export type PlayerVars = YTPlayerVars;
  export type PlayerOptions = YTPlayerOptions;
  export type PlayerEvents = YTPlayerEvents;
}