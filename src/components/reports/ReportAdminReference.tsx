import { useState, useCallback, useMemo, memo } from 'react';
import ReportShell, { Section, Callout } from './ReportShell';
import { CHAPTERS } from '../../data/chapters';
import { EVENTS } from '../../data/events';
import { SCORE_DIMENSIONS } from '../../data/governors';
import type { GovernorScores } from '../../data/governors';

// ── Types ──

type IndicatorKey = 'fiscal' | 'popular' | 'congress' | 'sovereignty';
type ScoreKey = keyof GovernorScores;

const INDICATOR_KEYS: IndicatorKey[] = ['fiscal', 'popular', 'congress', 'sovereignty'];
const INDICATOR_LABELS = ['Fiscal', 'Popular', 'Congr.', 'Sober.'];
const SCORE_KEYS: ScoreKey[] = SCORE_DIMENSIONS.map(d => d.key);
const SCORE_ICONS = SCORE_DIMENSIONS.map(d => d.icon);

const ALL_COLS = [
  ...INDICATOR_KEYS.map(k => `ind_${k}`),
  ...SCORE_KEYS.map(k => `sc_${k}`),
];

function cellKey(source: string, decIdx: number, optIdx: number, col: string): string {
  return `${source}|${decIdx}|${optIdx}|${col}`;
}

// ── Build original values map ──

function buildOriginalMap(): Record<string, number> {
  const map: Record<string, number> = {};

  for (const ch of CHAPTERS) {
    ch.decisions.forEach((dec, di) => {
      dec.options.forEach((opt, oi) => {
        const ind = opt.indicators ?? {};
        const sc = opt.scores ?? {};
        for (const ik of INDICATOR_KEYS) {
          map[cellKey(ch.id, di, oi, `ind_${ik}`)] = (ind as any)[ik] ?? 0;
        }
        for (const sk of SCORE_KEYS) {
          map[cellKey(ch.id, di, oi, `sc_${sk}`)] = (sc as any)[sk] ?? 0;
        }
      });
    });
  }

  for (const ev of EVENTS) {
    ev.options.forEach((opt, oi) => {
      const ind = opt.indicators ?? {};
      const sc = opt.scores ?? {};
      for (const ik of INDICATOR_KEYS) {
        map[cellKey(ev.id, 0, oi, `ind_${ik}`)] = (ind as any)[ik] ?? 0;
      }
      for (const sk of SCORE_KEYS) {
        map[cellKey(ev.id, 0, oi, `sc_${sk}`)] = (sc as any)[sk] ?? 0;
      }
    });
  }

  return map;
}

// ── Styles ──

const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  fontSize: 12,
  fontFamily: 'var(--ff-mono)',
  whiteSpace: 'nowrap',
};

const thStyle: React.CSSProperties = {
  padding: '4px 2px',
  borderBottom: '2px solid var(--rule)',
  fontSize: 10,
  fontWeight: 600,
  textAlign: 'center',
  position: 'sticky',
  top: 0,
  background: 'var(--paper)',
  zIndex: 1,
};

const tdStyle: React.CSSProperties = {
  padding: '2px 1px',
  borderBottom: '1px solid var(--rule)',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const labelTdStyle: React.CSSProperties = {
  ...tdStyle,
  textAlign: 'left',
  fontFamily: 'var(--ff-sans)',
  fontSize: 11,
  maxWidth: 180,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingRight: 8,
};

const inputStyleBase: React.CSSProperties = {
  width: 40,
  padding: '2px 1px',
  border: '1px solid var(--rule)',
  borderRadius: 2,
  textAlign: 'center',
  fontFamily: 'var(--ff-mono)',
  fontSize: 11,
  color: 'var(--ink)',
  outline: 'none',
};

const scrollWrap: React.CSSProperties = {
  overflowX: 'auto',
  marginBottom: 8,
};

const btnStyle: React.CSSProperties = {
  padding: '6px 14px',
  border: '1px solid var(--rule)',
  borderRadius: 4,
  background: 'var(--surface)',
  color: 'var(--ink)',
  fontFamily: 'var(--ff-sans)',
  fontSize: 12,
  cursor: 'pointer',
  marginRight: 8,
};

// ── Memoized sub-components (outside the main component) ──

const EditCell = memo(function EditCell({
  cellKey: k,
  value,
  modified,
  onChange,
}: {
  cellKey: string;
  value: number;
  modified: boolean;
  onChange: (key: string, raw: string) => void;
}) {
  return (
    <td style={tdStyle}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(k, e.target.value)}
        onFocus={e => e.target.select()}
        style={{
          ...inputStyleBase,
          background: modified ? 'var(--gold-dim)' : 'transparent',
        }}
      />
    </td>
  );
});

function TableHeaders() {
  return (
    <thead>
      <tr>
        <th style={{ ...thStyle, textAlign: 'left', minWidth: 150 }}>Opcao</th>
        {INDICATOR_LABELS.map((l, i) => (
          <th key={`ind-${i}`} style={{ ...thStyle, borderLeft: i === 0 ? '2px solid var(--rule)' : undefined }}>
            {l}
          </th>
        ))}
        {SCORE_ICONS.map((icon, i) => (
          <th key={`sc-${i}`} style={{ ...thStyle, borderLeft: i === 0 ? '2px solid var(--rule)' : undefined }}>
            {icon}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// ── Collapsible section for each chapter/event ──

const CollapsibleDecision = memo(function CollapsibleDecision({
  title,
  subtitle,
  sourceId,
  decIdx,
  options,
  original,
  edits,
  onChange,
}: {
  title: string;
  subtitle?: string;
  sourceId: string;
  decIdx: number;
  options: { label: string; description: string }[];
  original: Record<string, number>;
  edits: Record<string, number>;
  onChange: (key: string, raw: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: 16 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid var(--rule)',
          padding: '8px 0',
          cursor: 'pointer',
          fontFamily: 'var(--ff-serif)',
          fontSize: 15,
          color: 'var(--ink)',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 12, fontFamily: 'var(--ff-mono)', color: 'var(--text-dim)', width: 16 }}>
          {open ? '▼' : '▶'}
        </span>
        {title}
        {subtitle && (
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-dim)', marginLeft: 4 }}>
            {subtitle}
          </span>
        )}
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-dim)' }}>
          {options.length} opções
        </span>
      </button>

      {open && (
        <>
          <div style={scrollWrap}>
            <table style={tableStyle}>
              <TableHeaders />
              <tbody>
                {options.map((opt, oi) => (
                  <tr key={oi}>
                    <td style={labelTdStyle} title={opt.label}>
                      {oi + 1}. {opt.label}
                    </td>
                    {ALL_COLS.map(col => {
                      const k = cellKey(sourceId, decIdx, oi, col);
                      const v = k in edits ? edits[k] : (original[k] ?? 0);
                      const mod = k in edits && edits[k] !== (original[k] ?? 0);
                      return (
                        <EditCell
                          key={col}
                          cellKey={k}
                          value={v}
                          modified={mod}
                          onChange={onChange}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 4 }}>
            {options.map((opt, oi) => (
              <p key={oi} style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 2 }}>
                <strong>{oi + 1}.</strong> {opt.description}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

// ── Main Component ──

export default function ReportAdminReference({ onClose }: { onClose: () => void }) {
  const original = useMemo(() => buildOriginalMap(), []);
  const [edits, setEdits] = useState<Record<string, number>>({});
  const [copyMsg, setCopyMsg] = useState('');

  const handleChange = useCallback((key: string, raw: string) => {
    const parsed = raw === '' || raw === '-' ? 0 : parseInt(raw, 10);
    if (isNaN(parsed)) return;
    setEdits(prev => ({ ...prev, [key]: parsed }));
  }, []);

  const handleReset = useCallback(() => {
    setEdits({});
  }, []);

  const handleExport = useCallback(() => {
    const getValue = (key: string) => key in edits ? edits[key] : (original[key] ?? 0);

    const modifiedCells: Record<string, Record<string, Record<string, Record<string, number>>>> = {};
    for (const key of Object.keys(edits)) {
      if (edits[key] === (original[key] ?? 0)) continue;
      const [source, decIdx, optIdx, col] = key.split('|');
      if (!modifiedCells[source]) modifiedCells[source] = {};
      if (!modifiedCells[source][decIdx]) modifiedCells[source][decIdx] = {};
      if (!modifiedCells[source][decIdx][optIdx]) modifiedCells[source][decIdx][optIdx] = {};
      modifiedCells[source][decIdx][optIdx][col] = edits[key];
    }

    const full: Record<string, any> = { chapters: {}, events: {} };

    for (const ch of CHAPTERS) {
      const chData: any = {};
      ch.decisions.forEach((dec, di) => {
        const decData: any = { name: dec.name, options: [] };
        dec.options.forEach((opt, oi) => {
          const optData: any = { label: opt.label, indicators: {} as any, scores: {} as any };
          for (const ik of INDICATOR_KEYS) {
            const v = getValue(cellKey(ch.id, di, oi, `ind_${ik}`));
            if (v !== 0) optData.indicators[ik] = v;
          }
          for (const sk of SCORE_KEYS) {
            const v = getValue(cellKey(ch.id, di, oi, `sc_${sk}`));
            if (v !== 0) optData.scores[sk] = v;
          }
          decData.options.push(optData);
        });
        chData[dec.id] = decData;
      });
      full.chapters[ch.id] = chData;
    }

    for (const ev of EVENTS) {
      const evData: any = { title: ev.title, options: [] };
      ev.options.forEach((opt, oi) => {
        const optData: any = { label: opt.label, indicators: {} as any, scores: {} as any };
        for (const ik of INDICATOR_KEYS) {
          const v = getValue(cellKey(ev.id, 0, oi, `ind_${ik}`));
          if (v !== 0) optData.indicators[ik] = v;
        }
        for (const sk of SCORE_KEYS) {
          const v = getValue(cellKey(ev.id, 0, oi, `sc_${sk}`));
          if (v !== 0) optData.scores[sk] = v;
        }
        evData.options.push(optData);
      });
      full.events[ev.id] = evData;
    }

    const payload = JSON.stringify({ modified: modifiedCells, full }, null, 2);
    navigator.clipboard.writeText(payload).then(() => {
      setCopyMsg('Copiado!');
      setTimeout(() => setCopyMsg(''), 2000);
    });
  }, [edits, original]);

  const modifiedCount = useMemo(() => {
    return Object.keys(edits).filter(k => edits[k] !== (original[k] ?? 0)).length;
  }, [edits, original]);

  return (
    <ReportShell
      title="Admin — Editor de Balanceamento"
      eyebrow="Pagina Administrativa"
      color="var(--red)"
      onClose={onClose}
    >
      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button style={btnStyle} onClick={handleReset}>
          Reset
        </button>
        <button style={{ ...btnStyle, background: 'var(--gold-dim)', fontWeight: 600 }} onClick={handleExport}>
          Export JSON
        </button>
        {copyMsg && (
          <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{copyMsg}</span>
        )}
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {modifiedCount} celula{modifiedCount !== 1 ? 's' : ''} modificada{modifiedCount !== 1 ? 's' : ''}
        </span>
      </div>

      <Callout type="info">
        Clique em uma seção para expandir e editar valores. Celulas modificadas ficam com fundo{' '}
        <span style={{ background: 'var(--gold-dim)', padding: '1px 6px', borderRadius: 2 }}>dourado</span>.
        Use <strong>Reset</strong> para restaurar valores originais e <strong>Export JSON</strong> para copiar os dados.
      </Callout>

      {/* ═══ CHAPTER DECISIONS ═══ */}
      {CHAPTERS.map((chapter, ci) => (
        <Section key={chapter.id} num={String(ci + 1).padStart(2, '0')} title={`${chapter.title} — Fase ${chapter.phase}`}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.6 }}>
            {chapter.description}
          </p>

          {chapter.decisions.map((decision, di) => (
            <CollapsibleDecision
              key={decision.id}
              title={decision.name}
              subtitle={decision.id}
              sourceId={chapter.id}
              decIdx={di}
              options={decision.options}
              original={original}
              edits={edits}
              onChange={handleChange}
            />
          ))}
        </Section>
      ))}

      {/* ═══ RANDOM EVENTS ═══ */}
      <Section num="EV" title="Eventos Aleatorios">
        <Callout type="warn">
          Eventos aleatorios ocorrem com 40% de chance apos cada capitulo.
          Cada evento so pode ocorrer uma vez por partida.
          9 eventos disponiveis no total.
        </Callout>

        {EVENTS.map(event => (
          <CollapsibleDecision
            key={event.id}
            title={`${event.icon} ${event.title}`}
            subtitle={`${event.type} · ${event.id}`}
            sourceId={event.id}
            decIdx={0}
            options={event.options}
            original={original}
            edits={edits}
            onChange={handleChange}
          />
        ))}
      </Section>

      {/* ═══ LEGEND ═══ */}
      <Section num="LG" title="Legenda">
        <div style={scrollWrap}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Icone</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Dimensao</th>
                <th style={thStyle}>Maximo</th>
              </tr>
            </thead>
            <tbody>
              {SCORE_DIMENSIONS.map(d => (
                <tr key={d.key}>
                  <td style={tdStyle}>{d.icon}</td>
                  <td style={{ ...tdStyle, textAlign: 'left', fontFamily: 'var(--ff-sans)' }}>{d.label}</td>
                  <td style={tdStyle}>{d.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <strong>Indicadores (0-100):</strong> Fiscal = saude das contas · Popular = aprovacao do povo ·
            Congresso = apoio legislativo · Soberania = autonomia geopolitica
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 4 }}>
            <strong>Scores (nota final):</strong> Acumulados ao longo do mandato. Fiscal tem peso duplo (max 20).
            Demais dimensoes max 10. Total maximo = 100 pontos.
          </p>
        </div>
      </Section>
    </ReportShell>
  );
}
