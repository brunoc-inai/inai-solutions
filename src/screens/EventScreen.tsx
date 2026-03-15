import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../engine/gameState';
import { getBlockedEventOptions, getBlockReason } from '../engine/coalitionRules';
import { getProfileAccess } from '../engine/profileAccess';
import type { InfoLevel } from '../engine/profileAccess';
import './EventScreen.css';

function renderEventTag(label: string, value: number, level: InfoLevel) {
  if (value === 0) return null;
  if (level === 'hidden') return (
    <span className="tag tag-hidden">{label} ???</span>
  );
  if (level === 'directional') {
    const cls = value > 0 ? 'tag-up' : 'tag-dn';
    const sign = value > 0 ? '+' : '−';
    return <span className={`tag ${cls}`}>{label} {sign}</span>;
  }
  return (
    <span className={`tag ${value > 0 ? 'tag-up' : 'tag-dn'}`}>
      {label} {value > 0 ? '+' : ''}{value}
    </span>
  );
}

export default function EventScreen() {
  const pendingEvent = useGameStore(s => s.pendingEvent);
  const resolveEvent = useGameStore(s => s.resolveEvent);
  const dismissEvent = useGameStore(s => s.dismissEvent);
  const congressComposition = useGameStore(s => s.congressComposition);
  const congressScore = useGameStore(s => s.indicators.congress);
  const ministryProfile = useGameStore(s => s.ministryProfile);
  const infoAccess = useMemo(() => getProfileAccess(ministryProfile), [ministryProfile]);
  const [selected, setSelected] = useState<number | null>(null);
  const [resolved, setResolved] = useState(false);

  if (!pendingEvent) return null;

  const blockedSet = getBlockedEventOptions(
    congressComposition, pendingEvent.id, pendingEvent.options, congressScore
  );

  const handleResolve = () => {
    if (selected === null) return;
    // Apply effects but keep pendingEvent alive so this screen stays mounted
    resolveEvent(pendingEvent.id, selected, pendingEvent.options[selected]);
    setResolved(true);
  };

  const handleContinue = () => {
    setSelected(null);
    setResolved(false);
    // Now clear the event and route back to the game flow
    dismissEvent();
  };

  return (
    <div className="event-screen">
      <div className="ev-overlay" />
      <motion.div
        className="ev-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="ev-modal-header">
          <span className="ev-type-badge">{pendingEvent.type}</span>
          <span className="ev-icon-big">{pendingEvent.icon}</span>
        </div>

        <h2 className="ev-modal-title">{pendingEvent.title}</h2>
        <p className="ev-modal-desc">{pendingEvent.description}</p>

        <div className="ev-divider" />

        <div className="ev-options">
          {pendingEvent.options.map((opt, i) => {
            const isBlocked = blockedSet.has(i);
            const blockReason = isBlocked
              ? getBlockReason(congressComposition, pendingEvent.id, i, congressScore, opt.indicators.congress ?? 0)
              : '';
            return (
              <button
                key={i}
                className={`ev-option ${selected === i ? 'ev-option-selected' : ''} ${resolved && selected === i ? 'ev-option-chosen' : ''} ${isBlocked ? 'ev-option-blocked' : ''}`}
                onClick={() => !resolved && !isBlocked && setSelected(i)}
                disabled={resolved || isBlocked}
              >
                <span className="ev-opt-label">
                  {opt.label}
                  {isBlocked && <span className="ev-blocked-badge">Bloqueado</span>}
                </span>
                <span className="ev-opt-desc">{opt.description}</span>
                {isBlocked && blockReason && (
                  <span className="ev-block-reason">{blockReason}</span>
                )}
                {selected === i && !isBlocked && (
                  <motion.div
                    className="ev-opt-impacts"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {opt.indicators.fiscal !== undefined && opt.indicators.fiscal !== 0 &&
                      renderEventTag('Fiscal', opt.indicators.fiscal, infoAccess.fiscal)}
                    {opt.indicators.popular !== undefined && opt.indicators.popular !== 0 &&
                      renderEventTag('Popular', opt.indicators.popular, infoAccess.popular)}
                    {opt.indicators.congress !== undefined && opt.indicators.congress !== 0 &&
                      renderEventTag('Congresso', opt.indicators.congress, infoAccess.congress)}
                    {opt.indicators.sovereignty !== undefined && opt.indicators.sovereignty !== 0 &&
                      renderEventTag('Soberania', opt.indicators.sovereignty, infoAccess.sovereignty)}
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {!resolved && selected !== null && (
          <motion.div
            className="ev-confirm-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button className="ev-confirm-btn" onClick={handleResolve}>
              Confirmar resposta
            </button>
          </motion.div>
        )}

        {resolved && (
          <motion.div
            className="ev-continue-area"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="ev-resolved-msg">Evento resolvido. As consequências já impactam seus indicadores.</p>
            <button className="ev-continue-btn" onClick={handleContinue}>
              Continuar
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
