import ReportShell, {
  Section, StatGrid, StatCard, DataTable, Callout, BarChart, HorizBar,
  Prose, FactorCard, ScenarioGrid, Timeline, InfoGrid, InfoCard, CompareRow
} from './ReportShell';

export default function ReportDefesa({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Brasil — Poder Militar 2026"
      eyebrow="Fontes: SIPRI · IISS Military Balance · GlobalFirepower · RUSI — Atualizado: Março 2026 — GFP Rank Brasil: #11 Global"
      color="var(--coral)"
      onClose={onClose}
    >
      {/* ===== 01 ORÇAMENTO ===== */}
      <Section num="01" title="Orçamento Militar Brasileiro">
        <Prose><p>Composição, histórico e benchmarks internacionais — 2025/2026</p></Prose>
        <StatGrid>
          <StatCard value="23,5" unit=" bi USD" label="Orçamento Total 2025 (+6% proposto p/ 2026)" color="var(--coral)" />
          <StatCard value="1,1" unit="% PIB" label="% do PIB (Meta OTAN: 2%)" color="var(--red)" />
          <StatCard value="#21" unit="" label="Rank Global (gastos) — caiu de #17 em 2023" color="var(--blue)" />
          <StatCard value="76" unit="%" label="Pessoal + Pensões (maior proporção do mundo)" color="var(--amber)" />
          <StatCard value="~8" unit="%" label="Investimento efetivo (~US$ 1,9 Bi p/ equipamentos)" color="var(--teal)" />
          <StatCard value="64k" unit=" USD" label="Gasto por militar ativo (vs US$ 526k EUA)" color="var(--purple)" />
        </StatGrid>

        <Callout type="warn">
          Problema estrutural crítico: Com 76% destinados a pessoal e pensões, o Brasil tem apenas US$ ~5,6 bilhões para operações, manutenção, R&D e aquisição de equipamentos — o que equivale a uma força com excelentes "cadeiras de escritório" mas parca capacidade de combate moderno.
        </Callout>

        <DataTable
          headers={['Categoria', '% do Total', 'US$ Estimado', 'Detalhes']}
          rows={[
            ['Salários — Pessoal Ativo', '~48%', '~US$ 11,3 Bi', '366.500 militares ativos + civis do MD'],
            ['Pensões Militares', '~28%', '~US$ 6,6 Bi', 'Sistemas de aposentadoria separados dos civis; custo crescente'],
            ['Operações & Manutenção', '~10%', '~US$ 2,4 Bi', 'Treinamento, combustível, manutenção de bases, operações correntes'],
            ['Aquisição de Equipamentos', '~8%', '~US$ 1,9 Bi', 'F-39 Gripen, VBTP Guarani, PROSUB, KC-390, SISFRON'],
            ['Pesquisa & Desenvolvimento', '~3%', '~US$ 0,7 Bi', 'ITA, IMBEL, Embraer Defesa, CTA — submarino nuclear (Álvaro Alberto)'],
            ['Infraestrutura & Construção', '~2%', '~US$ 0,5 Bi', 'Bases, quartéis, portos navais, pistas'],
            ['Outros (inteligência, cyber, saúde)', '~1%', '~US$ 0,1 Bi', 'SISBIN, CDCiber, hospitais militares'],
            ['TOTAL', '100%', '~US$ 23,5 Bi', 'Fonte: PLOA 2025, SIOP, IISS 2025'],
          ]}
          highlight={7}
        />
      </Section>

      {/* ===== 02 DECOMPOSIÇÃO DO ORÇAMENTO ===== */}
      <Section num="02" title="Decomposição do Orçamento (% e US$ Bi)">
        <BarChart items={[
          { label: 'Salários (US$ 11,3 Bi)', value: 48, max: 50, color: 'var(--red)' },
          { label: 'Pensões Militares (US$ 6,6 Bi)', value: 28, max: 50, color: 'var(--coral)' },
          { label: 'Operações & Manutenção (US$ 2,4 Bi)', value: 10, max: 50, color: 'var(--amber)' },
          { label: 'Equipamentos (US$ 1,9 Bi)', value: 8, max: 50, color: 'var(--blue)' },
          { label: 'P&D (US$ 0,7 Bi)', value: 3, max: 50, color: 'var(--teal)' },
          { label: 'Infraestrutura (US$ 0,5 Bi)', value: 2, max: 50, color: 'var(--purple)' },
          { label: 'Outros (US$ 0,1 Bi)', value: 1, max: 50, color: 'var(--text-muted)' },
        ]} />
      </Section>

      {/* ===== 03 COMPARAÇÃO INTERNACIONAL ===== */}
      <Section num="03" title="Comparação Internacional (% PIB em Defesa)">
        <BarChart items={[
          { label: 'Israel', value: 4.5, max: 5, color: 'var(--red)' },
          { label: 'Rússia', value: 4.1, max: 5, color: 'var(--red)' },
          { label: 'EUA', value: 3.4, max: 5, color: 'var(--blue)' },
          { label: 'Colômbia', value: 3.1, max: 5, color: 'var(--amber)' },
          { label: 'Índia', value: 2.4, max: 5, color: 'var(--amber)' },
          { label: 'UK', value: 2.3, max: 5, color: 'var(--blue)' },
          { label: 'França', value: 2.1, max: 5, color: 'var(--blue)' },
          { label: 'Meta OTAN', value: 2.0, max: 5, color: 'var(--green)' },
          { label: 'Venezuela', value: 1.5, max: 5, color: 'var(--amber)' },
          { label: 'Turquia', value: 1.4, max: 5, color: 'var(--amber)' },
          { label: 'Brasil', value: 1.1, max: 5, color: 'var(--coral)' },
          { label: 'Paraguai', value: 1.1, max: 5, color: 'var(--text-muted)' },
          { label: 'Argentina', value: 0.8, max: 5, color: 'var(--text-muted)' },
        ]} />
        <Callout type="info">
          Dados SIPRI / IISS 2024-2025. A meta da OTAN é 2% do PIB. Brasil ficou em torno de 1,0–1,1% desde 2019.
        </Callout>
      </Section>

      {/* ===== 04 EVOLUÇÃO HISTÓRICA ===== */}
      <Section num="04" title="Evolução Histórica do Orçamento (US$ bilhões, valores correntes)">
        <DataTable
          headers={['Ano', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']}
          rows={[
            ['US$ Bi', '28,4', '32,1', '33,6', '33,5', '31,8', '22,0', '18,6', '17,8', '18,2', '19,6', '19,1', '19,8', '20,6', '20,2', '20,9', '23,5'],
          ]}
        />
        <Callout type="danger">
          Queda real significativa de 2015–2018 por crise econômica e desvalorização do real. Recuperação modesta a partir de 2019. O orçamento caiu ~44% em dólar entre 2014 e 2018 e nunca se recuperou ao patamar anterior. A defasagem de equipamentos acumula-se desde então.
        </Callout>
      </Section>

      {/* ===== 05 PESSOAL & ESTRUTURA ===== */}
      <Section num="05" title="Pessoal & Estrutura Organizacional">
        <Prose><p>Composição das Forças Armadas, treinamento e capacidade de mobilização</p></Prose>
        <StatGrid>
          <StatCard value="366.500" unit="" label="Militares Ativos (Rank #14 global)" color="var(--blue)" />
          <StatCard value="1,34" unit=" mi" label="Reservistas (treinados com baixa atualização)" color="var(--amber)" />
          <StatCard value="395.000" unit="" label="Paramilitar (Polícias Militares estaduais)" color="var(--coral)" />
          <StatCard value="~2,1" unit=" mi" label="Força Total Mobilizável (teórica)" color="var(--red)" />
          <StatCard value="224.000" unit="" label="Exército (12 Regiões Militares)" color="var(--blue)" />
          <StatCard value="87.500" unit="" label="Marinha (incl. Fuzileiros Navais)" color="var(--teal)" />
          <StatCard value="69.000" unit="" label="Força Aérea (+modernização Gripen)" color="var(--green)" />
          <StatCard value="1,73" unit="" label="Militares por 1.000 hab. (Rank 17° — baixo p/ tamanho)" color="var(--purple)" />
        </StatGrid>

        <DataTable
          headers={['Ramo', 'Efetivo Ativo', 'Reservistas']}
          rows={[
            ['Exército', '224.000', '800.000'],
            ['Marinha', '87.500', '340.000'],
            ['Força Aérea', '69.000', '200.000'],
            ['Total', '366.500', '1.340.000'],
          ]}
          highlight={3}
        />
      </Section>

      {/* ===== 06 QUALIDADE DO TREINAMENTO ===== */}
      <Section num="06" title="Avaliação de Qualidade de Treinamento por Ramo">
        <DataTable
          headers={['Ramo / Unidade', 'Score', 'Pontos Fortes', 'Pontos Fracos']}
          rows={[
            ['Exército — Tropa Geral', '55/100', 'Longa experiência em selva, CIGS reconhecido, operações GLO', 'Baixa rotatividade de treinamento real, cortes de combustível e munição'],
            ['Forças Especiais (CDS/CCOMGEX)', '80/100', 'Certificadas internacionalmente, intercâmbio com EUA/UE, missões ONU', 'Efetivo pequeno, limitações de material'],
            ['CIGS (Guerra na Selva)', '85/100', 'Melhor treinamento de guerra na selva do mundo — exportado p/ +30 países', 'Específico para cenário amazônico; limitado para guerras convencionais'],
            ['Marinha — Fuzileiros Navais', '70/100', 'Unidades anfíbias bem treinadas, exercícios com USN e Royal Marines', 'Falta de plataformas modernas limita capacidade de projeção'],
            ['Força Aérea — Pilotos de Combate', '72/100', 'Academia AFA de alto nível, participação em exercícios CRUZEX/LAAD', 'Horas de voo abaixo do ideal por restrições orçamentárias até 2022'],
            ['Cyber Defense Command (CDCiber)', '60/100', 'Criado em 2010, um dos mais antigos na região, cooperação com EUA', 'Suborçado, talentos migram para setor privado'],
            ['Reservistas', '25/100', 'Numerosos no papel', 'Treinamento irregular, sem atualizações periódicas, baixa prontidão real'],
          ]}
        />
        <HorizBar items={[
          { label: 'CIGS (Selva)', value: 85, max: 100, color: 'var(--green)' },
          { label: 'Forças Especiais', value: 80, max: 100, color: 'var(--green)' },
          { label: 'FAB Pilotos', value: 72, max: 100, color: 'var(--blue)' },
          { label: 'Marinha Fuzileiros', value: 70, max: 100, color: 'var(--blue)' },
          { label: 'CDCiber', value: 60, max: 100, color: 'var(--amber)' },
          { label: 'Exército Tropa Geral', value: 55, max: 100, color: 'var(--amber)' },
          { label: 'Reservistas', value: 25, max: 100, color: 'var(--red)' },
        ]} />
        <Callout type="info">
          Escores estimados com base em relatórios IISS Military Balance, RUSI e avaliações abertas de adidâncias militares estrangeiras.
        </Callout>
      </Section>

      {/* ===== 07 EQUIPAMENTOS — FORÇAS TERRESTRES ===== */}
      <Section num="07" title="Forças Terrestres — Inventário">
        <StatGrid>
          <StatCard value="294" unit="" label="Tanques (MBT) — Leopard 1A5 + M60A3" color="var(--coral)" />
          <StatCard value="2.250+" unit="" label="Blindados Totais — VBTP Guarani, EE-9, EE-11" color="var(--blue)" />
          <StatCard value="~36" unit="" label="Artilharia Autopropelida — M109A3/A5 + ASTROS II" color="var(--amber)" />
          <StatCard value="~67" unit="" label="MLRS (ASTROS II) — Alcance até 300 km (SS-60)" color="var(--green)" />
        </StatGrid>
        <DataTable
          headers={['Sistema', 'Quantidade', 'Origem', 'Geração', 'Status']}
          rows={[
            ['Leopard 1A5 (MBT)', '~220', 'Alemanha', 'Anos 1960s/upg', 'Obsoleto — blindagem inadequada p/ 2026'],
            ['M60A3 (MBT)', '~74', 'EUA', 'Anos 1960s', 'Operacional limitado'],
            ['VBTP-MR Guarani (6x6 APC)', '~530 (de 2.044 contratados)', 'Brasil (IVECO/BDMG)', '2012–', 'Moderno — programa em andamento'],
            ['Centauro II (8x8 Tank Destroyer)', '~100 contratados', 'Itália/Brasil (Oto Melara/VBTP)', '2020s', 'Em entrega — mais capaz que Leopard 1'],
            ['EE-9 Cascavel (Cav Blindada)', '~290', 'Brasil (Engesa)', '1970s', 'Envelhecido'],
            ['ASTROS II (MLRS)', '~67 lançadores', 'Brasil (Avibras)', '1983/upg 2000s', 'Competitivo regionalmente'],
            ['M109A3/A5 (obus autopropelido)', '~36', 'EUA', '1960s', 'Limitado'],
          ]}
        />
        <Callout type="warn">
          Lacuna crítica: Os MBTs principais (Leopard 1A5 e M60A3) são tanques dos anos 1960 — não podem enfrentar MBTs modernos de qualquer potência de nível A ou superior. O VBTP Guarani e o Centauro II são bons equipamentos, mas o programa de modernização está atrasado.
        </Callout>
      </Section>

      {/* ===== 08 EQUIPAMENTOS — FORÇA AÉREA ===== */}
      <Section num="08" title="Força Aérea — Inventário">
        <StatGrid>
          <StatCard value="502" unit="" label="Aeronaves Totais (fixed-wing + helicópteros)" color="var(--blue)" />
          <StatCard value="~42" unit="" label="Caças/Multirole — F-39 Gripen E/F (chegando)" color="var(--green)" />
          <StatCard value="~98" unit="" label="Ataque Leve (COIN) — A-29 Super Tucano" color="var(--amber)" />
          <StatCard value="~26" unit="" label="Transporte Estratégico — KC-390 + C-130H" color="var(--teal)" />
        </StatGrid>
        <DataTable
          headers={['Aeronave', 'Qtd. (est.)', 'Função', 'Origem', 'Avaliação']}
          rows={[
            ['F-39 Gripen E/F', '20 entregues de 36 contratados', 'Multirole 4.5ª geração', 'Saab (Suécia) / Embraer (Brasil)', 'Excelente — radar AESA, BVR, jamming'],
            ['A-29 Super Tucano', '~98', 'COIN / Ataque leve', 'Embraer (Brasil)', 'Melhor do mundo na categoria'],
            ['KC-390 Millennium', '~14 (FAB) + 3 (Portugal)', 'Transporte / Reabastecimento', 'Embraer (Brasil)', 'Excelente — competindo com C-130J'],
            ['C-130H Hercules', '~12', 'Transporte médio', 'Lockheed (EUA)', 'Envelhecendo (a ser substituído pelo KC-390)'],
            ['E-99 (EMB 145 AEW&C)', '5', 'Alerta Aéreo Avançado', 'Embraer/Saab (Brasil)', 'Capacidade única na AL — vital para defesa'],
            ['R-99 (Patrulha)', '~9', 'ISR/Patrulha', 'Embraer (Brasil)', 'Integrado ao SIVAM/SISFRON'],
            ['H-60 Black Hawk', '~40', 'Transporte / SAR', 'Sikorsky (EUA)', 'Boa capacidade'],
          ]}
        />
        <Callout type="info">
          Ponto forte emergente: O F-39 Gripen E/F com radar AESA Raven, capacidade BVR (além do alcance visual) e jammer integrado coloca a FAB em patamar tecnológico superior a todas as forças da América Latina e equiparável a forças europeias de nível B/C. Em 2026 o Brasil ainda não tem caça 5ª geração.
        </Callout>
      </Section>

      {/* ===== 09 EQUIPAMENTOS — FORÇA NAVAL ===== */}
      <Section num="09" title="Força Naval — Inventário">
        <StatGrid>
          <StatCard value="68" unit="" label="Embarcações Totais (incluindo patrulha fluvial)" color="var(--blue)" />
          <StatCard value="4+1" unit="" label="Submarinos — 4 Scorpène + 1 S-BR em teste" color="var(--teal)" />
          <StatCard value="8" unit="" label="Fragatas — Niterói + Tamandaré (em construção)" color="var(--coral)" />
          <StatCard value="1" unit="" label="Porta-helicópteros — LPH Atlântico (ex-HMS Ocean)" color="var(--green)" />
        </StatGrid>
        <DataTable
          headers={['Classe', 'Qtd.', 'Tipo', 'Status']}
          rows={[
            ['LPH Atlântico', '1', 'Porta-helicópteros / anfíbio', 'Operacional — único na América do Sul'],
            ['Scorpène (Riachuelo-class)', '4', 'Submarino diesel-elétrico', 'Moderno — 1 operacional, 3 em comissão'],
            ['Álvaro Alberto (SN-BR)', '1 (2035)', 'Submarino nuclear (propulsão)', 'Em construção — pronto ~2034–2036'],
            ['Tamandaré-class', '4 (de 4 contratados)', 'Fragata multimissão', 'Em construção — entrega 2025-2028'],
            ['Niterói-class + V22', '5', 'Fragata', 'Envelhecida — anos 1970s, em modernização'],
            ['Inhaúma-class', '3', 'Corveta', 'Operacional limitado'],
            ['Macaé-class / Patrulha', '~17', 'Patrulha Oceânica/Fluvial', 'Adequado para patrulha'],
          ]}
        />
        <Callout type="ok">
          Amazon Azul: A Marinha do Brasil gerencia 4,5 mi km² de ZEE — a maior da América do Sul. O SisGAAz (sistema de vigilância marítima) ainda está em implantação. O programa de submarino nuclear Álvaro Alberto é a maior iniciativa estratégica das FFAA, podendo qualificar o Brasil como única potência não-P5 com submarino nuclear propulsivo.
        </Callout>
      </Section>

      {/* ===== 10 LOGÍSTICA, REABASTECIMENTO & MUNIÇÃO ===== */}
      <Section num="10" title="Logística, Reabastecimento & Estoque de Munição">
        <DataTable
          headers={['Categoria', 'Avaliação', 'Detalhes']}
          rows={[
            ['Logística doméstica (Amazônia)', 'Médio (C)', 'SISFRON cobre parcialmente. Infraestrutura fluvial e aérea; acesso rodoviário limitado em grandes trechos. FFAA dependem de aviação para projeção interna rápida.'],
            ['Logística para projeção regional (~2000km)', 'Fraco (D)', 'KC-390 e C-130 oferecem reabastecimento aéreo tático. Capacidade de PAE limitada. Fragatas Tamandaré ainda em construção.'],
            ['Logística para projeção global (>4000km)', 'Muito fraco (E)', 'Sem base estrangeira, sem superporta-aviões, sem frota de suprimento de alto mar suficiente. Capacidade mínima de sustentação de operação expedicionária prolongada.'],
            ['Estoque de Munição Convencional', 'Médio (C)', 'IMBEL produz munições 5.56mm, 9mm e calibres médios domesticamente. Dependência externa para munições guiadas de precisão (PGMs) e mísseis anti-navio.'],
            ['Mísseis Ar-Ar (BVR)', 'Médio (C)', 'Meteoro BVRAAM + IRIS-T para os Gripens (entregas em andamento). Capacidade crescente mas estoque ainda limitado.'],
            ['Mísseis Antinavio', 'Médio (C)', 'MANSUP (desenvolvimento nacional, integração 2025). Exocet AM-39 em F-39 Gripen. Capacidade emergente.'],
            ['Defesa Aérea Estratégica (SAM)', 'Fraco (D)', 'SISDABRA (Sistema de Def. Aérea Brasileiro) em atualização. Mísseis SHORAD MANPADS. Sem sistema equivalente ao Patriot ou S-400 para ameaças balísticas.'],
            ['Capacidade Cyber Ofensiva/Defensiva', 'Médio (C)', 'CDCiber ativo desde 2010. Protegeu Copa 2014 e Olimpíadas 2016. Orçamento limitado vs. tamanho do desafio.'],
            ['Inteligência e Reconhecimento (ISR)', 'Médio (C)', 'SIVAM cobre Amazônia. SGDC satélite militar operacional desde 2017. Sem satélite de reconhecimento óptico militar dedicado.'],
          ]}
        />
      </Section>

      {/* ===== 11 TIERS GLOBAIS ===== */}
      <Section num="11" title="Classificação por Tiers de Poder Militar">
        <Prose><p>Critérios: orçamento, tecnologia, poder de fogo, capacidade nuclear, projeção e combate provado</p></Prose>
        <DataTable
          headers={['Tier', 'País', 'Budget (US$ Bi)', 'Efetivo Ativo', 'Tanques', 'Caças+', 'Navios*', 'Nuclear', 'GFP Rank']}
          rows={[
            ['S', 'Estados Unidos', '$916', '1.328.000', '5.500 (M1A2)', '2.100+', '490 (11 CVN)', '5.600+', '#1'],
            ['S', 'China', '$266', '2.035.000', '5.000+ (Type 99)', '1.900+', '730+ (3 CVN)', '~350', '#2'],
            ['A', 'Rússia', '$109', '850.000 (degradado)', '12.000+ (em teoria)', '~800', '600+ (1 CV degrad.)', '6.375', '#3'],
            ['A', 'Índia', '$86', '1.455.000', '4.614 (T-90/Arjun)', '~600', '295 (2 CV)', '~160', '#4'],
            ['A', 'Reino Unido', '$75', '149.000', '227 (Challenger 3)', '~150', '70 (2 CV)', '225', '#5'],
            ['A', 'França', '$62', '203.000', '222 (Leclerc)', '~225', '180 (1 CVN)', '290', '#6'],
            ['B', 'Paquistão', '$10,4', '654.000', '2.800+', '~350', '90', '~160', '#7'],
            ['B', 'Turquia', '$25', '355.000', '2.200+ (Leopard 2)', '~225', '200+', 'Não', '#8'],
            ['B', 'Japão', '$57', '248.000', '890 (Type 90/10)', '~360', '152 (0+2 proto-CV)', 'Não', '#9'],
            ['B', 'Irã', '$10', '575.000', '1.996 (T-72/Karrar)', '~130 (baixa prontidão)', '101 (assimétr.)', 'Potencial', '#14'],
            ['B', 'Itália', '$36', '165.000', '200 (Ariete)', '~90', '157 (1 CV)', 'Não', '#12'],
            ['BR', 'Brasil', '$23,5', '366.500', '294 (Leopard 1/M60)', '~42 (Gripen)+98 A-29', '68 (0 CV, 4 sub)', 'Não', '#11'],
            ['C', 'Austrália', '$43', '60.000', '59 (Abrams M1A2)', '~95', '47', 'Não', '#16'],
            ['C', 'México', '$8,6', '277.000', '~70', '~70', '~72', 'Não', '#32'],
            ['C', 'Colômbia', '$4,8', '295.000', '~0 (APCs)', '~60', '~20', 'Não', '#46'],
            ['C', 'Argentina', '$5,4', '74.000', '~300 (TAM degradado)', '~54', '~30', 'Não', '#33'],
            ['D', 'Venezuela', '$2', '123.000', '~300 (baixa prontidão)', '~60 (5-15% prontidão)', '~28', 'Não', '#50'],
            ['D', 'Paraguai', '$0,54', '10.600', '~3 (tanquetes WWII)', '~12 (trainers só)', '~24 (fluvial)', 'Não', '#79'],
            ['D', 'Bolívia', '$0,62', '37.500', '~36', '~20', '~0 (sem saída ao mar)', 'Não', '#72'],
          ]}
          highlight={11}
        />
        <Callout type="info">
          Navios: total de combate e patrulha. CV = porta-aviões/porta-helicópteros. CVN = nuclear. Prontidão de equipamentos varia muito — estes são números nominais de inventário. Fonte: IISS Military Balance 2025, GFP 2026, GlobalMilitary.net.
        </Callout>
      </Section>

      {/* ===== 12 COMPARATIVO BRASIL VS VIZINHOS ===== */}
      <Section num="12" title="Tabela Comparativa — Brasil vs Vizinhos">
        <Prose><p>Foco em Argentina, Venezuela e Paraguai — os principais vizinhos de fronteira</p></Prose>
        <DataTable
          headers={['Indicador', 'Brasil', 'Argentina', 'Venezuela', 'Paraguai']}
          rows={[
            ['GFP Power Index (2026)', '0.1711 (#11)', '0.5983 (#33)', '0.9106 (#50)', '1.7974 (#79)'],
            ['Orçamento Defesa', 'US$ 23,5 Bi', 'US$ 5,4 Bi', 'US$ ~2 Bi', 'US$ 540 Mi'],
            ['% PIB Defesa', '1,1%', '0,8%', '~1,5%', '~1,1%'],
            ['Efetivo Ativo', '366.500', '74.000', '123.000', '10.600'],
            ['Reservistas', '1.340.000', '800.000', '600.000', '164.500'],
            ['Tanques MBT', '294', '~300 (TAM)', '~300 (T-72)', '~3 (tanquetes)'],
            ['Prontidão dos Tanques', '~60%', '~35%', '~20%', '~5%'],
            ['Veículos Blindados Totais', '2.250+', '~600', '~1.200', '~45'],
            ['Aeronaves Totais', '502', '~190', '~200', '~28'],
            ['Caças Operacionais', '~36 (Gripen) + 98 A-29', '~24 (F-16 DK encomend.) + 17 A-4', '~10–15 (Su-30/F-16 degradados)', '~0 (só turbohélice)'],
            ['Qualidade Caças', '4.5ª Geração (Gripen)', '4ª Geração (F-16)', '4ª Geração (prontidão ~5-15%)', 'Inexistente'],
            ['Aviões AEW&C', '5 (E-99)', '0', '0', '0'],
            ['Navios de Guerra', '68', '~30', '~28', '~24 (fluvial)'],
            ['Submarinos', '4 (Scorpène)', '3 (envelhecidos)', '2 (inoperantes)', '0'],
            ['Porta-helicópteros', '1 (LPH Atlântico)', '0', '0', '0'],
            ['Mísseis BVR Ar-Ar', 'Meteoro, IRIS-T', 'Limitado', 'R-73 (baixa prontidão)', 'Não'],
            ['Sistema de Alerta Aéreo', 'CINDACTA + SIVAM', 'Limitado', 'Russo (degradado)', 'Não'],
            ['Indústria de Defesa', 'Forte (Embraer, IMBEL, Avibras)', 'Média (Tanque TAM, FAMAE)', 'Praticamente inexistente', 'Inexistente'],
            ['Capacidade Nuclear', 'Não (tecnologia, não arma)', 'Não', 'Não', 'Não'],
            ['Vantagem Estratégica Geral', 'Dominância regional clara', 'Superada pelo Brasil', 'Colapso econômico severo', 'Mínima'],
          ]}
        />

        <Callout type="warn">
          Argentina: Historicamente o segundo maior poder militar da América do Sul, enfrenta crise severa de modernização. Milei cortou o orçamento de defesa em termos reais. Os 300 tanques TAM existentes têm prontidão de ~35%. A compra de 24 F-16 dinamarqueses (usados, anos 1980s) representa modernização modesta. A Marinha ainda opera com fragatas dos anos 1970. O Brasil supera a Argentina em todas as dimensões relevantes de combate moderno.
        </Callout>
        <Callout type="danger">
          Venezuela: O colapso econômico reduziu o orçamento militar real em ~80% desde 2013. Su-30 MKV operados com prontidão estimada de apenas 5-15%. F-16 não recebem manutenção norte-americana desde 2006. Os 300 T-72 têm a maioria inoperantes. A Venezuela tem massa nominal mas poder de combate efetivo dramaticamente reduzido.
        </Callout>
      </Section>

      {/* ===== 13 CAPACIDADE DEFENSIVA ===== */}
      <Section num="13" title="Capacidade Defensiva do Brasil">
        <Prose>
          <p>Avaliando a capacidade do Brasil de resistir a ataques em solo nacional.</p>
          <p><strong>Legenda:</strong> A = Defenderia completamente — vitória sem dúvida | B = Resistiria com muita dificuldade + auxílio internacional | C = Não resistiria, mas seria custoso demais para o invasor | D = Perderia, mas depois de brigar bastante | E = Perderia rapidamente</p>
        </Prose>
        <DataTable
          headers={['Adversário', 'Tier', 'Rating', 'Justificativa Detalhada', 'Fatores Chave']}
          rows={[
            ['Paraguai', 'D', 'A', 'O Brasil tem orçamento 43x maior, caças modernos, submarinos e efetivo 35x maior. O Paraguai não possui nenhuma capacidade anti-aérea, antinavio ou blindados relevantes. A guerra seria decidida em dias.', 'Superioridade aérea total, blindagem, logística'],
            ['Bolívia', 'D', 'A', 'Similar ao Paraguai — sem marinha (sem acesso ao mar), força aérea residual, orçamento ínfimo. A Bolívia não representa nenhuma ameaça existencial.', 'Superioridade total em todos os domínios'],
            ['Venezuela', 'D', 'A', 'Apesar do inventário nominal venezuelano, a prontidão real é catastrófica. Nenhum caça venezuelano operacional poderia enfrentar o Gripen E/F em BVR. Brasil domina no ar, no mar e em terra.', 'FAB superior, CINDACTA cobre fronteira norte'],
            ['Argentina', 'C', 'A', 'Argentina tem capacidades maiores que Paraguai/Venezuela, mas ainda muito abaixo do Brasil. FAB tem vantagem geracional clara (Gripen vs. F-16 vintage). Marinha brasileira é superior.', 'Gripen vs. F-16 dos anos 1980, E-99, Scorpène'],
            ['Irã', 'B', 'A', 'Irã não tem capacidade de projeção de força até o Brasil (distância >11.000 km). No território brasileiro, o Brasil teria superioridade de home advantage absoluta. Logisticamente impossível para o Irã sustentar qualquer ataque ao Brasil.', 'Impossibilidade logística do atacante'],
            ['Turquia', 'B', 'A', 'Mesma lógica do Irã. Turquia tem força relevante na OTAN, mas zero capacidade de projeção até o Brasil. Home defense do Brasil é conclusiva.', 'Impossibilidade logística do atacante'],
            ['Itália', 'B', 'A', 'Itália tem capacidade expedicionária limitada a teatro mediterrâneo/atlântico próximo. Nenhuma capacidade de projeção sustentada até a América do Sul. Defensivamente, o Brasil venceria com facilidade.', 'Impossibilidade logística do atacante'],
            ['Paquistão', 'B', 'A', 'Nuclear, mas sem projeção sobre o Atlântico Sul. Paquistão jamais tentaria atacar o Brasil, e mesmo que tentasse, a distância é intransponível sem base intermediária.', 'Impossibilidade logística + geopolítica'],
            ['França', 'A', 'B', 'A França tem bases na Guiana Francesa (fronteira direta com o Brasil), porta-aviões nuclear Charles de Gaulle, caças Rafale F3R, e capacidade nuclear. Em hipotético conflito em solo brasileiro, a França teria acesso logístico real. O Brasil teria home advantage e território vasto, mas a superioridade tecnológica francesa seria difícil de neutralizar sem auxílio externo.', 'Base em Guiana Francesa, Rafale vs. Gripen, nuclear'],
            ['Reino Unido', 'A', 'B', 'UK tem presença nas Malvinas (zona de litígio histórico), F-35B, 2 superporta-aviões, capacidade nuclear. O histórico das Malvinas/Falklands mostra que o Brasil teria dificuldades extremas para expulsar forças britânicas estabelecidas. Sem ajuda externa, resistência seria muito custosa.', 'F-35B, Astute submarine, Stormshadow, bases Malvinas'],
            ['Índia', 'A', 'A', 'Índia não tem capacidade de projeção até o Atlântico Sul de forma sustentada. Logisticamente impossível — Índia está focada no oceano Índico e fronteira sino-paquistanesa. Sem base de suprimento no atlântico, qualquer invasão ao Brasil é inviável.', 'Impossibilidade logística para atacar o Brasil'],
            ['Rússia', 'A', 'C', 'Rússia tem missilística de longo alcance (hipersônicos Kinzhal, Zirkon), capacidade nuclear, e frotas oceânicas mesmo que degradadas pela guerra na Ucrânia. Um ataque estratégico (mísseis) poderia ser devastador. Invasão terrestre convencional seria logisticamente impossível. O Brasil não resistiria a ataque estratégico intenso, mas tornaria qualquer tentativa de ocupação física extremamente custosa por sua geografia amazônica.', 'Mísseis hipersônicos, nuclear, impossibilidade de ocupação'],
            ['China', 'S', 'C', 'China tem capacidade cibernética, econômica e militar imensa, mas zero capacidade de invasão convencional ao Brasil a 17.000 km. Guerra assimétrica e ataques de infraestrutura seriam a forma real de pressão. Militarmente a China não pode ocupar o Brasil, mas pode causar enorme dano estratégico sem combate convencional.', 'Impossibilidade de projeção + capacidade assimétrica/cyber'],
            ['Estados Unidos', 'S', 'D', 'Cenário extremo — os EUA têm bases na Colômbia, Curaçao, Guiana, operações nas Malvinas via UK. Superioridade aérea pelos F-35/F-22 seria estabelecida nos primeiros dias. Marinha dos EUA iria interditar qualquer ressuprimento marítimo. O Brasil poderia resistir meses/anos em guerra de guerrilha amazônica (CIGS), mas o resultado convencional seria inevitável. A vastidão amazônica tornaria ocupação plena extremamente custosa (Vietnam-ification).', 'F-22, F-35, porta-aviões, JDAM, Stinger, HIMARS, nuclear'],
          ]}
        />
      </Section>

      {/* ===== 14 CAPACIDADE OFENSIVA — LISTA A ===== */}
      <Section num="14" title="Capacidade Ofensiva — Lista A (até 2.000km da fronteira)">
        <Prose><p>Cobre: todos os vizinhos sul-americanos, parte do Caribe, Atlântico Sul próximo</p></Prose>
        <DataTable
          headers={['Alvo', 'Rating Ofensivo', 'Justificativa']}
          rows={[
            ['Paraguai', 'A', 'Total dominância — Brasil poderia ocupar Assunção em menos de 72h sem perdas significativas'],
            ['Bolívia', 'A', 'Similar ao Paraguai — ausência de defesa aérea e blindagem efetiva'],
            ['Uruguai', 'A', 'Forças uruguaias residuais — o Brasil poderia tomar e manter posições sem resistência séria'],
            ['Venezuela', 'A+B', 'A FAB dominaria o espaço aéreo venezuelano rapidamente. Logística de avanço terrestre 3.000km é limitante, mas capacidade de destruição de infraestrutura é A. Ocupação sustentada seria B.'],
            ['Argentina', 'B', 'Brasil tem vantagem em todos os domínios, mas Argentina tem profundidade estratégica, forças nucleares passadas (desarmou) e complexidade política. Campanha bem-sucedida seria possível, mas custosa. Sem apoio logístico pleno, rating B.'],
            ['Colômbia', 'B', 'Colômbia tem experiência de combate real (FARC) e apoio dos EUA. FAB teria supremacia aérea, mas terreno colombiano (andes + selva) é extremamente difícil. Rating B para campanha sustentada.'],
            ['Nível B (Turquia, Irã, Itália — na região)', 'C', 'Se qualquer uma dessas potências tivesse presença estabelecida na região (ex: Guiana Francesa estilo França), o Brasil teria grandes dificuldades para expulsar com suas próprias forças — sem ajuda internacional.'],
            ['Nível A (França — Guiana Francesa)', 'D', 'A base de Kourou (Guiana Francesa), com Legion Étrangère, Rafales e suporte da OTAN, tornaria qualquer ofensiva brasileira extremamente custosa e provável derrota sem apoio externo.'],
            ['Nível S (EUA — bases na Colômbia)', 'E', 'Os EUA operam a maior base aérea da América do Sul. Qualquer ofensiva brasileira em direção a forças dos EUA na região seria exterminada em horas pela superioridade aérea norte-americana.'],
          ]}
        />
      </Section>

      {/* ===== 15 CAPACIDADE OFENSIVA — LISTA B ===== */}
      <Section num="15" title="Capacidade Ofensiva — Lista B (>2.000km / sem fronteira)">
        <Prose><p>Projeção naval/aérea oceânica, Europa, África, Oriente Médio, Ásia</p></Prose>
        <DataTable
          headers={['Cenário', 'Rating Ofensivo', 'Justificativa']}
          rows={[
            ['Atlântico Sul (ZEE 4,5mi km²)', 'B', 'Scorpènes, Tamandaré, MANSUP antinavio — capacidade de negar acesso (A2/AD) em parte da ZEE. Não é ofensiva plena, mas é deterrência real.'],
            ['África Ocidental (ex: Guiné-Bissau)', 'C', 'Historicamente Brasil enviou fragatas e tropas para missões de paz. Capacidade de projeção de força limitada por falta de logística de alto-mar. Viável para missões de curta duração.'],
            ['Operação ONU/multilateral', 'B', 'O Brasil tem longa experiência em missões ONU (Haiti, RDC, Líbano). Com suporte logístico de parceiros, pode projetar ~5.000 tropas com eficácia. Sem suporte, muito menos.'],
            ['Europa / NATO area', 'E', 'Zero capacidade de atingir teatro europeu com forças convencionais sustentadas. Sem bases, sem frota oceânica, sem reabastecimento no mar em escala. Operação de combate real é inviável.'],
            ['Oriente Médio / Ásia', 'E', 'Distância de 10.000-17.000 km. Nenhuma infraestrutura de suporte. O Brasil não tem capacidade expedicionária de projeção intercontinental no momento.'],
            ['Poder Naval Oceânico Geral', 'D', 'Sem porta-aviões com caças fixos (o LPH Atlântico é porta-helicópteros, sem catapultas), sem destroyers, sem frota de suprimento adequada. A marinha brasileira é uma força de negação de acesso regional — não uma blue-water navy de projeção.'],
          ]}
        />
        <Callout type="info">
          Futuro (2035+): O Álvaro Alberto (SN-BR nuclear) mudará o cenário no Atlântico Sul — um submarino de ataque nuclear tem raio de ação global e pode projetar poder dissuasório muito além das 2.000 milhas. Será o maior salto estratégico das FFAA brasileiras em décadas.
        </Callout>
      </Section>

      {/* ===== 16 CAPACIDADES DE PROJEÇÃO ===== */}
      <Section num="16" title="Raio de Ação Efetivo — Capacidades de Projeção">
        <DataTable
          headers={['Domínio', 'Capacidade Atual', 'Projeção 2035']}
          rows={[
            ['Defesa Territorial', '85/100', '90/100'],
            ['Ofensiva AL Vizinhos', '80/100', '85/100'],
            ['Ofensiva Regional 2000km', '65/100', '72/100'],
            ['Projeção Atlântico Sul', '45/100', '65/100'],
            ['Guerra Aérea', '70/100', '80/100'],
            ['Guerra Naval', '55/100', '70/100'],
            ['Guerra Cibernética', '50/100', '65/100'],
            ['Guerrilha/Assimétrico', '75/100', '78/100'],
            ['Projeção Global', '15/100', '35/100'],
          ]}
        />
        <Callout type="info">
          O Brasil tem capacidade defensiva razoável, mas projeção de força limitada. O submarino nuclear Álvaro Alberto (em construção) e os 36 Gripen E/F são os vetores de modernização mais relevantes.
        </Callout>
      </Section>

      {/* ===== 17 DIAGNÓSTICO ESTRATÉGICO ===== */}
      <Section num="17" title="Diagnóstico Estratégico">
        <Prose><p>Pontos fortes, lacunas críticas, trajetória e recomendações</p></Prose>
        <StatGrid>
          <StatCard value="#11" unit="" label="Posição Global — GFP 2026 — Líder absoluto AL" color="var(--blue)" />
          <StatCard value="#1" unit="" label="Posição na América Latina — com larga margem sobre Argentina" color="var(--green)" />
          <StatCard value="A" unit="" label="Capacidade Defensiva (AL) — Defende contra todos os vizinhos" color="var(--green)" />
          <StatCard value="A-B" unit="" label="Capacidade Ofensiva Regional — Sólida até 2.000km da fronteira" color="var(--blue)" />
          <StatCard value="D-E" unit="" label="Capacidade Global — Sem projeção intercontinental" color="var(--red)" />
          <StatCard value="D" unit="" label="Vulnerabilidade ao Top 2 (S-Tier) — Resistiria mas perderia" color="var(--coral)" />
        </StatGrid>

        <InfoGrid columns={2}>
          <InfoCard title="Pontos Fortes" color="var(--green)">
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: 2 }}>
              <li>F-39 Gripen E/F — única força 4.5G na América Latina</li>
              <li>E-99 AEW&C — superioridade de consciência situacional</li>
              <li>KC-390 — transporte estratégico moderno de fabricação nacional</li>
              <li>CIGS — melhor treinamento de guerra na selva do mundo</li>
              <li>PROSUB / Álvaro Alberto — futuro dissuasor estratégico</li>
              <li>Embraer Defesa — indústria aeroespacial competitiva globalmente</li>
              <li>ASTROS II — sistema MLRS de longo alcance regional</li>
              <li>LPH Atlântico — única capacidade anfíbia no continente</li>
              <li>Scorpène — submarinos modernos com capacidade real</li>
              <li>SIVAM/SISFRON — vigilância amazônica única</li>
              <li>Fronteiras pacíficas — sem ameaça convencional iminente real</li>
              <li>Profundidade estratégica amazônica — natural deterrente à ocupação</li>
            </ul>
          </InfoCard>
          <InfoCard title="Lacunas Críticas" color="var(--red)">
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: 2 }}>
              <li>76% do orçamento em pessoal — "exército de cadeiras"</li>
              <li>Tanques MBT Leopard 1A5/M60 — geração dos anos 1960</li>
              <li>Sem caça de 5ª geração (F-35 ou equivalente)</li>
              <li>Sem sistema SAM de área (Patriot, SAMP/T, S-300 equiv.)</li>
              <li>Sem porta-aviões com caças fixos</li>
              <li>Logística de projeção oceânica extremamente limitada</li>
              <li>Estoque de PGMs (munições guiadas de precisão) insuficiente</li>
              <li>Baixa prontidão de reservistas (treinamento irregular)</li>
              <li>Dependência de importações para sistemas críticos (propulsão naval, aviônica)</li>
              <li>Cyber e guerra eletrônica suborçadas</li>
              <li>Sem capacidade de reabastecimento de alto-mar em escala</li>
              <li>Delimitação clara entre forças não-convencionais (PM, FFAA)</li>
            </ul>
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ===== 18 PROGRAMAS EM ANDAMENTO ===== */}
      <Section num="18" title="Trajetória e Perspectivas — Principais Programas em Andamento">
        <DataTable
          headers={['Programa', 'Status', 'Impacto Estratégico', 'Prazo']}
          rows={[
            ['F-39 Gripen E/F (36 unidades)', 'Em entrega (20 de 36)', 'Alto — 4.5G, BVR, AESA, transferência de tecnologia', '2022–2027'],
            ['PROSUB / Álvaro Alberto (SN-BR)', 'Em construção', 'Muito Alto — 1° submarino nuclear não-P5. Dissuasor global.', '~2034–2036'],
            ['Fragata Tamandaré (4 nav.)', 'Em construção', 'Alto — mísseis anti-navio, guerra ASW, MANSUP', '2025–2028'],
            ['VBTP Guarani (2.044 total)', '530 entregues', 'Médio — moderniza infantaria mecanizada', '2012–2034'],
            ['Centauro II (8x8 Tank Destroyer)', 'Em entrega', 'Médio — substitui Leopard 1 parcialmente', '2022–2030'],
            ['SISFRON (vigilância de fronteiras)', 'Parcialmente implantado', 'Médio — cobre 16.000km de fronteira terrestre', '2012–2030'],
            ['SisGAAz (vigilância marítima)', 'Em implantação', 'Médio — Amazônia Azul (4,5mi km² ZEE)', '2013–2030'],
            ['SGDC-2 (satélite militar)', 'Planejado', 'Alto — capacidade ISR e comms protegidas', '~2028'],
            ['F-39 Gripen upgrade (transferência)', 'Em andamento', 'Alto — Embraer Defesa assumindo produção parcial nacional', '2025–2035'],
          ]}
        />
      </Section>

      {/* ===== 19 CONCLUSÃO ESTRATÉGICA FINAL ===== */}
      <Section num="19" title="Conclusão Estratégica Final">
        <Callout type="ok">
          No teatro regional: O Brasil é uma potência militar inquestionável e imbatível em defesa territorial. Nenhum país da América do Sul tem capacidade de ameaçar seriamente o território brasileiro. Em ofensiva regional até 2.000km, o Brasil tem superioridade clara contra todos os seus vizinhos.
        </Callout>
        <Callout type="info">
          No nível global: O Brasil está entre os "países médios fortes" — acima de Turquia e Itália em alguns aspectos, abaixo das potências de nível A em quase todos. A falta de capacidade nuclear, o orçamento esmagadoramente dedicado a pessoal e a ausência de doutrina expedicionária colocam o Brasil como uma força defensiva regional muito eficaz, mas com limitada capacidade de projeção global.
        </Callout>
        <Callout type="warn">
          Maior risco estrutural: 76% do orçamento em pessoal/pensões. Se o Brasil não reformar este modelo nas próximas décadas, ficará progressivamente para trás em modernização de equipamentos enquanto o mundo avança para drones autônomos, guerra hipersônica e defesas antimíssil — áreas nas quais hoje o Brasil tem investimento próximo de zero.
        </Callout>
        <Callout type="danger">
          Fator de alerta — Amazônia Digital: A maior vulnerabilidade estratégica do Brasil não é tanques ou caças — é a infraestrutura digital (energia, telecomunicações, sistema financeiro, operações SISFRON/SIVAM) que pode ser atacada por China, Rússia ou EUA sem nenhum tiro ser disparado. O CDCiber precisa de investimento urgente.
        </Callout>
      </Section>
    </ReportShell>
  );
}
