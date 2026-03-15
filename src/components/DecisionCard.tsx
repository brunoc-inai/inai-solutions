import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DecisionOption } from '../data/chapters';
import type { ProfileInfoAccess, InfoLevel } from '../engine/profileAccess';
import './DecisionCard.css';

interface Props {
  name: string;
  options: DecisionOption[];
  onChoose: (index: number, option: DecisionOption) => void;
  disabled?: boolean;
  chosen?: number | null;
  blockedIndexes?: Set<number>;
  blockReasons?: Map<number, string>;
  infoAccess?: ProfileInfoAccess;
}

function renderTag(label: string, value: number, level: InfoLevel) {
  if (value === 0) return null;
  if (level === 'hidden') return null;
  if (level === 'directional') {
    const cls = value > 0 ? 'tag-up' : 'tag-dn';
    const sign = value > 0 ? '+' : '−';
    return <span className={`tag ${cls}`}>{label} {sign}</span>;
  }
  // precise
  const cls = value > 0 ? 'tag-up' : value < 0 ? 'tag-dn' : 'tag-nt';
  const sign = value > 0 ? '+' : '';
  return <span className={`tag ${cls}`}>{label} {sign}{value}</span>;
}

function renderHiddenTag(label: string, value: number) {
  if (value === 0) return null;
  return <span className="tag tag-hidden">
    {label} ???
  </span>;
}

export default function DecisionCard({ name, options, onChoose, disabled, chosen, blockedIndexes, blockReasons, infoAccess }: Props) {
  const [selected, setSelected] = useState<number | null>(chosen ?? null);
  const [confirmed, setConfirmed] = useState(chosen !== undefined && chosen !== null);

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    onChoose(selected, options[selected]);
  };

  // Default: full access
  const access = infoAccess ?? { fiscal: 'precise' as const, popular: 'precise' as const, congress: 'precise' as const, sovereignty: 'precise' as const, reportAccessPct: 1 };

  return (
    <div className="decision-card">
      <div className="dc-header">
        <span className="dc-name">{name}</span>
      </div>
      <div className="dc-options">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isChosen = confirmed && selected === i;
          const isBlocked = blockedIndexes?.has(i) ?? false;
          const blockReason = blockReasons?.get(i) ?? '';
          return (
            <motion.button
              key={i}
              className={`dc-option ${isSelected ? 'dc-selected' : ''} ${isChosen ? 'dc-chosen' : ''} ${isBlocked ? 'dc-blocked' : ''}`}
              onClick={() => !confirmed && !disabled && !isBlocked && setSelected(i)}
              disabled={confirmed || disabled || isBlocked}
              whileHover={!confirmed && !disabled && !isBlocked ? { scale: 1.01 } : {}}
              whileTap={!confirmed && !disabled && !isBlocked ? { scale: 0.99 } : {}}
            >
              <div className="dc-opt-header">
                <span className="dc-opt-label">{opt.label}</span>
                {isChosen && <span className="dc-chosen-badge">Escolhido</span>}
                {isBlocked && <span className="dc-blocked-badge">Bloqueado</span>}
              </div>
              <p className="dc-opt-desc">{opt.description}</p>
              {isBlocked && blockReason && (
                <p className="dc-block-reason">{blockReason}</p>
              )}
              <AnimatePresence>
                {isSelected && !isBlocked && (
                  <motion.div
                    className="dc-impacts"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {opt.indicators.fiscal !== undefined && opt.indicators.fiscal !== 0 && (
                      access.fiscal === 'hidden'
                        ? renderHiddenTag('Fiscal', opt.indicators.fiscal)
                        : renderTag('Fiscal', opt.indicators.fiscal, access.fiscal)
                    )}
                    {opt.indicators.popular !== undefined && opt.indicators.popular !== 0 && (
                      access.popular === 'hidden'
                        ? renderHiddenTag('Popular', opt.indicators.popular)
                        : renderTag('Popular', opt.indicators.popular, access.popular)
                    )}
                    {opt.indicators.congress !== undefined && opt.indicators.congress !== 0 && (
                      access.congress === 'hidden'
                        ? renderHiddenTag('Congresso', opt.indicators.congress)
                        : renderTag('Congresso', opt.indicators.congress, access.congress)
                    )}
                    {opt.indicators.sovereignty !== undefined && opt.indicators.sovereignty !== 0 && (
                      access.sovereignty === 'hidden'
                        ? renderHiddenTag('Soberania', opt.indicators.sovereignty)
                        : renderTag('Soberania', opt.indicators.sovereignty, access.sovereignty)
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      {!confirmed && selected !== null && (
        <motion.div
          className="dc-confirm-area"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="dc-confirm-btn" onClick={handleConfirm}>
            Confirmar decisão
          </button>
        </motion.div>
      )}
    </div>
  );
}
