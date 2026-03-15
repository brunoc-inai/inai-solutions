import ReportShell, {
  Section,
  StatGrid,
  StatCard,
  DataTable,
  Callout,
  BarChart,
  HorizBar,
  CompareRow,
  Prose,
  FactorCard,
  InfoGrid,
  InfoCard,
} from './ReportShell';

export default function ReportPobreza({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="O Nó que Perpetua a Pobreza"
      eyebrow="Estudo Analítico · Pobreza Estrutural"
      color="var(--gold)"
      onClose={onClose}
    >
      {/* ================================================================
          SECTION 01 — O Programa em Números
          ================================================================ */}
      <Section num="01" title="O Programa em Números">
        <StatGrid>
          <StatCard value="R$158,6" unit="bi" label="Bolsa Família — Orçamento 2025. Queda de R$9,6bi vs 2024 após pente-fino via IA (TCU)" color="var(--gold)" />
          <StatCard value="R$683" unit="/mês" label="Valor médio por família — complementação de renda, insuficiente como substituição" color="var(--gold)" />
          <StatCard value="6,5" unit="mi" label="BPC beneficiários — alta de 47% desde jan/2023. 15,3% via decisão judicial" color="var(--purple)" />
          <StatCard value="4,1" unit="mi" label="Benefícios cancelados 2023–2024 — fraudes, irregularidades, renda acima do limite" color="var(--red)" />
          <StatCard value="R$20" unit="bi" label="Apostas online — movimentados por beneficiários do Bolsa Família em 2024" color="var(--red)" />
          <StatCard value="R$1,6" unit="tri" label="Total pago 2020–2025 — acumulado de todos os programas de transferência" color="var(--gold)" />
        </StatGrid>

        <Prose>
          <p>
            O Bolsa Família não é, como frequentemente retratado, um programa monolítico de dependência.
            É um sistema de transferência de renda com perfil demográfico e dinâmico — há entrada, há saída,
            há fraude, há emancipação genuína.
          </p>
          <p>
            O que os dados mostram de forma consistente: <strong>o programa funciona melhor como trampolim
            do que sua reputação sugere</strong> nas regiões onde há mercado de trabalho. O problema se
            aprofunda onde não há.
          </p>
        </Prose>

        <Callout type="warn">
          <strong>Principais irregularidades identificadas:</strong> Renda acima do limite declarada
          falsamente, cadastros duplicados de famílias unipessoais, beneficiários falecidos não
          comunicados, e apostas online — movimentação de R$20 bilhões em 2024 por beneficiários
          do programa.
        </Callout>

        <DataTable
          headers={['Componente', 'Gasto 2025 (R$ bi)', 'Obs.']}
          rows={[
            ['Bolsa Família', '158,6', 'Queda pós pente-fino'],
            ['BPC', '102', '+47% desde 2023'],
            ['Pé-de-Meia', '12,5', 'Programa educacional'],
            ['Outros', '168', 'Demais transferências'],
            ['Total welfare', '~441', 'Estimativa consolidada'],
          ]}
          highlight={4}
        />
      </Section>

      {/* ================================================================
          SECTION 02 — Rotatividade e Emancipação
          ================================================================ */}
      <Section num="02" title="Rotatividade e Emancipação">
        <StatGrid>
          <StatCard value="31,25" unit="%" label="Famílias que saíram jan/2023 → out/2025 — estudo FGV EPGE, dez/2025" color="var(--green)" />
          <StatCard value="98,8" unit="%" label="Vagas formais 2024 ocupadas por inscritos no CadÚnico — dados CAGED (das 1,7mi vagas)" color="var(--green)" />
          <StatCard value="958" unit="mil" label="Julho 2025 — saídas em um único mês (536mi fim regra proteção, 385mi renda acima)" color="var(--gold)" />
          <StatCard value=">50" unit="%" label="Jovens 15–17 (2014) fora do CadÚnico em 2025 — 28,4% com vínculo formal em 2023" color="var(--green)" />
        </StatGrid>

        <HorizBar items={[
          { label: 'Novas inclusões 2024', value: 2.0, max: 3.5, color: 'var(--green)', suffix: ' mi' },
          { label: 'Saídas pente-fino 2024', value: -3.0, max: 3.5, color: 'var(--red)', suffix: ' mi' },
          { label: 'Saídas por renda 2024', value: -1.3, max: 3.5, color: 'var(--red)', suffix: ' mi' },
          { label: 'Saídas por renda 2025', value: -1.3, max: 3.5, color: 'var(--red)', suffix: ' mi' },
          { label: 'Fim regra proteção 2025', value: -0.726, max: 3.5, color: 'var(--coral)', suffix: ' mi' },
        ]} />

        <Prose>
          <p>
            <strong>A regra de proteção</strong> é o mecanismo central de transição: ao superar R$218 per
            capita, a família mantém 50% do benefício por até 24 meses, com retorno garantido em até
            36 meses sem novo cadastro. É a resposta ao medo documentado de perder a renda segura.
          </p>
          <p>
            O IPEA confirma: <strong>beneficiários têm mais medo de perder a renda segura do programa do
            que o ganho esperado do emprego formal</strong> em mercado de alta rotatividade — especialmente
            onde o emprego tipicamente dura menos de 6 meses.
          </p>
        </Prose>

        <Callout type="warn">
          <strong>Efeito de longo prazo (FGV):</strong> Adiar 1 ano o primeiro emprego formal equivale
          a perder 1 ano de escolaridade — redução de aproximadamente 10% na renda ao longo de toda
          a vida. O impacto é concentrado em homens jovens de 14–30 anos no Norte e Nordeste.
        </Callout>

        <Prose>
          <p>
            Em contrapartida, <strong>75,5% das vagas formais criadas em 2024</strong> foram preenchidas
            por beneficiários do Bolsa Família — o programa não impede a entrada no mercado, mas a
            qualidade e permanência desses empregos é o fator limitante.
          </p>
        </Prose>
      </Section>

      {/* ================================================================
          SECTION 03 — Dependência Regional
          ================================================================ */}
      <Section num="03" title="Dependência Regional">
        <Prose>
          <p>
            A assimetria regional é a dimensão mais reveladora da crise. Dez estados brasileiros possuem
            mais beneficiários do Bolsa Família do que empregos com carteira assinada — todos no Norte
            ou Nordeste. Não é coincidência: é o produto de décadas de subinvestimento em infraestrutura,
            sistema educacional e capital institucional.
          </p>
        </Prose>

        <DataTable
          headers={['#', 'Estado', 'Razão BF/Empregos', 'Nota']}
          rows={[
            ['01', 'Maranhão', '1,77×', 'Caso mais grave'],
            ['02', 'Piauí', '1,65×', ''],
            ['03', 'Amapá', '1,48×', ''],
            ['04', 'Acre', '1,38×', ''],
            ['05', 'Roraima', '1,32×', ''],
            ['06', 'Pará', '1,22×', ''],
            ['07', 'Alagoas', '1,18×', ''],
            ['08', 'Amazonas', '1,14×', ''],
            ['09', 'Paraíba', '1,07×', ''],
            ['10', 'Ceará', '1,04×', ''],
            ['11', 'Rio G. do Norte', '0,93×', '1° nordestino abaixo de 1,0'],
            ['12', 'Santa Catarina', '0,08×', '12 empregos por beneficiário'],
          ]}
        />

        <BarChart items={[
          { label: 'Nordeste', value: 8.7, max: 10, color: 'var(--red)' },
          { label: 'Norte', value: 2.8, max: 10, color: 'var(--red)' },
          { label: 'Sudeste', value: 5.2, max: 10, color: 'var(--blue)' },
          { label: 'Sul', value: 1.1, max: 10, color: 'var(--green)' },
          { label: 'Centro-Oeste', value: 0.9, max: 10, color: 'var(--gold)' },
        ]} />

        <StatGrid>
          <StatCard value="1,77" unit="×" label="Maranhão — razão BF/empregos. 1,2mi famílias BF vs 659mi empregos formais" color="var(--red)" />
          <StatCard value="46" unit="%" label="Nordeste — % total beneficiários. 8,7mi famílias — Bahia lidera com 2,3mi" color="var(--gold)" />
          <StatCard value="2,18" unit="mi" label="São Paulo — em números absolutos. 2° no ranking absoluto — pobreza urbana densa" color="var(--blue)" />
          <StatCard value="~20" unit="%" label="Dependência intergeracional — filhos de beneficiários de 2005 ainda no programa em 2019" color="var(--red)" />
        </StatGrid>

        <Prose>
          <p>
            Santa Catarina representa o polo oposto: <strong>12 empregos formais por
            beneficiário</strong>. A diferença entre SC e MA não é cultural — é estrutural:
            infraestrutura logística, densidade empresarial, qualidade educacional e ausência
            relativa de corrupção nas contratações públicas.
          </p>
          <p>
            Rio Grande do Norte foi o <strong>primeiro estado nordestino a inverter a razão</strong> (0,93
            em 2024, caindo de 1,14 em 2023) — demonstrando que a reversão é possível com mercado de
            trabalho ativo.
          </p>
        </Prose>
      </Section>

      {/* ================================================================
          SECTION 04 — O Nó Econômico — Sistema de Traps
          ================================================================ */}
      <Section num="04" title="O Nó Econômico — Sistema de Traps">
        <Prose>
          <p>
            O problema central não é o design do Bolsa Família. É o <strong>ambiente de
            destino</strong>: onde não há empregos formais dignos, qualquer programa de transferência
            de renda se torna estruturalmente permanente — não por comportamento, mas por ausência
            de alternativas. O Custo Brasil é o mecanismo que fecha essa porta.
          </p>
          <p>
            O Observatório do Custo Brasil (MBC + MDIC) estimou o impacto total em <strong>R$1,7
            trilhão por ano</strong> — equivalente a 20% do PIB, mais do que o PIB combinado de
            Paraguai, Bolívia, Uruguai, Venezuela e Peru.
          </p>
        </Prose>

        <CompareRow label="Compliance fiscal (horas/ano)" brazil={1500} reference={160} refLabel="OCDE" unit="h" inverse />
        <CompareRow label="Custo logístico (% PIB)" brazil={15.5} reference={8.8} refLabel="EUA" unit="%" inverse />
        <CompareRow label="Spread bancário (p.p.)" brazil={17.8} reference={5.5} refLabel="OCDE" unit=" p.p." inverse />
        <CompareRow label="Corrupção (IPC invertido)" brazil={65} reference={25} refLabel="OCDE" unit="" inverse />
        <CompareRow label="Encargos s/ salário (% custo)" brazil={53} reference={15} refLabel="OCDE" unit="%" inverse />

        <DataTable
          headers={['Indicador', 'Brasil', 'Referência OCDE', 'Multiplicador']}
          rows={[
            ['Compliance fiscal (horas/ano)', '1.500', '160', '9,4×'],
            ['Custo logístico (% PIB)', '15,5%', '8,8%', '1,8×'],
            ['Spread bancário (p.p.)', '17,8', '5,5', '3,2×'],
            ['Corrupção (IPC invertido)', '65', '25', '2,6×'],
            ['Trabalhador retém (% do custo)', '47%', '85%', '1,8×'],
          ]}
        />
      </Section>

      {/* ================================================================
          SECTION 05 — As 6 Camadas de Bloqueio
          ================================================================ */}
      <Section num="05" title="As 6 Camadas de Bloqueio">

        <FactorCard
          title="01 · Complexidade Fiscal — Manicômio tributário"
          score="1.500h/ano"
          scoreLabel=" · 68 tributos federais"
          color="var(--purple)"
          tags={['Compliance', 'PMEs', 'Interior']}
        >
          <p>
            Empresas brasileiras gastam 1.500h por ano apenas para cumprir obrigações tributárias —
            contra 160h na média da OCDE e 30h em Singapura. O "manicômio tributário" pune
            desproporcionalmente PMEs no interior, que não têm escala para diluir o custo de um
            departamento fiscal. Para um pequeno negócio em Bacabal (MA), o compliance consome
            margem que não existe.
          </p>
        </FactorCard>

        <FactorCard
          title="02 · Custo de Capital — Spread bancário sistêmico"
          score="17,8 p.p."
          scoreLabel=" · 3° maior spread mundial"
          color="var(--blue)"
          tags={['Spread', 'Concentração bancária', 'Insegurança jurídica']}
        >
          <p>
            Capital de giro a 18%+ ao ano não é incômodo operacional — é inviabilizante para margens
            de 10–15%. O spread alto tem raiz estrutural: o Brasil recupera apenas US$0,13 de cada
            US$1 emprestado na execução judicial. A insegurança jurídica literalmente vira taxa de
            juros. Os 5 maiores bancos controlam 80% do crédito, sem pressão competitiva suficiente.
          </p>
        </FactorCard>

        <FactorCard
          title="03 · Gargalo Logístico — Infraestrutura de exclusão"
          score="15,5% PIB"
          scoreLabel=" · vs 8,8% nos EUA"
          color="var(--blue)"
          tags={['Rodovias', 'Frete', 'Exclusão territorial']}
        >
          <p>
            67% da carga vai por rodovias — o modal mais caro. O custo logístico saltou de 10,4% do
            PIB em 2014 para 15,5% em 2025 enquanto o volume de carga cresceu 25%. Para regiões
            remotas, o frete não é desvantagem competitiva: é exclusão do mercado nacional. Em muitos
            casos, exportar do porto para a China custa menos do que levar a carga do interior até
            o porto.
          </p>
        </FactorCard>

        <FactorCard
          title="04 · Corrupção Sistêmica — Custo invisível de capital"
          score="107° lugar"
          scoreLabel=" · IPC 35/100 (2025)"
          color="var(--gold)"
          tags={['IPC', 'Licitações', 'Risco regulatório']}
        >
          <p>
            Brasil atingiu sua pior posição histórica no Índice de Percepção da Corrupção. O efeito
            concreto vai além da moral: eleva a percepção de risco regulatório e jurídico, afastando
            capital externo; no plano local, licitações direcionadas eliminam concorrentes honestos.
            O esquema investigado no DNOCS — órgão de obras no semiárido — movimentou R$1,4 bi em
            desvios: infraestrutura que nunca chega é corrupção monetizada em pobreza.
          </p>
        </FactorCard>

        <FactorCard
          title="05 · Insegurança Jurídica — O multiplicador de custos"
          score="US$0,13"
          scoreLabel=" / US$1 recuperado"
          color="var(--gold)"
          tags={['Execução judicial', 'Garantias', 'Cadeias de suprimento']}
        >
          <p>
            O sistema jurídico ineficiente aparece no custo financeiro de todas as outras barreiras.
            O spread bancário é composto 30% por inadimplência, parcela significativa explicada pela
            dificuldade de executar garantias. Contratos de fornecimento mal executados sem mecanismo
            eficaz de recuperação inibem cadeias de suprimento formais. É o elo invisível que conecta
            todas as demais camadas.
          </p>
        </FactorCard>

        <FactorCard
          title="06 · Deficit de Capital Humano — O fechamento do ciclo"
          score="47%"
          scoreLabel=" vai ao trabalhador · vs 85% na OCDE"
          color="var(--green)"
          tags={['Encargos', 'Informalidade', 'Empregabilidade']}
        >
          <p>
            Encargos trabalhistas representam 53% do custo de um funcionário antes de chegar ao seu
            salário. Isso faz a formalização ser uma desvantagem para pequenas empresas que competem
            com a informalidade. Ao mesmo tempo, o perfil médio do beneficiário (fundamental
            incompleto) limita a empregabilidade nos setores que crescem. A combinação cria um
            mercado de trabalho que penaliza tanto quem contrata formalmente quanto quem quer ser
            contratado.
          </p>
        </FactorCard>

        <Callout type="danger">
          <strong>Por que as barreiras se multiplicam:</strong> Essas seis camadas não atuam em
          paralelo — elas se retroalimentam. A insegurança jurídica eleva o spread, que encarece o
          capital de giro, que torna inviável absorver o custo de compliance, que pressiona para
          informalidade, que reduz a base tributária, que empobrece o serviço público, que deteriora
          a infraestrutura. É um equilíbrio estável — e isso é o que torna a ruptura difícil.
        </Callout>
      </Section>

      {/* ================================================================
          SECTION 06 — Tipologia de Solução por Município
          ================================================================ */}
      <Section num="06" title="Tipologia de Solução por Município">
        <Prose>
          <p>
            A implicação estratégica mais importante do estudo: <strong>não existe uma solução
            única</strong>. A resposta correta depende da tipologia do município. Tratar Belém como
            Bacabal ou Bacabal como um município de SC é desperdiçar recursos e expectativas.
          </p>
        </Prose>

        <InfoGrid columns={3}>
          <InfoCard title="Cidades médias N/NE" subtitle="+50 mil hab." color="var(--green)">
            <p><strong>Características:</strong> Alguma infraestrutura. Mercado local existente. Agronegócio próximo (MATOPIBA).</p>
            <p><strong>Estratégia adequada:</strong> Incentivos fiscais diferenciados. Zona de desenvolvimento. Conexão com cadeias de agronegócio. Setor privado atraível com condições adequadas.</p>
            <p><strong>Camada irredutível:</strong> Moderada</p>
          </InfoCard>
          <InfoCard title="Municípios remotos pequenos" subtitle="5–20 mil hab." color="var(--gold)">
            <p><strong>Características:</strong> Infraestrutura básica ausente. Mercado local insuficiente. Distância de centros de emprego.</p>
            <p><strong>Estratégia adequada:</strong> Mobilidade assistida: qualificação + bolsa de transição + documentação. Mais custo-efetiva que criar polo econômico do zero sem infraestrutura prévia.</p>
            <p><strong>Camada irredutível:</strong> Alta</p>
          </InfoCard>
          <InfoCard title="Camada irredutível" subtitle="Qualquer localidade" color="var(--red)">
            <p><strong>Características:</strong> Idosos, deficientes severos, cuidadores exclusivos sem alternativas de cuidado.</p>
            <p><strong>Estratégia adequada:</strong> Assistencialismo é a resposta correta. O debate deve ser sobre suficiência do valor, não emancipação. Não há "mercado de trabalho" disponível aqui.</p>
            <p><strong>Camada irredutível:</strong> Total</p>
          </InfoCard>
        </InfoGrid>

        <DataTable
          headers={['Tipologia', 'Características', 'Estratégia adequada', 'Camada irredutível']}
          rows={[
            ['Cidades médias N/NE (+50 mil hab.)', 'Alguma infraestrutura. Mercado local existente. Agronegócio próximo (MATOPIBA).', 'Incentivos fiscais diferenciados. Zona de desenvolvimento. Conexão com cadeias de agronegócio.', 'Moderada'],
            ['Municípios remotos pequenos (5–20 mil hab.)', 'Infraestrutura básica ausente. Mercado local insuficiente. Distância de centros de emprego.', 'Mobilidade assistida: qualificação + bolsa de transição + documentação.', 'Alta'],
            ['Camada irredutível (qualquer localidade)', 'Idosos, deficientes severos, cuidadores exclusivos sem alternativas de cuidado.', 'Assistencialismo é a resposta correta. Debate sobre suficiência do valor, não emancipação.', 'Total'],
          ]}
        />

        <Callout type="ok">
          <strong>Conclusão central:</strong> O nó não é comportamental — é econômico-regional. Onde há
          mercado formal, a emancipação acontece: FGV confirma que 31,25% dos beneficiários de 2023
          já saíram do programa até 2025, e 98,8% das vagas formais criadas em 2024 foram preenchidas
          por inscritos no CadÚnico. O problema é que, em significativa faixa do território nacional,
          o mercado formal simplesmente não existe em escala suficiente — e as 6 barreiras do Custo
          Brasil são o principal mecanismo que impede sua criação.
        </Callout>
      </Section>
    </ReportShell>
  );
}
