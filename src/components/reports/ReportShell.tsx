import { type ReactNode } from 'react';
import './ReportShell.css';

interface Props {
  title: string;
  eyebrow: string;
  color: string;
  children: ReactNode;
  onClose: () => void;
}

export default function ReportShell({ title, eyebrow, color, children, onClose }: Props) {
  return (
    <div className="report-shell">
      <div className="rs-header" style={{ borderBottomColor: color }}>
        <div className="rs-header-inner">
          <span className="rs-eyebrow" style={{ color }}>{eyebrow}</span>
          <h2 className="rs-title">{title}</h2>
        </div>
        <button className="rs-close" onClick={onClose}>Fechar relatório</button>
      </div>
      <div className="rs-body">
        {children}
      </div>
    </div>
  );
}

/* Reusable sub-components for reports */

export function Section({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className="rs-section">
      <div className="rs-section-header">
        <span className="rs-section-num">{num}</span>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="rs-stat-grid">{children}</div>;
}

export function StatCard({ value, label, unit, color }: { value: string | number; label: string; unit?: string; color?: string }) {
  return (
    <div className="rs-stat-card">
      <div className="rs-stat-value" style={{ color: color || 'var(--gold)' }}>
        {value}<span className="rs-stat-unit">{unit}</span>
      </div>
      <div className="rs-stat-label">{label}</div>
    </div>
  );
}

export function DataTable({ headers, rows, highlight }: { headers: string[]; rows: (string | number)[][]; highlight?: number }) {
  return (
    <div className="rs-table-wrap">
      <table className="rs-table">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri === highlight ? 'rs-highlight' : ''}>
              {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({ type, children }: { type: 'info' | 'warn' | 'danger' | 'ok'; children: ReactNode }) {
  return <div className={`rs-callout rs-callout-${type}`}>{children}</div>;
}

export function BarChart({ items }: { items: { label: string; value: number; max: number; color: string }[] }) {
  return (
    <div className="rs-bars">
      {items.map((item, i) => (
        <div key={i} className="rs-bar-row">
          <span className="rs-bar-label">{item.label}</span>
          <div className="rs-bar-track">
            <div
              className="rs-bar-fill"
              style={{ width: `${(item.value / item.max) * 100}%`, backgroundColor: item.color }}
            />
          </div>
          <span className="rs-bar-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function HorizBar({ items }: { items: { label: string; value: number; max: number; color: string; suffix?: string }[] }) {
  return (
    <div className="rs-hbars">
      {items.map((item, i) => (
        <div key={i} className="rs-hbar-row">
          <span className="rs-hbar-label">{item.label}</span>
          <div className="rs-hbar-track">
            <div
              className="rs-hbar-fill"
              style={{ width: `${Math.abs(item.value / item.max) * 100}%`, backgroundColor: item.color }}
            />
          </div>
          <span className="rs-hbar-value">{item.value}{item.suffix || ''}</span>
        </div>
      ))}
    </div>
  );
}

export function CompareRow({ label, brazil, reference, refLabel, unit, inverse }: {
  label: string; brazil: number; reference: number; refLabel?: string; unit?: string; inverse?: boolean;
}) {
  const better = inverse ? brazil < reference : brazil > reference;
  return (
    <div className="rs-compare-row">
      <span className="rs-compare-label">{label}</span>
      <span className={`rs-compare-br ${better ? 'good' : 'bad'}`}>{brazil}{unit}</span>
      <span className="rs-compare-ref">{reference}{unit} <span className="rs-compare-ref-label">{refLabel || 'Ref.'}</span></span>
    </div>
  );
}

/* ── Prose: analytical paragraphs ── */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="rs-prose">{children}</div>;
}

/* ── QuoteBlock: expert citations with attribution ── */
export function QuoteBlock({ quote, author, role }: { quote: string; author: string; role?: string }) {
  return (
    <blockquote className="rs-quote">
      <p className="rs-quote-text">{quote}</p>
      <footer className="rs-quote-footer">
        <span className="rs-quote-author">{author}</span>
        {role && <span className="rs-quote-role">{role}</span>}
      </footer>
    </blockquote>
  );
}

/* ── ScenarioGrid: side-by-side scenario comparison ── */
export function ScenarioGrid({ scenarios }: {
  scenarios: { title: string; color: string; items: string[] }[];
}) {
  return (
    <div className="rs-scenarios" style={{ gridTemplateColumns: `repeat(${scenarios.length}, 1fr)` }}>
      {scenarios.map((s, i) => (
        <div key={i} className="rs-scenario-card" style={{ borderTopColor: s.color }}>
          <div className="rs-scenario-title" style={{ color: s.color }}>{s.title}</div>
          <ul className="rs-scenario-list">
            {s.items.map((item, j) => <li key={j}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ── FactorCard: score + description + tags ── */
export function FactorCard({ title, score, scoreLabel, color, children, tags }: {
  title: string; score?: number | string; scoreLabel?: string; color: string;
  children: ReactNode; tags?: string[];
}) {
  return (
    <div className="rs-factor" style={{ borderLeftColor: color }}>
      <div className="rs-factor-header">
        <h4 className="rs-factor-title">{title}</h4>
        {score !== undefined && (
          <span className="rs-factor-score" style={{ color }}>
            {score}{scoreLabel && <span className="rs-factor-score-label">{scoreLabel}</span>}
          </span>
        )}
      </div>
      <div className="rs-factor-body">{children}</div>
      {tags && tags.length > 0 && (
        <div className="rs-factor-tags">
          {tags.map((t, i) => <span key={i} className="rs-factor-tag">{t}</span>)}
        </div>
      )}
    </div>
  );
}

/* ── Timeline: chronological events ── */
export function Timeline({ events }: {
  events: { year: string; label: string; detail?: string; color?: string }[];
}) {
  return (
    <div className="rs-timeline">
      {events.map((e, i) => (
        <div key={i} className="rs-tl-item">
          <div className="rs-tl-marker">
            <span className="rs-tl-dot" style={{ backgroundColor: e.color || 'var(--gold)' }} />
            {i < events.length - 1 && <span className="rs-tl-line" />}
          </div>
          <div className="rs-tl-content">
            <span className="rs-tl-year">{e.year}</span>
            <span className="rs-tl-label">{e.label}</span>
            {e.detail && <p className="rs-tl-detail">{e.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── SensitivityMatrix: color-coded NxM grid ── */
export function SensitivityMatrix({ rowLabel, colLabel, rows, cols, cells }: {
  rowLabel: string; colLabel: string;
  rows: string[]; cols: string[];
  cells: { value: string; color: string }[][];
}) {
  return (
    <div className="rs-matrix-wrap">
      <div className="rs-matrix-colLabel">{colLabel} →</div>
      <div className="rs-table-wrap">
        <table className="rs-table rs-matrix">
          <thead>
            <tr>
              <th>{rowLabel} ↓</th>
              {cols.map((c, i) => <th key={i}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                <td className="rs-matrix-rowhead">{r}</td>
                {cells[ri].map((cell, ci) => (
                  <td key={ci} className="rs-matrix-cell" style={{ backgroundColor: cell.color }}>
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── InfoGrid: flexible grid of rich cards (policy grids, capability grids) ── */
export function InfoGrid({ children, columns }: { children: ReactNode; columns?: number }) {
  return (
    <div className="rs-info-grid" style={{ gridTemplateColumns: `repeat(${columns || 2}, 1fr)` }}>
      {children}
    </div>
  );
}

export function InfoCard({ title, subtitle, color, children }: {
  title: string; subtitle?: string; color?: string; children: ReactNode;
}) {
  return (
    <div className="rs-info-card" style={{ borderTopColor: color || 'var(--rule-strong)' }}>
      <div className="rs-info-card-header">
        <h4 className="rs-info-card-title">{title}</h4>
        {subtitle && <span className="rs-info-card-sub">{subtitle}</span>}
      </div>
      <div className="rs-info-card-body">{children}</div>
    </div>
  );
}
