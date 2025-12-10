"use client";

import { useEffect, useRef } from "react";
import { Music, Hash, Play } from "lucide-react";
import { useSearchStore, highlightMatch } from "@/stores/search-store";
import { usePlayerController } from "@/hooks/usePlayerController";
import { useSubredditStore, usePlaylistStore } from "@/stores";
import type { Song } from "@/types";

interface SearchResultsProps {
  onClose: () => void;
}

export default function SearchResults({ onClose }: SearchResultsProps) {
  const { results, selectedIndex, query } = useSearchStore();
  const { playSong } = usePlayerController();
  const { addSubreddit } = useSubredditStore();
  const { queue } = usePlaylistStore();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      selectedElement?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-2xl shadow-black/50 overflow-hidden z-50">
        <div className="p-8 text-center">
          <div className="text-neutral-500 text-sm">
            {query.length < 2
              ? "Type at least 2 characters to search"
              : "No results found"}
          </div>
          {query.length >= 2 && (
            <div className="text-neutral-600 text-xs mt-2">
              Try searching for song titles, artists, or subreddits
            </div>
          )}
        </div>
      </div>
    );
  }

  // Group results by type
  const songResults = results.filter((r) => r.type === "song");
  const subredditResults = results.filter((r) => r.type === "subreddit");

  const handleSongClick = (song: Song) => {
    // Find the song's index in the current queue
    const songIndex = queue.findIndex((s) => s.id === song.id);
    
    if (songIndex !== -1) {
      playSong(song, songIndex);
      onClose();
    } else {
      console.error("Song not found in queue");
    }
  };

  const handleSubredditClick = (subreddit: string) => {
    addSubreddit(subreddit);
    onClose();
  };

  return (
    <div
      ref={resultsRef}
      className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-2xl shadow-black/50 overflow-hidden max-h-96 overflow-y-auto z-50"
    >
      {/* Songs Section */}
      {songResults.length > 0 && (
        <div className="border-b border-white/5">
          <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wider bg-neutral-900/50">
            Songs ({songResults.length})
          </div>
          {songResults.map((result) => {
            const song = result.item as Song;
            const globalIndex = results.indexOf(result);
            const isSelected = globalIndex === selectedIndex;

            return (
              <button
                key={`song-${song.id}`}
                data-index={globalIndex}
                onClick={() => handleSongClick(song)}
                className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-white/5 transition-colors text-left group ${
                  isSelected ? "bg-white/10" : ""
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center ${
                    isSelected
                      ? "bg-white text-black"
                      : "bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700"
                  }`}
                >
                  {isSelected ? (
                    <Play size={14} fill="currentColor" />
                  ) : (
                    <Music size={14} />
                  )}
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm text-white truncate font-medium"
                    dangerouslySetInnerHTML={{
                      __html: result.matchedFields.includes("title")
                        ? highlightMatch(song.title, query)
                        : song.title,
                    }}
                  />
                  <div className="text-xs text-neutral-500 truncate">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: result.matchedFields.includes("author")
                          ? highlightMatch(song.author, query)
                          : song.author,
                      }}
                    />{" "}
                    •{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: result.matchedFields.includes("subreddit")
                          ? highlightMatch(`r/${song.subreddit}`, query)
                          : `r/${song.subreddit}`,
                      }}
                    />
                  </div>
                </div>

                {/* Score Badge */}
                <div className="text-xs text-neutral-500 flex-shrink-0">
                  {song.score > 1000
                    ? `${(song.score / 1000).toFixed(1)}k`
                    : song.score}{" "}
                  ↑
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Subreddits Section */}
      {subredditResults.length > 0 && (
        <div>
          <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wider bg-neutral-900/50">
            Subreddits ({subredditResults.length})
          </div>
          {subredditResults.map((result) => {
            const subreddit = result.item as string;
            const globalIndex = results.indexOf(result);
            const isSelected = globalIndex === selectedIndex;

            return (
              <button
                key={`subreddit-${subreddit}`}
                data-index={globalIndex}
                onClick={() => handleSubredditClick(subreddit)}
                className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-white/5 transition-colors text-left group ${
                  isSelected ? "bg-white/10" : ""
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center ${
                    isSelected
                      ? "bg-white text-black"
                      : "bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700"
                  }`}
                >
                  <Hash size={14} />
                </div>

                {/* Subreddit Name */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm text-white truncate font-medium"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(`r/${subreddit}`, query),
                    }}
                  />
                  <div className="text-xs text-neutral-500">
                    Browse this subreddit
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Footer Hint */}
      <div className="px-3 py-2 text-xs text-neutral-600 bg-neutral-900/30 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-white/10 rounded text-[10px]">
              ↑↓
            </kbd>{" "}
            Navigate
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-white/10 rounded text-[10px]">
              ↵
            </kbd>{" "}
            Select
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-white/10 rounded text-[10px]">
              Esc
            </kbd>{" "}
            Close
          </span>
        </div>
      </div>
    </div>
  );
}