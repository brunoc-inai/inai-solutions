import { useState, useCallback, useRef } from 'react';
import ReportShell, { Section, Callout } from './ReportShell';
import { CHAPTERS } from '../../data/chapters';
import { EVENTS } from '../../data/events';
import { SCORE_DIMENSIONS, totalScore } from '../../data/governors';
import type { GovernorScores } from '../../data/governors';

/* ── Types ── */

interface StepRecord {
  source: string;
  decision?: string;
  optionIndex: number;
  optionLabel: string;
  deltas: Partial<GovernorScores>;
  scoresAfter: GovernorScores;
}

interface DetailedSimResult {
  index: number;
  steps: StepRecord[];
  finalScores: GovernorScores;
  totalScore: number;
}

interface BucketData {
  label: string;
  min: number;
  max: number;
  count: number;
  pct: number;
}

interface Stats {
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
}

interface GradeDist {
  grade: string;
  label: string;
  count: number;
  pct: number;
  color: string;
}

/* ── Constants ── */

const INITIAL_SCORES: GovernorScores = {
  fiscal: 10, reformas: 5, modern: 5, social: 5,
  defesa: 5, diplo: 5, saude: 5, educ: 5, idone: 7,
};

const SCORE_KEYS: (keyof GovernorScores)[] = ['fiscal', 'reformas', 'modern', 'social', 'defesa', 'diplo', 'saude', 'educ', 'idone'];
const MAX_VALS = [20, 10, 10, 10, 10, 10, 10, 10, 10]; // same order as SCORE_KEYS

const N_OPTIONS = [100, 500, 1000, 5000, 10000] as const;

const CHUNK_SIZE = 200;

const EVENT_FIRE_CHANCE = 0.40;

const STORAGE_KEY = 'eupresidente_mc_history';

/* ── Coalition & Ministry setup data ── */

type Coalition = 'esquerda' | 'centro' | 'direita';
type MinistrySize = 15 | 20 | 25 | 30 | 37;
type MinistryProfile = 'tecnico' | 'academico' | 'politico' | 'centrao';

const COALITIONS: Coalition[] = ['esquerda', 'centro', 'direita'];
const MINISTRY_SIZES: MinistrySize[] = [15, 20, 25, 30, 37];
const MINISTRY_PROFILES: MinistryProfile[] = ['tecnico', 'academico', 'politico', 'centrao'];

const COALITION_LABELS: Record<Coalition, string> = { esquerda: 'Esquerda', centro: 'Centro', direita: 'Direita' };
const SIZE_LABELS: Record<MinistrySize, string> = { 15: '15 (Enxuto)', 20: '20 (Compacto)', 25: '25 (Moderado)', 30: '30 (Expandido)', 37: '37 (Máximo)' };
const PROFILE_LABELS: Record<MinistryProfile, string> = { tecnico: 'Técnico', academico: 'Acadêmico', politico: 'Político', centrao: 'Centrão' };

// Starting congress/fiscal by coalition
const COALITION_START: Record<Coalition, { congress: number; fiscal: number }> = {
  esquerda: { congress: 55, fiscal: 30 },
  centro:   { congress: 60, fiscal: 35 },
  direita:  { congress: 45, fiscal: 40 },
};

// Ministry size effects on indicators
const SIZE_FISCAL: Record<MinistrySize, number> = { 15: 5, 20: 3, 25: 0, 30: -4, 37: -10 };
// Ministry size effects on fiscal SCORE
const SIZE_FISCAL_SCORE: Record<MinistrySize, number> = { 15: 2, 20: 1, 25: 0, 30: -2, 37: -4 };
const SIZE_CONGRESS: Record<Coalition, Record<MinistrySize, number>> = {
  centro:   { 15: -15, 20: -5, 25: 0, 30: 8, 37: 15 },
  direita:  { 15: 0, 20: 10, 25: 5, 30: 5, 37: 0 },
  esquerda: { 15: -10, 20: -10, 25: 0, 30: 5, 37: 10 },
};

// Ministry profile effects on indicators and scores
const PROFILE_EFFECTS: Record<MinistryProfile, { congress: number; fiscal: number; idone: number; fiscalScore: number }> = {
  tecnico:  { congress: 0,  fiscal: 3,   idone: 1,  fiscalScore: 2 },
  academico:{ congress: 3,  fiscal: 1,   idone: 0,  fiscalScore: 1 },
  politico: { congress: 12, fiscal: -5,  idone: -1, fiscalScore: 0 },
  centrao:  { congress: 20, fiscal: -12, idone: -2, fiscalScore: -2 },
};

/* ── Pre-compute coalition blocks for fast sim lookup ── */

// blocked[coalition][decisionId] = Set of blocked option indices
interface BlockEntry { decisionId: string; optionIndex: number }

const LEFT_BLOCKS: BlockEntry[] = [
  { decisionId: 'meta_fiscal', optionIndex: 0 },
  { decisionId: 'idade_minima', optionIndex: 0 },
  { decisionId: 'clt', optionIndex: 0 },
  { decisionId: 'clt', optionIndex: 2 },
  { decisionId: 'clt', optionIndex: 3 },
  { decisionId: 'clt', optionIndex: 4 },
  { decisionId: 'estabilidade', optionIndex: 0 },
  { decisionId: 'imposto_renda', optionIndex: 1 },
  { decisionId: 'bc_autonomia', optionIndex: 0 },
];

const RIGHT_BLOCKS: BlockEntry[] = [
  { decisionId: 'meta_fiscal', optionIndex: 3 },
  { decisionId: 'prioridade_infra', optionIndex: 2 },
  { decisionId: 'sus', optionIndex: 0 },
  { decisionId: 'prioridade_educ', optionIndex: 2 },
  { decisionId: 'modelo_seg', optionIndex: 3 },
  { decisionId: 'bc_autonomia', optionIndex: 3 },
];

const LEFT_EVENT_BLOCKS: BlockEntry[] = [
  { decisionId: 'fuga_capitais', optionIndex: 0 },
  { decisionId: 'greve_geral', optionIndex: 1 },
  { decisionId: 'conflito_fronteira', optionIndex: 0 },
];

const RIGHT_EVENT_BLOCKS: BlockEntry[] = [
  { decisionId: 'pandemia', optionIndex: 0 },
  { decisionId: 'desastre_natural', optionIndex: 0 },
];

// Build fast lookup: Map<decisionId, Set<optionIndex>>
function buildBlockMap(blocks: BlockEntry[]): Map<string, Set<number>> {
  const m = new Map<string, Set<number>>();
  for (const b of blocks) {
    if (!m.has(b.decisionId)) m.set(b.decisionId, new Set());
    m.get(b.decisionId)!.add(b.optionIndex);
  }
  return m;
}

const BLOCK_MAPS: Record<Coalition, { decisions: Map<string, Set<number>>; events: Map<string, Set<number>> }> = {
  esquerda: { decisions: buildBlockMap(LEFT_BLOCKS), events: buildBlockMap(LEFT_EVENT_BLOCKS) },
  centro:   { decisions: new Map(), events: new Map() },
  direita:  { decisions: buildBlockMap(RIGHT_BLOCKS), events: buildBlockMap(RIGHT_EVENT_BLOCKS) },
};

// Pre-compute congress indicator deltas per flat-decision index and option
// CONGRESS_DELTAS[decIdx] = array of congress delta per option index
const CONGRESS_DELTAS: number[][] = [];
{
  for (const ch of CHAPTERS) {
    for (const dec of ch.decisions) {
      CONGRESS_DELTAS.push(dec.options.map(o => o.indicators.congress ?? 0));
    }
  }
}

// Pre-compute congress impact per decision option for centro dynamic blocking
// CENTRO_BLOCK_OPTIONS[decIdx] = Set of option indices with congress impact <= -8
const CENTRO_BLOCK_OPTIONS: (Set<number> | undefined)[] = [];
{
  for (let d = 0; d < CONGRESS_DELTAS.length; d++) {
    const blocked = new Set<number>();
    CONGRESS_DELTAS[d].forEach((impact, oi) => {
      if (impact <= -8) blocked.add(oi);
    });
    CENTRO_BLOCK_OPTIONS.push(blocked.size > 0 ? blocked : undefined);
  }
}

// Pick random option excluding blocked indices
function pickUnblocked(numOptions: number, blocked: Set<number> | undefined): number {
  if (!blocked || blocked.size === 0) return (Math.random() * numOptions) | 0;
  const available: number[] = [];
  for (let i = 0; i < numOptions; i++) {
    if (!blocked.has(i)) available.push(i);
  }
  if (available.length === 0) return (Math.random() * numOptions) | 0; // fallback
  return available[(Math.random() * available.length) | 0];
}

// Setup slot indices in tracked choices: [coalition(0-2), size(0-4), profile(0-3), ...decisions, ...events]
const SETUP_SLOTS = 3; // coalition, size, profile

/* ── Pre-compute flat decision/event arrays for fast iteration ── */

interface FlatDecision {
  sourceId: string;
  decisionId: string;
  options: (Partial<GovernorScores> | undefined)[];
}

interface FlatEvent {
  sourceId: string;
  options: (Partial<GovernorScores> | undefined)[];
}

const FLAT_DECISIONS: FlatDecision[] = [];
for (const ch of CHAPTERS) {
  for (const dec of ch.decisions) {
    FLAT_DECISIONS.push({
      sourceId: ch.id,
      decisionId: dec.id,
      options: dec.options.map(o => o.scores),
    });
  }
}

const FLAT_EVENTS: FlatEvent[] = [];
for (const ev of EVENTS) {
  FLAT_EVENTS.push({
    sourceId: ev.id,
    options: ev.options.map(o => o.scores),
  });
}

/* ── Ministry size blocks & congress multipliers (must be after FLAT_DECISIONS) ── */

interface SizeBlockEntry { minSizeIdx: number; allowedOpt: number; totalOpts: number }
const SIZE_BLOCK_BY_DEC: (SizeBlockEntry | undefined)[] = new Array(FLAT_DECISIONS.length);
{
  const SIZE_BLOCK_CONFIG: { decId: string; minSize: MinistrySize; allowedOpt: number; totalOpts: number }[] = [
    { decId: 'sus', minSize: 25, allowedOpt: 3, totalOpts: 4 },
    { decId: 'clt', minSize: 30, allowedOpt: 5, totalOpts: 6 },
    { decId: 'idade_minima', minSize: 37, allowedOpt: 3, totalOpts: 4 },
  ];
  for (let d = 0; d < FLAT_DECISIONS.length; d++) {
    const cfg = SIZE_BLOCK_CONFIG.find(c => c.decId === FLAT_DECISIONS[d].decisionId);
    if (cfg) {
      SIZE_BLOCK_BY_DEC[d] = {
        minSizeIdx: MINISTRY_SIZES.indexOf(cfg.minSize),
        allowedOpt: cfg.allowedOpt,
        totalOpts: cfg.totalOpts,
      };
    }
  }
}

const REFORM_DECISIONS = new Set(['meta_fiscal', 'idade_minima', 'militares', 'clt', 'estabilidade', 'imposto_renda', 'emendas']);
const EXPANSION_DECISIONS = new Set(['sus', 'bolsa_familia', 'prioridade_educ']);
const REFORM_MULT: Record<Coalition, number> = { esquerda: 2.0, centro: 1.0, direita: 0.25 };
const EXPANSION_MULT: Record<Coalition, number> = { esquerda: 1.5, centro: 1.0, direita: 0.5 };
const CONGRESS_MULT_BY_DEC: number[][] = [];
{
  for (const fd of FLAT_DECISIONS) {
    if (REFORM_DECISIONS.has(fd.decisionId)) {
      CONGRESS_MULT_BY_DEC.push([REFORM_MULT.esquerda, REFORM_MULT.centro, REFORM_MULT.direita]);
    } else if (EXPANSION_DECISIONS.has(fd.decisionId)) {
      CONGRESS_MULT_BY_DEC.push([EXPANSION_MULT.esquerda, EXPANSION_MULT.centro, EXPANSION_MULT.direita]);
    } else {
      CONGRESS_MULT_BY_DEC.push([1, 1, 1]);
    }
  }
}

/* ── Decision metadata for advanced analysis ── */

interface DecisionMeta {
  sourceId: string;
  decisionId: string;
  name: string;
  isEvent: boolean;
  optionLabels: string[];
}

const DECISION_META: DecisionMeta[] = [
  // Setup slots first
  { sourceId: '_setup', decisionId: '_coalition', name: 'Coligação', isEvent: false,
    optionLabels: COALITIONS.map(c => COALITION_LABELS[c]) },
  { sourceId: '_setup', decisionId: '_ministry_size', name: 'Tamanho do Ministério', isEvent: false,
    optionLabels: MINISTRY_SIZES.map(s => SIZE_LABELS[s]) },
  { sourceId: '_setup', decisionId: '_ministry_profile', name: 'Perfil do Ministério', isEvent: false,
    optionLabels: MINISTRY_PROFILES.map(p => PROFILE_LABELS[p]) },
];
for (const ch of CHAPTERS) {
  for (const dec of ch.decisions) {
    DECISION_META.push({
      sourceId: ch.id, decisionId: dec.id,
      name: `${ch.title} — ${dec.name}`,
      isEvent: false,
      optionLabels: dec.options.map(o => o.label),
    });
  }
}
for (const ev of EVENTS) {
  DECISION_META.push({
    sourceId: ev.id, decisionId: ev.id,
    name: `${ev.icon} ${ev.title}`,
    isEvent: true,
    optionLabels: ev.options.map(o => o.label),
  });
}

const NUM_SLOTS = DECISION_META.length;
const NO_FIRE = 255;

/* ── Fast simulation (zero allocations per step, reuses array) ── */

// Tracked simulation with coalition + ministry + blocking logic
// choices: Uint8Array of size N * NUM_SLOTS. NO_FIRE (255) = event didn't fire.
// Slots: [coalition, size, profile, ...decisions, ...events]
function runOneSimTracked(choices: Uint8Array, simIdx: number): number {
  const offset = simIdx * NUM_SLOTS;

  // 1. Random setup: coalition, ministry size, profile
  const coalIdx = (Math.random() * 3) | 0;
  const sizeIdx = (Math.random() * 5) | 0;
  const profIdx = (Math.random() * 4) | 0;
  choices[offset] = coalIdx;
  choices[offset + 1] = sizeIdx;
  choices[offset + 2] = profIdx;

  const coal = COALITIONS[coalIdx];
  const size = MINISTRY_SIZES[sizeIdx];
  const prof = MINISTRY_PROFILES[profIdx];

  // 2. Starting scores with ministry profile idone + size fiscal score adjustments
  const s = [10, 5, 5, 5, 5, 5, 5, 5, 7]; // fiscal, reformas, modern, social, defesa, diplo, saude, educ, idone
  const profEff = PROFILE_EFFECTS[prof];
  s[8] += profEff.idone; // idone
  if (s[8] < 0) s[8] = 0;
  if (s[8] > 10) s[8] = 10;
  s[0] += SIZE_FISCAL_SCORE[size] + profEff.fiscalScore; // fiscal score from size + profile
  if (s[0] < 0) s[0] = 0;
  if (s[0] > 20) s[0] = 20;

  // 3. Starting congress indicator (for impeachment + centro blocking)
  let congress = COALITION_START[coal].congress + SIZE_CONGRESS[coal][size] + profEff.congress;
  if (congress < 0) congress = 0;
  if (congress > 100) congress = 100;

  // Get block maps for this coalition
  const blocks = BLOCK_MAPS[coal];
  let slot = SETUP_SLOTS;

  // 4. Decisions — respect coalition blocks
  for (let d = 0; d < FLAT_DECISIONS.length; d++) {
    const dec = FLAT_DECISIONS[d];
    const decId = dec.decisionId;
    const numOpts = dec.options.length;

    // Build blocked set for this decision
    let blocked = blocks.decisions.get(decId);

    // Ministry size blocking: large ministries block certain reforms
    const sizeBlock = SIZE_BLOCK_BY_DEC[d];
    if (sizeBlock && sizeIdx >= sizeBlock.minSizeIdx) {
      const merged = new Set<number>(blocked);
      for (let i = 0; i < sizeBlock.totalOpts; i++) {
        if (i !== sizeBlock.allowedOpt) merged.add(i);
      }
      blocked = merged;
    }

    // Centro dynamic blocking: if congress < 40, block options with congress impact <= -8
    if (coal === 'centro' && congress < 40) {
      const centroBlocked = CENTRO_BLOCK_OPTIONS[d];
      if (centroBlocked || blocked) {
        const merged = new Set<number>(blocked);
        if (centroBlocked) centroBlocked.forEach(i => merged.add(i));
        blocked = merged.size > 0 ? merged : undefined;
      }
    }

    const idx = pickUnblocked(numOpts, blocked);
    choices[offset + slot] = idx;
    slot++;

    // Apply score deltas
    const deltas = dec.options[idx];
    if (deltas) {
      for (let k = 0; k < SCORE_KEYS.length; k++) {
        const v = (deltas as any)[SCORE_KEYS[k]];
        if (v !== undefined) {
          s[k] += v;
          if (s[k] < 0) s[k] = 0;
          else if (s[k] > MAX_VALS[k]) s[k] = MAX_VALS[k];
        }
      }
    }

    // Update congress indicator from pre-computed flat lookup, with coalition multiplier
    const rawCongressDelta = CONGRESS_DELTAS[d][idx] ?? 0;
    congress += Math.round(rawCongressDelta * CONGRESS_MULT_BY_DEC[d][coalIdx]);
    if (congress < 0) congress = 0;
    if (congress > 100) congress = 100;
  }

  // 5. Events — respect coalition blocks
  for (let e = 0; e < FLAT_EVENTS.length; e++) {
    if (Math.random() >= EVENT_FIRE_CHANCE) {
      choices[offset + slot] = NO_FIRE;
      slot++;
      continue;
    }
    const ev = FLAT_EVENTS[e];
    const evId = ev.sourceId;
    const numOpts = ev.options.length;

    let blocked = blocks.events.get(evId);

    // Centro dynamic blocking for events
    if (coal === 'centro' && congress < 40) {
      const dynBlocked = new Set<number>(blocked);
      const evData = EVENTS[e];
      evData.options.forEach((opt, oi) => {
        if ((opt.indicators.congress ?? 0) <= -8) dynBlocked.add(oi);
      });
      blocked = dynBlocked.size > 0 ? dynBlocked : undefined;
    }

    const idx = pickUnblocked(numOpts, blocked);
    choices[offset + slot] = idx;
    slot++;

    const deltas = ev.options[idx];
    if (deltas) {
      for (let k = 0; k < SCORE_KEYS.length; k++) {
        const v = (deltas as any)[SCORE_KEYS[k]];
        if (v !== undefined) {
          s[k] += v;
          if (s[k] < 0) s[k] = 0;
          else if (s[k] > MAX_VALS[k]) s[k] = MAX_VALS[k];
        }
      }
    }

    // Update congress from event indicators
    congress += EVENTS[e].options[idx]?.indicators?.congress ?? 0;
    if (congress < 0) congress = 0;
    if (congress > 100) congress = 100;
  }

  let total = 0;
  for (let k = 0; k < 9; k++) total += s[k];
  return total;
}

/* ── Detailed simulation (only used for download) ── */

function clampScores(s: GovernorScores): GovernorScores {
  const out = { ...s };
  for (let k = 0; k < SCORE_KEYS.length; k++) {
    const key = SCORE_KEYS[k];
    if (out[key] < 0) out[key] = 0;
    if (out[key] > MAX_VALS[k]) out[key] = MAX_VALS[k];
  }
  return out;
}

function runOneSimDetailed(index: number): DetailedSimResult {
  let scores = { ...INITIAL_SCORES };
  const steps: StepRecord[] = [];

  for (const chapter of CHAPTERS) {
    for (const decision of chapter.decisions) {
      const idx = (Math.random() * decision.options.length) | 0;
      const opt = decision.options[idx];
      const deltas = opt.scores ?? {};
      for (const [k, v] of Object.entries(deltas) as [keyof GovernorScores, number][]) {
        if (v !== undefined) scores[k] += v;
      }
      scores = clampScores(scores);
      steps.push({
        source: chapter.id, decision: decision.id,
        optionIndex: idx, optionLabel: opt.label,
        deltas, scoresAfter: { ...scores },
      });
    }
  }

  for (const event of EVENTS) {
    if (Math.random() >= EVENT_FIRE_CHANCE) continue;
    const idx = (Math.random() * event.options.length) | 0;
    const opt = event.options[idx];
    const deltas = opt.scores ?? {};
    for (const [k, v] of Object.entries(deltas) as [keyof GovernorScores, number][]) {
      if (v !== undefined) scores[k] += v;
    }
    scores = clampScores(scores);
    steps.push({
      source: event.id, optionIndex: idx,
      optionLabel: opt.label, deltas, scoresAfter: { ...scores },
    });
  }

  return { index, steps, finalScores: scores, totalScore: totalScore(scores) };
}

/* ── Stats helpers ── */

function bucketResults(scores: number[]): BucketData[] {
  // Use counting array instead of .filter() for each range
  const counts = new Int32Array(10);
  const n = scores.length;
  for (let i = 0; i < n; i++) {
    const bucket = Math.min(Math.floor(scores[i] / 10), 9);
    // Handle edge: score 0 goes to bucket 0, score 100 goes to bucket 9
    counts[bucket]++;
  }
  const ranges = [
    [0, 10], [11, 20], [21, 30], [31, 40], [41, 50],
    [51, 60], [61, 70], [71, 80], [81, 90], [91, 100],
  ];
  return ranges.map(([lo, hi], i) => ({
    label: `${lo}–${hi}`,
    min: lo, max: hi,
    count: counts[i],
    pct: n > 0 ? (counts[i] / n) * 100 : 0,
  }));
}

function computeStats(scores: number[]): Stats {
  const n = scores.length;
  if (n === 0) return { mean: 0, median: 0, stdDev: 0, min: 0, max: 0 };
  let sum = 0, mn = 999, mx = -999;
  for (let i = 0; i < n; i++) {
    sum += scores[i];
    if (scores[i] < mn) mn = scores[i];
    if (scores[i] > mx) mx = scores[i];
  }
  const mean = sum / n;
  let varSum = 0;
  for (let i = 0; i < n; i++) varSum += (scores[i] - mean) ** 2;
  const sorted = [...scores].sort((a, b) => a - b);
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];
  return { mean, median, stdDev: Math.sqrt(varSum / n), min: mn, max: mx };
}

function computeGrades(scores: number[]): GradeDist[] {
  const counts = [0, 0, 0, 0, 0, 0]; // S, A, B, C, D, F
  for (let i = 0; i < scores.length; i++) {
    const s = scores[i];
    if (s >= 80) counts[0]++;
    else if (s >= 65) counts[1]++;
    else if (s >= 50) counts[2]++;
    else if (s >= 35) counts[3]++;
    else if (s >= 20) counts[4]++;
    else counts[5]++;
  }
  const n = scores.length;
  const defs: [string, string, string][] = [
    ['S', '>= 80', 'var(--gold)'],
    ['A', '65–79', 'var(--green)'],
    ['B', '50–64', 'var(--blue)'],
    ['C', '35–49', 'var(--amber)'],
    ['D', '20–34', 'var(--red)'],
    ['F', '< 20', 'var(--red)'],
  ];
  return defs.map(([grade, label, color], i) => ({
    grade, label, color,
    count: counts[i],
    pct: n > 0 ? (counts[i] / n) * 100 : 0,
  }));
}

function barColor(min: number): string {
  if (min <= 20) return 'var(--red)';
  if (min <= 40) return 'var(--amber)';
  if (min <= 60) return 'var(--blue)';
  return 'var(--green)';
}

/* ── Advanced analysis: decision × bucket crosstab ── */

interface OptionBucketData {
  label: string;
  bucketCounts: number[];
  totalPicked: number;
  bucketPcts: number[];
  meanScore: number;
}

interface DecisionAnalysisData {
  name: string;
  isEvent: boolean;
  options: OptionBucketData[];
  impactSpread: number;
  bestOptionIdx: number;
  worstOptionIdx: number;
}

function computeDecisionAnalysis(
  scores: Float64Array,
  choices: Uint8Array,
  n: number,
): DecisionAnalysisData[] {
  const result: DecisionAnalysisData[] = [];

  for (let slot = 0; slot < NUM_SLOTS; slot++) {
    const meta = DECISION_META[slot];
    const numOpts = meta.optionLabels.length;
    const optBuckets: number[][] = Array.from({ length: numOpts }, () => new Array(10).fill(0));
    const optCounts = new Array(numOpts).fill(0);
    const optScoreSums = new Array(numOpts).fill(0);

    for (let i = 0; i < n; i++) {
      const choice = choices[i * NUM_SLOTS + slot];
      if (choice === NO_FIRE || choice >= numOpts) continue;
      const score = scores[i];
      const bucket = Math.min(Math.floor(score / 10), 9);
      optBuckets[choice][bucket]++;
      optCounts[choice]++;
      optScoreSums[choice] += score;
    }

    const options: OptionBucketData[] = meta.optionLabels.map((label, oi) => {
      const total = optCounts[oi];
      return {
        label,
        bucketCounts: optBuckets[oi],
        totalPicked: total,
        bucketPcts: optBuckets[oi].map(c => total > 0 ? (c / total) * 100 : 0),
        meanScore: total > 0 ? optScoreSums[oi] / total : 0,
      };
    });

    const activeMeans = options.filter(o => o.totalPicked > 0).map(o => o.meanScore);
    const impactSpread = activeMeans.length > 1 ? Math.max(...activeMeans) - Math.min(...activeMeans) : 0;

    let bestIdx = 0, worstIdx = 0, bestMean = -1, worstMean = 999;
    for (let oi = 0; oi < options.length; oi++) {
      if (options[oi].totalPicked === 0) continue;
      if (options[oi].meanScore > bestMean) { bestMean = options[oi].meanScore; bestIdx = oi; }
      if (options[oi].meanScore < worstMean) { worstMean = options[oi].meanScore; worstIdx = oi; }
    }

    result.push({ name: meta.name, isEvent: meta.isEvent, options, impactSpread, bestOptionIdx: bestIdx, worstOptionIdx: worstIdx });
  }

  result.sort((a, b) => b.impactSpread - a.impactSpread);
  return result;
}

const BUCKET_LABELS = ['0–10', '11–20', '21–30', '31–40', '41–50', '51–60', '61–70', '71–80', '81–90', '91–100'];

function heatColor(pct: number): string {
  if (pct === 0) return 'transparent';
  const alpha = Math.min(0.15 + (pct / 100) * 0.85, 1);
  return `rgba(200, 160, 60, ${alpha.toFixed(2)})`;
}

/* ── File download ── */

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── localStorage history ── */

interface SavedRun {
  id: string;
  date: string;
  n: number;
  stats: Stats;
  buckets: BucketData[];
  grades: GradeDist[];
}

function loadHistory(): SavedRun[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveToHistory(run: SavedRun) {
  const history = loadHistory();
  history.unshift(run);
  if (history.length > 20) history.length = 20;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/* ── Analysis Block (collapsible per-decision heatmap) ── */

function AnalysisBlock({ decision, maxPct, rank }: { decision: DecisionAnalysisData; maxPct: number; rank: number }) {
  const [open, setOpen] = useState(false);
  const d = decision;

  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, width: '100%',
          background: 'none', border: 'none', borderBottom: '1px solid var(--rule)',
          padding: '6px 0', cursor: 'pointer', textAlign: 'left',
          fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--ink)',
        }}
      >
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-dim)', width: 22 }}>
          {open ? '▼' : '▶'}
        </span>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 10, color: 'var(--text-muted)', width: 28 }}>
          #{rank}
        </span>
        <span style={{ flex: 1 }}>
          {d.name}
          {d.isEvent && <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4 }}>(evento)</span>}
        </span>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--gold)', fontWeight: 600 }}>
          {d.impactSpread.toFixed(1)}
        </span>
      </button>

      {open && (
        <div style={{ overflowX: 'auto', marginTop: 4, marginBottom: 12 }}>
          <table style={{
            borderCollapse: 'collapse', fontFamily: 'var(--ff-mono)',
            fontSize: 11, whiteSpace: 'nowrap', width: '100%',
          }}>
            <thead>
              <tr>
                <th style={{
                  padding: '4px 6px', textAlign: 'left', borderBottom: '2px solid var(--rule)',
                  fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', minWidth: 160, position: 'sticky', left: 0, background: 'var(--paper)',
                }}>Opcao</th>
                {BUCKET_LABELS.map((bl, bi) => (
                  <th key={bi} style={{
                    padding: '4px 3px', textAlign: 'center', borderBottom: '2px solid var(--rule)',
                    fontSize: 9, fontWeight: 600, color: 'var(--text-muted)', minWidth: 44,
                  }}>{bl}</th>
                ))}
                <th style={{
                  padding: '4px 6px', textAlign: 'center', borderBottom: '2px solid var(--rule)',
                  fontSize: 10, fontWeight: 700, color: 'var(--ink)', borderLeft: '2px solid var(--rule)',
                }}>Media</th>
                <th style={{
                  padding: '4px 6px', textAlign: 'center', borderBottom: '2px solid var(--rule)',
                  fontSize: 10, fontWeight: 600, color: 'var(--text-muted)',
                }}>N</th>
              </tr>
            </thead>
            <tbody>
              {d.options.map((opt, oi) => {
                const isBest = oi === d.bestOptionIdx && d.options.length > 1;
                const isWorst = oi === d.worstOptionIdx && d.options.length > 1 && d.bestOptionIdx !== d.worstOptionIdx;
                return (
                  <tr key={oi}>
                    <td style={{
                      padding: '3px 6px', borderBottom: '1px solid var(--rule)',
                      textAlign: 'left', fontFamily: 'var(--ff-sans)', fontSize: 11,
                      maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis',
                      position: 'sticky', left: 0, background: 'var(--paper)',
                      color: isBest ? 'var(--green)' : isWorst ? 'var(--red)' : 'var(--ink)',
                      fontWeight: isBest || isWorst ? 600 : 400,
                    }} title={opt.label}>
                      {isBest ? '▲ ' : isWorst ? '▼ ' : ''}{opt.label}
                    </td>
                    {opt.bucketPcts.map((pct, bi) => (
                      <td key={bi} style={{
                        padding: '3px 2px', borderBottom: '1px solid var(--rule)',
                        textAlign: 'center', background: heatColor(pct),
                        color: pct > 0 ? 'var(--ink)' : 'var(--text-dim)',
                        fontSize: 10,
                      }}>
                        {pct > 0 ? pct.toFixed(1) : '—'}
                      </td>
                    ))}
                    <td style={{
                      padding: '3px 6px', borderBottom: '1px solid var(--rule)',
                      textAlign: 'center', fontWeight: 700, borderLeft: '2px solid var(--rule)',
                      color: isBest ? 'var(--green)' : isWorst ? 'var(--red)' : 'var(--ink)',
                    }}>
                      {opt.totalPicked > 0 ? opt.meanScore.toFixed(1) : '—'}
                    </td>
                    <td style={{
                      padding: '3px 6px', borderBottom: '1px solid var(--rule)',
                      textAlign: 'center', color: 'var(--text-muted)',
                    }}>
                      {opt.totalPicked > 0 ? opt.totalPicked.toLocaleString() : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ── Component ── */

export default function ReportMonteCarloSim({ onClose }: { onClose: () => void }) {
  const [n, setN] = useState<number>(1000);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<number[] | null>(null);
  const [history, setHistory] = useState<SavedRun[]>(() => loadHistory());
  const [elapsed, setElapsed] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [analysis, setAnalysis] = useState<DecisionAnalysisData[] | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const cancelRef = useRef(false);
  const startTimeRef = useRef(0);
  const choicesRef = useRef<Uint8Array | null>(null);
  const scoresRef = useRef<Float64Array | null>(null);

  const runSimulation = useCallback(() => {
    setRunning(true);
    setProgress(0);
    setResults(null);
    setAnalysis(null);
    setShowAnalysis(false);
    setElapsed(0);
    cancelRef.current = false;
    startTimeRef.current = performance.now();

    const allScores = new Float64Array(n);
    const allChoices = new Uint8Array(n * NUM_SLOTS);
    let done = 0;

    function processChunk() {
      if (cancelRef.current) { setRunning(false); return; }
      const chunkEnd = Math.min(done + CHUNK_SIZE, n);
      for (let i = done; i < chunkEnd; i++) {
        allScores[i] = runOneSimTracked(allChoices, i);
      }
      done = chunkEnd;
      setProgress(Math.round((done / n) * 100));
      setElapsed(Math.round(performance.now() - startTimeRef.current));

      if (done >= n) {
        const arr = Array.from(allScores);
        setResults(arr);
        setRunning(false);
        setElapsed(Math.round(performance.now() - startTimeRef.current));
        choicesRef.current = allChoices;
        scoresRef.current = allScores;

        const stats = computeStats(arr);
        const bkts = bucketResults(arr);
        const grd = computeGrades(arr);
        saveToHistory({
          id: new Date().toISOString(),
          date: new Date().toLocaleString('pt-BR'),
          n, stats, buckets: bkts, grades: grd,
        });
        setHistory(loadHistory());
      } else {
        requestAnimationFrame(() => setTimeout(processChunk, 0));
      }
    }

    requestAnimationFrame(() => setTimeout(processChunk, 0));
  }, [n]);

  const handleCancel = useCallback(() => { cancelRef.current = true; }, []);

  // Generate detailed data on-demand for download (slower, but doesn't block main sim)
  const handleDownloadFull = useCallback(() => {
    if (!results) return;
    setDownloading(true);

    // Run detailed sims in background chunks
    const detailed: DetailedSimResult[] = [];
    const total = results.length;
    let done = 0;

    function genChunk() {
      const end = Math.min(done + 50, total);
      for (let i = done; i < end; i++) {
        detailed.push(runOneSimDetailed(i));
      }
      done = end;
      if (done >= total) {
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        downloadJSON({
          meta: {
            timestamp: new Date().toISOString(),
            simulationCount: total,
            note: 'Detailed re-simulation — random seeds differ from displayed stats',
          },
          summary: computeStats(detailed.map(d => d.totalScore)),
          iterations: detailed,
        }, `mc_full_${total}_${ts}.json`);
        setDownloading(false);
      } else {
        setTimeout(genChunk, 0);
      }
    }
    setTimeout(genChunk, 0);
  }, [results]);

  const handleDownloadSummary = useCallback(() => {
    if (!results) return;
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    downloadJSON({
      meta: { timestamp: new Date().toISOString(), simulationCount: n, elapsedMs: elapsed },
      summary: computeStats(results),
      buckets: bucketResults(results),
      grades: computeGrades(results),
      scores: results,
    }, `mc_summary_${n}_${ts}.json`);
  }, [results, n, elapsed]);

  const handleClearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  const handleAnalysis = useCallback(() => {
    if (!scoresRef.current || !choicesRef.current || !results) return;
    const data = computeDecisionAnalysis(scoresRef.current, choicesRef.current, results.length);
    setAnalysis(data);
    setShowAnalysis(true);
  }, [results]);

  const buckets = results ? bucketResults(results) : null;
  const stats = results ? computeStats(results) : null;
  const grades = results ? computeGrades(results) : null;
  const maxCount = buckets ? Math.max(...buckets.map(b => b.count)) : 1;

  return (
    <ReportShell
      title="Simulacao Monte Carlo"
      eyebrow="Analise Estatistica"
      color="var(--gold)"
      onClose={onClose}
    >
      {/* ── Controls ── */}
      <Section num="01" title="Configuracao">
        <Callout type="info">
          Simulacao 100% local (JavaScript puro). Cada iteracao percorre{' '}
          {FLAT_DECISIONS.length} decisoes + {FLAT_EVENTS.length} eventos com escolhas aleatorias.
          Resultados salvos em localStorage e exportaveis como JSON.
        </Callout>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginTop: '1rem', flexWrap: 'wrap',
        }}>
          <label style={{ fontFamily: 'var(--ff-sans)', color: 'var(--ink)', fontSize: '0.9rem' }}>
            N:
          </label>
          <select
            value={n}
            onChange={e => setN(Number(e.target.value))}
            disabled={running}
            style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.9rem',
              padding: '0.4rem 0.8rem', border: '1px solid var(--ink)',
              background: 'var(--paper)', color: 'var(--ink)',
              cursor: running ? 'not-allowed' : 'pointer',
            }}
          >
            {N_OPTIONS.map(v => (
              <option key={v} value={v}>{v.toLocaleString()}</option>
            ))}
          </select>

          <button
            onClick={running ? handleCancel : runSimulation}
            style={{
              fontFamily: 'var(--ff-sans)', fontSize: '0.9rem', fontWeight: 700,
              padding: '0.5rem 1.5rem', border: '2px solid var(--gold)',
              background: running ? 'var(--red)' : 'var(--gold)',
              color: 'var(--paper)', cursor: 'pointer',
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}
          >
            {running ? 'Cancelar' : 'Executar'}
          </button>
        </div>

        {running && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'var(--ff-mono)', fontSize: '0.8rem', color: 'var(--text-muted)',
              marginBottom: '0.3rem',
            }}>
              <span>{progress}% — {Math.round(progress * n / 100).toLocaleString()}/{n.toLocaleString()}</span>
              <span>{(elapsed / 1000).toFixed(1)}s</span>
            </div>
            <div style={{
              width: '100%', height: '8px', background: 'var(--paper)',
              border: '1px solid var(--ink)', overflow: 'hidden',
            }}>
              <div style={{
                width: `${progress}%`, height: '100%',
                background: 'var(--gold)', transition: 'width 0.05s',
              }} />
            </div>
          </div>
        )}

        {!running && results && (
          <div style={{
            marginTop: '0.75rem', fontFamily: 'var(--ff-mono)',
            fontSize: '0.8rem', color: 'var(--text-muted)',
          }}>
            {n.toLocaleString()} sims em {(elapsed / 1000).toFixed(2)}s
            ({elapsed > 0 ? (n / (elapsed / 1000)).toFixed(0) : '∞'} sims/s)
          </div>
        )}
      </Section>

      {/* ── Download ── */}
      {results && (
        <Section num="02" title="Salvar Resultados">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={handleDownloadSummary} style={{
              fontFamily: 'var(--ff-sans)', fontSize: '0.85rem', fontWeight: 600,
              padding: '0.6rem 1.2rem', border: '2px solid var(--gold)',
              background: 'var(--gold)', color: 'var(--paper)', cursor: 'pointer',
            }}>
              📊 Download Resumo
            </button>
            <button onClick={handleDownloadFull} disabled={downloading} style={{
              fontFamily: 'var(--ff-sans)', fontSize: '0.85rem', fontWeight: 600,
              padding: '0.6rem 1.2rem', border: '2px solid var(--ink)',
              background: downloading ? 'var(--rule)' : 'var(--paper)',
              color: 'var(--ink)', cursor: downloading ? 'wait' : 'pointer',
            }}>
              {downloading ? '⏳ Gerando detalhes...' : '📥 Download Completo (re-simula com detalhes)'}
            </button>
          </div>
          <p style={{
            fontSize: '0.75rem', color: 'var(--text-muted)',
            fontFamily: 'var(--ff-sans)', marginTop: '0.5rem',
          }}>
            Resumo: scores finais + estatisticas. Completo: re-simula N jogos gravando cada decisao (mais lento).
          </p>
        </Section>
      )}

      {/* ── Histogram ── */}
      {buckets && stats && (
        <Section num="03" title="Histograma">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {buckets.map(b => (
              <div key={b.label} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 60px 60px',
                alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--ff-mono)', fontSize: '0.8rem',
              }}>
                <span style={{ textAlign: 'right', color: 'var(--ink)' }}>{b.label}</span>
                <div style={{
                  height: '22px', background: 'var(--paper)',
                  border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden',
                }}>
                  <div style={{
                    width: maxCount > 0 ? `${(b.count / maxCount) * 100}%` : '0%',
                    height: '100%', background: barColor(b.min),
                    opacity: 0.85, transition: 'width 0.3s ease',
                  }} />
                </div>
                <span style={{ textAlign: 'right', color: 'var(--text-muted)' }}>{b.pct.toFixed(1)}%</span>
                <span style={{ textAlign: 'right', color: 'var(--ink)' }}>{b.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', gap: '1.5rem', marginTop: '1rem',
            fontFamily: 'var(--ff-sans)', fontSize: '0.75rem', color: 'var(--text-muted)',
            flexWrap: 'wrap',
          }}>
            {[
              { color: 'var(--red)', label: '0–30 Critico' },
              { color: 'var(--amber)', label: '31–50 Fraco' },
              { color: 'var(--blue)', label: '51–70 Moderado' },
              { color: 'var(--green)', label: '71–100 Bom' },
            ].map(l => (
              <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ display: 'inline-block', width: 12, height: 12, background: l.color, opacity: 0.85 }} />
                {l.label}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* ── Stats ── */}
      {stats && (
        <Section num="04" title="Estatisticas">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem', marginTop: '0.5rem',
          }}>
            {[
              { label: 'Media', value: stats.mean.toFixed(2) },
              { label: 'Mediana', value: stats.median.toFixed(1) },
              { label: 'Desvio', value: stats.stdDev.toFixed(2) },
              { label: 'Min', value: String(stats.min) },
              { label: 'Max', value: String(stats.max) },
            ].map(s => (
              <div key={s.label} style={{
                border: '1px solid var(--ink)', padding: '0.8rem 1rem', textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--ff-mono)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)',
                }}>{s.value}</div>
                <div style={{
                  fontFamily: 'var(--ff-sans)', fontSize: '0.75rem', color: 'var(--text-muted)',
                  marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Grades ── */}
      {grades && (
        <Section num="05" title="Notas">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '0.75rem', marginTop: '0.5rem',
          }}>
            {grades.map(g => (
              <div key={g.grade} style={{
                border: '1px solid var(--ink)', padding: '0.8rem',
                textAlign: 'center', borderTop: `3px solid ${g.color}`,
              }}>
                <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '1.8rem', fontWeight: 700, color: g.color }}>
                  {g.grade}
                </div>
                <div style={{ fontFamily: 'var(--ff-sans)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  {g.label}
                </div>
                <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '1rem', color: 'var(--ink)' }}>
                  {g.pct.toFixed(1)}%
                </div>
                <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {g.count.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── Advanced Analysis ── */}
      {results && (
        <Section num="06" title="Relatorio Avancado">
          {!showAnalysis ? (
            <div>
              <p style={{ fontFamily: 'var(--ff-sans)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                Cruza cada decisao com o histograma de notas finais. Mostra qual % dos jogadores que escolheram
                cada opcao caiu em cada faixa de score. Identifica as decisoes com maior impacto no resultado.
              </p>
              <button onClick={handleAnalysis} style={{
                fontFamily: 'var(--ff-sans)', fontSize: '0.9rem', fontWeight: 700,
                padding: '0.5rem 1.5rem', border: '2px solid var(--gold)',
                background: 'var(--gold)', color: 'var(--paper)', cursor: 'pointer',
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                Gerar Analise
              </button>
            </div>
          ) : analysis && (
            <div>
              {/* ── Top Insights ── */}
              <Callout type="info">
                <strong>Top 5 decisoes mais impactantes</strong> (maior diferenca entre melhor e pior opcao):
              </Callout>
              <div style={{ marginBottom: '1.5rem' }}>
                {analysis.slice(0, 5).map((d, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'baseline', gap: '0.5rem',
                    padding: '0.4rem 0', borderBottom: '1px solid var(--rule)',
                    fontFamily: 'var(--ff-sans)', fontSize: '0.8rem',
                  }}>
                    <span style={{ fontFamily: 'var(--ff-mono)', fontWeight: 700, color: 'var(--gold)', minWidth: 20 }}>
                      {i + 1}.
                    </span>
                    <span style={{ flex: 1, color: 'var(--ink)' }}>
                      {d.name}
                      {d.isEvent && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 4 }}>(evento)</span>}
                    </span>
                    <span style={{ fontFamily: 'var(--ff-mono)', fontWeight: 600, color: 'var(--green)' }}>
                      +{d.impactSpread.toFixed(1)} spread
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Per-decision heatmaps ── */}
              {analysis.map((d, di) => {
                const maxPct = Math.max(...d.options.flatMap(o => o.bucketPcts));
                return (
                  <AnalysisBlock key={di} decision={d} maxPct={maxPct} rank={di + 1} />
                );
              })}
            </div>
          )}
        </Section>
      )}

      {/* ── History ── */}
      <Section num="07" title="Historico">
        {history.length === 0 ? (
          <p style={{ fontFamily: 'var(--ff-sans)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Nenhuma simulacao salva. Execute uma para iniciar.
          </p>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                borderCollapse: 'collapse', fontFamily: 'var(--ff-mono)',
                fontSize: '0.75rem', width: '100%',
              }}>
                <thead>
                  <tr>
                    {['Data', 'N', 'Media', 'Mediana', 'σ', 'Min', 'Max'].map(h => (
                      <th key={h} style={{
                        padding: '6px 8px', borderBottom: '2px solid var(--rule)',
                        textAlign: h === 'Data' ? 'left' : 'center', fontSize: '0.7rem',
                        fontWeight: 600, color: 'var(--text-muted)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map(r => (
                    <tr key={r.id}>
                      <td style={{ padding: '4px 8px', borderBottom: '1px solid var(--rule)', textAlign: 'left' }}>{r.date}</td>
                      <td style={{ padding: '4px 8px', borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>{r.n.toLocaleString()}</td>
                      <td style={{ padding: '4px 8px', borderBottom: '1px solid var(--rule)', textAlign: 'center', fontWeight: 600 }}>{r.stats.mean.toFixed(1)}</td>
                      <td style={{ padding: '4px 8px', borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>{r.stats.median.toFixed(1)}</td>
                      <td style={{ padding: '4px 8px', borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>{r.stats.stdDev.toFixed(1)}</td>
                      <td style={{ padding: '4px 8px', borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>{r.stats.min}</td>
                      <td style={{ padding: '4px 8px', borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>{r.stats.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={handleClearHistory} style={{
              marginTop: '0.75rem', fontFamily: 'var(--ff-sans)', fontSize: '0.75rem',
              padding: '0.4rem 0.8rem', border: '1px solid var(--rule)',
              background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer',
            }}>
              Limpar historico
            </button>
          </>
        )}
      </Section>

      {/* ── Methodology ── */}
      <Section num="08" title="Metodologia">
        <div style={{ fontFamily: 'var(--ff-serif)', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--ink)' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Modo rapido:</strong> Simulacao usa arrays mutaveis sem alocacao de objetos — ~50-100k sims/s.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Setup:</strong> Cada sim sorteia coligacao (esq/centro/dir), tamanho do ministerio (15-37), e perfil (tecnico/academico/politico/centrao). Setup afeta indicadores iniciais, score de idoneidade, e bloqueia opcoes incompativeis com a coligacao.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Decisoes:</strong> {FLAT_DECISIONS.length} decisoes com opcao uniforme aleatoria (excluindo bloqueadas pela coligacao).
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Eventos:</strong> {FLAT_EVENTS.length} eventos com 40% de chance cada.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Congresso:</strong> Indicador rastreado ao longo da sim. Centro com congresso &lt; 40 bloqueia opcoes com impacto &le; -8.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Score inicial:</strong> {totalScore(INITIAL_SCORES)} pontos. Limites: fiscal 0–20, demais 0–10, total max 100.
          </p>
          <p>
            <strong>Download completo:</strong> Re-simula gravando cada passo (mais lento). Seeds aleatorios diferem da simulacao exibida.
          </p>
        </div>
      </Section>
    </ReportShell>
  );
}
