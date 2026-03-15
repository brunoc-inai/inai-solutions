/* ═══════════════════════════════════════
   9 Eventos Aleatórios
   Podem ocorrer entre qualquer capítulo
   Sincronizado com planilha "resultados br possiveis.xlsx"
   ═══════════════════════════════════════ */

import type { GovernorScores } from './governors';

export interface EventOption {
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

export interface GameEvent {
  id: string;
  title: string;
  icon: string;
  type: string;
  description: string;
  options: EventOption[];
}

export const EVENTS: GameEvent[] = [
  {
    id: 'desastre_natural',
    title: 'Desastre Natural',
    icon: '🌊',
    type: 'Crise Humanitária',
    description: 'Enchente devastadora atinge o Sul do país. 200 mil desabrigados. O mundo observa sua resposta.',
    options: [
      {
        label: 'Mobilização federal total',
        description: 'Exército, Defesa Civil, crédito extraordinário de R$15bi. Resposta imediata.',
        indicators: { fiscal: -8, popular: 12, congress: 5, sovereignty: 3 },
        scores: { fiscal: -2, social: 1, defesa: 1 }
      },
      {
        label: 'Resposta coordenada com estados',
        description: 'Federalismo. Estados lideram, União apoia. Mais lento mas mais barato.',
        indicators: { fiscal: -4, popular: 5, congress: 2 },
        scores: { fiscal: -1, social: 1 }
      },
      {
        label: 'Resposta mínima + doações privadas',
        description: 'Governo economiza. Imagem de negligência.',
        indicators: { fiscal: 0, popular: -15, congress: -5 },
        scores: { social: -1, defesa: -1, idone: -1 }
      },
    ]
  },
  {
    id: 'crise_internacional',
    title: 'Crise Financeira Global',
    icon: '📉',
    type: 'Crise Econômica',
    description: 'Recessão nos EUA e China simultaneamente. Commodities despencam 40%. Dólar dispara.',
    options: [
      {
        label: 'Pacote anticíclico keynesiano',
        description: 'Aumentar gasto para manter emprego. Déficit explode mas emprego se mantém.',
        indicators: { fiscal: -15, popular: 8, congress: 5 },
        scores: { fiscal: -2, social: 1, defesa: 1 }
      },
      {
        label: 'Austeridade preventiva',
        description: 'Cortar antes que piore. Recessão mais curta, mais profunda.',
        indicators: { fiscal: 10, popular: -12, congress: -5, sovereignty: 3 },
        scores: { social: -1 }
      },
      {
        label: 'Nada — esperar passar',
        description: 'O mercado se ajusta. Mas até lá, o desemprego sobe.',
        indicators: { fiscal: -5, popular: -8, congress: -3 },
        scores: { fiscal: -2, defesa: -1 }
      },
    ]
  },
  {
    id: 'escandalo',
    title: 'Escândalo de Corrupção',
    icon: '🔍',
    type: 'Crise Política',
    description: 'A Polícia Federal descobre esquema de desvio de R$2bi envolvendo um ministro-chave.',
    options: [
      {
        label: 'Demissão imediata + investigação total',
        description: 'Transparência máxima. Perde um aliado, ganha credibilidade.',
        indicators: { popular: 8, congress: -8 },
        scores: { idone: 2 }
      },
      {
        label: 'Investigação interna sigilosa',
        description: 'Apurar antes de agir. Risco de parecer acobertamento.',
        indicators: { popular: -5, congress: 2 },
        scores: { idone: -1 }
      },
      {
        label: 'Defender o ministro publicamente',
        description: '"Nunca vi prova". Se a PF confirmar, a queda é dupla.',
        indicators: { popular: -15, congress: 5, sovereignty: -3 },
        scores: { idone: -2 }
      },
    ]
  },
  {
    id: 'pandemia',
    title: 'Surto Epidêmico',
    icon: '🦠',
    type: 'Crise Sanitária',
    description: 'Nova variante altamente transmissível. OMS declara emergência. O país olha para você.',
    options: [
      {
        label: 'Lockdown nacional + vacinação em massa',
        description: 'Salva vidas, destrói PIB. Referência mundial.',
        indicators: { fiscal: -15, popular: 5, sovereignty: 5 },
        scores: { fiscal: -3, saude: 3 }
      },
      {
        label: 'Vacinação em massa sem lockdown',
        description: 'Priorizar vacinação rápida mantendo economia aberta. Equilíbrio arriscado.',
        indicators: { fiscal: -10, popular: 8, sovereignty: 3 },
        scores: { fiscal: -2, saude: 2 }
      },
      {
        label: 'Restrições regionais + campanha sanitária',
        description: 'Equilíbrio. Cada estado decide. Resultado mediano.',
        indicators: { fiscal: -8, popular: 3 },
        scores: { fiscal: -2, saude: 1 }
      },
      {
        label: 'Minimizar e manter economia aberta',
        description: '"É só uma gripezinha." Mortes sobem, PIB se mantém.',
        indicators: { fiscal: 3, popular: -12, sovereignty: -8 },
        scores: { fiscal: -1, saude: -2, idone: -1 }
      },
    ]
  },
  {
    id: 'conflito_fronteira',
    title: 'Incidente de Fronteira',
    icon: '⚔️',
    type: 'Crise Geopolítica',
    description: 'Forças venezuelanas cruzam a fronteira em Roraima. Garimpeiros brasileiros capturados.',
    options: [
      {
        label: 'Mobilização militar imediata',
        description: 'Enviar tropas para a fronteira. Demonstração de força.',
        indicators: { fiscal: -6, popular: 10, congress: 5, sovereignty: 12 },
        scores: { fiscal: -1, defesa: 2, diplo: 1 }
      },
      {
        label: 'Mediação diplomática via OEA',
        description: 'Caminho institucional. Mais lento, menos risco.',
        indicators: { popular: 3, sovereignty: -5 },
        scores: { diplo: 2 }
      },
      {
        label: 'Concessão territorial',
        description: 'Recuar para evitar conflito. Fraqueza percebida.',
        indicators: { popular: -12, sovereignty: -15, congress: -8 },
        scores: { defesa: -3, diplo: -2 }
      },
    ]
  },
  {
    id: 'greve_geral',
    title: 'Greve Geral',
    icon: '✊',
    type: 'Crise Social',
    description: 'Centrais sindicais convocam greve geral contra reformas. Transportes, bancos e escolas paralisados.',
    options: [
      {
        label: 'Negociar concessões',
        description: 'Ceder em pontos menores. Greve termina, reforma enfraquece.',
        indicators: { popular: 5, congress: 3, fiscal: -5 },
        scores: { fiscal: -1, social: 1 }
      },
      {
        label: 'Manter reformas + garantir ordem',
        description: 'Não recuar. Polícia garante funcionamento mínimo.',
        indicators: { popular: -10, congress: -3, fiscal: 5 },
        scores: { reformas: 1, idone: 1 }
      },
      {
        label: 'Retirar a reforma',
        description: 'Recuo total. Governabilidade comprometida.',
        indicators: { popular: 8, congress: -10, fiscal: -8 },
        scores: { fiscal: -2, reformas: -1 }
      },
    ]
  },
  {
    id: 'apagao',
    title: 'Apagão Energético',
    icon: '⚡',
    type: 'Crise de Infraestrutura',
    description: 'Seca histórica reduz reservatórios a 15%. Risco real de racionamento.',
    options: [
      {
        label: 'Racionamento imediato + investimento emergencial',
        description: 'Cortar consumo 20%. Termelétricas ligadas. Caro.',
        indicators: { fiscal: -10, popular: -8, sovereignty: 3 },
        scores: { fiscal: -2, modern: 1 }
      },
      {
        label: 'Importar energia + bandeira vermelha',
        description: 'Conta de luz sobe 30%. Sem racionamento.',
        indicators: { fiscal: -5, popular: -6 },
        scores: { social: 1 }
      },
      {
        label: 'Negar a crise + esperar chuvas',
        description: 'Se chover, escapou. Se não chover, apagão total.',
        indicators: { popular: -15, fiscal: -12, sovereignty: -5 },
        scores: { fiscal: -1, modern: -1, idone: -1 }
      },
    ]
  },
  {
    id: 'fuga_capitais',
    title: 'Fuga de Capitais',
    icon: '💸',
    type: 'Crise Cambial',
    description: 'Investidores retiram US$30bi em 3 meses. Real desvaloriza 25%. Inflação importada dispara.',
    options: [
      {
        label: 'Pacote de credibilidade fiscal',
        description: 'Corte de R$50bi + compromisso público com superávit. Doloroso.',
        indicators: { fiscal: 12, popular: -12, congress: -8, sovereignty: 5 },
        scores: { fiscal: 2 }
      },
      {
        label: 'Elevar SELIC + intervenção cambial',
        description: 'BC atua. Juros sobem, crédito trava, economia esfria.',
        indicators: { fiscal: 5, popular: -6, sovereignty: 2 },
        scores: { fiscal: 1 }
      },
      {
        label: 'Controle de capitais',
        description: 'Impedir saída de dólares. Populista e desastroso no médio prazo.',
        indicators: { fiscal: -10, popular: 3, sovereignty: -12 },
        scores: { fiscal: -2, diplo: -1 }
      },
    ]
  },
  {
    id: 'descoberta_recurso',
    title: 'Descoberta de Recurso Natural',
    icon: '💎',
    type: 'Oportunidade',
    description: 'Maior jazida de lítio do mundo descoberta em Minas Gerais. Corrida internacional para negociar.',
    options: [
      {
        label: 'Licitação internacional transparente',
        description: 'Melhor preço, empresas globais competem. Soberania compartilhada.',
        indicators: { fiscal: 12, popular: 3, sovereignty: -3 },
        scores: { fiscal: 1, modern: 1, diplo: 1, idone: 1 }
      },
      {
        label: 'Exploração estatal via Petrobras/Vale',
        description: 'Controle nacional. Mais lento, mais soberano.',
        indicators: { fiscal: 5, popular: 8, sovereignty: 10 },
        scores: { modern: 1, defesa: 1 }
      },
      {
        label: 'Acordo bilateral com China',
        description: 'Investimento garantido, dependência estratégica.',
        indicators: { fiscal: 10, sovereignty: -8, popular: -5 },
        scores: { fiscal: 1, diplo: -1 }
      },
    ]
  },
  {
    id: 'boom_commodities',
    title: 'Boom de Commodities',
    icon: '📈',
    type: 'Oportunidade Econômica',
    description: 'Soja, minério e petróleo triplicam de preço. A China quer comprar tudo. Os EUA pedem lealdade comercial. Seu ministro da Fazenda diz: "É a chance da década."',
    options: [
      {
        label: 'Parceria estratégica com a China',
        description: 'Abrir corredores de exportação, aceitar yuan em transações bilaterais, investimentos chineses em infraestrutura. PIB dispara.',
        indicators: { fiscal: 18, popular: 8, sovereignty: -5, congress: -5 },
        scores: { fiscal: 3, modern: 1, diplo: 1 }
      },
      {
        label: 'Compras governamentais para conter inflação',
        description: 'Usar dinheiro público para comprar alimentos e combustível no mercado interno, subsidiando preços. Popular mas caro.',
        indicators: { fiscal: -12, popular: 10, congress: 5 },
        scores: { fiscal: -2, social: 1 }
      },
      {
        label: 'Reforçar alinhamento comercial com EUA',
        description: 'Priorizar acordos com Washington. Sinal de lealdade ao eixo ocidental — mas o boom está na Ásia.',
        indicators: { fiscal: 3, popular: -3, sovereignty: -3, congress: 3 },
        scores: { diplo: -1, fiscal: -1 }
      },
    ]
  },
];
