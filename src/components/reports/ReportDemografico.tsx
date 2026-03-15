import ReportShell, {
  Section, StatGrid, StatCard, DataTable, Callout, BarChart, HorizBar,
  Prose, Timeline, InfoGrid, InfoCard, QuoteBlock
} from './ReportShell';

export default function ReportDemografico({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Brasil: Tendências Demográficas 2025–2075"
      eyebrow="IBGE Censo 2022 · Projeções IBGE 2024 · PNAD Contínua · Banco Mundial · FGV IBRE"
      color="#534AB7"
      onClose={onClose}
    >
      {/* KPIs */}
      <StatGrid>
        <StatCard value="215" unit="M" label="Pop. atual (estimativa 2025)" color="#534AB7" />
        <StatCard value="1,57" label="Fecundidade — filhos/mulher (2023)" color="#D85A30" />
        <StatCard value="76,4" unit=" anos" label="Expectativa de vida ao nascer (2023)" color="#1D9E75" />
        <StatCard value="35,5" unit=" anos" label="Idade média (2023)" color="#185FA5" />
      </StatGrid>

      {/* Diagnóstico central */}
      <Callout type="danger">
        O Brasil envelhece 2× mais rápido do que os países europeus tiveram tempo para se adaptar. O bônus demográfico acabou em 2018, mas a estrutura fiscal ainda não incorporou essa realidade. Sem ação combinada em natalidade, imigração, previdência e produtividade, o sistema de seguridade social enfrentará colapso fiscal antes de 2050. A janela de oportunidade para ajuste é a próxima década.
      </Callout>

      {/* Seção 1: Pirâmide Etária */}
      <Section num="1" title="Pirâmide etária — transformação 2000 → 2025 → 2070">
        <Prose>
          <p>A base estreitou-se significativamente enquanto o topo se alarga. Em 1980, crianças (0–14) eram 38% da população; em 2025 são ~19%; em 2070 serão apenas 12%. O Brasil transita de país jovem para país envelhecido em tempo recorde.</p>
        </Prose>

        <Prose><p><strong>Pirâmide etária — 2000 (% da população por faixa)</strong></p></Prose>
        <DataTable
          headers={['Faixa', 'Masc. 2000', 'Fem. 2000', 'Masc. 2025', 'Fem. 2025', 'Masc. 2050', 'Fem. 2050', 'Masc. 2070', 'Fem. 2070']}
          rows={[
            ['0–4',   '5,0%','4,8%', '3,5%','3,3%', '2,2%','2,1%', '1,5%','1,4%'],
            ['5–9',   '4,9%','4,7%', '3,7%','3,5%', '2,3%','2,2%', '1,6%','1,5%'],
            ['10–14', '4,8%','4,6%', '3,9%','3,7%', '2,4%','2,3%', '1,7%','1,6%'],
            ['15–19', '4,7%','4,5%', '4,1%','3,9%', '2,5%','2,4%', '1,8%','1,7%'],
            ['20–24', '4,4%','4,3%', '4,2%','4,1%', '2,7%','2,6%', '2,0%','1,9%'],
            ['25–29', '4,1%','4,0%', '4,3%','4,2%', '2,9%','2,8%', '2,2%','2,1%'],
            ['30–34', '3,8%','3,7%', '4,5%','4,4%', '3,1%','3,0%', '2,4%','2,3%'],
            ['35–39', '3,4%','3,4%', '4,6%','4,6%', '3,3%','3,2%', '2,6%','2,5%'],
            ['40–44', '3,0%','3,0%', '4,4%','4,5%', '3,4%','3,4%', '2,8%','2,7%'],
            ['45–49', '2,5%','2,5%', '4,0%','4,1%', '3,5%','3,5%', '3,0%','2,9%'],
            ['50–54', '2,1%','2,2%', '3,5%','3,7%', '3,6%','3,6%', '3,2%','3,2%'],
            ['55–59', '1,7%','1,8%', '3,0%','3,2%', '3,6%','3,7%', '3,4%','3,4%'],
            ['60–64', '1,3%','1,4%', '2,5%','2,8%', '3,4%','3,6%', '3,4%','3,5%'],
            ['65–69', '1,0%','1,1%', '2,0%','2,3%', '3,0%','3,3%', '3,3%','3,4%'],
            ['70–74', '0,7%','0,8%', '1,4%','1,7%', '2,4%','2,8%', '3,0%','3,3%'],
            ['75+',   '0,8%','1,1%', '1,6%','2,3%', '3,2%','4,8%', '4,2%','6,8%'],
          ]}
        />
        <Callout type="info">
          Nota: Em 2070, a faixa 75+ feminina atinge 6,8% da população — reflexo da maior longevidade das mulheres e do envelhecimento acelerado. A base (0–4 anos) masculina cai de 5,0% (2000) para apenas 1,5% (2070).
        </Callout>
      </Section>

      {/* Seção 2: Projeção da população total e grupos etários */}
      <Section num="2" title="Projeção da população total e grupos etários (IBGE 2024)">
        <Prose>
          <p>Brasil atinge pico de 220 milhões em 2041, depois inicia declínio. A proporção de idosos (60+) vai de 15,6% em 2024 para 37,8% em 2070. Nascem 2,6 milhões de crianças/ano (2022) vs 3,6 milhões em 2000.</p>
        </Prose>

        <DataTable
          headers={['Grupo etário', '2000', '2010', '2024', '2030', '2040', '2050', '2060', '2070']}
          rows={[
            ['0–14 anos (%)',  '30%','25%','20%','17%','14%','13%','12%','12%'],
            ['15–59 anos (%)', '61,4%','63%','63%','62%','57%','52%','51%','50%'],
            ['60+ anos (%)',   '8,6%','12%','17%','21%','29%','35%','37%','38%'],
          ]}
          highlight={2}
        />

        <Prose><p><strong>Nascimentos anuais — declínio contínuo</strong></p></Prose>
        <BarChart items={[
          { label: '2000', value: 3.6, max: 4, color: '#534AB7' },
          { label: '2005', value: 3.4, max: 4, color: '#534AB7' },
          { label: '2010', value: 3.0, max: 4, color: '#534AB7' },
          { label: '2015', value: 2.9, max: 4, color: '#534AB7' },
          { label: '2020', value: 2.7, max: 4, color: '#BA7517' },
          { label: '2022', value: 2.6, max: 4, color: '#BA7517' },
          { label: '2030 (proj.)', value: 2.2, max: 4, color: '#D85A30' },
          { label: '2040 (proj.)', value: 1.9, max: 4, color: '#D85A30' },
          { label: '2050 (proj.)', value: 1.7, max: 4, color: '#D85A30' },
          { label: '2070 (proj.)', value: 1.5, max: 4, color: '#D85A30' },
        ]} />
        <Callout type="warn">
          O número de nascimentos caiu de 3,6 milhões/ano em 2000 para 2,6 milhões em 2022. A projeção para 2070 é de apenas 1,5 milhão — queda de 58% em 70 anos. A base da pirâmide continua encolhendo estruturalmente.
        </Callout>
      </Section>

      {/* Seção 3: Impacto previdenciário */}
      <Section num="3" title="Impacto previdenciário — razão de dependência e PEA">
        <Prose>
          <p>O bônus demográfico acabou em 2018. A razão de dependência (idosos/PEA) vai de 16% hoje para 36% em 2050. Em 2000 havia 12 ativos por idoso; em 2050 serão menos de 3. O Banco Mundial indica que a idade mínima pode precisar chegar a 78 anos até 2060.</p>
        </Prose>

        <DataTable
          headers={['Indicador / Ano', '2000', '2010', '2018', '2020', '2030', '2040', '2050', '2060']}
          rows={[
            ['Razão dep. idosos (%)', '9%', '10%', '13%', '14%', '18%', '26%', '36%', '46%'],
          ]}
        />

        <Prose><p><strong>Contribuintes por beneficiário (INSS)</strong></p></Prose>
        <HorizBar items={[
          { label: '1960', value: 30, max: 32, color: '#1D9E75' },
          { label: '1980', value: 12, max: 32, color: '#1D9E75' },
          { label: '2000', value: 8, max: 32, color: '#1D9E75' },
          { label: '2010', value: 4, max: 32, color: '#BA7517' },
          { label: '2020', value: 2.5, max: 32, color: '#D85A30' },
          { label: '2030 (proj.)', value: 2.0, max: 32, color: '#D85A30' },
          { label: '2050 (proj.)', value: 1.4, max: 32, color: '#D85A30' },
        ]} />

        <Prose><p><strong>Linha do tempo — marcos previdenciários e demográficos</strong></p></Prose>
        <Timeline events={[
          { year: '2018', label: 'Fim do bônus demográfico', detail: 'Razão de dependência começa a subir estruturalmente', color: '#D85A30' },
          { year: '2019', label: 'Reforma da Previdência', detail: 'Idade mínima 65 (H) / 62 (M), pedágio de transição', color: '#534AB7' },
          { year: '2030', label: 'PEA começa a encolher', detail: 'População em idade ativa começa a encolher; início de pressão fiscal estrutural severa', color: '#BA7517' },
          { year: '2035', label: 'Idosos superam crianças', detail: 'Número de idosos supera o de crianças pela 1ª vez na história brasileira', color: '#BA7517' },
          { year: '2041', label: 'Pico populacional — 220,4 milhões', detail: 'Início do declínio absoluto da população', color: '#D85A30' },
          { year: '2050', label: 'Razão de dependência atinge 36%', detail: '~3 ativos por idoso; gastos previdenciários projetados em ~21% do PIB', color: '#D85A30' },
          { year: '2060', label: 'Idade mínima de 78 anos?', detail: 'Banco Mundial projeta necessidade de idade mínima de 78 anos para manter equilíbrio da reforma de 2019', color: '#D85A30' },
        ]} />

        <Callout type="warn">
          <strong>Contexto previdenciário atual:</strong> Apenas 56,4% da PEA contribuiu ao menos uma vez ao INSS em 2020. O Brasil já gasta 13,4% do PIB em previdência — como países europeus com o triplo de idosos. A informalidade (40% dos ocupados) agrava estruturalmente o problema de receita.
        </Callout>
      </Section>

      {/* Seção 4: Expectativa de vida */}
      <Section num="4" title="Expectativa de vida ao nascer — evolução e projeções">
        <Prose>
          <p>Ganhos contínuos desde 2000, com recuo temporário durante a pandemia. De 71,1 anos em 2000 para 76,4 em 2023. A projeção para 2070 é de 83,9 anos. Mulheres vivem em média 6,6 anos a mais que homens.</p>
        </Prose>

        <DataTable
          headers={['Ano', 'Geral', 'Homens', 'Mulheres']}
          rows={[
            ['2000', '71,1', '67,3', '75,1'],
            ['2005', '72,2', '68,4', '76,1'],
            ['2010', '73,9', '70,1', '77,6'],
            ['2015', '75,4', '71,9', '78,9'],
            ['2019', '76,2', '72,7', '79,7'],
            ['2021 (Covid)', '72,8', '69,1', '76,5'],
            ['2023', '76,4', '73,1', '79,7'],
            ['2030 (proj.)', '78', '75', '81'],
            ['2040 (proj.)', '80', '77', '83'],
            ['2050 (proj.)', '82', '79', '85'],
            ['2070 (proj.)', '83,9', '81', '87'],
          ]}
          highlight={5}
        />

        <Callout type="danger">
          <strong>Impacto da pandemia:</strong> A COVID-19 causou recuo da expectativa de 76,2 anos (2019) para 72,8 anos (2021) — perda de 3,4 anos em 2 anos, o maior retrocesso da série histórica. Recuperação completa em 2023.
        </Callout>
      </Section>

      {/* Seção 5: Desemprego por faixa etária */}
      <Section num="5" title="Desemprego por faixa etária (PNAD 2025)">
        <Prose>
          <p>A desocupação é fortemente concentrada nos jovens — taxa 8,5× maior para 14–17 anos vs 60+. O desemprego juvenil de 18–24 anos atingiu mínimo histórico de 11,4% no 4º tri 2025, mas ainda é crítico comparado à média geral de 5,1%.</p>
        </Prose>

        <DataTable
          headers={['Faixa etária', '1º tri 2025', '4º tri 2024']}
          rows={[
            ['14–17 anos', '26,4%', '28,2%'],
            ['18–24 anos', '14,9%', '12,9%'],
            ['25–39 anos', '6,5%', '5,8%'],
            ['40–59 anos', '4,7%', '4,3%'],
            ['60+ anos', '3,1%', '3,0%'],
          ]}
          highlight={0}
        />

        <HorizBar items={[
          { label: '14–17 anos', value: 26.4, max: 30, color: '#D85A30', suffix: '%' },
          { label: '18–24 anos', value: 14.9, max: 30, color: '#D85A30', suffix: '%' },
          { label: '25–39 anos', value: 6.5, max: 30, color: '#BA7517', suffix: '%' },
          { label: '40–59 anos', value: 4.7, max: 30, color: '#185FA5', suffix: '%' },
          { label: '60+ anos', value: 3.1, max: 30, color: '#1D9E75', suffix: '%' },
        ]} />

        <Callout type="info">
          <strong>Disparidades regionais:</strong> No Nordeste, 23,7% dos jovens de 18–24 anos estão desempregados vs 10,1% no Sul. Informalidade afeta ~40% dos ocupados. Idosos (60+) com 3,1% de desemprego ainda têm baixa participação formal — oportunidade de aproveitamento da PEA sênior.
        </Callout>
      </Section>

      {/* Seção 6: Fluxo migratório */}
      <Section num="6" title="Fluxo migratório — entrada e saída">
        <Prose>
          <p>Brasil recebeu 194 mil novos migrantes em 2024, com venezuelanos liderando (49%). Simultaneamente, ~5 milhões de brasileiros vivem no exterior. Saldo positivo, mas insuficiente para compensar a queda da fecundidade.</p>
        </Prose>

        <DataTable
          headers={['Imigrantes no Brasil (Censo 2022)', 'Milhares']}
          rows={[
            ['Venezuela', '271,5'],
            ['Portugal', '104,3'],
            ['Bolívia', '80,3'],
            ['Paraguai', '58,3'],
            ['Haiti', '57,4'],
            ['Argentina', '42,6'],
          ]}
        />

        <DataTable
          headers={['Brasileiros no exterior (2023)', 'Milhões']}
          rows={[
            ['EUA', '2,08'],
            ['Portugal', '0,51'],
            ['Paraguai', '0,34'],
            ['Reino Unido', '0,27'],
            ['Japão', '0,22'],
            ['Outros', '1,57'],
          ]}
        />

        <Callout type="info">
          <strong>Contexto:</strong> De 2010 a 2024, o Brasil registrou 1,7 milhão de migrantes. Venezuelanos lideram (509 mil), seguidos por haitianos (183 mil) e bolivianos (112 mil). Imigrantes latinos são majoritariamente jovens e podem integrar-se à PEA — mas falta política migratória seletiva e ativa.
        </Callout>
      </Section>

      {/* Seção 7: Composição racial */}
      <Section num="7" title="Composição racial e diferenciais demográficos por raça/cor">
        <Prose>
          <p>O Censo 2022 mostrou pardos (45,3%) ultrapassando brancos (43,5%) pela 1ª vez desde 1991. Cada grupo apresenta pirâmide etária, mortalidade e fecundidade distintas — com impactos demográficos e socioeconômicos profundos.</p>
        </Prose>

        <HorizBar items={[
          { label: 'Pardos', value: 45.3, max: 50, color: '#534AB7', suffix: '% (92,1M)' },
          { label: 'Brancos', value: 43.5, max: 50, color: '#1D9E75', suffix: '% (88,2M)' },
          { label: 'Pretos', value: 10.2, max: 50, color: '#185FA5', suffix: '% (20,7M)' },
          { label: 'Indígenas', value: 0.8, max: 50, color: '#BA7517', suffix: '% (1,7M)' },
          { label: 'Amarelos', value: 0.4, max: 50, color: '#888780', suffix: '% (0,85M)' },
        ]} />

        <Callout type="info">
          <strong>Crescimento 2010–2022:</strong> Pretos +42,3%, Indígenas +89%, Pardos +22%. O crescimento indígena reflete parcialmente mudança na autodeclaração e metodologia.
        </Callout>

        <Prose><p><strong>Diferenciais demográficos por raça (índice relativo 0–100)</strong></p></Prose>
        <DataTable
          headers={['Indicador', 'Brancos', 'Pardos', 'Pretos']}
          rows={[
            ['Fecundidade relativa', '60', '80', '75'],
            ['Expectativa de vida', '85', '65', '55'],
            ['Mortalidade jovens', '30', '65', '100'],
            ['Envelhecimento pop.', '80', '55', '45'],
            ['Urbanização', '85', '70', '80'],
          ]}
        />

        <Prose><p><strong>Distribuição regional por raça predominante (%)</strong></p></Prose>
        <DataTable
          headers={['Região', 'Pardos (%)', 'Brancos (%)', 'Pretos (%)']}
          rows={[
            ['Norte', '67,2%', '20,7%', '8,0%'],
            ['Nordeste', '59,6%', '26,7%', '11,3%'],
            ['Centro-Oeste', '52,4%', '37,0%', '7,5%'],
            ['Sudeste', '38,7%', '49,9%', '9,0%'],
            ['Sul', '21,7%', '72,6%', '4,2%'],
          ]}
        />

        <Callout type="danger">
          <strong>Mortalidade diferencial:</strong> Homens negros têm taxa de mortalidade por violência ~3× maior que brancos. 76,9% das vítimas de morte violenta de 12–17 anos são negras. A população branca tem pirâmide mais envelhecida; pardos, estrutura mais jovem. Fecundidade é inversamente relacionada à renda — regiões com mais pardos/pretos (Norte, Nordeste) têm taxas de fecundidade maiores.
        </Callout>
      </Section>

      {/* Seção 8: Projeção racial */}
      <Section num="8" title="Projeção racial em 20 e 50 anos">
        <Prose>
          <p>Projeção baseada em: (a) maior fecundidade parda/preta; (b) maior mortalidade juvenil negra; (c) autodeclaração crescente como negro; (d) imigração latino-americana majoritariamente parda. Nota: o IBGE não divulga projeções oficiais por raça — estes são cenários estimados.</p>
        </Prose>

        <DataTable
          headers={['Grupo', '2000', '2010', '2022', '2030', '2045', '2060', '2075']}
          rows={[
            ['Pardos', '38,9%', '43,1%', '45,3%', '47,0%', '49,0%', '51,5%', '53,0%'],
            ['Brancos', '53,7%', '47,7%', '43,5%', '41,0%', '38,0%', '35,0%', '32,0%'],
            ['Pretos', '6,2%', '7,6%', '10,2%', '11,0%', '12,0%', '12,5%', '14,0%'],
            ['Outros', '1,2%', '1,6%', '1,2%', '1,0%', '1,0%', '1,0%', '1,0%'],
          ]}
        />

        <Callout type="info">
          <strong>Em 2045 (20 anos):</strong> pardos ~49%, brancos ~38%, pretos ~12%, outros ~1%.
          <br />
          <strong>Em 2075 (50 anos):</strong> pardos ~53%, brancos ~32%, pretos ~14%, outros ~1%.
          <br />
          Convergência demográfica acelerada por autodeclaração e fecundidade diferencial. Estimativas derivadas de tendências observadas — não são projeções oficiais do IBGE.
        </Callout>
      </Section>

      {/* Seção 9: Políticas públicas */}
      <Section num="9" title="Opções de políticas públicas — revertendo o declínio demográfico">
        <Prose>
          <p>Nenhum país desenvolvido reverteu queda da fecundidade abaixo de 1,5 com uma única política. Estratégias combinadas são necessárias. A Hungria gasta 5% do PIB em natalidade; o Canadá usa imigração seletiva como âncora fiscal.</p>
        </Prose>

        <InfoGrid columns={2}>
          <InfoCard title="Apoio à maternidade e paternidade" subtitle="Natalidade" color="#3B6D11">
            <p>Licença-maternidade/paternidade ampliada, creches universais gratuitas, auxílio-criança (tipo Baby Bonus). Reduzir o custo direto de ter filhos como política de Estado.</p>
            <p><strong>Impacto estimado:</strong> +0,05–0,15 filho/mulher em 10 anos (experiência europeia). Custo estimado: R$40–80 bilhões/ano. Hungria atingiu recuperação parcial com 5% do PIB investidos.</p>
          </InfoCard>

          <InfoCard title="Política migratória seletiva e ativa" subtitle="Imigração" color="#185FA5">
            <p>Atrair jovens qualificados (sistema de pontos por habilidade), facilitar reunificação familiar, criar visto de trabalho ágil, reconhecer diplomas estrangeiros com celeridade.</p>
            <p><strong>Impacto estimado:</strong> +100–300K imigrantes/ano poderia compensar parcialmente a queda da PEA. Canadá e Alemanha usam esse modelo como âncora fiscal e demográfica.</p>
          </InfoCard>

          <InfoCard title="Nova reforma previdenciária" subtitle="Previdência" color="#BA7517">
            <p>Indexar idade mínima à expectativa de vida, ampliar incentivos à capitalização privada, formalizar trabalhadores informais (40% da PEA não contribui ao INSS).</p>
            <p><strong>Impacto estimado:</strong> Banco Mundial projeta economia de R$2 trilhões em 30 anos. Cada 1 p.p. de formalização equivale a ~R$15 bilhões/ano de receita previdenciária adicional.</p>
          </InfoCard>

          <InfoCard title="Substituição demográfica por produtividade" subtitle="Produtividade" color="#D85A30">
            <p>Automação + IA, requalificação da força de trabalho envelhecida, incentivo à permanência do trabalhador sênior no mercado, redução do hiato de produtividade vs OCDE.</p>
            <p><strong>Impacto estimado:</strong> Japão compensa declínio demográfico com ganhos de produtividade. Brasil tem gap de ~40% vs OCDE — espaço enorme para crescer sem necessariamente mais pessoas.</p>
          </InfoCard>

          <InfoCard title="Reduzir mortalidade negra e violência" subtitle="Equidade racial" color="#3B6D11">
            <p>Políticas de segurança pública, acesso à saúde materno-infantil para negros, redução da mortalidade por causas externas (maior entre jovens negros do sexo masculino).</p>
            <p><strong>Impacto estimado:</strong> Salvar 30–50 mil vidas/ano de jovens negros manteria a PEA mais robusta. Efeito também na fecundidade — mulheres negras têm menos filhos em função de insegurança.</p>
          </InfoCard>

          <InfoCard title="Infraestrutura de cuidado e silver economy" subtitle="Cuidados" color="#185FA5">
            <p>Rede nacional de cuidados para idosos, desinstitucionalização, aproveitamento produtivo da geração 60+ (silver economy), liberando cuidadores para o mercado formal.</p>
            <p><strong>Impacto estimado:</strong> Em 2050 haverá 60M+ de idosos. Mercado de longevidade pode gerar R$500 bilhões/ano em serviços especializados. Libera ~8M de cuidadoras (maioria mulheres) para o mercado.</p>
          </InfoCard>
        </InfoGrid>
      </Section>

    </ReportShell>
  );
}
