import ReportShell, {
  Section, StatGrid, StatCard, DataTable, Callout,
  BarChart, HorizBar, Prose, FactorCard, InfoGrid, InfoCard,
  ScenarioGrid, SensitivityMatrix, Timeline
} from './ReportShell';

export default function ReportBalanca({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Balanca de Pagamentos do Brasil — 2024"
      eyebrow="INAI Digital · Banco Central do Brasil, MDIC, UNCTAD"
      color="var(--purple)"
      onClose={onClose}
    >

      {/* ================================================================
          1. VISAO MACRO — TRANSACOES CORRENTES 2024
          ================================================================ */}
      <Section num="01" title="Visao Macro — Transacoes Correntes 2024">
        <Prose>
          <p>O Brasil fechou 2024 com deficit em transacoes correntes de US$ 56bi (2,55% do PIB). A balanca comercial positiva de US$ 66,2bi foi mais que anulada pelo deficit em servicos e renda primaria.</p>
        </Prose>

        <StatGrid>
          <StatCard value="339,8" unit=" bi" label="Exportacoes (bens) — -1,2% vs 2023" color="var(--green)" />
          <StatCard value="273,6" unit=" bi" label="Importacoes (bens) — +8,8% vs 2023" color="var(--red)" />
          <StatCard value="+66,2" unit=" bi" label="Superavit comercial — -28,2% vs 2023" color="var(--green)" />
          <StatCard value="-49,7" unit=" bi" label="Deficit servicos — +24,7% vs 2023" color="var(--red)" />
          <StatCard value="-75,4" unit=" bi" label="Deficit renda primaria — -5,1% vs 2023" color="var(--red)" />
          <StatCard value="+2,9" unit=" bi" label="Renda secundaria (remessas e doacoes)" color="var(--green)" />
          <StatCard value="-56" unit=" bi" label="Transacoes correntes — 2,55% do PIB" color="var(--red)" />
          <StatCard value="71,1" unit=" bi" label="IED recebido 2024 — 3,24% do PIB" color="var(--green)" />
        </StatGrid>

        <BarChart items={[
          { label: 'Bal. comercial', value: 66.2, max: 80, color: 'var(--green)' },
          { label: 'Renda secundaria', value: 2.9, max: 80, color: 'var(--green)' },
        ]} />
        <BarChart items={[
          { label: 'Servicos', value: 49.7, max: 80, color: 'var(--red)' },
          { label: 'Renda primaria', value: 75.4, max: 80, color: 'var(--red)' },
          { label: 'Trans. correntes (deficit)', value: 56, max: 80, color: '#8B1F1F' },
        ]} />

        <Callout type="info">
          <strong>O Brasil tem dois "furos no balde":</strong> a balanca comercial produz superavit recorde de US$ 66bi, mas dois vazamentos cronicos consomem tudo — o deficit de servicos (US$ 49,7bi) e o deficit de renda primaria (US$ 75,4bi), este principalmente gerado pela remessa de lucros das ~19 mil empresas estrangeiras instaladas aqui e pelos juros da divida externa.
        </Callout>
      </Section>

      {/* ================================================================
          2. EXPORTACOES — TOP PRODUTOS E CONCENTRACAO
          ================================================================ */}
      <Section num="02" title="Exportacoes — Top Produtos e Concentracao">
        <Prose>
          <p>US$ 339,8bi exportados em 2024 (MDIC: US$ 337bi). O Brasil exporta predominantemente commodities brutas — 75% sao bens intermediarios sem valor agregado. Dependencia critica da China.</p>
        </Prose>

        <BarChart items={[
          { label: 'Petroleo bruto', value: 44.8, max: 50, color: 'var(--blue)' },
          { label: 'Complexo soja', value: 42.9, max: 50, color: 'var(--green)' },
          { label: 'Carnes', value: 21, max: 50, color: 'var(--green)' },
          { label: 'Minerio de ferro', value: 18.6, max: 50, color: 'var(--blue)' },
          { label: 'Celulose', value: 12, max: 50, color: 'var(--teal)' },
          { label: 'Cafe', value: 10, max: 50, color: 'var(--teal)' },
          { label: 'Acucar', value: 9.5, max: 50, color: 'var(--teal)' },
          { label: 'Aeronaves (Embraer)', value: 7, max: 50, color: 'var(--purple)' },
          { label: 'Aco semiacabado', value: 5, max: 50, color: 'var(--text-muted)' },
          { label: 'Algodao bruto', value: 4, max: 50, color: 'var(--text-muted)' },
        ]} />

        <DataTable
          headers={['Produto para China', '% das Exportacoes']}
          rows={[
            ['Soja para China', '18%'],
            ['Petroleo para China', '16%'],
            ['Minerio para China', '12%'],
            ['Outros destinos e produtos', '54%'],
          ]}
        />

        <Callout type="warn">
          <strong>Problema estrutural:</strong> 75% das exportacoes sao bens intermediarios. O Brasil vende soja em grao, nao proteina processada. Vende minerio de ferro, nao aco especial. Vende celulose, nao papel. O valor agregado vai para o comprador.
        </Callout>

        <Callout type="info">
          77% das exportacoes para a China sao apenas 3 produtos: soja, petroleo bruto e minerio de ferro. Esta concentracao e uma vulnerabilidade estrategica critica.
        </Callout>

        <FactorCard title="Embraer — a excecao tecnologica" color="var(--green)" tags={['Recorde historico', 'Backlog US$21bi']}>
          <p>Unica exportacao de alta tecnologia de escala global. US$ 7bi em receita em 2024 (recorde). Backlog de US$ 21,1bi. Prova que o Brasil pode exportar sofisticacao — quando ha politica industrial consistente por decadas.</p>
        </FactorCard>
      </Section>

      {/* ================================================================
          3. IMPORTACOES — ESTRATEGICAS VS SUPERFLUAS
          ================================================================ */}
      <Section num="03" title="Importacoes — Estrategicas vs Superfluas">
        <Prose>
          <p>US$ 273,6bi importados em 2024. Nem toda importacao e problema — algumas sao estrategicas. A analise e sobre o que vale reduzir e o que seria suicidio cortar.</p>
        </Prose>

        <BarChart items={[
          { label: 'Combustiveis', value: 30, max: 35, color: 'var(--red)' },
          { label: 'Eletronicos', value: 30, max: 35, color: 'var(--red)' },
          { label: 'Veiculos/pecas', value: 20, max: 35, color: 'var(--red)' },
          { label: 'Fertilizantes', value: 16, max: 35, color: 'var(--red)' },
          { label: 'Quimicos organicos', value: 11, max: 35, color: 'var(--red)' },
          { label: 'Medicamentos', value: 8, max: 35, color: 'var(--text-muted)' },
          { label: 'Aeronaves', value: 8, max: 35, color: 'var(--text-muted)' },
          { label: 'Plasticos/resinas', value: 8, max: 35, color: 'var(--red)' },
          { label: 'Farmoquimicos', value: 5, max: 35, color: 'var(--text-muted)' },
          { label: 'Trigo/graos', value: 3, max: 35, color: 'var(--text-muted)' },
        ]} />

        <DataTable
          headers={['Categoria', 'Valor (US$ bi)', 'Estrategia']}
          rows={[
            ['Fertilizantes', '-16', 'Reduzir com bioinsumos'],
            ['Combustiveis', '-30', 'Etanol, H2 verde'],
            ['Eletronicos', '-30', 'Sem alternativa curto prazo'],
            ['Veiculos e pecas', '-20', 'Eletrificacao domestica'],
            ['Quimicos organicos', '-11', 'Parcial substituivel'],
            ['Medicamentos', '-8', 'Estrategico manter'],
            ['Aeronaves grandes', '-8', 'Troca razoavel c/ Embraer'],
            ['Plasticos/resinas', '-8', 'Petroquimica nacional'],
            ['Farmoquimicos', '-5', 'Produzir mais no Brasil'],
            ['Trigo e graos', '-3', 'Pesquisa agricola'],
          ]}
        />

        <Callout type="ok">
          <strong>Importacoes que NAO devemos cortar:</strong> semicondutores e eletronicos (sem escala domestica), aeronaves de longo curso (troca justa com Embraer), medicamentos inovadores (saude publica). Cortar seria regressao.
        </Callout>

        <Callout type="danger">
          <strong>Importacoes superfluas — reduzir:</strong> viagens internacionais de brasileiros (US$ 14,8bi brutos), veiculos de luxo (US$ 2-3bi), apostas online (US$ 5bi — RESOLVIDO em 2025 com a regulacao).
        </Callout>
      </Section>

      {/* ================================================================
          4. CONTA DE SERVICOS — DEFICIT DE US$ 49,7bi
          ================================================================ */}
      <Section num="04" title="Conta de Servicos — Deficit de US$ 49,7bi">
        <Prose>
          <p>A conta de servicos cresceu 24,7% em 2024 e e o componente mais dinamico — e mais preocupante — do balanco. Tem duas naturezas: fisica/estrutural (fretes) e digital/crescente (propriedade intelectual, nuvem).</p>
        </Prose>

        <StatGrid>
          <StatCard value="-15,1" unit=" bi" label="Transportes (liq.) — Fretes maritimos dominam" color="var(--red)" />
          <StatCard value="-8,7" unit=" bi" label="Prop. intelectual — +58% vs 2023" color="var(--red)" />
          <StatCard value="-7,2" unit=" bi" label="TI / nuvem — AWS, Azure, SAP, Salesforce" color="var(--red)" />
          <StatCard value="-7,5" unit=" bi" label="Viagens (liq.) — BR gasta US$14,8bi fora" color="var(--red)" />
          <StatCard value="-6,8" unit=" bi" label="Serv. culturais/bets — Bets US$5bi (resolvido 2025)" color="var(--red)" />
          <StatCard value="-5,2" unit=" bi" label="Aluguel equipamentos — Leasing aeronaves" color="var(--red)" />
          <StatCard value="+7,3" unit=" bi" label="Turismo receptivo — Recorde em 15 anos" color="var(--green)" />
          <StatCard value="+0,4" unit=" bi" label="Prop. int. exportada — Razao 22:1 contra o Brasil" color="var(--green)" />
        </StatGrid>

        <HorizBar items={[
          { label: 'Big Tech (nuvem+software)', value: 7, max: 10, color: 'var(--blue)', suffix: ' bi*' },
          { label: 'Armadoras maritimas', value: 9, max: 10, color: 'var(--red)', suffix: ' bi' },
          { label: 'Cias aereas internacionais', value: 5, max: 10, color: 'var(--red)', suffix: ' bi' },
          { label: 'Streamings (Netflix/Spotify)', value: 2.5, max: 10, color: 'var(--purple)', suffix: ' bi' },
          { label: 'Consultorias globais', value: 3, max: 10, color: 'var(--text-muted)', suffix: ' bi' },
          { label: 'Bets/apostas (ate 2024)', value: 5, max: 10, color: 'var(--amber)', suffix: ' bi' },
        ]} />

        <Callout type="warn">
          <strong>A razao 22:1 em propriedade intelectual:</strong> O Brasil paga US$ 8,7bi ao exterior em royalties e licencas (software, streaming, patentes industriais) e recebe apenas US$ 0,4bi. Uma das maiores assimetrias de conhecimento do mundo. E cresceu 58% em um ano.
        </Callout>

        <Callout type="ok">
          <strong>O caso das bets — modelo a replicar:</strong> Uma lei (jan/2025) obrigou casas de apostas a residir no Brasil, convertendo US$ 5bi de deficit externo em atividade economica interna. O principio: acesso aos 200 milhoes de consumidores brasileiros exige presenca local.
        </Callout>

        {/* Sub-categorias detalhadas de servicos */}
        <InfoGrid columns={3}>
          <InfoCard title="Transportes: -US$15,1bi" subtitle="Fisico/estrutural" color="var(--red)">
            <p>Fretes maritimos ~US$9bi (Maersk, MSC, CMA CGM, Hapag-Lloyd, Cosco). Fretes aereos ~US$4bi. Passagens liquidas ~US$2bi. O Brasil nao tem frota comercial maritima de escala — cada navio que leva soja e estrangeiro.</p>
            <p><strong>Tags:</strong> Fisico/estrutural, Cabotagem como alternativa</p>
          </InfoCard>
          <InfoCard title="TI e nuvem: -US$7,2bi" subtitle="Digital/crescente" color="var(--blue)">
            <p>Cloud publica (AWS, Azure, GCP) ~US$3,5bi; SaaS empresarial (Salesforce, SAP, Oracle) ~US$2bi; telecom/CDN ~US$1,7bi. Inelastico: empresa que migra para Azure raramente volta. Cresce conforme o Brasil se digitaliza.</p>
            <p><strong>Tags:</strong> Digital/crescente, Data centers soberanos</p>
          </InfoCard>
          <InfoCard title="Turismo: -US$7,5bi liq." subtitle="Turismo receptivo em alta" color="var(--amber)">
            <p>Brasileiros gastaram US$14,8bi no exterior. Turistas estrangeiros deixaram US$7,3bi no Brasil (recorde de 15 anos, 6,65mi turistas). Problema: perfil sul-americano gasta 3-4x menos que europeu/americano.</p>
            <p><strong>Tags:</strong> Meta US$15bi em 5 anos, COP30 catalisador</p>
          </InfoCard>
        </InfoGrid>

        <DataTable
          headers={['Servico', 'Receita (entra)', 'Despesa (sai)', 'Saldo']}
          rows={[
            ['Transportes', 'US$4,7bi', '-US$19,8bi', '-US$15,1bi'],
            ['Prop. intelectual', 'US$0,4bi', '-US$9,1bi', '-US$8,7bi'],
            ['TI / Nuvem', 'US$0,3bi', '-US$7,5bi', '-US$7,2bi'],
            ['Viagens', 'US$7,3bi', '-US$14,8bi', '-US$7,5bi'],
            ['Serv. culturais/bets', 'US$0,5bi', '-US$7,3bi', '-US$6,8bi'],
            ['Aluguel equipamentos', 'US$0,3bi', '-US$5,5bi', '-US$5,2bi'],
            ['Seguros', 'US$0,2bi', '-US$3,2bi', '-US$3,0bi'],
            ['Serv. financeiros', 'US$1,5bi', '-US$3,6bi', '-US$2,1bi'],
            ['Serv. governamentais', 'US$0,2bi', '-US$1,4bi', '-US$1,2bi'],
          ]}
        />
      </Section>

      {/* ================================================================
          5. RENDA PRIMARIA — O GRANDE DRENO DE US$ 75,4bi
          ================================================================ */}
      <Section num="05" title="Renda Primaria — O Grande Dreno de US$ 75,4bi">
        <Prose>
          <p>O maior componente deficitario das transacoes correntes. Composto de lucros/dividendos remetidos (60%) e juros da divida externa (40%). E estruturalmente negativo porque ha muito mais capital estrangeiro no Brasil do que capital brasileiro no exterior.</p>
        </Prose>

        <StatGrid>
          <StatCard value="-75,4" unit=" bi" label="Deficit total 2024 — -5,1% vs 2023" color="var(--red)" />
          <StatCard value="-45,6" unit=" bi" label="Lucros/dividendos liq. — 60% do deficit" color="var(--red)" />
          <StatCard value="-40,8" unit=" bi" label="Juros brutos pagos — +2,6% vs 2023" color="var(--red)" />
          <StatCard value="+10,5" unit=" bi" label="Juros recebidos — Reservas + ativos externos" color="var(--green)" />
          <StatCard value="-30,3" unit=" bi" label="Juros liquidos — 40% do deficit" color="var(--red)" />
          <StatCard value="~21" unit=" bi" label="Lucros reinvestidos — Ficam no Brasil" color="var(--amber)" />
          <StatCard value="~31" unit=" bi" label="Lucros remetidos cash — Saem efetivamente" color="var(--red)" />
          <StatCard value="-81,3" unit=" bi" label="Deficit 2025 (prelim.) — Mesmo patamar" color="var(--red)" />
        </StatGrid>

        <DataTable
          headers={['Componente', 'US$ bi']}
          rows={[
            ['Lucros/dividendos pagos (bruto)', '-52,0'],
            ['Juros externos pagos (bruto)', '-40,8'],
            ['Juros recebidos', '+10,5'],
            ['Lucros recebidos', '+6,4'],
            ['Deficit liquido total', '-75,4'],
          ]}
          highlight={4}
        />

        <Timeline events={[
          { year: '2019', label: 'Deficit renda primaria: -US$45bi', color: 'var(--amber)' },
          { year: '2020', label: 'Deficit renda primaria: -US$38bi (pandemia)', color: 'var(--green)' },
          { year: '2021', label: 'Deficit renda primaria: -US$47bi', color: 'var(--amber)' },
          { year: '2022', label: 'Deficit renda primaria: -US$56,5bi', color: 'var(--red)' },
          { year: '2023', label: 'Deficit renda primaria: -US$79,5bi (pico)', color: 'var(--red)' },
          { year: '2024', label: 'Deficit renda primaria: -US$75,4bi', color: 'var(--red)' },
          { year: '2025*', label: 'Deficit renda primaria: -US$81,3bi (preliminar)', color: 'var(--red)' },
        ]} />

        <Callout type="danger">
          <strong>Por que esse deficit e permanente e crescente?</strong> O Brasil tem um estoque de capital estrangeiro de US$ 1,14 trilhao (46,6% do PIB, recorde historico). Esse capital remete lucros. O Brasil tem relativamente pouco capital investido no exterior para compensar. Enquanto o estoque crescer mais do que a base de ativos externos brasileiros, o deficit se aprofunda — independentemente de cambio ou politica monetaria.
        </Callout>
      </Section>

      {/* ================================================================
          6. ESTOQUE DE CAPITAL — POSICAO DE INVESTIMENTO INTERNACIONAL
          ================================================================ */}
      <Section num="06" title="Estoque de Capital — Posicao de Investimento Internacional">
        <Prose>
          <p>A fotografia do patrimonio liquido externo do Brasil: o que o mundo tem no Brasil vs o que o Brasil tem no mundo. A posicao negativa de -US$ 972bi e a fonte estrutural do deficit de renda primaria.</p>
        </Prose>

        <StatGrid>
          <StatCard value="1,141" unit=" tri" label="IED no Brasil (total) — 46,6% do PIB, recorde" color="var(--red)" />
          <StatCard value="884,8" unit=" bi" label="IED — capital social — ~19 mil empresas" color="var(--red)" />
          <StatCard value="256,4" unit=" bi" label="IED — intercompanhia — Emprestimos intragrupo" color="var(--red)" />
          <StatCard value="654,5" unit=" bi" label="Capital BR no exterior — CBE 2024 (29.068 decl.)" color="var(--green)" />
          <StatCard value="503,9" unit=" bi" label="IDE produtivo BR — Setor produtivo no exterior" color="var(--green)" />
          <StatCard value="329,7" unit=" bi" label="Reservas internacionais — Dez/2024" color="var(--green)" />
          <StatCard value="-972" unit=" bi" label="Posicao liquida (PII) — Set/2024" color="var(--red)" />
          <StatCard value="~400" unit=" bi" label="Passivos em carteira — Acoes + titulos externos" color="var(--red)" />
        </StatGrid>

        {/* Composicao dos ativos externos */}
        <BarChart items={[
          { label: 'Invest. direto no exterior (IDE)', value: 503.9, max: 510, color: 'var(--green)' },
          { label: 'Reservas internacionais', value: 329.7, max: 510, color: 'var(--blue)' },
          { label: 'Outros invest./creditos', value: 86.5, max: 510, color: 'var(--text-muted)' },
          { label: 'Carteira (acoes/titulos)', value: 62.8, max: 510, color: 'var(--purple)' },
        ]} />

        {/* IED por setor */}
        <DataTable
          headers={['Setor', '% do IED']}
          rows={[
            ['Servicos financeiros', '22%'],
            ['Comercio', '16%'],
            ['Industria', '15%'],
            ['Eletricidade', '13%'],
            ['Petroleo', '12%'],
            ['Telecom/TI', '6%'],
            ['Outros', '16%'],
          ]}
        />

        {/* Paises de origem do IED */}
        <HorizBar items={[
          { label: 'Estados Unidos', value: 245, max: 350, color: 'var(--blue)', suffix: ' bi (28%)' },
          { label: 'Franca', value: 88, max: 350, color: 'var(--purple)', suffix: ' bi (~10%)' },
          { label: 'Paises Baixos', value: 80, max: 350, color: 'var(--purple)', suffix: ' bi (~9%)' },
          { label: 'Espanha', value: 71, max: 350, color: 'var(--purple)', suffix: ' bi (~8%)' },
          { label: 'Uruguai *', value: 53, max: 350, color: 'var(--text-muted)', suffix: ' bi (~6%)' },
          { label: 'Outros', value: 345, max: 350, color: 'var(--text-muted)', suffix: ' bi (39%)' },
        ]} />

        <Callout type="info">
          * Uruguai como triangulacao: capitais brasileiros e de terceiros usando holdings uruguaias.
        </Callout>

        {/* Classificacao por qualidade do capital */}
        <InfoGrid columns={2}>
          <InfoCard title="Produtivo real" subtitle="Bem-vindo" color="var(--green)">
            <p>Industria, energia, petroleo, agro. Traz tecnologia e emprego.</p>
          </InfoCard>
          <InfoCard title="Financeiro/servicos" subtitle="Ambiguo" color="var(--amber)">
            <p>Bancos, varejo, telecom. Gera emprego mas concentra lucros. 22% do IED (~US$250bi).</p>
          </InfoCard>
          <InfoCard title="Carteira especulativa" subtitle="Volatil" color="var(--red)">
            <p>Acoes na Bolsa e titulos do Tesouro por nao-residentes. Entra e sai rapido. ~US$400bi.</p>
          </InfoCard>
          <InfoCard title="Reservas internacionais" subtitle="Seguro caro" color="var(--amber)">
            <p>US$329,7bi em T-bills. Necessario mas caro: custo de carregamento via Selic e estimado em R$80-120bi/ano.</p>
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ================================================================
          7. YIELDS E ASSIMETRIA ESTRUTURAL
          ================================================================ */}
      <Section num="07" title="Yields e Assimetria Estrutural">
        <Prose>
          <p>O Brasil paga ~5,0% ao ano sobre seus passivos externos e recebe apenas ~2,6% sobre seus ativos externos. O spread negativo de -2,4pp e cronico e estrutural — nao conjuntural.</p>
        </Prose>

        <StatGrid>
          <StatCard value="2,6%" unit="" label="Yield recebido (ativos BR no exterior)" color="var(--green)" />
          <StatCard value="5,0%" unit="" label="Yield pago (passivos estrangeiros no Brasil)" color="var(--red)" />
          <StatCard value="-2,4" unit=" pp" label="Spread negativo — custo estrutural" color="var(--red)" />
        </StatGrid>

        <BarChart items={[
          { label: 'Yield recebido (ativos BR)', value: 2.6, max: 6, color: 'var(--green)' },
          { label: 'Yield pago (passivos no BR)', value: 5.0, max: 6, color: 'var(--red)' },
          { label: 'Spread negativo', value: 2.4, max: 6, color: '#E87A52' },
        ]} />

        <InfoGrid columns={1}>
          <InfoCard title="As tres razoes do spread negativo" color="var(--red)">
            <p><strong>1. Risco-pais.</strong> O Brasil tem historico de instabilidade fiscal. Investidores exigem premio para aportar aqui — as empresas estrangeiras operam com margens maiores, gerando yields maiores sobre o capital.</p>
            <p><strong>2. Composicao dos passivos.</strong> O Brasil deve muito em titulos de renda fixa de curto prazo a taxas de mercado (juros americanos + spread Brasil). Seus ativos sao reservas em T-bills (historicamente 1-2% a.a.) e holdings com retorno baixo.</p>
            <p><strong>3. Paradoxo das reservas.</strong> US$329,7bi em reservas rendem ~4-5% em dolar, mas sao financiadas via Selic (10-14% a.a. em reais). O "seguro cambial" tem custo fiscal imenso — estimado em R$80-120bi/ano para o contribuinte.</p>
          </InfoCard>
        </InfoGrid>

        <Callout type="danger">
          A assimetria de yields custa ao Brasil aproximadamente US$75bi/ano. E um "imposto invisivel" sobre a economia brasileira que resulta da posicao devedora liquida de US$972bi combinada com o spread de 2,4pp.
        </Callout>
      </Section>

      {/* ================================================================
          8. SENSIBILIDADE CAMBIAL — IMPACTO DE +10%
          ================================================================ */}
      <Section num="08" title="Sensibilidade Cambial — Impacto de uma Desvalorizacao de +10%">
        <Prose>
          <p>O cambio afeta diferentes componentes do balanco de formas e magnitudes distintas. Uma desvalorizacao real de 10% tem efeitos assimetricos — bons para exportadores, ruins para importadores de insumos e devedores externos.</p>
        </Prose>

        <DataTable
          headers={['Categoria', 'Efeito', 'Magnitude']}
          rows={[
            ['Exportacoes agricolas', '+8-12% competitividade', 'Alta positiva'],
            ['Petroleo (exportacao)', '+10% receita em R$', 'Alta positiva'],
            ['Embraer (aeronaves)', '+15-20% competitividade', 'Muito alta positiva'],
            ['Turismo receptivo', 'Estrangeiro gasta mais', 'Alta positiva'],
            ['Viagens de brasileiros', 'Queda na saida', 'Reduz deficit'],
            ['Fertilizantes (import.)', '+10% custo agricola', 'Alta negativa'],
            ['Eletronicos (import.)', '+7% custo industrial', 'Moderada negativa'],
            ['Prop. intelectual', 'Custo sobe, demanda mantem', 'Baixa/moderada'],
            ['Lucros/dividendos remett.', 'Custo sobe em R$', 'Alta negativa'],
            ['Juros divida externa', '+10% em R$', 'Alta negativa'],
          ]}
        />

        <SensitivityMatrix
          rowLabel="Componente"
          colLabel="Efeito desvalorizacao +10%"
          rows={['Export. agricolas', 'Embraer', 'Turismo recept.', 'Fertilizantes', 'Eletronicos', 'Lucros/divid.', 'Juros ext.']}
          cols={['Competitividade', 'Custo R$', 'Saldo liq.']}
          cells={[
            [{ value: '+8-12%', color: 'var(--green-l)' }, { value: 'N/A', color: 'var(--bg)' }, { value: 'Positivo', color: 'var(--green-l)' }],
            [{ value: '+15-20%', color: 'var(--green-l)' }, { value: 'N/A', color: 'var(--bg)' }, { value: 'Muito pos.', color: 'var(--green-l)' }],
            [{ value: '+Turistas', color: 'var(--green-l)' }, { value: 'N/A', color: 'var(--bg)' }, { value: 'Positivo', color: 'var(--green-l)' }],
            [{ value: 'N/A', color: 'var(--bg)' }, { value: '+10%', color: 'var(--red-l)' }, { value: 'Negativo', color: 'var(--red-l)' }],
            [{ value: 'N/A', color: 'var(--bg)' }, { value: '+7%', color: 'var(--red-l)' }, { value: 'Negativo', color: 'var(--red-l)' }],
            [{ value: 'N/A', color: 'var(--bg)' }, { value: '+10%', color: 'var(--red-l)' }, { value: 'Negativo', color: 'var(--red-l)' }],
            [{ value: 'N/A', color: 'var(--bg)' }, { value: '+10%', color: 'var(--red-l)' }, { value: 'Negativo', color: 'var(--red-l)' }],
          ]}
        />

        <Callout type="info">
          <strong>O cambio nao resolve tudo.</strong> Uma desvalorizacao melhora competitividade das exportacoes e reduz viagens de brasileiros, mas aumenta o custo dos juros e lucros remetidos em reais — e o custo de insumos importados (fertilizantes, eletronicos) que sustentam a propria producao que exportamos.
        </Callout>
      </Section>

      {/* ================================================================
          9. IA E OPORTUNIDADES DE INTERNALIZACAO
          ================================================================ */}
      <Section num="09" title="IA e Queda de Custo — O Que Pode Ser Internalizado">
        <Prose>
          <p>A IA generativa e a queda de custo de software estao criando janelas de oportunidade para o Brasil internalizar atividades que hoje paga ao exterior. O criterio: onde a IA baixa o custo de entrada e onde o Brasil tem vantagem estrutural.</p>
        </Prose>

        <BarChart items={[
          { label: 'Data centers soberanos', value: 4, max: 5, color: 'var(--blue)' },
          { label: 'Software fiscal/regulatorio', value: 3.5, max: 5, color: 'var(--purple)' },
          { label: 'Agtech / reducao fertilizantes', value: 3, max: 5, color: 'var(--green)' },
          { label: 'Logistica / cabotagem IA', value: 2.5, max: 5, color: 'var(--green)' },
          { label: 'Entretenimento / IP local', value: 2, max: 5, color: 'var(--amber)' },
          { label: 'Farmaceutica / biotech', value: 1.5, max: 5, color: 'var(--red)' },
        ]} />

        <InfoGrid columns={2}>
          <InfoCard title="Software fiscal/regulatorio — US$2-5bi" subtitle="Vantagem estrutural" color="var(--purple)">
            <p>A complexidade tributaria brasileira (SPED, eSocial, NF-e, CNAB 240, eSocial) e incompreensivel para ERPs estrangeiros. LLMs treinados em legislacao brasileira viram barreira de entrada natural. Exportavel para toda a America Latina.</p>
            <p><strong>Tags:</strong> Vantagem estrutural, Exportavel</p>
          </InfoCard>
          <InfoCard title="Agtech de precisao — US$2-4bi em economia" subtitle="Embrapa ja lidera" color="var(--green)">
            <p>IA para dosagem de fertilizantes pode reduzir uso em 20-30%, economizando US$3-5bi em importacoes. Inoculantes biologicos (expertise da Embrapa) substituem fertilizantes nitrogenados importados.</p>
            <p><strong>Tags:</strong> Embrapa ja lidera, Impacto na conta de importacoes</p>
          </InfoCard>
          <InfoCard title="Data centers soberanos — US$3-5bi potencial" subtitle="Energia barata" color="var(--blue)">
            <p>Energia renovavel barata (~90% da matriz) + LGPD + latencia local. O Brasil pode passar de pagador de US$7bi em TI para exportador de infraestrutura de dados para a America Latina. A vantagem competitiva e a energia verde.</p>
            <p><strong>Tags:</strong> Energia barata, LGPD como catalisador</p>
          </InfoCard>
          <InfoCard title="Propriedade intelectual — reduzir o 22:1" subtitle="Urgente" color="var(--red)">
            <p>Deficit de US$8,7bi (+58% em 2024). IA generativa barateia producao de conteudo local (audiovisual, musica, games). A Globo, Embrapa e algumas franquias (Havaianas) ja geram receita de PI — mas o potencial e 10-20x maior com IA.</p>
            <p><strong>Tags:</strong> Urgente, IA como alavanca</p>
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ================================================================
          10. ESTRATEGIAS PARA O BRASIL ENRIQUECER
          ================================================================ */}
      <Section num="10" title="Estrategias para o Brasil Enriquecer">
        <Prose>
          <p>Sintese estrategica: dois eixos de acao — agregar valor as commodities exportadas e desenvolver soberania digital nos setores onde a IA baixou o custo de entrada.</p>
        </Prose>

        {/* Eixo 1: Subir na cadeia de valor */}
        <FactorCard title="Eixo 1: Subir na cadeia de valor das commodities" color="var(--green)">
          <DataTable
            headers={['Hoje (bruto)', 'Deve virar', 'Multiplicador de valor']}
            rows={[
              ['Soja em grao', 'Proteina animal processada / farinha funcional', '3-5x'],
              ['Minerio de ferro', 'Aco especial, pecas automotivas', '4-8x'],
              ['Celulose', 'Papel tecnico, embalagem ativa, bioeconomia', '2-4x'],
              ['Etanol', 'SAF (combustivel de aviacao sustentavel)', '3-6x'],
              ['Biodiversidade Amazonica', 'Farmacos / bioativos / cosmeticos', '10-100x'],
            ]}
          />
        </FactorCard>

        {/* Eixo 2: Soberania digital */}
        <FactorCard title="Eixo 2: Soberania digital — regulacao inteligente" color="var(--blue)">
          <DataTable
            headers={['Setor', 'Mecanismo', 'Potencial']}
            rows={[
              ['Bets/apostas', 'Obrigar residencia no Brasil', 'US$5bi (feito 2025)'],
              ['Streaming', 'Cotas de conteudo local + residencia', 'US$1-2bi'],
              ['Nuvem publica', 'Exigir processamento de dados BR em solo nacional', 'US$2-4bi'],
              ['Fretes maritimos', 'Cabotagem + regras de conteudo local', 'US$2-4bi'],
              ['Turismo', 'Tax Free + voos diretos + posicionamento luxo/natureza', '+US$7bi em 5 anos'],
            ]}
          />
        </FactorCard>

        <Callout type="ok">
          <strong>Conclusao estrategica:</strong> O Brasil tem "colonizacao digital" — paga US$15,9bi combinados em informacao e propriedade intelectual sem equivalente de retorno. A solucao nao e isolar-se, e (1) regulacao inteligente onde a complexidade brasileira e barreira de entrada, (2) turismo como via rapida de receita (o turismo ja supera exportacoes de aeronaves, algodao e cobre), (3) energia barata como isca para data centers soberanos, e (4) agregar valor ao que ja somos lideres mundiais.
        </Callout>

        <ScenarioGrid scenarios={[
          {
            title: 'Vantagens competitivas reais',
            color: 'var(--green)',
            items: [
              'Terra aravel: 3a maior do mundo',
              'Agua: 12% da agua doce global',
              'Energia renovavel: ~90% da matriz eletrica',
              'Clima tropical: 3 safras/ano possiveis',
              'Embraer: aviacao regional mundial',
              'Embrapa: agropesquisa tropical',
              'Etanol de cana: o mais eficiente do mundo',
              'Biodiversidade: maior do planeta',
            ],
          },
          {
            title: 'Vulnerabilidades estruturais',
            color: 'var(--red)',
            items: [
              '77% das exportacoes para China = 3 produtos',
              'PII negativa de -US$972bi (devedor liquido)',
              'Prop. intelectual: razao 22:1 contra o Brasil',
              'Sem frota maritima comercial propria',
              'Fertilizantes: 85% importados',
              'Juros internos mais altos do mundo (Selic)',
              'Custo das reservas: R$80-120bi/ano estimado',
              '0% de semicondutores produzidos no Brasil',
            ],
          },
          {
            title: 'Metas realistas para 2030',
            color: 'var(--blue)',
            items: [
              'Turismo receptivo: US$7,3bi -> US$15bi',
              'Exportacoes totais: US$340bi -> US$450bi',
              'Deficit servicos: -US$49bi -> -US$35bi',
              'Exportacoes de software: US$1bi -> US$5bi',
              'Uso de fertilizantes: -20% com agtech',
              'Prop. intelectual ratio: 22:1 -> 12:1',
              'Data centers: de pagador a exportador regional',
              'SAF: nova commodity de exportacao',
            ],
          },
        ]} />

        <Callout type="info">
          <strong>Fontes:</strong> Banco Central do Brasil (Nota de Estatisticas do Setor Externo jan/2025, Censo de Capitais Estrangeiros 2024, CBE 2024) · MDIC/Secex (balanca comercial 2024) · CEIC Data (Posicao de Investimento Internacional) · Agencia Brasil · InfoMoney · IPEA Carta de Conjuntura.
        </Callout>
      </Section>

    </ReportShell>
  );
}
