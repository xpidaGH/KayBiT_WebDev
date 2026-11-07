export type ThemeId =
  | 'editorial-refined'
  | 'technical-systematic'
  | 'warm-approachable'
  | 'elegant-dark'
  | 'vibrant-palette';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  subtitle: string;
  typographyLabel: string;
  swatches: {
    canvas: string;
    surface: string;
    accent: string;
    text: string;
  };
  previewFontClass: string;
  previewRadiusClass: string;
}

export const THEME_STORAGE_KEY = 'webdev-archetype-theme';

export const THEME_OPTIONS: ThemeDefinition[] = [
  {
    id: 'editorial-refined',
    name: 'Editorial & Refined',
    subtitle: 'Serif fonts, generous whitespace, clean light background',
    typographyLabel: 'Playfair Display + Source Serif 4',
    swatches: {
      canvas: '#faf9f6',
      surface: '#ffffff',
      accent: '#1d4ed8',
      text: '#18181b',
    },
    previewFontClass: 'font-serif',
    previewRadiusClass: 'rounded-md',
  },
  {
    id: 'technical-systematic',
    name: 'Technical & Systematic',
    subtitle: 'Monospace fonts, high-density, visible grid borders',
    typographyLabel: 'JetBrains Mono',
    swatches: {
      canvas: '#f8fafc',
      surface: '#ffffff',
      accent: '#0284c7',
      text: '#0f172a',
    },
    previewFontClass: 'font-mono',
    previewRadiusClass: 'rounded',
  },
  {
    id: 'warm-approachable',
    name: 'Warm & Approachable',
    subtitle: 'Pastel cards, rounded pill buttons, soft corners',
    typographyLabel: 'Plus Jakarta Sans (Pill UI)',
    swatches: {
      canvas: '#fffbf5',
      surface: '#fef3c7',
      accent: '#ea580c',
      text: '#292524',
    },
    previewFontClass: 'font-sans',
    previewRadiusClass: 'rounded-3xl',
  },
  {
    id: 'elegant-dark',
    name: 'Elegant Dark',
    subtitle: 'Sleek dark mode with tailored high-contrast accents',
    typographyLabel: 'Space Grotesk + Plus Jakarta Sans',
    swatches: {
      canvas: '#020617',
      surface: '#0f172a',
      accent: '#6366f1',
      text: '#f8fafc',
    },
    previewFontClass: 'font-sans',
    previewRadiusClass: 'rounded-2xl',
  },
  {
    id: 'vibrant-palette',
    name: 'Vibrant Palette',
    subtitle: 'High-energy, bold color schemes',
    typographyLabel: 'Space Grotesk + Electric Violet',
    swatches: {
      canvas: '#f5f3ff',
      surface: '#ede9fe',
      accent: '#7c3aed',
      text: '#1e1b4b',
    },
    previewFontClass: 'font-sans',
    previewRadiusClass: 'rounded-2xl',
  },
];
