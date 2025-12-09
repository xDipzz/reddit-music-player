import React from 'react';

export function LoadingState() {
  return (
    <div className="space-y-2">
      {/* Skeleton Row 1 */}
      <div className="grid grid-cols-[40px_1fr_200px_120px_60px] gap-4 px-4 py-3">
        <div className="skeleton h-4 w-4 rounded"></div>
        <div className="flex items-center gap-3">
          <div className="skeleton w-10 h-10 rounded"></div>
          <div className="space-y-2 flex-1">
            <div className="skeleton h-4 w-3/4 rounded"></div>
            <div className="skeleton h-3 w-1/2 rounded"></div>
          </div>
        </div>
        <div className="skeleton h-4 w-24 rounded"></div>
        <div className="skeleton h-4 w-16 rounded"></div>
        <div className="skeleton h-4 w-10 rounded"></div>
      </div>

      {/* Skeleton Row 2 */}
      <div className="grid grid-cols-[40px_1fr_200px_120px_60px] gap-4 px-4 py-3">
        <div className="skeleton h-4 w-4 rounded"></div>
        <div className="flex items-center gap-3">
          <div className="skeleton w-10 h-10 rounded"></div>
          <div className="space-y-2 flex-1">
            <div className="skeleton h-4 w-2/3 rounded"></div>
            <div className="skeleton h-3 w-1/3 rounded"></div>
          </div>
        </div>
        <div className="skeleton h-4 w-20 rounded"></div>
        <div className="skeleton h-4 w-14 rounded"></div>
        <div className="skeleton h-4 w-10 rounded"></div>
      </div>

      {/* Skeleton Row 3 */}
      <div className="grid grid-cols-[40px_1fr_200px_120px_60px] gap-4 px-4 py-3">
        <div className="skeleton h-4 w-4 rounded"></div>
        <div className="flex items-center gap-3">
          <div className="skeleton w-10 h-10 rounded"></div>
          <div className="space-y-2 flex-1">
            <div className="skeleton h-4 w-4/5 rounded"></div>
            <div className="skeleton h-3 w-2/5 rounded"></div>
          </div>
        </div>
        <div className="skeleton h-4 w-28 rounded"></div>
        <div className="skeleton h-4 w-12 rounded"></div>
        <div className="skeleton h-4 w-10 rounded"></div>
      </div>
    </div>
  );
}
