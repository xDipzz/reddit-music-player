'use client';

import { icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface IconProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  strokeWidth?: string | number;
}

// Map of common icon names to Lucide icon names
const iconMap: Record<string, string> = {
  'lucide:music': 'Music',
  'lucide:play': 'Play',
  'lucide:pause': 'Pause',
  'lucide:skip-back': 'SkipBack',
  'lucide:skip-forward': 'SkipForward',
  'lucide:shuffle': 'Shuffle',
  'lucide:repeat': 'Repeat',
  'lucide:repeat-1': 'Repeat1',
  'lucide:volume': 'Volume2',
  'lucide:volume-2': 'Volume2',
  'lucide:volume-x': 'VolumeX',
  'lucide:volume-1': 'Volume1',
  'lucide:list': 'List',
  'lucide:list-music': 'ListMusic',
  'lucide:message-square': 'MessageSquare',
  'lucide:x': 'X',
  'lucide:chevron-right': 'ChevronRight',
  'lucide:chevron-down': 'ChevronDown',
  'lucide:chevron-up': 'ChevronUp',
  'lucide:zap': 'Zap',
  'lucide:mic-vocal': 'Mic',
  'lucide:guitar': 'Guitar',
  'lucide:flame': 'Flame',
  'lucide:clock': 'Clock',
  'lucide:trending-up': 'TrendingUp',
  'lucide:cloud': 'Cloud',
  'lucide:plus': 'Plus',
  'lucide:check': 'Check',
  'lucide:house': 'House',
  'lucide:search': 'Search',
  'lucide:library': 'Library',
  'lucide:refresh-cw': 'RefreshCw',
  'lucide:bell': 'Bell',
};

export function Icon({ icon, width = '24', height, className = '', strokeWidth }: IconProps) {
  // Get the icon name from the map
  const iconName = iconMap[icon] || icon.replace('lucide:', '');
  
  // Get the icon component from lucide-react
  const LucideIcon = icons[iconName as keyof typeof icons];

  // If icon not found, return a placeholder
  if (!LucideIcon) {
    console.warn(`Icon "${icon}" not found in lucide-react`);
    return (
      <span
        className={className}
        style={{
          width: Number(width),
          height: Number(height || width),
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  const iconProps: LucideProps = {
    size: Number(width),
    strokeWidth: strokeWidth ? Number(strokeWidth) : undefined,
    className,
  };

  if (height) {
    iconProps.style = { height: Number(height) };
  }

  return <LucideIcon {...iconProps} />;
}