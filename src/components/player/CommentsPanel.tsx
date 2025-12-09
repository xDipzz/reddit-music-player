'use client';

import { useEffect } from 'react';
import { X, MessageSquare, Loader2 } from 'lucide-react';
import { useCommentsStore, usePlayerStore } from '@/stores';
import { CommentItem } from './CommentItem';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CommentsPanel() {
  const { isOpen, comments, isLoading, error, closePanel, fetchComments } =
    useCommentsStore();
  const { currentSong } = usePlayerStore();

  // Fetch comments when panel opens or song changes
  useEffect(() => {
    if (isOpen && currentSong?.permalink) {
      fetchComments(currentSong.permalink);
    }
  }, [isOpen, currentSong?.permalink, fetchComments]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop (mobile only) */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={closePanel}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 md:top-16 bottom-[120px] md:bottom-[90px] z-50',
          'w-full md:w-[400px] bg-neutral-900/98 backdrop-blur-xl',
          'border-l border-white/10',
          'flex flex-col',
          'transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Comments</h2>
          </div>
          <button
            onClick={closePanel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close comments"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Current Song Info */}
        {currentSong && (
          <div className="p-4 border-b border-white/10 shrink-0 bg-white/5">
            <div className="text-sm font-medium text-white truncate">
              {currentSong.title}
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              r/{currentSong.subreddit} • {currentSong.numComments} comments
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                <p className="text-sm text-neutral-400">Loading comments...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full px-4">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <p className="text-sm text-neutral-400">{error}</p>
              </div>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex items-center justify-center h-full px-4">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <p className="text-sm text-neutral-400">No comments yet</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Be the first to comment on Reddit
                </p>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="p-4 space-y-1">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Footer - View on Reddit Link */}
        {currentSong && !isLoading && (
          <div className="p-4 border-t border-white/10 shrink-0">
            <a
              href={`https://www.reddit.com${currentSong.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
            >
              View on Reddit
            </a>
          </div>
        )}
      </div>
    </>
  );
}
