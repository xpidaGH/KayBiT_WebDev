import React, { useState, useMemo } from 'react';
import {
  Layers,
  Code2,
  Shield,
  Layout,
  Smartphone,
  Tablet,
  Monitor,
  Search,
  BookOpen,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Cpu,
  FileCode,
  Flame,
  CheckCircle2,
  HelpCircle,
  Download,
  Zap,
  Palette,
  ArrowLeftRight,
  Heart,
  WifiOff,
  RefreshCw,
  Share2
} from 'lucide-react';
import { TEMPLATES_DATA } from './data/templateData';
import { TemplateId, TemplateCategory, TeachingMetadata } from './types/templates';
import { ThemeId, THEME_STORAGE_KEY } from './types/themes';
import { STORAGE_KEYS } from './data/appConfig';
import { UserGuideModal } from './components/UserGuideModal';
import { ExportModal } from './components/ExportModal';
import { ThemeSettingsModal } from './components/ThemeSettingsModal';
import { QuickJumpModal } from './components/QuickJumpModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { ArchetypeComparison } from './components/ArchetypeComparison';
import { KbtBrandLogo } from './components/KbtBrandLogo';
import { openInStackBlitz } from './utils/exportProject';

// Website Templates
import { BlogContentTemplate } from './templates/websites/BlogContentTemplate';
import { EcommerceTemplate } from './templates/websites/EcommerceTemplate';
import { PortfolioTemplate } from './templates/websites/PortfolioTemplate';
import { CorporateBusinessTemplate } from './templates/websites/CorporateBusinessTemplate';
import { LandingPageTemplate } from './templates/websites/LandingPageTemplate';
import { EducationalWikiTemplate } from './templates/websites/EducationalWikiTemplate';

// Web App Templates
import { SaasDashboardTemplate } from './templates/webapps/SaasDashboardTemplate';
import { SocialMediaTemplate } from './templates/webapps/SocialMediaTemplate';
import { PortalTemplate } from './templates/webapps/PortalTemplate';
import { ProjectManagementTemplate } from './templates/webapps/ProjectManagementTemplate';
import { ElearningPlatformTemplate } from './templates/webapps/ElearningPlatformTemplate';

type ViewMode = 'interactive' | 'architecture' | 'security' | 'exercises' | 'code' | 'compare';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';
type CategoryFilter = TemplateCategory | 'all' | 'favorites';

export default function App() {
  const [activeTemplateId, setActiveTemplateId] = useState<TemplateId>(() => {
    try {
      const param = new URLSearchParams(window.location.search).get('template') as TemplateId | null;
      if (param && TEMPLATES_DATA.some((t) => t.id === param)) {
        return param;
      }
    } catch {
      // Ignore URL parsing errors
    }
    return 'blog-content';
  });
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('interactive');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [copiedCode, setCopiedCode] = useState(false);
  const [sharedLinkCopied, setSharedLinkCopied] = useState(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [favorites, setFavorites] = useState<TemplateId[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? (JSON.parse(saved) as TemplateId[]) : [];
    } catch {
      return [];
    }
  });
  const [activeTheme, setActiveTheme] = useState<ThemeId>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEYS.THEME) as ThemeId) || 'elegant-dark';
    } catch {
      return 'elegant-dark';
    }
  });
  const [networkStatus, setNetworkStatus] = useState<'online' | 'syncing' | 'offline'>(() =>
    typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : 'online'
  );

  // Monitor browser navigator.onLine connectivity for offline warning & syncing indicator
  React.useEffect(() => {
    let syncTimer: ReturnType<typeof setTimeout> | undefined;

    const handleOffline = () => {
      if (syncTimer) clearTimeout(syncTimer);
      setNetworkStatus('offline');
    };

    const handleOnline = () => {
      setNetworkStatus('syncing');
      syncTimer = setTimeout(() => {
        setNetworkStatus('online');
      }, 2200);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      if (syncTimer) clearTimeout(syncTimer);
    };
  }, []);

  const toggleFavorite = (id: TemplateId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next));
      } catch {
        // Ignore storage errors in restricted environments
      }
      return next;
    });
  };

  // Active Template Data
  const currentTemplate: TeachingMetadata = useMemo(() => {
    return TEMPLATES_DATA.find((t) => t.id === activeTemplateId) || TEMPLATES_DATA[0];
  }, [activeTemplateId]);

  // Global Keyboard Shortcuts (Ctrl+K, Ctrl+S, Ctrl+E, Ctrl+B, Ctrl+T, ?, 1-6)
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable;

      const isModifier = e.ctrlKey || e.metaKey;

      if (isModifier && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsQuickJumpOpen((prev) => !prev);
        return;
      }

      if (isModifier && e.key.toLowerCase() === 's') {
        e.preventDefault();
        toggleFavorite(activeTemplateId);
        return;
      }

      if (isModifier && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsExportOpen(true);
        return;
      }

      if (isModifier && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        openInStackBlitz(currentTemplate);
        return;
      }

      if (isModifier && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsThemeModalOpen(true);
        return;
      }

      // Do not intercept single keystrokes when typing inside inputs
      if (isInput) return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      if (e.key === '1') {
        setViewMode('interactive');
      } else if (e.key === '2') {
        setViewMode('architecture');
      } else if (e.key === '3') {
        setViewMode('security');
      } else if (e.key === '4') {
        setViewMode('exercises');
      } else if (e.key === '5') {
        setViewMode('code');
      } else if (e.key === '6') {
        setViewMode('compare');
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeTemplateId, currentTemplate]);

  const handleSelectTheme = (themeId: ThemeId) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, themeId);
    } catch {
      // Ignore storage errors in restricted environments
    }
  };

  // Filtered Templates for Sidebar (includes title, tagline, summary, concepts, and tags)
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((t) => {
      const matchesCategory =
        activeCategory === 'favorites'
          ? favorites.includes(t.id)
          : activeCategory === 'all' || t.category === activeCategory;
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, favorites]);

  const copyBlueprint = () => {
    navigator.clipboard.writeText(currentTemplate.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareTemplate = async () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('template', currentTemplate.id);
    const urlString = shareUrl.toString();

    const shareData = {
      title: `${currentTemplate.title} — WebDev Archetype Lab`,
      text: `${currentTemplate.tagline} (${currentTemplate.renderPattern} · ${currentTemplate.difficulty})`,
      url: urlString,
    };

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(urlString);
      setSharedLinkCopied(true);
      setTimeout(() => setSharedLinkCopied(false), 2000);
    } catch {
      // Ignore clipboard errors in restricted contexts
    }
  };

  // Render Component Mapping
  const renderTemplateComponent = () => {
    switch (activeTemplateId) {
      case 'blog-content':
        return <BlogContentTemplate />;
      case 'ecommerce':
        return <EcommerceTemplate />;
      case 'portfolio':
        return <PortfolioTemplate />;
      case 'corporate-business':
        return <CorporateBusinessTemplate />;
      case 'landing-page':
        return <LandingPageTemplate />;
      case 'educational-wiki':
        return <EducationalWikiTemplate />;
      case 'saas':
        return <SaasDashboardTemplate />;
      case 'social-media':
        return <SocialMediaTemplate />;
      case 'portal':
        return <PortalTemplate />;
      case 'project-management':
        return <ProjectManagementTemplate />;
      case 'elearning':
        return <ElearningPlatformTemplate />;
      default:
        return <BlogContentTemplate />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-hidden transition-colors">
      {/* LEFT NAVIGATION / CURRICULUM SIDEBAR */}
      <aside className="w-80 border-r border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col shrink-0">
        {/* Web Header Brand Lockup */}
        <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <KbtBrandLogo variant="web" />
            <div className="min-w-0">
              <h1 className="font-bold text-sm text-[var(--text-primary)] font-display leading-tight truncate">
                WebDev Archetype Lab
              </h1>
              <p className="text-[11px] text-[var(--text-muted)] truncate">
                Teaching Reference Curriculum
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsUserGuideOpen(true)}
            className="p-2 border border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition shrink-0"
            style={{ borderRadius: 'var(--radius-button)' }}
            title="Open Multilingual User Guide (19 Languages)"
            aria-label="Open Multilingual User Guide"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 border-b border-[var(--border-color)] space-y-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search templates & concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-canvas)] border border-[var(--border-color)] pl-8 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
              style={{ borderRadius: 'var(--radius-input)' }}
            />
          </div>

          <div
            className="grid grid-cols-4 p-1 bg-[var(--bg-canvas)] border border-[var(--border-color)] text-[11px] font-semibold gap-0.5"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            {(['all', 'website', 'webapp', 'favorites'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="py-1 px-1 transition truncate"
                style={{
                  borderRadius: 'var(--radius-button)',
                  backgroundColor:
                    activeCategory === cat ? 'var(--accent-primary)' : 'transparent',
                  color:
                    activeCategory === cat
                      ? 'var(--accent-on-primary)'
                      : 'var(--text-muted)',
                }}
              >
                {cat === 'all'
                  ? 'All (11)'
                  : cat === 'website'
                  ? 'Websites'
                  : cat === 'webapp'
                  ? 'Apps'
                  : `Saved (${favorites.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Templates List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 custom-scrollbar">
          {filteredTemplates.length === 0 ? (
            <div className="p-6 text-center space-y-2">
              <Heart className="w-6 h-6 mx-auto text-[var(--text-muted)] opacity-60" />
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                {activeCategory === 'favorites'
                  ? 'No saved favorites yet'
                  : 'No matching archetypes'}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                {activeCategory === 'favorites'
                  ? 'Click the heart icon on any archetype card to bookmark it here for quick study.'
                  : 'Try clearing your search query or switching categories.'}
              </p>
            </div>
          ) : (
            filteredTemplates.map((template) => {
              const isActive = activeTemplateId === template.id;
              const isFavorited = favorites.includes(template.id);
              return (
                <div
                  key={template.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setActiveTemplateId(template.id);
                    if (viewMode === 'compare') setViewMode('interactive');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveTemplateId(template.id);
                      if (viewMode === 'compare') setViewMode('interactive');
                    }
                  }}
                  className="w-full text-left p-3 border transition flex flex-col gap-1 cursor-pointer"
                  style={{
                    borderRadius: 'var(--radius-card)',
                    backgroundColor: isActive ? 'var(--accent-soft)' : 'var(--bg-canvas)',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs font-display text-[var(--text-primary)] truncate">
                      {template.title}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className="text-[10px] font-mono font-semibold"
                        style={{
                          color: isActive ? 'var(--accent-text)' : 'var(--text-muted)',
                        }}
                      >
                        {template.category === 'website' ? 'Website' : 'Web App'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(template.id, e)}
                        className={`p-1 rounded-md transition ${
                          isFavorited
                            ? 'text-rose-500 hover:text-rose-400'
                            : 'text-[var(--text-muted)] hover:text-rose-400'
                        }`}
                        title={
                          isFavorited
                            ? `Remove ${template.title} from Favorites`
                            : `Save ${template.title} to Favorites`
                        }
                        aria-label={
                          isFavorited
                            ? `Remove ${template.title} from Favorites`
                            : `Save ${template.title} to Favorites`
                        }
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {template.tagline}
                  </p>
                  {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1 pt-1 border-t border-[var(--border-color)]/60">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pedagogical Footer Info */}
        <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-subtle)] space-y-2">
          <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>Curriculum Scaffold</span>
            <span
              className="font-mono font-semibold tabular-nums"
              style={{ color: 'var(--accent-text)' }}
            >
              11 Full Archetypes
            </span>
          </div>
          <button
            onClick={() => setIsExportOpen(true)}
            className="w-full py-2 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-on-primary)',
              borderRadius: 'var(--radius-button)',
            }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Active Template (.zip)</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP CONTROL BAR */}
        <header className="h-16 border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-6 flex items-center justify-between gap-4 shrink-0">
          {/* Active Archetype Title */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[var(--text-primary)] font-display truncate">
                {viewMode === 'compare' ? 'Archetype Comparison' : currentTemplate.title}
              </h2>
              {viewMode !== 'compare' && (
                <span className="hidden lg:inline text-xs text-[var(--text-muted)] whitespace-nowrap shrink-0">
                  · {currentTemplate.renderPattern} · {currentTemplate.difficulty}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
              {viewMode === 'compare'
                ? 'Side-by-side architecture, tech stack, and complexity analysis'
                : currentTemplate.tagline}
            </p>
          </div>

          {/* Mode Switchers & Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* View Mode Tabs */}
            <div
              className="flex bg-[var(--bg-canvas)] border border-[var(--border-color)] p-1 text-xs font-semibold"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              {[
                { id: 'interactive', label: 'Preview', icon: Layout },
                { id: 'architecture', label: 'Architecture', icon: Layers },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'exercises', label: 'Challenges', icon: Flame },
                { id: 'code', label: 'Code', icon: Code2 },
                { id: 'compare', label: 'Compare', icon: ArrowLeftRight },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = viewMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setViewMode(tab.id as ViewMode)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 transition whitespace-nowrap shrink-0"
                    style={{
                      borderRadius: 'var(--radius-button)',
                      backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                      color: isActive ? 'var(--accent-on-primary)' : 'var(--text-muted)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Viewport Width Controls (Only active in Interactive mode) */}
            {viewMode === 'interactive' && (
              <div
                className="hidden xl:flex bg-[var(--bg-canvas)] border border-[var(--border-color)] p-1 text-[var(--text-muted)]"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-1.5 transition ${
                    deviceMode === 'desktop'
                      ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]'
                      : 'hover:text-[var(--text-primary)]'
                  }`}
                  style={{ borderRadius: 'var(--radius-button)' }}
                  title="Desktop View (Fluid 100%)"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('tablet')}
                  className={`p-1.5 transition ${
                    deviceMode === 'tablet'
                      ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]'
                      : 'hover:text-[var(--text-primary)]'
                  }`}
                  style={{ borderRadius: 'var(--radius-button)' }}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-1.5 transition ${
                    deviceMode === 'mobile'
                      ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]'
                      : 'hover:text-[var(--text-primary)]'
                  }`}
                  style={{ borderRadius: 'var(--radius-button)' }}
                  title="Mobile View (375px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* QUICK JUMP (CTRL+K) BUTTON */}
            <button
              onClick={() => setIsQuickJumpOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-subtle)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-color)] transition whitespace-nowrap shrink-0"
              style={{ borderRadius: 'var(--radius-button)' }}
              title="Quick Jump to any archetype (Ctrl+K / Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" style={{ color: 'var(--accent-text)' }} />
              <span className="hidden lg:inline">Quick Jump</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.2 bg-[var(--bg-canvas)] border border-[var(--border-color)] rounded text-[var(--text-muted)]">
                Ctrl+K
              </kbd>
            </button>

            {/* THEME SETTINGS BUTTON */}
            <button
              onClick={() => setIsThemeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-subtle)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-color)] transition whitespace-nowrap shrink-0"
              style={{ borderRadius: 'var(--radius-button)' }}
              title="Customize UI Theme (5 Visual Systems)"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: 'var(--accent-text)' }} />
              <span className="hidden sm:inline">Theme Settings</span>
            </button>

            {/* OPEN IN STACKBLITZ WEB IDE BUTTON */}
            <button
              onClick={() => openInStackBlitz(currentTemplate)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-subtle)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-color)] transition whitespace-nowrap shrink-0"
              style={{ borderRadius: 'var(--radius-button)' }}
              title="Open current template scaffold in StackBlitz WebContainer IDE"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden md:inline">StackBlitz</span>
            </button>

            {/* EXPORT PROJECT ZIP BUTTON */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold shadow-sm transition whitespace-nowrap shrink-0"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--accent-on-primary)',
                borderRadius: 'var(--radius-button)',
              }}
              title="Export Full Project Bundle with source code & setup.sh as ZIP"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* SHARE TEMPLATE BUTTON (WEB SHARE API) */}
            <button
              onClick={handleShareTemplate}
              className="flex items-center gap-1.5 p-2 bg-[var(--bg-subtle)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-color)] transition whitespace-nowrap shrink-0"
              style={{ borderRadius: 'var(--radius-button)' }}
              title={
                sharedLinkCopied
                  ? 'Deep link copied to clipboard!'
                  : `Share ${currentTemplate.title} via OS Share Dialog`
              }
              aria-label={`Share ${currentTemplate.title}`}
            >
              {sharedLinkCopied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Share2 className="w-3.5 h-3.5" style={{ color: 'var(--accent-text)' }} />
              )}
            </button>

            {/* KEYBOARD SHORTCUTS HELP BUTTON (?) */}
            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="flex items-center gap-1.5 p-2 bg-[var(--bg-subtle)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-color)] transition whitespace-nowrap shrink-0"
              style={{ borderRadius: 'var(--radius-button)' }}
              title="Keyboard Shortcuts (?)"
              aria-label="Open Keyboard Shortcuts Help"
            >
              <HelpCircle className="w-3.5 h-3.5" style={{ color: 'var(--accent-text)' }} />
            </button>

            {/* OFFLINE / SYNCING CONNECTIVITY BANNER */}
            {networkStatus !== 'online' && (
              <div
                role="status"
                aria-live="polite"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border whitespace-nowrap shrink-0 ${
                  networkStatus === 'offline'
                    ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                    : 'bg-sky-500/15 text-sky-400 border-sky-500/40'
                }`}
                style={{ borderRadius: 'var(--radius-button)' }}
                title={
                  networkStatus === 'offline'
                    ? 'You are offline. Templates run from local cache; cloud IDE features require internet.'
                    : 'Connection restored. Syncing workspace state...'
                }
              >
                {networkStatus === 'offline' ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 shrink-0" />
                    <span>Offline Mode</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
                    <span>Syncing...</span>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        {/* BREADCRUMB NAVIGATION TRAIL */}
        <nav
          aria-label="Breadcrumb"
          className="px-6 py-2 border-b border-[var(--border-color)] bg-[var(--bg-subtle)] flex items-center justify-between gap-4 text-xs shrink-0"
        >
          <ol className="flex items-center gap-1.5 min-w-0 overflow-x-auto whitespace-nowrap">
            <li>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setViewMode('interactive');
                }}
                className="text-[var(--text-muted)] hover:text-[var(--accent-text)] font-medium transition"
              >
                Home
              </button>
            </li>

            <li aria-hidden="true" className="text-[var(--text-muted)]">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>

            {viewMode === 'compare' ? (
              <li className="font-semibold text-[var(--text-primary)]">
                Side-by-Side Comparison
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory(currentTemplate.category);
                      setViewMode('interactive');
                    }}
                    className="text-[var(--text-muted)] hover:text-[var(--accent-text)] font-medium transition"
                  >
                    {currentTemplate.category === 'website' ? 'Websites' : 'Web Apps'}
                  </button>
                </li>

                <li aria-hidden="true" className="text-[var(--text-muted)]">
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>

                <li>
                  <button
                    onClick={() => setViewMode('interactive')}
                    className={`transition truncate ${
                      viewMode === 'interactive'
                        ? 'font-semibold text-[var(--text-primary)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--accent-text)] font-medium'
                    }`}
                  >
                    {currentTemplate.title}
                  </button>
                </li>

                {viewMode !== 'interactive' && (
                  <>
                    <li aria-hidden="true" className="text-[var(--text-muted)]">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </li>
                    <li className="font-semibold text-[var(--text-primary)] capitalize">
                      {viewMode === 'architecture'
                        ? 'Architecture & Stack'
                        : viewMode === 'security'
                        ? 'Security & Threats'
                        : viewMode === 'exercises'
                        ? 'Student Challenges'
                        : 'Source Scaffold'}
                    </li>
                  </>
                )}
              </>
            )}
          </ol>

          <span className="hidden sm:inline text-[11px] font-mono text-[var(--text-muted)] shrink-0">
            {currentTemplate.renderPattern} · {currentTemplate.difficulty}
          </span>
        </nav>

        {/* WORKSPACE CONTENT STAGE */}
        <div className="flex-1 overflow-y-auto bg-[var(--bg-canvas)] p-6 custom-scrollbar">
          {/* 1. INTERACTIVE PREVIEW MODE */}
          {viewMode === 'interactive' && (
            <div className="h-full flex flex-col">
              <div
                className={`mx-auto w-full transition-all duration-300 ${
                  deviceMode === 'desktop'
                    ? 'max-w-none h-full flex flex-col'
                    : deviceMode === 'tablet'
                    ? 'max-w-3xl border-4 border-[var(--border-strong)] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 my-4'
                    : 'max-w-sm border-4 border-[var(--border-strong)] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 my-4'
                }`}
              >
                {/* Desktop Window Title Bar (Windows/macOS) with KBT App Icon */}
                {deviceMode === 'desktop' && (
                  <div className="px-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-color)] border-b-0 rounded-t-xl flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2.5">
                      <KbtBrandLogo variant="desktop" />
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        {currentTemplate.title} — Desktop Window
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-500/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-500/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-500/40" />
                    </div>
                  </div>
                )}

                {/* Mobile App Bar (iOS/Android) with KBT Mobile Brand Logo */}
                {deviceMode === 'mobile' && (
                  <div className="px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-2.5">
                      <KbtBrandLogo variant="mobile" />
                      <span className="text-xs font-bold tracking-tight">
                        {currentTemplate.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">iOS / Android</span>
                  </div>
                )}

                <div className="flex-1 min-h-0">{renderTemplateComponent()}</div>
              </div>
            </div>
          )}

          {/* 2. ARCHITECTURE & DATA FLOW MODE */}
          {viewMode === 'architecture' && (
            <div className="max-w-5xl mx-auto space-y-8 pb-12">
              <div
                className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 sm:p-8 space-y-6"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div>
                  <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-1">
                    System Architecture &amp; Engineering Layers
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">{currentTemplate.summary}</p>
                </div>

                {/* State Architecture Banner */}
                <div
                  className="p-4 bg-[var(--accent-soft)] border border-[var(--accent-primary)]/30 space-y-1"
                  style={{ borderRadius: 'var(--radius-card)' }}
                >
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: 'var(--accent-text)' }}
                  >
                    State &amp; Data Synchronization Pattern
                  </span>
                  <p className="text-xs text-[var(--text-primary)]">
                    {currentTemplate.stateArchitecture}
                  </p>
                </div>

                {/* Architecture Layers Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                    <Layers className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
                    <span>Layered Architecture &amp; Responsibilities</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {currentTemplate.architectureLayers.map((layer, idx) => (
                      <div
                        key={idx}
                        className="bg-[var(--bg-canvas)] p-5 border border-[var(--border-color)] space-y-2"
                        style={{ borderRadius: 'var(--radius-card)' }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm text-[var(--text-primary)]">
                            {layer.layer}
                          </span>
                          <span
                            className="text-xs font-mono px-2 py-0.5 border border-[var(--border-color)] bg-[var(--bg-surface)]"
                            style={{
                              color: 'var(--accent-text)',
                              borderRadius: 'var(--radius-button)',
                            }}
                          >
                            {layer.technology}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          {layer.responsibility}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Engineering Challenges */}
                <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                  <h4 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                    <Cpu className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
                    <span>Non-Trivial Engineering Challenges</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {currentTemplate.coreEngineeringChallenges.map((challenge, idx) => (
                      <div
                        key={idx}
                        className="bg-[var(--bg-canvas)] p-3.5 border border-[var(--border-color)] flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
                        style={{ borderRadius: 'var(--radius-card)' }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: 'var(--accent-text)' }}
                        />
                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Concepts & Tech Stack */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-color)]">
                  <div>
                    <h4 className="font-bold text-xs text-[var(--text-secondary)] mb-3">
                      Core Pedagogical Concepts
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {currentTemplate.keyConcepts.map((concept) => (
                        <span
                          key={concept}
                          className="bg-[var(--accent-soft)] border border-[var(--accent-primary)]/30 text-xs px-2.5 py-1 font-medium"
                          style={{
                            color: 'var(--accent-text)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[var(--text-secondary)] mb-3">
                      Production Tech Stack Recommendations
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {currentTemplate.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-[var(--bg-canvas)] text-[var(--text-secondary)] border border-[var(--border-color)] text-xs px-2.5 py-1 font-mono"
                          style={{ borderRadius: 'var(--radius-button)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. SECURITY & THREATS MODE */}
          {viewMode === 'security' && (
            <div className="max-w-5xl mx-auto space-y-8 pb-12">
              <div
                className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 sm:p-8 space-y-6"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div>
                  <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-1">
                    Security Vulnerabilities &amp; Hardening Guidelines
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Defensive engineering patterns required for production {currentTemplate.title} deployments.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {currentTemplate.securityConsiderations.map((sec, idx) => (
                    <div
                      key={idx}
                      className="bg-[var(--bg-canvas)] p-5 border border-[var(--border-color)] space-y-2"
                      style={{ borderRadius: 'var(--radius-card)' }}
                    >
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-rose-500 shrink-0" />
                        <h4 className="font-bold text-sm text-[var(--text-primary)]">
                          {sec.threat}
                        </h4>
                      </div>
                      <div
                        className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-mono leading-relaxed"
                        style={{ borderRadius: 'var(--radius-button)' }}
                      >
                        <strong>Mitigation:</strong> {sec.mitigation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. STUDENT EXERCISES & CHALLENGES MODE */}
          {viewMode === 'exercises' && (
            <div className="max-w-5xl mx-auto space-y-8 pb-12">
              <div
                className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 sm:p-8 space-y-6"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div>
                  <h3 className="text-xl font-bold font-display text-[var(--text-primary)] mb-1">
                    Curriculum Practice &amp; Capstone Exercises
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Progressive programming assignments for intermediate and advanced students.
                  </p>
                </div>

                <div className="space-y-4">
                  {currentTemplate.studentExercises.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-[var(--bg-canvas)] p-6 border border-[var(--border-color)] space-y-3"
                      style={{ borderRadius: 'var(--radius-card)' }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-[var(--text-primary)]">
                          {ex.title}
                        </h4>
                        <span
                          className="text-xs font-mono font-semibold px-2.5 py-0.5 border border-[var(--border-color)] bg-[var(--accent-soft)]"
                          style={{
                            color: 'var(--accent-text)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          {ex.level}
                        </span>
                      </div>
                      <p
                        className="text-xs text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface)] p-4 border border-[var(--border-color)]"
                        style={{ borderRadius: 'var(--radius-button)' }}
                      >
                        {ex.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. CODE BLUEPRINT MODE */}
          {viewMode === 'code' && (
            <div className="max-w-5xl mx-auto space-y-4 pb-12">
              <div
                className="flex flex-wrap justify-between items-center bg-[var(--bg-surface)] border border-[var(--border-color)] p-4 gap-4"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">
                    Production TypeScript &amp; React Blueprint
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Clean starter scaffold and core state machine for students
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => openInStackBlitz(currentTemplate)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-blue-500/25 active:scale-95 border border-blue-400/30"
                    title="Launch instant live web-based IDE in StackBlitz with full Node.js & Vite runtime"
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span>Open in StackBlitz</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
                  </button>

                  <button
                    onClick={() => setIsExportOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30 active:scale-95"
                    title="Export complete runnable project as ZIP archive"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Project (.zip)</span>
                  </button>

                  <button
                    onClick={copyBlueprint}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30 active:scale-95"
                  >
                    {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Web IDE Callout Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/20 flex items-start justify-between gap-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-white flex items-center gap-2">
                      <span>Interactive Web-Based IDE Integration</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30">
                        StackBlitz SDK
                      </span>
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      Click <strong className="text-blue-300">Open in StackBlitz</strong> to spin up a full in-browser WebContainer dev server with hot module reload, complete project structure, package scripts, and exercises ready for live experimentation without installing local tools.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openInStackBlitz(currentTemplate)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-500 text-white text-xs font-semibold shrink-0 transition flex items-center gap-1 shadow-sm"
                >
                  <span>Launch IDE</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="px-5 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span>src/templates/{currentTemplate.id}.tsx</span>
                </div>
                <pre className="p-6 overflow-x-auto text-xs text-indigo-200 font-mono leading-relaxed">
                  <code>{currentTemplate.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
          {/* 6. SIDE-BY-SIDE ARCHETYPE COMPARISON MODE */}
          {viewMode === 'compare' && (
            <ArchetypeComparison
              initialLeftId={activeTemplateId}
              onSelectArchetypeInStudio={(id) => {
                setActiveTemplateId(id);
                setViewMode('interactive');
              }}
            />
          )}
        </div>
      </div>

      {/* Multilingual User Guide Modal */}
      <UserGuideModal
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
      />

      {/* Export Project ZIP Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        template={currentTemplate}
      />

      {/* Theme Settings Modal */}
      <ThemeSettingsModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        activeTheme={activeTheme}
        onSelectTheme={handleSelectTheme}
      />

      {/* Quick Jump Command Palette (Ctrl+K) */}
      <QuickJumpModal
        isOpen={isQuickJumpOpen}
        onClose={() => setIsQuickJumpOpen(false)}
        activeTemplateId={activeTemplateId}
        onSelectTemplate={(id) => {
          setActiveTemplateId(id);
          if (viewMode === 'compare') setViewMode('interactive');
        }}
      />

      {/* Keyboard Shortcuts Help Modal (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
