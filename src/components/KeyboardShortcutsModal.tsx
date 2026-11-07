import React, { useEffect } from 'react';
import { X, Keyboard, Command } from 'lucide-react';
import { KEYBOARD_SHORTCUTS, KeyboardShortcut } from '../data/appConfig';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Group shortcuts by category
  const categories: KeyboardShortcut['category'][] = [
    'Navigation',
    'Actions',
    'View Modes',
    'System',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-shortcuts-title"
    >
      <div
        className="w-full max-w-2xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-2xl overflow-hidden transition-all flex flex-col max-h-[85vh]"
        style={{ borderRadius: 'var(--radius-card)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between gap-4 shrink-0 bg-[var(--bg-surface)]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent-text)',
                borderRadius: 'var(--radius-button)',
              }}
            >
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="keyboard-shortcuts-title"
                className="text-base font-bold font-display leading-tight text-[var(--text-primary)]"
              >
                Keyboard Shortcuts
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Speed up archetype exploration, navigation, and exporting with hotkeys
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold border border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition flex items-center gap-1.5 shrink-0"
            style={{ borderRadius: 'var(--radius-button)' }}
            aria-label="Close Keyboard Shortcuts Modal"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>

        {/* Shortcuts Content List */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1">
          {categories.map((category) => {
            const items = KEYBOARD_SHORTCUTS.filter((s) => s.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category} className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                  {category}
                </div>

                <div
                  className="bg-[var(--bg-canvas)] border border-[var(--border-color)] divide-y divide-[var(--border-color)] overflow-hidden"
                  style={{ borderRadius: 'var(--radius-card)' }}
                >
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2.5 flex items-center justify-between gap-4 hover:bg-[var(--bg-subtle)] transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-semibold text-[var(--text-primary)]">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)] truncate">
                          {item.description}
                        </div>
                      </div>

                      {/* Key combo badges */}
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keyCombo.map((key, kIdx) => (
                          <React.Fragment key={kIdx}>
                            {kIdx > 0 && (
                              <span className="text-[10px] text-[var(--text-muted)] font-mono">+</span>
                            )}
                            <kbd
                              className="px-2 py-1 text-xs font-mono font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] shadow-xs min-w-[24px] text-center"
                              style={{ borderRadius: 'var(--radius-input)' }}
                            >
                              {key === 'Ctrl' ? (
                                <span className="flex items-center gap-0.5">
                                  <Command className="w-3 h-3" />
                                  <span>/ Ctrl</span>
                                </span>
                              ) : (
                                key
                              )}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[var(--border-color)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] shrink-0">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 font-mono text-[10px] border border-[var(--border-color)] bg-[var(--bg-surface)] rounded text-[var(--text-primary)]">?</kbd> anytime to open this cheatsheet</span>
          <span className="font-mono text-[11px]">{KEYBOARD_SHORTCUTS.length} shortcuts registered</span>
        </div>
      </div>
    </div>
  );
};
