import { LanguageCode, LanguageMeta, UserGuideContent } from '../userGuideTypes';
import { enGuide } from './en';
import { frGuide, deGuide, esGuide, itGuide, ptGuide, ruGuide } from './european';
import { zhGuide, jaGuide, idGuide, trGuide, swGuide } from './asian';
import { hiGuide, mrGuide, bnGuide, taGuide, teGuide, arGuide, urGuide } from './southAsian';

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'bn', name: 'Bangla', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', dir: 'ltr' },
];

export const USER_GUIDES: Record<LanguageCode, UserGuideContent> = {
  en: enGuide,
  fr: frGuide,
  de: deGuide,
  it: itGuide,
  es: esGuide,
  pt: ptGuide,
  id: idGuide,
  sw: swGuide,
  tr: trGuide,
  ru: ruGuide,
  zh: zhGuide,
  ja: jaGuide,
  ar: arGuide,
  ur: urGuide,
  hi: hiGuide,
  mr: mrGuide,
  bn: bnGuide,
  ta: taGuide,
  te: teGuide,
};

export const getGuide = (lang: LanguageCode): UserGuideContent => {
  return USER_GUIDES[lang] || USER_GUIDES.en;
};
