import { useGameStore } from '../engine/gameState';
import { motion } from 'framer-motion';
import './IndicatorPanel.css';

const INDICATOR_META = [
  { key: 'fiscal' as const, label: 'Saúde Fiscal', color: 'var(--purple)', icon: '💰' },
  { key: 'popular' as const, label: 'Aprovação Popular', color: 'var(--green)', icon: '👥' },
  { key: 'congress' as const, label: 'Apoio do Congresso', color: 'var(--amber)', icon: '🏛️' },
  { key: 'sovereignty' as const, label: 'Soberania', color: 'var(--coral)', icon: '🌎' },
];

export default function IndicatorPanel() {
  const indicators = useGameStore(s => s.indicators);
  const phase = useGameStore(s => s.currentPhase);
  const turn = useGameStore(s => s.turnCount);
  const fiscalWarningTurns = useGameStore(s => s.fiscalWarningTurns);

  return (
    <div className="indicator-panel">
      <div className="ip-header">
        <span className="ip-eyebrow">Indicadores</span>
        <span className="ip-phase">Fase {phase} · Turno {turn}</span>
      </div>

      {/* Fiscal crisis alert banner */}
      {fiscalWarningTurns > 0 && (
        <motion.div
          className="ip-fiscal-alert"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="ip-fiscal-alert-icon">🚨</div>
          <div className="ip-fiscal-alert-content">
            <strong className="ip-fiscal-alert-title">CRISE FISCAL</strong>
            <span className="ip-fiscal-alert-text">
              {fiscalWarningTurns === 1
                ? 'O orçamento está em colapso. Você tem 2 capítulos para reverter ou sofrerá impeachment. Popular e Congresso caíram -20.'
                : 'ÚLTIMO AVISO — mais 1 capítulo abaixo do mínimo fiscal e você será destituído. Popular e Congresso caíram -20.'}
            </span>
            <span className="ip-fiscal-alert-counter">
              Turnos em crise: {fiscalWarningTurns}/3
            </span>
          </div>
        </motion.div>
      )}

      {INDICATOR_META.map(m => {
        const value = indicators[m.key];
        const danger = (m.key === 'congress' || m.key === 'fiscal') && value < 25;
        const fiscalCrisis = m.key === 'fiscal' && fiscalWarningTurns > 0;
        return (
          <div key={m.key} className={`ip-item ${danger ? 'ip-danger' : ''} ${fiscalCrisis ? 'ip-fiscal-crisis' : ''}`}>
            <div className="ip-item-header">
              <span className="ip-icon">{m.icon}</span>
              <span className="ip-label">{m.label}</span>
              <motion.span
                className="ip-value"
                style={{ color: fiscalCrisis ? 'var(--red)' : m.color }}
                key={value}
                initial={{ scale: 1.3, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {value}
              </motion.span>
            </div>
            <div className="ip-bar">
              <motion.div
                className="ip-bar-fill"
                style={{ backgroundColor: fiscalCrisis ? 'var(--red)' : m.color }}
                initial={false}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            {danger && !fiscalCrisis && (
              <div className="ip-warning">
                {m.key === 'congress' ? 'Risco de impeachment' : 'Colapso fiscal — risco de impeachment'}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
