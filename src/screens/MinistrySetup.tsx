import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../engine/gameState';
import { MINISTRY_SIZES, MINISTRY_PROFILES, getCentraoDescription, type MinistrySize, type MinistryProfile } from '../data/ministries';
import ReportEstrutura from '../components/reports/ReportEstrutura';
import './SetupScreens.css';

export default function MinistrySetup() {
  const [size, setSize] = useState<MinistrySize | null>(null);
  const [profile, setProfile] = useState<MinistryProfile | null>(null);
  const [showReport, setShowReport] = useState(false);
  const setupMinistry = useGameStore(s => s.setupMinistry);
  const congress = useGameStore(s => s.congressComposition);

  return (
    <div className="setup-screen">
      <div className="setup-cover">
        <div className="setup-cover-bg" />
        <div className="setup-cover-content">
          <span className="eyebrow">Fase 0 — Configuração</span>
          <h1>Montando os <em>Ministérios</em></h1>
          <p className="setup-subtitle">
            Com uma coligação de {congress === 'esquerda' ? 'esquerda' : congress === 'centro' ? 'centro' : 'direita'},
            agora defina o tamanho e perfil do seu gabinete. Cada escolha tem um trade-off
            entre eficiência, custo e apoio político.
          </p>
        </div>
      </div>

      <div className="setup-body">
        {/* SIZE */}
        <div className="setup-section-label" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          Número de ministérios
          <button
            className="setup-report-btn"
            onClick={() => setShowReport(true)}
          >
            Relatório Casa Civil
          </button>
        </div>
        <p className="setup-hint">
          Com 37 ministérios (Brasil atual), cada política demora +30% para gerar impacto.
          Singapura governa com 15 e tem CPI de 85/100 vs. Brasil com 35/100.
        </p>

        <div className="ministry-scale">
          {MINISTRY_SIZES.map((ms, i) => (
            <motion.button
              key={ms.size}
              className={`ms-card ${size === ms.size ? 'ms-card-selected' : ''}`}
              onClick={() => setSize(ms.size)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="ms-num">{ms.size}</div>
              <div className="ms-ref">{ms.reference}</div>
              <div className="ms-label">{ms.label}</div>
              <div className="ms-eff">{ms.efficiency}</div>
            </motion.button>
          ))}
        </div>

        {/* PROFILE */}
        <div className="setup-section-label" style={{ marginTop: 40 }}>Perfil dos ministros</div>
        <p className="setup-hint">
          Um ministério com político do centrão gera custo de 20–40% acima do orçamento-base,
          latência de 30% e risco de escândalo que consome todo o ganho de apoio.
        </p>

        <div className="profile-grid">
          {MINISTRY_PROFILES.map((mp, i) => {
            const desc = mp.id === 'centrao' ? getCentraoDescription(congress) : mp.description;
            return (
              <motion.button
                key={mp.id}
                className={`profile-card ${profile === mp.id ? 'profile-card-selected' : ''}`}
                onClick={() => setProfile(mp.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <h4 className="profile-title">{mp.label}</h4>
                <p className="profile-desc">{desc}</p>
                <div className="profile-stats">
                  <div className="profile-stat">
                    <span className="profile-stat-label">Eficiência</span>
                    <span className="profile-stat-value">{mp.efficiency}%</span>
                  </div>
                  <div className="profile-stat">
                    <span className="profile-stat-label">Congresso</span>
                    <span className="profile-stat-value">+{mp.congressBonus}/min</span>
                  </div>
                  <div className="profile-stat">
                    <span className="profile-stat-label">Custo</span>
                    <span className="profile-stat-value">×{mp.costMultiplier}</span>
                  </div>
                  <div className="profile-stat">
                    <span className="profile-stat-label">Risco escândalo</span>
                    <span className="profile-stat-value" style={{ color: mp.scandalRisk > 10 ? 'var(--red)' : 'inherit' }}>
                      {mp.scandalRisk}%
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {size && profile && (
          <motion.div
            className="setup-confirm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              className="setup-confirm-btn"
              onClick={() => setupMinistry(size, profile)}
            >
              Iniciar mandato
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showReport && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowReport(false)} />
            <motion.div
              style={{ position: 'relative', width: '100%', maxWidth: 700, height: '100%', overflow: 'auto', background: 'var(--paper, #f5f1eb)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <ReportEstrutura onClose={() => setShowReport(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
