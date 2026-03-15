import ReportShell, {
  Section, StatGrid, StatCard, DataTable, Callout, BarChart, HorizBar,
  Prose, QuoteBlock, FactorCard, Timeline, InfoGrid, InfoCard, ScenarioGrid
} from './ReportShell';

export default function ReportEducacao({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Sistema Educacional Brasileiro: Diagnóstico Completo"
      eyebrow="Análise Aprofundada · Março 2026"
      color="var(--blue)"
      onClose={onClose}
    >
      {/* ═══════════════════════════════════════════════════
          SEÇÃO 01 — GASTOS PÚBLICOS POR NÍVEL
          ═══════════════════════════════════════════════════ */}
      <Section num="01" title="Gastos Públicos por Nível">
        <StatGrid>
          <StatCard value="R$540" unit="bi" label="Investimento total em educação (2023) — 4,93% do PIB, acima da média OCDE (4,66%)" color="var(--amber)" />
          <StatCard value="R$213,6" unit="bi" label="Orçamento MEC 2024 (retorno pré-pandemia) — 42% destinado à Educação Básica" color="var(--blue)" />
          <StatCard value="US$3.668" label="Gasto/aluno/ano Ensino Fundamental (Brasil) — vs US$11.914 na OCDE (−69%)" color="var(--red)" />
          <StatCard value="−2,5" unit="%/ano" label="Queda do gasto público entre 2015–2021 — OCDE cresceu +2,1%/ano no mesmo período" color="var(--green)" />
        </StatGrid>

        <DataTable
          headers={['Nível', 'Brasil (USD)', 'OCDE (USD)', 'Gap']}
          rows={[
            ['Fundamental I', '3.668', '11.914', '−69%'],
            ['Fundamental II', '3.745', '13.260', '−72%'],
            ['Ensino Médio', '4.058', '12.713', '−68%'],
            ['Superior', '13.569', '17.138', '−21%'],
          ]}
          highlight={3}
        />

        <Callout type="info">
          <strong>Paradoxo do superior:</strong> o Brasil gasta US$13.569/aluno no ensino superior — próximo da OCDE (US$17.138). Na base, gasta menos de 1/3. O resultado: subsídio maciço a quem já passou por escola privada de qualidade.
        </Callout>

        <HorizBar items={[
          { label: 'Inf. + Fund. I', value: 1.99, max: 5, color: 'var(--blue)', suffix: '% PIB' },
          { label: 'Fund. II + Médio', value: 1.66, max: 5, color: 'var(--green)', suffix: '% PIB' },
          { label: 'Superior', value: 0.72, max: 5, color: 'var(--amber)', suffix: '% PIB' },
          { label: 'Téc./EJA/Outros', value: 0.56, max: 5, color: '#9b59b6', suffix: '% PIB' },
        ]} />

        <BarChart items={[
          { label: 'México', value: 2700, max: 15000, color: '#888' },
          { label: 'Brasil', value: 3668, max: 15000, color: 'var(--red)' },
          { label: 'Argentina', value: 3679, max: 15000, color: '#888' },
          { label: 'Chile', value: 6700, max: 15000, color: '#888' },
          { label: 'OCDE média', value: 11914, max: 15000, color: 'var(--blue)' },
          { label: 'Alemanha', value: 13350, max: 15000, color: 'var(--blue)' },
          { label: 'EUA', value: 14200, max: 15000, color: 'var(--blue)' },
        ]} />

        <Callout type="danger">
          <strong>Para igualar a média da OCDE na base, o Brasil precisaria investir 14% do PIB em educação</strong> — hoje está em 4,93%. A EC 95/2016 levou à queda de 2,5%/ano entre 2015–2021. A meta do novo PNE (2026–2036) é chegar a 7% em 2031 e 10% em 2036.
        </Callout>
      </Section>

      {/* ═══════════════════════════════════════════════════
          SEÇÃO 02 — MERCADO PRIVADO DE EDUCAÇÃO
          ═══════════════════════════════════════════════════ */}
      <Section num="02" title="Mercado Privado de Educação">
        <StatGrid>
          <StatCard value="R$110" unit="bi" label="Mercado privado de educação básica (2024) — mensalidades + sistemas de ensino" color="var(--amber)" />
          <StatCard value="9" unit=" mi" label="Alunos em escolas privadas = 20% do total — 80% ainda na rede pública" color="var(--blue)" />
          <StatCard value="75" unit="%" label="Das matrículas no ensino superior são em IES privadas — 7,3 mi alunos" color="var(--green)" />
          <StatCard value="51" unit="%" label="Das matrículas privadas via EAD (2021) — crescimento acelerado" color="var(--red)" />
        </StatGrid>

        <DataTable
          headers={['Faixa', 'Mensalidade mínima (R$/mês)', 'Mensalidade máxima (R$/mês)']}
          rows={[
            ['Popular', '800', '1.800'],
            ['Premium', '2.500', '5.000'],
            ['Elite / Bilíngue', '5.000', '12.000'],
            ['Avenues SP', '7.000', '10.000+'],
          ]}
        />

        <Callout type="info">
          <strong>Avenues SP:</strong> R$7.000+/mês. Bilíngues elite: R$5–12k. Populares: R$800–1.800/mês. O gap qualitativo se reflete diretamente no PISA: escola pública ~65–75°, privada 11–30° mundial.
        </Callout>

        <BarChart items={[
          { label: 'Cogna', value: 4200, max: 4500, color: 'var(--red)' },
          { label: 'YDUQS', value: 2800, max: 4500, color: 'var(--red)' },
          { label: 'Vitru/Unicesumar', value: 1400, max: 4500, color: 'var(--blue)' },
          { label: 'SEB/Maple Bear', value: 850, max: 4500, color: 'var(--blue)' },
          { label: 'Inspira', value: 800, max: 4500, color: 'var(--green)' },
        ]} />

        <Callout type="warn">
          <strong>Consolidação acelerada:</strong> Inspired pagou R$2 bi pela Eleva (2022); L Catterton negociou ~R$1 bi na Inspira (51k alunos, 84 escolas). Tendência de fundos de PE no segmento "premium popular".
        </Callout>

        <DataTable
          headers={['Nível', 'Pública (%)', 'Privada (%)']}
          rows={[
            ['Infantil (creche)', '67', '33'],
            ['Pré-escola', '72', '28'],
            ['Fundamental', '82', '18'],
            ['Médio', '87', '13'],
            ['Superior', '25', '75'],
          ]}
          highlight={4}
        />
      </Section>

      {/* ═══════════════════════════════════════════════════
          SEÇÃO 03 — PISA 2022
          ═══════════════════════════════════════════════════ */}
      <Section num="03" title="PISA 2022 — Desempenho Brasileiro">
        <StatGrid>
          <StatCard value="379" label="Pontos em Matemática (Brasil geral) — ~65° / 81 países" color="var(--red)" />
          <StatCard value="410" label="Pontos em Leitura (Brasil geral) — ~53° / 81 países" color="var(--amber)" />
          <StatCard value="471" label="Matemática — escolas privadas BR — 30° mundial (acima da média OCDE)" color="var(--blue)" />
          <StatCard value="500" label="Leitura — escolas privadas BR — 11° mundial!" color="var(--green)" />
        </StatGrid>

        <DataTable
          headers={['Área', 'Rede Pública BR', 'Rede Privada BR', 'Média OCDE']}
          rows={[
            ['Matemática', '345', '471 (30° global)', '472'],
            ['Leitura', '370', '500 (11° global)', '476'],
            ['Ciências', '368', '493', '485'],
          ]}
        />

        <HorizBar items={[
          { label: 'Singapura', value: 575, max: 600, color: 'var(--green)' },
          { label: 'Japão', value: 536, max: 600, color: 'var(--blue)' },
          { label: 'Coreia', value: 527, max: 600, color: 'var(--blue)' },
          { label: 'Canadá', value: 497, max: 600, color: 'var(--blue)' },
          { label: 'Alemanha', value: 475, max: 600, color: 'var(--blue)' },
          { label: 'EUA', value: 465, max: 600, color: 'var(--blue)' },
          { label: 'Chile', value: 412, max: 600, color: 'var(--amber)' },
          { label: 'México', value: 395, max: 600, color: '#888' },
          { label: 'Brasil', value: 379, max: 600, color: 'var(--red)' },
          { label: 'Argentina', value: 378, max: 600, color: '#888' },
        ]} />

        <InfoGrid columns={3}>
          <InfoCard title="Matemática" color="var(--red)">
            <p><strong>55%</strong> dos alunos abaixo do nível básico. Singapura lidera com <strong>575 pts</strong> — diferença de ~196 pts, equivalente a <strong>13 anos de aprendizado.</strong></p>
          </InfoCard>
          <InfoCard title="Leitura" color="var(--amber)">
            <p><strong>50%</strong> abaixo do mínimo para cidadania. Mas a rede privada atingiu <strong>500 pts</strong> em leitura — <strong>11° lugar mundial</strong>, acima de Alemanha e Suécia.</p>
          </InfoCard>
          <InfoCard title="Tempo integral" color="var(--blue)">
            <p>Escolas de tempo integral têm <strong>impacto positivo mensurável</strong> no PISA. O programa federal de expansão é uma das políticas mais promissoras para reduzir o gap entre redes.</p>
          </InfoCard>
        </InfoGrid>

        <Callout type="danger">
          <strong>O Brasil tem dois sistemas educacionais em paralelo.</strong> A rede privada performa entre as melhores do mundo em leitura (11°). A rede pública está entre as piores (~65–75°). A média geral esconde uma desigualdade estrutural extrema — e é esse gap que explica por que o acesso à escola privada é o principal diferenciador de mobilidade social no país.
        </Callout>
      </Section>

      {/* ═══════════════════════════════════════════════════
          SEÇÃO 04 — SALÁRIOS POR PROFISSÃO & ESCASSEZ
          ═══════════════════════════════════════════════════ */}
      <Section num="04" title="Salários por Profissão & Escassez">
        <HorizBar items={[
          { label: 'Diretor/CEO', value: 34910, max: 36000, color: 'var(--blue)' },
          { label: 'Médico espec.', value: 18475, max: 36000, color: 'var(--red)' },
          { label: 'Matem./Atuário', value: 16568, max: 36000, color: 'var(--red)' },
          { label: 'Médico geral', value: 11022, max: 36000, color: 'var(--amber)' },
          { label: 'Eng. mecânico', value: 9881, max: 36000, color: 'var(--green)' },
          { label: 'C. de dados', value: 8200, max: 36000, color: 'var(--green)' },
          { label: 'Dev Sr.', value: 7250, max: 36000, color: 'var(--green)' },
          { label: 'Enfermeiro', value: 3800, max: 36000, color: '#888' },
          { label: 'Professor', value: 3200, max: 36000, color: '#888' },
          { label: 'Prof. pré-escola', value: 2285, max: 36000, color: '#888' },
        ]} />

        <DataTable
          headers={['Profissão', 'Brasil (R$/mês)', 'EUA (R$/mês nominal)', 'Múltiplo']}
          rows={[
            ['Dev Software Sr.', '7.250', '~60.000', '8×'],
            ['Pesquisador (bolsa)', '3.100', '~25.000', '8×'],
            ['Cientista de dados', '8.200', '~50.000', '6×'],
            ['Engenheiro mec.', '9.881', '~37.000', '4×'],
            ['Médico especialista', '18.475', '~50.000', '3×'],
          ]}
        />

        <Callout type="info">
          Gap médio para tech/engenharia: <strong>6–8× nominalmente</strong>. Após ajuste PPP, a vantagem dos EUA ainda é 2–3×, tornando a emigração racional para quem tem perfil exportável.
        </Callout>

        <InfoGrid columns={2}>
          <InfoCard title="Alta demanda no Brasil" color="var(--red)">
            <p>TI / Dev · Engenharia · Medicina especializada · IA / Dados · Cibersegurança · Saúde mental</p>
            <p style={{ marginTop: '0.75rem' }}><strong>Saturação relativa:</strong> Direito · Administração · Pedagogia · Comunicação · Contabilidade</p>
          </InfoCard>
          <InfoCard title="Escassez crítica — mercado global" color="var(--blue)">
            <p>IA / ML Engineers · Cloud Architects · Cibersegurança · Enfermagem · Médicos rurais · Professores STEM · Quantum computing · Biotecnologia</p>
            <p style={{ marginTop: '0.75rem' }}>56% das empresas brasileiras têm dificuldade para encontrar profissionais qualificados (Hays 2024) — 10 pp a mais que no ano anterior.</p>
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ═══════════════════════════════════════════════════
          SEÇÃO 05 — PESQUISA & DESENVOLVIMENTO
          ═══════════════════════════════════════════════════ */}
      <Section num="05" title="Pesquisa & Desenvolvimento">
        <StatGrid>
          <StatCard value="1,19" unit="% PIB" label="P&D Brasil (2023) — Israel: 6,35% | Coreia: 4,96%" color="var(--red)" />
          <StatCard value="13°" label="Posição em produção científica mundial — mas 69° no Global Innovation Index" color="var(--amber)" />
          <StatCard value="~50" unit="%" label="Do P&D financiado pelo setor público — Coreia: 80% privado" color="var(--blue)" />
          <StatCard value="9" unit="%" label="Impacto no PIB por cada 1% de aumento em P&D (FINEP) — retorno de longo prazo" color="var(--green)" />
        </StatGrid>

        <BarChart items={[
          { label: 'Israel', value: 6.35, max: 7, color: 'var(--green)' },
          { label: 'Coreia Sul', value: 4.96, max: 7, color: 'var(--blue)' },
          { label: 'EUA', value: 3.45, max: 7, color: 'var(--green)' },
          { label: 'Japão', value: 3.44, max: 7, color: 'var(--blue)' },
          { label: 'Alemanha', value: 3.11, max: 7, color: 'var(--blue)' },
          { label: 'China', value: 2.58, max: 7, color: 'var(--amber)' },
          { label: 'UE média', value: 2.20, max: 7, color: 'var(--amber)' },
          { label: 'Brasil', value: 1.19, max: 7, color: 'var(--red)' },
          { label: 'Índia', value: 0.65, max: 7, color: '#888' },
        ]} />

        <HorizBar items={[
          { label: 'Produção científica', value: 82, max: 100, color: 'var(--blue)', suffix: ' — 13° mundo' },
          { label: 'Índice de inovação', value: 30, max: 100, color: 'var(--red)', suffix: ' — 69° GII' },
          { label: 'Crescimento patentes', value: 8, max: 100, color: 'var(--red)', suffix: ' — <1%/ano' },
          { label: 'Alta tecnol. exportada', value: 13, max: 100, color: 'var(--amber)', suffix: ' — 13% manuf.' },
        ]} />

        <Callout type="warn">
          <strong>O Brasil produz ciência mas não a converte em inovação.</strong> A pesquisa fica nas universidades sem chegar ao mercado. EUA: US$885 bi em P&D (3,5% PIB). P&D privado no Brasil: apenas 0,5% PIB — meta FAPESP é 1,6%.
        </Callout>

        <Timeline events={[
          {
            year: '2016',
            label: 'EC 95 (teto de gastos) aprovada',
            detail: 'Início do corte sistemático no orçamento de C&T. Bolsas de pós-graduação congeladas.',
            color: 'var(--red)',
          },
          {
            year: '2019–2021',
            label: 'Corte de 60% no orçamento de pesquisa',
            detail: 'Bolsas: mestrado R$1.500 | doutorado R$2.100 — congeladas por 10 anos. Perda real de 66,6% do poder de compra.',
            color: 'var(--red)',
          },
          {
            year: '2022',
            label: 'CAPES com orçamento crítico',
            detail: 'Corte de R$116M. Sem recomposição, chegaria só até setembro de 2023.',
            color: 'var(--red)',
          },
          {
            year: 'Fev/2023',
            label: 'Reajuste de 40% nas bolsas',
            detail: 'Mestrado → R$2.100, doutorado → R$3.100. CNPq e CAPES recebem reforço de 44%.',
            color: 'var(--green)',
          },
          {
            year: '2024',
            label: 'PLOA 2024 previa corte adicional de R$128M na CAPES',
            detail: 'Programa de repatriação anunciado: R$1 bi em 5 anos para 1.000 pesquisadores (bolsa R$10–13k + até R$400k capital/custeio).',
            color: 'var(--amber)',
          },
        ]} />
      </Section>

      {/* ═══════════════════════════════════════════════════
          SEÇÃO 06 — CORRELAÇÕES: EDUCAÇÃO × PIB × IDH × P&D
          ═══════════════════════════════════════════════════ */}
      <Section num="06" title="Correlações: Educação × PIB × IDH × P&D">
        <DataTable
          headers={['País', 'PISA Matemática', 'PIB per capita (USD)', 'Perfil']}
          rows={[
            ['Singapura', '575', 'US$83k', 'Altíssimo desempenho'],
            ['Japão', '536', 'US$42k', 'Alto desempenho'],
            ['Coreia do Sul', '527', 'US$55k', 'Alto desempenho'],
            ['Finlândia', '490', 'US$49k', 'Alto desempenho'],
            ['EUA', '465', 'US$63k', 'Médio desempenho'],
            ['Chile', '412', 'US$16k', 'Médio'],
            ['México', '395', 'US$11k', 'Baixo'],
            ['Brasil', '379', 'US$10,5k', 'Baixo'],
          ]}
          highlight={7}
        />

        <InfoGrid columns={3}>
          <InfoCard title="Singapura" color="var(--blue)">
            <p>PISA Matemática: <strong>575 pts</strong> | PIB per capita: <strong>US$83k</strong>. Aposta massiva na qualidade docente e progressão por mérito desde os anos 1960.</p>
          </InfoCard>
          <InfoCard title="Coreia do Sul" color="var(--green)">
            <p>PISA: <strong>527 pts</strong> | PIB: <strong>US$55k</strong>. De US$900 per capita em 1960 para US$55k hoje. P&D: 4,96% do PIB (80% privado). Estratégia de 60 anos.</p>
          </InfoCard>
          <InfoCard title="Brasil" color="var(--amber)">
            <p>PISA: <strong>379 pts</strong> | PIB: <strong>US$10,5k</strong>. Gasta razoavelmente como % PIB mas com péssima eficiência na base. Subsidia o superior público sem atacar o gap fundamental.</p>
          </InfoCard>
        </InfoGrid>

        <QuoteBlock
          quote="US$1 investido na primeira infância retorna US$7 para a sociedade."
          author="James Heckman"
          role="Nobel de Economia 2000"
        />

        <Callout type="info">
          <strong>Conclusão estrutural:</strong> os países que mais cresceram (Coreia, Singapura, China) apostaram na qualidade da base educacional e em P&D privado — exatamente onde o Brasil tem os maiores gaps. Cada 50 pontos de diferença no PISA equivalem aproximadamente a 1 desvio-padrão de desenvolvimento econômico de longo prazo (OCDE, 2024).
        </Callout>
      </Section>

      {/* ═══════════════════════════════════════════════════
          SEÇÃO 07 — FUGA DE CÉREBROS — DADOS E DESTINOS
          ═══════════════════════════════════════════════════ */}
      <Section num="07" title="Fuga de Cérebros — Dados e Destinos">
        <StatGrid>
          <StatCard value="≥35" unit="k" label="Cientistas brasileiros no exterior (MCTI 2024) — +35,7% sobre 2022, maior volume histórico" color="var(--red)" />
          <StatCard value="4.468" label="Brasileiros em universidades americanas como pesquisadores — 4° maior grupo estrangeiro nos EUA" color="var(--amber)" />
          <StatCard value="28.050" label="Green cards emitidos para brasileiros em 2023 — recorde histórico absoluto" color="var(--blue)" />
          <StatCard value="44" unit="%" label="Dos doutorandos no exterior voltariam com boas oportunidades — cai com contrato estável" color="var(--green)" />
        </StatGrid>

        <HorizBar items={[
          { label: 'China', value: 19556, max: 20000, color: 'var(--amber)' },
          { label: 'Índia', value: 16068, max: 20000, color: '#888' },
          { label: 'Coreia Sul', value: 6646, max: 20000, color: '#888' },
          { label: 'Brasil', value: 4468, max: 20000, color: 'var(--red)' },
          { label: 'Canadá', value: 3900, max: 20000, color: '#888' },
          { label: 'Alemanha', value: 3500, max: 20000, color: '#888' },
        ]} />

        <Callout type="info">
          Brasileiros são o <strong>4° maior grupo</strong> de pesquisadores estrangeiros nos EUA — atrás de China (19.556), Índia (16.068) e Coreia (6.646). Crescimento de 35,7% sobre 2022.
        </Callout>

        <DataTable
          headers={['Destino', 'Participação (%)']}
          rows={[
            ['EUA', '35%'],
            ['Portugal', '20%'],
            ['Alemanha', '15%'],
            ['Reino Unido', '12%'],
            ['Canadá', '8%'],
            ['França', '5%'],
            ['Outros', '5%'],
          ]}
        />

        <Prose>
          <p>Portugal lidera entre os que saem por instabilidade (vistos BR→PT: +200% em 2022). EUA e Alemanha atraem pelos salários e infraestrutura. China cresceu 321% em vistos em 2023.</p>
        </Prose>

        <InfoGrid columns={3}>
          <InfoCard title="Burocracia de reentrada" color="var(--red)">
            <p>Reconhecimento de diplomas lento. Concursos presenciais em datas alternadas exigem viagem ao Brasil. No EUA, o processo é totalmente online e simultâneo em várias universidades.</p>
          </InfoCard>
          <InfoCard title="Descontinuidade política" color="var(--amber)">
            <p>Pesquisas com horizonte de 20–30 anos são interrompidas a cada troca de governo. Linhas de financiamento abertas em uma gestão são canceladas na seguinte.</p>
          </InfoCard>
          <InfoCard title="Contrato estável lá fora" color="var(--blue)">
            <p>O desejo de retornar cai drasticamente entre pesquisadores com contrato estável no exterior. A janela de repatriação efetiva se fecha nos primeiros 3–5 anos após a saída.</p>
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ═══════════════════════════════════════════════════
          SEÇÃO 08 — MOTIVOS DA FUGA DE CÉREBROS
          ═══════════════════════════════════════════════════ */}
      <Section num="08" title="Motivos da Fuga de Cérebros">
        <StatGrid>
          <StatCard value="95" unit="%" label="Dos emigrados não querem voltar nos próximos 3 anos — violência, instabilidade, corrupção" color="var(--red)" />
          <StatCard value="8" unit="×" label="Diferencial salarial tech BR vs EUA (nominal) — R$7.250 vs ~R$60k/mês" color="var(--amber)" />
          <StatCard value="1.493" unit="h" label="Horas/ano em compliance tributário no Brasil — mais que qualquer outro país do mundo" color="var(--blue)" />
          <StatCard value="6°" label="Pior ambiente de negócios do mundo (TMF 2024) — 124°/190 Doing Business (Banco Mundial)" color="var(--red)" />
        </StatGrid>

        <FactorCard title="Diferencial salarial" score={9.5} scoreLabel="/10" color="var(--red)" tags={['Push factor crítico', 'Tech 8×', 'Pesquisa 8×']}>
          <p>O gap salarial em tecnologia e pesquisa é de 6–8× nominalmente. Após ajuste PPP, a vantagem exterior ainda é de 2–3×, tornando a emigração a decisão economicamente racional.</p>
        </FactorCard>

        <FactorCard title="Violência / insegurança" score={8.8} scoreLabel="/10" color="var(--red)" tags={['~47k homicídios/ano', 'Fator social']}>
          <p>O Brasil tem ~47k homicídios/ano. Profissionais qualificados, por terem opção de emigrar, exercem essa opção quando o "entorno social vai ficando intolerável" (Tadao Takahashi, Projeto I-2030).</p>
        </FactorCard>

        <FactorCard title="Corte de verba C&T" score={8.5} scoreLabel="/10" color="var(--amber)" tags={['EC 95/2016', 'Bolsas congeladas 10 anos']}>
          <p>Corte de 60% no orçamento de pesquisa entre 2016–2021. Bolsas de doutorado a R$2.100 congeladas por 10 anos — perda real de 66,6% do poder de compra.</p>
        </FactorCard>

        <FactorCard title="Instabilidade política" score={7.8} scoreLabel="/10" color="var(--amber)" tags={['Descontinuidade', 'Polarização']}>
          <p>Pesquisas com horizonte de 20–30 anos são interrompidas a cada troca de governo. Linhas de financiamento abertas em uma gestão são canceladas na seguinte.</p>
        </FactorCard>

        <FactorCard title="Burocracia empresarial" score={7.4} scoreLabel="/10" color="var(--amber)" tags={['1.493h compliance/ano', 'R$1,5 tri custo extra']}>
          <p>R$1,5 tri extra/ano em custo burocrático vs OCDE (estudo gov. federal, 2019). Para um engenheiro ou cientista de dados com perfil empreendedor, criar uma startup nos EUA ou Portugal é estruturalmente mais racional.</p>
        </FactorCard>

        <FactorCard title="Carreira desestruturada" score={7.2} scoreLabel="/10" color="var(--blue)" tags={['Concursos', 'Falta de mérito']}>
          <p>Sistema acadêmico baseado em concursos presenciais e progressão por tempo, não por mérito. Nos EUA, tenure-track oferece estabilidade com produtividade.</p>
        </FactorCard>

        <FactorCard title="Injustiça social" score={6.5} scoreLabel="/10" color="var(--blue)" tags={['Desigualdade estrutural']}>
          <p>O gap entre escola pública e privada reproduz desigualdade geracional. Profissionais que tiveram acesso à educação de qualidade percebem a estagnação e optam pela emigração.</p>
        </FactorCard>

        <FactorCard title="Custo de vida alto" score={5.8} scoreLabel="/10" color="var(--green)" tags={['Grandes centros', 'Relação custo-salário']}>
          <p>Custo de vida nas grandes capitais elevado em relação aos salários praticados, especialmente para profissionais no início de carreira em pesquisa e tecnologia.</p>
        </FactorCard>

        <DataTable
          headers={['Razão para não voltar', '% dos emigrados']}
          rows={[
            ['Violência', '28%'],
            ['Instabilidade econômica', '22%'],
            ['Salário / padrão de vida', '20%'],
            ['Carreira / estabilidade', '15%'],
            ['Corrupção / governo', '10%'],
            ['Outros', '5%'],
          ]}
          highlight={0}
        />

        <BarChart items={[
          { label: 'Brasil', value: 1493, max: 1500, color: 'var(--red)' },
          { label: 'França', value: 330, max: 1500, color: 'var(--amber)' },
          { label: 'Alemanha', value: 218, max: 1500, color: 'var(--blue)' },
          { label: 'China', value: 207, max: 1500, color: 'var(--blue)' },
          { label: 'EUA', value: 175, max: 1500, color: 'var(--blue)' },
          { label: 'N. Zelândia', value: 140, max: 1500, color: 'var(--green)' },
          { label: 'Singapura', value: 64, max: 1500, color: 'var(--green)' },
        ]} />

        <Callout type="danger">
          <strong>Abrir empresa é fácil, manter é impossível.</strong> Estudo de 2025 (FIU) mostra que o Brasil tem o menor tempo de abertura. Mas 1.493 horas/ano em compliance — mais que qualquer outro país — tornam a operação exaustiva para empreendedores qualificados.
        </Callout>

        <Prose>
          <p>O colapso do financiamento científico a partir de 2016 (EC 95) coincide diretamente com a aceleração da emigração de pesquisadores. O orçamento de C&T caiu de índice 100 (2014) para 40 (2022), enquanto a emigração científica saltou de 100 para 252 no mesmo período. A recuperação parcial em 2023 com reajuste de bolsas e reforço ao CNPq/CAPES ainda não reverteu o movimento estrutural de saída.</p>
        </Prose>

        <QuoteBlock
          quote="A saída é uma combinação de limitações de pesquisa, polarização política e escalada da violência. Nenhum fator isolado — o conjunto tornou a permanência inviável."
          author="Cláudio Ferraz"
          role="FGV → UBC Vancouver"
        />

        <InfoGrid columns={3}>
          <InfoCard title="Violência como fator econômico" color="var(--red)">
            <p>O Brasil tem ~47k homicídios/ano. Profissionais qualificados, por terem opção de emigrar, exercem essa opção quando o "entorno social vai ficando intolerável" (Tadao Takahashi, Projeto I-2030).</p>
          </InfoCard>
          <InfoCard title="Burocracia = fuga de empreendedores" color="var(--amber)">
            <p>R$1,5 tri extra/ano em custo burocrático vs OCDE (estudo gov. federal, 2019). Para um engenheiro ou cientista de dados com perfil empreendedor, criar uma startup nos EUA ou Portugal é estruturalmente mais racional.</p>
          </InfoCard>
          <InfoCard title="A janela de repatriação fecha" color="var(--blue)">
            <p>44% dos doutorandos voltariam com boas oportunidades — mas essa proporção cai drasticamente para quem já tem contrato estável. A janela efetiva dura ~3–5 anos. Depois, a decisão se consolida.</p>
          </InfoCard>
        </InfoGrid>
      </Section>
    </ReportShell>
  );
}
