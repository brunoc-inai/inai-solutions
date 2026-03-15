import { motion } from 'framer-motion';
import { useGameStore } from '../engine/gameState';
import { CHAPTERS } from '../data/chapters';
import { EVENTS } from '../data/events';
import './TitleScreen.css';

const TOTAL_CHAPTERS = CHAPTERS.length;
const TOTAL_DECISIONS = CHAPTERS.reduce((sum, ch) => sum + ch.decisions.length, 0);
const TOTAL_EVENTS = EVENTS.length;

export default function TitleScreen() {
  const setScreen = useGameStore(s => s.setScreen);

  return (
    <div className="title-screen">
      <div className="ts-bg" />
      <div className="ts-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="ts-eyebrow">Simulador de Governo</span>
          <h1 className="ts-title">
            Eu<em>Presidente</em>
          </h1>
          <p className="ts-subtitle">
            Assuma a presidência do Brasil. Monte seu governo, tome {TOTAL_DECISIONS} decisões
            em {TOTAL_CHAPTERS} capítulos temáticos e descubra como você se compara aos governantes
            da história brasileira.
          </p>
        </motion.div>

        <motion.div
          className="ts-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="ts-meta-item">
            <span className="ts-meta-label">Mandato</span>
            <span className="ts-meta-value">4 anos</span>
          </div>
          <div className="ts-meta-item">
            <span className="ts-meta-label">Capítulos</span>
            <span className="ts-meta-value">{TOTAL_CHAPTERS} capítulos</span>
          </div>
          <div className="ts-meta-item">
            <span className="ts-meta-label">Decisões</span>
            <span className="ts-meta-value">{TOTAL_DECISIONS} escolhas</span>
          </div>
          <div className="ts-meta-item">
            <span className="ts-meta-label">Eventos</span>
            <span className="ts-meta-value">{TOTAL_EVENTS} possíveis</span>
          </div>
          <div className="ts-meta-item">
            <span className="ts-meta-label">Indicadores</span>
            <span className="ts-meta-value">4 em tempo real</span>
          </div>
          <div className="ts-meta-item">
            <span className="ts-meta-label">Ranking</span>
            <span className="ts-meta-value">17 governantes</span>
          </div>
        </motion.div>

        <motion.button
          className="ts-start-btn"
          onClick={() => setScreen('congress-setup')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Iniciar Mandato
        </motion.button>

        <motion.div
          className="ts-footer-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Baseado em dados reais: IPEA, BCB, IBGE, SIPRI, INEP, Transparência Internacional
        </motion.div>
      </div>

      <div className="ts-stamp">
        INAI DIGITAL<br />
        SIMULADOR v1.0<br />
        2026
      </div>
    </div>
  );
}
