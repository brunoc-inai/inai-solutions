import ReportShell, { Section, StatGrid, StatCard, DataTable, Callout, BarChart, HorizBar } from './ReportShell';

export default function ReportCriminalidade({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell title="Criminalidade no Brasil" eyebrow="Ministério da Segurança Pública" color="var(--red)" onClose={onClose}>
      <Section num="01" title="Panorama de Homicídios">
        <StatGrid>
          <StatCard value="45.747" label="Homicídios em 2023" color="var(--red)" />
          <StatCard value="125" unit="/dia" label="Média diária" color="var(--red)" />
          <StatCard value="21.2" unit="/100k" label="Taxa (menor em 35 anos)" color="var(--amber)" />
          <StatCard value="−30" unit="%" label="Queda desde pico 2017" color="var(--green)" />
        </StatGrid>
        <Callout type="danger">
          O Brasil concentra 10% dos homicídios do planeta com apenas 3% da população mundial. A taxa caiu 30% desde 2017, mas ainda é 3.7× a média global (5.8/100k).
        </Callout>
      </Section>

      <Section num="02" title="Série Histórica de Homicídios">
        <DataTable
          headers={['Ano', 'Homicídios', 'Taxa/100k', 'Variação']}
          rows={[
            ['2013', '57.396', '27.4', '—'],
            ['2015', '58.467', '28.9', '+5.5%'],
            ['2017 (pico)', '65.602', '31.8', '+10.0%'],
            ['2019', '45.503', '21.7', '−21.9%'],
            ['2020 (Covid)', '50.033', '24.1', '+11.0%'],
            ['2022', '46.409', '21.7', '−3.0%'],
            ['2023', '45.747', '21.2', '−2.3%'],
            ['2024 (est.)', '~45.000', '~20.8', '~−2.0%'],
          ]}
        />
      </Section>

      <Section num="03" title="Comparação Internacional (taxa/100k)">
        <HorizBar items={[
          { label: 'Colômbia', value: 26, max: 30, color: 'var(--red)' },
          { label: 'México', value: 24, max: 30, color: 'var(--red)' },
          { label: 'Brasil', value: 21.2, max: 30, color: 'var(--coral)' },
          { label: 'AL & Caribe (média)', value: 19.2, max: 30, color: 'var(--amber)' },
          { label: 'EUA', value: 6.9, max: 30, color: 'var(--blue)' },
          { label: 'Global (média)', value: 5.8, max: 30, color: 'var(--blue)' },
          { label: 'Europa Ocidental', value: 1.0, max: 30, color: 'var(--green)' },
        ]} />
      </Section>

      <Section num="04" title="Perfil das Vítimas">
        <DataTable
          headers={['Indicador', 'Valor', 'Contexto']}
          rows={[
            ['Vítimas negras/pardas', '76.97% (35.213)', 'Taxa 28.9 vs 10.6/100k brancos = 2.7×'],
            ['Jovens 15–29 anos', '47.8% (21.856)', '60 jovens assassinados por dia'],
            ['Mortes por arma de fogo', '71.6% (32.749)', 'Queda desde pico 2017 (49 mil)'],
            ['Mulheres assassinadas', '3.900 (3.5/100k)', 'Cresceu 2.5% contra tendência geral'],
            ['Crianças 0–14 (última década)', '8.604', 'Invisíveis nas estatísticas'],
          ]}
        />
        <Callout type="danger">
          A desigualdade racial na violência cresceu: em 2013, negros morriam 2.4× mais que brancos. Em 2023, morrem 2.7× mais. Homicídios caíram 32% para brancos e 21.5% para negros.
        </Callout>
      </Section>

      <Section num="05" title="Crime Organizado — 88 Facções Catalogadas">
        <DataTable
          headers={['Facção', 'Origem', 'Membros (est.)', 'Atuação']}
          rows={[
            ['PCC', 'SP, 1993', '~112 mil', '22 estados + exterior'],
            ['CV (Comando Vermelho)', 'RJ, anos 70', '~30 mil', '19 estados'],
            ['FDN (Família do Norte)', 'AM', 'Milhares', 'Rota Solimões'],
            ['GDE (Guardiões do Estado)', 'CE, 2016', 'Milhares', 'Nordeste'],
          ]}
        />
        <StatGrid>
          <StatCard value="348" unit=" bi" label="Receita crime organizado/ano (R$)" color="var(--red)" />
        </StatGrid>
        <DataTable
          headers={['Setor', 'Receita (R$ bi)', '% Total']}
          rows={[
            ['Crimes digitais + roubo celular', '186.1', '53.5%'],
            ['Combustíveis ilícitos', '61.4', '17.6%'],
            ['Álcool ilegal', '56.9', '16.4%'],
            ['Garimpo ilegal', '18.2', '5.2%'],
            ['Tráfico de cocaína', '15.2', '4.4%'],
            ['Contrabando tabaco', '10.3', '3.0%'],
          ]}
        />
        <Callout type="info">
          O tráfico de drogas NÃO é a maior fonte de receita do crime organizado. Setores legais infiltrados (combustíveis, álcool, digital) geram 87% da receita total.
        </Callout>
      </Section>

      <Section num="06" title="Sistema Prisional">
        <StatGrid>
          <StatCard value="832" unit=" mil" label="Presos (3º maior do mundo)" color="var(--red)" />
          <StatCard value="389" unit="/100k" label="Taxa de encarceramento" color="var(--coral)" />
          <StatCard value="35" unit="%" label="Presos sem condenação" color="var(--amber)" />
          <StatCard value="+900" unit="%" label="Crescimento desde 1990" color="var(--red)" />
        </StatGrid>
        <DataTable
          headers={['País', 'Presos', 'Taxa/100k']}
          rows={[
            ['EUA', '~2.1 mi', '~630'],
            ['China', '~1.7 mi', '~120'],
            ['Brasil', '~832 mil', '~389'],
            ['Rússia', '~470 mil', '~320'],
            ['Média global', '—', '~145'],
          ]}
        />
      </Section>

      <Section num="07" title="Brasil vs. Noruega — Reabilitação">
        <DataTable
          headers={['Aspecto', 'Brasil', 'Noruega']}
          rows={[
            ['Filosofia', 'Punição', 'Reabilitação'],
            ['Reincidência', '32–70%', '~20%'],
            ['Trabalho no cárcere', '~24%', 'Quase universal'],
            ['Educação no cárcere', '15% da demanda', 'Quase universal'],
            ['Custo/preso/mês', 'R$ 2–3 mil', 'R$ 60 mil'],
            ['Superlotação', '50%+ acima da capacidade', 'Nenhuma'],
          ]}
        />
        <Callout type="warn">
          80% do orçamento de segurança vai para polícia. Menos de 20% para prisões. Apenas 0.1% para políticas pós-soltura. O ciclo de reincidência é estruturalmente alimentado.
        </Callout>
      </Section>

      <Section num="08" title="Efetivo Policial">
        <StatGrid>
          <StatCard value="800" unit=" mil" label="Profissionais de segurança" color="var(--blue)" />
          <StatCard value="~2.5" unit="/1.000" label="Policiais por habitante" color="var(--amber)" />
          <StatCard value="37" unit="%" label="Taxa de elucidação homicídios" color="var(--red)" />
          <StatCard value="6.558" label="Mortes por intervenção policial (2023)" color="var(--red)" />
        </StatGrid>
        <Callout type="info">
          Paradoxo: Santa Catarina tem a menor taxa policial (1.3/1.000) e a 2ª menor taxa de violência (9.1/100k). Amapá tem a maior taxa policial (4.2/1.000) e o maior índice de homicídios (50.6/100k). Mais polícia ≠ menos crime.
        </Callout>
      </Section>

      <Section num="09" title="Corrupção">
        <DataTable
          headers={['País', 'CPI 2024 (0–100)']}
          rows={[
            ['Dinamarca', '90 (1º)'],
            ['Noruega', '81'],
            ['Alemanha', '78'],
            ['Chile', '67'],
            ['Brasil', '~36 (pior da história)'],
            ['México', '31'],
            ['Rússia', '26'],
          ]}
        />
        <Callout type="danger">
          Para cada R$100 em contratos públicos, R$29 são superfaturados em média. Custo do crime organizado para o setor privado: R$453.5 bilhões (2022, CNI/FIESP).
        </Callout>
      </Section>
    </ReportShell>
  );
}
