/* ═══════════════════════════════════════
   Regras de Bloqueio por Coligação e Ministério
   Cada coligação impede certas decisões
   Ministérios grandes bloqueiam reformas complexas
   ═══════════════════════════════════════ */

import type { CongressComposition } from './gameState';
import type { MinistrySize } from '../data/ministries';

export interface BlockedOption {
  decisionId: string;
  optionIndex: number;
  reason: string;
}

// ── Esquerda: não pode fazer austeridade extrema / reformas liberais ──
const LEFT_BLOCKS: BlockedOption[] = [
  { decisionId: 'meta_fiscal', optionIndex: 0, reason: 'Coligação de esquerda não aprova superávit fiscal agressivo' },
  { decisionId: 'idade_minima', optionIndex: 0, reason: 'Coligação de esquerda bloqueia corte radical na previdência' },
  { decisionId: 'clt', optionIndex: 0, reason: 'Coligação de esquerda não aceita prevalência do negociado sobre legislado' },
  { decisionId: 'clt', optionIndex: 2, reason: 'Coligação de esquerda bloqueia reforma trabalhista ampla (Ouro)' },
  { decisionId: 'clt', optionIndex: 3, reason: 'Coligação de esquerda bloqueia reforma trabalhista média (Prata)' },
  { decisionId: 'clt', optionIndex: 4, reason: 'Coligação de esquerda bloqueia reforma trabalhista (Bronze)' },
  { decisionId: 'estabilidade', optionIndex: 0, reason: 'Coligação de esquerda não aceita fim da estabilidade do servidor' },
  { decisionId: 'imposto_renda', optionIndex: 1, reason: 'Coligação de esquerda não aprova flat tax' },
  { decisionId: 'bc_autonomia', optionIndex: 0, reason: 'Coligação de esquerda não aceita autonomia total do BC' },
  { decisionId: 'modelo_seg', optionIndex: 0, reason: 'Coligação de esquerda não aceita modelo de inteligência israelense' },
  { decisionId: 'modelo_seg', optionIndex: 4, reason: 'Coligação de esquerda bloqueia encarceramento massivo (Bukele)' },
];

// ── Direita: não pode fazer expansão estatal forte / gasto social pesado ──
const RIGHT_BLOCKS: BlockedOption[] = [
  { decisionId: 'meta_fiscal', optionIndex: 3, reason: 'Coligação de direita não aprova expansão de gasto público' },
  { decisionId: 'prioridade_infra', optionIndex: 2, reason: 'Coligação de direita bloqueia saneamento estatal universal' },
  { decisionId: 'sus', optionIndex: 0, reason: 'Coligação de direita não aprova aumento massivo de gasto com saúde' },
  { decisionId: 'prioridade_educ', optionIndex: 2, reason: 'Coligação de direita bloqueia expansão de universidades federais' },
  { decisionId: 'modelo_seg', optionIndex: 3, reason: 'Coligação de direita não aceita descriminalização de drogas' },
  { decisionId: 'bc_autonomia', optionIndex: 3, reason: 'Coligação de direita não aprova pressão pública por juros baixos' },
  { decisionId: 'estabilidade', optionIndex: 5, reason: 'Coligação de direita não aceita expansão do funcionalismo público' },
];

// ── Direita: bloqueios em eventos aleatórios ──
const RIGHT_EVENT_BLOCKS: BlockedOption[] = [
  { decisionId: 'pandemia', optionIndex: 0, reason: 'Coligação de direita não aprova lockdown nacional' },
  { decisionId: 'desastre_natural', optionIndex: 0, reason: 'Coligação de direita não aprova mobilização federal total' },
];

// ── Esquerda: bloqueios em eventos aleatórios ──
const LEFT_EVENT_BLOCKS: BlockedOption[] = [
  { decisionId: 'fuga_capitais', optionIndex: 0, reason: 'Coligação de esquerda não aprova pacote de austeridade fiscal' },
  { decisionId: 'greve_geral', optionIndex: 1, reason: 'Coligação de esquerda não enfrenta greve com repressão' },
  { decisionId: 'conflito_fronteira', optionIndex: 0, reason: 'Coligação de esquerda não aprova mobilização militar imediata' },
  { decisionId: 'desastre_natural', optionIndex: 2, reason: 'Coligação de esquerda não aceita resposta mínima a desastre humanitário' },
];

// ── Centro: bloqueios estáticos + dinâmicos ──
const CENTER_BLOCKS: BlockedOption[] = [
  { decisionId: 'estabilidade', optionIndex: 5, reason: 'Coligação de centro não aceita expansão do funcionalismo público' },
];

// Opções com impacto no congresso <= threshold são bloqueadas quando apoio é baixo
const CENTER_CONGRESS_THRESHOLD = -8; // opções com impacto congress <= -8
const CENTER_CONGRESS_MIN = 40;       // bloqueado quando congresso < 40

export function getBlockedDecisionOptions(
  coalition: CongressComposition | null,
  decisionId: string,
  options: { indicators: { congress?: number } }[],
  congressScore: number,
): Set<number> {
  const blocked = new Set<number>();
  if (!coalition) return blocked;

  // Static blocks
  const staticBlocks = coalition === 'esquerda' ? LEFT_BLOCKS
    : coalition === 'direita' ? RIGHT_BLOCKS
    : coalition === 'centro' ? CENTER_BLOCKS
    : [];

  for (const block of staticBlocks) {
    if (block.decisionId === decisionId) {
      blocked.add(block.optionIndex);
    }
  }

  // Centro: dynamic blocks based on congress score
  if (coalition === 'centro' && congressScore < CENTER_CONGRESS_MIN) {
    options.forEach((opt, i) => {
      const congressImpact = opt.indicators.congress ?? 0;
      if (congressImpact <= CENTER_CONGRESS_THRESHOLD) {
        blocked.add(i);
      }
    });
  }

  return blocked;
}

export function getBlockedEventOptions(
  coalition: CongressComposition | null,
  eventId: string,
  options: { indicators: { congress?: number } }[],
  congressScore: number,
): Set<number> {
  const blocked = new Set<number>();
  if (!coalition) return blocked;

  // Static event blocks
  const staticBlocks = coalition === 'esquerda' ? LEFT_EVENT_BLOCKS
    : coalition === 'direita' ? RIGHT_EVENT_BLOCKS
    : [];

  for (const block of staticBlocks) {
    if (block.decisionId === eventId) {
      blocked.add(block.optionIndex);
    }
  }

  // Centro: dynamic blocks for events too
  if (coalition === 'centro' && congressScore < CENTER_CONGRESS_MIN) {
    options.forEach((opt, i) => {
      const congressImpact = opt.indicators.congress ?? 0;
      if (congressImpact <= CENTER_CONGRESS_THRESHOLD) {
        blocked.add(i);
      }
    });
  }

  return blocked;
}

export function getBlockReason(
  coalition: CongressComposition | null,
  decisionId: string,
  optionIndex: number,
  congressScore: number,
  congressImpact: number,
  ministrySize?: MinistrySize | null,
): string {
  if (!coalition) return '';

  // Check ministry size blocks first (takes priority)
  if (ministrySize) {
    const sizeBlocks = getSizeBlockedOptions(ministrySize, decisionId);
    if (sizeBlocks.has(optionIndex)) {
      return `Ineficiência ministerial (${ministrySize} ministérios) impede a implementação desta reforma`;
    }
  }

  // Check static blocks
  const allBlocks = [
    ...(coalition === 'esquerda' ? [...LEFT_BLOCKS, ...LEFT_EVENT_BLOCKS] : []),
    ...(coalition === 'direita' ? [...RIGHT_BLOCKS, ...RIGHT_EVENT_BLOCKS] : []),
    ...(coalition === 'centro' ? CENTER_BLOCKS : []),
  ];

  const match = allBlocks.find(b => b.decisionId === decisionId && b.optionIndex === optionIndex);
  if (match) return match.reason;

  // Centro dynamic
  if (coalition === 'centro' && congressScore < CENTER_CONGRESS_MIN && congressImpact <= CENTER_CONGRESS_THRESHOLD) {
    return `Apoio do Congresso muito baixo (${congressScore}%) para aprovar medida controversa`;
  }

  return '';
}

/* ── Bloqueio por tamanho do ministério ──
   Ministérios grandes = ineficiência administrativa
   Quanto maior, mais reformas ficam travadas.
   >= 25: Reforma da Saúde Pública travada (SUS — só manter orçamento atual)
   >= 30: Modernização CLT travada (só manter CLT atual)
   >= 37: Previdência travada (só não reformar)
*/

interface SizeBlockConfig {
  minSize: MinistrySize;
  decisionId: string;
  allowedOptionIndex: number; // only this option remains available
  totalOptions: number;       // total options in the decision
}

const SIZE_BLOCKS: SizeBlockConfig[] = [
  // >= 25 ministérios: SUS reform blocked — only "Manter orçamento atual" (index 3)
  { minSize: 25, decisionId: 'sus', allowedOptionIndex: 3, totalOptions: 4 },
  // >= 30 ministérios: CLT reform blocked — only "Manter CLT atual" (index 5)
  { minSize: 30, decisionId: 'clt', allowedOptionIndex: 5, totalOptions: 6 },
  // >= 37 ministérios: Previdência blocked — only "Não reformar" (index 3)
  { minSize: 37, decisionId: 'idade_minima', allowedOptionIndex: 3, totalOptions: 4 },
];

export function getSizeBlockedOptions(
  ministrySize: MinistrySize | null,
  decisionId: string,
): Set<number> {
  const blocked = new Set<number>();
  if (!ministrySize) return blocked;

  for (const cfg of SIZE_BLOCKS) {
    if (ministrySize >= cfg.minSize && decisionId === cfg.decisionId) {
      for (let i = 0; i < cfg.totalOptions; i++) {
        if (i !== cfg.allowedOptionIndex) blocked.add(i);
      }
    }
  }

  return blocked;
}

/* ── Multiplicador de congresso por coligação ──
   Reformas de corte: direita paga 1/4 do custo político, esquerda paga 2x
   Expansão social: esquerda ganha mais congresso, direita ganha menos
   Centro: sem modificação
*/

type DecisionCategory = 'reform' | 'expansion' | 'neutral';

const DECISION_CATEGORIES: Record<string, DecisionCategory> = {
  // Reformas de corte / austeridade
  meta_fiscal: 'reform',
  idade_minima: 'reform',
  militares: 'reform',
  clt: 'reform',
  estabilidade: 'reform',
  imposto_renda: 'reform',
  emendas: 'reform',
  // Expansão social
  sus: 'expansion',
  bolsa_familia: 'expansion',
  prioridade_educ: 'expansion',
};

const CONGRESS_MULTIPLIERS: Record<CongressComposition, Record<DecisionCategory, number>> = {
  esquerda: { reform: 2.0, expansion: 1.5, neutral: 1.0 },
  centro:   { reform: 1.0, expansion: 1.0, neutral: 1.0 },
  direita:  { reform: 0.25, expansion: 0.5, neutral: 1.0 },
};

/**
 * Returns the congress multiplier for a given coalition and decision.
 * Applied to the congress indicator delta of each option.
 */
export function getCongressMultiplier(
  coalition: CongressComposition | null,
  decisionId: string,
): number {
  if (!coalition) return 1.0;
  const category = DECISION_CATEGORIES[decisionId] ?? 'neutral';
  return CONGRESS_MULTIPLIERS[coalition][category];
}
