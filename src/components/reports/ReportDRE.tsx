import { useGameStore } from '../../engine/gameState';
import ReportShell, {
  Section,
  StatGrid,
  StatCard,
  DataTable,
  Callout,
  BarChart,
  HorizBar,
  Prose,
} from './ReportShell';

function fmt(v: number): string {
  if (v === 0) return '—';
  const sign = v > 0 ? '+' : '';
  return `${sign}${Math.round(v * 10) / 10}`;
}

export default function ReportDRE({ onClose }: { onClose: () => void }) {
  const { dre, currentPhase } = useGameStore();

  /* ── Section 01 data ── */
  const currentYearIdx = Math.max(0, currentPhase - 1);
  const currentYear = dre.years[currentYearIdx];
  const { years } = dre;

  /* ── Section 03 shared max ── */
  const maxDespesa = Math.max(...years.map(x => x.despesa)) * 1.1;

  /* ── Section 04 debt trend ── */
  const debtRising =
    years.length >= 2 && years[years.length - 1].dividaPIB > years[0].dividaPIB;

  return (
    <ReportShell
      title="DRE Governamental"
      eyebrow="Ministério da Fazenda — Demonstrativo"
      color="var(--purple)"
      onClose={onClose}
    >
      {/* ── 01 Visão Geral ── */}
      <Section num="01" title="Visão Geral">
        <StatGrid>
          <StatCard
            value={`R$ ${currentYear.receita}`}
            unit=" bi"
            label={`Receita Líquida (${currentYear.label})`}
            color={
              currentYearIdx > 0 && currentYear.receita > years[currentYearIdx - 1].receita
                ? 'var(--green)'
                : 'var(--amber)'
            }
          />
          <StatCard
            value={`R$ ${currentYear.despesa}`}
            unit=" bi"
            label="Despesa Total"
            color="var(--red)"
          />
          <StatCard
            value={currentYear.resultadoPrimario}
            unit=" bi"
            label="Resultado Primário"
            color={currentYear.resultadoPrimario >= 0 ? 'var(--green)' : 'var(--red)'}
          />
          <StatCard
            value={`R$ ${currentYear.juros}`}
            unit=" bi"
            label="Serviço da Dívida"
            color="var(--coral)"
          />
          <StatCard
            value={currentYear.dividaPIB}
            unit="%"
            label="Dívida Bruta / PIB"
            color={
              currentYear.dividaPIB > 85
                ? 'var(--red)'
                : currentYear.dividaPIB > 80
                  ? 'var(--amber)'
                  : 'var(--blue)'
            }
          />
          <StatCard
            value={currentYear.pibGrowth}
            unit="%"
            label="Crescimento do PIB"
            color={
              currentYear.pibGrowth >= 2
                ? 'var(--green)'
                : currentYear.pibGrowth >= 0
                  ? 'var(--amber)'
                  : 'var(--red)'
            }
          />
        </StatGrid>

        <Callout type={currentYear.resultadoPrimario >= 0 ? 'ok' : 'warn'}>
          {currentYear.resultadoPrimario >= 0
            ? `O governo apresenta superávit primário de R$ ${currentYear.resultadoPrimario} bi em ${currentYear.label}, sinalizando disciplina fiscal.`
            : `O governo opera com déficit primário de R$ ${Math.abs(currentYear.resultadoPrimario)} bi em ${currentYear.label}. Atenção ao equilíbrio fiscal.`}
        </Callout>
      </Section>

      {/* ── 02 Evolução Anual ── */}
      <Section num="02" title="Evolução Anual">
        <DataTable
          headers={['', 'Ano 1 (2027)', 'Ano 2 (2028)', 'Ano 3 (2029)', 'Ano 4 (2030)']}
          rows={[
            ['Receita (R$ bi)', ...years.map(y => Math.round(y.receita * 10) / 10)],
            ['Despesa (R$ bi)', ...years.map(y => Math.round(y.despesa * 10) / 10)],
            ['Resultado Primário', ...years.map(y => Math.round(y.resultadoPrimario * 10) / 10)],
            ['Juros (R$ bi)', ...years.map(y => Math.round(y.juros * 10) / 10)],
            ['Resultado Nominal', ...years.map(y => Math.round(y.resultadoNominal * 10) / 10)],
            ['Dívida/PIB (%)', ...years.map(y => Math.round(y.dividaPIB * 10) / 10)],
            ['Crescimento PIB (%)', ...years.map(y => Math.round(y.pibGrowth * 10) / 10)],
            ['PIB Nominal (R$ tri)', ...years.map(y => Math.round(y.pibNominal * 10) / 10)],
          ]}
        />
      </Section>

      {/* ── 03 Receita vs Despesa ── */}
      <Section num="03" title="Receita vs Despesa">
        <BarChart
          items={years.map(y => ({
            label: y.label,
            value: y.receita,
            max: maxDespesa,
            color: 'var(--green)',
          }))}
        />
        <BarChart
          items={years.map(y => ({
            label: y.label,
            value: y.despesa,
            max: maxDespesa,
            color: 'var(--red)',
          }))}
        />
      </Section>

      {/* ── 04 Trajetória da Dívida ── */}
      <Section num="04" title="Trajetória da Dívida">
        <HorizBar
          items={years.map(y => ({
            label: y.label,
            value: y.dividaPIB,
            max: 120,
            color:
              y.dividaPIB > 85
                ? 'var(--red)'
                : y.dividaPIB > 80
                  ? 'var(--amber)'
                  : 'var(--blue)',
            suffix: '%',
          }))}
        />
        <Callout type={debtRising ? 'danger' : 'ok'}>
          {debtRising
            ? 'A dívida/PIB está em trajetória ascendente. Juros maiores comprimem o orçamento e podem tornar a situação insustentável se não houver correção de rota.'
            : 'A dívida/PIB está em trajetória de queda — um sinal positivo de que as decisões fiscais estão surtindo efeito. Parabéns pela disciplina orçamentária.'}
        </Callout>
      </Section>

      {/* ── 05 Ajustes das Decisões ── */}
      <Section num="05" title="Ajustes das Decisões">
        <DataTable
          headers={['', 'Ano 1', 'Ano 2', 'Ano 3', 'Ano 4']}
          rows={[
            ['Ajuste Receita (R$ bi)', ...years.map(y => fmt(y.ajusteReceita))],
            ['Ajuste Despesa (R$ bi)', ...years.map(y => fmt(y.ajusteDespesa))],
            ['Receita Base', ...years.map(y => y.receitaBase)],
            ['Despesa Base', ...years.map(y => y.despesaBase)],
          ]}
        />
        <Prose>
          <p>
            A linha &lsquo;Base&rsquo; mostra a trajetória inercial sem suas decisões. Os ajustes
            refletem o impacto acumulado de cada escolha fiscal.
          </p>
        </Prose>
      </Section>

      {/* ── 06 Contexto ── */}
      <Section num="06" title="Contexto">
        <Prose>
          <p>
            Este demonstrativo simula o resultado fiscal do governo federal ao longo de 4 anos de
            mandato. Os valores base são derivados dos dados reais do Brasil (2024/2025). A receita
            cresce organicamente ~3.5% ao ano enquanto a despesa obrigatória (previdência, saúde,
            educação) cresce ~4.5% ao ano — o que significa que sem reformas, o déficit se aprofunda
            automaticamente.
          </p>
        </Prose>
        <Prose>
          <p>
            Cada decisão que afeta o indicador Fiscal impacta a DRE: medidas de austeridade reduzem
            despesa e/ou aumentam receita; expansionismo fiscal faz o oposto. Reformas estruturais
            geram ganhos de eficiência que melhoram a receita nos anos seguintes.
          </p>
        </Prose>
        <Callout type="warn">
          A dívida/PIB é o indicador mais perigoso: quando sobe, os juros sobem, o que piora o
          resultado nominal, que por sua vez aumenta a dívida — um ciclo vicioso que pode se tornar
          insustentável.
        </Callout>
      </Section>
    </ReportShell>
  );
}
