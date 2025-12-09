'use client';

import { useMemo, useState } from 'react';
import { ArrowUp, MessageSquare, ChevronDown, ChevronRight } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils/format';
import type { RedditComment } from '@/types';
import { cn } from '@/lib/utils';

interface CommentItemProps {
  comment: RedditComment;
  level?: number;
}

const MAX_DEPTH = 2;

export function CommentItem({ comment, level = 0 }: CommentItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const showReplies = level < MAX_DEPTH && hasReplies;

  // Parse HTML body to plain text for display
  const bodyText = useMemo(() => {
    if (!comment.body_html) return comment.body;
    
    try {
      // Decode HTML entities and strip tags for simple display
      const decoded = comment.body_html
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/<[^>]*>/g, '') // Strip HTML tags
        .trim();
      
      return decoded || comment.body;
    } catch {
      return comment.body;
    }
  }, [comment.body, comment.body_html]);

  // Check if comment is deleted/removed
  const isDeleted = comment.author === '[deleted]' || comment.body === '[deleted]' || comment.body === '[removed]';

  // Format score with color
  const scoreColor = comment.score > 0 ? 'text-orange-400' : comment.score < 0 ? 'text-blue-400' : 'text-neutral-400';

  return (
    <div className={cn('comment-item', level > 0 && 'ml-4 border-l border-white/10 pl-3')}>
      <div className="py-2">
        {/* Comment Header */}
        <div className="flex items-center gap-2 text-xs mb-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label={isCollapsed ? 'Expand comment' : 'Collapse comment'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
          
          <span className="text-neutral-300 font-medium">
            u/{comment.author}
          </span>
          
          <span className={cn('flex items-center gap-1', scoreColor)}>
            <ArrowUp className="w-3 h-3" />
            {comment.score}
          </span>
          
          <span className="text-neutral-500">
            {formatTimeAgo(comment.created_utc)}
          </span>

          {hasReplies && (
            <span className="text-neutral-500 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {comment.replies!.length}
            </span>
          )}
        </div>

        {/* Comment Body */}
        {!isCollapsed && (
          <>
            <div className={cn(
              'text-sm text-neutral-200 whitespace-pre-wrap break-words',
              isDeleted && 'italic text-neutral-500'
            )}>
              {bodyText}
            </div>

            {/* Nested Replies */}
            {showReplies && !isCollapsed && (
              <div className="mt-2">
                {comment.replies!.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    level={level + 1}
                  />
                ))}
              </div>
            )}

            {/* Show reply count if max depth reached */}
            {hasReplies && level >= MAX_DEPTH && (
              <div className="mt-2 text-xs text-neutral-500">
                {comment.replies!.length} more {comment.replies!.length === 1 ? 'reply' : 'replies'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
