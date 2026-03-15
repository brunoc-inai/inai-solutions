import ReportShell, {
  Section, StatGrid, StatCard, DataTable, Callout, BarChart, HorizBar,
  Prose, QuoteBlock, ScenarioGrid, FactorCard, Timeline, SensitivityMatrix,
  InfoGrid, InfoCard, CompareRow
} from './ReportShell';

export default function ReportFiscal({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Radiografia Fiscal em Tres Dimensoes"
      eyebrow="Estudos Especiais 2025-2030 — Marco 2026"
      color="var(--gold)"
      onClose={onClose}
    >
      {/* ══════════════════════════════════════════════
          HERO — Headline Stats
      ══════════════════════════════════════════════ */}
      <Section num="00" title="Panorama Fiscal — Brasil 2025-2030">
        <Prose>
          <p>
            Analise aprofundada da previdencia militar, trajetoria da carga tributaria com a reforma e o mapa inflacao x variaveis macroeconomicas para o Brasil.
          </p>
        </Prose>
        <StatGrid>
          <StatCard value="R$ 63" unit="bi" label="Gasto SPSMFA 2024" color="var(--red)" />
          <StatCard value="26,5" unit="%" label="Aliquota IVA-Dual estimada" color="var(--blue)" />
          <StatCard value="4,44" unit="%" label="IPCA realizado 2025" color="var(--gold)" />
          <StatCard value="15" unit="% a.a." label="Selic atual (mar/2026)" color="var(--coral)" />
        </StatGrid>

        <Callout type="info">
          Tres estudos interligados: (1) O custo oculto da previdencia militar e seus privilegios sem equivalente mundial; (2) A transicao tributaria 2027-2033 e o risco de aumento da carga; (3) A matriz de cenarios inflacao x resultado fiscal x juros.
        </Callout>

        <InfoGrid columns={2}>
          <InfoCard title="Canal fiscal → cambio" color="var(--green)">
            <p>Cada 1pp de piora no resultado primario deprecia o cambio em ~2-3%, adicionando +0,3pp ao IPCA via precos importados e energia.</p>
          </InfoCard>
          <InfoCard title="Canal juros → credito" color="var(--blue)">
            <p>A Selic a 15% eleva o custo do credito ao consumidor para ~40-50% a.a. (media total). Desacelera demanda e servicos com defasagem de 6-12 meses.</p>
          </InfoCard>
          <InfoCard title="Ancoragem de expectativas" color="var(--gold)">
            <p>O maior risco e a des-ancoragem. Uma vez que as expectativas de inflacao saem da meta, o BCB precisa de juros 2-3pp maiores por 12-18 meses para re-ancorar.</p>
          </InfoCard>
          <InfoCard title="Reforma tributaria + inflacao" color="var(--red)">
            <p>O IVA em 2027 pode adicionar +0,5 a +1,0pp ao IPCA via repasse de precos, especialmente em servicos (efeito unico, nao persistente).</p>
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ══════════════════════════════════════════════
          ESTUDO 1 — PREVIDENCIA MILITAR
      ══════════════════════════════════════════════ */}
      <Section num="01" title="Previdencia Militar: quem de fato recebe?">
        <Prose>
          <p>Decomposicao do deficit de R$ 53,8 bi entre militares inativos, viuvas e filhas pensionistas — o custo real por cabeca e os privilegios sem equivalente no mundo.</p>
        </Prose>

        <StatGrid>
          <StatCard value="R$ 53,8" unit="bi" label="Deficit total SPSMFA 2024 (0,43% do PIB)" color="var(--red)" />
          <StatCard value="R$ 159" unit="k" label="Deficit per capita/ano (militar = 17x o INSS)" color="var(--gold)" />
          <StatCard value="85" unit="%" label="Orcamento Defesa para pessoal (so 5% para investimentos)" color="var(--blue)" />
        </StatGrid>

        {/* Receitas vs Despesas — Sistema de Pensoes */}
        <InfoGrid columns={3}>
          <InfoCard title="Receita de contribuicoes" subtitle="Jan-Set 2024" color="var(--green)">
            <p><strong>R$ 9,07 bi</strong></p>
          </InfoCard>
          <InfoCard title="Despesa com pensoes" subtitle="Jan-Set 2024" color="var(--red)">
            <p><strong>R$ 19,85 bi</strong></p>
          </InfoCard>
          <InfoCard title="Deficit (pago pelo Tesouro)" subtitle="Jan-Set 2024" color="var(--gold)">
            <p><strong>R$ 10,78 bi</strong> — Deficit anual projetado ~R$ 14,4 bi so de pensoes</p>
          </InfoCard>
        </InfoGrid>

        {/* Universo de Beneficiarios */}
        <Prose>
          <p><strong>Universo de Beneficiarios — SPSMFA:</strong> 349.700 ativos / 170.100 inativos / 239.900 pensionistas / Total: 759.700</p>
        </Prose>

        {/* Decomposicao do Gasto Militar 2024 */}
        <BarChart items={[
          { label: 'Militares inativos (reserva/reforma)', value: 32.7, max: 35, color: 'var(--blue)' },
          { label: 'Viuvas (vitalicia)', value: 19.6, max: 35, color: 'var(--red)' },
          { label: 'Filhas solteiras vitalicias', value: 6.3, max: 35, color: 'var(--red)' },
          { label: 'Filhos (temporaria)', value: 3.9, max: 35, color: 'var(--gold)' },
          { label: 'Outros dependentes', value: 0.5, max: 35, color: 'var(--text-muted)' },
        ]} />

        {/* Tabela detalhada por tipo de beneficiario */}
        <DataTable
          headers={['Categoria', 'Beneficiarios', 'Gasto (R$ bi)', '% do Gasto', 'Custo Medio Mensal', 'Classificacao']}
          rows={[
            ['Militares inativos (reserva/reforma)', '170.100', 'R$ 32,7', '52%', '~R$ 16.040', 'Militar ativo'],
            ['Viuvas (conjuges / ex-conjuges)', '~143.000', 'R$ 19,6', '31%', '~R$ 11.400', 'Dependente vitalicio'],
            ['Filhas solteiras vitalicias (pre-2000)', '~48.000', 'R$ 6,3', '10%', '~R$ 10.938', 'Dependente vitalicio'],
            ['Filhos temporarios (ate 21-24 anos)', '~38.000', 'R$ 3,9', '6%', '~R$ 8.553', 'Dependente temporario'],
            ['Pais, irmaos (2a e 3a ordem — em extincao)', '~10.900', 'R$ 0,5', '1%', '~R$ 3.824', 'Em extincao'],
            ['TOTAL SPSMFA', '759.700', 'R$ 63,0', '100%', 'Deficit: R$ 50,9 bi', '0,43% PIB'],
          ]}
          highlight={5}
        />

        {/* Evolucao do Gasto Total SPSMFA (2008-2024) */}
        <DataTable
          headers={['Ano', '2008', '2010', '2012', '2014', '2016', '2018', '2020', '2021', '2022', '2023', '2024']}
          rows={[
            ['Total SPSMFA (R$ bi)', '20,8', '25,3', '31,7', '39,2', '44,8', '50,1', '54,3', '55,9', '58,2', '60,1', '63,0'],
            ['Militares Inativos (R$ bi)', '11,5', '13,9', '17,5', '21,6', '24,7', '27,6', '29,9', '30,8', '32,1', '32,4', '32,7'],
            ['Pensionistas (R$ bi)', '9,3', '11,4', '14,2', '17,6', '20,1', '22,5', '24,4', '25,1', '26,1', '27,7', '28,3'],
          ]}
        />

        {/* Casos emblematicos e comparacao internacional */}
        <InfoGrid columns={2}>
          <InfoCard title="Casos emblematicos de supersalarios militares" color="var(--red)">
            <p><strong>Sonia Rolins</strong> — filha de marechal + viuva de general: <strong>R$ 79,7k/mes</strong></p>
            <p><strong>Gecy Rangel</strong> — filha de marechal + 2 pensoes de viuva: <strong>R$ 78,8k/mes</strong></p>
            <p>188 viuvas/filhas acima do teto constitucional ({'>'}R$ 46.366/mes)</p>
            <p>Pensoes de "mortos ficticios" — 560 beneficiarios: R$ 25mi/ano</p>
            <p>Quase 20% dos inativos tem mais tempo inativo que ativo — sem idade minima</p>
            <p><em>Pensoes vitalicias de filhas: beneficio criado por legislacao pre-2000 para filhas solteiras de militares. Podem durar ate o final do seculo (expectativa de vida ~80 anos). Legais por direito adquirido, mas sem equivalente em qualquer outro regime previdenciario do mundo.</em></p>
          </InfoCard>
          <InfoCard title="Brasil vs Mundo — Gasto com Pessoal Militar (% Orcamento Defesa)" color="var(--blue)">
            <p>O Brasil gasta proporcionalmente mais de 3 vezes que os EUA em folha de pessoal militar. Nos EUA, 50% do orcamento de defesa vai para equipamentos e operacoes; no Brasil, 85% vai para folha.</p>
          </InfoCard>
        </InfoGrid>

        <HorizBar items={[
          { label: 'Brasil', value: 85, max: 100, color: 'var(--red)', suffix: '%' },
          { label: 'Chile', value: 50, max: 100, color: 'var(--blue)', suffix: '%' },
          { label: 'Franca', value: 45, max: 100, color: 'var(--blue)', suffix: '%' },
          { label: 'Alemanha', value: 38, max: 100, color: 'var(--blue)', suffix: '%' },
          { label: 'UK', value: 32, max: 100, color: 'var(--blue)', suffix: '%' },
          { label: 'EUA', value: 26, max: 100, color: 'var(--blue)', suffix: '%' },
        ]} />

        <Callout type="danger">
          O Brasil gasta 85% do orcamento de defesa com pessoal. EUA: 26%, Franca: 45%, Alemanha: 38%. Filhas de militares recebem pensao vitalicia — custo de R$ 6,3 bi/ano.
        </Callout>

        {/* Cronograma da Reforma PL 4.920/2024 */}
        <Prose>
          <p><strong>Cronograma da Reforma Proposta — PL 4.920/2024</strong></p>
          <p>Economia esperada: R$ 2 bi/ano. Status: em tramitacao no Congresso.</p>
        </Prose>

        <Timeline events={[
          {
            year: '2024 (realizado)',
            label: 'Lei 13.954/2019: aliquota pensao subiu de 7,5% para 10,5%',
            detail: 'Pensionistas passaram a contribuir; receitas subiram 160%.',
            color: 'var(--gold)',
          },
          {
            year: 'PL 4.920/2024',
            label: 'Extincao da "morte ficta"; proibicao de transferencia 2a/3a ordem; idade minima de 55 anos para reserva',
            detail: 'Proposta em tramitacao no Congresso.',
            color: 'var(--blue)',
          },
          {
            year: '2032',
            label: 'Implantacao da idade minima: 55 anos + pedagio de 9% do tempo restante',
            detail: 'Transicao gradual de 2025 a 2032.',
            color: 'var(--red)',
          },
        ]} />

        <StatGrid>
          <StatCard value="R$ 2" unit="bi/ano" label="Economia projetada pela reforma (3,7% do deficit)" color="var(--green)" />
          <StatCard value="R$ 856" unit="bi" label="Passivo atuarial provisionado (2023) — cresceu R$ 49 bi vs 2022" color="var(--purple)" />
        </StatGrid>

        <Callout type="warn">
          A economia projetada de R$ 2 bi/ano representa apenas 3,7% do deficit atual de R$ 53,8 bi. Especialistas consideram insuficiente para sustentabilidade de longo prazo. Passivo atuarial: R$ 495 bi (inativos) + R$ 347 bi (pensoes).
        </Callout>
      </Section>

      {/* ══════════════════════════════════════════════
          ESTUDO 2 — CARGA TRIBUTARIA COM REFORMA IVA
      ══════════════════════════════════════════════ */}
      <Section num="02" title="Carga Tributaria % PIB: trajetoria com a reforma">
        <Prose>
          <p>A EC 132/2023 e "neutra" em arrecadacao — mas o risco de alta da carga via aliquota do IVA-Dual (estimada em 26,5-28,6%) preocupa especialistas. Projecao detalhada 2025-2030.</p>
        </Prose>

        {/* Cronograma de Implantacao — EC 132 + LC 214/2025 */}
        <Prose>
          <p><strong>Cronograma de Implantacao — EC 132 + LC 214/2025</strong></p>
          <p>Transicao 2026-2033: Do PIS/COFINS/ICMS/ISS/IPI ao IVA-Dual (CBS + IBS)</p>
        </Prose>

        <DataTable
          headers={['Ano', 'CBS (Federal)', 'IBS (Est./Mun.)', 'PIS/COFINS', 'ICMS', 'ISS', 'IPI', 'Status']}
          rows={[
            ['2025', 'Regulamentacao', 'Regulamentacao', '100%', '100%', '100%', '100%', 'Preparacao'],
            ['2026', '0,9% (teste)', '0,1% (teste)', '100%', '100%', '100%', '100%', 'Testes (sem impacto)'],
            ['2027', '~8,8% (plena)', '0,1% parcial', 'Extincao', '100%', '100%', '0% (maioria)', 'Grande virada'],
            ['2029', 'Plena', '25% IBS', '—', '-10%', '-10%', '—', 'Transicao Est./Mun.'],
            ['2030', 'Plena', '50% IBS', '—', '-20%', '-20%', '—', 'Transicao 50%'],
            ['2031-32', 'Plena', '75-90% IBS', '—', '-30/-40%', '-30/-40%', '—', 'Transicao avancada'],
            ['2033', 'CBS plena', 'IBS pleno', '—', 'Extincao', 'Extincao', 'Extincao', 'Sistema definitivo'],
          ]}
          highlight={6}
        />

        <Timeline events={[
          {
            year: '2026',
            label: 'CBS 0,9% + IBS 0,1% = testes sem impacto arrecadatorio',
            detail: 'PIS/COFINS, ICMS, ISS e IPI mantidos integralmente.',
            color: 'var(--gold)',
          },
          {
            year: '2027 — Grande Virada',
            label: 'PIS/COFINS extintos. CBS plena (~8,8%). IPI zerado (maioria). Imposto Seletivo estreia.',
            detail: 'Maior risco de elevacao da carga tributaria.',
            color: 'var(--red)',
          },
          {
            year: '2029-2032',
            label: 'IBS substitui gradualmente ICMS e ISS (25% → 50% → 75% → 90%)',
            detail: 'Transicao subnacional com Fundo de Desenvolvimento Regional.',
            color: 'var(--blue)',
          },
          {
            year: '2033',
            label: 'Sistema definitivo: CBS + IBS plenos. ICMS e ISS extintos.',
            detail: 'IVA-Dual completo. Aliquota estimada: 26,5%.',
            color: 'var(--green)',
          },
        ]} />

        {/* 3 cenarios */}
        <ScenarioGrid scenarios={[
          {
            title: 'Base — Neutralidade (32-33%)',
            color: 'var(--gold)',
            items: [
              'Reforma neutra em arrecadacao',
              'CTB estavel em 2026-2027 na fase de testes',
              'Ajustes minimos para compensar perdas subnacionais',
              'PIB potencial: +0,5% a.a. de ganho de eficiencia',
            ],
          },
          {
            title: 'Risco — Aliquota Maxima (33-35%)',
            color: 'var(--red)',
            items: [
              'Aliquota do IVA Dual em 28,6% (estimativa alta)',
              'Combinada com expansao da base tributavel e IS elevado',
              'Colocaria Brasil entre os maiores IVAs do mundo',
              'Pressao inflacionaria em 2027',
            ],
          },
          {
            title: 'Otimista — Crescimento (31-32%)',
            color: 'var(--green)',
            items: [
              'Reducao de sonegacao via split payment eleva base sem subir aliquotas',
              'Fim da cumulatividade reduz custos empresariais (+0,2 p.p. PIB/ano)',
              'CTB como % PIB cai levemente com PIB mais alto',
            ],
          },
        ]} />

        {/* Projecao Detalhada — CTB (% PIB) por Cenario */}
        <Prose>
          <p><strong>Projecao Detalhada — CTB (% PIB) por Cenario</strong></p>
          <p>Fontes: STN, FGV/IBRE, estimativas proprias com base no cronograma EC 132</p>
        </Prose>

        <DataTable
          headers={['Ano', 'CTB Base', 'Cenario Risco (+)', 'Cenario Otimista (-)', 'Evento Tributario Principal', 'Impacto']}
          rows={[
            ['2024 (realizado)', '32,32%', '32,32%', '32,32%', 'Recorde historico STN. IOF ampliado.', 'Pico recorde'],
            ['2025 (estimado)', '32,1-32,5%', '32,5%', '31,8%', 'Arrecadacao +3,65% real. IOF apostas.', 'Estavel/leve alta'],
            ['2026 (fase teste)', '32,2%', '32,5%', '31,9%', 'CBS 0,9% + IBS 0,1% = teste.', 'Impacto neutro'],
            ['2027 (Grande virada)', '32,3%', '33,5%', '31,8%', 'PIS/COFINS extintos. CBS plena. IS estreia.', 'Maior risco de alta'],
            ['2028', '32,3%', '33,6%', '31,7%', 'CBS consolidada. Split Payment total.', 'Acomodacao'],
            ['2029', '32,4%', '33,8%', '31,6%', 'IBS estreia (25%). ICMS/ISS -10%.', 'Transicao est./mun.'],
            ['2030', '32,5%', '34,0%', '31,5%', 'IBS 50%. ICMS/ISS -20%. FDR ativo.', 'Meio da transicao'],
          ]}
          highlight={3}
        />

        {/* Composicao da Carga Tributaria 2024 vs 2030 */}
        <DataTable
          headers={['Tributo', '2024 (% PIB)', '2030 proj. (% PIB)', 'Variacao']}
          rows={[
            ['IR / CSLL', '10,48%', '9,50%', '-0,98 p.p.'],
            ['PIS/COFINS → CBS', '3,72%', '3,80%', '+0,08 p.p.'],
            ['ICMS → IBS', '7,10%', '5,00%', '-2,10 p.p.'],
            ['ISS → IBS', '2,10%', '1,60%', '-0,50 p.p.'],
            ['Previdencia Social', '5,29%', '5,50%', '+0,21 p.p.'],
            ['IPI → extinto', '0,71%', '0,05%', '-0,66 p.p.'],
            ['IOF + Outros', '2,02%', '2,35%', '+0,33 p.p.'],
          ]}
        />

        {/* Riscos de Alta da Carga com a Reforma */}
        <InfoGrid columns={2}>
          <InfoCard title="Risco 1 — Aliquota > 26,5%" color="var(--red)">
            <p>A aliquota do IVA-Dual pode chegar a 28,6% segundo criticos no Congresso. Seria o maior IVA do mundo, gerando aumento real da carga.</p>
          </InfoCard>
          <InfoCard title="Risco 2 — Excecoes multiplicadas" color="var(--gold)">
            <p>Setores com aliquota reduzida (saude, educacao, alimentos basicos) elevam a aliquota geral. Cada excecao adicional aumenta o IVA dos demais.</p>
          </InfoCard>
          <InfoCard title="Risco 3 — Imposto Seletivo (IS)" color="var(--blue)">
            <p>Tabaco, alcool, bebidas acucaradas, armas. Potencial arrecadatorio de R$ 30-60 bi/ano — pressao sobre carga total.</p>
          </InfoCard>
          <InfoCard title="Ganho potencial — Split Payment" color="var(--green)">
            <p>Reducao estrutural de sonegacao pode adicionar R$ 80-150 bi/ano de receita sem elevar aliquotas. Esse e o argumento para neutralidade real.</p>
          </InfoCard>
        </InfoGrid>

        <Callout type="info">
          A reforma tributaria (IVA dual) simplifica o sistema mas a transicao de 2027-2032 cria incerteza sobre a carga efetiva. O risco e que o IBS+CBS arrecade mais que o previsto.
        </Callout>
      </Section>

      {/* ══════════════════════════════════════════════
          ESTUDO 3 — CENARIO MACRO: INFLACAO x FISCAL x JUROS
      ══════════════════════════════════════════════ */}
      <Section num="03" title="Inflacao x Resultado Fiscal e Taxa de Juros">
        <Prose>
          <p>Analise cruzada de dois vetores macroeconomicos: como diferentes trajetorias de resultado fiscal e de Selic impactam o IPCA esperado nos proximos 4 anos.</p>
        </Prose>

        {/* Baseline facts */}
        <StatGrid>
          <StatCard value="4,44" unit="%" label="IPCA 2025 (realizado) — dentro do teto 4,5%. Meta CMN: 3% +/-1,5pp" color="var(--gold)" />
          <StatCard value="15,0" unit="% a.a." label="Selic atual — maior nivel desde jul/2006 (15,25%)" color="var(--red)" />
          <StatCard value="-0,48" unit="% PIB" label="Resultado primario 2025 — deficit de R$ 61,7 bi" color="var(--blue)" />
        </StatGrid>

        {/* Projecao IPCA x Selic — Cenario Focus */}
        <DataTable
          headers={['Variavel', '2023 (real)', '2024 (real)', '2025 (real)', '2026 (Focus)', '2027 (Focus)', '2028 (Focus)', '2029 (Focus)']}
          rows={[
            ['IPCA (%)', '4,62', '4,83', '4,44', '3,95', '3,80', '3,50', '3,50'],
            ['Selic (%)', '11,75', '12,25', '15,0', '12,1', '10,5', '10,0', '9,5'],
            ['Teto meta IPCA', '4,5', '4,5', '4,5', '4,5', '4,5', '4,5', '4,5'],
          ]}
        />

        {/* ── MATRIZ A — IPCA x Resultado Fiscal (5x5) ── */}
        <Prose>
          <p><strong>Matriz A — IPCA Projetado x Resultado Fiscal do Governo</strong></p>
          <p>Selic mantida no cenario base (Focus). Impacto via expectativas, cambio e premio de risco.</p>
        </Prose>

        <SensitivityMatrix
          rowLabel="Resultado Fiscal"
          colLabel="Ano"
          rows={[
            'Superavit primario (+0,5% PIB ou mais)',
            'Deficit leve (-0,25% a 0% PIB — meta)',
            'Deficit moderado (-0,5% a -1,0% PIB)',
            'Deficit estrutural (-1,0% a -2,0% PIB)',
            'Colapso fiscal (< -2,0% PIB)',
          ]}
          cols={['2026', '2027', '2028', '2029', '2030']}
          cells={[
            /* Superavit */
            [
              { value: '3,2%', color: 'rgba(82,211,138,0.18)' },
              { value: '3,0%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,8%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,7%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,7%', color: 'rgba(82,211,138,0.18)' },
            ],
            /* Deficit leve */
            [
              { value: '3,9%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,5%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,0%', color: 'rgba(82,211,138,0.18)' },
              { value: '3,0%', color: 'rgba(82,211,138,0.18)' },
              { value: '3,0%', color: 'rgba(82,211,138,0.18)' },
            ],
            /* Deficit moderado */
            [
              { value: '4,2%', color: 'rgba(232,197,71,0.18)' },
              { value: '4,0%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,8%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,5%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,5%', color: 'rgba(232,197,71,0.18)' },
            ],
            /* Deficit estrutural */
            [
              { value: '4,8%', color: 'rgba(232,90,78,0.18)' },
              { value: '4,5%', color: 'rgba(232,90,78,0.18)' },
              { value: '4,3%', color: 'rgba(232,90,78,0.18)' },
              { value: '4,0%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,8%', color: 'rgba(232,197,71,0.18)' },
            ],
            /* Colapso fiscal */
            [
              { value: '6,5%', color: 'rgba(232,90,78,0.35)' },
              { value: '7,0%', color: 'rgba(232,90,78,0.35)' },
              { value: '6,0%', color: 'rgba(232,90,78,0.18)' },
              { value: '5,0%', color: 'rgba(232,90,78,0.18)' },
              { value: '4,5%', color: 'rgba(232,90,78,0.18)' },
            ],
          ]}
        />

        <Callout type="info">
          Legenda Matriz A: Verde (&#8804; 3%) = abaixo/centro meta | Amarelo (3-4,5%) = dentro do teto | Vermelho (4,5-6%) = acima do teto | Vermelho forte ({'>'}6%) = crise inflacionaria.
        </Callout>

        {/* ── MATRIZ B — IPCA x Taxa de Juros Nominal (Selic) (5x5) ── */}
        <Prose>
          <p><strong>Matriz B — IPCA Projetado x Taxa de Juros Nominal (Selic)</strong></p>
          <p>Resultado fiscal mantido no cenario base (deficit leve/meta). Variavel: ritmo de corte da Selic.</p>
        </Prose>

        <SensitivityMatrix
          rowLabel="Selic"
          colLabel="Ano"
          rows={[
            'Selic muito alta (14-15% a.a. em 2026)',
            'Selic alta moderada (12-13% a.a. em 2026)',
            'Corte acelerado (10-11% a.a. em 2026)',
            'Corte prematuro (8-9% a.a. em 2026)',
            'Alta da Selic / choque (16-17% a.a. em 2026)',
          ]}
          cols={['2026', '2027', '2028', '2029', '2030']}
          cells={[
            /* Selic muito alta */
            [
              { value: '3,5%', color: 'rgba(82,211,138,0.18)' },
              { value: '3,0%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,8%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,7%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,8%', color: 'rgba(82,211,138,0.18)' },
            ],
            /* Selic alta moderada (cenario Focus base) */
            [
              { value: '3,9%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,5%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,0%', color: 'rgba(82,211,138,0.18)' },
              { value: '3,0%', color: 'rgba(82,211,138,0.18)' },
              { value: '3,0%', color: 'rgba(82,211,138,0.18)' },
            ],
            /* Corte acelerado */
            [
              { value: '4,2%', color: 'rgba(232,197,71,0.18)' },
              { value: '4,0%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,8%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,5%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,3%', color: 'rgba(232,197,71,0.18)' },
            ],
            /* Corte prematuro */
            [
              { value: '5,0%', color: 'rgba(232,90,78,0.18)' },
              { value: '5,5%', color: 'rgba(232,90,78,0.18)' },
              { value: '5,0%', color: 'rgba(232,90,78,0.18)' },
              { value: '4,2%', color: 'rgba(232,197,71,0.18)' },
              { value: '3,8%', color: 'rgba(232,197,71,0.18)' },
            ],
            /* Alta da Selic (choque) */
            [
              { value: '3,8%', color: 'rgba(232,197,71,0.18)' },
              { value: '2,5%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,3%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,5%', color: 'rgba(82,211,138,0.18)' },
              { value: '2,8%', color: 'rgba(82,211,138,0.18)' },
            ],
          ]}
        />

        <Callout type="info">
          Legenda Matriz B: Verde (&#8804; 3%) = abaixo/centro meta | Amarelo (3-4,5%) = dentro do teto | Vermelho (4,5-6%) = acima do teto | Vermelho forte ({'>'}6%) = crise inflacionaria. O cenario Focus base (Selic alta moderada 12-13%) e o de referencia.
        </Callout>

        {/* IPCA — Leque de Cenarios 2026-2030 */}
        <Prose>
          <p><strong>IPCA — Leque de Cenarios 2026-2030</strong></p>
          <p>Combinando as duas dimensoes (fiscal + juros): cenario otimista, base e estresse.</p>
        </Prose>

        <DataTable
          headers={['Cenario', '2025 (real)', '2026', '2027', '2028', '2029', '2030']}
          rows={[
            ['Estresse (Colapso Fiscal + Corte Prematuro)', '4,44%', '6,5%', '7,0%', '6,0%', '5,0%', '4,5%'],
            ['Base Focus (Deficit Leve + Selic 12%)', '4,44%', '3,9%', '3,5%', '3,0%', '3,0%', '3,0%'],
            ['Otimista (Superavit + Selic Alta)', '4,44%', '3,2%', '3,0%', '2,8%', '2,7%', '2,7%'],
            ['Meta BCB', '3,0%', '3,0%', '3,0%', '3,0%', '3,0%', '3,0%'],
          ]}
        />

        {/* Leitura das Matrizes */}
        <InfoGrid columns={2}>
          <InfoCard title="Leitura das Matrizes — O que os dados dizem" color="var(--gold)">
            <p><strong>Canal fiscal → cambio:</strong> Cada 1pp de piora no resultado primario deprecia o cambio em ~2-3%, adicionando +0,3pp ao IPCA via precos importados e energia.</p>
            <p><strong>Canal juros → credito:</strong> A Selic a 15% eleva o custo do credito ao consumidor para ~40-50% a.a. Desacelera demanda e servicos com defasagem de 6-12 meses.</p>
            <p><strong>Ancoragem de expectativas:</strong> O maior risco e a des-ancoragem. Uma vez que as expectativas de inflacao saem da meta, o BCB precisa de juros 2-3pp maiores por 12-18 meses para re-ancorar.</p>
            <p><strong>Reforma tributaria + inflacao:</strong> O IVA em 2027 pode adicionar +0,5 a +1,0pp ao IPCA via repasse de precos, especialmente em servicos (efeito unico, nao persistente).</p>
          </InfoCard>
          <InfoCard title="Cenario Central (Projecao Consenso)" color="var(--blue)">
            <p><strong>IPCA:</strong> 3,9% (2026) → 3,5% (2027) → 3,0% (2028) → 3,0% (2029)</p>
            <p><strong>Selic (fim ano):</strong> 12,1% (2026) → 10,5% (2027) → 10,0% (2028) → 9,5% (2029)</p>
            <p><strong>Resultado primario:</strong> -0,5% (2026) → -0,4% (2027) → +0,1% (2028) → +0,3% (2029)</p>
            <p><strong>PIB real:</strong> 1,8% (2026) → 1,8% (2027) → 2,0% (2028) → 2,0% (2029)</p>
            <p><strong>Cambio (R$/USD):</strong> 5,50 (2026) → 5,50 (2027) → 5,40 (2028) → 5,30 (2029)</p>
            <p><strong>DBGG (% PIB):</strong> 82% (2026) → 84% (2027) → 85% (2028) → 86% (2029)</p>
            <p><em>Fontes: Boletim Focus BCB (mar/2026), IFI/Senado, IPEA, Tesouro Nacional. Cenario compativel com convergencia ao centro da meta em 2028, mas pressupoe cumprimento do arcabouco fiscal.</em></p>
          </InfoCard>
        </InfoGrid>

        {/* Cenario Central — Tabela completa */}
        <DataTable
          headers={['Variavel', '2026', '2027', '2028', '2029']}
          rows={[
            ['IPCA (%)', '3,9', '3,5', '3,0', '3,0'],
            ['Selic (% a.a.)', '12,1', '10,5', '10,0', '9,5'],
            ['Resultado Primario (% PIB)', '-0,5', '-0,4', '+0,1', '+0,3'],
            ['PIB Real (%)', '1,8', '1,8', '2,0', '2,0'],
            ['Cambio (R$/US$)', '5,50', '5,50', '5,40', '5,30'],
            ['Divida DBGG (% PIB)', '82', '84', '85', '86'],
          ]}
        />

        <Callout type="warn">
          Divida bruta projetada para 86% do PIB em 2029. O cenario de estresse (sem disciplina fiscal) leva a carga tributaria para 34% do PIB e o IPCA para 7% em 2027.
        </Callout>
      </Section>

      {/* ── Footer / Fontes ── */}
      <Section num="—" title="Fontes e Metodologia">
        <Prose>
          <p>Fontes: STN, BCB (Focus), TCU, CNJ, IFI/Senado, IPEA, FGV/IBRE, Portal da Transparencia, EC 132/2023, LC 214/2025.</p>
          <p>Estudos Fiscais Brasil — Marco 2026.</p>
        </Prose>
      </Section>
    </ReportShell>
  );
}
