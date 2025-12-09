'use client';

import React from 'react';
import SelectedSubreddits from './SelectedSubreddits';
import CategoryList from './CategoryList';
import CustomSubredditInput from './CustomSubredditInput';
import SortOptions from './SortOptions';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-[280px] flex-col border-r border-border bg-neutral-950">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {/* Selected Subreddits */}
        <SelectedSubreddits />

        {/* Browse Categories */}
        <CategoryList />

        {/* Custom Subreddit */}
        <CustomSubredditInput />
      </div>

      {/* Sort Options */}
      <SortOptions />
    </aside>
  );
}
