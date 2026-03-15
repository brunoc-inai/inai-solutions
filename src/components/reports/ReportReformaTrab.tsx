import ReportShell, {
  Section, StatGrid, StatCard, DataTable, Callout, BarChart, HorizBar,
  Prose, QuoteBlock, ScenarioGrid, FactorCard, Timeline,
  SensitivityMatrix, InfoGrid, InfoCard
} from './ReportShell';

export default function ReportReformaTrab({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Super Reforma Trabalhista"
      eyebrow="Reforma Trabalhista + Break-even Fiscal"
      color="#6D28D9"
      onClose={onClose}
    >
      {/* ================================================================== */}
      {/*  PARTE 1 — SUPER REFORMA TRABALHISTA (Diagnóstico + Componentes)   */}
      {/* ================================================================== */}

      {/* --- 1. DIAGNÓSTICO --- */}
      <Section num="01" title="Diagnóstico — Quanto custa o trabalho formal no Brasil">
        <Prose>
          <p>
            Antes de discutir reforma, é preciso entender o problema com precisão. O Brasil não tem apenas
            uma CLT complexa — tem uma estrutura de encargos que torna o custo do trabalho formal
            sistematicamente proibitivo, especialmente para pequenas empresas fora do Simples Nacional.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="68" unit="%" label="Encargos sobre salário (Lucro Real) — INSS 20% + RAT + Sistema S + 13o + férias + FGTS" color="#DC2626" />
          <StatCard value="33" unit="%" label="Encargos sobre salário (Simples Nacional)" color="#D97706" />
          <StatCard value="39" unit="%" label="Taxa de informalidade em 2025 — ~39 milhões de trabalhadores informais (IBGE)" color="#6D28D9" />
          <StatCard value="183" unit="%" label="Custo total vs. salário nominal (máximo, incluindo benefícios, provisões e rescisão)" color="#DC2626" />
        </StatGrid>

        <DataTable
          headers={['Encargo', 'Lucro Real (%)', 'Simples Nacional (%)']}
          rows={[
            ['INSS Patronal', '20,0', '0'],
            ['FGTS (8%)', '8,0', '8,0'],
            ['13o Salário', '8,3', '8,3'],
            ['Férias + 1/3', '11,0', '11,0'],
            ['Sistema S / Outros', '5,8', '0'],
            ['Multa Rescisória (provisão)', '5,0', '5,0'],
            ['Total', '58,1', '32,3'],
          ]}
          highlight={6}
        />

        <Callout type="info">
          O paradoxo do custo não-salarial: para um trabalhador que recebe R$3.000 de salário, a empresa
          no Lucro Real paga ~R$4.100/mês. O trabalhador recebe ~R$2.400 líquido. Ou seja: a empresa paga
          R$4.100 e o trabalhador recebe R$2.400 — R$1.700 ficam no sistema tributário e previdenciário.
          Em países da OCDE o mesmo diferencial é R$900–R$1.100.
        </Callout>

        <DataTable
          headers={['País', 'Encargos patronais (% folha)', 'Encargos total (%)', 'Informalidade']}
          rows={[
            ['Brasil (Lucro Real)', '~28–30%', '~68%', '39%'],
            ['Colômbia (pós-2012)', '16%', '~45%', '~55%'],
            ['Chile', '~23%', '~46%', '~25%'],
            ['México', '~22–25%', '~50%', '~55%'],
            ['Alemanha', '~20%', '~40%', '~10%'],
            ['Cingapura', '~17%', '~37%', '~8%'],
            ['Média OCDE', '~18%', '~38%', '~14%'],
          ]}
        />

        <Prose>
          <p>
            O Brasil tem o maior 13o salário obrigatório do mundo (equivalente a 8,3% do custo anual), um dos
            maiores adicionais de férias (33%), FGTS sem paralelo internacional (8% + multa 40%), e ainda o
            Sistema S — entidades parafiscais que recolhem ~5,8% da folha sem contrapartida mensurável à
            produtividade empresarial. Somado tudo, o Brasil lidera o ranking de custo não-salarial entre
            economias emergentes.
          </p>
        </Prose>

        <Callout type="warn">
          A CLT foi escrita em 1943 por Getúlio Vargas, copiando legislação corporativista italiana da era
          Mussolini. Ela foi desenhada para uma economia industrial fordista com empresas grandes e emprego
          vitalício. Em 2026, onde 40% do emprego é por serviços, gig economy e tecnologia, ela cria
          distorções estruturais — e gera um exército de trabalhadores que fogem para informalidade ou
          "pejotização" justamente por ser onerosa demais.
        </Callout>
      </Section>

      {/* --- 2. O QUE SERIA A SUPER REFORMA --- */}
      <Section num="02" title="O que seria a Super Reforma Trabalhista">
        <Prose>
          <p>
            A "Super Reforma" não é um conceito único — é um espectro de intervenções que vai da moderada
            à radical. Para efeito desta análise, mapeamos 3 versões com intensidade crescente:
          </p>
        </Prose>

        <ScenarioGrid scenarios={[
          {
            title: 'Bronze — Reforma Incremental',
            color: '#2563EB',
            items: [
              'Redução de encargos em 10–15%',
              'Simplificação processual',
              'Flexibilização de jornada',
              'Custo: R$40–60bi/ano',
            ],
          },
          {
            title: 'Prata — Reforma Estrutural',
            color: '#D97706',
            items: [
              'Redução de 25–35% dos encargos',
              'Reforma do Sistema S',
              'Fim da multa 40% FGTS',
              'Custo: R$100–150bi/ano',
            ],
          },
          {
            title: 'Ouro — Reforma Total (Super)',
            color: '#059669',
            items: [
              'CLT opcional/modernizada',
              'Desonerar folha -50%',
              'Nova arquitetura previdenciária',
              'Custo: R$200–350bi/ano',
            ],
          },
        ]} />

        <Prose>
          <p><strong>Componentes da Super Reforma (versão Ouro):</strong></p>
        </Prose>

        <FactorCard
          title="1. Extinção ou reestruturação do Sistema S"
          score="ALTO"
          scoreLabel=" impacto"
          color="#059669"
          tags={['Resistência ALTA', 'SESI/SENAI/SESC/SENAC/SEBRAE/INCRA']}
        >
          <Prose>
            <p>
              Recolhem ~5,8% da folha. Orçamento combinado ~R$25bi/ano com baixíssima auditoria pública.
              Reforma = manutenção de SENAI (eficiente) + extinção/fusão dos demais.
            </p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="2. Fim ou reestruturação da multa de 40% do FGTS"
          score="ALTO"
          scoreLabel=" impacto"
          color="#059669"
          tags={['Resistência MÉDIA']}
        >
          <Prose>
            <p>
              A multa rescisória é um desincentivo à contratação formal: empresas evitam contratar para não
              ter de demitir com custo. Substituição por seguro-desemprego ampliado e portabilidade do FGTS
              reduz o "medo de contratar".
            </p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="3. Redução da contribuição patronal ao INSS (20% para 10–12%)"
          score="EXTREMO"
          scoreLabel=" impacto"
          color="#059669"
          tags={['Resistência MÁXIMA', 'Libera ~R$80–100bi/ano']}
        >
          <Prose>
            <p>
              Maior item individual do custo patronal. Uma redução para 12% libera ~R$80–100bi/ano para
              empresas. Exige compensação via outros tributos ou corte de gastos previdenciários.
            </p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="4. Modernização dos contratos: CLT como piso, não teto"
          score="MED-ALTO"
          scoreLabel=" impacto"
          color="#D97706"
          tags={['Resistência ALTA', 'Negociação individual acima de 2 SM']}
        >
          <Prose>
            <p>
              Preservar direitos mínimos (salário mínimo, segurança, FGTS básico) mas permitir negociação
              de tudo mais via acordo individual documentado para faixas salariais acima de 2 salários mínimos.
            </p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="5. Redução ou eliminação do adicional de 1/3 de férias"
          score="MED"
          scoreLabel=" impacto"
          color="#2563EB"
          tags={['Resistência MÁXIMA', '~4% do custo anual']}
        >
          <Prose>
            <p>
              O adicional de férias é incomum internacionalmente — equivale a ~4% do custo anual sem
              contrapartida em produtividade. Pode ser negociado por outras formas de remuneração variável.
            </p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="6. Desjudicialização: acordos extrajudiciais plenos"
          score="ALTO"
          scoreLabel=" impacto"
          color="#059669"
          tags={['Resistência MÉDIA', '+4 milhões de processos pendentes']}
        >
          <Prose>
            <p>
              O Brasil tem mais de 4 milhões de processos trabalhistas pendentes. Criar câmaras arbitrais
              obrigatórias para conflitos trabalhistas reduz passivo oculto das empresas — que hoje precificam
              litígio no custo de contratação.
            </p>
          </Prose>
        </FactorCard>

        <FactorCard
          title="7. Extinção do 13o salário obrigatório (mensalização)"
          score="MED"
          scoreLabel=" impacto"
          color="#2563EB"
          tags={['Resistência MÉDIA', 'Direito preservado, timing mudado']}
        >
          <Prose>
            <p>
              Converter o 13o em salário mensal adicional de 8,3% — sem criar uma despesa concentrada em
              dezembro que gera problemas de fluxo de caixa para PMEs.
            </p>
          </Prose>
        </FactorCard>
      </Section>

      {/* --- 3. IMPACTO FISCAL --- */}
      <Section num="03" title="Impacto nas Contas Públicas">
        <Prose>
          <p>
            Este é o ponto mais crítico e o que torna a reforma difícil de implementar em cenário de déficit
            primário. A renúncia fiscal de uma Super Reforma é da ordem de R$200–350bi/ano — equivalente a
            cortar 4–7% do PIB de arrecadação.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="R$200" unit="bi" label="Renúncia estimada (versão Bronze/Prata) — Redução 25–35% dos encargos" color="#DC2626" />
          <StatCard value="R$350" unit="bi" label="Renúncia estimada (versão Ouro) — Desonerar 50%+ dos encargos patronais" color="#DC2626" />
          <StatCard value="R$137" unit="bi" label="Custo acumulado da desoneração setorial 2012–2022 (IPEA)" color="#D97706" />
          <StatCard value="~R$1,8" unit="tri" label="Estimativa folha de pagamento total Brasil (base de cálculo)" color="#2563EB" />
        </StatGrid>

        <DataTable
          headers={['Possível compensação', 'Potencial anual', 'Viabilidade', 'Nota']}
          rows={[
            ['Tributação de dividendos (IRPF)', 'R$30–40bi', 'Alta', 'Em discussão; estimativa FGV/Ipea ~R$34bi'],
            ['Tributação de offshores/fundos exclusivos', 'R$10–20bi', 'Alta', 'Aprovado parcialmente; pode ampliar'],
            ['Reforma/extinção do Sistema S', 'R$20–25bi', 'Média', 'Resistência do "Centrão" industrialista'],
            ['IVA sobre serviços de alta renda', 'R$15–25bi', 'Média', 'Parte da Reforma Tributária LC 214/2024'],
            ['Contribuição social sobre grandes lucros', 'R$20–35bi', 'Média', 'Politicamente palatável à esquerda'],
            ['Corte de gastos previdenciários', 'R$50–100bi', 'Baixa', 'Requer reforma previdenciária adicional'],
            ['Total compensação viável (otimista)', 'R$95–145bi', 'Parcial', 'Cobre Bronze/Prata. Ouro requer mais'],
          ]}
          highlight={6}
        />

        <Callout type="danger">
          O problema de timing fiscal: a renúncia é imediata — aparece no caixa no mês seguinte. O retorno
          (mais emprego formal, mais IRPF, mais consumo, mais ICMS) leva 3–5 anos para se materializar.
          Em um país com dívida/PIB de ~87% e necessidade de resultado primário positivo, esse gap temporal
          é o principal obstáculo político à reforma.
        </Callout>

        <Prose>
          <p>
            <strong>Efeito fiscal de segunda ordem (que o modelo estático ignora):</strong> Se a reforma gera
            formalização de 10% dos 39 milhões de informais, o retorno é: 3,9 milhões de novos trabalhadores
            formais gerando ~R$30–50bi em INSS + FGTS + IRPF adicionais/ano; aumento do consumo formal
            gerando R$15–25bi em tributos sobre consumo; e redução de passivo trabalhista judicial aliviando
            R$10–20bi/ano em sistema judiciário.
          </p>
          <p>
            O horizonte de 5–7 anos pode tornar a reforma fiscalmente autossustentável, mas exige
            financiamento transitório — o que o atual quadro fiscal não permite sem fontes explícitas de
            compensação.
          </p>
        </Prose>
      </Section>

      {/* --- 4. IMPACTO NO PIB --- */}
      <Section num="04" title="Impacto no PIB">
        <Prose>
          <p>
            A relação entre reforma trabalhista e PIB é mediada por múltiplos canais. Os efeitos diretos
            são relativamente rápidos; os indiretos, mais lentos mas maiores.
          </p>
        </Prose>

        <HorizBar items={[
          { label: 'Sem reforma (base)', value: 0, max: 10.5, color: '#9CA3AF' },
          { label: 'Bronze (2–4 anos)', value: 1.5, max: 10.5, color: '#3B82F6', suffix: '% PIB' },
          { label: 'Prata (5–7 anos)', value: 4.5, max: 10.5, color: '#F59E0B', suffix: '% PIB' },
          { label: 'Ouro (8–12 anos)', value: 10.5, max: 10.5, color: '#059669', suffix: '% PIB' },
        ]} />

        <DataTable
          headers={['Canal', 'Mecanismo', 'Prazo', 'Magnitude']}
          rows={[
            ['Redução do custo do trabalho', 'Empresas expandem produção com mesmo capital', '1–2 anos', '+0,3–0,5% PIB/ano'],
            ['Formalização da informalidade', 'Trabalhadores saem da sombra, aumentam produtividade', '3–5 anos', '+0,5–1,0% PIB/ano'],
            ['Atração de FDI', 'Custo de trabalho competitivo atrai manufatura', '2–4 anos', '+0,2–0,5% PIB/ano'],
            ['Expansão de serviços intensivos', 'Hospitais, restaurantes, varejo crescem formalmente', '1–3 anos', '+0,2–0,4% PIB/ano'],
            ['Multiplicador via consumo', 'Renda disponível → investimento → consumo', '2–4 anos', '+0,3–0,6% PIB/ano'],
            ['Total (reforma estrutural)', '—', '5–7 anos', '+1,5–3,0% PIB adicional'],
          ]}
          highlight={5}
        />

        <Callout type="ok">
          Benchmark Colômbia (2012): A redução da contribuição patronal de 29,5% para 16% para
          trabalhadores com salário inferior a 10 salários mínimos gerou formalização mensurável. Foi a
          reforma mais bem-sucedida da região em termos de redução de informalidade — ao contrário das
          reformas argentina e chilena, que reduziram encargos sem focalização e não tiveram efeito no
          emprego formal.
        </Callout>

        <Prose>
          <p>
            A lição da Colômbia é crucial: a focalização importa mais que a magnitude. Desonerar sobre
            salários próximos ao mínimo (onde o custo não-salarial representa maior proporção do custo total)
            é mais eficiente do que desonerar uniformemente toda a folha. O efeito-emprego é maior, o custo
            fiscal por posto de trabalho criado é menor.
          </p>
        </Prose>
      </Section>

      {/* --- 5. EMPREGO E FORMALIZAÇÃO --- */}
      <Section num="05" title="Impacto no Emprego e na Formalização">
        <Prose>
          <p>
            Este é o ponto mais debatido — e onde a evidência empírica é mais incômoda para os defensores
            de reformas simples. A história mostra que desonerar a folha não garante mais emprego. O que
            determina o resultado é como e sobre quem incide a desonera.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="39" unit="mi" label="Trabalhadores informais no Brasil (2025) — estável há 3 anos" color="#6D28D9" />
          <StatCard value="38" unit="%" label="Taxa de informalidade total — EUA: ~10% / Alemanha: ~10% / Chile: ~25%" color="#D97706" />
          <StatCard value="-34" unit="%" label="Queda nos auditores fiscais do trabalho (2012–2024) — 1 auditor para 34.260 assalariados" color="#DC2626" />
          <StatCard value="0" unit="" label="Efeito da desoneração de 2012 sobre emprego — resultado Ipea/FGV: nulo ou marginal" color="#059669" />
        </StatGrid>

        <DataTable
          headers={['País', 'Medida', 'Resultado no emprego', 'Resultado no salário']}
          rows={[
            ['EUA', 'Reduções de payroll tax', 'Nulo', '+Salário'],
            ['Chile', 'Reforma previdenciária', 'Nulo', '+Salário'],
            ['Argentina', 'Desoneração parcial', 'Nulo', 'Neutro'],
            ['Brasil 2012–2022', 'Desoneração 17 setores', 'Nulo / negativo', 'Neutro'],
            ['Colômbia 2012', 'Redução contribuição (baixos salários)', '+Positivo', '+Salário'],
            ['França', 'Desonera salário mínimo', '+Positivo (baixo)', 'Neutro'],
          ]}
        />

        <Callout type="info">
          Por que a desonera frequentemente não gera emprego novo? Na prática: (1) se os trabalhadores
          percebem o benefício como equivalente ao salário, negociam reajuste — o benefício é absorvido em
          renda, não em emprego; (2) a desonera incide sobre toda a folha existente, não só sobre novas
          contratações — a empresa economiza sem precisar contratar. O modelo colombiano corrigiu isso ao
          focar na faixa salarial onde o custo não-salarial é mais distorsivo.
        </Callout>

        <DataTable
          headers={['Ano', 'Sem reforma (%)', 'Bronze (%)', 'Prata (%)', 'Ouro (%)']}
          rows={[
            ['2026', '39,0', '39,0', '39,0', '39,0'],
            ['2027', '38,8', '38,5', '38,0', '37,5'],
            ['2028', '38,5', '37,5', '36,5', '35,5'],
            ['2029', '38,3', '36,5', '35,0', '33,0'],
            ['2030', '38,0', '35,5', '33,0', '30,0'],
            ['2031', '37,8', '34,5', '31,0', '27,0'],
            ['2032', '37,5', '33,5', '29,0', '24,0'],
            ['2033', '37,2', '32,5', '27,0', '21,0'],
          ]}
        />

        <Prose>
          <p>
            A maior alavanca de formalização não é a desonera per se — é a combinação de encargos menores +
            fiscalização efetiva. O Ipea mostra que o Brasil tem menos da metade dos auditores fiscais do
            trabalho recomendados pela OIT. Paradoxalmente, um dos investimentos mais baratos e rápidos em
            formalização seria recontratar 1.350 auditores fiscais — com impacto fiscal positivo (retorno em
            arrecadação superior ao custo).
          </p>
        </Prose>
      </Section>

      {/* --- 6. IMPACTO NAS EMPRESAS --- */}
      <Section num="06" title="Impacto nas Empresas">
        <Prose>
          <p>
            O impacto da Super Reforma nas empresas varia dramaticamente por porte, setor e modelo de
            negócio. Não existe uma empresa genérica — existe uma estrutura de vencedores e perdedores em
            cada versão da reforma.
          </p>
        </Prose>

        <DataTable
          headers={['Tipo de Empresa', 'Situação atual', 'Ganho Bronze', 'Ganho Ouro']}
          rows={[
            ['PME — Simples Nacional', 'Encargos ~33% / Risco trabalhista alto', 'Médio', 'Alto'],
            ['Indústria Lucro Real (intensiva mão-de-obra)', 'Encargos ~68% / Custo R$4–5k/mês', 'Alto', 'Extremo'],
            ['Serviços técnicos / tech', '"Pejotização" como saída / Risco passivo', 'Médio', 'Alto'],
            ['Varejo e hospitalidade', 'Alta rotatividade / Custo rescisório elevado', 'Alto', 'Extremo'],
            ['Agro e exportação', 'Custos em BRL / Competitividade cambial', 'Médio', 'Alto'],
            ['Startups e escala', 'PLR e equity limitados por CLT', 'Médio', 'Alto'],
          ]}
        />

        <StatGrid>
          <StatCard value="R$380" unit="/mês" label="Economia por funcionário — Bronze (Redução ~10% encargos, salário R$3k)" color="#2563EB" />
          <StatCard value="R$720" unit="/mês" label="Economia por funcionário — Prata (Redução ~25% encargos, salário R$3k)" color="#D97706" />
          <StatCard value="R$1.200" unit="/mês" label="Economia por funcionário — Ouro (Redução ~40% encargos, salário R$3k)" color="#059669" />
          <StatCard value="R$720k" unit="/ano" label="Empresa com 50 funcionários — economia anual Prata" color="#6D28D9" />
        </StatGrid>

        <Callout type="ok">
          O efeito mais importante: redução do passivo oculto. Hoje, toda empresa com funcionários CLT
          carrega um "passivo trabalhista potencial" oculto no balanço — processos judiciais em andamento ou
          potenciais. Esse passivo chega a representar 15–25% da folha anual de empresas com alta
          rotatividade. A desjudicialização e a simplificação das regras rescisórias têm impacto direto no
          custo de capital e na precificação de riscos.
        </Callout>

        <Prose>
          <p>
            <strong>Risco setorial — quem pode perder:</strong> As entidades do Sistema S são,
            simultaneamente, beneficiárias dos encargos e prestadoras de serviços reais. Uma reforma mal
            desenhada que extingue o Sistema S sem substituição cria lacuna em qualificação técnica —
            especialmente o SENAI, que forma 2,4 milhões de técnicos/ano. Qualquer reforma precisa preservar
            a função, mesmo cortando o financiamento compulsório.
          </p>
        </Prose>
      </Section>

      {/* --- 7. COMPETITIVIDADE INTERNACIONAL --- */}
      <Section num="07" title="Impacto na Competitividade Internacional">
        <Prose>
          <p>
            A competitividade do trabalho brasileiro em dólar é curiosamente boa — o real desvalorizado torna
            o salário barato em moeda forte. O problema não é o salário em dólar: é o custo de compliance,
            o passivo judicial e a rigidez que afugentam FDI em manufatura.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="68o/69" unit="" label="Eficiência de negócios (IMD 2025) — Encargos e rigidez trabalhista são subfator crítico" color="#DC2626" />
          <StatCard value="5o" unit="" label="Destino global de FDI (UNCTAD 2023) — Capital entra mas não fica em manufatura" color="#059669" />
          <StatCard value="1.500" unit="h" label="Horas/ano em compliance trabalhista — OCDE: ~160h" color="#DC2626" />
          <StatCard value="40–60" unit="%" label="Gap de produtividade industrial vs. média global" color="#D97706" />
        </StatGrid>

        <DataTable
          headers={['Setor', 'Impacto da reforma', 'Mecanismo', 'Janela']}
          rows={[
            ['Manufatura leve (têxtil, calçados, eletro)', 'ALTO', 'Custo/hora cai 30–40% — competitivo com México', '2–3 anos'],
            ['Serviços de TI e BPO exportados', 'ALTO', '"Pejotização" regularizada — escala sem risco legal', '1–2 anos'],
            ['Construção civil', 'ALTO', 'Maior setor informal no Brasil — formalização barata', '2–4 anos'],
            ['Agro-industrial', 'MÉDIO', 'Sazonalidade acomodada por contratos flexíveis', '1–2 anos'],
            ['Nearshoring para América Latina', 'ALTO', 'SP-MG têm maior cluster de engenheiros da AL', '3–5 anos'],
          ]}
        />

        <Callout type="info">
          O argumento do nearshoring pós-USMCA: Com a reconfiguração de cadeias pós-pandemia, o Brasil
          compete com México pelo papel de "fábrica das Américas". O México tem vantagem geográfica
          irreversível (fronteira com os EUA), mas o Brasil tem: maior mercado interno, mais energia limpa,
          mais engenheiros. O único fator onde o México vence claramente é no custo de compliance trabalhista.
          Uma Super Reforma anula essa desvantagem.
        </Callout>
      </Section>

      {/* --- 8. FEASIBILITY POLÍTICA --- */}
      <Section num="08" title="Feasibility Política">
        <Prose>
          <p>
            A pergunta mais honesta sobre qualquer reforma estrutural no Brasil não é "ela funcionaria?" —
            é "ela sobreviveria ao processo político?"
          </p>
        </Prose>

        <ScenarioGrid scenarios={[
          {
            title: 'Bronze — FACTÍVEL em 2–3 anos',
            color: '#2563EB',
            items: [
              'Já tem precedente: reforma 2017 passou',
              'Simplificação processual: apoio bipartidário',
              'Desonera setorial ampliada: base legislativa existe',
              'Risco: fragmentação legislativa dilui medidas',
            ],
          },
          {
            title: 'Prata — DIFÍCIL, horizonte 4–6 anos',
            color: '#D97706',
            items: [
              'Exige PEC para mudanças constitucionais',
              'Sistema S: oposição da CNI e CNC',
              'Resistência sindical intensa (perda de contribuição)',
              'Viável com governo de centro-direita forte',
            ],
          },
          {
            title: 'Ouro — IMPRATICÁVEL sem crise fiscal',
            color: '#DC2626',
            items: [
              'Exige PEC + aprovação em 3/5 em dois turnos',
              'INSS patronal: requer reforma previdenciária adicional',
              'Custo fiscal sem compensação = inconstitucional (LRF)',
              '13o: símbolo cultural e político — intocável',
              'Férias + adicional 1/3: protegido no art. 7o da CF/88',
              'Cenário de crise econômica severa pode criar janela',
            ],
          },
        ]} />

        <Prose>
          <p>
            <strong>A aritmética do Congresso:</strong> Para PEC, precisa de 308 votos na Câmara e 49 no
            Senado (3/5 de cada casa, em 2 turnos). O "Centrão" tende a bloquear reformas que retirem
            benefícios do Sistema S. A CNI apoia desonera mas não quer perder o SENAI. Os sindicatos perdem
            receita com qualquer flexibilização. O governo de plantão sempre paga custo político sem ver os
            benefícios no mandato. A janela política existe apenas em crises — o Brasil historicamente só
            reforma quando quebra ou quase.
          </p>
        </Prose>

        <Callout type="warn">
          Lição da Argentina: Milei fez em 6 meses o que a Argentina não fez em 20 anos — não porque tinha
          mais votos, mas porque a crise era tão severa que o status quo ficou mais caro que a reforma. O
          Brasil não está lá. Mas a trajetória fiscal e a informalidade crescente podem criar, em 4–6 anos,
          uma janela de urgência similar.
        </Callout>
      </Section>

      {/* --- 9. CENÁRIOS E SÍNTESE (super_reforma) --- */}
      <Section num="09" title="Cenários e Síntese">
        <InfoGrid columns={3}>
          <InfoCard title="Reforma Incremental" subtitle="Cenário mais provável (2027–2029)" color="#2563EB">
            <Prose>
              <p>
                Desonera setorial ampliada. Simplificação da Justiça do Trabalho. Flexibilização contratual
                para faixas altas. Sem PEC.
              </p>
              <p>
                <strong>PIB:</strong> +0,4–0,7% adicional<br/>
                <strong>Formalização:</strong> +2–3mi trabalhadores (5–7 anos)<br/>
                <strong>Custo fiscal:</strong> R$40–80bi/ano
              </p>
            </Prose>
          </InfoCard>
          <InfoCard title="Reforma Estrutural" subtitle="Cenário otimista (2029–2032)" color="#D97706">
            <Prose>
              <p>
                Reforma do Sistema S. Redução INSS patronal para 14%. Fim multa 40% FGTS. PEC aprovada.
              </p>
              <p>
                <strong>PIB:</strong> +1,0–1,8% adicional<br/>
                <strong>Formalização:</strong> +6–10mi trabalhadores (10 anos)<br/>
                <strong>Custo fiscal:</strong> R$100–180bi/ano (compensado por dividendos)
              </p>
            </Prose>
          </InfoCard>
          <InfoCard title="Super Reforma" subtitle="Cenário de crise (pós-2030)" color="#059669">
            <Prose>
              <p>
                INSS patronal a 10%. CLT como piso. 13o mensalizado. Sistema S extinto/privatizado.
              </p>
              <p>
                <strong>PIB:</strong> +2,5–4,0% adicional (10 anos)<br/>
                <strong>Formalização:</strong> +12–18mi trabalhadores<br/>
                <strong>Competitividade:</strong> top 40 IMD até 2035
              </p>
            </Prose>
          </InfoCard>
        </InfoGrid>

        <DataTable
          headers={['#', 'Medida', 'Impacto', 'Custo fiscal', 'Feasibility', 'ROI']}
          rows={[
            ['1', 'Recontratar auditores fiscais do trabalho (900–1.350)', 'ALTO', 'BAIXO', 'ALTA', 'Excepcional'],
            ['2', 'Focalizar desonera em salários até 2 SM (modelo colombiano)', 'ALTO', 'MÉDIO', 'MÉDIA', 'Alto'],
            ['3', 'Desjudicialização (câmaras arbitrais trabalho)', 'ALTO', 'BAIXO', 'ALTA', 'Alto'],
            ['4', 'Reforma do Sistema S (manter SENAI, fundir/extinguir demais)', 'MÉDIO', 'ZERO', 'MÉDIA', 'Alto'],
            ['5', 'Fim da multa 40% FGTS — seguro-desemprego ampliado', 'ALTO', 'MÉDIO', 'MÉDIA', 'Médio-Alto'],
            ['6', 'Redução INSS patronal 20% para 14% (geral)', 'ALTO', 'ALTO', 'MÉDIA', 'Médio'],
            ['7', 'CLT opcional acima de 2 SM (negociação individual)', 'MÉDIO', 'BAIXO', 'BAIXA', 'Médio'],
            ['8', 'Extinção do adicional de 1/3 de férias', 'BAIXO', 'MÉDIO', 'MUITO BAIXA', 'Baixo'],
            ['9', 'Mensalização do 13o', 'BAIXO', 'ZERO', 'MUITO BAIXA', 'Médio (fluxo PME)'],
          ]}
        />

        <Callout type="info">
          A resposta honesta à pergunta "vale a pena?": Sim — mas com quatro condições que nenhum governo
          brasileiro nunca cumpriu ao mesmo tempo: (1) fonte de compensação fiscal explícita e credível;
          (2) focalização da desonera em baixos salários, não em toda a folha; (3) fiscalização ampliada
          concomitante (mais auditores, não menos); (4) horizonte de 10 anos com continuidade entre governos.
        </Callout>

        <Callout type="warn">
          O paradoxo central da reforma trabalhista brasileira: A CLT foi desenhada para proteger
          trabalhadores. Na prática, protege apenas os 61% que têm carteira assinada — e deixa os 39%
          informais completamente desprotegidos. Uma Super Reforma que reduza custos e aumente fiscalização
          beneficia mais os trabalhadores mais vulneráveis (informais) do que os que já têm emprego formal.
          É o argumento mais poderoso politicamente — e o menos usado.
        </Callout>
      </Section>

      {/* ================================================================== */}
      {/*  PARTE 2 — BREAK-EVEN FISCAL (Modelo Ano a Ano)                   */}
      {/* ================================================================== */}

      {/* --- 10. PREMISSAS DO MODELO --- */}
      <Section num="10" title="Break-even Fiscal — Premissas do Modelo">
        <Prose>
          <p>
            O modelo projeta o saldo fiscal líquido a cada ano: (custo da reforma trabalhista) menos
            (economia da reforma previdenciária) menos (receita adicional gerada pelo crescimento do PIB)
            menos (dividendo de formalização). O break-even anual é quando o saldo daquele ano passa a ser
            superavitário. O break-even acumulado (payback total) é quando o somatório dos déficits anteriores
            é zerado pelos superávits posteriores.
          </p>
          <p>
            <strong>Fórmula:</strong> Gap_anual = Custo_RT - Economia_RP - (PIBnivel% x PIB_base x 0,33) - Dividendo_Formalizacao
          </p>
          <p>
            Break-even anual: Gap_anual &lt; 0 (ano em que a reforma começa a gerar superávit).
            Break-even acumulado: Soma(Gap_t) = 0 (ano em que a dívida fiscal acumulada é zerada).
          </p>
        </Prose>

        <InfoGrid columns={2}>
          <InfoCard title="Reforma Previdenciária (nova, além de 2019)" color="#0D9488">
            <Prose>
              <p>
                Referência: Tafner/Giambiagi — R$875bi em 10 anos. Ramp-up gradual (idades mínimas maiores
                levam tempo). Ano 1: R$30bi / Ano 2: R$55bi / Ano 3: R$75bi / Ano 4: R$88bi / Ano 5+:
                R$95–108bi/ano plateau.
              </p>
            </Prose>
          </InfoCard>
          <InfoCard title="Impacto no PIB (prêmio de nível anual sobre baseline)" color="#2563EB">
            <Prose>
              <p>
                Bronze: +0,25% a +1,35% (Ano 1 a Ano 5). Prata: +0,40% a +3,10% (Ano 1 a Ano 5).
                Ouro: +0,35% a +6,10% (Ano 1 a Ano 10). Elasticidade receita/PIB: 33% (carga tributária média).
              </p>
            </Prose>
          </InfoCard>
          <InfoCard title="Dividendo de Formalização (receita adicional INSS/IR)" color="#059669">
            <Prose>
              <p>
                Bronze: +R$4bi a +R$21bi (Ano 1 a Ano 5). Prata: +R$8bi a +R$58bi (Ano 1 a Ano 5).
                Ouro: +R$12bi a +R$145bi (Ano 1 a Ano 10). Baseado em formalização de 2–18mi trabalhadores.
              </p>
            </Prose>
          </InfoCard>
          <InfoCard title="Custo Anual da Reforma Trabalhista (renúncia fiscal)" color="#DC2626">
            <Prose>
              <p>
                Bronze (incremental): R$50bi/ano — imediato. Prata (estrutural): R$120bi/ano — imediato.
                Ouro (super reforma): R$280bi/ano — imediato. Custos não incluem implementação regulatória.
              </p>
            </Prose>
          </InfoCard>
        </InfoGrid>

        <Callout type="warn">
          Premissa central e seu risco: O modelo assume que os ganhos de PIB se materializam de forma gradual
          mas contínua e que a reforma previdenciária tem ramp-up conforme histórico da EC 103/2019. O maior
          risco de downside é o efeito-PIB ser menor (reforma trabalhista sem focalização adequada, como no
          caso brasileiro de 2012) e o maior risco de upside é a formalização ser mais rápida do que o
          esperado. Para Ouro, o custo de carregamento do déficit acumulado (juros da dívida) pode atrasar
          o payback — modelado separadamente.
        </Callout>
      </Section>

      {/* --- 11. CENÁRIO BRONZE — ANO A ANO --- */}
      <Section num="11" title="Modelo Ano a Ano — Bronze (R$50bi/ano)">
        <StatGrid>
          <StatCard value="~1,7" unit=" anos" label="Break-even acumulado (payback total)" color="#2563EB" />
          <StatCard value="Ano 2" unit="" label="Break-even anual (superávit recorrente)" color="#0D9488" />
          <StatCard value="R$6,9" unit="bi" label="Déficit máximo acumulado (pico Ano 1)" color="#DC2626" />
          <StatCard value="R$500" unit="bi+" label="Superávit acumulado projetado Ano 10" color="#059669" />
        </StatGrid>

        <Prose>
          <p>
            A Reforma Bronze é a prova de conceito financeira mais robusta. A economia previdenciária
            (~R$30bi no Ano 1) cobre quase toda a renúncia fiscal (~R$50bi), e os ganhos de PIB e
            formalização zeram o gap já em menos de 2 anos. A partir do Ano 2, gera superávit líquido
            crescente — a reforma literalmente se paga.
          </p>
        </Prose>

        <DataTable
          headers={['Ano', 'PIB Base (R$tri)', 'Custo RT', 'Ec. Previd.', 'Receita PIB', 'Div. Formal.', 'Gap Anual', 'Gap Acumulado']}
          rows={[
            ['1', '11,0', '-50,0', '+30,0', '+9,1', '+4,0', '+6,9', '+6,9'],
            ['2', '11,6', '-50,0', '+55,0', '+21,1', '+8,0', '-34,1', '-27,2'],
            ['3', '12,2', '-50,0', '+75,0', '+34,2', '+13,0', '-72,2', '-99,4'],
            ['4', '12,9', '-50,0', '+88,0', '+46,7', '+17,0', '-101,7', '-201,1'],
            ['5', '13,6', '-50,0', '+95,0', '+60,6', '+21,0', '-126,6', '-327,7'],
            ['6', '14,3', '-50,0', '+100,0', '+73,1', '+24,0', '-147,1', '-474,8'],
            ['7', '15,1', '-50,0', '+104,0', '+84,6', '+26,0', '-164,6', '-639,4'],
            ['8', '15,9', '-50,0', '+106,0', '+94,8', '+28,0', '-178,8', '-818,2'],
            ['9', '16,8', '-50,0', '+107,0', '+104,0', '+29,0', '-190,0', '-1.008,2'],
            ['10', '17,7', '-50,0', '+108,0', '+112,2', '+30,0', '-200,2', '-1.208,4'],
          ]}
          highlight={1}
        />

        <Prose>
          <p>
            Valores em R$ bilhões. Negativo = superávit (reforma gera mais do que custa). Break-even
            acumulado ocorre entre Ano 1 e Ano 2, em ~1,7 anos.
          </p>
        </Prose>

        <Callout type="ok">
          Diagnóstico Bronze: reforma que se paga no primeiro governo. Com horizonte fiscal de 4 anos (um
          mandato presidencial), a Reforma Bronze gera superávit acumulado de ~R$200bi. Um governo que fizer
          Bronze + Previdência tem argumentos fiscais robustos para defender a medida internamente e perante
          o mercado. Risco: ser diluída no Congresso a ponto de perder massa crítica de impacto.
        </Callout>
      </Section>

      {/* --- 12. CENÁRIO PRATA — ANO A ANO --- */}
      <Section num="12" title="Modelo Ano a Ano — Prata (R$120bi/ano)">
        <StatGrid>
          <StatCard value="~3,2" unit=" anos" label="Break-even acumulado (payback total)" color="#D97706" />
          <StatCard value="Ano 2–3" unit="" label="Break-even anual (superávit recorrente)" color="#0D9488" />
          <StatCard value="R$76,2" unit="bi" label="Déficit máximo acumulado (pico Ano 2)" color="#DC2626" />
          <StatCard value="R$1,2" unit="tri+" label="Superávit acumulado projetado Ano 10" color="#059669" />
        </StatGrid>

        <Prose>
          <p>
            A Reforma Prata exige financiamento transitório de ~R$76bi no pico (Ano 2) — equivalente a
            ~0,7% do PIB. Em termos de dívida/PIB, é um aumento gerenciável se houver credibilidade na
            trajetória. O break-even acumulado ocorre no início do segundo mandato de quem implementar a
            reforma — o que cria o problema político clássico: o custo é imediato, o crédito vai para o
            sucessor.
          </p>
        </Prose>

        <DataTable
          headers={['Ano', 'PIB Base (R$tri)', 'Custo RT', 'Ec. Previd.', 'Receita PIB', 'Div. Formal.', 'Gap Anual', 'Gap Acumulado']}
          rows={[
            ['1', '11,0', '-120,0', '+30,0', '+14,5', '+8,0', '+67,5', '+67,5'],
            ['2', '11,6', '-120,0', '+55,0', '+38,3', '+18,0', '+8,7', '+76,2'],
            ['3', '12,2', '-120,0', '+75,0', '+68,5', '+32,0', '-55,5', '+20,7'],
            ['4', '12,9', '-120,0', '+88,0', '+102,2', '+46,0', '-116,2', '-95,5'],
            ['5', '13,6', '-120,0', '+95,0', '+139,2', '+58,0', '-172,2', '-267,7'],
            ['6', '14,3', '-120,0', '+100,0', '+175,0', '+68,0', '-223,0', '-490,7'],
            ['7', '15,1', '-120,0', '+104,0', '+208,4', '+76,0', '-268,4', '-759,1'],
            ['8', '15,9', '-120,0', '+106,0', '+237,5', '+83,0', '-306,5', '-1.065,6'],
            ['9', '16,8', '-120,0', '+107,0', '+263,0', '+88,0', '-338,0', '-1.403,6'],
            ['10', '17,7', '-120,0', '+108,0', '+285,0', '+92,0', '-365,0', '-1.768,6'],
          ]}
          highlight={2}
        />

        <Prose>
          <p>
            Valores em R$ bilhões. O pico do déficit acumulado é R$76,2bi no Ano 2 — precisa ser financiado
            por dívida de curto prazo. Break-even acumulado ~Ano 3,2.
          </p>
        </Prose>

        <Callout type="info">
          O problema político real da Prata: 8 meses de déficit para o sucessor colher 7 anos de superávit.
          No Ano 3 o break-even acumulado se fecha, mas é precisamente o meio de um segundo mandato ou o
          começo de um mandato de um governo diferente. A reforma Prata é fiscalmente óbvia de longo prazo
          (R$1,7tri de superávit acumulado em 10 anos), mas cria o dilema político mais claro do sistema
          presidencialista: quem paga o custo não colhe o benefício eleitoral.
        </Callout>
      </Section>

      {/* --- 13. CENÁRIO OURO — ANO A ANO --- */}
      <Section num="13" title="Modelo Ano a Ano — Ouro (R$280bi/ano)">
        <StatGrid>
          <StatCard value="~7,9" unit=" anos" label="Break-even acumulado (sem custo de carregamento)" color="#059669" />
          <StatCard value="~9,5" unit=" anos" label="Break-even acumulado (com juros da dívida acumulada)" color="#D97706" />
          <StatCard value="R$530" unit="bi" label="Déficit máximo acumulado (pico Ano 4)" color="#DC2626" />
          <StatCard value="+10" unit="% PIB" label="Ganho de PIB projetado Ano 10 vs. baseline" color="#6D28D9" />
        </StatGrid>

        <Prose>
          <p>
            A Super Reforma exige financiar um buraco fiscal de ~R$530bi no pico (Ano 4) — equivalente a
            ~4% do PIB em dívida adicional. Com SELIC a 15%, o custo de carregamento desse déficit acumulado
            adiciona ~R$50–80bi/ano em serviço da dívida nos anos 2–5. Isso atrasa o break-even real para
            ~9,5 anos e torna a reforma dependente de acesso a crédito barato (rating positivo, confiança
            do mercado).
          </p>
        </Prose>

        <DataTable
          headers={['Ano', 'PIB Base (R$tri)', 'Custo RT', 'Ec. Previd.', 'Receita PIB', 'Div. Formal.', 'Gap Anual', 'Gap Acum.', 'Gap c/ Juros']}
          rows={[
            ['1', '11,0', '-280,0', '+30,0', '+12,7', '+12,0', '+225,3', '+225,3', '+225,3'],
            ['2', '11,6', '-280,0', '+55,0', '+30,6', '+25,0', '+169,4', '+394,7', '+427,3'],
            ['3', '12,2', '-280,0', '+75,0', '+58,4', '+45,0', '+101,6', '+496,3', '+592,8'],
            ['4', '12,9', '-280,0', '+88,0', '+93,7', '+65,0', '+33,3', '+529,6 (pico)', '+681,9 (pico)'],
            ['5', '13,6', '-280,0', '+95,0', '+134,6', '+88,0', '-37,6', '+492,0', '+644,4'],
            ['6', '14,3', '-280,0', '+100,0', '+179,5', '+108,0', '-107,5', '+384,5', '+539,4'],
            ['7', '15,1', '-280,0', '+104,0', '+224,0', '+120,0', '-168,0', '+216,5', '+369,7'],
            ['8', '15,9', '-280,0', '+106,0', '+267,5', '+130,0', '-223,5', '-7,0', '+180,7'],
            ['9', '16,8', '-280,0', '+108,0', '+313,1', '+138,0', '-279,1', '-286,1', '-61,4'],
            ['10', '17,7', '-280,0', '+108,0', '+356,5', '+145,0', '-329,5', '-615,6', '-360,0'],
          ]}
          highlight={7}
        />

        <Prose>
          <p>
            Valores em R$ bilhões. "Gap c/ Juros" inclui custo de carregamento da dívida acumulada a 12%
            ao ano (taxa conservadora pós-reforma). Break-even acumulado sem juros: ~Ano 7,9.
            Com juros: ~Ano 9,5.
          </p>
        </Prose>

        <Callout type="danger">
          O risco sistêmico da Ouro: o buraco de R$530bi precisa ser financiado. A dívida bruta brasileira
          é ~R$9,5tri (87% PIB). Adicionar R$530bi (+5,6% PIB) em 4 anos, mesmo que com perspectiva de
          payback, requer que o mercado confie na trajetória. Se a SELIC não cair (reforma trabalhista
          geralmente comprime inflação de custos e ajuda a queda dos juros), o custo de carregamento pode
          chegar a R$80bi/ano — atrasando o payback para 10–12 anos. A janela de segurança é estreita.
        </Callout>
      </Section>

      {/* --- 14. EVOLUÇÃO COMPARADA DO GAP ACUMULADO --- */}
      <Section num="14" title="Evolução Comparada do Gap Acumulado">
        <Prose>
          <p>
            Quando a linha cruza o zero, a reforma está "paga". Acima de zero = dívida fiscal ainda em
            aberto. Abaixo = superávit acumulado.
          </p>
        </Prose>

        <DataTable
          headers={['Ano', 'Bronze', 'Prata', 'Ouro (s/ juros)', 'Ouro (c/ juros)']}
          rows={[
            ['0', '0', '0', '0', '0'],
            ['1', '+6,9', '+67,5', '+225,3', '+225,3'],
            ['2', '-27,2', '+76,2', '+394,7', '+427,3'],
            ['3', '-99,4', '+20,7', '+496,3', '+592,8'],
            ['4', '-201,1', '-95,5', '+529,6 (pico)', '+681,9 (pico)'],
            ['5', '-327,7', '-267,7', '+492,0', '+644,4'],
            ['6', '-474,8', '-490,7', '+384,5', '+539,4'],
            ['7', '-639,4', '-759,1', '+216,5', '+369,7'],
            ['8', '-818,2', '-1.065,6', '-7,0', '+180,7'],
            ['9', '-1.008,2', '-1.403,6', '-286,1', '-61,4'],
            ['10', '-1.208,4', '-1.768,6', '-615,6', '-360,0'],
          ]}
        />

        <Callout type="info">
          O que os dados revelam: Bronze cruza o zero em ~1,7 anos — quase instantâneo. Prata tem um
          soluço de R$76bi e se paga em ~3,2 anos. Ouro atinge um pico de R$530bi de "dívida" no Ano 4
          antes de iniciar a recuperação — e o cruzamento do zero ocorre entre o Ano 7 e 8 (sem juros) ou
          9 (com juros). Em 10 anos, Bronze acumula R$1,2tri de superávit e Prata R$1,8tri.
        </Callout>

        <BarChart items={[
          { label: 'Bronze (~1,7 anos payback)', value: 1208, max: 1769, color: '#2563EB' },
          { label: 'Prata (~3,2 anos payback)', value: 1769, max: 1769, color: '#D97706' },
          { label: 'Ouro s/ juros (~7,9 anos)', value: 616, max: 1769, color: '#059669' },
          { label: 'Ouro c/ juros (~9,5 anos)', value: 360, max: 1769, color: '#9CA3AF' },
        ]} />

        <Callout type="ok">
          A aritmética é irrefutável no longo prazo: Qualquer versão da reforma, em 10 anos, gera superávit
          fiscal líquido massivo. A diferença entre Bronze e Ouro não é "se vale a pena" — é "quanta
          paciência fiscal o país tem capacidade de sustentar". Bronze exige quase zero paciência. Prata
          exige 3 anos. Ouro exige 8–10 anos de financiamento contínuo e crença na trajetória.
        </Callout>
      </Section>

      {/* --- 15. ANÁLISE DE SENSIBILIDADE --- */}
      <Section num="15" title="Análise de Sensibilidade — O que muda o break-even?">
        <Prose>
          <p>
            Os dois parâmetros mais incertos do modelo são a magnitude do efeito-PIB e o ramp-up da reforma
            previdenciária. Abaixo, cenários alternativos para Prata (caso mais relevante):
          </p>
        </Prose>

        <DataTable
          headers={['Ano', 'Otimista (R$bi)', 'Base (R$bi)', 'Pessimista (R$bi)']}
          rows={[
            ['0', '0', '0', '0'],
            ['1', '+30', '+67,5', '+95'],
            ['2', '+8', '+76,2', '+195'],
            ['3', '-120', '+20,7', '+310'],
            ['4', '-340', '-95,5', '+440'],
            ['5', '-610', '-267,7', '+580'],
            ['6', '-930', '-490,7', '+720'],
            ['7', '-1.310', '-759,1', '+860'],
            ['8', '-1.740', '-1.065,6', '+995'],
            ['9', '-2.220', '-1.403,6', '+1.125'],
            ['10', '-2.750', '-1.768,6', '+1.250'],
          ]}
        />

        <ScenarioGrid scenarios={[
          {
            title: 'Cenário Otimista (Prata)',
            color: '#059669',
            items: [
              'Efeito-PIB 50% maior (focalização colombiana funciona)',
              'Reforma previdenciária rápida (Ano 1 já R$50bi)',
              'Formalização acelerada por fiscalização simultânea',
              'Break-even acumulado: ~2,1 anos',
            ],
          },
          {
            title: 'Cenário Base (Prata)',
            color: '#D97706',
            items: [
              'Efeito-PIB conforme modelo central',
              'Reforma previdenciária ramp-up histórico (EC 103)',
              'Formalização gradual, sem aceleração de fiscalização',
              'Break-even acumulado: ~3,2 anos',
            ],
          },
          {
            title: 'Cenário Pessimista (Prata)',
            color: '#DC2626',
            items: [
              'Efeito-PIB nulo (como desoneração 2012 — sem focalização)',
              'Reforma previdenciária travada por resistência política',
              'Formalização mínima (1–2mi trabalhadores apenas)',
              'Break-even acumulado: NUNCA (déficit permanente)',
            ],
          },
        ]} />

        <InfoCard title="Insight — O que determina o cenário" color="#2563EB">
          <Prose>
            <p>
              Focalização em baixos salários dobra o efeito-emprego. Fiscalização simultânea torna
              formalização 2x mais rápida. Reforma previdenciária bem desenhada acelera o ramp-up. Sem esses
              três fatores, a reforma vira custo sem retorno (como Brasil 2012).
            </p>
          </Prose>
        </InfoCard>
      </Section>

      {/* --- 16. SÍNTESE COMPARATIVA FINAL --- */}
      <Section num="16" title="Síntese Comparativa — Resposta à Pergunta Original">
        <DataTable
          headers={['Dimensão', 'Bronze', 'Prata', 'Ouro']}
          rows={[
            ['Custo fiscal anual', 'R$50bi/ano', 'R$120bi/ano', 'R$280bi/ano'],
            ['Break-even anual (fluxo)', 'Ano 2', 'Entre Ano 2–3', 'Ano 5'],
            ['Break-even acumulado (sem juros)', '~1,7 anos', '~3,2 anos', '~7,9 anos'],
            ['Break-even acumulado (com juros)', '~1,8 anos', '~3,5 anos', '~9,5 anos'],
            ['Déficit máximo acumulado', 'R$6,9bi', 'R$76,2bi', 'R$530bi'],
            ['Superávit acumulado Ano 10', '~R$1,2tri', '~R$1,8tri', '~R$360bi'],
            ['Ganho de PIB (nível, Ano 10)', '+1,5–2%', '+3,5–4%', '+8–10%'],
            ['Trabalhadores formalizados (10 anos)', '+3–4mi', '+7–10mi', '+15–18mi'],
            ['Feasibility política', 'Alta', 'Média', 'Muito Baixa'],
            ['Risco fiscal de execução', 'Baixíssimo', 'Gerenciável', 'Alto'],
            ['Horizonte top 40 IMD', 'Não suficiente', 'Ano 8–10', 'Ano 6–8'],
            ['Break-even dentro de 1 mandato (4 anos)?', 'SIM', 'Quase (3,2 anos)', 'NAO'],
          ]}
        />

        <Callout type="ok">
          A resposta direta: Reforma Prata é o ponto de máximo retorno ajustado por risco. Bronze paga
          rápido mas não move o ponteiro de competitividade para top 40. Ouro move mais mas exige 8–10 anos
          de estômago fiscal que o sistema político brasileiro não tem historicamente. Prata (INSS patronal
          20 para 14%, fim da multa 40% FGTS, reforma Sistema S, desjudicialização) tem break-even acumulado
          em ~3,2 anos — dentro do horizonte de um governo comprometido — e entrega +3,5–4% de PIB em nível
          e +7–10mi de trabalhadores formalizados em 10 anos. É o equivalente trabalhista do que a reforma
          tributária LC 214/2024 é para o sistema fiscal: estrutural, factível e de retorno mensurável.
        </Callout>

        <Prose>
          <p>
            <em>
              Modelo financeiro próprio com parâmetros baseados em: IFI/Senado (EC 103/2019 — R$670bi em
              10 anos), Tafner e Giambiagi (2024 — R$875bi estimativa nova reforma), FGV IBRE (efeito-PIB
              desonera), Ipea (impacto formalização e auditores). Valores em R$ bilhões nominais, PIB
              crescimento nominal de 5,5%/ano. Fonte: IBGE, Ipea, FGV IBRE, IMD WCR 2025, Agência Brasil,
              CNN Brasil e literatura econômica comparada. Serie Brasil Estrutural / INAI Digital LTDA.
            </em>
          </p>
        </Prose>
      </Section>
    </ReportShell>
  );
}
