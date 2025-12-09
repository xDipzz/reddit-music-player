import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

/**
 * Main Area Component
 * Contains Sidebar and Content in a flex layout
 * Matches HTML design: flex with sidebar and scrollable content
 */
export default function MainArea() {
  return (
    <div className="flex flex-1 overflow-hidden relative">
      <Sidebar />
      <Content />
    </div>
  );
}
