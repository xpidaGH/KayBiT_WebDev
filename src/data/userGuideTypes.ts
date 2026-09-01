export type LanguageCode =
  | 'en'
  | 'fr'
  | 'de'
  | 'it'
  | 'es'
  | 'pt'
  | 'id'
  | 'sw'
  | 'tr'
  | 'ru'
  | 'zh'
  | 'ja'
  | 'ar'
  | 'ur'
  | 'hi'
  | 'mr'
  | 'bn'
  | 'ta'
  | 'te';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export interface UserGuideContent {
  title: string;
  subtitle: string;
  badge: string;
  tableOfContents: {
    overview: string;
    navigation: string;
    archetypes: string;
    modes: string;
    studentGuide: string;
    faq: string;
  };
  sections: {
    overview: {
      title: string;
      desc: string;
      highlights: string[];
    };
    navigation: {
      title: string;
      desc: string;
      steps: { title: string; detail: string }[];
    };
    archetypes: {
      title: string;
      desc: string;
      websites: { name: string; pattern: string; desc: string }[];
      webapps: { name: string; pattern: string; desc: string }[];
    };
    modes: {
      title: string;
      desc: string;
      items: { name: string; desc: string }[];
    };
    studentGuide: {
      title: string;
      desc: string;
      tips: string[];
    };
    faq: {
      title: string;
      items: { q: string; a: string }[];
    };
  };
}
