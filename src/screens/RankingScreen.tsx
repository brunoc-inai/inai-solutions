import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../engine/gameState';
import { GOVERNORS, SCORE_DIMENSIONS, totalScore, type GovernorScores, type ScoreKey } from '../data/governors';
import './RankingScreen.css';

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="rk-score-cell">
      <div className="rk-mini-bar">
        <motion.div
          className="rk-mini-bar-fill"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </div>
      <span className="rk-score-num">{value}</span>
    </div>
  );
}

const COALITION_LABELS: Record<string, string> = {
  esquerda: 'Coligação de Esquerda',
  centro: 'Coligação de Centro',
  direita: 'Coligação de Direita',
};

const SIZE_CONGRESS_EXPLAIN: Record<string, string> = {
  direita: 'Impacto por tamanho (15→37): 0, +10, +5, +5, 0. Poucos ministérios = centrão fora, desastre. Compacto = direita forte + agrado ao centro. Médio/alto = perde direita, equilibra com centro. Máximo = ganho marginal baixo, perde base da direita.',
  esquerda: 'Impacto por tamanho (15→37): −10, −10, 0, +5, +10. Poucos ministérios = aliados insatisfeitos. Médio = equilíbrio. Expandido/máximo = acomoda toda a base + aliados do centro.',
  centro: 'Impacto por tamanho (15→37): −15, −5, 0, +8, +15. Valores padrão — coligação de centro se beneficia de mais ministérios pois distribui poder entre partidos pragmáticos.',
};

const PROFILE_EXPLAIN: Record<string, string> = {
  tecnico: 'Técnicos e Acadêmicos: máxima eficiência (95%), sem bônus congressional, risco mínimo (2%).',
  academico: 'Mistura de Políticos e Técnicos: boa eficiência (85%), bônus moderado (+2/min), risco baixo (3%).',
  politico: 'Satisfazer a Coligação: eficiência reduzida (60%), bônus alto (+7/min), risco médio (10%).',
  centrao: 'Uso Político Total: eficiência mínima (40%), bônus máximo (+10/min), risco alto (20%).',
};

function PerformanceReport({ onClose }: { onClose: () => void }) {
  const { choices, eventHistory, congressComposition, indicators, scores, ministrySize, ministryProfile } = useGameStore();

  // Merge choices + events into single chronological list
  const allDecisions = useMemo(() => {
    const items: {
      order: number;
      label: string;
      source: string;
      indicatorDeltas: Record<string, number>;
      scoreDeltas: Record<string, number>;
      phase?: number;
    }[] = [];

    choices.forEach(c => {
      items.push({
        order: c.order,
        label: c.label,
        source: c.chapterId,
        indicatorDeltas: c.indicatorDeltas as Record<string, number>,
        scoreDeltas: c.scoreDeltas as Record<string, number>,
        phase: c.phase,
      });
    });

    eventHistory.forEach(e => {
      items.push({
        order: e.order,
        label: e.label,
        source: e.eventTitle,
        indicatorDeltas: e.indicatorDeltas as Record<string, number>,
        scoreDeltas: e.scoreDeltas as Record<string, number>,
      });
    });

    return items.sort((a, b) => a.order - b.order);
  }, [choices, eventHistory]);

  // Accumulated impact
  const totalIndicators = useMemo(() => {
    const acc = { fiscal: 0, popular: 0, congress: 0, sovereignty: 0 };
    allDecisions.forEach(d => {
      acc.fiscal += d.indicatorDeltas.fiscal || 0;
      acc.popular += d.indicatorDeltas.popular || 0;
      acc.congress += d.indicatorDeltas.congress || 0;
      acc.sovereignty += d.indicatorDeltas.sovereignty || 0;
    });
    return acc;
  }, [allDecisions]);

  const totalScores = useMemo(() => {
    const acc: Record<string, number> = {};
    SCORE_DIMENSIONS.forEach(d => { acc[d.key] = 0; });
    allDecisions.forEach(d => {
      Object.entries(d.scoreDeltas).forEach(([k, v]) => {
        acc[k] = (acc[k] || 0) + (v || 0);
      });
    });
    return acc;
  }, [allDecisions]);

  const fmtDelta = (v: number | undefined) => {
    if (!v) return '—';
    return v > 0 ? `+${v}` : `${v}`;
  };

  return (
    <div className="rk-perf-overlay">
      <div className="rk-perf-backdrop" onClick={onClose} />
      <motion.div
        className="rk-perf-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
      >
        <div className="rk-perf-header">
          <div>
            <span className="eyebrow">Relatório de Performance</span>
            <h2 className="rk-perf-title">Todas as Decisões Presidenciais</h2>
          </div>
          <button className="rk-perf-close" onClick={onClose}>✕</button>
        </div>

        {/* Coalition info */}
        {congressComposition && (
          <div className="rk-perf-coalition">
            <strong>{COALITION_LABELS[congressComposition]}</strong>
            <span className="rk-perf-coalition-note">
              {congressComposition === 'esquerda' && 'Base: Congresso +55, Fiscal +30. Bloqueou: austeridade extrema, reforma trabalhista forte, corte de previdência.'}
              {congressComposition === 'centro' && 'Base: Congresso +60, Fiscal +35. Restringiu: medidas controversas quando apoio baixo.'}
              {congressComposition === 'direita' && 'Base: Congresso +45, Fiscal +40. Bloqueou: expansão de gasto, saneamento estatal, gasto massivo com saúde.'}
            </span>
          </div>
        )}

        {/* Setup details */}
        {(ministrySize || ministryProfile) && (
          <div className="rk-perf-setup">
            {congressComposition && (
              <div className="rk-perf-setup-item">
                <strong>Tamanho do Gabinete:</strong> {ministrySize} ministérios
                <p className="rk-perf-setup-explain">{SIZE_CONGRESS_EXPLAIN[congressComposition]}</p>
              </div>
            )}
            {ministryProfile && (
              <div className="rk-perf-setup-item">
                <strong>Perfil dos Ministros:</strong> {PROFILE_EXPLAIN[ministryProfile]}
              </div>
            )}
          </div>
        )}

        {/* Decision log */}
        <div className="rk-perf-table-wrap">
          <table className="rk-perf-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Decisão</th>
                <th>Origem</th>
                <th>Fiscal</th>
                <th>Popular</th>
                <th>Congr.</th>
                <th>Sober.</th>
                {SCORE_DIMENSIONS.map(d => (
                  <th key={d.key} title={d.label}>{d.icon}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allDecisions.map((d, i) => (
                <tr key={i}>
                  <td className="rk-perf-num">{d.order}</td>
                  <td className="rk-perf-decision">{d.label}</td>
                  <td className="rk-perf-source">{d.source}</td>
                  <td className={`rk-perf-delta ${(d.indicatorDeltas.fiscal || 0) > 0 ? 'pos' : (d.indicatorDeltas.fiscal || 0) < 0 ? 'neg' : ''}`}>
                    {fmtDelta(d.indicatorDeltas.fiscal)}
                  </td>
                  <td className={`rk-perf-delta ${(d.indicatorDeltas.popular || 0) > 0 ? 'pos' : (d.indicatorDeltas.popular || 0) < 0 ? 'neg' : ''}`}>
                    {fmtDelta(d.indicatorDeltas.popular)}
                  </td>
                  <td className={`rk-perf-delta ${(d.indicatorDeltas.congress || 0) > 0 ? 'pos' : (d.indicatorDeltas.congress || 0) < 0 ? 'neg' : ''}`}>
                    {fmtDelta(d.indicatorDeltas.congress)}
                  </td>
                  <td className={`rk-perf-delta ${(d.indicatorDeltas.sovereignty || 0) > 0 ? 'pos' : (d.indicatorDeltas.sovereignty || 0) < 0 ? 'neg' : ''}`}>
                    {fmtDelta(d.indicatorDeltas.sovereignty)}
                  </td>
                  {SCORE_DIMENSIONS.map(dim => (
                    <td key={dim.key} className={`rk-perf-delta ${(d.scoreDeltas[dim.key] || 0) > 0 ? 'pos' : (d.scoreDeltas[dim.key] || 0) < 0 ? 'neg' : ''}`}>
                      {fmtDelta(d.scoreDeltas[dim.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="rk-perf-total-row">
                <td></td>
                <td className="rk-perf-decision"><strong>Impacto Total</strong></td>
                <td></td>
                <td className={`rk-perf-delta ${totalIndicators.fiscal > 0 ? 'pos' : totalIndicators.fiscal < 0 ? 'neg' : ''}`}>
                  {fmtDelta(totalIndicators.fiscal)}
                </td>
                <td className={`rk-perf-delta ${totalIndicators.popular > 0 ? 'pos' : totalIndicators.popular < 0 ? 'neg' : ''}`}>
                  {fmtDelta(totalIndicators.popular)}
                </td>
                <td className={`rk-perf-delta ${totalIndicators.congress > 0 ? 'pos' : totalIndicators.congress < 0 ? 'neg' : ''}`}>
                  {fmtDelta(totalIndicators.congress)}
                </td>
                <td className={`rk-perf-delta ${totalIndicators.sovereignty > 0 ? 'pos' : totalIndicators.sovereignty < 0 ? 'neg' : ''}`}>
                  {fmtDelta(totalIndicators.sovereignty)}
                </td>
                {SCORE_DIMENSIONS.map(dim => (
                  <td key={dim.key} className={`rk-perf-delta ${(totalScores[dim.key] || 0) > 0 ? 'pos' : (totalScores[dim.key] || 0) < 0 ? 'neg' : ''}`}>
                    {fmtDelta(totalScores[dim.key])}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Final state */}
        <div className="rk-perf-final">
          <div className="rk-perf-final-block">
            <h4>Indicadores Finais</h4>
            <div className="rk-perf-final-grid">
              <span className="rk-perf-kv"><strong>Fiscal:</strong> {indicators.fiscal}</span>
              <span className="rk-perf-kv"><strong>Popular:</strong> {indicators.popular}</span>
              <span className="rk-perf-kv"><strong>Congresso:</strong> {indicators.congress}</span>
              <span className="rk-perf-kv"><strong>Soberania:</strong> {indicators.sovereignty}</span>
            </div>
          </div>
          <div className="rk-perf-final-block">
            <h4>Scores Finais (9 Dimensões)</h4>
            <div className="rk-perf-final-grid">
              {SCORE_DIMENSIONS.map(d => (
                <span key={d.key} className="rk-perf-kv">
                  <strong>{d.icon} {d.label}:</strong> {scores[d.key]}/{d.max}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const IMPEACHMENT_TEXT = {
  fiscal: {
    title: 'Impeachment por Colapso Fiscal',
    message: 'Você fez escolhas agressivas que destruíram o orçamento da nação. O problema foi tanto que, mesmo tendo apoio inicial no Congresso, as forças da nação se mobilizaram para impedir que você levasse o país para um caminho de Venezuela sem volta.',
  },
  congress: {
    title: 'Impeachment por Perda de Apoio Político',
    message: 'Você pode até ser bem intencionado, mas contrariou tanto o Congresso que esqueceu que o país não pode ser governado sem ele. O Legislativo se voltou contra você e seu apoio político era tão baixo que não conseguiu os votos mínimos para se manter.',
  },
};

export default function RankingScreen() {
  const { scores, indicators, impeached, impeachmentReason, resetGame } = useGameStore();
  const playerTotal = totalScore(scores);
  const [showPerf, setShowPerf] = useState(false);
  const [showImpeachPopup, setShowImpeachPopup] = useState(impeached);

  const ranking = useMemo(() => {
    const entries = [
      ...GOVERNORS.map(g => ({
        id: g.id,
        name: g.name,
        sub: g.sub,
        period: g.period,
        scores: g.scores,
        total: totalScore(g.scores),
        isPlayer: false,
        summary: g.summary,
      })),
      {
        id: 'player',
        name: 'Você',
        sub: impeached ? 'Impeachment' : 'Simulação',
        period: '2027–2030',
        scores,
        total: playerTotal,
        isPlayer: true,
        summary: impeached
          ? 'Seu governo foi interrompido por impeachment. O Congresso votou pela sua destituição.'
          : 'Seu mandato de 4 anos chegou ao fim. O povo e a história agora julgam seu legado.',
      },
    ];
    return entries.sort((a, b) => b.total - a.total);
  }, [scores, playerTotal, impeached]);

  const playerRank = ranking.findIndex(r => r.isPlayer) + 1;

  // Grade
  const grade = playerTotal >= 80 ? 'S' : playerTotal >= 65 ? 'A' : playerTotal >= 50 ? 'B' :
    playerTotal >= 35 ? 'C' : playerTotal >= 20 ? 'D' : 'F';
  const gradeColor = grade === 'S' ? 'var(--gold)' : grade === 'A' ? 'var(--green)' :
    grade === 'B' ? 'var(--blue)' : grade === 'C' ? 'var(--amber)' : 'var(--red)';

  return (
    <div className="ranking-screen">
      {/* Cover */}
      <div className="rk-cover">
        <div className="rk-cover-bg" />
        <div className="rk-cover-content">
          <span className="eyebrow">
            {impeached ? 'Mandato encerrado por impeachment' : 'Fim do mandato'}
          </span>
          <h1>Ranking <em>Final</em></h1>
          <p className="rk-subtitle">
            Seu governo é avaliado em 9 dimensões e posicionado no ranking histórico dos
            governantes brasileiros. Saúde Fiscal tem peso duplo (20 pts) por ser o
            determinante mais robusto do bem-estar de longo prazo.
          </p>
        </div>
      </div>

      {/* Score summary */}
      <div className="rk-body">
        <div className="rk-summary-section">
          <div className="rk-summary-grid">
            <motion.div
              className="rk-summary-main"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rk-grade" style={{ color: gradeColor }}>{grade}</div>
              <div className="rk-total-score">{playerTotal}<span className="rk-total-max">/100</span></div>
              <div className="rk-rank-label">
                {playerRank}º lugar de {ranking.length} governantes
              </div>
            </motion.div>

            <div className="rk-dimensions">
              {SCORE_DIMENSIONS.map((dim, i) => (
                <motion.div
                  key={dim.key}
                  className="rk-dim-row"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <span className="rk-dim-icon">{dim.icon}</span>
                  <span className="rk-dim-label">{dim.label}</span>
                  <div className="rk-dim-bar">
                    <motion.div
                      className="rk-dim-bar-fill"
                      style={{ backgroundColor: dim.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(scores[dim.key] / dim.max) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
                    />
                  </div>
                  <span className="rk-dim-score" style={{ color: dim.color }}>
                    {scores[dim.key]}/{dim.max}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Full ranking table */}
        <div className="rk-table-section">
          <div className="rk-section-header">
            <span className="rk-section-num">02</span>
            <h2>Ranking Histórico Comparativo</h2>
          </div>

          <div className="rk-table">
            <div className="rk-table-header">
              <span className="rk-th rk-th-pos">#</span>
              <span className="rk-th rk-th-name">Governante</span>
              <span className="rk-th rk-th-total">Total</span>
              {SCORE_DIMENSIONS.map(d => (
                <span key={d.key} className="rk-th rk-th-score">{d.label.split(' ')[0].substring(0, 5)}</span>
              ))}
            </div>

            {ranking.map((entry, i) => (
              <motion.div
                key={entry.id}
                className={`rk-table-row ${entry.isPlayer ? 'rk-row-player' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.03 }}
              >
                <span className="rk-td rk-td-pos">
                  {entry.isPlayer ? '▶' : `${i + 1}º`}
                </span>
                <span className="rk-td rk-td-name">
                  <strong>{entry.name}</strong>
                  <span className="rk-td-sub">{entry.sub} · {entry.period}</span>
                </span>
                <span className="rk-td rk-td-total">{entry.total}</span>
                {SCORE_DIMENSIONS.map(d => (
                  <ScoreBar
                    key={d.key}
                    value={entry.scores[d.key]}
                    max={d.max}
                    color={d.color}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final indicators */}
        <div className="rk-final-indicators">
          <div className="rk-section-header">
            <span className="rk-section-num">03</span>
            <h2>Indicadores Finais</h2>
          </div>
          <div className="rk-final-ind-grid">
            {[
              { label: 'Saúde Fiscal', value: indicators.fiscal, color: 'var(--purple)' },
              { label: 'Aprovação Popular', value: indicators.popular, color: 'var(--green)' },
              { label: 'Apoio do Congresso', value: indicators.congress, color: 'var(--amber)' },
              { label: 'Soberania', value: indicators.sovereignty, color: 'var(--coral)' },
            ].map(ind => (
              <div key={ind.label} className="rk-final-ind">
                <span className="rk-final-ind-val" style={{ color: ind.color }}>{ind.value}</span>
                <span className="rk-final-ind-label">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="rk-restart">
          <button className="rk-perf-btn" onClick={() => setShowPerf(true)}>
            Relatório de Performance
          </button>
          <button className="rk-restart-btn" onClick={resetGame}>
            Jogar novamente
          </button>
        </div>
      </div>

      {/* Performance report overlay */}
      <AnimatePresence>
        {showPerf && <PerformanceReport onClose={() => setShowPerf(false)} />}
      </AnimatePresence>

      {/* Impeachment popup */}
      <AnimatePresence>
        {showImpeachPopup && impeachmentReason && (
          <motion.div
            className="impeach-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="impeach-modal"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="impeach-icon">
                {impeachmentReason === 'fiscal' ? '💸' : '🏛️'}
              </div>
              <h2 className="impeach-title">Você sofreu Impeachment</h2>
              <div className="impeach-reason-label">
                {IMPEACHMENT_TEXT[impeachmentReason].title}
              </div>
              <p className="impeach-message">
                {IMPEACHMENT_TEXT[impeachmentReason].message}
              </p>
              <div className="impeach-stats">
                <div className="impeach-stat">
                  <span className="impeach-stat-label">Saúde Fiscal</span>
                  <span className={`impeach-stat-value ${indicators.fiscal < 25 ? 'critical' : ''}`}>{indicators.fiscal}%</span>
                </div>
                <div className="impeach-stat">
                  <span className="impeach-stat-label">Apoio do Congresso</span>
                  <span className={`impeach-stat-value ${indicators.congress < 25 ? 'critical' : ''}`}>{indicators.congress}%</span>
                </div>
              </div>
              <button className="impeach-btn" onClick={() => setShowImpeachPopup(false)}>
                Ver ranking final
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
