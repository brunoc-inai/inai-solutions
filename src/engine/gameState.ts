import { create } from 'zustand';
import type { GovernorScores, ScoreKey } from '../data/governors';
import type { MinistrySize, MinistryProfile } from '../data/ministries';
import type { DecisionOption } from '../data/chapters';
import type { EventOption, GameEvent } from '../data/events';
import { CHAPTERS, PHASES } from '../data/chapters';
import { EVENTS } from '../data/events';
import { type DREState, createInitialDRE, applyDecisionToDRE } from './dreModel';
import { getCongressMultiplier as getCongressMultiplierFn } from './coalitionRules';

export type CongressComposition = 'esquerda' | 'centro' | 'direita';
export type GameScreen =
  | 'title'
  | 'congress-setup'
  | 'ministry-setup'
  | 'chapter'
  | 'event'
  | 'phase-report'
  | 'ranking';

export interface Indicators {
  fiscal: number;      // 0-100
  popular: number;     // 0-100
  congress: number;    // 0-100
  sovereignty: number; // 0-100
}

export interface ChoiceRecord {
  chapterId: string;
  decisionId: string;
  optionIndex: number;
  label: string;
  indicatorDeltas: Partial<Indicators>;
  scoreDeltas: Partial<GovernorScores>;
  phase: number;
  order: number;
}

export interface EventRecord {
  eventId: string;
  optionIndex: number;
  label: string;
  indicatorDeltas: Partial<Indicators>;
  scoreDeltas: Partial<GovernorScores>;
  eventTitle: string;
  order: number;
}

export interface GameState {
  // Navigation
  screen: GameScreen;
  currentPhase: number;
  currentChapterIndex: number;
  pendingEvent: GameEvent | null;
  eventHistory: EventRecord[];

  // Setup
  congressComposition: CongressComposition | null;
  ministrySize: MinistrySize | null;
  ministryProfile: MinistryProfile | null;

  // Running state
  indicators: Indicators;
  scores: GovernorScores;
  choices: ChoiceRecord[];
  impeached: boolean;
  impeachmentReason: 'fiscal' | 'congress' | null;
  fiscalWarningTurns: number; // consecutive chapters below fiscal threshold
  turnCount: number;
  decisionOrder: number;
  dre: DREState;

  // Actions
  setScreen: (s: GameScreen) => void;
  setupCongress: (c: CongressComposition) => void;
  setupMinistry: (size: MinistrySize, profile: MinistryProfile) => void;
  makeDecision: (chapterId: string, decisionId: string, optionIndex: number, option: DecisionOption) => void;
  resolveEvent: (eventId: string, optionIndex: number, option: EventOption) => void;
  dismissEvent: () => void;
  advanceChapter: () => void;
  advancePhase: () => void;
  resetGame: () => void;
}

const INITIAL_INDICATORS: Indicators = {
  fiscal: 35,      // Starts at deficit
  popular: 70,     // Honeymoon period
  congress: 50,    // Neutral
  sovereignty: 60, // Reasonable
};

const INITIAL_SCORES: GovernorScores = {
  fiscal: 10, reformas: 5, modern: 5, social: 5,
  defesa: 5, diplo: 5, saude: 5, educ: 5, idone: 7,
};

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function clampIndicators(ind: Indicators): Indicators {
  return {
    fiscal: clamp(ind.fiscal, 0, 100),
    popular: clamp(ind.popular, 0, 100),
    congress: clamp(ind.congress, 0, 100),
    sovereignty: clamp(ind.sovereignty, 0, 100),
  };
}

function clampScores(s: GovernorScores): GovernorScores {
  return {
    fiscal: clamp(s.fiscal, 0, 20),
    reformas: clamp(s.reformas, 0, 10),
    modern: clamp(s.modern, 0, 10),
    social: clamp(s.social, 0, 10),
    defesa: clamp(s.defesa, 0, 10),
    diplo: clamp(s.diplo, 0, 10),
    saude: clamp(s.saude, 0, 10),
    educ: clamp(s.educ, 0, 10),
    idone: clamp(s.idone, 0, 10),
  };
}

function applyIndicators(current: Indicators, delta: Partial<Indicators>): Indicators {
  return clampIndicators({
    fiscal: current.fiscal + (delta.fiscal || 0),
    popular: current.popular + (delta.popular || 0),
    congress: current.congress + (delta.congress || 0),
    sovereignty: current.sovereignty + (delta.sovereignty || 0),
  });
}

function applyScores(current: GovernorScores, delta: Partial<GovernorScores>): GovernorScores {
  const result = { ...current };
  for (const key of Object.keys(delta) as ScoreKey[]) {
    result[key] = result[key] + (delta[key] || 0);
  }
  return clampScores(result);
}

// Apply score penalties when impeachment occurs
function applyImpeachmentPenalty(scores: GovernorScores, reason: 'fiscal' | 'congress'): GovernorScores {
  if (reason === 'fiscal') {
    // Fiscal impeachment: -6 on fiscal score, -1 on all others
    return clampScores({
      fiscal: scores.fiscal - 6,
      reformas: scores.reformas - 1,
      modern: scores.modern - 1,
      social: scores.social - 1,
      defesa: scores.defesa - 1,
      diplo: scores.diplo - 1,
      saude: scores.saude - 1,
      educ: scores.educ - 1,
      idone: scores.idone - 1,
    });
  }
  // Congress impeachment: -1 on all scores
  return clampScores({
    fiscal: scores.fiscal - 1,
    reformas: scores.reformas - 1,
    modern: scores.modern - 1,
    social: scores.social - 1,
    defesa: scores.defesa - 1,
    diplo: scores.diplo - 1,
    saude: scores.saude - 1,
    educ: scores.educ - 1,
    idone: scores.idone - 1,
  });
}

// Pick a random event that hasn't been used yet
function pickRandomEvent(history: EventRecord[]): GameEvent | null {
  const usedIds = new Set(history.map(e => e.eventId));
  const available = EVENTS.filter(e => !usedIds.has(e.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

// Coalition-specific indicator modifiers for certain decisions
// Some decisions have different congress impacts depending on coalition
type CoalitionModifier = {
  decisionId: string;
  optionIndex: number;
  congressByCoalition: Record<CongressComposition, number>;
};

const COALITION_MODIFIERS: CoalitionModifier[] = [
  {
    decisionId: 'clt', optionIndex: 1, // Regulamentação de apps/plataformas
    congressByCoalition: { esquerda: 3, centro: 0, direita: -3 },
  },
];

export function getCoalitionBonus(
  coalition: CongressComposition | null,
  decisionId: string,
  optionIndex: number,
): Partial<Indicators> {
  if (!coalition) return {};
  const mod = COALITION_MODIFIERS.find(m => m.decisionId === decisionId && m.optionIndex === optionIndex);
  if (!mod) return {};
  return { congress: mod.congressByCoalition[coalition] };
}

// Cross-indicator effects (interactions from GDD)
function applyInteractions(ind: Indicators): Indicators {
  const result = { ...ind };

  // Fiscal > 70 → Popular +2, Congress +2
  if (ind.fiscal > 70) {
    result.popular = result.popular + 2;
    result.congress = result.congress + 2;
  }
  // Fiscal < 20 → Popular -3, Congress -3
  if (ind.fiscal < 20) {
    result.popular = result.popular - 3;
    result.congress = result.congress - 3;
  }
  // Popular > 55 → Congress +3
  if (ind.popular > 55) {
    result.congress = result.congress + 3;
  }
  // Popular < 30 → Congress -5
  if (ind.popular < 30) {
    result.congress = result.congress - 5;
  }

  return clampIndicators(result);
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'title',
  currentPhase: 0,
  currentChapterIndex: 0,
  pendingEvent: null,
  eventHistory: [],

  congressComposition: null,
  ministrySize: null,
  ministryProfile: null,

  indicators: { ...INITIAL_INDICATORS },
  scores: { ...INITIAL_SCORES },
  choices: [],
  impeached: false,
  impeachmentReason: null,
  fiscalWarningTurns: 0,
  turnCount: 0,
  decisionOrder: 0,
  dre: createInitialDRE(),

  setScreen: (s) => set({ screen: s }),

  setupCongress: (c) => {
    const ind = { ...INITIAL_INDICATORS };
    // Congress composition affects starting indicators
    if (c === 'esquerda') {
      ind.congress = 55; // More aligned
      ind.fiscal = 30;   // Tends to expand
    } else if (c === 'centro') {
      ind.congress = 60; // Pragmatic
      ind.fiscal = 35;
    } else {
      ind.congress = 45; // Harder to manage
      ind.fiscal = 40;   // More fiscally disciplined
    }
    set({
      congressComposition: c,
      indicators: ind,
      screen: 'ministry-setup',
    });
  },

  setupMinistry: (size, profile) => {
    const state = get();
    const ind = { ...state.indicators };
    const scores = { ...state.scores };

    // Size effects — fiscal indicator is fixed, congress varies by coalition
    const fiscalBySize: Record<MinistrySize, number> = {
      15: 5, 20: 3, 25: 0, 30: -4, 37: -10,
    };
    const congressByCoalition: Record<string, Record<MinistrySize, number>> = {
      centro:   { 15: -15, 20: -5, 25: 0, 30: 8, 37: 15 },
      direita:  { 15: 0, 20: 10, 25: 5, 30: 5, 37: 0 },
      esquerda: { 15: -10, 20: -10, 25: 0, 30: 5, 37: 10 },
    };
    // Size fiscal SCORE penalty — large ministries = administrative bloat
    const fiscalScoreBySize: Record<MinistrySize, number> = {
      15: 2, 20: 1, 25: 0, 30: -2, 37: -4,
    };
    const coalition = state.congressComposition || 'centro';
    ind.congress += congressByCoalition[coalition][size];
    ind.fiscal += fiscalBySize[size];
    scores.fiscal = clamp(scores.fiscal + fiscalScoreBySize[size], 0, 20);

    // Profile effects on indicators and scores
    const profileConfigs: Record<MinistryProfile, { congress: number; fiscal: number; idone: number; fiscalScore: number }> = {
      tecnico:  { congress: 0,  fiscal: 3,   idone: 1,  fiscalScore: 2 },
      academico:{ congress: 3,  fiscal: 1,   idone: 0,  fiscalScore: 1 },
      politico: { congress: 12, fiscal: -5,  idone: -1, fiscalScore: 0 },
      centrao:  { congress: 20, fiscal: -12, idone: -2, fiscalScore: -2 },
    };
    const pc = profileConfigs[profile];
    ind.congress += pc.congress;
    ind.fiscal += pc.fiscal;
    scores.idone = clamp(scores.idone + pc.idone, 0, 10);
    scores.fiscal = clamp(scores.fiscal + pc.fiscalScore, 0, 20);

    set({
      ministrySize: size,
      ministryProfile: profile,
      indicators: clampIndicators(ind),
      scores: clampScores(scores),
      screen: 'chapter',
      currentPhase: 1,
      currentChapterIndex: 0,
    });
  },

  makeDecision: (chapterId, decisionId, optionIndex, option) => {
    const state = get();
    const coalitionBonus = getCoalitionBonus(state.congressComposition, decisionId, optionIndex);
    const baseCongress = (option.indicators.congress || 0) + (coalitionBonus.congress || 0);
    const congressMultiplier = getCongressMultiplierFn(state.congressComposition, decisionId);
    const mergedDeltas: Partial<Indicators> = {
      fiscal: (option.indicators.fiscal || 0) + (coalitionBonus.fiscal || 0),
      popular: (option.indicators.popular || 0) + (coalitionBonus.popular || 0),
      congress: Math.round(baseCongress * congressMultiplier),
      sovereignty: (option.indicators.sovereignty || 0) + (coalitionBonus.sovereignty || 0),
    };
    const newInd = applyIndicators(state.indicators, mergedDeltas);
    const newScores = applyScores(state.scores, option.scores);
    const newOrder = state.decisionOrder + 1;
    const newDre = applyDecisionToDRE(state.dre, state.currentPhase, mergedDeltas, option.scores);

    set({
      indicators: applyInteractions(newInd),
      scores: newScores,
      choices: [...state.choices, {
        chapterId, decisionId, optionIndex, label: option.label,
        indicatorDeltas: mergedDeltas,
        scoreDeltas: option.scores,
        phase: state.currentPhase,
        order: newOrder,
      }],
      turnCount: state.turnCount + 1,
      decisionOrder: newOrder,
      dre: newDre,
    });
  },

  resolveEvent: (eventId, optionIndex, option) => {
    const state = get();
    const newInd = applyIndicators(state.indicators, option.indicators);
    const newScores = applyScores(state.scores, option.scores);
    const newOrder = state.decisionOrder + 1;
    const newDre = applyDecisionToDRE(state.dre, state.currentPhase, option.indicators, option.scores);

    // Keep pendingEvent alive so EventScreen can show "Continuar"
    // dismissEvent() will clear it and route back to the game
    set({
      indicators: applyInteractions(newInd),
      scores: newScores,
      eventHistory: [...state.eventHistory, {
        eventId, optionIndex, label: option.label,
        indicatorDeltas: option.indicators,
        scoreDeltas: option.scores,
        eventTitle: state.pendingEvent?.title || eventId,
        order: newOrder,
      }],
      decisionOrder: newOrder,
      dre: newDre,
    });
  },

  dismissEvent: () => {
    const state = get();
    const chapters = CHAPTERS;
    const nextIndex = state.currentChapterIndex + 1;

    // Clear the event
    const base: Partial<GameState> = { pendingEvent: null as GameEvent | null };

    // Congress impeachment is immediate
    if (state.indicators.congress < 25) {
      set({ ...base, impeached: true, impeachmentReason: 'congress' as const, scores: applyImpeachmentPenalty(state.scores, 'congress'), screen: 'ranking' as GameScreen });
      return;
    }

    // Fiscal: progressive warning system (3 consecutive chapters below threshold)
    if (state.indicators.fiscal < 25) {
      const newWarning = state.fiscalWarningTurns + 1;
      if (newWarning >= 3) {
        // 3rd turn below → impeachment
        set({ ...base, impeached: true, impeachmentReason: 'fiscal' as const, fiscalWarningTurns: newWarning, scores: applyImpeachmentPenalty(state.scores, 'fiscal'), screen: 'ranking' as GameScreen });
        return;
      }
      // Apply -20 popular and -20 congress penalty each turn below threshold
      const penalizedInd = clampIndicators({
        ...state.indicators,
        popular: state.indicators.popular - 20,
        congress: state.indicators.congress - 20,
      });
      base.fiscalWarningTurns = newWarning;
      base.indicators = penalizedInd;
    } else if (state.fiscalWarningTurns > 0) {
      // Recovered above threshold — reset counter
      base.fiscalWarningTurns = 0;
    }

    // Advance to next chapter or phase report or ranking
    if (nextIndex >= chapters.length) {
      set({ ...base, screen: 'ranking' as GameScreen });
      return;
    }

    const nextChapter = chapters[nextIndex];
    const isNewPhase = nextChapter.phase !== state.currentPhase;

    if (isNewPhase) {
      set({ ...base, currentChapterIndex: nextIndex, screen: 'phase-report' as GameScreen });
    } else {
      set({ ...base, currentChapterIndex: nextIndex, screen: 'chapter' as GameScreen });
    }
  },

  advanceChapter: () => {
    const state = get();
    const chapters = CHAPTERS;
    const nextIndex = state.currentChapterIndex + 1;

    // Congress impeachment is immediate
    if (state.indicators.congress < 25) {
      set({ impeached: true, impeachmentReason: 'congress' as const, scores: applyImpeachmentPenalty(state.scores, 'congress'), screen: 'ranking' });
      return;
    }

    // Fiscal: progressive warning system (3 consecutive chapters below threshold)
    const fiscalUpdates: Partial<GameState> = {};
    if (state.indicators.fiscal < 25) {
      const newWarning = state.fiscalWarningTurns + 1;
      if (newWarning >= 3) {
        set({ impeached: true, impeachmentReason: 'fiscal' as const, fiscalWarningTurns: newWarning, scores: applyImpeachmentPenalty(state.scores, 'fiscal'), screen: 'ranking' });
        return;
      }
      const penalizedInd = clampIndicators({
        ...state.indicators,
        popular: state.indicators.popular - 20,
        congress: state.indicators.congress - 20,
      });
      fiscalUpdates.fiscalWarningTurns = newWarning;
      fiscalUpdates.indicators = penalizedInd;
    } else if (state.fiscalWarningTurns > 0) {
      fiscalUpdates.fiscalWarningTurns = 0;
    }

    // Maybe trigger random event (40% chance after each chapter)
    if (Math.random() < 0.4 && !state.pendingEvent) {
      const event = pickRandomEvent(state.eventHistory);
      if (event) {
        set({ ...fiscalUpdates, pendingEvent: event, screen: 'event' });
        return;
      }
    }

    if (nextIndex >= chapters.length) {
      // Game over - go to ranking
      set({ ...fiscalUpdates, screen: 'ranking' });
      return;
    }

    const nextChapter = chapters[nextIndex];
    const currentPhaseChapters = chapters.filter(c => c.phase === state.currentPhase);
    const isNewPhase = nextChapter.phase !== state.currentPhase;

    if (isNewPhase) {
      // Show phase report first
      set({
        ...fiscalUpdates,
        currentChapterIndex: nextIndex,
        screen: 'phase-report',
      });
    } else {
      set({
        ...fiscalUpdates,
        currentChapterIndex: nextIndex,
        screen: 'chapter',
      });
    }
  },

  advancePhase: () => {
    const state = get();
    const nextChapter = CHAPTERS[state.currentChapterIndex];
    set({
      currentPhase: nextChapter.phase,
      screen: 'chapter',
    });
  },

  resetGame: () => set({
    screen: 'title',
    currentPhase: 0,
    currentChapterIndex: 0,
    pendingEvent: null,
    eventHistory: [],
    congressComposition: null,
    ministrySize: null,
    ministryProfile: null,
    indicators: { ...INITIAL_INDICATORS },
    scores: { ...INITIAL_SCORES },
    choices: [],
    impeached: false,
    impeachmentReason: null,
    fiscalWarningTurns: 0,
    turnCount: 0,
    decisionOrder: 0,
    dre: createInitialDRE(),
  }),
}));
