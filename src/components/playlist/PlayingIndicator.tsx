import React from 'react';

export function PlayingIndicator() {
  return (
    <div className="playing-indicator flex items-end gap-0.5 h-4">
      <span className="w-1 bg-accent-500 rounded-full" style={{ height: '60%' }}></span>
      <span className="w-1 bg-accent-500 rounded-full" style={{ height: '100%' }}></span>
      <span className="w-1 bg-accent-500 rounded-full" style={{ height: '40%' }}></span>
    </div>
  );
}
