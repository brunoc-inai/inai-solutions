import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { useGameStore, getCoalitionBonus } from '../engine/gameState';
import { CHAPTERS, PHASES } from '../data/chapters';
import { getBlockedDecisionOptions, getBlockReason, getSizeBlockedOptions, getCongressMultiplier } from '../engine/coalitionRules';
import { getProfileAccess, isReportAccessible } from '../engine/profileAccess';
import IndicatorPanel from '../components/IndicatorPanel';
import DecisionCard from '../components/DecisionCard';
import './ChapterScreen.css';

// Lazy-load report components (same registry as MinisterConsult)
import ReportDefesa from '../components/reports/ReportDefesa';
import ReportDiplomacia from '../components/reports/ReportDiplomacia';
import ReportCortes from '../components/reports/ReportCortes';
import ReportBalanca from '../components/reports/ReportBalanca';
import ReportFiscal from '../components/reports/ReportFiscal';
import ReportEstrutura from '../components/reports/ReportEstrutura';
import ReportPobreza from '../components/reports/ReportPobreza';
import ReportCompetitividade from '../components/reports/ReportCompetitividade';
import ReportReformaTrab from '../components/reports/ReportReformaTrab';
import ReportSaude from '../components/reports/ReportSaude';
import ReportEducacao from '../components/reports/ReportEducacao';
import ReportCriminalidade from '../components/reports/ReportCriminalidade';
import ReportDemografico from '../components/reports/ReportDemografico';
import ReportDRE from '../components/reports/ReportDRE';

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
  'dre': ReportDRE,
};

export default function ChapterScreen() {
  const { currentChapterIndex, makeDecision, advanceChapter, congressComposition, indicators, ministrySize, ministryProfile } = useGameStore();
  const infoAccess = useMemo(() => getProfileAccess(ministryProfile), [ministryProfile]);
  const chapter = CHAPTERS[currentChapterIndex];
  const phase = PHASES.find(p => p.id === chapter.phase)!;

  const [completedDecisions, setCompletedDecisions] = useState<Set<string>>(new Set());
  const [activeReport, setActiveReport] = useState<string | null>(null);

  const handleDecision = (decisionId: string, optionIndex: number, option: Parameters<typeof makeDecision>[3]) => {
    makeDecision(chapter.id, decisionId, optionIndex, option);
    setCompletedDecisions(prev => new Set(prev).add(decisionId));
  };

  const allDone = completedDecisions.size >= chapter.decisions.length;
  const ActiveReportComponent = activeReport ? REPORT_COMPONENTS[activeReport] : null;

  return (
    <div className="chapter-screen">
      {/* Header */}
      <div className="ch-screen-header" style={{ borderColor: chapter.color }}>
        <div className="ch-screen-header-inner">
          <div className="ch-screen-nav">
            <span className="eyebrow">{phase.label}</span>
            <span className="ch-screen-progress">
              Capítulo {chapter.number} de {CHAPTERS.length}
            </span>
          </div>
          <h2 className="ch-screen-title">
            <span className="ch-screen-num" style={{ color: chapter.color }}>{String(chapter.number).padStart(2, '0')}</span>
            {chapter.title}
          </h2>
          <p className="ch-screen-desc">{chapter.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="ch-screen-body">
        <div className="ch-screen-main">
          {/* Context block */}
          <div className="ch-context">
            <div className="ch-context-header">
              <h3 className="ch-context-title">{chapter.title}</h3>
              {chapter.relatedReports.length > 0 && (
                <div className="ch-context-reports">
                  {chapter.relatedReports.map(r => {
                    const accessible = isReportAccessible(r.id, ministryProfile);
                    return (
                      <button
                        key={r.id}
                        className={`ch-report-link ${!accessible ? 'ch-report-blocked' : ''}`}
                        onClick={() => accessible && setActiveReport(r.id)}
                        disabled={!accessible}
                        title={!accessible ? 'Ministério sem competência para gerar relatório a tempo' : r.label}
                      >
                        <span className="ch-report-icon">{accessible ? '📄' : '🔒'}</span>
                        <span className="ch-report-label">{r.label}</span>
                        {!accessible && <span className="ch-report-warn">Ministério sem competência para gerar relatório a tempo</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {chapter.context.split('\n\n').map((p, i) => (
              <p key={i} className="ch-context-text">{p}</p>
            ))}
          </div>

          {chapter.decisions.map((decision) => {
            // Coalition blocks
            const coalitionBlocked = getBlockedDecisionOptions(
              congressComposition, decision.id, decision.options, indicators.congress
            );
            // Ministry size blocks
            const sizeBlocked = getSizeBlockedOptions(ministrySize, decision.id);
            // Merge both sets
            const blockedSet = new Set([...coalitionBlocked, ...sizeBlocked]);

            const reasonMap = new Map<number, string>();
            blockedSet.forEach(idx => {
              const reason = getBlockReason(
                congressComposition, decision.id, idx, indicators.congress,
                decision.options[idx].indicators.congress ?? 0,
                ministrySize,
              );
              if (reason) reasonMap.set(idx, reason);
            });

            // Congress multiplier based on coalition + decision category
            const congressMultiplier = getCongressMultiplier(congressComposition, decision.id);

            // Apply coalition bonuses and congress multiplier to displayed indicators
            const adjustedOptions = decision.options.map((opt, idx) => {
              const bonus = getCoalitionBonus(congressComposition, decision.id, idx);
              const baseCongress = (opt.indicators.congress || 0) + (bonus.congress || 0);
              const adjustedCongress = Math.round(baseCongress * congressMultiplier);
              return {
                ...opt,
                indicators: {
                  fiscal: (opt.indicators.fiscal || 0) + (bonus.fiscal || 0),
                  popular: (opt.indicators.popular || 0) + (bonus.popular || 0),
                  congress: adjustedCongress,
                  sovereignty: (opt.indicators.sovereignty || 0) + (bonus.sovereignty || 0),
                },
              };
            });

            return (
              <DecisionCard
                key={decision.id}
                name={decision.name}
                options={adjustedOptions}
                onChoose={(idx, opt) => handleDecision(decision.id, idx, opt)}
                disabled={completedDecisions.has(decision.id)}
                chosen={completedDecisions.has(decision.id) ? undefined : null}
                blockedIndexes={blockedSet}
                blockReasons={reasonMap}
                infoAccess={infoAccess}
              />
            );
          })}

          {allDone && (
            <motion.div
              className="ch-screen-advance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="ch-advance-msg">
                Todas as decisões deste capítulo foram tomadas.
              </div>
              <button className="ch-advance-btn" onClick={() => {
                setCompletedDecisions(new Set());
                advanceChapter();
              }}>
                {currentChapterIndex < CHAPTERS.length - 1 ? 'Próximo capítulo' : 'Ver resultado final'}
              </button>
            </motion.div>
          )}
        </div>

        <aside className="ch-screen-sidebar">
          <IndicatorPanel />
        </aside>
      </div>

      {/* Report overlay */}
      <AnimatePresence>
        {ActiveReportComponent && (
          <motion.div
            className="ch-report-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="ch-report-backdrop" onClick={() => setActiveReport(null)} />
            <motion.div
              className="ch-report-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <ActiveReportComponent onClose={() => setActiveReport(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
