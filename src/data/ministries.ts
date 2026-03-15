/* ═══════════════════════════════════════
   Mecânica dos Ministérios
   Baseado no GDD — simulador_presidencia
   ═══════════════════════════════════════ */

// Inline type to avoid circular import with gameState
type Coalition = 'esquerda' | 'centro' | 'direita';

export type MinistrySize = 15 | 20 | 25 | 30 | 37;
export type MinistryProfile = 'tecnico' | 'academico' | 'politico' | 'centrao';

export interface MinistrySizeConfig {
  size: MinistrySize;
  label: string;
  reference: string;
  efficiency: string;
  congressImpact: number;
  costMultiplier: number;
  implementationDelay: number; // % extra delay on policy effects
}

export interface MinistryProfileConfig {
  id: MinistryProfile;
  label: string;
  description: string;
  efficiency: number;     // 0-100
  congressBonus: number;  // pts per ministry assigned
  costMultiplier: number; // 1.0 = base
  scandalRisk: number;    // 0-100 per turn
}

// Base sizes (used for display defaults)
export const MINISTRY_SIZES: MinistrySizeConfig[] = [
  {
    size: 15, label: 'Enxuto', reference: 'Singapura / Alemanha',
    efficiency: '+30% velocidade', congressImpact: -15,
    costMultiplier: 0.7, implementationDelay: 0
  },
  {
    size: 20, label: 'Compacto', reference: 'Noruega',
    efficiency: '+15% velocidade', congressImpact: -5,
    costMultiplier: 0.85, implementationDelay: 5
  },
  {
    size: 25, label: 'Moderado', reference: 'China / EUA',
    efficiency: 'Padrão', congressImpact: 0,
    costMultiplier: 1.0, implementationDelay: 10
  },
  {
    size: 30, label: 'Expandido', reference: 'Rússia / Índia',
    efficiency: '–15% velocidade', congressImpact: 8,
    costMultiplier: 1.15, implementationDelay: 20
  },
  {
    size: 37, label: 'Máximo', reference: 'Brasil atual',
    efficiency: '–30% velocidade', congressImpact: 15,
    costMultiplier: 1.35, implementationDelay: 30
  },
];

// Congress impact per coalition per size
// Centro: default values from MINISTRY_SIZES
// Direita: few ministries alienates centrão, moderate is sweet spot, maximum loses right-wing base
// Esquerda: few ministries alienates allies, grows with more ministerial seats
const SIZE_CONGRESS_BY_COALITION: Record<Coalition, Record<MinistrySize, number>> = {
  centro:   { 15: -15, 20: -5, 25: 0, 30: 8, 37: 15 },
  direita:  { 15: 0, 20: 10, 25: 5, 30: 5, 37: 0 },
  esquerda: { 15: -10, 20: -10, 25: 0, 30: 5, 37: 10 },
};

export function getCongressImpactForSize(coalition: Coalition | null, size: MinistrySize): number {
  if (!coalition) return MINISTRY_SIZES.find(m => m.size === size)!.congressImpact;
  return SIZE_CONGRESS_BY_COALITION[coalition][size];
}

export const MINISTRY_PROFILES: MinistryProfileConfig[] = [
  {
    id: 'tecnico', label: 'Técnicos e Acadêmicos',
    description: 'Servidores e especialistas experientes. Máxima eficiência, mínima articulação política.',
    efficiency: 95, congressBonus: 0, costMultiplier: 1.0, scandalRisk: 2
  },
  {
    id: 'academico', label: 'Mistura de Políticos e Técnicos',
    description: 'Equilíbrio entre competência técnica e habilidade política. Resultado razoável.',
    efficiency: 85, congressBonus: 2, costMultiplier: 1.05, scandalRisk: 3
  },
  {
    id: 'politico', label: 'Satisfazer a Coligação',
    description: 'Mais políticos, menos técnicos. Apoio no Congresso, custo fiscal elevado.',
    efficiency: 60, congressBonus: 7, costMultiplier: 1.20, scandalRisk: 10
  },
  {
    id: 'centrao', label: 'Uso Político Total',
    description: 'Sem técnicos líderes. Máximo apoio congressional, máximo custo e risco de escândalo.',
    efficiency: 40, congressBonus: 10, costMultiplier: 1.40, scandalRisk: 20
  },
];

// Dynamic description for the "centrao" profile based on coalition
export function getCentraoDescription(coalition: Coalition | null): string {
  if (coalition === 'centro') {
    return 'Sem técnicos líderes. Ganha apoio total do centro além da coligação. Máximo custo e risco.';
  }
  if (coalition === 'esquerda' || coalition === 'direita') {
    return 'Sem técnicos líderes. Expande alianças na direita e na esquerda. Máximo custo e risco.';
  }
  return MINISTRY_PROFILES[3].description;
}
