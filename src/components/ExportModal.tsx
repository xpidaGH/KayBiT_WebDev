import React, { useState, useMemo } from 'react';
import {
  X,
  Download,
  Terminal,
  FileCode,
  Check,
  Copy,
  FolderArchive,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Folder,
  FileText,
  Package,
  Shield,
  HelpCircle,
  Loader2,
  CheckCircle2,
  Settings2,
  Code2,
  Zap
} from 'lucide-react';
import { TeachingMetadata } from '../types/templates';
import {
  PackageManager,
  createExportBundle,
  downloadExportBundle,
  openInStackBlitz,
  ExportFileEntry
} from '../utils/exportProject';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: TeachingMetadata;
}

export function ExportModal({ isOpen, onClose, template }: ExportModalProps) {
  const [pkgMgr, setPkgMgr] = useState<PackageManager>('npm');
  const [selectedFilePath, setSelectedFilePath] = useState<string>('setup.sh');
  const [copiedFile, setCopiedFile] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Generate the file bundle whenever template or pkgMgr changes
  const bundle = useMemo(() => {
    return createExportBundle(template, pkgMgr);
  }, [template, pkgMgr]);

  const activeFile: ExportFileEntry | undefined = useMemo(() => {
    return bundle.files.find((f) => f.path === selectedFilePath) || bundle.files[0];
  }, [bundle, selectedFilePath]);

  const handleCopyActiveFile = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      const filename = await downloadExportBundle(template, pkgMgr);
      setDownloadSuccess(filename);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (err) {
      console.error('Failed to export ZIP:', err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  Export Archetype Project
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-bold">
                  ZIP Bundle
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Download <strong className="text-white">{template.title}</strong> with full source code &amp; <code className="text-emerald-400 bg-slate-800 px-1 rounded">setup.sh</code>
              </p>
            </div>
          </div>

          {/* Right Action Controls: Open in StackBlitz, Download Button & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => openInStackBlitz(template)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 border border-blue-400/40 transition active:scale-95"
              title="Launch instant live cloud IDE on StackBlitz"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Open in StackBlitz</span>
              <ExternalLink className="w-3 h-3 text-blue-200 ml-0.5" />
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 border border-emerald-400/40 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Bundling ZIP...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download (.zip)</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 transition"
              title="Close Export Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Configuration Bar */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Package className="w-3.5 h-3.5 text-indigo-400" />
              <span>Target Package Manager:</span>
            </div>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              {(['npm', 'pnpm', 'yarn', 'bun'] as PackageManager[]).map((mgr) => (
                <button
                  key={mgr}
                  onClick={() => setPkgMgr(mgr)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition ${
                    pkgMgr === mgr
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mgr}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Archive Filename:</span>
            <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {bundle.filename}
            </span>
          </div>
        </div>

        {/* Main Body: Two Column Explorer (File Tree vs Code Viewer) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: File Tree & Features */}
          <div className="w-full md:w-80 border-r border-slate-800 bg-slate-950/40 flex flex-col overflow-y-auto shrink-0 custom-scrollbar">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-indigo-400" />
                Bundle File Manifest ({bundle.files.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Click any file below to inspect its generated content before downloading.
              </p>
            </div>

            {/* File List */}
            <div className="p-2 space-y-1 flex-1">
              {bundle.files.map((file) => {
                const isSelected = activeFile?.path === file.path;
                const isSetup = file.path === 'setup.sh';
                const isComponent = file.path.includes('src/components/');
                const isReadme = file.path === 'README.md';

                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFilePath(file.path)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-indigo-600/90 text-white font-semibold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isSetup ? (
                        <Terminal className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                      ) : isReadme ? (
                        <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
                      ) : isComponent ? (
                        <Code2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
                      ) : (
                        <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      )}
                      <span className="font-mono text-[11px] truncate">{file.path}</span>
                    </div>

                    {isSetup && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                        Executable
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Setup Instructions Box */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>How to run locally</span>
              </div>
              <ol className="text-[11px] text-slate-400 space-y-1 pl-4 list-decimal leading-relaxed">
                <li>Extract the downloaded <code className="text-slate-300">.zip</code> folder</li>
                <li>Open a terminal in the folder</li>
                <li>
                  Run <code className="text-emerald-400 font-bold bg-slate-900 px-1 py-0.5 rounded">chmod +x setup.sh && ./setup.sh</code>
                </li>
                <li>Open <code className="text-indigo-400">http://localhost:3000</code> in your browser</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Code Viewer */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            {/* Viewer Header */}
            <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-white">
                  {activeFile?.path}
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  — {activeFile?.description}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyActiveFile}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 hover:text-white transition"
                >
                  {copiedFile ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 custom-scrollbar bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed select-text">
              <pre className="whitespace-pre">{activeFile?.content}</pre>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>
              Standalone project generated with <strong>React 19 + TypeScript + Vite 6 + Tailwind CSS v4</strong>.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              Download {bundle.filename}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
