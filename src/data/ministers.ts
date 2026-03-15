/* ═══════════════════════════════════════
   Ministros consultáveis durante o jogo
   Cada um abre reports com dados reais
   ═══════════════════════════════════════ */

export interface MinisterReport {
  id: string;
  label: string;
  files: string[]; // report component IDs
}

export interface Minister {
  id: string;
  title: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  reports: MinisterReport[];
}

export const MINISTERS: Minister[] = [
  {
    id: 'defesa',
    title: 'Ministro da Defesa',
    name: 'Gen. (Res.) Augusto Lima',
    icon: '⚔️',
    color: 'var(--coral)',
    description: 'Forças Armadas, orçamento militar, prontidão operacional e projeção estratégica.',
    reports: [
      { id: 'brasil-defesa', label: 'Relatório de Defesa 2026', files: ['defesa'] },
    ],
  },
  {
    id: 'itamaraty',
    title: 'Chanceler do Itamaraty',
    name: 'Amb. Helena Vasconcelos',
    icon: '🌎',
    color: 'var(--green)',
    description: 'Política externa, comércio internacional, alianças e posicionamento geopolítico.',
    reports: [
      { id: 'diplomacia', label: 'Diplomacia Brasileira', files: ['diplomacia'] },
    ],
  },
  {
    id: 'fazenda',
    title: 'Ministro da Fazenda e Economia',
    name: 'Dr. Ricardo Mendes',
    icon: '💰',
    color: 'var(--purple)',
    description: 'Política fiscal, tributária, orçamento, dívida pública e projeções macroeconômicas.',
    reports: [
      { id: 'cortes', label: 'Cortes Orçamentários', files: ['cortes'] },
      { id: 'balanca', label: 'Balança de Pagamentos', files: ['balanca'] },
      { id: 'fiscal', label: 'Estudos Fiscais', files: ['fiscal'] },
      { id: 'dre', label: 'DRE Governamental', files: ['dre'] },
    ],
  },
  {
    id: 'saude',
    title: 'Ministro da Saúde',
    name: 'Dra. Ana Beatriz Torres',
    icon: '🏥',
    color: 'var(--teal)',
    description: 'SUS, vigilância sanitária, epidemiologia e infraestrutura hospitalar.',
    reports: [
      { id: 'saude', label: 'Saúde Pública — Brasil 2025', files: ['saude'] },
    ],
  },
  {
    id: 'educacao',
    title: 'Ministro da Educação',
    name: 'Prof. Marcos Ribeiro',
    icon: '📚',
    color: 'var(--blue)',
    description: 'Ensino básico, superior, técnico, ENEM e indicadores PISA.',
    reports: [
      { id: 'educacao', label: 'Educação — Relatório Brasil', files: ['educacao'] },
    ],
  },
  {
    id: 'seguranca',
    title: 'Ministro da Segurança Pública',
    name: 'Del. Carla Nogueira',
    icon: '🛡️',
    color: 'var(--red)',
    description: 'Criminalidade, sistema penitenciário, polícias e inteligência.',
    reports: [
      { id: 'criminalidade', label: 'Criminalidade no Brasil', files: ['criminalidade'] },
    ],
  },
  {
    id: 'casacivil',
    title: 'Ministro da Casa Civil',
    name: 'Sen. Paulo Ferreira',
    icon: '🏛️',
    color: 'var(--amber)',
    description: 'Articulação política, estrutura governamental e coordenação interministerial.',
    reports: [
      { id: 'estrutura-gov', label: 'Análise Estrutural do Governo', files: ['estrutura'] },
    ],
  },
  {
    id: 'ibge',
    title: 'Assessor-Chefe IBGE',
    name: 'Dra. Fernanda Costa',
    icon: '📊',
    color: 'var(--text-muted)',
    description: 'Dados demográficos, PIB, emprego, inflação e indicadores sociais.',
    reports: [
      { id: 'demografico', label: 'Brasil Demográfico 2025', files: ['demografico'] },
    ],
  },
  {
    id: 'bolsafamilia',
    title: 'Secretário do Bolsa Família',
    name: 'João Antônio Silva',
    icon: '🤝',
    color: 'var(--teal)',
    description: 'Transferência de renda, cadastro único, pobreza estrutural e inclusão.',
    reports: [
      { id: 'pobreza', label: 'Pobreza Estrutural no Brasil', files: ['pobreza'] },
    ],
  },
  {
    id: 'industria',
    title: 'Secretário de Indústria e Comércio',
    name: 'Eng. Roberto Nakamura',
    icon: '🏭',
    color: 'var(--amber)',
    description: 'Competitividade, reforma trabalhista, indústria e comércio exterior.',
    reports: [
      { id: 'competitividade', label: 'Competitividade Internacional', files: ['competitividade'] },
      { id: 'reforma-trab', label: 'Super Reforma Trabalhista', files: ['reforma-trab'] },
    ],
  },
];
