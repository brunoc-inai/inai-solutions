import { motion } from 'framer-motion';
import { useGameStore } from '../engine/gameState';
import { PHASES } from '../data/chapters';
import './PhaseReport.css';

const INDICATOR_META = [
  { key: 'fiscal' as const, label: 'Saúde Fiscal', color: 'var(--purple)' },
  { key: 'popular' as const, label: 'Aprovação Popular', color: 'var(--green)' },
  { key: 'congress' as const, label: 'Apoio do Congresso', color: 'var(--amber)' },
  { key: 'sovereignty' as const, label: 'Soberania', color: 'var(--coral)' },
];

export default function PhaseReport() {
  const { indicators, scores, currentPhase, choices, advancePhase, currentChapterIndex } = useGameStore();
  const prevPhase = PHASES.find(p => p.id === currentPhase - 1) || PHASES[0];
  const nextPhase = PHASES.find(p => p.id === currentPhase);

  return (
    <div className="report-screen">
      <div className="report-cover">
        <div className="report-cover-bg" />
        <div className="report-cover-content">
          <span className="eyebrow">Relatório entre Fases</span>
          <h1>
            Fim da <em>{prevPhase.label.split('—')[1]?.trim() || prevPhase.label}</em>
          </h1>
          <p className="report-subtitle">
            Relatório de situação do seu governo antes de avançar para a próxima fase.
          </p>
        </div>
      </div>

      <div className="report-body">
        {/* Indicators */}
        <div className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">01</span>
            <h2>Indicadores Atuais</h2>
          </div>
          <div className="report-indicators">
            {INDICATOR_META.map((m, i) => {
              const value = indicators[m.key];
              const status = value > 60 ? 'Bom' : value > 35 ? 'Regular' : 'Crítico';
              const statusColor = value > 60 ? 'var(--green)' : value > 35 ? 'var(--amber)' : 'var(--red)';
              return (
                <motion.div
                  key={m.key}
                  className="report-ind-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="report-ind-top" style={{ borderTopColor: m.color }}>
                    <span className="report-ind-value" style={{ color: m.color }}>{value}</span>
                    <span className="report-ind-label">{m.label}</span>
                  </div>
                  <div className="report-ind-bar">
                    <div className="report-ind-bar-fill" style={{ width: `${value}%`, backgroundColor: m.color }} />
                  </div>
                  <span className="report-ind-status" style={{ color: statusColor }}>{status}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Warnings */}
        {indicators.congress < 30 && (
          <div className="report-callout danger">
            Apoio do Congresso em {indicators.congress}%. Abaixo de 25% o processo de impeachment será ativado.
          </div>
        )}
        {indicators.fiscal < 20 && (
          <div className="report-callout danger">
            Saúde Fiscal em {indicators.fiscal}%. Risco de downgrade de rating e espiral de juros.
          </div>
        )}
        {indicators.popular > 55 && indicators.congress > 60 && (
          <div className="report-callout ok">
            Alta popular com Congresso aliado. Janela para reformas ambiciosas.
          </div>
        )}

        {/* Choices recap */}
        <div className="report-section">
          <div className="report-section-header">
            <span className="report-section-num">02</span>
            <h2>Decisões Tomadas</h2>
          </div>
          <div className="report-choices">
            {choices.slice(-6).map((c, i) => (
              <div key={i} className="report-choice-row">
                <span className="report-choice-chapter">{c.chapterId}</span>
                <span className="report-choice-decision">{c.decisionId}</span>
                <span className="report-choice-label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next phase */}
        {nextPhase && (
          <div className="report-next">
            <div className="report-next-label">Próxima fase</div>
            <h3 className="report-next-title" style={{ color: nextPhase.color }}>
              {nextPhase.label}
            </h3>
            <p className="report-next-period">{nextPhase.period}</p>
          </div>
        )}

        <div className="report-advance">
          <button className="report-advance-btn" onClick={advancePhase}>
            Avançar para {nextPhase?.label.split('—')[0]?.trim() || 'próxima fase'}
          </button>
        </div>
      </div>
    </div>
  );
}
