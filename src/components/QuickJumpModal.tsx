import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, CornerDownLeft, X, Check } from 'lucide-react';
import { TEMPLATES_DATA } from '../data/templateData';
import { TemplateId } from '../types/templates';

interface QuickJumpModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTemplateId: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

export const QuickJumpModal: React.FC<QuickJumpModalProps> = ({
  isOpen,
  onClose,
  activeTemplateId,
  onSelectTemplate,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEMPLATES_DATA;
    return TEMPLATES_DATA.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.renderPattern.toLowerCase().includes(q) ||
        t.difficulty.toLowerCase().includes(q) ||
        t.keyConcepts.some((c) => c.toLowerCase().includes(q)) ||
        t.techStack.some((tech) => tech.toLowerCase().includes(q)) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      const currentIdx = TEMPLATES_DATA.findIndex((t) => t.id === activeTemplateId);
      setSelectedIndex(currentIdx >= 0 ? currentIdx : 0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen, activeTemplateId]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length > 0 ? (prev - 1 + results.length) % results.length : 0
        );
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        onSelectTemplate(results[selectedIndex].id);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onSelectTemplate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quick Jump Archetype Command Palette"
    >
      <div
        className="w-full max-w-xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-2xl overflow-hidden"
        style={{ borderRadius: 'var(--radius-card)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="px-4 py-3.5 border-b border-[var(--border-color)] flex items-center gap-3">
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--accent-text)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Quick Jump to any archetype (e.g. SaaS, Blog, E-Commerce, SSR)..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition shrink-0"
            aria-label="Close Quick Jump"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {results.length === 0 ? (
            <div className="py-10 text-center text-xs text-[var(--text-muted)]">
              No archetypes matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((template, idx) => {
              const isHighlighted = idx === selectedIndex;
              const isCurrent = template.id === activeTemplateId;

              return (
                <button
                  key={template.id}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    onSelectTemplate(template.id);
                    onClose();
                  }}
                  className="w-full text-left px-3.5 py-2.5 border transition flex items-center justify-between gap-3"
                  style={{
                    borderRadius: 'var(--radius-button)',
                    backgroundColor: isHighlighted ? 'var(--accent-soft)' : 'transparent',
                    borderColor: isHighlighted ? 'var(--accent-primary)' : 'transparent',
                  }}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-display text-[var(--text-primary)] truncate">
                        {template.title}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] shrink-0">
                        · {template.category === 'website' ? 'Website' : 'Web App'} ·{' '}
                        {template.renderPattern}
                      </span>
                      {isCurrent && (
                        <span
                          className="text-[11px] font-semibold flex items-center gap-0.5 shrink-0"
                          style={{ color: 'var(--accent-text)' }}
                        >
                          <Check className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">
                      {template.tagline}
                    </p>
                  </div>

                  {isHighlighted && (
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 shrink-0 flex items-center gap-1"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        color: 'var(--accent-on-primary)',
                        borderRadius: 'var(--radius-button)',
                      }}
                    >
                      <span>Jump</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard Hints Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--border-color)] bg-[var(--bg-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="font-mono tabular-nums">{results.length} / 11 archetypes</span>
        </div>
      </div>
    </div>
  );
};
