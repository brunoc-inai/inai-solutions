/* ═══════════════════════════════════════
   Acesso à Informação por Perfil de Ministério
   Técnicos sabem de finanças, políticos sabem de política
   ═══════════════════════════════════════ */

import type { MinistryProfile } from '../data/ministries';

export type InfoLevel = 'precise' | 'directional' | 'hidden';

export interface ProfileInfoAccess {
  fiscal: InfoLevel;
  popular: InfoLevel;
  congress: InfoLevel;
  sovereignty: InfoLevel;
  reportAccessPct: number; // 0.0 – 1.0
}

/**
 * Técnico: sabe tudo de fiscal/soberania, não entende política
 * Acadêmico: visão geral direcional de tudo
 * Político: só entende apoio popular e congresso
 * Centrão: idem político mas sem relatórios
 */
const PROFILE_ACCESS: Record<MinistryProfile, ProfileInfoAccess> = {
  tecnico: {
    fiscal: 'precise',
    popular: 'directional',
    congress: 'hidden',
    sovereignty: 'precise',
    reportAccessPct: 1.0,
  },
  academico: {
    fiscal: 'directional',
    popular: 'directional',
    congress: 'directional',
    sovereignty: 'directional',
    reportAccessPct: 0.9,
  },
  politico: {
    fiscal: 'hidden',
    popular: 'precise',
    congress: 'precise',
    sovereignty: 'hidden',
    reportAccessPct: 0.5,
  },
  centrao: {
    fiscal: 'hidden',
    popular: 'precise',
    congress: 'precise',
    sovereignty: 'hidden',
    reportAccessPct: 0.0,
  },
};

export function getProfileAccess(profile: MinistryProfile | null): ProfileInfoAccess {
  if (!profile) {
    // Default: full access (before setup)
    return { fiscal: 'precise', popular: 'precise', congress: 'precise', sovereignty: 'precise', reportAccessPct: 1.0 };
  }
  return PROFILE_ACCESS[profile];
}

/**
 * Deterministic pseudo-random filter for reports.
 * Uses a simple hash of report ID to decide inclusion.
 * Stable across renders (same profile → same reports hidden).
 */
function simpleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function isReportAccessible(reportId: string, profile: MinistryProfile | null): boolean {
  if (!profile) return true;
  const access = PROFILE_ACCESS[profile];
  if (access.reportAccessPct >= 1.0) return true;
  if (access.reportAccessPct <= 0.0) return false;
  // Deterministic: hash report ID, check if it falls within accessible %
  const hash = simpleHash(reportId);
  return (hash % 100) / 100 < access.reportAccessPct;
}
