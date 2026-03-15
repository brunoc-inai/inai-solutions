import ReportShell, {
  Section,
  StatGrid,
  StatCard,
  DataTable,
  Callout,
  BarChart,
  HorizBar,
  Prose,
  QuoteBlock,
  ScenarioGrid,
  InfoGrid,
  InfoCard,
} from './ReportShell';

export default function ReportCortes({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Onde Cortar: Oportunidades Inteligentes de Ajuste Orcamentario"
      eyebrow="Analise Fiscal — Brasil 2025-2030"
      color="var(--gold)"
      onClose={onClose}
    >
      {/* ── VISAO CONSOLIDADA ── */}
      <Section num="01" title="Visao Consolidada">
        <Prose>
          <p>
            Potencial total de corte identificado pelos especialistas consultados, distribuido por viabilidade politica e horizonte temporal.
          </p>
        </Prose>
        <StatGrid>
          <StatCard value="580" unit=" bi" label="Potencial total identificado (R$) — 10 anos / cenario otimista" color="var(--gold)" />
          <StatCard value="180" unit=" bi" label="Potencial realista 5 anos (R$) — medidas com aderencia politica >= 40%" color="var(--green)" />
          <StatCard value="70" unit=" bi" label="Ja aprovado (pacote dez/2024) — em 2 anos (gov + IFI estimam R$ 60-70 bi)" color="var(--red)" />
          <StatCard value="-2,3" unit=" pp" label="Deficit estrutural estimado (BRCG/2026) — % PIB p/ estabilizar divida" color="var(--blue)" />
        </StatGrid>
      </Section>

      {/* ── METODOLOGIA ── */}
      <Section num="02" title="Metodologia de Leitura">
        <Callout type="info">
          Cada linha representa uma proposta de corte identificada por pelo menos um especialista ou instituicao de referencia.
          Nota de qualidade tecnica avalia solidez do diagnostico, consistencia das estimativas e replicabilidade internacional.
          Aderencia a realidade e um julgamento subjetivo sobre a viabilidade de aprovacao no Brasil nos proximos 3-5 anos, considerando o ambiente politico, resistencias corporativas e grau de mobilizacao da sociedade.
          O valor informado e o intervalo de economia anual, salvo indicacao explicita.
        </Callout>
      </Section>

      {/* ── LEGENDA — CATEGORIAS ── */}
      <Section num="03" title="Legenda — Linhas Orcamentarias">
        <InfoGrid columns={3}>
          <InfoCard title="Previdencia / Assistencia" color="var(--purple)">
            RGPS, RPPS, BPC, Bolsa Familia — despesas obrigatorias vinculadas ao salario minimo ou contribuicao
          </InfoCard>
          <InfoCard title="Funcionalismo / Pessoal" color="var(--blue)">
            Folha ativa, inativos, penduricalhos, supersalarios — Executivo, Judiciario e Legislativo
          </InfoCard>
          <InfoCard title="Gasto Tributario / Subsidios" color="var(--gold)">
            Renuncias fiscais, desoneracoes, subvencoes setoriais, credito subsidiado
          </InfoCard>
          <InfoCard title="Transferencias Sociais" color="var(--green)">
            Abono salarial, seguro-desemprego, FGTS, beneficios nao contributivos
          </InfoCard>
          <InfoCard title="Discricionarias / Vinculacoes" color="var(--red)">
            Emendas parlamentares, pisos constitucionais de saude e educacao, custeio
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ── ECONOMIA POR MEDIDA (BAR CHART) ── */}
      <Section num="04" title="Economia Estimada Anual por Proposta (R$ bi — ponto medio)">
        <BarChart items={[
          { label: 'Nova ref. prev. RGPS', value: 115, max: 120, color: 'var(--gold)' },
          { label: 'Desvinc. piso+BPC', value: 60, max: 120, color: 'var(--gold)' },
          { label: 'Gastos tributarios', value: 60, max: 120, color: 'var(--gold)' },
          { label: 'Correcao regra SM (10a)', value: 45, max: 120, color: 'var(--gold)' },
          { label: 'Pisos saude/educacao', value: 35, max: 120, color: 'var(--blue)' },
          { label: 'Congel. folha pessoal', value: 22, max: 120, color: 'var(--blue)' },
          { label: 'Ext. abono PIS/PASEP', value: 20, max: 120, color: 'var(--blue)' },
          { label: 'Desoneracoes folha', value: 17, max: 120, color: 'var(--blue)' },
          { label: 'Judiciario — teto real', value: 15, max: 120, color: 'var(--blue)' },
          { label: 'Emendas parlam.', value: 15, max: 120, color: 'var(--text-muted)' },
          { label: 'Seg. desemprego/FGTS', value: 11, max: 120, color: 'var(--text-muted)' },
          { label: 'Ref. militar', value: 10, max: 120, color: 'var(--text-muted)' },
        ]} />
      </Section>

      {/* ── ECONOMIA POR CATEGORIA ── */}
      <Section num="05" title="Potencial por Categoria (R$ bi / ponto medio estimado)">
        <DataTable
          headers={['Categoria', 'Economia (R$ bi/ano)', '% do Total']}
          rows={[
            ['Previdencia / Assistencia', '220', '52%'],
            ['Gasto Tributario / Subsidios', '77', '18%'],
            ['Funcionalismo / Pessoal', '47', '11%'],
            ['Discricionarias / Vinculacoes', '45', '11%'],
            ['Transferencias Sociais', '31', '7%'],
          ]}
        />
      </Section>

      {/* ── TABELA PRINCIPAL — PRIORIDADE I ── */}
      <Section num="06" title="Tabela de Oportunidades de Corte">
        <Prose>
          <p>Ordenado por impacto potencial decrescente. Prioridade I = mais urgente e com maior consenso tecnico.</p>
        </Prose>

        <Callout type="danger">PRIORIDADE I — ESTRUTURAIS, ALTO IMPACTO, CONSENSO TECNICO AMPLO</Callout>

        <DataTable
          headers={['#', 'Proposta', 'Linha Orcamentaria', 'Economia Estimada (anual)', 'Qualidade Tecnica', 'Aderencia a Realidade', 'Principais Defensores', 'Observacao Critica']}
          rows={[
            [
              '01',
              'Nova reforma da Previdencia (RGPS) — EC 103/2019 complementada: idades, aliquotas, carreiras especiais',
              'Previdencia — RGPS beneficios INSS (R$ 995 bi/ano em despesas)',
              'R$ 80-150 bi/ano (acumulado 10a: R$ 400-800 bi)',
              '★★★★★ Diagnostico irrefutavel; consenso tecnico',
              '20-30% — Alta resistencia politica',
              'Giambiagi (FGV-IBRE), Tafner, Banco Mundial, CNN Brasil / Gesner Oliveira',
              '"A nova regra do salario minimo anula boa parte do ganho da reforma de 2019." Cada 1pp de ganho real no minimo gera R$ 12 bi extras/ano ao INSS. Janela politica: novo governo pos-2026.',
            ],
            [
              '02',
              'Desvinculacao do piso previdenciario e BPC do salario minimo — Indexar por IPCA; salario minimo regularia apenas mercado de trabalho ativo',
              'Previdencia — RGPS piso + BPC (R$ 127 bi BPC; R$ 650 bi piso)',
              'R$ 40-80 bi/ano (acum. R$ 550 bi em 10 anos — Giambiagi)',
              '★★★★★ Proposta tecnica solida; recomendacao Banco Mundial 2025',
              '10-15% — Mais dificil politicamente. 78% da pop. defende vinculacao (pesquisa Ideia/Estadao)',
              'Giambiagi, Banco Mundial, Borges (IPEA), FGV-IBRE, IFI/Senado',
              'Proposta mais eficaz de medio prazo. Sem ela, BPC sozinho vai a R$ 222 bi em 2035. Resistencia extrema; pode exigir movimento amplo de opiniao publica ou crise fiscal aberta.',
            ],
            [
              '03',
              'Revisao estrutural dos gastos tributarios e subsidios setoriais — Corte qualitativo de 20-30% das renuncias sem protecao constitucional; Lei Geral dos Gastos Tributarios (prevista na EC 109/2021, nunca regulamentada)',
              'Gasto Tributario — Total 2024: R$ 678 bi (5,78% PIB). Alvo: R$ 300 bi nao constitucionais',
              'R$ 40-80 bi/ano (corte 10% linear = R$ 20 bi; corte qualitativo 30% = R$ 80 bi)',
              '★★★★ Dados solidos; efetividade depende da selecao',
              '30-45% — Corte linear parcial ja tramita. Bancada do agro (300+ dep.) bloqueia reformas amplas',
              'Gesner Oliveira (FGV), Haddad (Fazenda), Banco Mundial, Pedro Nery (Esfera), Mansueto Almeida (BTG)',
              'Haddad propoe corte linear de 10% excluindo Simples e ZFM = R$ 20 bi. JBS sozinha recebeu R$ 8,5 bi em beneficios em 2024-2025. EC 109/2021 ja mandava criar teto de 2% PIB — nunca cumprida.',
            ],
            [
              '04',
              'Reforma administrativa — extincao de penduricalhos e supersalarios — PEC 38/2025 (Pedro Paulo / Hugo Motta): limite verbas indenizatorias a 10% da remuneracao para quem ganha >= 90% do teto',
              'Funcionalismo — Gasto com pessoal federal: R$ 400 bi/ano; Supersalarios: R$ 20 bi/ano (53 mil serv.)',
              'R$ 10-20 bi/ano (penduricalhos cresceram 43% reais em 2025)',
              '★★★★ Dados existem; impacto dependente de regulamentacao',
              '45-60% — PEC 38/2025 em tramitacao. Hugo Motta (pres. Camara) como legado; STF tende a resistir',
              'Felipe Salto (IFI/Warren), Consultores da Camara, Movimento Orcamento Bem Gasto (Arida, Bacha, Meirelles, Fraga)',
              'Flavio Dino suspendeu penduricalhos em fev/2026 sem base legal — revertido. CNJ pode contornar qualquer lei ordinaria via resolucao. Precisa de PEC eficaz. Efeito simbolico e de legitimidade politica e maior que o fiscal imediato.',
            ],
          ]}
        />

        {/* ── PRIORIDADE II ── */}
        <Callout type="warn">PRIORIDADE II — RELEVANTES, VIABILIDADE MEDIA, DEMANDAM NEGOCIACAO</Callout>

        <DataTable
          headers={['#', 'Proposta', 'Linha Orcamentaria', 'Economia Estimada (anual)', 'Qualidade Tecnica', 'Aderencia a Realidade', 'Principais Defensores', 'Observacao Critica']}
          rows={[
            [
              '05',
              'Extincao do abono salarial PIS/PASEP — Consultores da Camara classificam como "14.o salario para quem tem emprego formal"; PEC 54/2024 ja reduziu parcialmente o publico',
              'Transferencia Social — Custo atual: R$ 26 bi/ano; Reducao aprovada: R$ 8-10 bi/ano',
              'R$ 15-26 bi/ano (extincao total; parcial limite 1 SM = R$ 10 bi/ano)',
              '★★★★★ Consenso quase unanime; beneficio mal direcionado',
              '55-70% — Processo parcial aprovado dez/2024. PEC 54 ja em vigor; extincao total exige PEC constitucional',
              'Giambiagi (FGV), consultores Camara Ricardo Volpe + Paulo Bijos, Mansueto Almeida, BRCG',
              'Consultores da Camara: "O abono e muito menos eficiente que o Bolsa Familia para eliminar pobreza." Beneficia trabalhadores com emprego formal e acesso a sindicatos — nao os vulneraveis. Extincao total: proxima janela politica pos-2026.',
            ],
            [
              '06',
              'Reforma da previdencia militar (SPSMFA) — Idade minima real (55 anos), fim da "morte ficta", revisao de pensoes vitalicias para filhas solteiras, aliquota contributiva alinhada ao RPPS civil',
              'Previdencia Militar — Deficit: R$ 53,8 bi/ano; Passivo atuarial: R$ 856 bi',
              'R$ 5-15 bi/ano (PL 4.920/2024 = so R$ 1-2 bi/ano; potencial real e 10x maior)',
              '★★★★ Diagnostico claro; reforma proposta considerada cosmetica',
              '20-35% — Resistencia institucional extrema. Forcas Armadas tem posicao privilegiada no processo politico',
              'IFI/Senado, Banco Mundial, Giambiagi, consultores da Camara',
              'Brasil destina 85% do orcamento de Defesa para pessoal — EUA destinam 26%. 188 viuvas/filhas acima do teto constitucional com pensoes R$ 50-79 mil/mes. PL 4.920/2024 gera R$ 1 bi/ano: "reforma cosmetica", diz IFI.',
            ],
            [
              '07',
              'Desvinculacao parcial dos pisos de saude e educacao da receita — Indexar pelo crescimento maximo do arcabouco (2,5%) em vez da variacao da receita',
              'Discricionarias/Vinc. — Saude: R$ 247 bi/ano (LOA 2025); Educacao: R$ 198 bi/ano',
              'R$ 20-50 bi/ano (depende do crescimento real da receita; efeito cresce em anos bons)',
              '★★★★ Tecnicamente coerente com o arcabouco; politicamente explosivo',
              '15-25% — Tabu politico extremo. Proposta dos deputados (Pedro Paulo, Kim Kataguiri) — nao avancou',
              'Paulo Bijos e Ricardo Volpe (consultores Camara), Gesner Oliveira (FGV), BRCG',
              'Proposta dos deputados Pedro Paulo / Kim Kataguiri foi "mais robusta e estrutural" que a do governo, segundo consultores. Resistencia da sociedade e muito alta: pisos de saude e educacao sao percebidos como conquistas inegociaveis.',
            ],
            [
              '08',
              'Desoneracao da folha de pagamentos — revisao/extincao gradual — 17 setores usufruem de substituicao da contribuicao patronal sobre folha por % da receita bruta; beneficio nasceu emergencial em 2011, nunca foi encerrado',
              'Gasto Tributario — Custo estimado: R$ 15-25 bi/ano; parte dos R$ 544 bi em renuncias 2025',
              'R$ 12-22 bi/ano (reversao total; STF ja bloqueou extincao abrupta em 2023)',
              '★★★ Consenso tecnico existe; evidencias de efetividade sao mistas',
              '40-55% — Processo em curso mas lento. STF sustou extincao abrupta; governo negocia transicao gradual',
              'Gesner Oliveira (FGV), Tesouro Nacional, IPEA, economistas do Min. da Fazenda',
              'Setores como textil, calcados, TI e construcao dependem do beneficio. Banco Mundial recomenda extincao gradual com compensacao transitoria. Reforma tributaria (EC 132/2023) deveria simplificar — processo em andamento.',
            ],
            [
              '09',
              'Limite real das emendas parlamentares ao orcamento — Contingenciamento proporcional de emendas individuais e de bancada quando houver deficit primario; hoje emendas impositivas (R$ 39 bi) escapam do bloqueio',
              'Discricionarias — Total emendas LOA 2025: R$ 50+ bi; Impositivas fora do contingenciamento: R$ 39 bi',
              'R$ 10-20 bi/ano (depende do enforcement; PLP 210/2024 limita apenas emendas de comissao R$ 11,5 bi)',
              '★★★ Diagnostico claro; efetividade depende de quem controla o Congresso',
              '25-35% — Conflito de interesse estrutural no Congresso. STF exige transparencia; mas emendas sao moeda politica',
              'Movimento Orcamento Bem Gasto (Arida, Bacha, Fraga, Meirelles, Salto), IFI, BRCG',
              '68% da populacao apoia reducao de emendas parlamentares (pesquisa Ideia/Estadao dez/2025). PLP 210/2024 so atinge emendas de comissao (menor parte). Emendas individuais e de bancada continuam protegidas — "nucleo duro" da moeda politica do Centrao.',
            ],
          ]}
        />

        {/* ── PRIORIDADE III ── */}
        <Callout type="info">PRIORIDADE III — RELEVANTES, MENOR CONSENSO OU EFEITO DE MEDIO/LONGO PRAZO</Callout>

        <DataTable
          headers={['#', 'Proposta', 'Linha Orcamentaria', 'Economia Estimada (anual)', 'Qualidade Tecnica', 'Aderencia a Realidade', 'Principais Defensores', 'Observacao Critica']}
          rows={[
            [
              '10',
              'Revisao do seguro-desemprego e sequenciamento com FGTS — Banco Mundial: usar saldo do FGTS antes de acessar seguro-desemprego; limitar numero de acessos consecutivos',
              'Transferencia Social — Seguro-desemprego: R$ 70 bi/ano (est.); FGTS: R$ 580 bi em ativos (FAT)',
              'R$ 8-15 bi/ano (Banco Mundial, jun/2025)',
              '★★★ Tecnicamente razoavel; evidencias internacionais mistas',
              '20-30% — Resistencia sindical e parlamentar',
              'Banco Mundial (relatorio jun/2025), Mansueto Almeida',
              'Proposta impopular entre sindicatos. Risco de desproteger trabalhadores que perderam FGTS em saques emergenciais (pandemia). Impacto real dificil de prever.',
            ],
            [
              '11',
              'Congelamento real da folha de pessoal ate 2030 — Giambiagi propoe crescimento zero real das despesas com pessoal (ativo + inativo) da Uniao por 5 anos; para servidores novos, carreiras reformadas',
              'Funcionalismo — Folha total Uniao: R$ 400+ bi/ano; cresceu 59% em termos nominais 2015-2025',
              'R$ 15-30 bi/ano (economias acumuladas; depende da inflacao e negociacao salarial)',
              '★★★ Proposta factivel tecnicamente; politicamente impopular',
              '20-30% — Governo Lula concedeu reajustes em 2023-2024',
              'Giambiagi (FGV-IBRE), Mansueto Almeida',
              'Lula aprovou reajustes salariais em 2023 quebrando a tendencia de estagnacao. Carreiras estrategicas (fiscais, auditores, delegados) pressionam por equiparacoes. PEC 38/2025 nao trata de congelamento, apenas de penduricalhos.',
            ],
            [
              '12',
              'Revisao do FCDF — Fundo Constitucional do Distrito Federal — Desvincular crescimento da RCL da Uniao e indexar ao IPCA; ja aprovado na PEC 54/2024 mas com implementacao gradual',
              'Discricionarias — FCDF: R$ 20+ bi/ano; crescia junto com toda receita federal',
              'R$ 2-5 bi/ano (economia incremental vs. crescimento projetado; aprovado dez/2024)',
              '★★★★ Aprovado; estimativa confiavel',
              '80-90% — Ja aprovado na PEC 54/2024',
              'BRCG, IFI/Senado',
              'Ja aprovado — menor polemica. Efeito fiscal modesto mas simbolico: mostra que vinculos automaticos podem ser quebrados.',
            ],
            [
              '13',
              'Revisao do judiciario — teto efetivo e limite de estrutura — Aplicar teto real sem escapatorias para magistratura; limitar criacao de varas e tribunais; cortar estrutura administrativa (R$ 146 bi/ano — 89% pessoal)',
              'Funcionalismo — Gasto Judiciario 2024: R$ 146 bi; 89% em pessoal; 2.o maior do mundo',
              'R$ 10-20 bi/ano (se o teto for efetivamente aplicado a magistratura; R$ 11,5 bi so em supersalarios do Judiciario)',
              '★★★ Diagnostico robusto; mas quem aprova a regra a aplica a si mesmo',
              '15-25% — Conflito de interesse estrutural. CNJ pode contornar leis ordinarias via resolucao',
              'Felipe Salto (IFI/Warren), Movimento OBG',
              'STF e CNJ editam resolucoes que tem forca de lei ordinaria, contornando qualquer limitacao legislativa que nao seja PEC constitucional. Flavio Dino suspendeu penduricalhos por portaria — STF derrubou. Requer PEC especifica.',
            ],
            [
              '14',
              'Correcao da nova regra do salario minimo (cap em 2,5% PIB defasado) — Regra atual: INPC + crescimento real do PIB de dois anos antes. Cap proposto: crescimento maximo de 2,5% real. Giambiagi propoe IPCA-only por 12 anos.',
              'Previdencia + Transferencia Social — Impacto cascata: INSS + BPC + seg. desemprego + abono',
              'R$ 50-130 bi/10 anos (R$ 131 bi acumulados 2025-2028, estimativa Executivo)',
              '★★★★★ Efeito mais estrutural de todos; mas combinado com proposta 02',
              '10-20% — Tabu politico absoluto no governo Lula. 78% da pop. defende reajuste pelo minimo; identidade do PT',
              'Giambiagi (FGV-IBRE), Mansueto Almeida, BRCG, Symplexia',
              '"A nova regra tem efeitos absolutamente devastadores para o futuro da Previdencia Social" — Giambiagi. A regra aprovada em 2023 anulou R$ 50 bi/ano de ganhos da EC 103/2019. Janela: crise fiscal aberta ou novo governo pos-2026.',
            ],
          ]}
        />
      </Section>

      {/* ── ADERENCIA POLITICA (HORIZONTAL BAR) ── */}
      <Section num="07" title="Aderencia a Realidade Politica (% viabilidade 3-5 anos)">
        <HorizBar items={[
          { label: 'FCDF (aprovado)', value: 85, max: 100, color: 'var(--green)' },
          { label: 'Ext. abono PIS/PASEP', value: 62, max: 100, color: 'var(--gold)' },
          { label: 'Penduricalhos (PEC 38)', value: 52, max: 100, color: 'var(--gold)' },
          { label: 'Desoneracao folha', value: 47, max: 100, color: 'var(--gold)' },
          { label: 'Gastos tributarios', value: 38, max: 100, color: 'var(--gold)' },
          { label: 'Emendas parlam.', value: 30, max: 100, color: 'var(--red)' },
          { label: 'Ref. militar', value: 27, max: 100, color: 'var(--red)' },
          { label: 'Nova ref. RGPS', value: 25, max: 100, color: 'var(--red)' },
          { label: 'Congel. folha', value: 25, max: 100, color: 'var(--red)' },
          { label: 'Seg. desemprego/FGTS', value: 25, max: 100, color: 'var(--red)' },
          { label: 'Pisos saude/educ.', value: 20, max: 100, color: 'var(--red)' },
          { label: 'Correcao SM', value: 15, max: 100, color: 'var(--red)' },
          { label: 'Desvinc. piso+BPC', value: 12, max: 100, color: 'var(--red)' },
        ]} />
      </Section>

      {/* ── VOZES DOS ESPECIALISTAS ── */}
      <Section num="08" title="Vozes dos Especialistas">
        <Prose>
          <p>Posicionamentos subjetivos de autores de referencia sobre as prioridades do ajuste fiscal.</p>
        </Prose>

        <QuoteBlock
          quote="A nova regra de correcao do salario minimo tem efeitos absolutamente devastadores para o futuro da Previdencia Social. Ela desloca para cima uma curva de gastos que ja era crescente — e em dez anos custara R$ 550 bilhoes a mais do que sem ela."
          author="Fabio Giambiagi"
          role="Pesquisador FGV-IBRE; 44 livros sobre contas publicas"
        />

        <QuoteBlock
          quote="O ajuste fiscal precisa ser feito predominantemente pelo lado das despesas. Buscar mais receitas que automaticamente elevam despesas e inflacionario — e os resultados do governo Lula demonstram isso: entre 2023 e 2026 a receita real cresce 2,8% a.a. e a despesa, 4,5%."
          author="Mansueto Almeida"
          role="Ex-Secretario do Tesouro; Economista-chefe BTG Pactual"
        />

        <QuoteBlock
          quote="A forma como hoje esta organizada, a institucionalidade fiscal brasileira aponta para shutdown do Estado ate o fim da decada. Novas rodadas de ajuste nos gastos serao necessarias, e o tempo corre mais rapido do que muitos imaginam."
          author="Blog IBRE / FGV — BRCG"
          role="Analise pos-pacote dez/2024"
        />

        <QuoteBlock
          quote="Uma revisao rigorosa dos subsidios e necessaria — mas e preciso muita coragem. Voce tem que cortar alguma coisa e manter outras. A renuncia fiscal e de R$ 580 bilhoes ao ano, e boa parte nao tem justificativa economica."
          author="Gesner Oliveira"
          role="Socio GO Associados; Professor FGV; Ex-pres. CADE"
        />

        <QuoteBlock
          quote="Existe um desequilibrio fiscal persistente e estrutural na economia brasileira. Vale ressaltar que essa piora vem desde o primeiro semestre de 2024, quando as metas fiscais de 2025 e 2026 foram alteradas. As projecoes de estabilizacao da divida nao nos parecem plausiveis."
          author="Marcus Pestana"
          role="Diretor-executivo IFI/Senado Federal"
        />

        <QuoteBlock
          quote="Cortar os supersalarios nao sera a solucao para o desequilibrio fiscal. Porem, do ponto de vista da legitimidade das propostas, e impossivel mexer em temas controversos sem tratar dessa questao primeiro. A ordem politica importa."
          author="Felipe Salto"
          role="Ex-Diretor IFI; CEO Warren Rena; membro Movimento OBG"
        />
      </Section>

      {/* ── SINTESE DO ANALISTA ── */}
      <Section num="09" title="Sintese do Analista">
        <Prose>
          <p>Avaliacao subjetiva consolidada — o que e urgente, o que e viavel e o que e estrutural.</p>
        </Prose>

        <ScenarioGrid scenarios={[
          {
            title: 'Urgente — mas politicamente bloqueado',
            color: 'var(--red)',
            items: [
              'As propostas de maior impacto fiscal — desvinculacao do piso previdenciario, nova reforma do RGPS e correcao da regra do salario minimo — tem embasamento tecnico irrefutavel mas enfrentam resistencia politica maxima.',
              'Exigem ruptura politica, crise fiscal visivel ou novo governo com mandato especifico.',
              'Horizonte: pos-2026.',
            ],
          },
          {
            title: 'Fazivel — exige vontade politica no curto prazo',
            color: 'var(--gold)',
            items: [
              'Extincao total do abono salarial, revisao de gastos tributarios selecionados e reforma administrativa (PEC 38/2025) sao as propostas com maior consenso tecnico e janela politica realista.',
              'Juntas poderiam gerar R$ 40-60 bi/ano adicionais ao pacote dez/2024.',
              'PEC 38/2025 e a principal aposta do presidente da Camara Hugo Motta.',
            ],
          },
          {
            title: 'Ja aprovado — mas insuficiente',
            color: 'var(--green)',
            items: [
              'O pacote de dez/2024 (PEC 54 + PLP 210 + PL 4.614) gerou R$ 70 bi em 2 anos — mas a IFI projeta deficit de R$ 102-107 bi em 2025-2026 mesmo com as medidas.',
              'O diagnostico de especialistas e claro: ganhou-se tempo, mas o ajuste estrutural ainda nao foi feito.',
              'O "apagao fiscal" de 2027 se aproxima.',
            ],
          },
        ]} />
      </Section>

      {/* ── VEREDICTO CONSOLIDADO ── */}
      <Section num="10" title="Veredicto Consolidado — Potencial vs. Realismo">
        <DataTable
          headers={['Proposta', 'Potencial (R$ bi/ano)', 'Qualidade', 'Aderencia', 'Status']}
          rows={[
            ['Nova reforma previdencia RGPS', '80-150', '★★★★★', '20-30%', 'Aguarda novo governo 2026+'],
            ['Desvinculacao piso prev. + BPC do SM', '40-80', '★★★★★', '10-15%', 'Tabu absoluto / crise ou novo governo'],
            ['Revisao gastos tributarios / subsidios', '40-80', '★★★★', '30-45%', 'Haddad propoe corte 10%; Camara instalou subcomissao'],
            ['Penduricalhos + supersalarios (PEC 38)', '10-20', '★★★★', '45-60%', 'PEC 38/2025 em tramitacao (Hugo Motta)'],
            ['Extincao abono salarial PIS/PASEP', '15-26', '★★★★★', '55-70%', 'PEC 54/2024 reduz parcialmente; extincao total pos-2026'],
            ['Pisos constitucionais saude/educacao', '20-50', '★★★★', '15-25%', 'Tabu politico; proposta oposicao nao avancou'],
            ['Reforma militar (pensoes / aposentadoria)', '5-15', '★★★★', '20-35%', 'PL 4.920/2024 aprovado — mas cosmetico (R$1 bi/ano)'],
            ['Emendas parlamentares — limite real', '10-20', '★★★', '25-35%', 'PLP 210 so atinge comissao; emendas individuais intocadas'],
            ['Desoneracao da folha — reversao gradual', '12-22', '★★★', '40-55%', 'Em negociacao; STF sustou extincao abrupta'],
            ['Correcao regra do salario minimo', '50-130 (10 anos)', '★★★★★', '10-20%', 'Identidade do PT; tabu maximo no governo atual'],
          ]}
        />

        <Callout type="warn">
          As medidas com maior impacto fiscal (RGPS, salario minimo, desvinculacao BPC) tem a menor aderencia politica. As mais viaveis politicamente (abono, FCDF, PEC 38) economizam relativamente menos. O deficit estrutural permanece em torno de 2,3 pp do PIB — e o pacote aprovado cobre menos de um terco dessa lacuna.
        </Callout>
      </Section>
    </ReportShell>
  );
}
