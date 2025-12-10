import { useCallback, useEffect } from 'react';
import { useYouTube } from '@/components/providers/YouTubeProvider';
import { usePlayerStore, usePlaylistStore } from '@/stores';
import type { Song } from '@/types';

export interface PlayerController {
  playSong: (song: Song, index: number) => void;
  playSongAtIndex: (index: number) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
}

export function usePlayerController(): PlayerController {
  const { player } = useYouTube();
  
  const {
    currentSong,
    isPlaying,
    currentTime,
    repeatMode,
    isShuffled,
    setCurrentSong,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume: setStoreVolume,
    toggleShuffle: toggleShuffleStore,
  } = usePlayerStore();

  const {
    queue,
    songs,
    currentIndex,
    setCurrentIndex,
    shuffleQueue,
    unshuffleQueue,
  } = usePlaylistStore();

  /**
   * Play a specific song
   * Matches HTML playSong() function (lines 679-696)
   */
  const playSong = useCallback(
    (song: Song, index: number) => {
      if (!song || !song.youtubeId) {
        console.error('Invalid song or no YouTube ID');
        return;
      }

      // Validate YouTube ID format (should be 11 characters)
      if (song.youtubeId.length !== 11) {
        console.error('Invalid YouTube ID format:', song.youtubeId);
        return;
      }

      console.log('playSong called:', { 
        song: song.title, 
        youtubeId: song.youtubeId, 
        playerReady: player.isReady 
      });

      setCurrentSong(song);
      setCurrentIndex(index);
      setCurrentTime(0);
      setDuration(0);

      if (player.isReady) {
        console.log('Loading video:', song.youtubeId);
        player.loadVideo(song.youtubeId);
      } else {
        console.warn('Player not ready, cannot load video');
      }
    },
    [player, setCurrentSong, setCurrentIndex, setCurrentTime, setDuration]
  );

  /**
   * Play a song at a specific queue index
   */
  const playSongAtIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= queue.length) {
        console.error('Invalid queue index');
        return;
      }
      playSong(queue[index], index);
    },
    [queue, playSong]
  );

  /**
   * Toggle play/pause
   * Matches HTML togglePlayPause() function (lines 698-710)
   */
  const togglePlayPause = useCallback(() => {
    if (!player.isReady) return;

    if (isPlaying) {
      player.pause();
    } else {
      if (currentSong) {
        player.play();
      } else if (queue.length > 0) {
        // Start playing first song in queue
        playSong(queue[0], 0);
      }
    }
  }, [player, isPlaying, currentSong, queue, playSong]);

  /**
   * Play next track with repeat/shuffle logic
   * Matches HTML playNext() function (lines 712-732)
   */
  const playNext = useCallback(() => {
    if (queue.length === 0) return;

    let nextIndex: number;

    if (repeatMode === 'one') {
      // Repeat current track
      nextIndex = currentIndex;
    } else if (currentIndex >= queue.length - 1) {
      // At end of queue
      if (repeatMode === 'all') {
        // Loop back to start
        nextIndex = 0;
      } else {
        // Stop playing
        setIsPlaying(false);
        return;
      }
    } else {
      // Play next track
      nextIndex = currentIndex + 1;
    }

    playSong(queue[nextIndex], nextIndex);
  }, [queue, currentIndex, repeatMode, playSong, setIsPlaying]);

  /**
   * Seek to a specific time
   * Matches HTML seekTo() function (lines 751-757)
   */
  const seekTo = useCallback(
    (seconds: number) => {
      if (player.isReady) {
        player.seekTo(seconds);
        setCurrentTime(seconds);
      }
    },
    [player, setCurrentTime]
  );

  /**
   * Play previous track or restart current
   * Matches HTML playPrevious() function (lines 734-749)
   */
  const playPrevious = useCallback(() => {
    if (queue.length === 0) return;

    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      seekTo(0);
      return;
    }

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = repeatMode === 'all' ? queue.length - 1 : 0;
    }

    playSong(queue[prevIndex], prevIndex);
  }, [queue, currentIndex, currentTime, repeatMode, playSong, seekTo]);

  /**
   * Set volume (0-1)
   */
  const setVolume = useCallback(
    (volume: number) => {
      setStoreVolume(volume);
      if (player.isReady) {
        player.setVolume(volume);
      }
    },
    [player, setStoreVolume]
  );

  /**
   * Toggle shuffle mode
   */
  const toggleShuffle = useCallback(() => {
    const newShuffleState = !isShuffled;
    toggleShuffleStore();

    if (newShuffleState) {
      // Shuffle the queue
      shuffleQueue(currentIndex);
    } else {
      // Unshuffle - restore original order
      const currentSongId = currentSong?.id || null;
      unshuffleQueue(songs, currentSongId);
    }
  }, [
    isShuffled,
    currentIndex,
    currentSong,
    songs,
    toggleShuffleStore,
    shuffleQueue,
    unshuffleQueue,
  ]);

  /**
   * Handle track end
   * Automatically play next track or stop based on repeat mode
   */
  useEffect(() => {
    if (!isPlaying && currentSong && currentTime > 0) {
      const duration = player.getDuration();
      // Check if we've reached the end (within 1 second tolerance)
      if (duration > 0 && Math.abs(currentTime - duration) < 1) {
        // Track ended, play next
        playNext();
      }
    }
  }, [isPlaying, currentSong, currentTime, player, playNext]);

  return {
    playSong,
    playSongAtIndex,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleShuffle,
  };
}