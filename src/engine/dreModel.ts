/* ═══════════════════════════════════════
   DRE Governamental — Modelo Fiscal
   Simula resultado financeiro do governo
   ao longo dos 4 anos de mandato
   ═══════════════════════════════════════ */

import type { GovernorScores } from '../data/governors';

export interface DREYearData {
  year: number;              // 1-4
  label: string;             // "Ano 1 (2027)" etc
  receitaBase: number;       // R$ bilhões — receita líquida da União
  despesaBase: number;       // R$ bilhões — despesa total
  ajusteReceita: number;     // acumulado de decisões
  ajusteDespesa: number;     // acumulado de decisões
  receita: number;           // receitaBase + ajusteReceita
  despesa: number;           // despesaBase + ajusteDespesa
  resultadoPrimario: number; // receita - despesa
  juros: number;             // custo da dívida
  resultadoNominal: number;  // primario - juros
  dividaPIB: number;         // % do PIB
  pibGrowth: number;         // % crescimento real
  pibNominal: number;        // R$ trilhões
}

export interface DREState {
  years: DREYearData[];
}

// ── Baseline data (baseado em dados reais do Brasil 2024/2025) ──
const BASE_RECEITA = 2450;     // R$ bi — receita líquida da União
const BASE_DESPESA = 2650;     // R$ bi — despesa primária total
const BASE_JUROS = 850;        // R$ bi — custo da dívida
const BASE_DIVIDA_PIB = 78.5;  // % do PIB (DBGG)
const BASE_PIB = 11.7;         // R$ trilhões (PIB nominal)
const BASE_PIB_GROWTH = 2.5;   // % crescimento real

// Crescimento orgânico da receita (% ao ano)
const RECEITA_GROWTH = 0.035;  // ~3.5% real
// Crescimento inercial da despesa (% ao ano) — obrigatórios crescem
const DESPESA_GROWTH = 0.045;  // ~4.5% real (previdência+saúde+educação)

export function createInitialDRE(): DREState {
  const years: DREYearData[] = [];

  let receita = BASE_RECEITA;
  let despesa = BASE_DESPESA;
  let juros = BASE_JUROS;
  let dividaPIB = BASE_DIVIDA_PIB;
  let pib = BASE_PIB;
  let pibGrowth = BASE_PIB_GROWTH;

  for (let i = 0; i < 4; i++) {
    if (i > 0) {
      receita = receita * (1 + RECEITA_GROWTH);
      despesa = despesa * (1 + DESPESA_GROWTH);
      pib = pib * (1 + pibGrowth / 100);
      // Juros crescem se dívida/PIB sobe
      juros = juros * (1 + (dividaPIB - 78) * 0.005);
    }

    const resultadoPrimario = receita - despesa;
    const resultadoNominal = resultadoPrimario - juros;
    dividaPIB = dividaPIB - (resultadoNominal / (pib * 1000)) * 100;

    years.push({
      year: i + 1,
      label: `Ano ${i + 1} (${2027 + i})`,
      receitaBase: Math.round(receita * 10) / 10,
      despesaBase: Math.round(despesa * 10) / 10,
      ajusteReceita: 0,
      ajusteDespesa: 0,
      receita: Math.round(receita * 10) / 10,
      despesa: Math.round(despesa * 10) / 10,
      resultadoPrimario: Math.round(resultadoPrimario * 10) / 10,
      juros: Math.round(juros * 10) / 10,
      resultadoNominal: Math.round(resultadoNominal * 10) / 10,
      dividaPIB: Math.round(dividaPIB * 10) / 10,
      pibGrowth: Math.round(pibGrowth * 10) / 10,
      pibNominal: Math.round(pib * 100) / 100,
    });
  }

  return { years };
}

// ── Conversão: delta do indicador fiscal → impacto DRE ──
// Cada ponto de fiscal ≈ R$ 12bi de ajuste
// Positivo = austeridade (reduz despesa ou aumenta receita)
// Negativo = expansão (aumenta despesa)
const FISCAL_TO_BRL = 12; // R$ bilhões por ponto de fiscal

// Reformas afetam eficiência da receita a partir do ano seguinte
const REFORM_TO_RECEITA = 8; // R$ bi por ponto de reforma

// PIB growth é afetado por: modern/social (+), fiscal extremo (-)
const MODERN_TO_PIB = 0.15;  // +0.15pp por ponto de modern
const SOCIAL_TO_PIB = 0.10;  // +0.10pp por ponto de social

export function applyDecisionToDRE(
  dre: DREState,
  phase: number,
  indicatorDeltas: Partial<{ fiscal: number; popular: number; congress: number; sovereignty: number }>,
  scoreDeltas: Partial<GovernorScores>,
): DREState {
  const years = dre.years.map(y => ({ ...y }));
  const fiscalDelta = indicatorDeltas.fiscal || 0;
  const reformasDelta = scoreDeltas.reformas || 0;
  const modernDelta = scoreDeltas.modern || 0;
  const socialDelta = scoreDeltas.social || 0;

  // Índice do ano atual (phase 1→0, 2→1, 3→2, 4→3)
  const currentYearIdx = Math.max(0, Math.min(3, phase - 1));

  // Aplicar impacto fiscal no ano atual e propagando para frente
  for (let i = currentYearIdx; i < 4; i++) {
    const y = years[i];

    // Fiscal positivo → reduz despesa; negativo → aumenta despesa
    if (fiscalDelta > 0) {
      // Austeridade: 60% corte despesa + 40% aumento receita
      y.ajusteDespesa -= fiscalDelta * FISCAL_TO_BRL * 0.6;
      y.ajusteReceita += fiscalDelta * FISCAL_TO_BRL * 0.4;
    } else if (fiscalDelta < 0) {
      // Expansão: 80% aumento despesa + 20% eventual receita futura
      y.ajusteDespesa -= fiscalDelta * FISCAL_TO_BRL * 0.8;
      if (i > currentYearIdx) {
        y.ajusteReceita += Math.abs(fiscalDelta) * FISCAL_TO_BRL * 0.1;
      }
    }

    // Reformas aumentam receita nos anos seguintes
    if (reformasDelta > 0 && i > currentYearIdx) {
      y.ajusteReceita += reformasDelta * REFORM_TO_RECEITA * (i - currentYearIdx);
    }

    // PIB growth ajustado por modernização e social
    if (i >= currentYearIdx) {
      y.pibGrowth = Math.max(-2, Math.min(6,
        y.pibGrowth + modernDelta * MODERN_TO_PIB + socialDelta * SOCIAL_TO_PIB
      ));
    }
  }

  // Recalcular todos os valores derivados
  return recalculateDRE({ years });
}

function recalculateDRE(dre: DREState): DREState {
  const years = dre.years.map(y => ({ ...y }));
  let dividaPIB = BASE_DIVIDA_PIB;

  for (let i = 0; i < 4; i++) {
    const y = years[i];

    // Receita e despesa finais
    y.receita = Math.round((y.receitaBase + y.ajusteReceita) * 10) / 10;
    y.despesa = Math.round((y.despesaBase + y.ajusteDespesa) * 10) / 10;

    // Resultado primário
    y.resultadoPrimario = Math.round((y.receita - y.despesa) * 10) / 10;

    // PIB nominal atualizado
    if (i > 0) {
      y.pibNominal = Math.round(years[i - 1].pibNominal * (1 + y.pibGrowth / 100) * 100) / 100;
    }

    // Juros reagem à dívida/PIB do ano anterior
    if (i > 0) {
      const debtPressure = (years[i - 1].dividaPIB - 78) * 0.008;
      y.juros = Math.round(years[i - 1].juros * (1 + debtPressure) * 10) / 10;
    }

    // Resultado nominal
    y.resultadoNominal = Math.round((y.resultadoPrimario - y.juros) * 10) / 10;

    // Dívida/PIB
    if (i === 0) {
      dividaPIB = BASE_DIVIDA_PIB - (y.resultadoNominal / (y.pibNominal * 1000)) * 100;
    } else {
      dividaPIB = years[i - 1].dividaPIB - (y.resultadoNominal / (y.pibNominal * 1000)) * 100;
    }
    y.dividaPIB = Math.round(dividaPIB * 10) / 10;
  }

  return { years };
}
