/* ═══════════════════════════════════════
   12 Capítulos de Decisão
   Organizados em 4 Fases (mandato de 4 anos)
   Sincronizado com planilha "resultados br possiveis.xlsx"
   ═══════════════════════════════════════ */

import type { GovernorScores } from './governors';

export interface DecisionOption {
  label: string;
  description: string;
  indicators: {
    fiscal?: number;
    popular?: number;
    congress?: number;
    sovereignty?: number;
  };
  scores: Partial<GovernorScores>;
}

export interface Decision {
  id: string;
  name: string;
  options: DecisionOption[];
}

export interface ChapterReport {
  id: string;       // key in REPORT_COMPONENTS (MinisterConsult)
  label: string;    // display name
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  phase: 1 | 2 | 3 | 4;
  color: string;
  description: string;
  context: string;
  relatedReports: ChapterReport[];
  decisions: Decision[];
}

export const PHASES = [
  { id: 1, label: 'Fase 1 — Economia e Finanças', period: 'Anos 1–2', color: 'var(--purple)' },
  { id: 2, label: 'Fase 2 — Reformas Estruturais', period: 'Anos 2–3', color: 'var(--teal)' },
  { id: 3, label: 'Fase 3 — Serviços Públicos', period: 'Anos 2–4', color: 'var(--blue)' },
  { id: 4, label: 'Fase 4 — Desenvolvimento e Infraestrutura', period: 'Anos 3–4', color: 'var(--coral)' },
] as const;

export const CHAPTERS: Chapter[] = [
  // ═══ FASE 1 — Economia e Finanças ═══
  {
    id: 'fiscal', number: 1, title: 'Política Fiscal', phase: 1, color: 'var(--purple)',
    description: 'O Brasil tem déficit primário estrutural. Defina a direção: austeridade, gradualismo ou expansão.',
    context: 'O Brasil encerra 2025 com déficit primário de R$230 bilhões e dívida pública de 78% do PIB. O mercado financeiro exige sinais claros de disciplina fiscal, enquanto a população demanda serviços públicos e investimentos. As emendas parlamentares — R$50 bilhões impositivos — engessam o orçamento e alimentam o sistema de troca política que sustenta a coalizão governamental.\n\nSua primeira decisão como presidente define o tom econômico do mandato inteiro. Um ajuste fiscal duro derruba a popularidade imediatamente, mas pode estabilizar a dívida e atrair investimento estrangeiro. Expansão de gastos gera apoio de curto prazo mas pode detonar uma crise de confiança nos mercados.',
    relatedReports: [
      { id: 'fiscal', label: 'Estudos Fiscais' },
      { id: 'cortes', label: 'Cortes Orçamentários' },
      { id: 'dre', label: 'DRE Governamental' },
    ],
    decisions: [
      {
        id: 'meta_fiscal', name: 'Meta Fiscal',
        options: [
          { label: 'Superávit primário de 2%', description: 'Cortes profundos e impopulares para zerar e superar o déficit.', indicators: { fiscal: 18, popular: -12, congress: -8 }, scores: { fiscal: 3, social: -1, saude: -1, educ: -1 } },
          { label: 'Déficit zero', description: 'Ajuste gradual sem criar superávit. Mercado aceita, povo tolera.', indicators: { fiscal: 10, popular: -5, congress: -3 }, scores: { reformas: -1 } },
          { label: 'Déficit controlado de 0.5%', description: 'Aceitar déficit pequeno para manter investimentos públicos.', indicators: { fiscal: 3, popular: 2, congress: 3 }, scores: { fiscal: -1, modern: -1 } },
          { label: 'Expandir gasto público', description: 'Investimento pesado via endividamento. Popular no curto prazo.', indicators: { fiscal: -15, popular: 10, congress: 8 }, scores: { fiscal: -2, social: 1, reformas: -1 } },
        ]
      },
      {
        id: 'emendas', name: 'Emendas Parlamentares',
        options: [
          { label: 'Contingenciar em déficit', description: 'Congresso perde verbas. Risco político enorme.', indicators: { fiscal: 8, congress: -15 }, scores: { fiscal: 1, idone: 1 } },
          { label: 'Manter impositivas (R$50bi)', description: 'Status quo. Congresso feliz, orçamento engessado.', indicators: { fiscal: -5, congress: 5 }, scores: {} },
          { label: 'Negociar redução para R$20bi', description: 'Meio-termo difícil mas possível com popularidade alta.', indicators: { fiscal: 5, congress: -6 }, scores: { fiscal: 1 } },
          { label: 'Extinção gradual com contrapartida', description: 'Trocar emendas por transferências diretas aos municípios.', indicators: { fiscal: 6, popular: 3, congress: -10 }, scores: { fiscal: 1, reformas: 1 } },
        ]
      },
    ]
  },
  {
    id: 'monetaria', number: 2, title: 'Política Monetária', phase: 1, color: 'var(--purple)',
    description: 'A relação com o Banco Central define credibilidade. Autonomia ou alinhamento?',
    context: 'A taxa Selic está em 14,25% e a inflação acumulada ronda os 5%. O Banco Central autônomo resiste à pressão política para baixar juros, mas o presidente tem o poder de indicar diretores e o próximo presidente do BC. A política cambial afeta diretamente o preço dos combustíveis, o custo da dívida externa e a competitividade das exportações.\n\nHistoricamente, governos que interferiram no BC — como a Nova Matriz Econômica de 2012-2014 — pagaram o preço com inflação descontrolada e recessão. Mas juros altos estrangulam o investimento produtivo e encarecem a dívida pública em R$800 bilhões/ano.',
    relatedReports: [
      { id: 'fiscal', label: 'Estudos Fiscais' },
      { id: 'balanca', label: 'Balança de Pagamentos' },
    ],
    decisions: [
      {
        id: 'bc_autonomia', name: 'Autonomia do BC',
        options: [
          { label: 'Autonomia total + mandato fixo', description: 'BC opera sem interferência. Mercado celebra.', indicators: { fiscal: 12, popular: -3, congress: -2 }, scores: { fiscal: 2, reformas: 1, idone: 1 } },
          { label: 'Autonomia operacional', description: 'BC decide juros mas consulta governo sobre metas.', indicators: { fiscal: 6 }, scores: { fiscal: 1 } },
          { label: 'Indicar presidente aliado', description: 'BC com perfil dovish. Juros caem mas credibilidade cai.', indicators: { fiscal: -8, popular: 5, congress: 3 }, scores: { fiscal: -1, idone: -1 } },
          { label: 'Pressão pública por juros baixos', description: 'Atacar BC na mídia. Popular no curto prazo, desastre no médio.', indicators: { fiscal: -15, popular: 8, congress: 2, sovereignty: -5 }, scores: { fiscal: -2, idone: -1 } },
        ]
      },
      {
        id: 'cambio', name: 'Política Cambial',
        options: [
          { label: 'Câmbio flutuante livre', description: 'Mercado define. Volatilidade mas credibilidade.', indicators: { fiscal: 5, sovereignty: 3 }, scores: { fiscal: 1, diplo: 1 } },
          { label: 'Intervenção pontual via swaps', description: 'BC intervém em crises. Equilíbrio pragmático.', indicators: { fiscal: 2 }, scores: {} },
          { label: 'Controle cambial', description: 'Dólar artificial. Proteção temporária, distorção permanente.', indicators: { fiscal: -10, popular: 3, sovereignty: -8 }, scores: { fiscal: -2, diplo: -2, modern: -1 } },
        ]
      },
    ]
  },
  {
    id: 'tributaria', number: 3, title: 'Reforma Tributária', phase: 1, color: 'var(--purple)',
    description: 'O sistema tributário brasileiro é um dos mais complexos do mundo. Simplificar tem custo político.',
    context: 'Empresas brasileiras gastam 1.500 horas por ano apenas para calcular impostos — 10x mais que a média da OCDE. O sistema tem 5 tributos sobre consumo (ICMS, ISS, IPI, PIS, COFINS), guerra fiscal entre estados e cumulatividade que encarece a cadeia produtiva. A reforma do IVA aprovada em 2023 propõe unificar tudo, mas a alíquota estimada de 26-28% seria a maior do mundo.\n\nO imposto de renda também precisa de atenção: o Brasil é um dos poucos países que isenta dividendos distribuídos a acionistas, enquanto assalariados pagam até 27,5%. Qualquer mudança mexe com interesses poderosos no Congresso.',
    relatedReports: [
      { id: 'fiscal', label: 'Estudos Fiscais' },
      { id: 'competitividade', label: 'Competitividade Internacional' },
    ],
    decisions: [
      {
        id: 'modelo_tributario', name: 'Modelo Tributário',
        options: [
          { label: 'IVA dual (federal + estadual)', description: 'Como a reforma aprovada em 2023. Simplifica mas transição longa. IVA de 26-28% é regressivo.', indicators: { fiscal: 8, popular: 2, congress: -5 }, scores: { fiscal: 2, reformas: 2, social: -1 } },
          { label: 'IVA único nacional', description: 'Mais eficiente mas estados perdem autonomia. Risco inflacionário na transição.', indicators: { fiscal: 14, popular: 3, congress: -15 }, scores: { fiscal: 2, reformas: 3, social: -2 } },
          { label: 'Reforma incremental', description: 'Ajustes pontuais. Pouco ganho, perpetua ineficiências.', indicators: { fiscal: 3, congress: 2 }, scores: { reformas: 1, fiscal: -1 } },
          { label: 'Manter sistema atual', description: 'Nenhuma reforma. Congresso aliviado, decadência fiscal acelera.', indicators: { congress: 5 }, scores: { fiscal: -2, reformas: -2 } },
        ]
      },
      {
        id: 'imposto_renda', name: 'Imposto de Renda',
        options: [
          { label: 'Ampliar faixa de isenção + taxar dividendos', description: 'Redistribuição. Popular mas empresários resistem.', indicators: { fiscal: 4, popular: 8, congress: -4 }, scores: { reformas: 1, social: 1 } },
          { label: 'Flat tax de 20%', description: 'Simples e eficiente. Impopular com a base trabalhadora.', indicators: { fiscal: 10, popular: -8, congress: -3 }, scores: { fiscal: 2, reformas: 1 } },
          { label: 'Manter estrutura atual', description: 'Sem mudanças.', indicators: {}, scores: { reformas: -1 } },
        ]
      },
    ]
  },

  // ═══ FASE 2 — Reformas Estruturais ═══
  {
    id: 'previdencia', number: 4, title: 'Reforma da Previdência', phase: 2, color: 'var(--teal)',
    description: 'O déficit previdenciário consome 44% da receita líquida. Reformar é impopular mas necessário.',
    context: 'O déficit da previdência social alcança R$375 bilhões — quase metade da receita líquida do governo federal. O Brasil gasta 13% do PIB com aposentadorias, mais que países muito mais velhos como a Alemanha (10%) e o Japão (10%). A reforma de 2019 ajudou, mas não resolveu: a idade média de aposentadoria ainda é 59 anos para homens.\n\nO caso militar é particularmente explosivo: a previdência militar custa R$53,8 bilhões com apenas 370 mil beneficiários — R$145 mil por militar/ano vs. R$21 mil por civil/ano. As pensões vitalícias de filhas de militares, herança de 1960, custam R$6,3 bilhões sem equivalente no mundo.',
    relatedReports: [
      { id: 'fiscal', label: 'Estudos Fiscais' },
      { id: 'demografico', label: 'Brasil Demográfico 2025' },
      { id: 'brasil-defesa', label: 'Relatório de Defesa' },
    ],
    decisions: [
      {
        id: 'idade_minima', name: 'Idade Mínima',
        options: [
          { label: 'Idade mínima 67 anos (modelo alemão)', description: 'Economia máxima. Extremamente impopular. Impacto social severo.', indicators: { fiscal: 18, popular: -18, congress: -12 }, scores: { fiscal: 4, reformas: 3, social: -2 } },
          { label: 'Idade mínima 65 anos', description: 'Como a reforma de 2019. Equilíbrio testado.', indicators: { fiscal: 12, popular: -10, congress: -6 }, scores: { fiscal: 1, reformas: 1 } },
          { label: 'Regra de transição suave (62/57)', description: 'Ajuste gradual. Efeito fiscal menor.', indicators: { fiscal: 6, popular: -5, congress: -2 }, scores: {} },
          { label: 'Não reformar', description: 'Bomba fiscal permanece. Déficit previdenciário triplicou em 16 anos.', indicators: { fiscal: -5, popular: 3, congress: 5 }, scores: { fiscal: -4, reformas: -3, defesa: -1 } },
        ]
      },
      {
        id: 'militares', name: 'Previdência Militar',
        options: [
          { label: 'Igualar regras civis e militares', description: 'Economia enorme. Militares revoltados. R$53,8bi de déficit militar.', indicators: { fiscal: 10, popular: 5, congress: -5, sovereignty: -8 }, scores: { fiscal: 2, reformas: 2, defesa: -2, idone: 2 } },
          { label: 'Reforma parcial (contribuição maior)', description: 'Meio-termo. Militares aceitam com relutância.', indicators: { fiscal: 5, sovereignty: -3 }, scores: { fiscal: 1, reformas: 1, defesa: -1 } },
          { label: 'Manter privilégios', description: 'Militares satisfeitos. 76% do orçamento em pessoal, custo fiscal permanente.', indicators: { popular: -2, congress: 2 }, scores: { fiscal: -2, reformas: -2, idone: -1 } },
          { label: 'Extinguir pensões vitalícias de filhas', description: 'R$6,3bi/ano para ~48.000 beneficiárias. Sem equivalente mundial. Revolta militar máxima.', indicators: { fiscal: 8, popular: 3, congress: -8, sovereignty: -12 }, scores: { fiscal: 2, reformas: 3, defesa: -2, idone: 1 } },
        ]
      },
    ]
  },
  {
    id: 'administrativa', number: 5, title: 'Reforma Administrativa', phase: 2, color: 'var(--teal)',
    description: 'O Estado brasileiro gasta 13% do PIB com funcionalismo. Modernizar ou manter estabilidade?',
    context: 'O Brasil tem 11,4 milhões de servidores públicos (federal, estadual e municipal), custando 13% do PIB em folha de pagamento — o dobro da média da OCDE. No nível federal, existem ~25.000 cargos comissionados (DAS) de indicação política, contra ~600 em Singapura e ~1.200 na Alemanha. A estabilidade do servidor, garantida pela Constituição, foi pensada para proteger contra demissões políticas, mas na prática blindou a ineficiência.\n\nA PEC 32 de reforma administrativa foi apresentada em 2020 mas nunca votada. Servidores de carreira são uma base eleitoral poderosa, e sindicatos do funcionalismo mobilizam greves que paralisam serviços essenciais. Qualquer reforma precisa distinguir carreiras de Estado (diplomatas, auditores, procuradores) do restante.',
    relatedReports: [
      { id: 'estrutura-gov', label: 'Análise Estrutural do Governo' },
      { id: 'fiscal', label: 'Estudos Fiscais' },
    ],
    decisions: [
      {
        id: 'estabilidade', name: 'Estabilidade do Servidor',
        options: [
          { label: 'Fim da estabilidade (exceto carreiras de Estado)', description: 'Revolução no funcionalismo. Greves e impacto social de demissões no setor público.', indicators: { fiscal: 14, popular: -12, congress: -10 }, scores: { fiscal: 2, reformas: 3, defesa: 1, idone: 1, social: -2 } },
          { label: 'Avaliação de desempenho com demissão', description: 'Estabilidade condicionada a resultados. Razoável.', indicators: { fiscal: 8, popular: -5, congress: -5 }, scores: { fiscal: 1, reformas: 2, defesa: -1 } },
          { label: 'Congelar contratações por 4 anos', description: 'Sem novas vagas. Efeito fiscal moderado.', indicators: { fiscal: 6, popular: -2 }, scores: { fiscal: 1, reformas: 1, social: -1, defesa: -1 } },
          { label: 'Manter regime atual', description: 'Servidores satisfeitos. Custo mantido.', indicators: { popular: 2, congress: 3 }, scores: { fiscal: -2, reformas: -2, idone: -1 } },
          { label: 'Ampliar carreiras de Estado, cortar comissionados', description: 'Profissionalização sem demissão em massa. Reduz 20 mil cargos de confiança.', indicators: { fiscal: 5, popular: 2, congress: -3 }, scores: { fiscal: 1, reformas: 1, idone: 1 } },
          { label: 'Aumentar quadro de funcionários públicos', description: 'Concursos massivos para fortalecer o Estado. Sindicatos celebram, mercado desaprova.', indicators: { fiscal: -15, popular: 8, congress: 10 }, scores: { fiscal: -3, reformas: -2, idone: -1, social: 1 } },
        ]
      },
    ]
  },
  {
    id: 'trabalhista', number: 6, title: 'Legislação Trabalhista', phase: 2, color: 'var(--teal)',
    description: 'CLT de 1943 vs. economia digital. Flexibilizar ou proteger?',
    context: 'A Consolidação das Leis do Trabalho (CLT) foi criada em 1943, inspirada na Carta del Lavoro fascista italiana. Apesar da reforma de 2017, o Brasil ainda ocupa a 124ª posição no ranking de liberdade econômica trabalhista. São 40 milhões de trabalhadores informais — sem carteira, sem proteção, sem previdência — muitos deles na economia de apps e plataformas.\n\nA regulamentação do trabalho por aplicativos (Uber, iFood, 99) é uma bomba social: tornar motoristas e entregadores CLT encarece o serviço em 20-40% para o consumidor, mas deixá-los desprotegidos perpetua a precarização. A reforma trabalhista completa pode destravar o mercado de trabalho mas enfrenta resistência sindical máxima.',
    relatedReports: [
      { id: 'reforma-trab', label: 'Super Reforma Trabalhista' },
      { id: 'competitividade', label: 'Competitividade Internacional' },
    ],
    decisions: [
      {
        id: 'clt', name: 'Modernização da CLT',
        options: [
          { label: 'Prevalência do negociado sobre legislado', description: 'Empresas e trabalhadores decidem. Sindicatos perdem poder.', indicators: { fiscal: 6, popular: -6, congress: -3 }, scores: { reformas: 1, modern: 1 } },
          { label: 'Regulamentação de apps/plataformas', description: 'Encarece delivery e transporte para o consumidor. Proteção trabalhista, mas impacto popular negativo.', indicators: { fiscal: 3, popular: -3, congress: 0 }, scores: { reformas: -1 } },
          { label: 'Reforma ampla — Padrão Ouro', description: 'Modernização completa e significativa. Jornada flexível, banco de horas, nova CLT. Resistência sindical máxima.', indicators: { fiscal: 8, popular: -8, congress: -6 }, scores: { fiscal: -2, reformas: 3, modern: 2, social: -2 } },
          { label: 'Reforma média — Padrão Prata', description: 'Boas mudanças mas não faz tudo. Jornada flexível e banco de horas.', indicators: { fiscal: 8, popular: -8, congress: -6 }, scores: { fiscal: -1, reformas: 2, modern: 1, social: -1 } },
          { label: 'Programa de Formalização Progressiva', description: 'Qualificar informais gradualmente. MEI expandido, contribuição simplificada.', indicators: { fiscal: 4, popular: 3, congress: -2 }, scores: { fiscal: -1, reformas: 1, modern: 1, social: 1 } },
          { label: 'Manter CLT atual', description: 'Sem mudanças.', indicators: { popular: 2, congress: 2 }, scores: { reformas: -2 } },
        ]
      },
    ]
  },

  // ═══ FASE 3 — Serviços Públicos ═══
  {
    id: 'saude', number: 7, title: 'Saúde Pública', phase: 3, color: 'var(--blue)',
    description: 'SUS é universal mas subfinanciado. Como melhorar sem quebrar o orçamento?',
    context: 'O SUS é o maior sistema de saúde universal do mundo, atendendo 190 milhões de brasileiros que dependem exclusivamente dele. Mas o Brasil gasta apenas 3,8% do PIB em saúde pública — metade da média da OCDE (7,6%). A fila de espera para cirurgias eletivas ultrapassa 1 milhão de pessoas, e a atenção primária cobre apenas 63% do território.\n\nA pandemia de COVID-19 expôs as fragilidades estruturais: falta de leitos de UTI no interior, dependência de importação de insumos e a inexistência de um sistema nacional de telemedicina. O dilema é clássico: aumentar o financiamento exige fonte fiscal, mas a digitalização e as PPPs prometem eficiência com menor custo.',
    relatedReports: [
      { id: 'saude', label: 'Saúde Pública — Brasil 2025' },
      { id: 'demografico', label: 'Brasil Demográfico 2025' },
    ],
    decisions: [
      {
        id: 'sus', name: 'Financiamento do SUS',
        options: [
          { label: 'Aumento de 2% do PIB para saúde', description: 'SUS recebe R$200bi extras. Custo fiscal pesado — de onde vem?', indicators: { fiscal: -12, popular: 15, congress: 3 }, scores: { fiscal: -3, saude: 3 } },
          { label: 'PPPs e gestão por OS', description: 'Organizações sociais administram hospitais. Eficiência com risco.', indicators: { fiscal: 3, popular: -3, congress: 2 }, scores: { modern: 1, saude: 1 } },
          { label: 'Digitalização + telemedicina', description: 'Investimento tech. Resultado lento mas sustentável.', indicators: { fiscal: -4, popular: 5 }, scores: { modern: 1, saude: 2 } },
          { label: 'Manter orçamento atual', description: 'Sem mudanças relevantes. SUS segue como está.', indicators: {}, scores: { saude: -1 } },
        ]
      },
    ]
  },
  {
    id: 'educacao', number: 8, title: 'Educação', phase: 3, color: 'var(--blue)',
    description: 'PISA na posição 57. Ensino médio com 50% de evasão. Investir em base ou topo?',
    context: 'O Brasil ocupa a 57ª posição no PISA, atrás de Chile, Uruguai e México. A evasão no ensino médio chega a 50%, e apenas 21% dos jovens de 25-34 anos têm diploma superior. O paradoxo brasileiro: universidades federais gratuitas atendem majoritariamente alunos de famílias de alta renda, enquanto o ensino fundamental público — que atende os mais pobres — é cronicamente subfinanciado.\n\nO investimento em C&T caiu 60% em termos reais desde a EC 95 (Teto de Gastos). A fuga de cérebros acelera: 25.000 pesquisadores brasileiros emigraram nos últimos 5 anos. O modelo de voucher educacional, usado com sucesso no Chile e na Suécia, é controverso mas promete accountability e competição entre escolas.',
    relatedReports: [
      { id: 'educacao', label: 'Educação — Relatório Brasil' },
    ],
    decisions: [
      {
        id: 'prioridade_educ', name: 'Prioridade Educacional',
        options: [
          { label: 'Foco no ensino fundamental (0–14 anos)', description: 'Maior retorno de longo prazo. Redireciona verba do superior.', indicators: { popular: 3, fiscal: -5 }, scores: { educ: 3, social: -1 } },
          { label: 'Ensino técnico e profissionalizante', description: 'Empregabilidade imediata. Alinhamento com mercado.', indicators: { popular: 6, fiscal: -4 }, scores: { modern: 1, educ: 2 } },
          { label: 'Expansão de universidades federais', description: 'Novo REUNI. Subsidia quem já tem vantagem. Caro e lento.', indicators: { popular: 8, fiscal: -8 }, scores: { educ: 1, social: -1, reformas: -1 } },
          { label: 'Voucher educacional', description: 'Dinheiro segue o aluno. Escolas privadas e públicas competem.', indicators: { popular: -5, fiscal: -3, congress: -8 }, scores: { reformas: 2, educ: 2 } },
          { label: 'Contingenciamento de C&T e bolsas', description: 'Congelar orçamento de pesquisa. Queda de 60% após EC 95.', indicators: { fiscal: 5, popular: -3 }, scores: { educ: -2, modern: -1, idone: -1 } },
        ]
      },
    ]
  },
  {
    id: 'seguranca', number: 9, title: 'Segurança Pública', phase: 3, color: 'var(--blue)',
    description: 'Brasil tem 45 mil homicídios por ano. Forças armadas, inteligência ou política social?',
    context: 'O Brasil registra 45 mil homicídios por ano — mais que muitos conflitos armados. O sistema penitenciário abriga 835 mil presos em vagas para 440 mil, com taxa de reincidência de 70%. O PCC e o Comando Vermelho controlam presídios e territórios urbanos inteiros, operando como Estados paralelos com orçamento estimado de R$40 bilhões anuais em tráfico.\n\nO modelo de segurança brasileiro é fragmentado: 27 polícias militares estaduais, 27 polícias civis, Polícia Federal, PRF e Força Nacional, sem integração de inteligência. Enquanto isso, El Salvador reduziu homicídios em 70% com o modelo Bukele de encarceramento massivo — mas ao custo devastador de direitos humanos que isola o país diplomaticamente.',
    relatedReports: [
      { id: 'criminalidade', label: 'Criminalidade no Brasil' },
      { id: 'brasil-defesa', label: 'Relatório de Defesa' },
    ],
    decisions: [
      {
        id: 'modelo_seg', name: 'Modelo de Segurança',
        options: [
          { label: 'Integração de inteligência (modelo israelense)', description: 'Tecnologia e dados. Cara, lenta, mas eficiente contra crime organizado.', indicators: { fiscal: -6, popular: 6, sovereignty: 5 }, scores: { fiscal: -2, modern: 2, defesa: 2, idone: -1 } },
          { label: 'GLO + Forças Armadas nas ruas', description: 'Impacto visual imediato. Degrada prontidão militar real (tropa score 55/100).', indicators: { popular: 8, sovereignty: 3, fiscal: -5 }, scores: { fiscal: -1, social: -2, defesa: -1 } },
          { label: 'Polícia comunitária + prevenção', description: 'Longo prazo. Resultado demora 5-10 anos.', indicators: { popular: 3, fiscal: -3 }, scores: { social: 2, defesa: -1 } },
          { label: 'Descriminalização de drogas leves', description: 'Reduz encarceramento. Polêmica enorme.', indicators: { popular: -10, congress: -12, fiscal: 4 }, scores: { fiscal: 1, defesa: -1, idone: 1 } },
          { label: 'Encarceramento massivo (modelo Bukele)', description: 'Altamente popular mas devastador para direitos. Armadilha de aprovação.', indicators: { popular: 12, congress: 5, sovereignty: -6, fiscal: -8 }, scores: { fiscal: -2, social: -2, defesa: 1, idone: -2 } },
        ]
      },
    ]
  },

  // ═══ FASE 4 — Desenvolvimento e Infraestrutura ═══
  {
    id: 'infraestrutura', number: 10, title: 'Infraestrutura', phase: 4, color: 'var(--coral)',
    description: 'Logística custa 12% do PIB (vs. 8% nos EUA). Rodovias, ferrovias ou portos?',
    context: 'O custo logístico brasileiro consome 12% do PIB — contra 8% nos EUA e 6% na Alemanha. O Brasil tem 30 mil km de ferrovias (vs. 150 mil km na China) e 65% da carga viaja por rodovias precárias. O Marco do Saneamento de 2020 promete universalizar água e esgoto até 2033, mas 100 milhões de brasileiros ainda vivem sem coleta de esgoto.\n\nO modelo de concessões rodoviárias funcionou bem em São Paulo e Paraná, mas pedágios altos impactam o frete e o custo de vida. Ferrovias de carga teriam impacto transformador na competitividade agrícola, mas levam décadas para construir e exigem investimento de R$200+ bilhões.',
    relatedReports: [
      { id: 'competitividade', label: 'Competitividade Internacional' },
      { id: 'balanca', label: 'Balança de Pagamentos' },
    ],
    decisions: [
      {
        id: 'prioridade_infra', name: 'Prioridade de Investimento',
        options: [
          { label: 'Ferrovias de carga (modelo chinês)', description: 'Maior impacto logístico. Décadas para concluir.', indicators: { fiscal: -10, popular: 3 }, scores: { modern: 3 } },
          { label: 'Concessões rodoviárias', description: 'Iniciativa privada investe. Pedágio sobe.', indicators: { fiscal: 5, popular: -4, congress: 3 }, scores: { fiscal: 1, modern: 2 } },
          { label: 'Saneamento universal até 2033', description: 'Marco do Saneamento. 100M de brasileiros sem esgoto.', indicators: { fiscal: -8, popular: 10 }, scores: { modern: 2, social: 2, saude: 1 } },
          { label: 'Investimento mínimo (manutenção)', description: 'Sem grandes obras. Orçamento aliviado.', indicators: { fiscal: 3 }, scores: { modern: -1 } },
        ]
      },
    ]
  },
  {
    id: 'diplomacia', number: 11, title: 'Política Externa', phase: 4, color: 'var(--coral)',
    description: 'O Brasil busca assento no Conselho de Segurança da ONU. Com quem se alinhar?',
    context: 'O Brasil é a 9ª economia do mundo mas tem influência diplomática desproporcional à sua relevância econômica. O acordo Mercosul-UE, negociado por 25 anos, promete acesso ao maior mercado consumidor do mundo — mas expõe a indústria nacional à competição europeia. O BRICS+ ganhou peso com a entrada de Arábia Saudita, Irã e Egito, oferecendo uma alternativa ao eixo ocidental.\n\nA guerra na Ucrânia forçou o Brasil a tomar posição: neutralidade pragmática preserva comércio com ambos os lados, mas frustra os EUA. A China já é o maior parceiro comercial, comprando 30% das exportações brasileiras. O Conselho de Segurança da ONU exige apoio de pelo menos um dos P5 — e cada alinhamento tem um preço.',
    relatedReports: [
      { id: 'diplomacia', label: 'Diplomacia Brasileira' },
      { id: 'balanca', label: 'Balança de Pagamentos' },
      { id: 'brasil-defesa', label: 'Relatório de Defesa' },
    ],
    decisions: [
      {
        id: 'alinhamento', name: 'Alinhamento Geopolítico',
        options: [
          { label: 'Pragmatismo multilateral', description: 'Comércio com todos, alinhamento com ninguém. Posição histórica do Itamaraty.', indicators: { sovereignty: 5, fiscal: 3 }, scores: { diplo: 2 } },
          { label: 'Alinhamento ocidental (EUA/UE)', description: 'Acesso a investimentos e tecnologia. Perde autonomia.', indicators: { fiscal: 6, popular: -3, sovereignty: -5 }, scores: { fiscal: 1, diplo: 2 } },
          { label: 'Bloco Sul-Sul (BRICS+)', description: 'China e emergentes. Independência mas risco de isolamento ocidental.', indicators: { sovereignty: 8, fiscal: -3, popular: 2 }, scores: { defesa: 1, diplo: 1 } },
          { label: 'Isolacionismo', description: 'Foco interno. Diplomacia mínima.', indicators: { sovereignty: -10, fiscal: 2 }, scores: { diplo: -2 } },
        ]
      },
      {
        id: 'comercio', name: 'Política Comercial',
        options: [
          { label: 'Acordo Mercosul-UE', description: 'Maior acordo do hemisfério. Agronegócio celebra, indústria exposta à competição europeia.', indicators: { fiscal: 8, popular: -3, sovereignty: 3 }, scores: { fiscal: 1, diplo: 2, modern: -1, reformas: -1 } },
          { label: 'Protecionismo industrial', description: 'Tarifas para proteger indústria nacional. Consumidor paga.', indicators: { fiscal: -5, popular: -4, sovereignty: 5 }, scores: { modern: -1 } },
          { label: 'Abertura unilateral gradual', description: 'Redução de tarifas em 10 anos. Competição saudável.', indicators: { fiscal: 5, popular: 2 }, scores: { reformas: 1, modern: 1 } },
        ]
      },
    ]
  },
  {
    id: 'meio_ambiente', number: 12, title: 'Meio Ambiente e Energia', phase: 4, color: 'var(--coral)',
    description: 'Amazônia sob pressão. Matriz energética limpa mas dependente de hidrelétricas.',
    context: 'A Amazônia perdeu 13% de sua cobertura florestal original e o desmatamento voltou a crescer em 2023-2024 após anos de queda. O mercado de créditos de carbono pode transformar a floresta em ativo financeiro — estimativas apontam US$30-100 bilhões/ano em potencial. Mas a bancada ruralista, que controla 280+ votos no Congresso, pressiona por flexibilização ambiental para expandir fronteira agrícola.\n\nNa energia, o Brasil tem uma das matrizes mais limpas do mundo (83% renovável), mas depende excessivamente de hidrelétricas vulneráveis a secas. O pré-sal gera R$200+ bilhões em royalties, e a energia nuclear poderia complementar a base — mas Angra 3 está 15 anos atrasada e R$15 bilhões acima do orçamento.',
    relatedReports: [
      { id: 'diplomacia', label: 'Diplomacia Brasileira' },
      { id: 'competitividade', label: 'Competitividade Internacional' },
    ],
    decisions: [
      {
        id: 'amazonia', name: 'Política Amazônica',
        options: [
          { label: 'Desmatamento zero + fiscalização militar', description: 'Prestígio internacional. Custo fiscal e político com ruralistas.', indicators: { fiscal: -5, popular: 5, congress: -8, sovereignty: 8 }, scores: { defesa: 1, diplo: 2, idone: 1 } },
          { label: 'Crédito de carbono + mercado regulado', description: 'Monetizar a floresta. Inovador e sustentável.', indicators: { fiscal: 6, popular: 3, sovereignty: 5 }, scores: { fiscal: 1, modern: 1, diplo: 1 } },
          { label: 'Flexibilizar para agronegócio', description: 'PIB sobe, imagem internacional despenca.', indicators: { fiscal: 8, popular: -5, sovereignty: -10 }, scores: { fiscal: 1, diplo: -2 } },
        ]
      },
      {
        id: 'energia', name: 'Matriz Energética',
        options: [
          { label: 'Investir em nuclear + eólica offshore', description: 'Diversificação. Caro mas estratégico.', indicators: { fiscal: -8, sovereignty: 8 }, scores: { modern: 2, defesa: 1 } },
          { label: 'Expandir solar e eólica onshore', description: 'Barato e popular. Intermitência é problema.', indicators: { fiscal: -3, popular: 5 }, scores: { modern: 1 } },
          { label: 'Pré-sal como prioridade', description: 'Combustível fóssil mas receita garantida.', indicators: { fiscal: 10, sovereignty: 5, popular: -3 }, scores: { fiscal: 2, diplo: -1 } },
        ]
      },
    ]
  },

  // ═══ NOVOS CAPÍTULOS — Balanceamento ═══

  // ── Proteção Social (Fase 3) ──
  {
    id: 'protecao_social', number: 13, title: 'Proteção Social', phase: 3, color: 'var(--blue)',
    description: 'Bolsa Família atende 21 milhões de famílias. Expandir, reformar ou substituir por renda básica?',
    context: 'O Bolsa Família é o maior programa de transferência condicionada de renda do mundo, atendendo 21 milhões de famílias (84 milhões de pessoas) com custo de R$170 bilhões/ano. Estudos do Banco Mundial mostram que cada R$1 investido gera R$1,78 em atividade econômica local. Mas fraudes estimadas em R$5-8 bilhões/ano e a falta de portas de saída perpetuam a dependência.\n\nA ideia de Renda Básica Universal — pagar R$600/mês a todos os brasileiros sem condição — custaria R$1,5 trilhão/ano, mais que todo o orçamento federal. Mas pilotos em Maricá (RJ) e Finlândia mostraram resultados promissores em saúde mental e empreendedorismo. A alternativa pragmática é vincular a transferência à qualificação profissional.',
    relatedReports: [
      { id: 'pobreza', label: 'Pobreza Estrutural no Brasil' },
      { id: 'demografico', label: 'Brasil Demográfico 2025' },
    ],
    decisions: [
      {
        id: 'bolsa_familia', name: 'Política de Transferência de Renda',
        options: [
          { label: 'Expandir Bolsa Família (R$800→R$1000)', description: 'Mais cobertura, mais custo. Impacto direto na pobreza extrema.', indicators: { fiscal: -8, popular: 12, congress: 3 }, scores: { fiscal: -2, social: 2, saude: 1 } },
          { label: 'Pente-fino + condicionalidades', description: 'Fiscalizar fraudes, exigir vacinação e frequência escolar. Impopular mas eficiente.', indicators: { fiscal: 5, popular: -5, congress: -3 }, scores: { fiscal: 1, social: 1, educ: 1, saude: 1, idone: 1 } },
          { label: 'Manter como está', description: 'Sem mudanças. Valor defasado pela inflação.', indicators: {}, scores: { social: -1, reformas: -1 } },
          { label: 'Renda Básica Universal (piloto)', description: 'R$600/mês para todos, sem condição. Revolucionário e caro.', indicators: { fiscal: -15, popular: 15, congress: -10 }, scores: { fiscal: -3, social: 3, reformas: 1, idone: -1 } },
          { label: 'Mobilidade Assistida (qualificação)', description: 'Vincular transferência a capacitação profissional. Custo moderado, resultado lento.', indicators: { fiscal: -5, popular: 5, congress: 2 }, scores: { fiscal: -1, social: 2, educ: 2, modern: 1 } },
        ]
      },
    ]
  },

  // ── Minerais Estratégicos (Fase 4) ──
  {
    id: 'minerais', number: 14, title: 'Minerais Estratégicos', phase: 4, color: 'var(--coral)',
    description: 'Brasil tem 98% do nióbio mundial e grandes reservas de lítio. A corrida tecnológica global exige uma decisão soberana.',
    context: 'O Brasil detém 98% das reservas mundiais de nióbio — metal crítico para aços especiais, supercondutores e foguetes — e está entre os 5 maiores depósitos de lítio, essencial para baterias de veículos elétricos. Atualmente, o nióbio é exportado bruto a US$40/kg e reimportado como liga a US$400/kg. A CBMM (controlada pela família Moreira Salles) opera como monopólio privado com taxa de royalties irrisória.\n\nA corrida global por minerais estratégicos se intensifica: EUA, China e UE lançaram programas de bilhões para garantir supply chains. O Brasil pode usar sua posição monopolista como alavanca diplomática — trocar nióbio por acesso à cadeia de semicondutores — ou simplesmente leiloar ao maior lance e perder o controle estratégico.',
    relatedReports: [
      { id: 'diplomacia', label: 'Diplomacia Brasileira' },
      { id: 'brasil-defesa', label: 'Relatório de Defesa' },
    ],
    decisions: [
      {
        id: 'minerais_estrategicos', name: 'Exploração de Nióbio e Lítio',
        options: [
          { label: 'Soberania Mineral (nacionalizar)', description: 'Controle estatal total. Processamento doméstico obrigatório.', indicators: { fiscal: -5, popular: 8, sovereignty: 10, congress: -5 }, scores: { fiscal: -2, diplo: -1, modern: 2, defesa: 1 } },
          { label: 'Parceria Tecnológica (troca por chips)', description: 'Nióbio por semicondutores. Acesso à cadeia de valor global.', indicators: { fiscal: 6, popular: 2, sovereignty: -5 }, scores: { fiscal: 1, diplo: 2, modern: 1, idone: -1 } },
          { label: 'Leilão Aberto (maior lance)', description: 'Maximiza receita imediata. Perde controle estratégico.', indicators: { fiscal: 12, popular: -5, sovereignty: -8 }, scores: { fiscal: 2, diplo: -1, modern: -1, defesa: -1 } },
        ]
      },
    ]
  },

  // ── Cibersegurança (Fase 4) ──
  {
    id: 'ciberseguranca', number: 15, title: 'Defesa Digital', phase: 4, color: 'var(--coral)',
    description: 'Brasil sofre 1.500 ciberataques por minuto. CDCiber opera com 1/10 do orçamento necessário.',
    context: 'O Brasil é o 2º país mais atacado por ransomware no mundo, com 1.500 tentativas de ciberataque por minuto. O Comando de Defesa Cibernética (CDCiber) opera com orçamento de R$500 milhões — 1/10 do necessário segundo o próprio Exército. Infraestruturas críticas (energia, telecomunicações, sistema financeiro) estão vulneráveis a ataques que poderiam paralisar o país.\n\nO dilema é clássico: investir pesado em capacidade própria custa R$5 bilhões em 4 anos e exige formar 10 mil especialistas que o mercado privado paga 3x mais. A alternativa é terceirizar com Big Techs (Microsoft, AWS, Google) — rápido e eficiente, mas cria dependência de infraestrutura estrangeira para soberania digital.',
    relatedReports: [
      { id: 'brasil-defesa', label: 'Relatório de Defesa' },
    ],
    decisions: [
      {
        id: 'cyber', name: 'Estratégia de Cibersegurança',
        options: [
          { label: 'Programa CDCiber++ (investimento massivo)', description: 'R$5bi em 4 anos. Centro de operações 24/7. Formação de 10 mil especialistas.', indicators: { fiscal: -8, popular: 3, sovereignty: 8 }, scores: { fiscal: -2, modern: 2, defesa: 2, idone: 1 } },
          { label: 'PPP com Big Tech', description: 'Microsoft, AWS, Google protegem infra crítica. Rápido mas cria dependência.', indicators: { fiscal: -3, sovereignty: -8, congress: 3 }, scores: { fiscal: -1, modern: 1, defesa: 1, idone: -2 } },
          { label: 'Status quo (subfinanciado)', description: 'Manter CDCiber atual. Sem investimento novo. Risco crescente.', indicators: { fiscal: 2 }, scores: { fiscal: 1, defesa: -2, modern: -1 } },
          { label: 'Dissuasão cibernética ativa', description: 'Capacidade ofensiva. Hack-back autorizado. Tensão diplomática.', indicators: { fiscal: -6, sovereignty: 10, popular: 5, congress: -5 }, scores: { fiscal: -2, modern: 2, defesa: 2, diplo: -2 } },
        ]
      },
    ]
  },
];
