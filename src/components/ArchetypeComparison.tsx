import React, { useState, useMemo } from 'react';
import {
  ArrowLeftRight,
  Layers,
  Cpu,
  Shield,
  CheckCircle2,
  ArrowUpRight,
  Gauge,
  Code2,
} from 'lucide-react';
import { TEMPLATES_DATA } from '../data/templateData';
import { TeachingMetadata, TemplateId } from '../types/templates';
import { COMPARISON_PRESETS } from '../data/appConfig';

interface ArchetypeComparisonProps {
  initialLeftId?: TemplateId;
  onSelectArchetypeInStudio: (id: TemplateId) => void;
}

const COMPLEXITY_SCORE: Record<TeachingMetadata['difficulty'], number> = {
  Intermediate: 1,
  'Intermediate-Advanced': 2,
  Advanced: 3,
};

export const ArchetypeComparison: React.FC<ArchetypeComparisonProps> = ({
  initialLeftId = 'blog-content',
  onSelectArchetypeInStudio,
}) => {
  const [leftId, setLeftId] = useState<TemplateId>(initialLeftId);
  const [rightId, setRightId] = useState<TemplateId>(
    initialLeftId === 'saas' ? 'ecommerce' : 'saas'
  );

  const leftTemplate = useMemo(
    () => TEMPLATES_DATA.find((t) => t.id === leftId) || TEMPLATES_DATA[0],
    [leftId]
  );
  const rightTemplate = useMemo(
    () => TEMPLATES_DATA.find((t) => t.id === rightId) || TEMPLATES_DATA[6],
    [rightId]
  );

  const swapArchetypes = () => {
    setLeftId(rightId);
    setRightId(leftId);
  };

  // Tech stack diffing
  const stackDiff = useMemo(() => {
    const leftSet = new Set(leftTemplate.techStack);
    const rightSet = new Set(rightTemplate.techStack);
    const shared = leftTemplate.techStack.filter((t) => rightSet.has(t));
    const onlyLeft = leftTemplate.techStack.filter((t) => !rightSet.has(t));
    const onlyRight = rightTemplate.techStack.filter((t) => !leftSet.has(t));
    return { shared, onlyLeft, onlyRight };
  }, [leftTemplate, rightTemplate]);

  const renderComplexityMeter = (difficulty: TeachingMetadata['difficulty']) => {
    const level = COMPLEXITY_SCORE[difficulty];
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[var(--text-primary)]">{difficulty}</span>
          <span className="font-mono tabular-nums text-[var(--text-muted)]">
            Tier {level} / 3
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="h-2 rounded-full transition-all"
              style={{
                backgroundColor:
                  step <= level ? 'var(--accent-primary)' : 'var(--border-color)',
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Selector & Preset Bar */}
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 space-y-5"
        style={{ borderRadius: 'var(--radius-card)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-[var(--text-primary)]">
              Side-by-Side Archetype Comparison
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Compare system architecture, rendering patterns, tech stacks, and complexity levels across any two archetypes.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            {COMPARISON_PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setLeftId(preset.left);
                  setRightId(preset.right);
                }}
                className="px-2.5 py-1 text-xs font-medium border border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Archetype Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left Selector */}
          <div className="space-y-1.5">
            <label
              htmlFor="compare-left-select"
              className="block text-xs font-semibold text-[var(--text-muted)]"
            >
              Archetype A (Baseline)
            </label>
            <div className="flex items-center gap-2">
              <select
                id="compare-left-select"
                value={leftId}
                onChange={(e) => setLeftId(e.target.value as TemplateId)}
                className="w-full bg-[var(--bg-canvas)] border border-[var(--border-strong)] px-3.5 py-2.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                style={{ borderRadius: 'var(--radius-input)' }}
              >
                {TEMPLATES_DATA.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.category === 'website' ? 'Website' : 'Web App'} · {t.difficulty})
                  </option>
                ))}
              </select>
              <button
                onClick={() => onSelectArchetypeInStudio(leftId)}
                className="px-3 py-2.5 text-xs font-semibold border border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition shrink-0 flex items-center gap-1"
                style={{ borderRadius: 'var(--radius-button)' }}
                title={`Open ${leftTemplate.title} in Studio`}
              >
                <span>Open</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:pt-5">
            <button
              onClick={swapArchetypes}
              className="p-2.5 border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-text)] hover:border-[var(--accent-primary)] transition"
              style={{ borderRadius: 'var(--radius-button)' }}
              title="Swap Archetypes"
              aria-label="Swap Archetypes"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Selector */}
          <div className="space-y-1.5">
            <label
              htmlFor="compare-right-select"
              className="block text-xs font-semibold text-[var(--text-muted)]"
            >
              Archetype B (Comparison)
            </label>
            <div className="flex items-center gap-2">
              <select
                id="compare-right-select"
                value={rightId}
                onChange={(e) => setRightId(e.target.value as TemplateId)}
                className="w-full bg-[var(--bg-canvas)] border border-[var(--border-strong)] px-3.5 py-2.5 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                style={{ borderRadius: 'var(--radius-input)' }}
              >
                {TEMPLATES_DATA.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.category === 'website' ? 'Website' : 'Web App'} · {t.difficulty})
                  </option>
                ))}
              </select>
              <button
                onClick={() => onSelectArchetypeInStudio(rightId)}
                className="px-3 py-2.5 text-xs font-semibold border border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition shrink-0 flex items-center gap-1"
                style={{ borderRadius: 'var(--radius-button)' }}
                title={`Open ${rightTemplate.title} in Studio`}
              >
                <span>Open</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Complexity & Architectural Profile */}
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 space-y-5"
        style={{ borderRadius: 'var(--radius-card)' }}
      >
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
          <h4 className="text-sm font-bold font-display text-[var(--text-primary)]">
            01. Complexity Level &amp; Rendering Profile
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[leftTemplate, rightTemplate].map((tpl, index) => (
            <div
              key={`${tpl.id}-${index}`}
              className="p-5 bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-4"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {index === 0 ? 'Archetype A' : 'Archetype B'} ·{' '}
                    {tpl.category === 'website' ? 'Website' : 'Web Application'}
                  </div>
                  <h5 className="text-base font-bold font-display text-[var(--text-primary)] mt-0.5">
                    {tpl.title}
                  </h5>
                </div>
                <span
                  className="text-xs font-mono font-semibold px-2.5 py-1 shrink-0"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    color: 'var(--accent-text)',
                    borderRadius: 'var(--radius-button)',
                  }}
                >
                  {tpl.renderPattern}
                </span>
              </div>

              {renderComplexityMeter(tpl.difficulty)}

              <div className="pt-2 border-t border-[var(--border-color)] space-y-1">
                <div className="text-xs font-semibold text-[var(--text-secondary)]">
                  State &amp; Data Synchronization
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {tpl.stateArchitecture}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Tech Stack Comparison */}
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 space-y-5"
        style={{ borderRadius: 'var(--radius-card)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
            <h4 className="text-sm font-bold font-display text-[var(--text-primary)]">
              02. Production Tech Stack Comparison
            </h4>
          </div>
          <span className="text-xs text-[var(--text-muted)] tabular-nums">
            {stackDiff.shared.length} shared · {stackDiff.onlyLeft.length} unique to A ·{' '}
            {stackDiff.onlyRight.length} unique to B
          </span>
        </div>

        {stackDiff.shared.length > 0 && (
          <div
            className="p-4 bg-[var(--accent-soft)] border border-[var(--accent-primary)]/30 space-y-2"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <div
              className="text-xs font-bold"
              style={{ color: 'var(--accent-text)' }}
            >
              Shared Technologies ({stackDiff.shared.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {stackDiff.shared.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono font-medium bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)]"
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Unique Stack */}
          <div
            className="p-5 bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-3"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <div className="text-xs font-bold text-[var(--text-primary)]">
              Unique to {leftTemplate.title}
            </div>
            {stackDiff.onlyLeft.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {stackDiff.onlyLeft.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)]">
                All technologies are shared with {rightTemplate.title}.
              </p>
            )}
          </div>

          {/* Right Unique Stack */}
          <div
            className="p-5 bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-3"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <div className="text-xs font-bold text-[var(--text-primary)]">
              Unique to {rightTemplate.title}
            </div>
            {stackDiff.onlyRight.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {stackDiff.onlyRight.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)]">
                All technologies are shared with {leftTemplate.title}.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. System Architecture Layers */}
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 space-y-5"
        style={{ borderRadius: 'var(--radius-card)' }}
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
          <h4 className="text-sm font-bold font-display text-[var(--text-primary)]">
            03. Layered System Architecture
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[leftTemplate, rightTemplate].map((tpl, index) => (
            <div key={`${tpl.id}-layers-${index}`} className="space-y-3">
              <div className="text-xs font-bold text-[var(--text-secondary)]">
                {tpl.title} Layers
              </div>
              {tpl.architectureLayers.map((layer, lIdx) => (
                <div
                  key={lIdx}
                  className="p-4 bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-1.5"
                  style={{ borderRadius: 'var(--radius-card)' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {layer.layer}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--accent-text)]">
                      {layer.technology}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {layer.responsibility}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Engineering Challenges & Security Posture */}
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 space-y-5"
        style={{ borderRadius: 'var(--radius-card)' }}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: 'var(--accent-text)' }} />
          <h4 className="text-sm font-bold font-display text-[var(--text-primary)]">
            04. Engineering Challenges &amp; Security Posture
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[leftTemplate, rightTemplate].map((tpl, index) => (
            <div
              key={`${tpl.id}-challenges-${index}`}
              className="p-5 bg-[var(--bg-canvas)] border border-[var(--border-color)] space-y-4"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <div className="text-xs font-bold text-[var(--text-primary)]">
                {tpl.title}
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Core Engineering Challenges
                </div>
                {tpl.coreEngineeringChallenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5 shrink-0 mt-0.5"
                      style={{ color: 'var(--accent-text)' }}
                    />
                    <span>{c}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[var(--border-color)] space-y-2">
                <div className="text-[11px] font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Primary Security Focus
                </div>
                {tpl.securityConsiderations.map((sec, idx) => (
                  <div key={idx} className="text-xs space-y-0.5">
                    <div className="font-semibold text-[var(--text-primary)]">
                      {sec.threat}
                    </div>
                    <div className="text-[var(--text-muted)]">{sec.mitigation}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
