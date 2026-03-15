import { useGameStore } from '../../engine/gameState';
import { CHAPTERS } from '../../data/chapters';
import { EVENTS } from '../../data/events';
import { SCORE_DIMENSIONS, totalScore } from '../../data/governors';
import ReportShell, { Section, StatGrid, StatCard, DataTable, Callout, HorizBar } from './ReportShell';

function fmt(v: number | undefined): string {
  if (!v || v === 0) return '·';
  return v > 0 ? `+${v}` : `${v}`;
}

export default function ReportDecisionHistory({ onClose }: { onClose: () => void }) {
  const { choices, eventHistory, scores, indicators, currentPhase } = useGameStore();

  // Build merged list sorted by order
  const merged = [
    ...choices.map((c) => ({ ...c, kind: 'choice' as const })),
    ...eventHistory.map((e) => ({ ...e, kind: 'event' as const })),
  ].sort((a, b) => a.order - b.order);

  // Look up titles
  const chapterTitle = (chapterId: string) => {
    const ch = CHAPTERS.find((c) => c.id === chapterId);
    return ch ? ch.title : chapterId;
  };

  // Indicator table rows
  const indicatorRows = merged.map((entry, i) => {
    const tema = entry.kind === 'choice' ? chapterTitle(entry.chapterId) : entry.eventTitle;
    const label = entry.label.length > 40 ? entry.label.slice(0, 40) + '…' : entry.label;
    return [
      i + 1,
      entry.kind === 'choice' ? 'Cap.' : 'Evento',
      tema,
      label,
      fmt(entry.indicatorDeltas.fiscal),
      fmt(entry.indicatorDeltas.popular),
      fmt(entry.indicatorDeltas.congress),
      fmt(entry.indicatorDeltas.sovereignty),
    ];
  });

  // Score table rows
  const scoreRows = merged.map((entry, i) => {
    const label = entry.label.length > 40 ? entry.label.slice(0, 40) + '…' : entry.label;
    return [
      i + 1,
      label,
      fmt(entry.scoreDeltas.fiscal),
      fmt(entry.scoreDeltas.reformas),
      fmt(entry.scoreDeltas.modern),
      fmt(entry.scoreDeltas.social),
      fmt(entry.scoreDeltas.defesa),
      fmt(entry.scoreDeltas.diplo),
      fmt(entry.scoreDeltas.saude),
      fmt(entry.scoreDeltas.educ),
      fmt(entry.scoreDeltas.idone),
    ];
  });

  return (
    <ReportShell
      title="Histórico de Decisões"
      eyebrow="Gabinete da Presidência"
      color="var(--gold)"
      onClose={onClose}
    >
      {/* Section 01: Resumo */}
      <Section num="01" title="Resumo">
        <StatGrid>
          <StatCard
            value={choices.length + eventHistory.length}
            label="Total de decisões"
          />
          <StatCard
            value={currentPhase}
            label="Fase atual"
          />
          <StatCard
            value={totalScore(scores)}
            label="Pontuação parcial"
          />
          <StatCard
            value={eventHistory.length}
            label="Eventos aleatórios"
          />
        </StatGrid>
      </Section>

      {/* Section 02: Registro Completo */}
      <Section num="02" title="Registro Completo">
        {merged.length === 0 ? (
          <Callout type="info">
            Nenhuma decisão tomada ainda. Continue jogando para ver o histórico aqui.
          </Callout>
        ) : (
          <DataTable
            headers={['#', 'Tipo', 'Tema', 'Decisão', 'Fisc.', 'Pop.', 'Cong.', 'Sob.']}
            rows={indicatorRows}
          />
        )}
      </Section>

      {/* Section 03: Impacto nas 9 Dimensões */}
      <Section num="03" title="Impacto nas 9 Dimensões">
        {merged.length === 0 ? (
          <Callout type="info">
            Nenhuma decisão tomada ainda. Continue jogando para ver o histórico aqui.
          </Callout>
        ) : (
          <DataTable
            headers={['#', 'Decisão', 'Fiscal', 'Reform.', 'Mod.', 'Social', 'Def.', 'Diplo.', 'Saúde', 'Educ.', 'Idon.']}
            rows={scoreRows}
          />
        )}
      </Section>

      {/* Section 04: Estado Acumulado */}
      <Section num="04" title="Estado Acumulado">
        <StatGrid>
          {SCORE_DIMENSIONS.map((dim) => (
            <StatCard
              key={dim.key}
              value={scores[dim.key]}
              unit={`/${dim.max}`}
              label={dim.label}
              color={dim.color}
            />
          ))}
        </StatGrid>
        <HorizBar
          items={[
            { label: 'Saúde Fiscal', value: indicators.fiscal, max: 100, color: 'var(--purple)' },
            { label: 'Aprovação Popular', value: indicators.popular, max: 100, color: 'var(--green)' },
            { label: 'Apoio Congresso', value: indicators.congress, max: 100, color: 'var(--amber)' },
            { label: 'Soberania', value: indicators.sovereignty, max: 100, color: 'var(--coral)' },
          ]}
        />
      </Section>
    </ReportShell>
  );
}
