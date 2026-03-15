import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MINISTERS } from '../data/ministers';
import { useGameStore } from '../engine/gameState';
import { isReportAccessible, getProfileAccess } from '../engine/profileAccess';
import ReportDefesa from './reports/ReportDefesa';
import ReportDiplomacia from './reports/ReportDiplomacia';
import ReportCortes from './reports/ReportCortes';
import ReportBalanca from './reports/ReportBalanca';
import ReportFiscal from './reports/ReportFiscal';
import ReportEstrutura from './reports/ReportEstrutura';
import ReportPobreza from './reports/ReportPobreza';
import ReportCompetitividade from './reports/ReportCompetitividade';
import ReportReformaTrab from './reports/ReportReformaTrab';
import ReportSaude from './reports/ReportSaude';
import ReportEducacao from './reports/ReportEducacao';
import ReportCriminalidade from './reports/ReportCriminalidade';
import ReportDemografico from './reports/ReportDemografico';
import ReportDecisionHistory from './reports/ReportDecisionHistory';
import ReportScoringExplainer from './reports/ReportScoringExplainer';
import ReportDRE from './reports/ReportDRE';
import ReportAdminReference from './reports/ReportAdminReference';
import ReportMonteCarloSim from './reports/ReportMonteCarloSim';
import './MinisterConsult.css';

const REPORT_COMPONENTS: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  'brasil-defesa': ReportDefesa,
  'diplomacia': ReportDiplomacia,
  'cortes': ReportCortes,
  'balanca': ReportBalanca,
  'fiscal': ReportFiscal,
  'estrutura-gov': ReportEstrutura,
  'pobreza': ReportPobreza,
  'competitividade': ReportCompetitividade,
  'reforma-trab': ReportReformaTrab,
  'saude': ReportSaude,
  'educacao': ReportEducacao,
  'criminalidade': ReportCriminalidade,
  'demografico': ReportDemografico,
  'decision-history': ReportDecisionHistory,
  'scoring-explainer': ReportScoringExplainer,
  'dre': ReportDRE,
  'admin-ref': ReportAdminReference,
  'monte-carlo': ReportMonteCarloSim,
};

export default function MinisterConsult() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMinister, setSelectedMinister] = useState<string | null>(null);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const ministryProfile = useGameStore(s => s.ministryProfile);
  const profileAccess = useMemo(() => getProfileAccess(ministryProfile), [ministryProfile]);

  // Filter ministers' reports based on profile access
  const filteredMinisters = useMemo(() => {
    return MINISTERS.map(m => ({
      ...m,
      reports: m.reports.filter(r => isReportAccessible(r.id, ministryProfile)),
    }));
  }, [ministryProfile]);

  const minister = filteredMinisters.find(m => m.id === selectedMinister);

  const handleOpenReport = (reportId: string) => {
    setActiveReport(reportId);
  };

  const [openedViaTool, setOpenedViaTool] = useState(false);

  const handleCloseReport = () => {
    setActiveReport(null);
    if (openedViaTool) {
      setIsOpen(false);
      setOpenedViaTool(false);
    }
  };

  const handleBack = () => {
    if (activeReport) {
      setActiveReport(null);
    } else if (selectedMinister) {
      setSelectedMinister(null);
    } else {
      setIsOpen(false);
    }
  };

  const handleOpenTool = (reportId: string) => {
    setSelectedMinister(null);
    setActiveReport(reportId);
    setOpenedViaTool(true);
    setIsOpen(true);
  };

  const ReportComponent = activeReport ? REPORT_COMPONENTS[activeReport] : null;

  return (
    <>
      {/* Fixed top-right button group */}
      <div className="mc-button-group">
        <button className="mc-trigger" onClick={() => setIsOpen(true)}>
          <span className="mc-trigger-icon">📋</span>
          <span className="mc-trigger-label">Consultar Ministros</span>
        </button>

        <div className="mc-tools-row">
          <button className="mc-tool-btn" onClick={() => handleOpenTool('decision-history')} title="Histórico de Decisões">
            <span>📊</span>
            <span className="mc-tool-btn-label">Histórico</span>
          </button>
          <button className="mc-tool-btn" onClick={() => handleOpenTool('dre')} title="DRE Governamental">
            <span>💹</span>
            <span className="mc-tool-btn-label">DRE</span>
          </button>
          <button className="mc-tool-btn" onClick={() => handleOpenTool('scoring-explainer')} title="Como Funciona">
            <span>📖</span>
            <span className="mc-tool-btn-label">Manual</span>
          </button>
          <button className="mc-tool-btn mc-tool-btn-admin" onClick={() => handleOpenTool('admin-ref')} title="Referência ADM">
            <span>🔧</span>
            <span className="mc-tool-btn-label">ADM</span>
          </button>
          <button className="mc-tool-btn mc-tool-btn-admin" onClick={() => handleOpenTool('monte-carlo')} title="Simulação Monte Carlo">
            <span>🎲</span>
            <span className="mc-tool-btn-label">SIM</span>
          </button>
        </div>
      </div>

      {/* Overlay panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mc-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mc-backdrop" onClick={() => { setActiveReport(null); setSelectedMinister(null); setIsOpen(false); }} />
            <motion.div
              className="mc-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Report view */}
              {ReportComponent && (
                <div className="mc-report-view">
                  <ReportComponent onClose={handleCloseReport} />
                </div>
              )}

              {/* Minister detail */}
              {!ReportComponent && minister && (
                <div className="mc-detail">
                  <div className="mc-detail-header">
                    <button className="mc-back" onClick={handleBack}>← Voltar</button>
                    <button className="mc-close-x" onClick={() => { setSelectedMinister(null); setIsOpen(false); }}>✕</button>
                  </div>
                  <div className="mc-detail-hero" style={{ borderLeftColor: minister.color }}>
                    <span className="mc-detail-icon">{minister.icon}</span>
                    <div>
                      <div className="mc-detail-title">{minister.title}</div>
                      <div className="mc-detail-name">{minister.name}</div>
                    </div>
                  </div>
                  <p className="mc-detail-desc">{minister.description}</p>

                  {minister.reports.length > 0 ? (
                    <div className="mc-reports-list">
                      <div className="mc-reports-label">Relatórios disponíveis</div>
                      {minister.reports.map(r => (
                        <button
                          key={r.id}
                          className="mc-report-btn"
                          onClick={() => handleOpenReport(r.id)}
                        >
                          <span className="mc-report-btn-icon">📄</span>
                          <span className="mc-report-btn-label">{r.label}</span>
                          <span className="mc-report-btn-arrow">→</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mc-no-reports">
                      <span className="mc-no-reports-icon">🔒</span>
                      <p>
                        {profileAccess.reportAccessPct === 0
                          ? 'Ministério ocupado por indicação política — nenhum relatório técnico foi produzido.'
                          : profileAccess.reportAccessPct < 1
                            ? 'Relatórios deste ministério foram bloqueados pela falta de quadros técnicos.'
                            : 'Relatórios deste ministério ainda não foram preparados pela equipe técnica.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Minister list */}
              {!ReportComponent && !minister && (
                <div className="mc-list">
                  <div className="mc-list-header">
                    <div>
                      <span className="mc-list-eyebrow">Gabinete Presidencial</span>
                      <h2 className="mc-list-title">Consultar Ministros</h2>
                    </div>
                    <button className="mc-close-x" onClick={() => setIsOpen(false)}>✕</button>
                  </div>
                  <p className="mc-list-desc">
                    Solicite relatórios detalhados aos seus ministros para tomar decisões informadas.
                  </p>

                  {profileAccess.reportAccessPct < 1 && (
                    <p className="mc-list-desc" style={{ color: 'var(--red)', fontSize: '0.8rem', marginTop: '-0.5rem' }}>
                      {profileAccess.reportAccessPct === 0
                        ? 'Seu perfil ministerial (Centrão) não preparou nenhum relatório técnico.'
                        : `Seu perfil ministerial reduziu o acesso a relatórios (${Math.round(profileAccess.reportAccessPct * 100)}% disponíveis).`}
                    </p>
                  )}
                  <div className="mc-ministers">
                    {filteredMinisters.map((m, i) => (
                      <motion.button
                        key={m.id}
                        className="mc-minister-card"
                        onClick={() => setSelectedMinister(m.id)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <span className="mc-minister-icon">{m.icon}</span>
                        <div className="mc-minister-info">
                          <span className="mc-minister-title">{m.title}</span>
                          <span className="mc-minister-name">{m.name}</span>
                        </div>
                        <span className="mc-minister-badge" style={{ color: m.color }}>
                          {m.reports.length > 0 ? `${m.reports.length} doc${m.reports.length > 1 ? 's' : ''}` : '—'}
                        </span>
                        <span className="mc-minister-arrow">›</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
