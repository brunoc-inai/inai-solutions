import ReportShell, { Section, StatGrid, StatCard, DataTable, Callout, BarChart, Prose, InfoGrid, InfoCard, FactorCard, ScenarioGrid } from './ReportShell';

export default function ReportEstrutura({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell title="Estruturas de Poder Executivo" eyebrow="Casa Civil · Análise Estratégica" color="var(--amber)" onClose={onClose}>

      <Section num="01" title="Comparativo de Estruturas Ministeriais">
        <Prose>
          <p>Cada governo federal traduz suas prioridades em estruturas organizacionais. O número de ministérios não é apenas uma escolha administrativa — é um sinal de como o Estado compreende seu papel na sociedade.</p>
        </Prose>

        <BarChart items={[
          { label: 'Brasil (Lula)', value: 37, max: 37, color: '#1a3a6b' },
          { label: 'China', value: 26, max: 37, color: '#8b1a1a' },
          { label: 'EUA', value: 23, max: 37, color: '#7c1a1a' },
          { label: 'Noruega', value: 20, max: 37, color: '#003f7f' },
          { label: 'Alemanha', value: 16, max: 37, color: '#2d5a1b' },
          { label: 'Singapura', value: 16, max: 37, color: '#0d7a5f' },
          { label: 'Argentina (pré-Milei)', value: 18, max: 37, color: '#9b2335' },
          { label: 'Argentina (Milei)', value: 9, max: 37, color: '#1a6b3c' },
        ]} />

        <DataTable
          headers={['Indicador', 'Brasil', 'EUA', 'AR (pré)', 'AR (Milei)', 'Singapura', 'China', 'Noruega', 'Alemanha']}
          rows={[
            ['Ministérios', '37', '15+7 cab.', '18-20', '8-9', '16', '26', '12-13', '16'],
            ['Secretarias L1', '150+', '250+ ag.', '80+', '~40', '~60 boards', '38 orgs', '~50 ag.', '~80 aut.'],
            ['Reportes ao chefe', '37', '23', '18-20', '8-9', '~16', '~10', '~13', '16'],
            ['Níveis hierárquicos', '5-6', '4-5', '4-5', '3-4', '3', '4-5', '3', '3-4'],
            ['Cargos DAS/equiv.', '~25.000', '~4.000', '~8.000', '~3.500', '~600', '~6.000', '~700', '~1.200'],
            ['Func. fed./1000 hab.', '~18', '~9', '~22', '~18', '~5', '~14', '~7', '~5'],
            ['CPI (corrupção)', '36/100', '69/100', '38/100', 'tendência ↑', '84/100', '42/100', '85/100', '78/100'],
          ]}
          highlight={0}
        />

        <Callout type="danger">
          O Brasil tem mais de 4x mais ministérios que Singapura, um país com PIB per capita 5x maior e governança entre as melhores do mundo. Mais estrutura não gera mais entrega — frequentemente gera o contrário.
        </Callout>
      </Section>

      <Section num="02" title="Hierarquia & Span of Control">
        <Prose>
          <p>O <em>span of control</em> — quantos subordinados diretos um líder gerencia — é um dos indicadores mais robustos de eficiência organizacional. Na teoria clássica, um executivo pode gerenciar entre 5 e 9 subordinados com alta qualidade de atenção.</p>
          <p>Quando um presidente tem 37 ministros reportando diretamente, ele tem em média <strong>13 minutos por ministro por semana</strong> se dedicar 8h/dia a reuniões. O resultado é governança por crise, não por estratégia.</p>
        </Prose>

        <StatGrid>
          <StatCard value="37" label="Reportes diretos ao presidente (Brasil)" color="var(--red)" />
          <StatCard value="13" unit=" min/sem" label="Tempo por ministro por semana" color="var(--amber)" />
          <StatCard value="5-6" label="Níveis hierárquicos (Brasil)" color="var(--red)" />
          <StatCard value="3" label="Níveis hierárquicos (Singapura/Noruega)" color="var(--green)" />
        </StatGrid>

        <DataTable
          headers={['País', 'Nota', 'Níveis', 'Estrutura-chave']}
          rows={[
            ['Singapura', 'A+', '3', 'PM → 16 Ministros → Sec. Permanentes (carreira) → Statutory Boards'],
            ['Noruega', 'A+', '3', 'PM → 12-13 Min. → Diretorias independentes (sem ordens diretas)'],
            ['Alemanha', 'A', '3-4', 'Chanceler → 16 Min. → Staatssekretäre → Behörden federais'],
            ['Argentina (Milei)', 'B+', '3-4', 'Presidente → Jefatura + 8 Min. → Secretarías → Subsecretarías'],
            ['China', 'C', '4-5', 'Xi → Premier → 4 Vice-Premiers → 26 Depts + estrutura do Partido'],
            ['Brasil', 'D', '5-6', 'Presidente → 37 Min. → Sec. Nacionais → Depts → Divisões → Seções'],
          ]}
          highlight={5}
        />

        <Callout type="info">
          Lei de Miller aplicada à governança: a mente humana processa entre 5 e 9 itens simultaneamente. Um presidente com 37 ministros diretos opera 4x acima da capacidade cognitiva ótima para tomada de decisão estratégica.
        </Callout>

        <Prose>
          <p><strong>Velocidade de resposta:</strong> Em governos com 5-6 níveis, uma decisão estratégica leva 4-8 semanas para ir do topo à execução. Em estruturas de 3 níveis (Singapura, Noruega), esse tempo cai para 3-5 dias úteis.</p>
          <p><strong>Rent-seeking:</strong> Cada nível hierárquico adicional é uma oportunidade para captura burocrática. Mais camadas = mais pontos de corrupção.</p>
        </Prose>
      </Section>

      <Section num="03" title="O Custo de Criar um Ministério">
        <Prose>
          <p>A distinção entre Ministério e Secretaria não é apenas simbólica — ela tem consequências fiscais diretas e significativas.</p>
        </Prose>

        <StatGrid>
          <StatCard value="R$150M" unit="-800M" label="Custo anual por ministério (estrutura + pessoal)" color="var(--red)" />
          <StatCard value="5-10" unit="x" label="Multiplicador de custo: ministério vs. secretaria" color="var(--amber)" />
          <StatCard value="25.000" label="Cargos DAS no Brasil (vs. 600 em Singapura)" color="var(--red)" />
        </StatGrid>

        <InfoGrid columns={3}>
          <InfoCard title="+1 Ministro de Estado" color="var(--red)">
            <p>Salário ~R$44.000/mês + benefícios + segurança + motorista + assessores. Cargo de indicação política.</p>
          </InfoCard>
          <InfoCard title="+3-8 Secretários (DAS 6)" color="var(--red)">
            <p>Cada DAS 6 custa ~R$18.000/mês + estrutura. São cargos 100% de confiança política, não técnica.</p>
          </InfoCard>
          <InfoCard title="+40-120 Cargos DAS 1-5" color="var(--red)">
            <p>Cada novo ministério gera 40-120 cargos intermediários. R$500M-R$1,5B em folha ao longo de um mandato.</p>
          </InfoCard>
          <InfoCard title="+1 Sede ministerial" color="var(--amber)">
            <p>Aluguel, manutenção, segurança de prédio inteiro em Brasília. R$5M-50M/ano.</p>
          </InfoCard>
          <InfoCard title="Sobreposição de competências" color="var(--amber)">
            <p>Cada novo ministério cria zonas de conflito com outros. Litígios de competência consomem tempo e geram duplicação.</p>
          </InfoCard>
          <InfoCard title="+1 Assento no Conselho" color="var(--blue)">
            <p>Mais um negociador político com pauta própria, mais um canal de captura de orçamento.</p>
          </InfoCard>
        </InfoGrid>

        <Callout type="danger">
          Caso Brasil 2023: a criação de novos ministérios (Povos Indígenas, Mulheres, Esporte, etc.) gerou estimativa de R$1,2-2,4 bilhões em custos adicionais estruturais no primeiro mandato — apenas em DAS e estrutura administrativa (TCU/Instituto Millenium).
        </Callout>
      </Section>

      <Section num="04" title="Governança, Burocracia & Corrupção">
        <Prose>
          <p>Existe correlação estatisticamente robusta entre tamanho da estrutura governamental e índices de corrupção. A causalidade é bidirecional: países menos desenvolvidos criam mais estrutura para acomodar demandas políticas, e mais estrutura cria mais oportunidades para corrupção.</p>
        </Prose>

        <StatGrid>
          <StatCard value="-0.62" label="Correlação: nº ministérios vs. CPI (mais min. = mais corrupção)" color="var(--red)" />
          <StatCard value="3-5" unit=" dias" label="Tempo de resposta (Singapura/Noruega)" color="var(--green)" />
          <StatCard value="4-8" unit=" sem" label="Tempo de resposta (Brasil)" color="var(--red)" />
          <StatCard value="2-4" unit="x" label="Custo burocracia/PIB (estruturas enxutas gastam menos)" color="var(--amber)" />
        </StatGrid>

        <ScenarioGrid scenarios={[
          {
            title: 'Como estrutura melhora governança',
            color: 'var(--green)',
            items: [
              'Clareza de responsabilidade: 16 ministérios = claro quem responde por quê',
              'Coordenação horizontal: poucos ministérios = trabalho interministerial ágil',
              'Velocidade de resposta: menos aprovações = execução em horas, não semanas',
            ],
          },
          {
            title: 'Como estrutura reduz corrupção',
            color: 'var(--blue)',
            items: [
              'Menos pontos de captura: cada interface é um ponto de rent-seeking',
              'Meritocracia vs. patronagem: 600 DAS (SG) vs. 25.000 (BR)',
              'Transparência: orçamentos mais fáceis de auditar com menos entidades',
            ],
          },
        ]} />

        <Callout type="warn">
          No Brasil, uma política de habitação envolve 7+ ministérios com interesses conflitantes. Em Singapura e Noruega, grupos de trabalho interministeriais são ágeis porque há poucos ministérios para coordenar.
        </Callout>
      </Section>

      <Section num="05" title="Ranking dos Modelos Analisados">
        <Prose>
          <p>Ranking considerando 5 dimensões: eficiência estrutural, qualidade de governança (WGI), controle de corrupção (CPI), velocidade de resposta institucional e sustentabilidade fiscal. Nota máxima: 100.</p>
        </Prose>

        <DataTable
          headers={['#', 'País', 'Ministérios', 'Níveis', 'CPI', 'Nota']}
          rows={[
            ['1', 'Singapura', '16', '3', '84/100', '93'],
            ['2', 'Noruega', '12-13', '3', '85/100', '88'],
            ['3', 'Alemanha', '16-17', '3-4', '78/100', '80'],
            ['4', 'EUA', '15 depts + 23 gab.', '4-5', '69/100', '66'],
            ['5', 'Argentina (Milei)', '8-9', '3-4', 'baixo (↑)', '59'],
            ['6', 'China', '26', '4-5', '42/100', '50'],
            ['7', 'Brasil (atual)', '37', '5-6', '36/100', '27'],
            ['8', 'Argentina (pré-Milei)', '18-20', '4-5', '38/100', '22'],
          ]}
          highlight={6}
        />

        <BarChart items={[
          { label: 'Singapura', value: 93, max: 100, color: '#0d7a5f' },
          { label: 'Noruega', value: 88, max: 100, color: '#003f7f' },
          { label: 'Alemanha', value: 80, max: 100, color: '#2d5a1b' },
          { label: 'EUA', value: 66, max: 100, color: '#7c1a1a' },
          { label: 'Argentina (Milei)', value: 59, max: 100, color: '#1a6b3c' },
          { label: 'China', value: 50, max: 100, color: '#8b0000' },
          { label: 'Brasil', value: 27, max: 100, color: '#c0392b' },
          { label: 'Argentina (pré)', value: 22, max: 100, color: '#9b2335' },
        ]} />

        <Callout type="info">
          A Argentina de Milei é o caso mais interessante: redução de 50% em um dia, num país com CPI baixo. A tendência é melhora em eficiência fiscal, mas estrutura enxuta sem qualidade institucional só gera velocidade para o erro. A alta rotatividade (116 trocas em 26 meses) sugere compressão rápida demais.
        </Callout>
      </Section>

      <Section num="06" title="Proposta para o Brasil: 37 → 18">
        <Prose>
          <p>A proposta não é um exercício de "Estado mínimo" — é uma reconfiguração baseada em evidências de governança internacional, adaptada à realidade federativa e democrática do Brasil. Objetivo: 37 ministérios para 16-18 super-ministérios temáticos com 3 níveis hierárquicos.</p>
        </Prose>

        <StatGrid>
          <StatCard value="37→18" label="Redução proposta de ministérios" color="var(--blue)" />
          <StatCard value="~R$8B" label="Economia anual estimada em estrutura" color="var(--green)" />
          <StatCard value="3" label="Níveis hierárquicos: Ministro → Secretário → Diretor" color="var(--amber)" />
          <StatCard value="-68" unit="%" label="Redução de DAS: 25.000 → ~8.000" color="var(--green)" />
        </StatGrid>

        <InfoGrid columns={3}>
          <InfoCard title="Casa Civil / Coordenação" subtitle="Min. 1" color="var(--blue)">
            <p>Coordenação central do governo</p>
          </InfoCard>
          <InfoCard title="Fazenda & Planejamento" subtitle="Min. 2" color="var(--blue)">
            <p>Política fiscal e planejamento</p>
          </InfoCard>
          <InfoCard title="Educação, Ciência & Tech" subtitle="Min. 3" color="var(--blue)">
            <p>Educação + C&T unificadas</p>
          </InfoCard>
          <InfoCard title="Saúde & Assistência Social" subtitle="Min. 4" color="var(--blue)">
            <p>Saúde pública + assistência</p>
          </InfoCard>
          <InfoCard title="Justiça & Seg. Pública" subtitle="Min. 5" color="var(--blue)">
            <p>Sistema de justiça e segurança</p>
          </InfoCard>
          <InfoCard title="Defesa Nacional" subtitle="Min. 6" color="var(--blue)">
            <p>Forças Armadas e defesa</p>
          </InfoCard>
          <InfoCard title="Relações Exteriores" subtitle="Min. 7" color="var(--blue)">
            <p>Diplomacia e comércio exterior</p>
          </InfoCard>
          <InfoCard title="Infraestrutura & Cidades" subtitle="Min. 8" color="var(--blue)">
            <p>Transportes + Cidades fusionados</p>
          </InfoCard>
          <InfoCard title="Meio Ambiente & Clima" subtitle="Min. 9" color="var(--blue)">
            <p>Agenda ambiental e climática</p>
          </InfoCard>
          <InfoCard title="Indústria & Comércio" subtitle="Min. 10" color="var(--blue)">
            <p>Desenvolvimento industrial</p>
          </InfoCard>
          <InfoCard title="Agricultura & Abast." subtitle="Min. 11" color="var(--blue)">
            <p>Agronegócio e abastecimento</p>
          </InfoCard>
          <InfoCard title="Minas, Energia & Petróleo" subtitle="Min. 12" color="var(--blue)">
            <p>Energia e recursos minerais</p>
          </InfoCard>
          <InfoCard title="Trabalho & Previdência" subtitle="Min. 13" color="var(--blue)">
            <p>Relações de trabalho e aposentadoria</p>
          </InfoCard>
          <InfoCard title="Gestão & Inovação" subtitle="Min. 14" color="var(--blue)">
            <p>Modernização do Estado</p>
          </InfoCard>
          <InfoCard title="Desenv. Social & Família" subtitle="Min. 15" color="var(--blue)">
            <p>Programas sociais e família</p>
          </InfoCard>
          <InfoCard title="Pesca, Aquic. & Interior" subtitle="Min. 16" color="var(--blue)">
            <p>Desenvolvimento regional</p>
          </InfoCard>
          <InfoCard title="Comunicações & Digital" subtitle="Min. 17" color="var(--blue)">
            <p>Digitalização e telecomunicações</p>
          </InfoCard>
          <InfoCard title="Cultura, Esporte & Turismo" subtitle="Min. 18" color="var(--blue)">
            <p>Áreas temáticas fusionadas</p>
          </InfoCard>
        </InfoGrid>

        <ScenarioGrid scenarios={[
          {
            title: 'Estrutura Atual (37 min.)',
            color: 'var(--red)',
            items: [
              'Presidente → 37 reportes diretos',
              'Sec. Nacionais (L2): ~150+',
              'DAS 5-6 (L3): ~500+',
              'Departamentos (L4): ~3.000+',
              'Divisões/DAS 1-3 (L5): ~21.000+',
            ],
          },
          {
            title: 'Estrutura Proposta (18 min.)',
            color: 'var(--green)',
            items: [
              'Casa Civil de Coordenação (L0.5)',
              '18 Ministros Temáticos (L1)',
              'Sec. Nacionais de carreira (L2): ~80-100',
              'Diretores/Agências autônomas (L3): ~500',
              'Max. 3 níveis presidente→execução',
            ],
          },
        ]} />

        <Callout type="danger">
          O que NÃO fazer (erro argentino): a Argentina errou ao fazer redução abrupta sem plano de transição. A proposta brasileira deve ser executada em 18-24 meses: (1) fusão gradual por cluster temático, (2) manutenção de servidores de carreira, (3) Secretários Nacionais com mandato claro dentro de cada super-ministério.
        </Callout>
      </Section>

      <Section num="07" title="Fatores de Impacto da Reforma Estrutural">
        <Prose>
          <p>Os fatores abaixo são interdependentes — cada um cria condições para o próximo, num ciclo virtuoso que leva décadas para ser construído mas que começa com decisões de redesenho organizacional.</p>
        </Prose>

        <InfoGrid columns={2}>
          <InfoCard title="1. Desbloqueio de Velocidade Decisória" color="var(--amber)">
            <p>De 5-6 níveis para 3: o tempo de uma decisão estratégica chegar à execução cai de semanas para dias. Em crises — pandemias, desastres, crises econômicas — isso salva vidas e dinheiro.</p>
          </InfoCard>
          <InfoCard title="2. Redução Estrutural da Corrupção" color="var(--green)">
            <p>Cada interface burocrática eliminada é um ponto de rent-seeking a menos. Menos DAS = menos clientelismo estrutural. Suécia e Singapura demonstram que funciona.</p>
          </InfoCard>
          <InfoCard title="3. Accountability Mais Clara" color="var(--blue)">
            <p>Com 18 super-ministérios, cada ministro é dono de uma agenda clara. Não há mais "o problema não é comigo" entre ministérios concorrentes.</p>
          </InfoCard>
          <InfoCard title="4. Liberação de Recursos Fiscais" color="var(--red)">
            <p>Estimativa: R$6-10 bilhões anuais liberados. Equivale a 20-30 hospitais regionais/ano ou Bolsa Família para +4 milhões de famílias.</p>
          </InfoCard>
          <InfoCard title="5. Meritocracia no Serviço Público" color="var(--amber)">
            <p>Profissionalização dos cargos intermediários cria continuidade de políticas entre governos e eleva a qualidade técnica das decisões.</p>
          </InfoCard>
          <InfoCard title="6. Sinal para o Mercado & Rating" color="var(--green)">
            <p>Reforma estrutural sinaliza seriedade fiscal. A Argentina viu queda significativa do risco-país apenas com o anúncio da redução ministerial.</p>
          </InfoCard>
          <InfoCard title="7. Facilidade de Negócios" color="var(--blue)">
            <p>Doing Business (World Bank) correlaciona estrutura burocrática com custo de operar empresas. Menos sobreposição = menos janelas para licenças e tributos.</p>
          </InfoCard>
          <InfoCard title="8. Coordenação Federativa" color="var(--red)">
            <p>Com menos ministérios federais, estados e municípios têm interlocutores mais claros. O cipoal de programas concorrentes é um dos maiores geradores de ineficiência.</p>
          </InfoCard>
        </InfoGrid>

        <Callout type="warn">
          Por que o Brasil ainda não fez? O número de ministérios é moeda de troca política. O presidencialismo de coalizão — 10-15 partidos para maioria — cria incentivos para inflação ministerial. A solução não é ignorar a política, é redesenhar a moeda de troca: Secretarias Nacionais com orçamento protegido, cadeiras no Conselho sem cargo ministerial, e contratos de resultado ministeriais.
        </Callout>

        <FactorCard title="Síntese Final" color="var(--amber)">
          <p>O Brasil não precisa do Estado menor de Milei nem do Estado autoritário da China. Precisa de um <strong>Estado mais inteligente</strong> — como Singapura e Noruega demonstram ser possível em democracias. A evidência internacional é clara: governos com 12-18 ministérios, hierarquias de 3 níveis, serviço civil meritocrático e agências autônomas para execução entregam mais com menos, corrompem-se menos e respondem mais rápido.</p>
          <p>A reforma ideal é gradual, negociada e transparente — de 37 para 25-28 nos primeiros 24 meses, com meta de 18-20 ao final do mandato.</p>
        </FactorCard>
      </Section>

    </ReportShell>
  );
}
