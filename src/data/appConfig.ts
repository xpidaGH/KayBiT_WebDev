import React from 'react';

/**
 * Storage keys used across the application
 */
export const STORAGE_KEYS = {
  THEME: 'webdev-archetype-theme',
  FAVORITES: 'webdev-archetype-favorites',
} as const;

/**
 * Keyboard shortcut definition
 */
export interface KeyboardShortcut {
  keyCombo: string[];
  label: string;
  description: string;
  category: 'Navigation' | 'Actions' | 'View Modes' | 'System';
}

/**
 * Global Keyboard Shortcuts catalog for the application
 */
export const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  {
    keyCombo: ['Ctrl', 'K'],
    label: 'Quick Jump',
    description: 'Instantly search for and switch between any of the 11 archetype templates',
    category: 'Navigation',
  },
  {
    keyCombo: ['Ctrl', 'S'],
    label: 'Save to Favorites',
    description: 'Toggle bookmark status for the currently active archetype template',
    category: 'Actions',
  },
  {
    keyCombo: ['Ctrl', 'E'],
    label: 'Export Project',
    description: 'Open project export modal to download complete runnable ZIP bundle with setup.sh',
    category: 'Actions',
  },
  {
    keyCombo: ['Ctrl', 'B'],
    label: 'Open in StackBlitz',
    description: 'Launch live web-based IDE in a new tab with WebContainer dev server',
    category: 'Actions',
  },
  {
    keyCombo: ['Ctrl', 'T'],
    label: 'Theme Settings',
    description: 'Open theme customization modal to pick from 5 distinct design systems',
    category: 'System',
  },
  {
    keyCombo: ['?'],
    label: 'Keyboard Shortcuts',
    description: 'Open this keyboard shortcuts quick reference cheatsheet',
    category: 'System',
  },
  {
    keyCombo: ['1'],
    label: 'Interactive Preview',
    description: 'Switch to live interactive preview and viewport canvas',
    category: 'View Modes',
  },
  {
    keyCombo: ['2'],
    label: 'Architecture & Stack',
    description: 'Inspect layered architecture, state synchronization, and engineering challenges',
    category: 'View Modes',
  },
  {
    keyCombo: ['3'],
    label: 'Security & Threats',
    description: 'View defense-in-depth mitigations for archetype vulnerabilities',
    category: 'View Modes',
  },
  {
    keyCombo: ['4'],
    label: 'Student Challenges',
    description: 'View progressive exercises from Warmup to Capstone',
    category: 'View Modes',
  },
  {
    keyCombo: ['5'],
    label: 'Source Scaffold',
    description: 'Inspect and copy clean TypeScript and React production blueprint',
    category: 'View Modes',
  },
  {
    keyCombo: ['6'],
    label: 'Compare Archetypes',
    description: 'Open side-by-side architecture, tech stack, and complexity comparison',
    category: 'View Modes',
  },
  {
    keyCombo: ['Esc'],
    label: 'Close Overlays',
    description: 'Dismiss any active modal, command palette, or overlay drawer',
    category: 'System',
  },
];

/**
 * Hardcoded SVGs and brand assets configuration
 */
export const BRAND_ASSETS = {
  KBT_FALLBACK_SVG: {
    viewBox: '0 0 24 24',
    path: 'M12 6v12M8 9l4-3 4 3M7 14l5 3 5-3M5 7l3 4-3 4M19 7l-3 4 3 4',
  },
  VARIANTS: {
    desktop: {
      src: '/src/assets/images/kbt_desktop_app_icon_1793936112866.jpg',
      alt: 'KBT Desktop Application Icon',
      sizeClass: 'w-7 h-7 p-0.5',
      label: 'Desktop Title Bar (28×28)',
    },
    mobile: {
      src: '/src/assets/images/kbt_mobile_brand_logo_1793936113232.jpg',
      alt: 'KBT Mobile App Bar Logo',
      sizeClass: 'w-8 h-8 p-0.5',
      label: 'Mobile App Bar (32×32)',
    },
    web: {
      src: '/src/assets/images/kbt_web_header_logo_1793936113592.jpg',
      alt: 'KBT Web Header Brand Logo',
      sizeClass: 'w-10 h-10 p-1',
      label: 'Web Header Bar (40×40)',
    },
  },
} as const;

/**
 * Device viewport specifications
 */
export const DEVICE_PRESETS = [
  { id: 'desktop', label: 'Desktop', title: 'Desktop View (Fluid 100%)' },
  { id: 'tablet', label: 'Tablet', title: 'Tablet View (768px)' },
  { id: 'mobile', label: 'Mobile', title: 'Mobile View (375px)' },
] as const;

/**
 * Comparison Preset Pairs
 */
export const COMPARISON_PRESETS = [
  { label: 'Blog (SSG) vs SaaS (CSR)', left: 'blog-content', right: 'saas' },
  { label: 'E-Commerce vs Client Portal', left: 'ecommerce', right: 'portal' },
  { label: 'Landing Page vs Project Mgmt', left: 'landing-page', right: 'project-management' },
  { label: 'Wiki vs E-Learning', left: 'educational-wiki', right: 'elearning' },
] as const;
