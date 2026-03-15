import ReportShell, {
  Section,
  InfoGrid,
  InfoCard,
  Prose,
  Callout,
  DataTable,
} from './ReportShell';

export default function ReportScoringExplainer({ onClose }: { onClose: () => void }) {
  return (
    <ReportShell
      title="Como Funciona a Avaliação"
      eyebrow="Manual do Presidente"
      color="var(--gold)"
      onClose={onClose}
    >
      {/* ── 01 ── */}
      <Section num="01" title="As 9 Dimensões de Avaliação">
        <Prose>
          <p>
            Seu governo é avaliado em 9 dimensões ao final do mandato. A pontuação
            total vai de 0 a 100 pontos. Saúde Fiscal tem peso duplo (máximo 20
            pontos) por ser o determinante mais robusto do bem-estar de longo prazo.
            As demais dimensões valem até 10 pontos cada.
          </p>
        </Prose>

        <InfoGrid columns={3}>
          <InfoCard title="💰 Saúde Fiscal" subtitle="máx 20" color="var(--purple)">
            <p>Disciplina orçamentária, controle da dívida, credibilidade junto ao mercado.</p>
          </InfoCard>
          <InfoCard title="🔧 Reformas Estruturais" subtitle="máx 10" color="var(--teal)">
            <p>Capacidade de aprovar e implementar reformas que modernizam o Estado.</p>
          </InfoCard>
          <InfoCard title="🏗️ Modernização & Infra" subtitle="máx 10" color="var(--amber)">
            <p>Investimento em infraestrutura, logística, energia e tecnologia.</p>
          </InfoCard>
          <InfoCard title="🤝 Avanços Sociais" subtitle="máx 10" color="var(--blue)">
            <p>Redução da pobreza, inclusão, proteção social e emprego.</p>
          </InfoCard>
          <InfoCard title="⚔️ Defesa & Soberania" subtitle="máx 10" color="var(--coral)">
            <p>Capacidade militar, proteção de fronteiras e soberania nacional.</p>
          </InfoCard>
          <InfoCard title="🌎 Diplomacia" subtitle="máx 10" color="var(--green)">
            <p>Prestígio internacional, acordos comerciais e influência geopolítica.</p>
          </InfoCard>
          <InfoCard title="🏥 Saúde Pública" subtitle="máx 10" color="var(--teal)">
            <p>Qualidade e acesso ao SUS, resposta a crises sanitárias.</p>
          </InfoCard>
          <InfoCard title="📚 Educação" subtitle="máx 10" color="var(--purple)">
            <p>Investimento na base educacional, pesquisa e capital humano.</p>
          </InfoCard>
          <InfoCard title="⚖️ Idoneidade" subtitle="máx 10" color="var(--red)">
            <p>Integridade, transparência e combate à corrupção. Penalizada por escolhas antiéticas.</p>
          </InfoCard>
        </InfoGrid>
      </Section>

      {/* ── 02 ── */}
      <Section num="02" title="Como as Pontuações Acumulam">
        <Prose>
          <p>
            Cada decisão que você toma afeta suas pontuações. O impacto é
            cumulativo — ao longo de 12 capítulos e eventuais eventos aleatórios,
            seus scores crescem ou diminuem conforme suas escolhas. Os valores nunca
            ficam abaixo de 0 nem acima do máximo da dimensão.
          </p>
        </Prose>
        <Prose>
          <p>
            Exemplo: ao escolher &ldquo;Superávit primário de 2%&rdquo; no Capítulo
            1, você ganha +3 em Saúde Fiscal. Mas ao escolher &ldquo;Expandir gasto
            público&rdquo;, perde −1 em Saúde Fiscal e ganha +1 em Avanços Sociais.
            Todo trade-off é real.
          </p>
        </Prose>
        <Callout type="info">
          As escolhas de setup também afetam scores: montar um ministério com perfil
          &ldquo;Centrão&rdquo; penaliza Idoneidade em −2 pontos desde o início.
        </Callout>
      </Section>

      {/* ── 03 ── */}
      <Section num="03" title="Os 4 Indicadores em Tempo Real">
        <Prose>
          <p>
            Além dos 9 scores finais, 4 indicadores são monitorados em tempo real e
            influenciam sua governabilidade:
          </p>
        </Prose>

        <DataTable
          headers={['Indicador', 'Início', 'Faixa', 'O que representa']}
          rows={[
            ['Saúde Fiscal', '35', '0–100', 'Credibilidade fiscal e controle do déficit'],
            ['Aprovação Popular', '70', '0–100', 'Popularidade junto à população (lua de mel inicial)'],
            ['Apoio do Congresso', '50', '0–100', 'Capacidade de aprovar leis e reformas'],
            ['Soberania', '60', '0–100', 'Independência geopolítica e prestígio internacional'],
          ]}
        />

        <Callout type="danger">
          Se o Apoio do Congresso cair abaixo de 25%, você sofre impeachment e o
          jogo termina imediatamente.
        </Callout>
      </Section>

      {/* ── 04 ── */}
      <Section num="04" title="Interações Cruzadas">
        <Prose>
          <p>
            Os indicadores interagem entre si automaticamente após cada decisão.
            Estas são as regras:
          </p>
        </Prose>

        <DataTable
          headers={['Condição', 'Efeito', 'Lógica']}
          rows={[
            ['Fiscal > 70', 'Popular +2, Congresso +2', 'Economia forte gera confiança'],
            ['Fiscal < 20', 'Popular −3, Congresso −3', 'Crise fiscal corrói tudo'],
            ['Popular > 55', 'Congresso +3', 'Presidente popular tem mais apoio legislativo'],
            ['Popular < 30', 'Congresso −5', 'Impopularidade ameaça a base aliada'],
          ]}
        />

        <Callout type="warn">
          Atenção: estas interações se aplicam APÓS cada decisão. Um governo com
          fiscal forte cria um ciclo virtuoso; um com fiscal fraco entra em espiral
          descendente.
        </Callout>
      </Section>

      {/* ── 05 ── */}
      <Section num="05" title="Nota Final e Grade">
        <Prose>
          <p>
            Ao final do mandato (ou em caso de impeachment), sua pontuação total
            (soma das 9 dimensões) determina sua grade:
          </p>
        </Prose>

        <DataTable
          headers={['Grade', 'Pontuação', 'Significado']}
          rows={[
            ['S', '80–100', 'Estadista excepcional — entre os maiores da história'],
            ['A', '65–79', 'Governo competente e transformador'],
            ['B', '50–64', 'Governo mediano — fez mais certo do que errado'],
            ['C', '35–49', 'Governo fraco — oportunidades perdidas'],
            ['D', '20–34', 'Governo ruim — danos significativos ao país'],
            ['F', '0–19', 'Desastre nacional — legado de destruição'],
          ]}
        />
      </Section>

      {/* ── 06 ── */}
      <Section num="06" title="O Ranking Histórico">
        <Prose>
          <p>
            Sua pontuação é comparada com 17 governantes históricos do Brasil, de
            Dom Pedro II a Lula 3. Cada um foi avaliado nas mesmas 9 dimensões por
            análise historiográfica. Você é inserido no ranking e posicionado de
            acordo com sua pontuação total.
          </p>
        </Prose>
        <Prose>
          <p>
            O governante mais bem avaliado é FHC 1º mandato (82 pontos —
            consolidação do Plano Real) e o pior é Dilma 2º mandato (26 pontos —
            pior recessão desde os anos 30). A maioria dos governantes fica entre 40
            e 65 pontos.
          </p>
        </Prose>
        <Callout type="ok">
          É possível alcançar Grade S, mas exige trade-offs extremamente difíceis e
          consistência ao longo de todo o mandato. Nenhum governante histórico
          atingiu mais de 82 pontos.
        </Callout>
      </Section>
    </ReportShell>
  );
}
