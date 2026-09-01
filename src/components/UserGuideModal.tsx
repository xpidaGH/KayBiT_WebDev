import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Globe,
  BookOpen,
  Search,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Layers,
  Shield,
  Code2,
  Flame,
  HelpCircle,
  Sparkles,
  Printer,
  Compass,
  Laptop
} from 'lucide-react';
import { LanguageCode, LanguageMeta } from '../data/userGuideTypes';
import { LANGUAGES, getGuide } from '../data/userGuideTranslations';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLanguage?: LanguageCode;
}

export function UserGuideModal({ isOpen, onClose, initialLanguage = 'en' }: UserGuideModalProps) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(initialLanguage);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [langFilterQuery, setLangFilterQuery] = useState('');
  const [guideSearchQuery, setGuideSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [copied, setCopied] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync initial language if prop changes
  useEffect(() => {
    if (initialLanguage) {
      setCurrentLang(initialLanguage);
    }
  }, [initialLanguage]);

  // Handle ESC key to close modal or dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (langDropdownOpen) {
          setLangDropdownOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, langDropdownOpen, onClose]);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  const currentLangMeta: LanguageMeta = useMemo(() => {
    return LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  }, [currentLang]);

  const guide = useMemo(() => {
    return getGuide(currentLang);
  }, [currentLang]);

  // Filter languages for dropdown search
  const filteredLanguages = useMemo(() => {
    if (!langFilterQuery.trim()) return LANGUAGES;
    const q = langFilterQuery.toLowerCase();
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [langFilterQuery]);

  const handleCopyGuide = () => {
    const markdownSummary = `# ${guide.title}\n\n${guide.subtitle}\n\n${guide.sections.overview.title}\n${guide.sections.overview.desc}\n\n${guide.sections.archetypes.title}\n\nWebsites:\n${guide.sections.archetypes.websites.map((w) => `- ${w.name} (${w.pattern}): ${w.desc}`).join('\n')}\n\nWeb Apps:\n${guide.sections.archetypes.webapps.map((a) => `- ${a.name} (${a.pattern}): ${a.desc}`).join('\n')}`;
    navigator.clipboard.writeText(markdownSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`guide-sec-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen) return null;

  const isRTL = currentLangMeta.dir === 'rtl';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  {guide.title}
                </h2>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 font-bold">
                  {guide.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{guide.subtitle}</p>
            </div>
          </div>

          {/* Right Action Controls: Language Dropdown, Copy, Print, Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-white shadow-sm transition"
              >
                <span className="text-base">{currentLangMeta.flag}</span>
                <span className="font-medium hidden xs:inline">{currentLangMeta.nativeName}</span>
                <span className="text-[11px] text-slate-400 uppercase font-mono">
                  ({currentLangMeta.code})
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Language Dropdown Menu */}
              {langDropdownOpen && (
                <div
                  className={`absolute top-full mt-2 w-64 max-h-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 flex flex-col custom-scrollbar overflow-y-auto ${
                    isRTL ? 'left-0' : 'right-0'
                  }`}
                  dir="ltr"
                >
                  <div className="p-1 mb-1.5 sticky top-0 bg-slate-900 z-10 border-b border-slate-800">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search 19 languages..."
                        value={langFilterQuery}
                        onChange={(e) => setLangFilterQuery(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    {filteredLanguages.map((lang) => {
                      const isSelected = currentLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setLangDropdownOpen(false);
                            setLangFilterQuery('');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{lang.flag}</span>
                            <div className="flex flex-col">
                              <span>{lang.nativeName}</span>
                              <span
                                className={`text-[10px] ${
                                  isSelected ? 'text-indigo-200' : 'text-slate-500'
                                }`}
                              >
                                {lang.name}
                              </span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyGuide}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
              title="Copy Summary Markdown"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition hidden sm:inline-flex"
              title="Print User Guide"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition"
              title="Close User Guide (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sub-header Navigation Pill Bar */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { id: 'overview', label: guide.tableOfContents.overview, icon: Compass },
              { id: 'navigation', label: guide.tableOfContents.navigation, icon: Laptop },
              { id: 'archetypes', label: guide.tableOfContents.archetypes, icon: Layers },
              { id: 'modes', label: guide.tableOfContents.modes, icon: Code2 },
              { id: 'studentGuide', label: guide.tableOfContents.studentGuide, icon: Flame },
              { id: 'faq', label: guide.tableOfContents.faq, icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-3 py-1 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 text-xs font-semibold ${
                    activeSection === tab.id
                      ? 'bg-indigo-600/90 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500">
            <span>Language:</span>
            <span className="font-mono text-indigo-400 font-semibold">{currentLangMeta.name}</span>
          </div>
        </div>

        {/* Scrollable Guide Content Area */}
        <div
          ref={modalContentRef}
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-12 custom-scrollbar bg-slate-900/50"
        >
          {/* SECTION 1: OVERVIEW */}
          <section id="guide-sec-overview" className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Compass className="w-5 h-5" />
              <h3 className="text-xl font-bold font-display text-white">
                {guide.sections.overview.title}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              {guide.sections.overview.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {guide.sections.overview.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                    0{idx + 1}
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: INTERFACE & NAVIGATION */}
          <section id="guide-sec-navigation" className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400">
              <Laptop className="w-5 h-5" />
              <h3 className="text-xl font-bold font-display text-white">
                {guide.sections.navigation.title}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {guide.sections.navigation.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {guide.sections.navigation.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col gap-2"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                    Step 0{idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-white font-display">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: THE 11 ARCHETYPES CATALOG */}
          <section id="guide-sec-archetypes" className="space-y-6 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400">
              <Layers className="w-5 h-5" />
              <h3 className="text-xl font-bold font-display text-white">
                {guide.sections.archetypes.title}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {guide.sections.archetypes.desc}
            </p>

            {/* Websites (Content Focused) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h4 className="text-sm font-bold text-emerald-400 font-display">
                  Websites (Content & Distribution - 6 Archetypes)
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {guide.sections.archetypes.websites.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/30 transition flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-xs font-bold text-white">{w.name}</h5>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-semibold">
                          {w.pattern}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Web Apps (State & Transaction Focused) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <h4 className="text-sm font-bold text-purple-400 font-display">
                  Web Applications (State & Transactions - 5 Archetypes)
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {guide.sections.archetypes.webapps.map((app, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/30 transition flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-xs font-bold text-white">{app.name}</h5>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-500/30 font-semibold">
                          {app.pattern}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{app.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4: EXPLORATION MODES */}
          <section id="guide-sec-modes" className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400">
              <Code2 className="w-5 h-5" />
              <h3 className="text-xl font-bold font-display text-white">
                {guide.sections.modes.title}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{guide.sections.modes.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {guide.sections.modes.items.map((mode, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-1.5"
                >
                  <h4 className="text-xs font-bold text-indigo-300 font-display flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    {mode.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{mode.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: STUDENT LEARNING PATHWAY */}
          <section id="guide-sec-studentGuide" className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400">
              <Flame className="w-5 h-5" />
              <h3 className="text-xl font-bold font-display text-white">
                {guide.sections.studentGuide.title}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {guide.sections.studentGuide.desc}
            </p>

            <div className="space-y-2.5 pt-2">
              {guide.sections.studentGuide.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 text-xs flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: FAQ */}
          <section id="guide-sec-faq" className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-xl font-bold font-display text-white">
                {guide.sections.faq.title}
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {guide.sections.faq.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5"
                >
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="text-indigo-400 font-mono">Q:</span>
                    {item.q}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-5">
                    <span className="text-emerald-400 font-mono font-bold">A: </span>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Note */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-500">
            Web Development Archetypes & Teaching Laboratory • MIT Educational License • 19
            Languages Supported
          </div>
        </div>
      </div>
    </div>
  );
}
