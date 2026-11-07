import React, { useEffect } from 'react';
import { X, Check, Palette } from 'lucide-react';
import { THEME_OPTIONS, ThemeId } from '../types/themes';

interface ThemeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export const ThemeSettingsModal: React.FC<ThemeSettingsModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onSelectTheme,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-settings-title"
    >
      <div
        className="w-full max-w-2xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-2xl overflow-hidden transition-all"
        style={{ borderRadius: 'var(--radius-card)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[var(--border-color)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent-text)',
                borderRadius: 'var(--radius-button)',
              }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="theme-settings-title"
                className="text-lg font-bold font-display leading-tight text-[var(--text-primary)]"
              >
                Theme Settings
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Choose a visual system. Changes apply immediately and persist across reloads.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold border border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition flex items-center gap-1.5"
            style={{ borderRadius: 'var(--radius-button)' }}
            aria-label="Close Theme Settings"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>

        {/* Theme Options List */}
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {THEME_OPTIONS.map((theme, idx) => {
            const isSelected = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                  onClose();
                }}
                className={`w-full text-left p-4 border transition flex items-center justify-between gap-4 group ${
                  isSelected
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-soft)] shadow-sm'
                    : 'border-[var(--border-color)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)]'
                }`}
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Live Mini Preview Swatch Card */}
                  <div
                    className={`w-16 h-12 shrink-0 border p-1.5 flex flex-col justify-between shadow-sm ${theme.previewRadiusClass}`}
                    style={{
                      backgroundColor: theme.swatches.canvas,
                      borderColor: theme.swatches.accent + '40',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: theme.swatches.accent }}
                      />
                      <span
                        className="w-5 h-1.5 rounded-full opacity-60"
                        style={{ backgroundColor: theme.swatches.text }}
                      />
                    </div>
                    <div
                      className="w-full h-4 rounded px-1 flex items-center"
                      style={{ backgroundColor: theme.swatches.surface }}
                    >
                      <span
                        className={`text-[9px] font-bold leading-none ${theme.previewFontClass}`}
                        style={{ color: theme.swatches.text }}
                      >
                        Aa
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[var(--text-primary)] truncate">
                        0{idx + 1}. {theme.name}
                      </span>
                      {isSelected && (
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 flex items-center gap-1 shrink-0"
                          style={{
                            backgroundColor: 'var(--accent-primary)',
                            color: 'var(--accent-on-primary)',
                            borderRadius: 'var(--radius-button)',
                          }}
                        >
                          <Check className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">
                      {theme.subtitle}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      Typography: {theme.typographyLabel}
                    </p>
                  </div>
                </div>

                {/* Color Palette Dots */}
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  {Object.entries(theme.swatches).map(([key, hex]) => (
                    <span
                      key={key}
                      className="w-4 h-4 rounded-full border border-black/15 shadow-xs"
                      style={{ backgroundColor: hex }}
                      title={`${key}: ${hex}`}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[var(--border-color)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>Click any theme to apply &amp; save to localStorage</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
