import ReportShell, {
  Section, StatGrid, StatCard, DataTable, Callout,
  BarChart, HorizBar, Prose, InfoGrid, InfoCard, ScenarioGrid
} from './ReportShell';

export default function ReportSaude({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Saúde no Brasil: O que os dados revelam"
      eyebrow="Análise crítica · Brasil · 2025"
      color="var(--teal)"
      onClose={onClose}
    >

      {/* ═══════════════════════════════════════════ 01 · FINANCIAMENTO */}
      <Section num="01" title="O SUS sustenta 75% da população com 41% dos recursos">
        <Prose>
          <p>
            Em 2021, o Brasil gastou <strong>R$ 872,7 bilhões em saúde (9,7% do PIB)</strong>. O número parece expressivo, mas a distribuição é a distorção central do sistema: três quartos da população dependem exclusivamente do SUS, que recebe menos de metade dos recursos totais.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="9,7" unit="% PIB" label="Gastos totais de saúde (2021) — público + privado" color="var(--red)" />
          <StatCard value="4" unit="% PIB" label="Gastos públicos do SUS — um dos mais baixos entre sistemas universais" color="var(--amber)" />
          <StatCard value="~7,4" unit="% PIB" label="Média de gastos públicos em saúde nos países da OCDE" color="var(--blue)" />
        </StatGrid>

        <Callout type="danger">
          <strong>A distorção central:</strong> 75% da população depende 100% do SUS, mas apenas 41% dos recursos vão para o setor público. O gasto público per capita via SUS é de aproximadamente <strong>R$ 1.700/ano por usuário</strong> — comparado a mais de R$ 12.000/ano per capita nos EUA.
        </Callout>

        <BarChart items={[
          { label: 'Alemanha', value: 9.1, max: 10, color: 'var(--green)' },
          { label: 'EUA', value: 9.0, max: 10, color: 'var(--blue)' },
          { label: 'França', value: 8.7, max: 10, color: 'var(--green)' },
          { label: 'UK', value: 8.5, max: 10, color: 'var(--green)' },
          { label: 'Canadá', value: 7.8, max: 10, color: 'var(--green)' },
          { label: 'Média OCDE', value: 7.4, max: 10, color: 'var(--purple)' },
          { label: 'Chile', value: 5.3, max: 10, color: 'var(--amber)' },
          { label: 'Brasil (SUS)', value: 4.0, max: 10, color: 'var(--red)' },
        ]} />
      </Section>

      {/* ═══════════════════════════════════════════ 02 · PROFISSIONAIS */}
      <Section num="02" title="Médicos demais nas capitais, de menos no interior">
        <Prose>
          <p>
            O Brasil formou médicos em quantidade adequada — 575.930 ativos em 2024, com 45 mil novos formandos por ano. O problema é distribuição geográfica e o gargalo das vagas de residência médica.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="2,81" unit="/1.000" label="Médicos por 1.000 habitantes (média nacional)" color="var(--blue)" />
          <StatCard value="18,68" unit="/1.000" label="Médicos/1.000 hab. em Vitória (ES) — extremo superior" color="var(--red)" />
          <StatCard value="0,20" unit="/1.000" label="Médicos/1.000 hab. no interior do Amazonas — extremo inferior" color="var(--amber)" />
          <StatCard value="45 mil" unit="" label="Formados/ano vs apenas 20 mil vagas de residência médica" color="var(--red)" />
        </StatGrid>

        <HorizBar items={[
          { label: 'Vitória (ES)', value: 18.68, max: 20, color: 'var(--green)' },
          { label: 'São Paulo', value: 8.2, max: 20, color: 'var(--green)' },
          { label: 'Rio de Janeiro', value: 7.1, max: 20, color: 'var(--green)' },
          { label: 'Média nacional', value: 2.81, max: 20, color: 'var(--blue)' },
          { label: 'Interior NE', value: 1.89, max: 20, color: 'var(--amber)' },
          { label: 'Interior AM', value: 0.20, max: 20, color: 'var(--red)' },
        ]} />

        <Callout type="warn">
          <strong>O gargalo da residência:</strong> O Brasil forma 45 mil médicos por ano, mas oferece apenas 20 mil vagas de residência. Resultado: 25 mil médicos por ano entram no mercado sem a formação especializada adequada — o equivalente a uma crise permanente de qualidade na ponta do atendimento.
        </Callout>
      </Section>

      {/* ═══════════════════════════════════════════ 03 · MORTALIDADE */}
      <Section num="03" title="75% das mortes são por doenças que a prevenção poderia evitar">
        <Prose>
          <p>
            As Doenças Crônicas Não Transmissíveis (DCNTs) são responsáveis por 75% de todas as mortes no Brasil. A OMS estima que <strong>86% dessas mortes poderiam ter sido evitadas</strong> com intervenção preventiva adequada.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="400 mil" unit="" label="Mortes/ano por doenças cardiovasculares (28% do total)" color="var(--red)" />
          <StatCard value="57" unit="%" label="Dos adultos brasileiros com sobrepeso ou obesidade" color="var(--amber)" />
          <StatCard value="45" unit="%" label="Dos adultos com hipertensão arterial" color="var(--blue)" />
          <StatCard value="160 mil" unit="" label="Mortes/ano atribuídas ao tabagismo — custo de R$ 50,2 bi/ano ao SUS" color="var(--red)" />
        </StatGrid>

        <DataTable
          headers={['Causa', '% das Mortes', 'Mortes/ano']}
          rows={[
            ['Cardiovasculares', '28%', '~400 mil'],
            ['Câncer', '18%', '~260 mil'],
            ['Transmissíveis/maternas', '14%', '~200 mil'],
            ['Causas externas', '11%', '~160 mil'],
            ['Respiratórias crônicas', '7%', '~100 mil'],
            ['Diabetes', '5%', '~72 mil'],
            ['Outras DCNTs', '17%', '~245 mil'],
          ]}
        />

        <HorizBar items={[
          { label: 'Sobrepeso', value: 57, max: 100, color: 'var(--red)', suffix: '%' },
          { label: 'Sedentarismo', value: 47, max: 100, color: 'var(--purple)', suffix: '%' },
          { label: 'Hipertensão', value: 45, max: 100, color: 'var(--amber)', suffix: '%' },
          { label: 'Obesidade', value: 28, max: 100, color: 'var(--red)', suffix: '%' },
          { label: 'Álcool (uso nocivo)', value: 17, max: 100, color: 'var(--blue)', suffix: '%' },
          { label: 'Tabagismo', value: 13, max: 100, color: 'var(--text-muted)', suffix: '%' },
        ]} />
      </Section>

      {/* ═══════════════════════════════════════════ 04 · PREVENÇÃO / O QUE O SUS FAZ CERTO */}
      <Section num="04" title="O que o Brasil faz bem — e o ROI da prevenção">
        <Prose>
          <p>
            O SUS tem conquistas notáveis que são subvalorizadas no debate público. O Brasil tem o maior programa de vacinação do mundo em cobertura, pioneirou no combate à AIDS e construiu uma rede de Atenção Primária que rivaliza com países ricos.
          </p>
        </Prose>

        <InfoGrid columns={2}>
          <InfoCard title="Pontos fortes do SUS" color="var(--green)">
            <DataTable
              headers={['Programa', 'Status']}
              rows={[
                ['Transplantes gratuitos', 'Referência mundial'],
                ['Programa Nacional de Imunizações (PNI)', 'Referência OMS'],
                ['Programa DST/AIDS', 'Pioneiro global'],
                ['Lei de Genéricos (1999)', '39% do mercado'],
                ['Farmácia Popular', '12,7 mi usuários'],
                ['Estratégia Saúde da Família', '–30 a 50% internações'],
              ]}
            />
          </InfoCard>
          <InfoCard title="ROI das principais intervenções preventivas" color="var(--green)">
            <DataTable
              headers={['Intervenção', 'Retorno']}
              rows={[
                ['Vacinação (PNI)', 'Altíssimo'],
                ['Saneamento básico', '4:1'],
                ['Suplementação micronutrientes', '12:1'],
                ['Atenção Primária (ESF robusta)', '3:1 a 5:1'],
                ['Campanha antitabaco', '–50% prevalência em 30 anos'],
                ['Genéricos (vs. originais)', '35–67% mais baratos'],
              ]}
            />
          </InfoCard>
        </InfoGrid>

        <Callout type="ok">
          <strong>Genéricos — a economia invisível:</strong> A Lei 9.787/99 introduziu os genéricos no Brasil. Hoje representam 39% do mercado farmacêutico, com economia mínima de 35% por produto (chegando a 67% na prática). Foram economizados R$ 346 bilhões ao longo do programa — um dos maiores retornos de uma política de saúde do país.
        </Callout>

        <Prose>
          <p>
            <strong>Dilema ético — doenças raras e judicialização:</strong> 9 dos 10 medicamentos mais demandados judicialmente são para doenças raras. O custo total chega a <strong>R$ 1,2 bilhão/ano</strong> em judicialização. Exemplos extremos: Soliris (R$ 1,2 mi/paciente/ano), Tafamidis (R$ 700 mil/paciente/ano). A decisão do STF em 2024 (Tema 6) estabeleceu 6 requisitos cumulativos para concessão judicial, fortalecendo a CONITEC como árbitro técnico.
          </p>
        </Prose>
      </Section>

      {/* ═══════════════════════════════════════════ 05 · BRASIL vs EUA */}
      <Section num="05" title="EUA gastam 11× mais per capita e têm resultados piores em equidade">
        <Prose>
          <p>
            A comparação com os Estados Unidos é a mais reveladora: eles gastam mais de 17% do PIB em saúde — o maior do mundo — mas 30 milhões de americanos não têm cobertura e mais de 500 mil famílias declaram falência anualmente por dívidas médicas.
          </p>
        </Prose>

        <InfoGrid columns={2}>
          <InfoCard title="Brasil (SUS)" color="var(--green)">
            <DataTable
              headers={['Indicador', 'Valor']}
              rows={[
                ['Gasto total % PIB', '9,7%'],
                ['Gasto público % PIB', '4%'],
                ['Per capita (USD)', '~US$ 1.100'],
                ['Cobertura universal', 'Sim (SUS)'],
                ['Falências por saúde/ano', 'Raras'],
                ['Expectativa de vida', '75,5 anos'],
                ['Mortalidade infantil', '13/1.000'],
              ]}
            />
          </InfoCard>
          <InfoCard title="Estados Unidos" color="var(--red)">
            <DataTable
              headers={['Indicador', 'Valor']}
              rows={[
                ['Gasto total % PIB', '17%+'],
                ['Gasto público % PIB', '~9%'],
                ['Per capita (USD)', '~US$ 12.500'],
                ['Cobertura universal', 'Não — 30 mi sem cobertura'],
                ['Falências por saúde/ano', '500 mil+'],
                ['Expectativa de vida', '78,5 anos'],
                ['Mortalidade infantil', '5,4/1.000'],
              ]}
            />
          </InfoCard>
        </InfoGrid>

        <Callout type="info">
          <strong>A lição:</strong> Gastar mais não garante cobertura mais justa. O Brasil entrega universalidade com 1/11 do investimento per capita dos EUA. O problema brasileiro não é o modelo — é o subfinanciamento do modelo. Chegar a 6% do PIB em gasto público colocaria o SUS entre os sistemas mais custo-eficientes do mundo.
        </Callout>
      </Section>

      {/* ═══════════════════════════════════════════ 06 · NUTRIÇÃO */}
      <Section num="06" title="O Brasil saiu do Mapa da Fome e lidera o consumo de ultraprocessados">
        <Prose>
          <p>
            O paradoxo nutricional brasileiro é único no mundo: em 2025, o país saiu formalmente do Mapa da Fome da FAO (subnutrição abaixo de 2,5%), mas <strong>50,2 milhões de pessoas não conseguem pagar por uma dieta saudável</strong> e o consumo de ultraprocessados não para de crescer.
          </p>
        </Prose>

        <StatGrid>
          <StatCard value="7" unit=" mi" label="Em insegurança alimentar grave — concentrados em indígenas, quilombolas, rurais remotos" color="var(--red)" />
          <StatCard value="57 mil" unit="" label="Mortes/ano atribuídas a ultraprocessados — 6 mortes por hora (Fiocruz/USP, 2024)" color="var(--amber)" />
          <StatCard value="28,1" unit="%" label="Dos adultos com obesidade — 45,7 mi de pessoas. Projeção 2060: 88,1% com sobrepeso ou obesidade" color="var(--purple)" />
        </StatGrid>

        <BarChart items={[
          { label: 'Tabagismo (SUS)', value: 50.2, max: 55, color: 'var(--red)' },
          { label: 'Subnutrição (~0.5% PIB)', value: 40, max: 55, color: 'var(--coral)' },
          { label: 'Álcool (total)', value: 18.8, max: 55, color: 'var(--amber)' },
          { label: 'Inseg. alimentar (cap. humano)', value: 15, max: 55, color: 'var(--blue)' },
          { label: 'Ultraprocessados', value: 10.4, max: 55, color: 'var(--purple)' },
        ]} />

        <Callout type="warn">
          <strong>O paradoxo da pobreza e dos ultraprocessados:</strong> Em 2026, ultraprocessados custarão menos por quilo que alimentos in natura (UFMG/Idec). As famílias nas classes C e D são as mais expostas. O mercado está precificando a dieta ruim como a mais acessível — e o sistema de saúde vai pagar a conta décadas depois.
        </Callout>

        <InfoCard title="Paradoxo da subnutrição — os invisíveis que o dado nacional esconde" color="var(--red)">
          <Prose>
            <p>
              A média nacional de 2,8% de subnutrição esconde disparidades brutais: <strong>30% das crianças indígenas têm desnutrição crônica</strong> (entre os Yanomami ultrapassa 80%). Meninas e meninos indígenas têm mais de duas vezes mais risco de morrer antes de completar 1 ano que a média nacional. O dano cognitivo na janela dos 1.000 primeiros dias (gestação até 2 anos) é irreversível — crianças afetadas ganham em média 20% menos na vida adulta.
            </p>
          </Prose>
        </InfoCard>

        <Callout type="danger">
          <strong>Crítica estrutural que o debate público ignora — o imposto sobre ultraprocessados é urbano:</strong> Macarrão instantâneo, sardinha em lata e biscoito chegam de barco ao Amazonas, de moto ao sertão. Têm prazo de validade de meses e são densos em calorias por real. Para populações sem supermercado, sem cadeia de frio e sem estrada, o ultraprocessado não é uma escolha ruim — é a única opção disponível. Taxar o biscoito sem resolver a infraestrutura de acesso a in natura é taxar a fome de quem não tem alternativa. O imposto é uma política urbana eficiente mascarada de política nacional.
        </Callout>
      </Section>

      {/* ═══════════════════════════════════════════ 07 · CUSTOS DAS SOLUÇÕES */}
      <Section num="07" title="Eliminar fome, subnutrição e reduzir ultraprocessados — os números reais">

        {/* 7.1 — Eliminar insegurança alimentar grave */}
        <InfoCard title="1 · Eliminar insegurança alimentar grave" color="var(--blue)">
          <Callout type="info">
            <strong>Custo incremental: R$ 8–12 bi/ano</strong> sobre os R$ 168 bi já gastos no Bolsa Família. O Brasil reduziu de 33 milhões para 7 milhões em 2 anos — o resto exige alcançar os invisíveis (indígenas, quilombolas, população de rua, rurais remotos). O principal obstáculo não é financeiro — é logístico e de Cadastro Único.
          </Callout>
          <DataTable
            headers={['Intervenção', 'Custo anual']}
            rows={[
              ['Expansão do Bolsa Família para os mais vulneráveis (incremento de R$250–300/mês para ~2,8 mi de famílias em insegurança grave)', 'R$ 6–8 bi'],
              ['Inclusão dos invisíveis do Cadastro Único (equipes volantes, registro offline — 247 mil famílias indígenas, 291 mil quilombolas, 258 mil em situação de rua)', 'R$ 0,8–1,2 bi'],
              ['PNAE expandido + refeições em equipamentos sociais (alimentação escolar integral — já cobre 40 mi de estudantes)', 'R$ 0,5–1 bi (ROI: 8:1)'],
            ]}
          />
        </InfoCard>

        {/* 7.2 — Eliminar subnutrição crônica */}
        <InfoCard title="2 · Eliminar subnutrição crônica" color="var(--amber)">
          <Callout type="warn">
            <strong>Custo direto: R$ 5–8 bi/ano em saúde + R$ 25 bi/ano em saneamento (20 anos).</strong> São dois problemas sobrepostos: déficit de micronutrientes (solucionável com R$ 5–8 bi/ano) e déficit estrutural em indígenas e rurais extremos que só muda com saneamento e presença permanente do Estado.
          </Callout>
          <DataTable
            headers={['Intervenção', 'Custo anual', 'ROI']}
            rows={[
              ['Suplementação universal de micronutrientes (NutriSUS expandido) — R$ 0,30/dose, 11 mi crianças 0–5 + 5 mi gestantes', 'R$ 0,5 bi', '12:1 (OMS)'],
              ['Programa especial para populações indígenas e quilombolas — equipes volantes, logística aérea e fluvial', 'R$ 1,5–2 bi', '—'],
              ['Saneamento básico universal (água + esgoto tratado) — 35 mi sem esgoto tratado, Novo Marco: R$ 700 bi em 20 anos', 'R$ 25 bi', '4:1'],
            ]}
          />
        </InfoCard>

        {/* 7.3 — Reduzir 50% ultraprocessados */}
        <InfoCard title="3 · Reduzir 50% o consumo de ultraprocessados" color="var(--green)">
          <Callout type="ok">
            <strong>Saldo fiscal líquido positivo: +R$ 15–25 bi/ano.</strong> Esta é a virada de mesa: o imposto sobre ultraprocessados não só não custa — gera receita que pode financiar os outros dois programas. O custo é político, não fiscal.
          </Callout>
          <DataTable
            headers={['Intervenção', 'Impacto fiscal']}
            rows={[
              ['Imposto Seletivo de 25–30% sobre ultraprocessados (LC 214/2025 previu IS mas não incluiu — Chile e México: 20% → redução 10–25% em 2 anos)', '+R$ 15–22 bi (gera receita)'],
              ['Isenção total de IBS/CBS sobre alimentos in natura (frutas, legumes, verduras, carnes frescas, ovos, leite, feijão, arroz)', '–R$ 6–10 bi (custo fiscal)'],
              ['Cashback nutricional para beneficiários do Bolsa Família (devolução de 20% do imposto via CPF)', '–R$ 2–3 bi (custo fiscal)'],
              ['Regulação de marketing infantil + cantinas escolares (proibição de publicidade de ultraprocessados para menores de 12 anos)', '–R$ 0,2 bi (ROI intergeracional)'],
            ]}
          />
        </InfoCard>

        {/* Tabela resumo: custo × retorno × prazo */}
        <DataTable
          headers={['Intervenção', 'Custo anual', 'Custo do problema', 'ROI', 'Prazo', 'Principal obstáculo']}
          rows={[
            ['Eliminar inseg. alimentar grave', 'R$ 8–12 bi incremental', 'R$ 15+ bi (cap. humano)', '~1,5:1', '3–5 anos', 'Alcançar os invisíveis'],
            ['Eliminar subnutrição crônica', 'R$ 5–8 bi + R$25 bi saneamento', 'US$ 11 bi/ano (Lancet)', '12:1 (micronutrientes)', '10–20 anos', 'Saneamento e Estado no Norte'],
            ['Reduzir 50% ultraprocessados', 'Saldo +R$ 15–25 bi/ano', 'R$ 10,4 bi/ano → 4,66% PIB em 2060', 'Positivo', '5–10 anos', 'Lobby da indústria no Congresso'],
          ]}
        />

        <Prose>
          <p>
            <strong>Saneamento básico é a alavanca-mestra:</strong> Das três frentes, saneamento é a mais cara (R$ 25 bi/ano por 20 anos), mas é a única que resolve múltiplos problemas simultaneamente — subnutrição secundária por diarreias e parasitoses, mortalidade infantil, doenças respiratórias, DCNTs hídricas e desigualdade regional entre Norte/Nordeste e Sul/Sudeste. Sem saneamento, as demais intervenções são paliativos que tratam sintomas sem resolver causas estruturais. O ROI de 4:1 do saneamento é conservador porque não captura os efeitos de segunda ordem: crianças que não adoecem frequentam mais a escola, adultos que não se afastam por diarreia produzem mais, municípios com esgoto tratado atraem mais investimento privado.
          </p>
        </Prose>
      </Section>

      {/* ═══════════════════════════════════════════ 08 · CONCLUSÕES */}
      <Section num="08" title="O que a análise revela">

        <InfoCard title="A conclusão paradoxal" color="var(--teal)">
          <Prose>
            <p>
              Se o Brasil taxar ultraprocessados como a evidência indica, o excedente fiscal <strong>(+R$ 15–25 bi/ano)</strong> paga inteiramente a eliminação da fome grave <strong>(–R$ 8–12 bi/ano)</strong> e ainda contribui para o saneamento. O pacote completo para atacar fome, subnutrição e nutrição ruim tem <strong>custo fiscal líquido próximo de zero ou positivo</strong>. O Brasil não tem um problema de recursos para resolver nutrição — tem um problema de alocação e vontade política.
            </p>
          </Prose>
        </InfoCard>

        <DataTable
          headers={['#', 'Aprendizado', 'Implicação']}
          rows={[
            ['1', 'O SUS é subfinanciado, não disfuncional', 'Chegar a 6% do PIB em gasto público colocaria o Brasil entre os sistemas mais custo-eficientes do mundo'],
            ['2', 'O problema de médicos é de distribuição, não de quantidade', '45 mil formados/ano vs 20 mil vagas de residência — o gargalo é na especialização e no incentivo à interiorização'],
            ['3', '86% das mortes por DCNTs são evitáveis', 'O investimento em prevenção tem ROI entre 3:1 e 12:1 — superior a qualquer investimento curativo'],
            ['4', 'A fome residual no Brasil é logística, não financeira', 'Os 7 mi restantes em insegurança grave são os que o Cadastro Único não alcança, não os que o programa não pode pagar'],
            ['5', 'O dano da subnutrição infantil é irreversível após 2 anos', 'Os primeiros 1.000 dias são a janela crítica — depois, o investimento em saúde cognitiva tem retorno muito menor'],
            ['6', 'Ultraprocessados são uma crise pública disfarçada de escolha individual', '57 mil mortes/ano, R$ 10,4 bi em custos — a indústria externaliza custos de saúde para o SUS e para a Previdência'],
            ['7', 'O imposto sobre ultraprocessados gera receita líquida positiva', 'O único custo é político: enfrentar a ABIA e a bancada ruralista no Congresso — a conta econômica já está fechada'],
            ['8', 'O imposto sobre ultraprocessados é urbano — em zonas remotas pode agravar a fome', 'Sem cadeia de frio e acesso a in natura, taxar o ultraprocessado sem oferecer alternativa é transferir renda dos pobres para o Estado'],
            ['9', 'Os EUA provam que gastar mais não garante equidade', '17% do PIB e 30 mi sem cobertura. O modelo SUS é mais justo — só precisa de mais recursos e melhor distribuição'],
            ['10', 'Saneamento básico é a intervenção que resolve tudo ao mesmo tempo', 'Subnutrição secundária, mortalidade infantil, diarreias, DCNTs — ROI de 4:1 e ainda resolve desigualdade regional'],
          ]}
        />

        <ScenarioGrid scenarios={[
          {
            title: '1. Imposto + subsídio em alimentos (fazer agora — gera receita imediata)',
            color: 'var(--green)',
            items: [
              'Custo líquido negativo. Financia os outros programas.',
              'A Reforma Tributária de 2025 abriu a janela — a regulamentação complementar pode incluir ultraprocessados.',
              'Efeito comportamental lento, mas impacto fiscal imediato.',
              'Chile e México são a prova de conceito.',
              'Saldo: +R$ 15–25 bi/ano',
            ],
          },
          {
            title: '2. Suplementação nutricional + alcance dos invisíveis (máximo ROI por real)',
            color: 'var(--blue)',
            items: [
              'R$ 6 bi/ano para micronutrientes + inclusão de indígenas e rurais extremos no Bolsa Família.',
              'ROI de até 12:1.',
              'Impacto cognitivo começa imediatamente — mas resultados macroeconômicos só aparecem em 15–20 anos.',
            ],
          },
          {
            title: '3. Saneamento básico universal (mais caro, mas transforma o Norte e Nordeste)',
            color: 'var(--red)',
            items: [
              'R$ 25 bi/ano por 20 anos.',
              'Resolve subnutrição secundária, mortalidade infantil, DCNTs e desigualdade regional simultaneamente.',
              'Sem ele, os outros programas são paliativos que tratam sintomas.',
              'ROI: 4:1',
            ],
          },
        ]} />

      </Section>

    </ReportShell>
  );
}
