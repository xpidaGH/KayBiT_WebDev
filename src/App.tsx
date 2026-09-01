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
  Sparkles,
  Database,
  ExternalLink,
  Cpu,
  Lock,
  Globe,
  Terminal,
  FileCode,
  GraduationCap,
  Flame,
  CheckCircle2,
  HelpCircle,
  Download,
  FolderArchive,
  Zap
} from 'lucide-react';
import { TEMPLATES_DATA } from './data/templateData';
import { TemplateId, TemplateCategory, TeachingMetadata } from './types/templates';
import { UserGuideModal } from './components/UserGuideModal';
import { ExportModal } from './components/ExportModal';
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

type ViewMode = 'interactive' | 'architecture' | 'security' | 'code' | 'exercises';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export default function App() {
  const [activeTemplateId, setActiveTemplateId] = useState<TemplateId>('blog-content');
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('interactive');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Active Template Data
  const currentTemplate: TeachingMetadata = useMemo(() => {
    return TEMPLATES_DATA.find((t) => t.id === activeTemplateId) || TEMPLATES_DATA[0];
  }, [activeTemplateId]);

  // Filtered Templates for Sidebar
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((t) => {
      const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const copyBlueprint = () => {
    navigator.clipboard.writeText(currentTemplate.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* LEFT NAVIGATION / CURRICULUM SIDEBAR */}
      <aside className="w-80 border-r border-slate-800 bg-slate-900/90 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white font-display leading-tight">
                WebDev Archetype Lab
              </h1>
              <p className="text-[11px] text-slate-400">Teaching Reference Curriculum</p>
            </div>
          </div>

          <button
            onClick={() => setIsUserGuideOpen(true)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/80 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white transition"
            title="Open Multilingual User Guide (19 Languages)"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 border-b border-slate-800 space-y-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search templates & concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-semibold">
            {(['all', 'website', 'webapp'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 py-1 rounded-lg capitalize transition ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All (11)' : cat === 'website' ? 'Websites' : 'Web Apps'}
              </button>
            ))}
          </div>
        </div>

        {/* Templates List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1 custom-scrollbar">
          {filteredTemplates.map((template) => {
            const isActive = activeTemplateId === template.id;
            return (
              <button
                key={template.id}
                onClick={() => setActiveTemplateId(template.id)}
                className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1.5 ${
                  isActive
                    ? 'bg-indigo-950/70 border-indigo-500 text-white shadow-md shadow-indigo-950/50'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs font-display flex items-center gap-1.5">
                    {template.title}
                  </span>
                  <span
                    className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded font-bold ${
                      template.category === 'website'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-950 text-purple-400 border border-purple-500/30'
                    }`}
                  >
                    {template.category === 'website' ? 'Website' : 'Web App'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {template.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Pedagogical Footer Info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 space-y-2">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Curriculum Scaffold</span>
            <span className="font-mono text-indigo-400 font-semibold">11 Full Archetypes</span>
          </div>
          <button
            onClick={() => setIsExportOpen(true)}
            className="w-full py-1.5 px-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Active Template (.zip)</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP CONTROL BAR */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between gap-4 shrink-0">
          {/* Active Archetype Title */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-display">
                {currentTemplate.title}
              </h2>
              <span className="text-[10px] bg-slate-800 text-indigo-300 border border-slate-700 px-2 py-0.5 rounded-full font-mono">
                {currentTemplate.renderPattern}
              </span>
              <span className="text-[10px] bg-slate-800 text-emerald-300 border border-slate-700 px-2 py-0.5 rounded-full font-mono">
                {currentTemplate.difficulty}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1">{currentTemplate.tagline}</p>
          </div>

          {/* Mode Switchers */}
          <div className="flex items-center gap-3">
            {/* View Mode Tabs */}
            <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
              {[
                { id: 'interactive', label: 'Interactive Preview', icon: Layout },
                { id: 'architecture', label: 'Architecture & Stack', icon: Layers },
                { id: 'security', label: 'Security & Threats', icon: Shield },
                { id: 'exercises', label: 'Student Challenges', icon: Flame },
                { id: 'code', label: 'Source Scaffold', icon: Code2 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setViewMode(tab.id as ViewMode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                      viewMode === tab.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Viewport Width Controls (Only active in Interactive mode) */}
            {viewMode === 'interactive' && (
              <div className="hidden md:flex bg-slate-950 border border-slate-800 p-1 rounded-xl text-slate-400">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-1.5 rounded-lg transition ${
                    deviceMode === 'desktop' ? 'bg-slate-800 text-white' : 'hover:text-white'
                  }`}
                  title="Desktop View (Fluid 100%)"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('tablet')}
                  className={`p-1.5 rounded-lg transition ${
                    deviceMode === 'tablet' ? 'bg-slate-800 text-white' : 'hover:text-white'
                  }`}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-1.5 rounded-lg transition ${
                    deviceMode === 'mobile' ? 'bg-slate-800 text-white' : 'hover:text-white'
                  }`}
                  title="Mobile View (375px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* OPEN IN STACKBLITZ WEB IDE BUTTON */}
            <button
              onClick={() => openInStackBlitz(currentTemplate)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 shadow-sm transition active:scale-95"
              title="Open current template scaffold in StackBlitz WebContainer IDE"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline">StackBlitz</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>

            {/* EXPORT PROJECT ZIP BUTTON */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 border border-emerald-400/40 transition active:scale-95"
              title="Export Full Project Bundle with source code & setup.sh as ZIP"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Project</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-300/40 text-emerald-200 font-mono font-normal">
                ZIP
              </span>
            </button>

            {/* USER GUIDE MODAL BUTTON */}
            <button
              onClick={() => setIsUserGuideOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 border border-indigo-400/40 transition active:scale-95"
              title="Open Comprehensive Multilingual User Guide"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">User Guide</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950/80 border border-indigo-300/40 text-indigo-200 font-mono font-normal">
                19 Langs
              </span>
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT STAGE */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-6 custom-scrollbar">
          {/* 1. INTERACTIVE PREVIEW MODE */}
          {viewMode === 'interactive' && (
            <div className="h-full flex flex-col">
              <div
                className={`mx-auto w-full transition-all duration-300 ${
                  deviceMode === 'desktop'
                    ? 'max-w-none h-full'
                    : deviceMode === 'tablet'
                    ? 'max-w-3xl border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-slate-950 my-4'
                    : 'max-w-sm border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-slate-950 my-4'
                }`}
              >
                {renderTemplateComponent()}
              </div>
            </div>
          )}

          {/* 2. ARCHITECTURE & DATA FLOW MODE */}
          {viewMode === 'architecture' && (
            <div className="max-w-5xl mx-auto space-y-8 pb-12">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    System Architecture & Engineering Layers
                  </h3>
                  <p className="text-xs text-slate-400">{currentTemplate.summary}</p>
                </div>

                {/* State Architecture Banner */}
                <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl space-y-1">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-400">
                    State & Data Synchronization Pattern
                  </span>
                  <p className="text-xs text-indigo-200">{currentTemplate.stateArchitecture}</p>
                </div>

                {/* Architecture Layers Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" /> Layered Architecture & Responsibilities
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {currentTemplate.architectureLayers.map((layer, idx) => (
                      <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">{layer.layer}</span>
                          <span className="text-[10px] font-mono bg-slate-900 text-indigo-300 px-2 py-0.5 rounded border border-slate-800">
                            {layer.technology}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{layer.responsibility}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Engineering Challenges */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400" /> Non-Trivial Engineering Challenges
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {currentTemplate.coreEngineeringChallenges.map((challenge, idx) => (
                      <div key={idx} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Concepts & Tech Stack */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
                      Core Pedagogical Concepts
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {currentTemplate.keyConcepts.map((concept) => (
                        <span
                          key={concept}
                          className="bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-xs px-2.5 py-1 rounded-lg font-medium"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
                      Production Tech Stack Recommendations
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {currentTemplate.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-slate-950 text-slate-300 border border-slate-800 text-xs px-2.5 py-1 rounded-lg font-mono"
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
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    Security Vulnerabilities & Hardening Guidelines
                  </h3>
                  <p className="text-xs text-slate-400">
                    Defensive engineering patterns required for production {currentTemplate.title} deployments.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {currentTemplate.securityConsiderations.map((sec, idx) => (
                    <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                        <h4 className="font-bold text-sm text-white">{sec.threat}</h4>
                      </div>
                      <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 text-xs text-emerald-300 font-mono leading-relaxed">
                        🛡️ <strong>Mitigation:</strong> {sec.mitigation}
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
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    Curriculum Practice & Capstone Exercises
                  </h3>
                  <p className="text-xs text-slate-400">
                    Progressive programming assignments for intermediate and advanced students.
                  </p>
                </div>

                <div className="space-y-4">
                  {currentTemplate.studentExercises.map((ex, idx) => (
                    <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-white">{ex.title}</h4>
                        <span
                          className={`text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                            ex.level === 'Warmup'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                              : ex.level === 'Core Challenge'
                              ? 'bg-amber-950 text-amber-400 border-amber-500/30'
                              : 'bg-rose-950 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          {ex.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
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
              <div className="flex flex-wrap justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl gap-4">
                <div>
                  <h3 className="font-bold text-sm text-white">Production TypeScript & React Blueprint</h3>
                  <p className="text-xs text-slate-400">Clean starter scaffold and core state machine for students</p>
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
    </div>
  );
}
