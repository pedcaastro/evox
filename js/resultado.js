// ─── CONFIG ───────────────────────────────────────────────────────────────────

const SUPABASE_URL  = 'https://xgpdwusicfwvdzlhhovw.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhncGR3dXNpY2Z3dmR6bGhob3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMzYyNjYsImV4cCI6MjA5NDcxMjI2Nn0.P3twaDTYVKLoVAI4Rxojw9xXrHgIdmqhw4YMsWjpilM';

const DB_HEADERS = {
  'Content-Type':  'application/json',
  'apikey':        SUPABASE_ANON,
  'Authorization': `Bearer ${SUPABASE_ANON}`,
  'Prefer':        'return=representation'
};

// ─── NÍVEIS ───────────────────────────────────────────────────────────────────

const NIVEIS = [
  { min: 0.0, max: 1.0, nome: 'Inicial',            cor: '#DC2626', desc: 'Processos inexistentes ou totalmente informais. Há muito espaço para estruturar a operação.' },
  { min: 1.1, max: 2.0, nome: 'Reativo',            cor: '#EA580C', desc: 'A empresa age sob pressão, sem padrão estabelecido. As bases precisam ser construídas.' },
  { min: 2.1, max: 3.0, nome: 'Em desenvolvimento', cor: '#CA8A04', desc: 'Bases formadas, mas inconsistentes. Com foco certo, o salto para o nível gerenciado é rápido.' },
  { min: 3.1, max: 4.0, nome: 'Gerenciado',         cor: '#1D4ED8', desc: 'KPIs ativos e melhoria contínua em curso. Você está no caminho certo refinar e sustentar é o próximo passo.' },
  { min: 4.1, max: 5.0, nome: 'Excelência',         cor: '#16A34A', desc: 'Referência de mercado. Sua operação é um ativo estratégico da empresa.' },
];

const PILARES_NOMES = {
  fundacao:    'Fundação EXO',
  capacidade:  'Capacidade Produtiva',
  estrategia:  'Estratégia Operacional',
  indicadores: 'Gestão de Indicadores',
};

// ─── PILARES (para montar texto das respostas) ────────────────────────────────

const PILARES_DATA = [
  {
    id: 'fundacao', nome: 'Fundação EXO',
    perguntas: [
      { texto: 'Sua empresa possui um planejamento estratégico formal, com objetivos definidos para o ano?', opcoes: ['Não temos nenhum planejamento documentado decisões são tomadas conforme surgem','Temos algumas diretrizes na cabeça da liderança, mas nada formalizado','Existe um planejamento básico, mas não é acompanhado com regularidade','Temos planejamento documentado, revisado ao menos uma vez por ano com a equipe','Planejamento estratégico estruturado, com objetivos claros, revisões periódicas e desdobramento para as áreas']},
      { texto: 'Sua empresa utiliza OKR (Objetivos e Resultados-Chave) ou metodologia similar para definir e acompanhar metas?', opcoes: ['Nunca ouvi falar ou nunca aplicamos nada parecido','Já ouvi falar, mas não implementamos','Tentamos implementar, mas não sustentamos caiu no esquecimento','Usamos OKR em algumas áreas, com acompanhamento parcial','OKR implementado em toda a empresa, com ciclos definidos e revisões regulares']},
      { texto: 'As metas da empresa são desdobradas até o nível operacional equipes e colaboradores sabem o que precisam entregar?', opcoes: ['As metas ficam só na alta liderança, o chão de fábrica não sabe o que está sendo buscado','Alguns gestores repassam informalmente, mas sem padrão','As metas são comunicadas, mas não há responsáveis claros por cada uma','Metas desdobradas por área, com responsáveis definidos','Cada colaborador sabe exatamente sua meta, como ela conecta ao objetivo da empresa e como será medida']},
      { texto: 'Como é feita a gestão do dia a dia operacional da sua empresa?', opcoes: ['Cada área age por conta própria, sem rotina de gestão definida','Existe acompanhamento informal, baseado em percepção do gestor','Reuniões pontuais quando surgem problemas, sem cadência regular','Reuniões semanais com pauta definida e acompanhamento de pendências','Rotina de gestão estruturada com DDS, reuniões de performance e planos de ação formalizados']},
      { texto: 'Existe um Comitê de Resultados ou reunião formal de liderança para avaliar o desempenho da empresa periodicamente?', opcoes: ['Não existe nenhuma reunião estruturada de resultados','Nos reunimos apenas quando há crise ou problema grave','Há reuniões mensais, mas sem pauta ou análise de dados consistente','Comitê mensal com análise de resultados e definição de ações','Comitê estruturado, com frequência definida, dados preparados, decisões registradas e follow-up garantido']},
    ]
  },
  {
    id: 'capacidade', nome: 'Capacidade Produtiva',
    perguntas: [
      { texto: 'Você sabe qual é a capacidade máxima de produção da sua operação hoje por turno, linha ou célula?', opcoes: ['Não temos esse número mapeado','Estimamos com base na experiência, mas sem dado formal','Sabemos a capacidade de algumas áreas, mas não de toda a operação','Temos a capacidade mapeada, revisada ocasionalmente','Capacidade produtiva mapeada por linha/célula, atualizada e usada ativamente no planejamento']},
      { texto: 'Como sua empresa planeja a produção em relação à demanda dos clientes?', opcoes: ['Produzimos conforme os pedidos chegam, sem planejamento antecipado','Há alguma previsão informal, baseada na intuição do gestor ou vendedor','Planejamos com base no histórico, mas sem metodologia estruturada','Temos um processo de S&OP básico, com alinhamento entre vendas e produção','Planejamento integrado de demanda e capacidade, com horizonte definido e revisões periódicas']},
      { texto: 'Sua operação tem gargalos de produção identificados? O que é feito com eles?', opcoes: ['Não sabemos onde estão os gargalos','Percebemos os gargalos no dia a dia, mas não temos registro ou análise formal','Os gargalos são conhecidos, mas as ações de melhoria são pontuais e reativas','Gargalos mapeados com planos de ação em andamento','Gestão ativa de restrições com metodologia (TOC ou similar), revisada periodicamente']},
      { texto: 'Como você avalia o nível de ociosidade ou desperdício de capacidade na sua operação?', opcoes: ['Não medimos não sabemos quanto estamos desperdiçando','Sabemos que existe desperdício, mas não quantificamos','Medimos em algumas áreas, sem visão consolidada','OEE ou indicador similar monitorado, com ações corretivas em curso','Eficiência operacional monitorada em tempo real, com metas e planos de melhoria contínua']},
      { texto: 'Sua estrutura de turnos e equipes é dimensionada com base na demanda real, ou é definida por costume?', opcoes: ['A escala foi definida há anos e nunca foi revisada','Ajustamos informalmente conforme a necessidade, sem critério formal','Fazemos ajustes sazonais, mas sem dados estruturados como base','O dimensionamento é revisado periodicamente com base em histórico de demanda','Dimensionamento de turnos e equipes baseado em dados de demanda, capacidade e produtividade, revisado regularmente']},
    ]
  },
  {
    id: 'estrategia', nome: 'Estratégia Operacional',
    perguntas: [
      { texto: 'Sua empresa já realizou um diagnóstico operacional formal mapeando como os processos realmente funcionam hoje?', opcoes: ['Nunca fizemos nenhum tipo de diagnóstico estruturado','Já conversamos sobre isso, mas nunca formalizamos','Fizemos um levantamento parcial, em algumas áreas apenas','Temos um diagnóstico geral da operação, mas desatualizado','Diagnóstico operacional completo e atualizado, usado como base para as decisões de melhoria']},
      { texto: 'Os processos críticos da sua operação estão documentados em SOP ou POP (procedimentos operacionais padrão)?', opcoes: ['Nada documentado o conhecimento está na cabeça das pessoas','Alguns processos têm anotações informais, sem padrão definido','Temos alguns procedimentos documentados, mas incompletos ou desatualizados','Processos críticos documentados, acessíveis às equipes','SOPs/POPs completos, atualizados, com treinamento e validação de aplicação pelas equipes']},
      { texto: 'Quando um novo processo ou padrão é definido, como é garantida a aplicação real no dia a dia?', opcoes: ['Comunicamos verbalmente e esperamos que as pessoas sigam','Fazemos um treinamento pontual, mas sem acompanhamento posterior','Há algum acompanhamento inicial, mas o processo acaba voltando ao antigo comportamento','Treinamento + checklist de verificação + acompanhamento pelo gestor nas primeiras semanas','Processo de implantação estruturado com treinamento, validação, auditoria e plano de sustentação']},
      { texto: 'Os processos da sua empresa são monitorados ativamente existe alguém responsável por garantir que os padrões estão sendo seguidos?', opcoes: ['Não há monitoramento só sabemos que algo está errado quando o problema aparece','O gestor observa informalmente, sem registro','Fazemos auditorias esporádicas, sem frequência definida','Existe responsável pelo monitoramento com frequência regular e registro de desvios','Monitoramento sistemático com indicadores de conformidade, tratamento de desvios e melhoria contínua do padrão']},
      { texto: 'Existe uma cultura de melhoria contínua na sua empresa as equipes identificam e propõem melhorias nos processos?', opcoes: ['Não existe esse hábito as pessoas executam e não questionam','Algumas pessoas sugerem melhorias, mas de forma isolada e sem canal formal','Temos iniciativas pontuais de melhoria, mas sem metodologia ou continuidade','Canal aberto para sugestões, com análise e resposta pela liderança','Cultura Kaizen estabelecida times engajados, ciclos PDCA rodando e melhorias registradas com impacto medido']},
    ]
  },
  {
    id: 'indicadores', nome: 'Gestão de Indicadores',
    perguntas: [
      { texto: 'Sua empresa tem KPIs (indicadores de desempenho) definidos e formalizados para as áreas operacionais?', opcoes: ['Não medimos nada de forma estruturada','Temos alguns números no Excel, mas sem definição formal de indicadores','Indicadores definidos em algumas áreas, sem padronização','KPIs definidos para as principais áreas, com responsáveis e metas','Árvore de KPIs estruturada, conectada à estratégia, com dono, meta, frequência e fonte de dados definidos']},
      { texto: 'Como os indicadores são acompanhados no dia a dia existe um painel ou dashboard visível para as equipes?', opcoes: ['Não temos nenhum painel os dados ficam dispersos em planilhas ou sistemas','Alguns gestores acompanham por conta própria, sem visibilidade para a equipe','Relatório mensal enviado por e-mail, mas sem rotina de análise coletiva','Dashboard visível para liderança, atualizado regularmente','Painel de gestão à vista, atualizado em tempo real ou diariamente, acessível a todos os níveis']},
      { texto: 'Quando um indicador fica abaixo da meta, qual é o processo da sua empresa para tratar o desvio?', opcoes: ['Não há processo cada um resolve como pode','O gestor cobra o responsável, mas sem análise formal da causa','Discutimos em reunião, mas as ações nem sempre são formalizadas','Plano de ação gerado com responsável e prazo definido','Processo estruturado: análise de causa, plano de ação, execução monitorada e verificação de eficácia']},
      { texto: 'Sua empresa realiza análises críticas de resultados com a liderança avaliando tendências, riscos e oportunidades?', opcoes: ['Não realizamos análises críticas formais','O dono analisa os números sozinho, sem envolver a equipe de liderança','Reuniões esporádicas de resultado, sem pauta ou metodologia definida','Análise crítica mensal com liderança, avaliando os principais KPIs','Análise crítica estruturada com agenda, dados preparados, avaliação de tendências e decisões registradas']},
      { texto: 'Quando ocorre um problema recorrente na operação, sua empresa aplica uma metodologia de análise de causa raiz (como FCA, 5 Porquês ou Ishikawa)?', opcoes: ['Resolvemos o sintoma e seguimos em frente o problema volta sempre','Tentamos identificar a causa, mas de forma intuitiva e sem registro','Usamos análise de causa em problemas grandes, mas não sistematicamente','Metodologia de análise de causa aplicada nos principais desvios, com registro','FCA ou metodologia equivalente aplicada de forma sistemática, com banco de lições aprendidas e prevenção de reincidência']},
    ]
  }
];

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  const notas        = JSON.parse(localStorage.getItem('evox_notas')      || '{}');
  const notaGeral    = parseFloat(localStorage.getItem('evox_nota_geral') || '0');
  const lead         = JSON.parse(localStorage.getItem('evox_lead')       || '{}');
  const leadId       = localStorage.getItem('evox_lead_id');
  const respostasRaw = JSON.parse(localStorage.getItem('evox_respostas')  || '{}');

  if (!Object.keys(notas).length) { window.location.href = '/iniciar'; return; }

  renderResultado(notas, notaGeral, lead);
  renderRadar(notas);
  renderInsight(notas, notaGeral);
  renderMacroPlano(notas);
  setupEbookForm(lead);

  // ── POST 2: salva notas + respostas detalhadas usando o lead_id já criado ──
  const baseHeaders = {
    'Content-Type':  'application/json',
    'apikey':        SUPABASE_ANON,
    'Authorization': `Bearer ${SUPABASE_ANON}`
  };

  if (leadId) {
    try {
      // 2a. atualiza as notas na linha do lead já existente
      await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${leadId}`, {
        method: 'PATCH',
        headers: baseHeaders,
        body: JSON.stringify({
          nota_geral:       notaGeral,
          nota_fundacao:    notas.fundacao,
          nota_capacidade:  notas.capacidade,
          nota_estrategia:  notas.estrategia,
          nota_indicadores: notas.indicadores,
        })
      });

      // 2b. monta e insere as 20 respostas
      const linhas = [];
      PILARES_DATA.forEach(pilar => {
        pilar.perguntas.forEach((pergunta, qIdx) => {
          const key       = `${pilar.id}_${qIdx}`;
          const valBruto  = respostasRaw[key];
          const isNA      = valBruto === 'na';
          const pontuacao = (valBruto !== undefined && !isNA) ? valBruto : 0;
          linhas.push({
            lead_id:      leadId,
            pilar:        pilar.nome,
            pergunta_num: qIdx + 1,
            pergunta:     pergunta.texto,
            resposta:     isNA ? 'Não se aplica (N/A)' : pergunta.opcoes[pontuacao],
            pontuacao:    isNA ? null : pontuacao
          });
        });
      });

      await fetch(`${SUPABASE_URL}/rest/v1/respostas`, {
        method: 'POST',
        headers: { ...baseHeaders, 'Prefer': 'return=minimal' },
        body: JSON.stringify(linhas)
      });

      console.log('✓ Respostas salvas no Supabase');

      // limpa estado do diagnóstico (mantém só o lead para o ebook)
      localStorage.removeItem('evox_respostas');
      localStorage.removeItem('evox_pilar');
      localStorage.removeItem('evox_lead_id');

    } catch (err) {
      console.warn('Erro ao salvar respostas:', err);
    }
  } else {
    console.warn('lead_id não encontrado o lead não passou pelo formulário inicial');
  }
});

// ─── RENDER RESULTADO ─────────────────────────────────────────────────────────

function renderResultado(notas, notaGeral, lead) {
  const nivel = getNivel(notaGeral);
  document.getElementById('score-num').textContent       = notaGeral.toFixed(1).replace('.', ',');
  document.getElementById('resultado-nivel').textContent = nivel.nome;
  document.getElementById('resultado-desc').textContent  = nivel.desc;
  document.getElementById('score-num').style.color       = nivel.cor;

  const saudacao = document.getElementById('saudacao');
  if (saudacao && lead.nome) saudacao.textContent = `${lead.nome.split(' ')[0]}, sua empresa está no nível:`;

  const badge = document.getElementById('nivel-badge');
  badge.textContent      = nivel.nome;
  badge.style.background = nivel.cor + '22';
  badge.style.color      = nivel.cor;
  badge.style.border     = `1px solid ${nivel.cor}44`;

  const grid = document.getElementById('pilares-grid');
  grid.innerHTML = '';
  Object.entries(notas).forEach(([id, nota]) => {
    const nv  = getNivel(nota);
    const pct = (nota / 5) * 100;
    const card = document.createElement('div');
    card.className = 'pilar-result-card fade-up fade-up-1';
    card.innerHTML = `
      <div class="pilar-result-header">
        <div class="pilar-result-name">${PILARES_NOMES[id]}</div>
        <div class="pilar-result-score" style="color:${nv.cor}">${nota.toFixed(1).replace('.',',')}</div>
      </div>
      <div class="pilar-result-track">
        <div class="pilar-result-fill" style="width:0%;background:linear-gradient(90deg,${nv.cor}99,${nv.cor});" data-pct="${pct}"></div>
      </div>
      <div class="pilar-result-label" style="color:${nv.cor}">${nv.nome}</div>`;
    grid.appendChild(card);
  });
  setTimeout(() => {
    document.querySelectorAll('.pilar-result-fill').forEach(f => { f.style.width = f.dataset.pct + '%'; });
  }, 100);
}

function getNivel(nota) {
  return NIVEIS.find(n => nota >= n.min && nota <= n.max) || NIVEIS[0];
}

// ─── MICRO INSIGHT (gera desejo) ──────────────────────────────────────────────

function renderInsight(notas, notaGeral) {
  const card = document.getElementById('insight-card');
  const txt  = document.getElementById('insight-text');
  const gap  = document.getElementById('insight-gap');
  if (!txt) return;

  // identifica o pilar mais fraco
  const entradas = Object.entries(notas);
  entradas.sort((a, b) => a[1] - b[1]);
  const [idFraco, notaFraco] = entradas[0];
  const nomeFraco = PILARES_NOMES[idFraco];

  // gap até a média do setor e até a melhor do mercado
  const gapSetor   = (BENCH_SETOR[idFraco]   - notaFraco).toFixed(1).replace('.', ',');
  const gapMercado = (BENCH_MERCADO[idFraco] - notaFraco).toFixed(1).replace('.', ',');
  const abaixoSetor = BENCH_SETOR[idFraco] > notaFraco;

  let frase;
  if (notaGeral >= 4.1) {
    frase = `Sua operação já é referência. O detalhe que separa os melhores dos demais agora está na consistência de <strong>${nomeFraco}</strong>, seu ponto de menor maturidade. Pequenos ganhos aqui se multiplicam no resultado final.`;
  } else if (abaixoSetor) {
    frase = `O ponto que mais drena resultado hoje é <strong>${nomeFraco}</strong>. Você está <strong>${gapSetor} ponto(s) abaixo da média do seu setor</strong> e <strong>${gapMercado} abaixo das melhores empresas do mercado</strong>. Cada nível de maturidade recuperado aqui costuma se traduzir diretamente em margem e capacidade que hoje escapam sem aparecer no relatório.`;
  } else {
    frase = `Você já superou a média do setor, mas <strong>${nomeFraco}</strong> ainda é seu maior espaço de ganho: <strong>${gapMercado} ponto(s) o separam das melhores empresas do mercado</strong>. É exatamente nessa distância que mora o resultado que ainda não está sendo capturado.`;
  }

  txt.innerHTML = frase;
  if (gap) {
    gap.innerHTML = `
      <div class="gap-row">
        <span class="gap-label">${nomeFraco}</span>
        <div class="gap-bars">
          <div class="gap-bar"><span style="width:${(notaFraco/5)*100}%;background:#185FA5;"></span><b>você ${notaFraco.toFixed(1).replace('.',',')}</b></div>
          <div class="gap-bar"><span style="width:${(BENCH_SETOR[idFraco]/5)*100}%;background:#CA8A04;"></span><b>setor ${BENCH_SETOR[idFraco].toFixed(1).replace('.',',')}</b></div>
          <div class="gap-bar"><span style="width:${(BENCH_MERCADO[idFraco]/5)*100}%;background:#16A34A;"></span><b>mercado ${BENCH_MERCADO[idFraco].toFixed(1).replace('.',',')}</b></div>
        </div>
      </div>`;
  }
}

// ─── MACRO PLANO DE AÇÃO ──────────────────────────────────────────────────────

const ACOES_MACRO = {
  fundacao: {
    titulo: 'Estruturar a base de gestão',
    acao: 'Implantar planejamento estratégico com OKRs desdobrados até a operação e instaurar um Comitê de Resultados com cadência fixa.',
    ganho: 'Decisão deixa de ser por achismo e a empresa passa a remar na mesma direção.'
  },
  capacidade: {
    titulo: 'Destravar a capacidade ociosa',
    acao: 'Mapear capacidade real por linha, identificar gargalos com método e dimensionar turnos pela demanda, não pelo costume.',
    ganho: 'Você produz mais com o mesmo ativo e para de pagar por capacidade que não usa.'
  },
  estrategia: {
    titulo: 'Padronizar o que gera resultado',
    acao: 'Documentar os processos críticos em SOP/POP, garantir aplicação com auditoria e instalar rotina de melhoria contínua.',
    ganho: 'O resultado deixa de depender de heróis e passa a depender de processo.'
  },
  indicadores: {
    titulo: 'Transformar dado em decisão',
    acao: 'Montar a árvore de KPIs conectada à estratégia, painel de gestão à vista e tratativa de desvio via Fato-Causa-Ação.',
    ganho: 'Todo indicador fora da meta vira ação rastreável, e o mesmo problema para de voltar.'
  }
};

function renderMacroPlano(notas) {
  const wrap = document.getElementById('macro-plan');
  if (!wrap) return;

  // ordena do pilar mais fraco ao mais forte (prioridade de ação)
  const ordem = Object.entries(notas).sort((a, b) => a[1] - b[1]);

  wrap.innerHTML = '';
  ordem.forEach(([id, nota], i) => {
    const ac = ACOES_MACRO[id];
    if (!ac) return;
    const prioridade = i === 0 ? 'Prioridade 1' : i === 1 ? 'Prioridade 2' : `Etapa ${i + 1}`;
    const item = document.createElement('div');
    item.className = 'macro-item fade-up fade-up-' + ((i % 4) + 1);
    item.innerHTML = `
      <div class="macro-step">${i + 1}</div>
      <div class="macro-content">
        <div class="macro-head">
          <span class="macro-pilar">${PILARES_NOMES[id]}</span>
          <span class="macro-prio">${prioridade}</span>
        </div>
        <h4>${ac.titulo}</h4>
        <p class="macro-acao">${ac.acao}</p>
        <p class="macro-ganho">${ac.ganho}</p>
      </div>`;
    wrap.appendChild(item);
  });
}

// ─── BENCHMARK (dados fictícios para comparação) ──────────────────────────────
// ordem dos eixos: fundacao, capacidade, estrategia, indicadores

const BENCH_MERCADO = { fundacao: 4.6, capacidade: 4.4, estrategia: 4.7, indicadores: 4.5 }; // melhor do mercado
const BENCH_SETOR   = { fundacao: 3.2, capacidade: 2.9, estrategia: 3.1, indicadores: 2.7 }; // média do setor (benchmarking)

// ─── RADAR ────────────────────────────────────────────────────────────────────

function renderRadar(notas) {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = 340, H = canvas.height = 340;
  const cx = W/2, cy = H/2, R = 118;

  const eixos = ['fundacao','capacidade','estrategia','indicadores'];
  const n = eixos.length;
  const ang = i => (Math.PI*2/n)*i - Math.PI/2;
  const pt  = (i,v) => ({ x: cx+(v/5)*R*Math.cos(ang(i)), y: cy+(v/5)*R*Math.sin(ang(i)) });

  ctx.clearRect(0,0,W,H);

  // grade circular
  for (let lvl=1;lvl<=5;lvl++) {
    ctx.beginPath();
    for (let i=0;i<n;i++) {
      const r=(lvl/5)*R;
      i===0 ? ctx.moveTo(cx+r*Math.cos(ang(i)), cy+r*Math.sin(ang(i)))
            : ctx.lineTo(cx+r*Math.cos(ang(i)), cy+r*Math.sin(ang(i)));
    }
    ctx.closePath(); ctx.strokeStyle=lvl===5?'#CBD5E1':'#E2E8F0'; ctx.lineWidth=0.5; ctx.stroke();
  }
  // raios
  for (let i=0;i<n;i++) {
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+R*Math.cos(ang(i)), cy+R*Math.sin(ang(i)));
    ctx.strokeStyle='#E2E8F0'; ctx.lineWidth=0.5; ctx.stroke();
  }

  // helper para desenhar uma série
  function serie(valores, fill, stroke, lineWidth, dash, dots) {
    ctx.setLineDash(dash || []);
    ctx.beginPath();
    valores.forEach((v,i) => { const p=pt(i,v); i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); });
    ctx.closePath();
    if (fill) { ctx.fillStyle=fill; ctx.fill(); }
    ctx.strokeStyle=stroke; ctx.lineWidth=lineWidth; ctx.stroke();
    ctx.setLineDash([]);
    if (dots) {
      valores.forEach((v,i) => {
        const p=pt(i,v); ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2);
        ctx.fillStyle=stroke; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=1.5; ctx.stroke();
      });
    }
  }

  const vMercado = eixos.map(e => BENCH_MERCADO[e]);
  const vSetor   = eixos.map(e => BENCH_SETOR[e]);
  const vEmpresa = eixos.map(e => notas[e] ?? 0);

  // 1º melhor do mercado (verde, fundo bem leve)
  serie(vMercado, 'rgba(22,163,74,0.06)', '#16A34A', 1.5, [5,4], false);
  // 2º média do setor (laranja tracejado)
  serie(vSetor, 'rgba(202,138,4,0.05)', '#CA8A04', 1.5, [3,3], false);
  // 3º sua empresa (azul sólido, em destaque, por cima)
  serie(vEmpresa, 'rgba(24,95,165,0.18)', '#185FA5', 2.5, [], true);

  // rótulos dos eixos
  ['Fundação','Capacidade','Estratégia','Indicadores'].forEach((l,i) => {
    const r=R+22; ctx.font='11px Inter,sans-serif'; ctx.fillStyle='#64748B'; ctx.textAlign='center';
    ctx.fillText(l, cx+r*Math.cos(ang(i)), cy+r*Math.sin(ang(i))+4);
  });
}

// ─── EBOOK ────────────────────────────────────────────────────────────────────

function setupEbookForm(lead) {
  const form = document.getElementById('ebook-form');
  if (!form) return;
  const ni = document.getElementById('ebook-nome'), ei = document.getElementById('ebook-email');
  if (lead.nome  && ni) ni.value = lead.nome;
  if (lead.email && ei) ei.value = lead.email;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome  = (ni && ni.value || '').trim();
    const email = (ei && ei.value || '').trim();
    if (!nome || !email) { mostrarToast('Preencha nome e e-mail para liberar.', ''); return; }

    // guarda o lead capturado neste passo
    const novoLead = { ...lead, nome, email };
    localStorage.setItem('evox_lead', JSON.stringify(novoLead));

    const btn = form.querySelector('button');
    btn.disabled = true; btn.innerHTML = '✓ Plano liberado!';
    mostrarToast('✓ Plano liberado! Download iniciando...', 'success');

    const link = document.createElement('a');
    link.href = 'assets/plano-evox.pdf'; link.download = 'plano-evox.pdf'; link.click();
  });
}

function mostrarToast(msg, tipo='') {
  const t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg; t.className = `toast ${tipo==='success'?'toast-success':''} show`;
  setTimeout(() => t.classList.remove('show'), 4000);
}
