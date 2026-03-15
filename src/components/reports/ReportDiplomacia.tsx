import ReportShell, {
  Section, StatGrid, StatCard, DataTable, Callout, BarChart,
  Prose, QuoteBlock, FactorCard, InfoGrid, InfoCard, ScenarioGrid, HorizBar, Timeline
} from './ReportShell';

export default function ReportDiplomacia({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Diplomacia Brasileira"
      eyebrow="Analise Geopolitica -- Marco 2026"
      color="var(--green)"
      onClose={onClose}
    >

      {/* ══════════════════════════════════════════════
          01 — POSICAO HISTORICA: A DOUTRINA DO ITAMARATY
      ══════════════════════════════════════════════ */}
      <Section num="01" title="A Doutrina do Itamaraty">
        <Prose>
          <p>
            A politica externa brasileira tem uma identidade que transcende governos. O Itamaraty construiu ao longo do seculo XX uma doutrina coerente baseada em tres pilares constitucionais: <strong>nao-intervencao, nao-alinhamento automatico e solucao pacifica de controversias</strong>.
          </p>
          <p>
            Esses principios estao no Art. 4 da Constituicao de 1988, mas na pratica sao muito mais antigos — remetem ao Barao do Rio Branco (1902–1912), que definiu as fronteiras brasileiras pela via diplomatica e estabeleceu o tom pragmatico que persiste ate hoje.
          </p>
        </Prose>

        <QuoteBlock
          quote="O Brasil e grande demais para se subordinar, pequeno demais para impor. Dai vem a logica do nao-alinhamento."
          author="Doutrina do Itamaraty"
          role="Principio historico"
        />

        <Prose>
          <p>
            No seculo XX, o Brasil oscilou entre aproximacao com os EUA — especialmente durante a Guerra Fria, quando era um aliado anticomunista importante — e tentativas de autonomia nos anos Geisel/Figueiredo com a "Politica Externa Independente". O padrao de medio prazo, porem, foi sempre o mesmo: <em>usar a diplomacia para abrir mercados, evitar aliancas militares custosas, e maximizar o espaco de manobra entre as grandes potencias</em>.
          </p>
        </Prose>

        <InfoGrid columns={3}>
          <InfoCard title="Nao-Intervencao" subtitle="Pilar 1" color="var(--green)">
            <p>O Brasil se recusa a endossar sancoes economicas ou intervencao militar em outros paises, mesmo quando ha consenso ocidental. Posicao constante desde a ditadura militar ate Lula.</p>
          </InfoCard>
          <InfoCard title="Nao-Alinhamento" subtitle="Pilar 2" color="var(--blue)">
            <p>Autonomia em relacao as grandes potencias. Recusa a integrar aliancas militares. Votacao independente na ONU. Desde 2022, chamado de "nao-alinhamento ativo" (ANA).</p>
          </InfoCard>
          <InfoCard title="Solucao Pacifica" subtitle="Pilar 3" color="var(--gold)">
            <p>Todas as disputas territoriais brasileiras foram resolvidas diplomaticamente. O Brasil tem zero conflitos armados em suas fronteiras nos ultimos 150 anos — caso unico na America Latina.</p>
          </InfoCard>
        </InfoGrid>

        <Prose>
          <p><strong>A Era do "Nao-Alinhamento Ativo" (2022–presente)</strong></p>
          <p>
            No contexto atual, o conceito dominante e o <strong>ANA — Active Non-Alignment</strong>, que foca em tres objetivos principais: diversificar parceiros, focar em desenvolvimento e democratizar a governanca global para ampliar a voz do pais. A resposta brasileira a invasao da Ucrania ilustra perfeitamente essa abordagem: o Brasil condenou a agressao e apoiou resolucoes na Assembleia Geral da ONU, mas se recusou a endossar as sancoes ocidentais, alinhando-se a posicao de paises em desenvolvimento que as viam como excessivamente prejudiciais.
          </p>
        </Prose>
      </Section>

      {/* ══════════════════════════════════════════════
          02 — ALINHAMENTOS POR BLOCO
      ══════════════════════════════════════════════ */}
      <Section num="02" title="Onde o Brasil se Posiciona — Alinhamento por Blocos">
        <Prose>
          <p>
            O Brasil nao pertence a nenhum bloco exclusivo. Opera simultaneamente em multiplas esferas com diferentes graus de envolvimento e comprometimento.
          </p>
        </Prose>

        <FactorCard
          title="BRICS+ — Motor do Sul Global"
          score={90}
          scoreLabel="Relevancia"
          color="var(--green)"
          tags={['Membro fundador (2009)', 'Presidencia 2025 (4a vez)', 'Expansao: Egito, Etiopia, Ira, EAU, Indonesia']}
        >
          <Prose>
            <p>Brasil foi membro fundador (2009). Em 2025, preside o bloco pela 4a vez. O BRICS expandiu para incluir Egito, Etiopia, Ira, EAU e Indonesia. O Brasil usa o bloco como plataforma para reforma da governanca financeira global e de-dollarizacao gradual — mas resiste a transformacao do BRICS em bloco anti-ocidental explicito.</p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="Mercosul — Base Regional Essencial"
          score={80}
          scoreLabel="Relevancia"
          color="var(--blue)"
          tags={['Argentina, Paraguai, Uruguai', 'Comercio bilateral ~US$31bi/ano', 'Tensao ideologica com Milei']}
        >
          <Prose>
            <p>O Brasil e o motor economico do Mercosul (Argentina, Paraguai, Uruguai). A relacao com a Argentina e a mais importante da regiao — oscila entre cooperacao profunda e friccao comercial. A chegada de Milei tensionou o bloco ideologicamente, mas nao economicamente: o comercio bilateral mantem-se em ~US$ 31bi/ano.</p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="G20 — Plataforma de Protagonismo"
          score={88}
          scoreLabel="Relevancia"
          color="var(--green)"
          tags={['Presidencia 2024', 'Alianca Global contra Fome', '82 paises mobilizados']}
        >
          <Prose>
            <p>O Brasil presidiu o G20 em 2024, com agenda centrada em fome, desigualdade e transicao energetica. Lancou a "Alianca Global contra a Fome", mobilizou 82 paises. O G20 e o principal veiculo para o Brasil se posicionar como ponte entre Norte e Sul Global.</p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="CPLP — Projecao Lusofona"
          score={65}
          scoreLabel="Relevancia"
          color="var(--gold)"
          tags={['Angola, Mocambique, Portugal, Cabo Verde', 'Soft power linguistico-cultural']}
        >
          <Prose>
            <p>Comunidade dos Paises de Lingua Portuguesa conecta o Brasil com Angola, Mocambique, Portugal, Cabo Verde e outros 4 paises. Soft power linguistico-cultural de longo alcance, especialmente relevante na Africa Subsaariana.</p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="OEA / UNASUL — Relevancia Decrescente"
          score={35}
          scoreLabel="Relevancia"
          color="var(--amber)"
          tags={['Polarizacao hemisferica', 'UNASUL esvaziada sob Bolsonaro']}
        >
          <Prose>
            <p>A Organizacao dos Estados Americanos perdeu relevancia com a polarizacao hemisferica. A UNASUL foi esvaziada durante o periodo Bolsonaro. O Brasil busca reativar mecanismos de integracao sul-americana sem o peso ideologico dos anos 2000.</p>
          </Prose>
        </FactorCard>
      </Section>

      {/* ══════════════════════════════════════════════
          03 — MAPA DIPLOMATICO / MATRIZ DE RELACIONAMENTOS
      ══════════════════════════════════════════════ */}
      <Section num="03" title="Matriz Diplomatica: Peso Economico x Alinhamento Politico">
        <Prose>
          <p>
            O mapa abaixo organiza os principais paises em dois eixos: <strong>eixo X</strong> — alinhamento politico (de rival/divergente a aliado); <strong>eixo Y</strong> — peso economico para o Brasil (de irrelevante a fundamental). Os quatro quadrantes produzem categorias estrategicas distintas.
          </p>
        </Prose>

        <InfoGrid columns={2}>
          <InfoCard title="Parceiro-Rival" subtitle="Alto comercio, divergencia politica" color="var(--amber)">
            <p><strong>China</strong> — US$158bi (maior parceiro comercial). Brasil exporta soja, minerio, petroleo. Importa eletronicos, veiculos eletricos, paineis solares.</p>
            <p><strong>Russia</strong> — Fertilizantes: 30% do suprimento brasileiro. Parceiro BRICS mas divergencia sobre Ucrania.</p>
            <p><strong>India</strong> — BRICS / neutro. Crescente relevancia comercial.</p>
          </InfoCard>
          <InfoCard title="Aliado Estrategico" subtitle="Alto comercio, alto alinhamento" color="var(--green)">
            <p><strong>EUA</strong> — US$94bi. Fonte de tecnologia avancada: chips, IA, aviacao, defesa. Tensao com Trump 2.0.</p>
            <p><strong>Uniao Europeia</strong> — US$55bi. Acordo Mercosul-UE em negociacao final. Parceiro climático.</p>
            <p><strong>Argentina</strong> — US$31bi (Mercosul). Relacao mais importante da regiao.</p>
            <p><strong>Alemanha</strong> — Parceiro industrial e tecnologico de longa data.</p>
            <p><strong>Japao / Coreia</strong> — ~US$10bi. Investimentos e tecnologia.</p>
          </InfoCard>
          <InfoCard title="Antagonista / Tensao" subtitle="Baixo comercio, baixo alinhamento" color="var(--red)">
            <p><strong>Venezuela</strong> — Tensao regional cronica. Brasil evita confronto direto mas nao endossa Maduro.</p>
            <p><strong>Israel</strong> — Ruptura por Gaza. Relacoes deterioradas desde 2024.</p>
            <p><strong>Ira</strong> — BRICS+ mas posicoes divergentes em direitos humanos.</p>
          </InfoCard>
          <InfoCard title="Parceiro Politico Menor" subtitle="Baixo comercio, alto alinhamento" color="var(--blue)">
            <p><strong>Africa do Sul</strong> — BRICS. Alinhamento diplomatico consistente.</p>
            <p><strong>Arabia Saudita</strong> — US$10bi (FIS). Investimentos crescentes.</p>
            <p><strong>Taiwan</strong> — Chips / sem relacao formal. Importancia estrategica critica.</p>
            <p><strong>CPLP Africa</strong> (Angola, Mocambique) — Soft power lusofono.</p>
          </InfoCard>
        </InfoGrid>

        <Callout type="warn">
          Paradoxo central: O Brasil depende economicamente da China (seu maior parceiro comercial), depende tecnologicamente dos EUA (chips, IA, defesa, aviacao), e depende agricolamente da Russia (30% dos fertilizantes). Nenhum desses tres relacionamentos pode ser sacrificado em nome dos outros dois — dai a logica inevitavel do nao-alinhamento.
        </Callout>
      </Section>

      {/* ══════════════════════════════════════════════
          04 — QUALIDADE DIPLOMATICA NA ONU
      ══════════════════════════════════════════════ */}
      <Section num="04" title="Perfil de Influencia Multilateral">
        <Prose>
          <p>
            O Brasil e um ator de peso medio-alto na ONU, com influencia desproporcional ao seu poderio militar. Esta entre os dez paises com mais embaixadas no mundo e usa o multilateralismo como instrumento central de politica externa.
          </p>
        </Prose>

        <BarChart items={[
          { label: 'Influencia Comercial', value: 90, max: 100, color: 'var(--green)' },
          { label: 'Construcao de Coalizoes', value: 88, max: 100, color: 'var(--green)' },
          { label: 'Multilateralismo', value: 85, max: 100, color: 'var(--teal)' },
          { label: 'Definicao de Agenda', value: 80, max: 100, color: 'var(--blue)' },
          { label: 'Soft Power Cultural', value: 75, max: 100, color: 'var(--blue)' },
          { label: 'Credibilidade / Confianca', value: 65, max: 100, color: 'var(--amber)' },
        ]} />

        <StatGrid>
          <StatCard value="80" unit="/100" label="Nota composta de eficacia multilateral" color="var(--green)" />
        </StatGrid>

        <Callout type="info">
          Alta eficacia multilateral. Ponto fraco: credibilidade como mediador neutro — comprometida pelas posicoes ambiguas sobre Ucrania e Gaza.
        </Callout>

        <Prose>
          <p><strong>O Objetivo Nao Resolvido: Assento no Conselho de Seguranca</strong></p>
          <p>
            A candidatura ao assento permanente no CSNU e o maior objetivo diplomatico nao conquistado do Brasil. O pais tem o argumento (tamanho, estabilidade, diversidade regional, historico pacifista), mas carece do apoio decisivo dos P5 — especialmente dos EUA, que historicamente resistem a ampliacao do Conselho. A campanha foi mais intensa nos governos Lula 1 e 2, resfriou durante Temer e Bolsonaro, e retomou calor com Lula 3.
          </p>
        </Prose>
      </Section>

      {/* ══════════════════════════════════════════════
          05 — RELACOES COMERCIAIS
      ══════════════════════════════════════════════ */}
      <Section num="05" title="Fluxos Comerciais Criticos">
        <Prose>
          <p>
            Em 2024, o Brasil exportou US$ 400,5bi e importou US$ 319,5bi em bens — superavit de US$ 81bi. A concentracao em dois parceiros (China e EUA = 40% do comercio) e uma vulnerabilidade estrutural de longo prazo.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="400,5" unit=" bi" label="Exportacoes (US$)" color="var(--green)" />
          <StatCard value="319,5" unit=" bi" label="Importacoes (US$)" color="var(--red)" />
          <StatCard value="+81" unit=" bi" label="Superavit (US$)" color="var(--green)" />
          <StatCard value="3,4" unit="% PIB" label="Saldo / PIB" color="var(--blue)" />
        </StatGrid>

        <HorizBar items={[
          { label: 'China', value: 158, max: 160, color: 'var(--amber)', suffix: ' US$bi' },
          { label: 'EUA', value: 94, max: 160, color: 'var(--blue)', suffix: ' US$bi' },
          { label: 'Uniao Europeia', value: 55, max: 160, color: 'var(--green)', suffix: ' US$bi' },
          { label: 'Argentina', value: 31, max: 160, color: 'var(--green)', suffix: ' US$bi' },
          { label: 'Russia', value: 12, max: 160, color: 'var(--gold)', suffix: ' US$bi' },
          { label: 'Japao + Coreia', value: 10, max: 160, color: 'var(--muted)', suffix: ' US$bi' },
        ]} />

        <DataTable
          headers={['Parceiro', 'Exportacoes', 'Importacoes', 'Saldo']}
          rows={[
            ['China', 'US$92bi', 'US$66bi', '+US$26bi'],
            ['EUA', 'US$42bi', 'US$52bi', '-US$10bi'],
            ['Uniao Europeia', 'US$28bi', 'US$27bi', '+US$1bi'],
            ['Argentina (Mercosul)', 'US$16bi', 'US$15bi', '+US$1bi'],
            ['Russia', 'US$4bi', 'US$8bi', '-US$4bi'],
            ['Japao + Coreia', 'US$7bi', 'US$5bi', '+US$2bi'],
            ['Outros', 'US$112bi', 'US$80bi', '+US$32bi'],
          ]}
        />

        <InfoGrid columns={3}>
          <InfoCard title="+US$30,7bi" subtitle="Superavit com China (2024)" color="var(--green)">
            <p>Brasil exporta soja, minerio, petroleo. Importa eletronicos, veiculos eletricos, paineis solares, equipamentos.</p>
          </InfoCard>
          <InfoCard title="-US$283mi" subtitle="Deficit com EUA (2024)" color="var(--red)">
            <p>Menor deficit desde 2008. EUA exportam maquinas, avioes, combustiveis, equipamentos de defesa.</p>
          </InfoCard>
          <InfoCard title="+US$74bi" subtitle="Superavit total em bens (2024)" color="var(--blue)">
            <p>= 3,4% do PIB brasileiro. Recorde historico.</p>
          </InfoCard>
        </InfoGrid>

        <Callout type="info">
          Principais exportacoes: Soja, Minerio de ferro, Petroleo bruto, Carne bovina, Celulose, Cafe, Acucar. Principais importacoes: Maquinas industriais, Eletronicos/chips, Fertilizantes, Veiculos, Avioes/pecas, Diesel/derivados.
        </Callout>

        <Callout type="warn">
          26% das exportacoes vao para a China. Dependencia de fertilizantes: 85% importado, 30% da Russia/Belarus.
        </Callout>
      </Section>

      {/* ══════════════════════════════════════════════
          06 — RECURSOS ESTRATEGICOS
      ══════════════════════════════════════════════ */}
      <Section num="06" title="Vulnerabilidades e Trunfos — Recursos Estrategicos">
        <Prose>
          <p>
            A diplomacia brasileira e moldada tanto pelo que o pais produz quanto pelo que precisa importar. Abaixo, os cinco recursos estrategicos mais relevantes — com sua cadeia de dependencia e implicacao geopolitica.
          </p>
        </Prose>

        <InfoGrid columns={2}>
          <InfoCard title="Fertilizantes (NPK)" subtitle="Vulnerabilidade critica" color="var(--red)">
            <p>O Brasil importa <strong>85% dos fertilizantes</strong> que usa. Com solos naturalmente acidos e a expansao do agro, nao ha como cultivar soja, milho e algodao sem insumos externos. Russia e Belarus suprem ~30% do total, incluindo 44% do potassio. Com a guerra na Ucrania, isso virou questao de seguranca nacional.</p>
            <p>Fornecedores: Russia 21% N, Belarus 23% K, Canada 30% K, Marrocos fosfato.</p>
            <p>Meta do Plano Nacional de Fertilizantes: reduzir importacao para 45% ate 2050. Lento, mas em andamento.</p>
          </InfoCard>

          <InfoCard title="Semicondutores & IA" subtitle="Dependencia tecnologica total" color="var(--amber)">
            <p>O Brasil nao fabrica chips — nem avancados nem basicos. Toda a cadeia de eletronicos, automoveis, IA e defesa depende de importacao. O acesso a semicondutores avancados (TSMC/Taiwan) e a modelos de IA de ponta (OpenAI, Google, Anthropic — todos EUA) cria uma dependencia tecnologica estrutural dos americanos.</p>
            <p>Fornecedores: Taiwan TSMC (chips), Nvidia/CUDA (EUA), OpenAI/Anthropic (EUA), Huawei 5G (China - alternativa).</p>
            <p>Um conflito em Taiwan interromperia as cadeias produtivas brasileiras inteiras em questao de meses.</p>
          </InfoCard>

          <InfoCard title="Energia" subtitle="Posicao forte" color="var(--green)">
            <p>O Brasil e quase autossuficiente em energia. A Petrobras opera no pre-sal com custos entre US$ 6–8/barril. A matriz eletrica e ~60% hidreletrica. Etanol de cana e biocombustiveis sao vantagens estruturais unicas. Acordo de gas natural com a Argentina (fracking patagonico) substitui o gas boliviano em declinio.</p>
            <p>Trunfos: Petroleo pre-sal, Etanol/biocombustiveis, Matriz hidrica 60%, Solar crescente.</p>
          </InfoCard>

          <InfoCard title="Minerais Estrategicos" subtitle="Trunfo subexplorado" color="var(--gold)">
            <p>O Brasil detem <strong>92% das reservas mundiais de niobio</strong> — mineral critico para acos especiais, supercondutores e baterias. Tem tambem litio (top-6 mundial), grafite, terras raras e a maior reserva de minerio de ferro do planeta (Vale). Esse e o cartao na manga para a corrida por baterias e semicondutores, mas ainda nao foi monetizado diplomaticamente.</p>
            <p>Destaques: Niobio 92% mundial, Litio top-6, Minerio ferro top-1, Terras raras (potencial).</p>
          </InfoCard>
        </InfoGrid>

        <InfoCard title="Capacidade Ambiental — A Amazonia como Trunfo e Onus" subtitle="Ativo diplomatico dual" color="var(--green)">
          <p>A Amazonia e simultaneamente o maior ativo diplomatico brasileiro (sequestro de carbono, biodiversidade, creditos de carbono) e seu maior passivo historico (desmatamento, queimadas, percepcao internacional negativa durante Bolsonaro). A retomada da protecao ambiental foi um dos primeiros movimentos de Lula 3 — nao so por conviccao, mas porque sem ela o acordo Mercosul–UE nao avanca e o acesso a mercados europeus se compromete. O COP30 em Belem (novembro 2025) consolidou o Brasil como protagonista da transicao climatica global.</p>
          <p>Destaques: COP30 anfitriao, REDD+ / creditos carbono, Biomas: Amazonia, Cerrado, Pantanal, Acordo Mercosul-UE desbloqueado.</p>
        </InfoCard>

        <StatGrid>
          <StatCard value="92" unit="%" label="Niobio mundial" color="var(--gold)" />
          <StatCard value="Top 6" label="Reservas de litio" color="var(--blue)" />
          <StatCard value="#1" label="Minerio de ferro" color="var(--coral)" />
          <StatCard value="60" unit="%" label="Matriz hidreletrica" color="var(--teal)" />
        </StatGrid>

        <DataTable
          headers={['Insumo', 'Importado', 'Origem Principal', 'Risco']}
          rows={[
            ['Fertilizantes (total)', '85%', 'Russia/Belarus/Canada', 'Alto'],
            ['Potassio', '44%', 'Russia', 'Critico'],
            ['Nitrogenio', '21%', 'Russia', 'Medio'],
            ['Semicondutores', '~100%', 'China/Taiwan/Coreia', 'Critico'],
            ['Farmacos (IFA)', '~90%', 'China/India', 'Alto'],
          ]}
        />

        <Callout type="danger">
          A dependencia de fertilizantes russos e semicondutores asiaticos representa vulnerabilidade estrategica. Qualquer conflito na cadeia pode paralisar a agricultura e a industria.
        </Callout>
      </Section>

      {/* ══════════════════════════════════════════════
          07 — POSICOES ESTRATEGICAS
      ══════════════════════════════════════════════ */}
      <Section num="07" title="O Que o Brasil Busca Diplomaticamente">
        <Prose>
          <p>Cinco objetivos estruturais guiam a politica externa brasileira, quase independentemente do governo:</p>
        </Prose>

        <FactorCard
          title="E1 — Assento Permanente no CSNU"
          score={70}
          scoreLabel="Probabilidade"
          color="var(--blue)"
          tags={['8a maior economia', '150 anos sem conflito armado', 'Resistencia dos P5']}
        >
          <Prose>
            <p>Maior objetivo nao conquistado da diplomacia brasileira. O pais tem os argumentos: 8a maior economia, nenhum conflito armado por 150 anos, representatividade do hemisferio sul. O obstaculo e estrutural: os P5 resistem a ampliacao e paises vizinhos (Italia, Argentina, Mexico, Paquistao) se opoem as candidaturas de seus proprios grupos regionais.</p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="E2 — Lideranca Climatica Global"
          score={85}
          scoreLabel="Avanco"
          color="var(--green)"
          tags={['Maior floresta tropical', 'Biocombustiveis', 'COP30 Belem']}
        >
          <Prose>
            <p>O Brasil tem credenciais unicas: maior floresta tropical, lider em biocombustiveis, matriz eletrica limpa. A presenca do COP30 em Belem (novembro 2025) foi o ponto culminante dessa estrategia — colocar a Amazonia literalmente no centro do debate climatico global. Usado tambem como alavanca para o acordo Mercosul–UE.</p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="E3 — Reforma da Governanca Financeira Global"
          score={60}
          scoreLabel="Avanco"
          color="var(--gold)"
          tags={['Reforma FMI/Banco Mundial', 'NDB/BRICS', 'Tributacao global super-ricos']}
        >
          <Prose>
            <p>Pressao consistente por reforma do FMI, Banco Mundial e sistema de votacao multilateral. O Novo Banco de Desenvolvimento (NDB/BRICS) e o veiculo concreto para isso. No G20 2024, o Brasil lancou a proposta de tributacao global de super-ricos — agenda diretamente conectada ao FMI e ao G20.</p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="E4 — Protagonismo no Sul Global"
          score={88}
          scoreLabel="Avanco"
          color="var(--green)"
          tags={['G20 2024', 'BRICS 2025', 'COP30 2025 — trifecta inedito']}
        >
          <Prose>
            <p>O Brasil quer ser a voz articulada do Sul Global — nao como porta-voz da China ou da Russia, mas como alternativa credivel que fala dos temas de desenvolvimento, fome e desigualdade. G20 2024 + BRICS 2025 + COP30 foi o trifecta diplomatico que consolidou essa posicao. Inedito na historia do pais.</p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="E5 — Autonomia Estrategica em Tecnologia e Defesa"
          score={45}
          scoreLabel="Avanco"
          color="var(--amber)"
          tags={['PROSUB (Franca)', 'Embraer', 'Avibras/Norinco', 'Dilema chips vs autonomia']}
        >
          <Prose>
            <p>Submarinos nucleares (PROSUB com a Franca), satelites, Embraer, industria de defesa (Avibras). Em 2025, o governo abriu espaco para que a empresa chinesa Norinco adquira 49% da Avibras — um movimento que gerou alarme nos EUA, que designaram o Brasil como "aliado nao-NATO" em 2020. A tensao entre autonomia tecnologica e dependencia da cadeia ocidental de chips e o dilema de longo prazo.</p>
          </Prose>
        </FactorCard>

        <DataTable
          headers={['Evento', 'Ano', 'Papel do Brasil']}
          rows={[
            ['Presidencia G20', '2024', 'Alianca Global contra Fome — 82 paises'],
            ['Presidencia BRICS', '2025', 'Expansao + moeda de referencia'],
            ['COP30 Belem', '2025', 'Sede — Amazonia como agenda central'],
            ['Acordo Mercosul-UE', '2025–26', 'Negociacao final pendente'],
          ]}
        />
      </Section>

      {/* ══════════════════════════════════════════════
          08 — IDEOLOGIA NAS PRESIDENCIAS
      ══════════════════════════════════════════════ */}
      <Section num="08" title="O Impacto da Politica Interna na Diplomacia">
        <Prose>
          <p>
            A linha do tempo abaixo documenta como cada presidencia tratou a politica externa — com ganhos e perdas mensuraveis. O padrao e claro: a ideologia prejudica quando substitui o interesse nacional; auxilia quando o amplifica.
          </p>
        </Prose>

        <DataTable
          headers={['Periodo', 'Presidente', 'Score Diplomacia', 'Avaliacao']}
          rows={[
            ['2003–2010', 'Lula 1–2', '72 -> 90', 'Pico historico'],
            ['2011–2016', 'Dilma/Temer', '85 -> 58', 'Declinio'],
            ['2017–2022', 'Bolsonaro', '58 -> 28', 'Minimo historico'],
            ['2023–2026', 'Lula 3', '38 -> 80', 'Recuperacao'],
          ]}
        />

        <Timeline events={[
          { year: '2003', label: 'Lula assume — abertura para Sul Global', color: 'var(--green)' },
          { year: '2009', label: 'BRICS fundado — Obama: "The Man"', color: 'var(--green)' },
          { year: '2011', label: 'Dilma assume — inercia diplomatica', color: 'var(--blue)' },
          { year: '2013', label: 'Escandalo NSA — Dilma cancela visita a Washington', color: 'var(--amber)' },
          { year: '2016', label: 'Impeachment — Temer: transicao pragmatica', color: 'var(--muted)' },
          { year: '2019', label: 'Bolsonaro: alinhamento total com Trump', color: 'var(--red)' },
          { year: '2021', label: 'Biden eleito — alinhamento vira pó', color: 'var(--red)' },
          { year: '2023', label: 'Lula 3 — recuperacao diplomatica', color: 'var(--green)' },
          { year: '2024', label: 'Presidencia G20 + 37 acordos com China', color: 'var(--green)' },
          { year: '2025', label: 'BRICS + COP30 Belem — trifecta', color: 'var(--green)' },
        ]} />

        {/* Lula 1+2 */}
        <InfoCard title="Lula da Silva — 1o + 2o mandatos" subtitle="2003–2010 | Esquerda / Sul Global" color="var(--green)">
          <p><strong>Protagonismo: 92/100</strong></p>
          <p>A era de ouro — com asterisco. O Brasil entrou definitivamente no mapa geopolitico global. Obama referiu-se a Lula como "The Man" em 2009 — raro elogio de um presidente americano a um lider estrangeiro. O BRICS foi concebido e impulsionado durante esse periodo; as relacoes com Africa e Asia praticamente dobraram.</p>
          <p><strong>Ganhos:</strong> BRICS fundado e impulsionado; Relacoes Africa/Asia dobradas; Mais embaixadas da historia; Candidatura ao G4 (CSNU); "Obama: The Man" (2009); Soft power do PT internacional.</p>
          <p><strong>Riscos:</strong> Overstretch: ambicao {'>'} capacidade; Dividas com organismos da ONU; Relacoes com Ira/Cuba controversas; Foco ideologico as vezes {'>'} interesse.</p>
        </InfoCard>

        {/* Dilma */}
        <InfoCard title="Dilma Rousseff" subtitle="2011–2016 | Centro-esquerda" color="var(--amber)">
          <p><strong>Protagonismo: 65/100</strong></p>
          <p>Governo de inercia diplomatica. A agenda domestica e a crise economica consumiram toda energia. O Itamaraty operou no piloto automatico. O momento mais marcante foi em 2013: ao descobrir que a NSA americana espionava suas comunicacoes, Dilma cancelou a visita de Estado a Washington e discursou na ONU contra a vigilancia digital — gesto simbolico relevante, sem desdobramento estrategico real.</p>
          <p><strong>Ganhos:</strong> Aprofundamento em Africa; Postura firme contra espionagem NSA; Continuidade do BRICS.</p>
          <p><strong>Perdas:</strong> Crise economica reduz influencia; Inicio da retracao de embaixadas; Nenhuma iniciativa diplomatica propria.</p>
        </InfoCard>

        {/* Temer */}
        <InfoCard title="Michel Temer" subtitle="2016–2018 | Centro / Pragmatico" color="var(--muted)">
          <p><strong>Protagonismo: 45/100</strong></p>
          <p>Governo de transicao com legitimidade fragilizada pelo impeachment. Reconexao pragmatica com o Ocidente — especialmente com os EUA de Obama e depois Trump. Pouco espaco diplomatico real dado o contexto politico interno. O chanceler Jose Serra tentou reposicionar o Brasil como mais alinhado com o Ocidente, mas sem mandato popular ou continuidade.</p>
          <p><strong>Ganhos:</strong> Reconexao com EUA e Europa; Estabilidade macroeconomica.</p>
          <p><strong>Perdas:</strong> Legitimidade reduzida internacionalmente; Sem iniciativas diplomaticas relevantes.</p>
        </InfoCard>

        {/* Bolsonaro */}
        <InfoCard title="Jair Bolsonaro" subtitle="2019–2022 | Direita ultranacionalista" color="var(--red)">
          <p><strong>Protagonismo: 28/100</strong></p>
          <p>O caso de estudo mais claro de danos ideologicos a diplomacia. O chanceler Ernesto Araujo era um ideologo, nao um diplomata — suas posicoes contra o "globalismo marxista" tornaram-se fardos concretos. O alinhamento total com Trump 1 virou po com a eleicao de Biden em 2021. A antagonizacao gratuita da China — o maior parceiro comercial do pais — custou capital politico sem nenhum ganho. A postura de negacao climatica destruiu a imagem ambiental do Brasil, que perdurou por anos.</p>
          <p><strong>Ganhos:</strong> Acordo de defesa com EUA; Designacao "aliado nao-NATO"; Relacao com Israel estreitada.</p>
          <p><strong>Danos reais:</strong> 7 embaixadas fechadas, 1 aberta; Isolamento na agenda climatica; Relacoes com China tensionadas; Acordo Mercosul–UE travado; Imagem ambiental devastada; Dividas com ONU e organismos; Araujo: chanceler ideologo, nao diplomata.</p>
        </InfoCard>

        {/* Lula 3 */}
        <InfoCard title="Lula da Silva — 3o mandato" subtitle="2023–presente | Sul Global / ANA" color="var(--blue)">
          <p><strong>Protagonismo: 78/100</strong></p>
          <p>Recuperacao significativa — mas mais sobria que os mandatos anteriores. O trifecta G20 (2024) + BRICS (2025) + COP30 (2025) e inedito na historia diplomatica brasileira. Lula visitou mais de 20 paises no primeiro ano. Os 37 acordos assinados com a China durante a visita de Xi em novembro de 2024 (sem entrar no Belt and Road) ilustram a habilidade de maximizar vantagem economica sem comprometimento politico formal.</p>
          <p>O ponto fraco e a credibilidade: as posicoes sobre Ucrania — incluindo comentarios que "a Ucrania tem sua cota de culpa" — e a inacao sobre a Venezuela corroem a imagem de mediador neutro que o Brasil tenta projetar. A relacao com Trump 2.0 (2025–) e a maior incognita: interesses divergentes em tarifas, Amazonia e China criam friccao constante, enquanto o conflito Musk–STF adicionou uma camada de tensao bilateral inedita.</p>
          <p><strong>Ganhos:</strong> G20 2024: agenda fome/tributacao; BRICS 2025 (4a presidencia); COP30 Belem — lideranca climatica; 37 acordos com China (nov. 2024); Reabriu embaixadas na Africa; Alianca Global contra a Fome.</p>
          <p><strong>Riscos:</strong> Ambiguidade Ucrania: credibilidade corroida; Venezuela: inacao custosa; Tensao com Trump 2.0 e Musk; Risco de overstretch novamente.</p>
        </InfoCard>
      </Section>

      {/* ══════════════════════════════════════════════
          09 — CONCLUSAO
      ══════════════════════════════════════════════ */}
      <Section num="09" title="O Dilema Estrutural e os Caminhos a Frente">
        <Prose>
          <p>
            O Brasil nao pode se dar ao luxo de escolher um campo. Sua posicao estrutural no mundo obriga o nao-alinhamento.
          </p>
          <p>
            A China absorve 26% das exportacoes brasileiras. Os EUA sao a fonte insubstituivel de tecnologia avancada — chips, IA, aviacao, defesa. A Russia supre 30% dos fertilizantes que alimentam o agronegocio. Escolher um desses parceiros contra os outros seria economicamente suicida. O "nao-alinhamento ativo" nao e fraqueza diplomatica — e a unica posicao sustentavel dado o portfolio de dependencias do pais.
          </p>
        </Prose>

        <QuoteBlock
          quote="Num mundo que se bifurca em blocos, sentar no muro esta se tornando cada vez mais caro — mas saltar para qualquer lado continua sendo mais caro ainda."
          author="Dilema estrutural"
          role="Analise geopolitica"
        />

        <Prose>
          <p><strong>Tres Riscos de Longo Prazo</strong></p>
        </Prose>

        <ScenarioGrid scenarios={[
          {
            title: 'Risco 1: Comoditizacao Permanente',
            color: 'var(--red)',
            items: [
              'O Brasil exporta soja e importa iPhone.',
              'Sem industrializacao e capacidade tecnologica, a dependencia de commodities aprofunda a vulnerabilidade geopolitica.',
            ],
          },
          {
            title: 'Risco 2: Dependencia Tecnologica',
            color: 'var(--amber)',
            items: [
              'Sem semicondutores proprios, o Brasil e consumidor — nao produtor — da revolucao da IA.',
              'Qualquer conflito em Taiwan ou bloqueio americano cortaria acessos criticos.',
            ],
          },
          {
            title: 'Risco 3: Bifurcacao Geopolitica',
            color: 'var(--amber)',
            items: [
              'Se o mundo se dividir em blocos tecnologicos e economicos incompativeis (EUA vs. China), o Brasil tera que escolher.',
              'E qualquer escolha tera custo enorme.',
            ],
          },
        ]} />

        <Callout type="info">
          Oportunidade estrategica: O Brasil detem 92% do niobio mundial, reservas relevantes de litio, grafite e terras raras — minerais criticos para a transicao energetica e para semicondutores de proxima geracao. Nenhum governo organizou ainda uma estrategia diplomatica explicita de trocar acesso a minerais por acesso a tecnologia — o tipo de barganha que o Chile fez com o litio ou que a Australia faz com as terras raras. Quem fizer isso primeiro vai redefinir o posicionamento do Brasil no tabuleiro tecnologico global.
        </Callout>

        <InfoGrid columns={2}>
          <InfoCard title="Sintese: o que funciona" color="var(--green)">
            <p>Nao-alinhamento ativo como posicao sustentavel</p>
            <p>Multilateralismo como amplificador de voz</p>
            <p>Lideranca climatica como soft power concreto</p>
            <p>Diversificacao de parceiros reduz dependencia</p>
            <p>Itamaraty como instituicao de qualidade tecnica</p>
          </InfoCard>
          <InfoCard title="Sintese: o que precisa mudar" color="var(--red)">
            <p>Reduzir dependencia de fertilizantes russos</p>
            <p>Estrategia de minerais criticos como barganha</p>
            <p>Coerencia entre discurso de mediador e acoes</p>
            <p>Industrializacao + capacidade tecnologica propria</p>
            <p>Separar ideologia presidencial do Itamaraty</p>
          </InfoCard>
        </InfoGrid>

        <Callout type="info">
          Fontes: Chatham House, CEBRI, BCB, Ministerio das Relacoes Exteriores, Congress.gov, Farmdoc, UNU-CRIS, Trading Economics.
        </Callout>
      </Section>
    </ReportShell>
  );
}
