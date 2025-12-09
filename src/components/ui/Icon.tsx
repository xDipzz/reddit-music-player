'use client';

import { useEffect, useRef } from 'react';

interface IconProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  strokeWidth?: string | number;
}

export function Icon({ icon, width = '24', height, className = '', strokeWidth }: IconProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (spanRef.current && !initializedRef.current) {
      initializedRef.current = true;
      spanRef.current.setAttribute('data-icon', icon);
      spanRef.current.setAttribute('data-width', String(width));
      if (height) spanRef.current.setAttribute('data-height', String(height));
      if (strokeWidth) spanRef.current.setAttribute('data-stroke-width', String(strokeWidth));
      
      const win = window as Window & { Iconify?: { scan: (el: HTMLElement) => void } };
      if (win.Iconify) {
        win.Iconify.scan(spanRef.current);
      }
    }
  }, [icon, width, height, strokeWidth]);

  useEffect(() => {
    if (spanRef.current && initializedRef.current) {
      spanRef.current.setAttribute('data-icon', icon);
      spanRef.current.setAttribute('data-width', String(width));
      if (height) spanRef.current.setAttribute('data-height', String(height));
      if (strokeWidth) spanRef.current.setAttribute('data-stroke-width', String(strokeWidth));
      
      const win = window as Window & { Iconify?: { scan: (el: HTMLElement) => void } };
      if (win.Iconify) {
        win.Iconify.scan(spanRef.current);
      }
    }
  }, [icon, width, height, strokeWidth]);

  return (
    <span 
      ref={spanRef} 
      className={`iconify ${className}`}
      style={{ width: Number(width), height: Number(height || width), display: 'inline-block' }}
    />
  );
}