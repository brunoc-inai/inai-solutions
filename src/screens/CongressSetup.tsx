import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore, type CongressComposition } from '../engine/gameState';
import './SetupScreens.css';

const OPTIONS: { id: CongressComposition; label: string; desc: string; detail: string; color: string }[] = [
  {
    id: 'esquerda',
    label: 'Coligação de Esquerda',
    desc: 'PT, PSOL, PCdoB e aliados controlam a Câmara e Senado.',
    detail: 'Congresso +55 pts base. Reformas fiscais mais difíceis. Programas sociais aprovados com facilidade. Pressão por expansão de gasto.',
    color: 'var(--red)',
  },
  {
    id: 'centro',
    label: 'Coligação de Centro',
    desc: 'MDB, PSD, União Brasil e partidos pragmáticos dominam.',
    detail: 'Congresso +60 pts base. Governabilidade por negociação. Tudo tem preço — emendas, ministérios, cargos. Flexível mas caro.',
    color: 'var(--amber)',
  },
  {
    id: 'direita',
    label: 'Coligação de Direita',
    desc: 'PL, PP, Republicanos e bancadas ruralista/evangélica lideram.',
    detail: 'Congresso +45 pts base. Reformas fiscais mais fáceis. Pauta de costumes pode travar agenda. Resistência a programas sociais.',
    color: 'var(--blue)',
  },
];

export default function CongressSetup() {
  const [selected, setSelected] = useState<CongressComposition | null>(null);
  const setupCongress = useGameStore(s => s.setupCongress);

  return (
    <div className="setup-screen">
      <div className="setup-cover">
        <div className="setup-cover-bg" />
        <div className="setup-cover-content">
          <span className="eyebrow">Fase 0 — Configuração</span>
          <h1>Escolha sua <em>Coligação</em></h1>
          <p className="setup-subtitle">
            Antes de governar, você precisa saber com quem está lidando.
            Sua coligação define quais decisões são possíveis e o custo político de cada uma ao longo do mandato.
          </p>
        </div>
      </div>

      <div className="setup-body">
        <div className="setup-section-label">Escolha sua coligação</div>

        <div className="setup-options-grid">
          {OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.id}
              className={`setup-card ${selected === opt.id ? 'setup-card-selected' : ''}`}
              onClick={() => setSelected(opt.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="setup-card-accent" style={{ backgroundColor: opt.color }} />
              <h3 className="setup-card-title">{opt.label}</h3>
              <p className="setup-card-desc">{opt.desc}</p>
              <div className="setup-card-detail">
                <span className="tag" style={{ background: `${opt.color}15`, color: opt.color }}>
                  {opt.detail.split('.')[0]}
                </span>
              </div>
              <p className="setup-card-footnote">{opt.detail}</p>
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.div
            className="setup-confirm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button className="setup-confirm-btn" onClick={() => setupCongress(selected)}>
              Confirmar e montar ministérios
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
