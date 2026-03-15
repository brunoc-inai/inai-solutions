export interface GovernorScores {
  fiscal: number;    // max 20
  reformas: number;  // max 10
  modern: number;    // max 10
  social: number;    // max 10
  defesa: number;    // max 10
  diplo: number;     // max 10
  saude: number;     // max 10
  educ: number;      // max 10
  idone: number;     // max 10
}

export interface Governor {
  id: string;
  name: string;
  sub: string;
  period: string;
  cat: 'historico' | 'nova-rep';
  scores: GovernorScores;
  summary: string;
}

export const SCORE_DIMENSIONS = [
  { key: 'fiscal' as const, label: 'Saúde Fiscal', max: 20, color: 'var(--purple)', icon: '💰' },
  { key: 'reformas' as const, label: 'Reformas Estruturais', max: 10, color: 'var(--teal)', icon: '🔧' },
  { key: 'modern' as const, label: 'Modernização & Infra', max: 10, color: 'var(--amber)', icon: '🏗️' },
  { key: 'social' as const, label: 'Avanços Sociais', max: 10, color: 'var(--blue)', icon: '🤝' },
  { key: 'defesa' as const, label: 'Defesa & Soberania', max: 10, color: 'var(--coral)', icon: '⚔️' },
  { key: 'diplo' as const, label: 'Diplomacia', max: 10, color: 'var(--green)', icon: '🌎' },
  { key: 'saude' as const, label: 'Saúde Pública', max: 10, color: 'var(--teal)', icon: '🏥' },
  { key: 'educ' as const, label: 'Educação', max: 10, color: 'var(--purple)', icon: '📚' },
  { key: 'idone' as const, label: 'Idoneidade', max: 10, color: 'var(--red)', icon: '⚖️' },
] as const;

export type ScoreKey = keyof GovernorScores;

export function totalScore(s: GovernorScores): number {
  return s.fiscal + s.reformas + s.modern + s.social + s.defesa + s.diplo + s.saude + s.educ + s.idone;
}

export const GOVERNORS: Governor[] = [
  {
    id: 'fhc1', name: 'Fernando H. Cardoso', sub: '1º Mandato', period: '1995–1998', cat: 'nova-rep',
    scores: { fiscal: 18, reformas: 10, modern: 9, social: 7, defesa: 6, diplo: 9, saude: 8, educ: 8, idone: 7 },
    summary: 'Consolidou o Plano Real, derrubando inflação de 2.500% para <5%. Privatizou telecom e energia. Estado Regulador moderno.'
  },
  {
    id: 'pedro2', name: 'Dom Pedro II', sub: 'Imperador', period: '1841–1889', cat: 'historico',
    scores: { fiscal: 12, reformas: 7, modern: 9, social: 7, defesa: 5, diplo: 8, saude: 5, educ: 8, idone: 9 },
    summary: 'Abolição da escravatura, modernização, integridade pessoal notável. Maior saldo positivo de longo prazo.'
  },
  {
    id: 'lula1', name: 'Luiz I. Lula da Silva', sub: '1º Mandato', period: '2003–2006', cat: 'nova-rep',
    scores: { fiscal: 15, reformas: 4, modern: 6, social: 9, defesa: 5, diplo: 9, saude: 7, educ: 8, idone: 1 },
    summary: 'Manteve tripé macroeconômico de FHC, criou Bolsa Família. Reforma Previdência dos Servidores. Mensalão.'
  },
  {
    id: 'lula2', name: 'Luiz I. Lula da Silva', sub: '2º Mandato', period: '2007–2010', cat: 'nova-rep',
    scores: { fiscal: 10, reformas: 2, modern: 6, social: 9, defesa: 6, diplo: 5, saude: 8, educ: 8, idone: 1 },
    summary: 'Commodities e pré-sal mascararam deterioração fiscal. REUNI e redução da pobreza reais. Petrolão em andamento.'
  },
  {
    id: 'fhc2', name: 'Fernando H. Cardoso', sub: '2º Mandato', period: '1999–2002', cat: 'nova-rep',
    scores: { fiscal: 12, reformas: 8, modern: 7, social: 6, defesa: 5, diplo: 7, saude: 7, educ: 7, idone: 6 },
    summary: 'Câmbio flutuante, metas de inflação, LRF. Crise energética. Consolidou reformas do 1º mandato.'
  },
  {
    id: 'vargas', name: 'Getúlio Vargas', sub: '1930–1945 / 1951–1954', period: '1930–1954', cat: 'historico',
    scores: { fiscal: 10, reformas: 9, modern: 9, social: 8, defesa: 6, diplo: 6, saude: 5, educ: 6, idone: 3 },
    summary: 'CLT, siderurgia, Petrobras, industrialização. Ditador e populista, mas transformou a estrutura do Estado.'
  },
  {
    id: 'itamar', name: 'Itamar Franco', sub: 'Presidente', period: '1992–1994', cat: 'nova-rep',
    scores: { fiscal: 13, reformas: 8, modern: 5, social: 6, defesa: 5, diplo: 6, saude: 5, educ: 5, idone: 8 },
    summary: 'Lançou o Plano Real com FHC na Fazenda. Governo de transição competente e honesto.'
  },
  {
    id: 'jk', name: 'Juscelino Kubitschek', sub: 'Presidente', period: '1956–1961', cat: 'historico',
    scores: { fiscal: 6, reformas: 6, modern: 10, social: 6, defesa: 7, diplo: 8, saude: 4, educ: 6, idone: 6 },
    summary: '50 anos em 5. Brasília, rodovias, indústria automobilística. Inflação e dívida explodiram.'
  },
  {
    id: 'temer', name: 'Michel Temer', sub: 'Presidente', period: '2016–2018', cat: 'nova-rep',
    scores: { fiscal: 14, reformas: 9, modern: 7, social: 6, defesa: 5, diplo: 5, saude: 4, educ: 4, idone: 2 },
    summary: 'Teto de gastos, reforma trabalhista. Governo impopular mas fiscalmente disciplinado. Flagrado em gravação.'
  },
  {
    id: 'bolsonaro', name: 'Jair Bolsonaro', sub: 'Presidente', period: '2019–2022', cat: 'nova-rep',
    scores: { fiscal: 16, reformas: 7, modern: 4, social: 4, defesa: 7, diplo: 2, saude: 1, educ: 3, idone: 3 },
    summary: 'Reforma da Previdência, marco do saneamento. Resposta à COVID desastrosa. Isolamento diplomático.'
  },
  {
    id: 'dilma1', name: 'Dilma Rousseff', sub: '1º Mandato', period: '2011–2014', cat: 'nova-rep',
    scores: { fiscal: 5, reformas: 4, modern: 5, social: 7, defesa: 5, diplo: 5, saude: 7, educ: 6, idone: 4 },
    summary: 'Nova Matriz Econômica. Intervenção nos preços, pedaladas. Copa e Olimpíadas.'
  },
  {
    id: 'lula3', name: 'Luiz I. Lula da Silva', sub: '3º Mandato (em curso)', period: '2023–2026', cat: 'nova-rep',
    scores: { fiscal: 4, reformas: 6, modern: 5, social: 7, defesa: 4, diplo: 5, saude: 5, educ: 5, idone: 1 },
    summary: 'Reforma tributária aprovada. Expansão fiscal sem controle. Diplomacia errática com ditaduras.'
  },
  {
    id: 'sarney', name: 'José Sarney', sub: 'Presidente', period: '1985–1990', cat: 'nova-rep',
    scores: { fiscal: 2, reformas: 6, modern: 4, social: 7, defesa: 6, diplo: 6, saude: 6, educ: 4, idone: 3 },
    summary: 'Constituição de 1988 — legado real. Cruzado, Bresser, Verão — todos fracassaram. Hiperinflação.'
  },
  {
    id: 'pedro1', name: 'Dom Pedro I', sub: 'Imperador', period: '1822–1831', cat: 'historico',
    scores: { fiscal: 5, reformas: 6, modern: 5, social: 3, defesa: 7, diplo: 7, saude: 2, educ: 4, idone: 4 },
    summary: 'Independência e Constituição de 1824. Autoritário. Perdeu a Cisplatina. Abdicou em 1831.'
  },
  {
    id: 'collor', name: 'Fernando Collor', sub: 'Presidente', period: '1990–1992', cat: 'nova-rep',
    scores: { fiscal: 4, reformas: 7, modern: 6, social: 2, defesa: 4, diplo: 7, saude: 3, educ: 3, idone: 1 },
    summary: 'Confiscou poupanças. Abriu a economia. Impeachment por corrupção. PC Farias.'
  },
  {
    id: 'deodoro', name: 'Marechal Deodoro', sub: 'Presidente', period: '1889–1891', cat: 'historico',
    scores: { fiscal: 2, reformas: 5, modern: 3, social: 3, defesa: 5, diplo: 3, saude: 2, educ: 3, idone: 4 },
    summary: 'Proclamou a República. Encilhamento financeiro. Tentou fechar o Congresso. Renunciou.'
  },
  {
    id: 'dilma2', name: 'Dilma Rousseff', sub: '2º Mandato (impeachment)', period: '2015–2016', cat: 'nova-rep',
    scores: { fiscal: 1, reformas: 3, modern: 2, social: 4, defesa: 3, diplo: 3, saude: 4, educ: 3, idone: 3 },
    summary: 'Pior recessão desde os anos 30. Pedaladas fiscais. Impeachment. Referência de piso.'
  },
];
