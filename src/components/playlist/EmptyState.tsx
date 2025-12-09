import React from 'react';

export function EmptyState() {
  return (
    <div className="py-20 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-900 flex items-center justify-center">
        <svg 
          className="text-neutral-600 w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-neutral-300 mb-2">
        No tracks to display
      </h3>
      <p className="text-sm text-neutral-500 max-w-sm mx-auto">
        Select subreddits from the sidebar to discover music from Reddit
      </p>
    </div>
  );
}
