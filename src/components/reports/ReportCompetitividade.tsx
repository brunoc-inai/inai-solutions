import ReportShell, {
  Section,
  StatGrid,
  StatCard,
  DataTable,
  Callout,
  BarChart,
  Prose,
  FactorCard,
  ScenarioGrid,
  InfoGrid,
  InfoCard,
  Timeline,
} from './ReportShell';

export default function ReportCompetitividade({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Competitividade Internacional"
      eyebrow="Análise Fria · Março 2026"
      color="var(--amber)"
      onClose={onClose}
    >
      {/* ════════════════════════════════════════════════════════════
          HERO / RESUMO EXECUTIVO
         ════════════════════════════════════════════════════════════ */}
      <Prose>
        <p>
          O Brasil é a 12ª maior economia do mundo. Ocupa a 58ª posição no ranking de
          competitividade. Essa contradição não é acidental — é o resultado de cinco bloqueios
          estruturais que se retroalimentam, tornam o custo de fazer negócios proibitivo e
          afastam investimento produtivo das regiões que mais precisam dele.
        </p>
      </Prose>

      <StatGrid>
        <StatCard value="58º" unit="/69" label="IMD World Competitiveness 2025" color="var(--red)" />
        <StatCard value="50º" unit="/133" label="Global Innovation Index 2024" color="var(--amber)" />
        <StatCard value="15" unit="%" label="SELIC jan/2026" color="var(--red)" />
        <StatCard value="127º" unit="/184" label="Liberdade Econômica (Heritage)" color="var(--red)" />
      </StatGrid>

      <Callout type="info">
        Alta de 4 posições vs 2024 (62º). Eficiência de governo: 65º de 69 — penúltimo.
        Crédito corporativo: 68º de 69 no IMD. Uma das mais altas taxas de juros entre grandes economias.
      </Callout>

      {/* ════════════════════════════════════════════════════════════
          SEÇÃO 01 — POSIÇÃO NO TABULEIRO GLOBAL
         ════════════════════════════════════════════════════════════ */}
      <Section num="01" title="Posição no Tabuleiro Global">
        <Prose>
          <p>
            Três rankings independentes apontam para a mesma diagnose: o Brasil tem capacidade
            econômica de nação grande, mas opera com o ambiente de negócios de uma nação pequena
            e mal gerida. Os pontos fortes são concentrados em ativos naturais e FDI bruto.
            Os pontos fracos são quase todos institucionais e estruturais.
          </p>
        </Prose>

        <BarChart items={[
          { label: 'Performance Econômica', value: 38, max: 69, color: 'var(--amber)' },
          { label: 'Efic. Governo', value: 65, max: 69, color: 'var(--red)' },
          { label: 'Efic. Negócios', value: 61, max: 69, color: 'var(--red)' },
          { label: 'Infraestrutura', value: 58, max: 69, color: 'var(--red)' },
        ]} />

        <DataTable
          headers={['Indicador', 'Ranking/Fonte', 'Brasil', 'Referência', 'Leitura']}
          rows={[
            ['Competitividade geral (IMD)', '69 países', '58º', 'Suíça 1º', 'Abaixo de todos os BRICs exceto Rússia/Venezuela'],
            ['Eficiência de governo (IMD)', '69 países', '65º', 'Cingapura 1º', 'Penúltimo — piora de 2023 (62º)'],
            ['Eficiência de negócios (IMD)', '69 países', '61º', 'Hong Kong 1º', 'Mercado travado por custo do trabalho e crédito'],
            ['Infraestrutura (IMD)', '69 países', '58º', 'Suíça 1º', 'Exceto energia renovável (5º) — o resto é crítico'],
            ['Performance econômica (IMD)', '69 países', '38º', 'EUA 1º', 'Destaque: FDI 5º, crescimento emprego 7º'],
            ['FDI inflows (UNCTAD)', 'Mundo', '5º', 'EUA 1º', 'US$ 65,9bi (2023) — único emergente fora da Ásia no top 5'],
            ['Inovação (GII)', '133 países', '50º', 'Suíça 1º', 'Científico: razoável. Aplicação: fraco.'],
            ['Liberdade econômica (Heritage)', '184 países', '127º', 'Cingapura 1º', 'Abaixo de Haiti e Paquistão'],
            ['Crédito corporativo (IMD)', '69 países', '68º', 'Média OCDE', 'SELIC 15%; crédito/PIB: 111% vs 192% OCDE'],
            ['Educação básica (IMD)', '69 países', '69º', 'Finlândia 1º', 'Último. PISA mat.: 379pts (média OCDE: 489pts)'],
            ['Habilidades de idiomas (IMD)', '69 países', '69º', '—', 'Último. Barreira severa para integração internacional'],
            ['Atividade empreendedora (IMD)', '69 países', '4º', '—', 'Empreendedorismo por necessidade, não por oportunidade'],
          ]}
          highlight={0}
        />

        <Callout type="danger">
          O paradoxo central: O Brasil atrai o 5º maior volume de FDI do mundo, mas ocupa a 68ª
          posição em acesso a crédito. Isso significa que capital externo entra — mas é capturado
          pelo custo financeiro antes de criar emprego produtivo. Empresas que entram para operar
          no Brasil pagam o mesmo spread que PMEs locais. O país recebe investimento apesar do
          ambiente, não por causa dele.
        </Callout>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          SEÇÃO 02 — DECOMPOSIÇÃO POR 5 FATORES
         ════════════════════════════════════════════════════════════ */}
      <Section num="02" title="Decomposição por 5 Fatores">
        <Prose>
          <p>
            Cada fator recebe uma nota de 0–10 baseada em dados comparativos internacionais.
            Nota 10 = fronteira global. A nota do Brasil reflete não o valor absoluto, mas a
            distância da fronteira competitiva relevante.
          </p>
        </Prose>

        {/* RADAR TABLE: Brasil vs México vs Chile */}
        <DataTable
          headers={['Fator', 'Brasil', 'México', 'Chile']}
          rows={[
            ['Burocracia', '1,5', '4,5', '6,5'],
            ['Custo de Capital', '1,5', '4,0', '5,5'],
            ['Logística', '2,5', '5,0', '5,5'],
            ['Mão de Obra', '2,0', '4,5', '5,5'],
            ['Oferta de Investimento', '5,5', '5,0', '5,5'],
          ]}
          highlight={0}
        />

        {/* FATOR 1: BUROCRACIA */}
        <FactorCard
          title="Burocracia & Regulação"
          score="1,5"
          scoreLabel="/10"
          color="var(--red)"
          tags={[
            'Liberdade econômica: 127º/184',
            'Gov. Efficiency: 65º/69',
            'Reforma tributária em curso',
          ]}
        >
          <p>
            <strong>1.500 horas/ano</strong> para compliance fiscal — 9,4x mais que Cingapura (30h)
            e 9,4x mais que a média OCDE (160h). 68 tributos federais. Abrir empresa custa 43%
            mais que OCDE e leva 5,9 dias a mais. A reforma tributária (LC 214/2024) vai simplificar
            a partir de 2027, mas não altera o peso — apenas a forma.
          </p>
        </FactorCard>

        {/* FATOR 2: CUSTO DE CAPITAL */}
        <FactorCard
          title="Custo de Capital"
          score="1,5"
          scoreLabel="/10"
          color="var(--red)"
          tags={[
            'SELIC: 15% (jan/2026)',
            'Crédito: 68º/69',
            'Fintechs: 25% do crédito pessoal',
          ]}
        >
          <p>
            SELIC em <strong>15%</strong> (jan/2026) — uma das mais altas entre grandes economias.
            Crédito corporativo a 18–22%+. Spread bancário: 17,8 p.p. (3º maior mundo).
            Recuperação judicial: US$ 0,13 por US$ 1 emprestado. Crédito/PIB: 111% vs 192% na
            média OCDE. Os 5 maiores bancos controlam 80% do mercado — competição insuficiente.
          </p>
        </FactorCard>

        {/* FATOR 3: LOGÍSTICA */}
        <FactorCard
          title="Logística & Infraestrutura"
          score="2,5"
          scoreLabel="/10"
          color="var(--red)"
          tags={[
            'Custo logístico: 15,5% PIB',
            'Infraestrutura: 58º/69',
            'Energia renovável: 5º/69',
          ]}
        >
          <p>
            Custo logístico: <strong>15,5% do PIB</strong> — vs 8,8% nos EUA, 14,1% na China,
            13,7% no México. R$ 1,83 tri em 2024. 62% da carga vai por rodovias (modal mais caro).
            Investimento em infraestrutura &lt; 2% do PIB/ano vs necessidade de 3,7%.
            Demurrage portuária: US$ 2,3bi em 2024. Exceção: energia renovável (5º no mundo).
          </p>
        </FactorCard>

        {/* FATOR 4: MÃO DE OBRA */}
        <FactorCard
          title="Qualidade da Mão de Obra"
          score="2,0"
          scoreLabel="/10"
          color="var(--red)"
          tags={[
            'Educação básica: 69º/69',
            'Idiomas: 69º/69',
            '81% empresas: falta de talento',
            'Ensino superior: 34% vs 70% OCDE',
          ]}
        >
          <p>
            PISA 2022: matemática <strong>379 pts</strong> (média OCDE: 489) — 75º/79 países.
            81% das empresas não encontram profissionais qualificados (ManpowerGroup 2025).
            Reclamações de falta de mão de obra qualificada saltaram de 5% para 23% pós-pandemia (CNI).
            Operário brasileiro retém 47% do custo de contratação vs 85% em países desenvolvidos
            — encargos consomem o resto.
          </p>
        </FactorCard>

        {/* FATOR 5: OFERTA DE INVESTIMENTO */}
        <FactorCard
          title="Oferta de Investimento"
          score="5,5"
          scoreLabel="/10"
          color="var(--amber)"
          tags={[
            'FDI: 5º mundial (UNCTAD 2023)',
            'Empreendedorismo: 4º/69',
            'Venture capital: 64º/69',
            'Serviços exportados: 67º/69',
          ]}
        >
          <p>
            FDI de <strong>US$ 65,9bi</strong> (2023) — 5º maior destino global, líder da
            América Latina. Único país emergente fora da Ásia no top 5. Empreendedorismo
            early-stage: 4º/69 (IMD). Mas: capital de venture é escasso (64º em VC — IMD),
            FDI concentrado em finanças e commodities, não em manufatura avançada.
            Stock total: US$ 997 bi acumulados.
          </p>
        </FactorCard>

        {/* SÍNTESE */}
        <FactorCard
          title="Índice Sintético BR"
          score="2,6"
          scoreLabel="/10"
          color="var(--red)"
          tags={[]}
        >
          <p>
            Média dos 5 fatores acima, ponderada pelo impacto estimado sobre o custo de fazer
            negócios. O Brasil ocupa a posição de <strong>país com potencial de 7+ mas entrega
            de 2,6</strong> — o gap é a métrica mais relevante da análise.
          </p>
          <DataTable
            headers={['Fator', 'Nota']}
            rows={[
              ['Burocracia', '1,5 / 10'],
              ['Custo de capital', '1,5 / 10'],
              ['Logística', '2,5 / 10'],
              ['Mão de obra', '2,0 / 10'],
              ['Oferta de investimento', '5,5 / 10'],
            ]}
          />
        </FactorCard>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          SEÇÃO 03 — TRAJETÓRIA IMD
         ════════════════════════════════════════════════════════════ */}
      <Section num="03" title="Para Onde o Brasil Vai">
        <Prose>
          <p>
            Uma análise fria de trajetória baseada nas tendências estruturais atuais — sem
            wishful thinking. O que os dados sugerem se o Brasil continuar no ritmo atual versus
            o que acontece se acertar as intervenções certas.
          </p>
        </Prose>

        <DataTable
          headers={['País', '2020', '2021', '2022', '2023', '2024', '2025']}
          rows={[
            ['Brasil', '56º', '57º', '59º', '60º', '62º', '58º'],
            ['Chile', '34º', '45º', '43º', '44º', '44º', '41º'],
          ]}
        />

        <Timeline events={[
          { year: '2020', label: 'Brasil 56º', detail: 'Pré-pandemia, posição relativamente estável', color: 'var(--amber)' },
          { year: '2021', label: 'Brasil 57º', detail: 'Queda marginal durante pandemia', color: 'var(--amber)' },
          { year: '2022', label: 'Brasil 59º', detail: 'Deterioração contínua', color: 'var(--red)' },
          { year: '2023', label: 'Brasil 60º', detail: 'Piora de eficiência de governo', color: 'var(--red)' },
          { year: '2024', label: 'Brasil 62º', detail: 'Ponto mais baixo da série recente', color: 'var(--red)' },
          { year: '2025', label: 'Brasil 58º', detail: 'Alta de 4 posições — frágil, puxada por emprego e FDI', color: 'var(--amber)' },
        ]} />

        <Prose>
          <p>
            A melhora de 62º para 58º em 2025 é real, mas frágil. Ela é explicada principalmente
            por aumento de emprego formal (temporário) e fluxo de FDI — não por melhoras
            estruturais em burocracia, custo de capital ou educação.
          </p>
          <p>
            Os sub-indicadores que pioraram em 2025: governo subsidia mais (sinal de dependência),
            competitividade de exportações continua em queda livre (67º), habilidade linguística
            permanece em último lugar.
          </p>
          <p>
            A reforma tributária de 2027 cria uma <strong>janela real de oportunidade</strong> — mas o
            compliance vai melhorar, não o peso total da carga. O risco é que a melhora cosmética
            desvie atenção das reformas estruturais mais difíceis.
          </p>
        </Prose>

        <ScenarioGrid scenarios={[
          {
            title: 'Cenário base · Estagnação competitiva até 2030',
            color: 'var(--red)',
            items: [
              'SELIC oscila entre 10–15% na década — custo de capital permanece proibitivo para PMEs sem acesso a BNDES ou capital externo',
              'Reforma tributária simplifica compliance mas não reduz alíquota efetiva — custo BR cai marginalmente',
              'Educação básica continua abaixo da média OCDE por pelo menos uma geração (15–20 anos de defasagem curricular)',
              'Infraestrutura cresce 1,5% do PIB/ano — gap com necessidade (3,7%) se aprofunda',
              'Brasil perde indústria manufatureira para México, Vietnam e Índia, concentrando FDI em commodities e serviços financeiros',
              'Ranking IMD: estagna entre 55–62, nunca entra no top 40 sem reformas profundas',
              'PIB per capita cresce 1,5–2% ao ano — Brasil fica preso na "armadilha da renda média"',
            ],
          },
          {
            title: 'Cenário de reforma · Salto para top 35–40 até 2033',
            color: 'var(--green)',
            items: [
              'Reforma do spread bancário (mais concorrência, marco legal de garantias): crédito cai de 18% para 10–12% — libera R$ 300–400bi de investimento produtivo represado',
              'Simplificação regulatória federal + zonas econômicas especiais no Norte/Nordeste: reduz barreira de entrada em regiões com mais BF que empregos',
              'Agenda de qualificação técnica acelerada (SENAI/SENAC + private): 5–8 anos para elevar base industrial',
              'Concessões de infraestrutura em escala (ferrovias, portos): reduz custo logístico de 15,5% para 11–12% do PIB em 10 anos',
              'Brasil torna-se hub de nearshoring para América do Sul e mercado europeu em energia limpa e proteínas — FDI greenfield cresce',
              'Ranking IMD: top 35–40 até 2030–33. Posicionamento comparável a México, Polônia, Chile avançado',
            ],
          },
        ]} />

        <Callout type="info">
          O relógio da janela de oportunidade: O Brasil tem uma vantagem que nenhum país pode
          criar artificialmente — uma das maiores matrizes de energia renovável do mundo (5º em
          capacidade), transição energética global em curso, e posição geopolítica de neutralidade
          que atrai capital em busca de mercados não-alinhados. Essa janela tem prazo: o México
          está avançando em nearshoring pelo USMCA, a Índia está capturando manufatura eletrônica,
          e o Vietnam está absorvendo têxtil e semicondutores de baixo custo. O Brasil ou entra na
          corrida agora, ou assiste de fora.
        </Callout>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          SEÇÃO 04 — RANKING DE INTERVENÇÕES 1–10
         ════════════════════════════════════════════════════════════ */}
      <Section num="04" title="Ranking de Intervenções — 1 a 10">
        <Prose>
          <p>
            Ordenadas por impacto x viabilidade política x velocidade de efeito. "Impacto" aqui
            é o quanto a intervenção move o ponteiro de competitividade em prazo relevante
            (5–10 anos). As mais difíceis politicamente costumam ser as mais necessárias.
          </p>
        </Prose>

        <InfoGrid columns={1}>
          {/* INTERVENÇÃO 1 */}
          <InfoCard
            title="1. Reforma do spread bancário e marco de garantias"
            subtitle="IMPACTO EXTREMO · 2–3 anos · Move IMD 8–12 posições"
            color="var(--red)"
          >
            <p>
              A raiz de quase tudo. O spread de 17,8 p.p. não é uma força natural — é resultado
              da ineficiência na execução de garantias (US$0,13 recuperado por US$1), baixa
              concorrência bancária e custo de funding indexado ao risco-Brasil. Modernizar o
              marco legal de garantias (já em discussão no Congresso), acelerar o Desenrola para
              PMEs, e forçar portabilidade de crédito reduz o spread em 5–8 p.p. em 2–3 anos.
              Cada ponto percentual de queda no spread libera ~R$ 40–60bi de capital produtivo.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 2 */}
          <InfoCard
            title="2. Implementação plena da reforma tributária (LC 214/2024)"
            subtitle="IMPACTO EXTREMO · 3–7 anos · Eleva business efficiency 10+ posições"
            color="var(--red)"
          >
            <p>
              A reforma está aprovada — o trabalho é garantir que 2027 não vire 2030 com lobbies
              setoriais adiando a transição. O IBS/CBS simplifica PIS/COFINS/ICMS em um único
              tributo com compensação automática de crédito, eliminando o principal mecanismo de
              guerra fiscal e distorção de preços relativos. O compliance pode cair de 1.500h
              para 500–700h em 5 anos. Sem execução fiel, foi a maior oportunidade desperdiçada
              da história fiscal brasileira.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 3 */}
          <InfoCard
            title="3. Programa nacional de concessões em infraestrutura (ferrovias + portos)"
            subtitle="IMPACTO EXTREMO · 5–10 anos · -3 pp custo logístico = top 45 infra"
            color="var(--red)"
          >
            <p>
              O custo logístico de 15,5% do PIB é 76% maior que o americano. Cada ponto percentual
              de redução vale ~R$ 100bi em competitividade exportadora. O Brasil tem o desenho
              institucional das concessões — falta escala e velocidade. Priorizar as rotas de
              escoamento do MATOPIBA (Cerrado exportador), eixos Norte-Sul e ligações portuárias.
              Capital privado está disponível — o problema é risco regulatório e prazo de
              amortização.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 4 */}
          <InfoCard
            title="4. Reforma do mercado de trabalho para reduzir encargos sobre formalização"
            subtitle="IMPACTO ALTO · 3–5 anos · Formalização +5–8mi trabalhadores"
            color="var(--amber)"
          >
            <p>
              O trabalhador brasileiro recebe 47% do que custa ao empregador. Nos países da OCDE,
              85%. Essa diferença é o principal incentivo à informalidade (46% da força de trabalho
              ainda informal). Modernizar encargos sem reduzir direitos — separar custo
              previdenciário do custo de contratação via contribuição sobre faturamento — é o
              caminho. A reforma de 2017 foi parcial. Uma segunda rodada pode reduzir encargos em
              10–15 pontos percentuais.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 5 */}
          <InfoCard
            title="5. Agenda de qualificação técnica acelerada (SENAI 2.0 + parcerias privadas)"
            subtitle="IMPACTO ALTO · 3–6 anos · -40% gap de talento em 5 anos"
            color="var(--amber)"
          >
            <p>
              81% das empresas não encontram os profissionais que precisam. A solução não é mais
              engenharia — é mais técnico especializado: soldador de precisão, eletromecânico
              industrial, programador CNC, técnico em automação. O SENAI é a infraestrutura
              existente, mas precisa de governança orientada a demanda e recursos para escalar
              2–3x. Parcerias com empresas para currículos customizados reduziram o mismatch em
              setores onde foram implementadas.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 6 */}
          <InfoCard
            title="6. Zonas econômicas especiais no Norte e Nordeste"
            subtitle="IMPACTO ALTO · 5–10 anos · Reduz dependência assistencial regional"
            color="var(--amber)"
          >
            <p>
              A Zona Franca de Manaus provou o conceito em 1967 — regime diferenciado de impostos
              cria mercado formal onde não havia. Mas o modelo está desatualizado. ZEEs modernas
              focadas em serviços digitais, energia renovável e bioeconomia amazônica podem criar
              mercados formais em estados com razão BF/emprego &gt; 1,0. Vietnam, Malásia e
              Etiópia usaram esse mecanismo para criar mercado de trabalho em regiões de baixa
              atratividade privada.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 7 */}
          <InfoCard
            title="7. Posicionamento estratégico em energia limpa e nearshoring"
            subtitle="IMPACTO ALTO · 2–5 anos · FDI greenfield +$20–30bi/ano"
            color="var(--amber)"
          >
            <p>
              Brasil tem 5ª maior capacidade renovável do mundo — ativo sub-monetizado. A demanda
              europeia por hidrogênio verde, a pressão do CBAM (Carbon Border Adjustment Mechanism)
              e a necessidade americana de diversificar cadeias de fornecimento criam demanda
              externa de capital que o Brasil pode capturar. Falta uma agência de promoção de
              investimento com mandato agressivo e uma política de "business climate" específica
              para setores de nova economia. Chile e UAE fizeram isso e colheram resultados em
              5–7 anos.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 8 */}
          <InfoCard
            title="8. Reforma do Judiciário econômico (execução de contratos e garantias)"
            subtitle="IMPACTO ALTO · 4–8 anos · Reduz spread 2–4 p.p. indiretamente"
            color="var(--amber)"
          >
            <p>
              O spread bancário é uma proxy do custo de insegurança jurídica. Tribunal especializado
              em disputas comerciais com prazo máximo de 18 meses, arbitragem obrigatória para
              contratos acima de R$500k e sistema de execução extrajudicial de garantias já existem
              em partes — falta integração e obrigatoriedade. Esse item move o spread indiretamente,
              mas também atrai capital de risco e cadeias de fornecimento internacionais que evitam
              mercados com risco judicial alto.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 9 */}
          <InfoCard
            title="9. Programa nacional de inglês técnico e idiomas"
            subtitle="IMPACTO MÉDIO · 8–15 anos · Longo prazo, mas fundacional"
            color="var(--blue)"
          >
            <p>
              O Brasil ocupa o último lugar em habilidades linguísticas no IMD. Isso não é relevante
              apenas para exportação de serviços — é barreira direta para absorção de tecnologia,
              integração em cadeias de valor globais e atração de talentos internacionais. Um
              programa de inglês técnico para o ensino médio técnico (SENAI, SENAC, ETECs), focado
              em vocabulário industrial e de TI, é a intervenção mais custo-eficiente nesse vetor.
              Índia usou esse ativo para dominar serviços digitais globais.
            </p>
          </InfoCard>

          {/* INTERVENÇÃO 10 */}
          <InfoCard
            title="10. Reforma fiscal de longo prazo (dívida/PIB e credibilidade macro)"
            subtitle="IMPACTO MÉDIO · 10–20 anos · Multiplicador de todas as demais"
            color="var(--blue)"
          >
            <p>
              A SELIC em 15% não é só política monetária — é o preço da desconfiança fiscal. Cada
              ponto percentual de déficit primário adicional que o mercado precifica resulta em
              0,5–1,5 p.p. no custo de capital privado. Um arcabouço fiscal crível — com teto de
              gastos real e regras de responsabilidade sub-nacionais — é o pré-requisito para que
              as demais reformas se traduzam em queda de custo de capital sustentável. Sem isso,
              qualquer melhora de spread é revertida em 2–3 ciclos eleitorais.
            </p>
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ════════════════════════════════════════════════════════════
          SEÇÃO 05 — OPORTUNIDADES SETORIAIS / POTENCIAL
         ════════════════════════════════════════════════════════════ */}
      <Section num="05" title="Para Onde Pode Vir a Competitividade">
        <Prose>
          <p>
            Atuando nas 4 primeiras intervenções simultaneamente em janela de 5–7 anos, onde o
            Brasil pode se posicionar no mapa global de competitividade — e em quais setores o
            país tem vantagem comparativa real para explorar.
          </p>
        </Prose>

        <Callout type="ok">
          Tese central: O Brasil não vai competir com Cingapura em instituições nem com China em
          manufatura de massa. A competitividade brasileira sustentável está em três vetores:
          (1) proteínas e bioeconomia (terra, água, biodiversidade), (2) energia limpa e
          hidrogênio verde (sol, vento, hidrelétrica), e (3) mercado interno de 215 milhões +
          serviços digitais em português. O problema é que esses vetores precisam de capital
          barato, logística eficiente e mão de obra qualificada para serem explorados —
          exatamente o que falta hoje.
        </Callout>

        <InfoGrid columns={2}>
          {/* VETOR 1 — ENERGIA LIMPA */}
          <InfoCard
            title="Hub de energia renovável e H2 verde"
            subtitle="Vetor 01 · Energia limpa · 5º mundial"
            color="var(--green)"
          >
            <p>
              Já na 5ª posição mundial em renováveis. Demanda europeia por H2 verde e
              biocombustíveis aumentando com CBAM. Nordeste tem irradiação solar entre as mais
              altas do mundo. Potencial: US$50–100bi em novos projetos até 2032 com regulatório
              adequado.
            </p>
          </InfoCard>

          {/* VETOR 2 — PROTEÍNAS E AGRO */}
          <InfoCard
            title="Potência proteica global"
            subtitle="Vetor 02 · Proteínas e agro · +US$150bi"
            color="var(--green)"
          >
            <p>
              Brasil já exporta US$150bi em agro/ano. Com logística melhorada (-3 pp custo) e
              abertura de novos mercados (tratados UE, Índia), pode dobrar em 10 anos. MATOPIBA
              ainda tem terra e água sub-exploradas. Bioeconomia amazônica é ativo estratégico
              inexplorado.
            </p>
          </InfoCard>

          {/* VETOR 3 — NEARSHORING */}
          <InfoCard
            title="Nearshoring para América do Sul"
            subtitle="Vetor 03 · Nearshoring · +$20–30bi"
            color="var(--amber)"
          >
            <p>
              Com reforma trabalhista e tributária, indústria de bens intermediários pode se
              relocalizar do México/Vietnam para o Brasil. Eixo São Paulo–Minas tem a maior
              concentração de engenheiros e técnicos da AL. Potencial adicional: US$20–30bi em
              FDI greenfield manufatureiro.
            </p>
          </InfoCard>

          {/* VETOR 4 — SERVIÇOS DIGITAIS */}
          <InfoCard
            title="Exportação de serviços digitais"
            subtitle="Vetor 04 · Serviços digitais · 67º→30º"
            color="var(--amber)"
          >
            <p>
              Hoje 67º em exportação de serviços comerciais — vergonhoso para a 12ª economia. Com
              idiomas, reformas e fintechs crescendo, o Brasil pode replicar o modelo indiano de
              exportação de IT services para mercado lusófono (África + Portugal/EU) + América
              Latina. Hoje exporta &lt; US$5bi em tech services. Potencial: US$20–30bi.
            </p>
          </InfoCard>

          {/* VETOR 5 — MERCADO INTERNO */}
          <InfoCard
            title="Mercado interno de 215 milhões"
            subtitle="Vetor 05 · Mercado interno · 4º PPP"
            color="var(--green)"
          >
            <p>
              4º maior mercado consumidor do mundo em purchasing power parity. Empreendedorismo
              early-stage em 4º lugar no IMD. Com crédito acessível e formalização crescente, o
              consumo interno pode sustentar industrialização doméstica que não depende de
              exportação para crescer — exatamente o que países menores não têm.
            </p>
          </InfoCard>

          {/* SÍNTESE — POTENCIAL 2033 */}
          <InfoCard
            title="Top 35–40 IMD em 7 anos"
            subtitle="Síntese · Potencial 2033"
            color="var(--green)"
          >
            <p>
              Atuando nos pontos 1–5 do ranking de intervenções, o Brasil pode entrar no top
              35–40 do IMD até 2030–33 — posição comparável ao México ou Polônia atual. Não é
              o topo. Mas é a fronteira entre "país que compete" e "país que assiste". A escolha
              é de vontade política, não de recursos ou capacidade.
            </p>
          </InfoCard>
        </InfoGrid>

        <Callout type="info">
          Diagnose final: O Brasil não tem problema de potencial — tem problema de fricção. FDI
          top 5 mundial com crédito penúltimo lugar é a comprovação: o capital quer entrar, mas é
          destruído pelo ambiente antes de criar riqueza distribuída. A competitividade brasileira
          não vai vir de vantagens novas — vai vir de remover obstáculos que já existem há décadas.
          As ferramentas estão identificadas. O que falta é a sequência de execução e a vontade
          política de não recuar nas reformas mais necessárias nos ciclos eleitorais que elas
          atravessam.
        </Callout>
      </Section>
    </ReportShell>
  );
}
