// ─────────────────────────────────────────────────────────────────
// FORMAT UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────

/**
 * Formats a number to a human-readable string (e.g., 1.2M, 1.2k)
 * @param num - The number to format
 * @returns Formatted string representation
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

/**
 * Formats seconds into a time string (e.g., "3:45")
 * @param seconds - Time in seconds
 * @returns Formatted time string "m:ss"
 */
export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats a UTC timestamp to a relative time string (e.g., "2h ago", "3d ago")
 * @param utcTimestamp - UTC timestamp in seconds
 * @returns Formatted relative time string
 */
export function formatTimeAgo(utcTimestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - utcTimestamp;

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`;
  return `${Math.floor(diff / 2592000)}mo ago`;
}
