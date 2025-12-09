#!/usr/bin/env node

/**
 * Simple SVG-based placeholder images for SEO
 * These can be replaced with actual branded images later
 */

const fs = require('fs');
const path = require('path');

// OG Image (1200x630)
const ogImage = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Top accent bar -->
  <rect width="1200" height="8" fill="#f97316"/>
  
  <!-- Music note icon -->
  <circle cx="600" cy="250" r="35" fill="#f97316"/>
  <rect x="627" y="205" width="12" height="55" fill="#f97316"/>
  <circle cx="639" cy="205" r="18" fill="#f97316"/>
  
  <!-- Title -->
  <text x="600" y="360" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="middle">
    Reddit Music Player
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="420" font-family="Arial, sans-serif" font-size="32" fill="#a0a0a0" text-anchor="middle">
    Stream Music from Reddit · Free · No Ads
  </text>
  
  <!-- Features -->
  <text x="600" y="500" font-family="Arial, sans-serif" font-size="24" fill="#808080" text-anchor="middle">
    Browse Subreddits · YouTube Integration · Queue Management
  </text>
</svg>`;

// Icon 192x192
const icon192 = `<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ea580c;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="192" height="192" fill="url(#iconGrad)" rx="32"/>
  
  <!-- Music note -->
  <circle cx="96" cy="120" r="24" fill="#ffffff"/>
  <rect x="114" y="82" width="10" height="42" fill="#ffffff"/>
  <circle cx="119" cy="78" r="14" fill="#ffffff"/>
</svg>`;

// Icon 512x512
const icon512 = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="iconGrad512" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ea580c;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="512" height="512" fill="url(#iconGrad512)" rx="85"/>
  
  <!-- Music note -->
  <circle cx="256" cy="320" r="64" fill="#ffffff"/>
  <rect x="304" y="220" width="28" height="112" fill="#ffffff"/>
  <circle cx="318" cy="210" r="40" fill="#ffffff"/>
</svg>`;

// Placeholder screenshots
const screenshotMobile = `<svg width="540" height="720" xmlns="http://www.w3.org/2000/svg">
  <rect width="540" height="720" fill="#0a0a0a"/>
  <rect width="540" height="60" fill="#1a1a1a"/>
  <text x="270" y="40" font-family="Arial, sans-serif" font-size="20" fill="#ffffff" text-anchor="middle">
    Reddit Music Player
  </text>
  <text x="270" y="360" font-family="Arial, sans-serif" font-size="24" fill="#808080" text-anchor="middle">
    Mobile Screenshot
  </text>
</svg>`;

const screenshotDesktop = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#0a0a0a"/>
  <rect width="1920" height="80" fill="#1a1a1a"/>
  <text x="960" y="50" font-family="Arial, sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">
    Reddit Music Player
  </text>
  <text x="960" y="540" font-family="Arial, sans-serif" font-size="36" fill="#808080" text-anchor="middle">
    Desktop Screenshot
  </text>
</svg>`;

// Write files
const publicDir = path.join(__dirname, 'public');

fs.writeFileSync(path.join(publicDir, 'og-image.svg'), ogImage);
fs.writeFileSync(path.join(publicDir, 'icon-192.svg'), icon192);
fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), icon512);
fs.writeFileSync(path.join(publicDir, 'screenshot-mobile.svg'), screenshotMobile);
fs.writeFileSync(path.join(publicDir, 'screenshot-desktop.svg'), screenshotDesktop);

// Also create PNG versions with simple colored backgrounds as fallbacks
// Since we can't easily create PNGs without canvas, we'll create simple colored SVGs
// that browsers will render properly

const ogImagePng = ogImage;
const icon192Png = icon192;
const icon512Png = icon512;
const screenshotMobilePng = screenshotMobile;
const screenshotDesktopPng = screenshotDesktop;

fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogImagePng);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192Png);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512Png);
fs.writeFileSync(path.join(publicDir, 'screenshot-mobile.png'), screenshotMobilePng);
fs.writeFileSync(path.join(publicDir, 'screenshot-desktop.png'), screenshotDesktopPng);

console.log('✓ Created og-image.svg and og-image.png');
console.log('✓ Created icon-192.svg and icon-192.png');
console.log('✓ Created icon-512.svg and icon-512.png');
console.log('✓ Created screenshot-mobile.svg and screenshot-mobile.png');
console.log('✓ Created screenshot-desktop.svg and screenshot-desktop.png');
console.log('\nNote: The .png files are actually SVG content.');
console.log('For production, replace with actual PNG images using an image editor or converter.');
