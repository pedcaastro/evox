// ─── MAPEAMENTO DE NÍVEL ─────────────────────────────────────────────────────

const NIVEIS = [
  { min: 0.0, max: 1.0, nome: 'Inicial',            cor: '#DC2626', desc: 'Processos inexistentes ou totalmente informais. Há muito espaço para estruturar a operação.' },
  { min: 1.1, max: 2.0, nome: 'Reativo',            cor: '#EA580C', desc: 'A empresa age sob pressão, sem padrão estabelecido. As bases precisam ser construídas.' },
  { min: 2.1, max: 3.0, nome: 'Em desenvolvimento', cor: '#CA8A04', desc: 'Bases formadas, mas inconsistentes. Com foco certo, o salto para o nível gerenciado é rápido.' },
  { min: 3.1, max: 4.0, nome: 'Gerenciado',         cor: '#1D4ED8', desc: 'KPIs ativos e melhoria contínua em curso. Você está no caminho certo — refinar e sustentar é o próximo passo.' },
  { min: 4.1, max: 5.0, nome: 'Excelência',         cor: '#16A34A', desc: 'Referência de mercado. Sua operação é um ativo estratégico da empresa.' },
];

const PILARES_NOMES = {
  fundacao:    'Fundação EXO',
  capacidade:  'Capacidade Produtiva',
  estrategia:  'Estratégia Operacional',
  indicadores: 'Gestão de Indicadores',
};

// ─── SUPABASE ─────────────────────────────────────────────────────────────────

const SUPABASE_URL  = 'https://xgpdwusicfwvdzlhhovw.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhncGR3dXNpY2Z3dmR6bGhob3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMzYyNjYsImV4cCI6MjA5NDcxMjI2Nn0.P3twaDTYVKLoVAI4Rxojw9xXrHgIdmqhw4YMsWjpilM';

const DB_HEADERS = {
  'Content-Type':  'application/json',
  'apikey':        SUPABASE_ANON,
  'Authorization': `Bearer ${SUPABASE_ANON}`,
  'Prefer':        'return=representation'
};

async function salvarNoSupabase(lead, notas, notaGeral, respostasRaw) {
  // 1. salva lead
  const resLead = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST', headers: DB_HEADERS,
    body: JSON.stringify({
      nome: lead.nome, email: lead.email,
      empresa: lead.empresa, tamanho: lead.tamanho,
      cargo: lead.cargo || null, segmento: lead.segmento || null,
      nota_geral: notaGeral,
      nota_fundacao: notas.fundacao, nota_capacidade: notas.capacidade,
      nota_estrategia: notas.estrategia, nota_indicadores: notas.indicadores,
    })
  });
  if (!resLead.ok) throw new Error(await resLead.text());
  const leadData = await resLead.json();
  const leadId   = leadData[0].id;

  // 2. monta linhas de respostas
  const linhas = [];
  PILARES_DATA.forEach(pilar => {
    pilar.perguntas.forEach((pergunta, qIdx) => {
      const key       = `${pilar.id}_${qIdx}`;
      const pontuacao = respostasRaw[key] !== undefined ? respostasRaw[key] : 0;
      linhas.push({
        lead_id: leadId, pilar: pilar.nome,
        pergunta_num: qIdx + 1, pergunta: pergunta.texto,
        resposta: pergunta.opcoes[pontuacao], pontuacao
      });
    });
  });

  // 3. salva respostas
  const resResp = await fetch(`${SUPABASE_URL}/rest/v1/respostas`, {
    method: 'POST', headers: DB_HEADERS, body: JSON.stringify(linhas)
  });
  if (!resResp.ok) throw new Error(await resResp.text());
  return leadId;
}

// ─── DADOS DOS PILARES ────────────────────────────────────────────────────────

const PILARES_DATA = [
  {
    id: 'fundacao', nome: 'Fundação EXO',
    perguntas: [
      { texto: 'Sua empresa possui um planejamento estratégico formal, com objetivos definidos para o ano?', opcoes: ['Não temos nenhum planejamento documentado — decisões são tomadas conforme surgem','Temos algumas diretrizes na cabeça da liderança, mas nada formalizado','Existe um planejamento básico, mas não é acompanhado com regularidade','Temos planejamento documentado, revisado ao menos uma vez por ano com a equipe','Planejamento estratégico estruturado, com objetivos claros, revisões periódicas e desdobramento para as áreas']},
      { texto: 'Sua empresa utiliza OKR (Objetivos e Resultados-Chave) ou metodologia similar para definir e acompanhar metas?', opcoes: ['Nunca ouvi falar ou nunca aplicamos nada parecido','Já ouvi falar, mas não implementamos','Tentamos implementar, mas não sustentamos — caiu no esquecimento','Usamos OKR em algumas áreas, com acompanhamento parcial','OKR implementado em toda a empresa, com ciclos definidos e revisões regulares']},
      { texto: 'As metas da empresa são desdobradas até o nível operacional — equipes e colaboradores sabem o que precisam entregar?', opcoes: ['As metas ficam só na alta liderança, o chão de fábrica não sabe o que está sendo buscado','Alguns gestores repassam informalmente, mas sem padrão','As metas são comunicadas, mas não há responsáveis claros por cada uma','Metas desdobradas por área, com responsáveis definidos','Cada colaborador sabe exatamente sua meta, como ela conecta ao objetivo da empresa e como será medida']},
      { texto: 'Como é feita a gestão do dia a dia operacional da sua empresa?', opcoes: ['Cada área age por conta própria, sem rotina de gestão definida','Existe acompanhamento informal, baseado em percepção do gestor','Reuniões pontuais quando surgem problemas, sem cadência regular','Reuniões semanais com pauta definida e acompanhamento de pendências','Rotina de gestão estruturada com DDS, reuniões de performance e planos de ação formalizados']},
      { texto: 'Existe um Comitê de Resultados ou reunião formal de liderança para avaliar o desempenho da empresa periodicamente?', opcoes: ['Não existe nenhuma reunião estruturada de resultados','Nos reunimos apenas quando há crise ou problema grave','Há reuniões mensais, mas sem pauta ou análise de dados consistente','Comitê mensal com análise de resultados e definição de ações','Comitê estruturado, com frequência definida, dados preparados, decisões registradas e follow-up garantido']},
    ]
  },
  {
    id: 'capacidade', nome: 'Capacidade Produtiva',
    perguntas: [
      { texto: 'Você sabe qual é a capacidade máxima de produção da sua operação hoje — por turno, linha ou célula?', opcoes: ['Não temos esse número mapeado','Estimamos com base na experiência, mas sem dado formal','Sabemos a capacidade de algumas áreas, mas não de toda a operação','Temos a capacidade mapeada, revisada ocasionalmente','Capacidade produtiva mapeada por linha/célula, atualizada e usada ativamente no planejamento']},
      { texto: 'Como sua empresa planeja a produção em relação à demanda dos clientes?', opcoes: ['Produzimos conforme os pedidos chegam, sem planejamento antecipado','Há alguma previsão informal, baseada na intuição do gestor ou vendedor','Planejamos com base no histórico, mas sem metodologia estruturada','Temos um processo de S&OP básico, com alinhamento entre vendas e produção','Planejamento integrado de demanda e capacidade, com horizonte definido e revisões periódicas']},
      { texto: 'Sua operação tem gargalos de produção identificados? O que é feito com eles?', opcoes: ['Não sabemos onde estão os gargalos','Percebemos os gargalos no dia a dia, mas não temos registro ou análise formal','Os gargalos são conhecidos, mas as ações de melhoria são pontuais e reativas','Gargalos mapeados com planos de ação em andamento','Gestão ativa de restrições com metodologia (TOC ou similar), revisada periodicamente']},
      { texto: 'Como você avalia o nível de ociosidade ou desperdício de capacidade na sua operação?', opcoes: ['Não medimos — não sabemos quanto estamos desperdiçando','Sabemos que existe desperdício, mas não quantificamos','Medimos em algumas áreas, sem visão consolidada','OEE ou indicador similar monitorado, com ações corretivas em curso','Eficiência operacional monitorada em tempo real, com metas e planos de melhoria contínua']},
      { texto: 'Sua estrutura de turnos e equipes é dimensionada com base na demanda real, ou é definida por costume?', opcoes: ['A escala foi definida há anos e nunca foi revisada','Ajustamos informalmente conforme a necessidade, sem critério formal','Fazemos ajustes sazonais, mas sem dados estruturados como base','O dimensionamento é revisado periodicamente com base em histórico de demanda','Dimensionamento de turnos e equipes baseado em dados de demanda, capacidade e produtividade, revisado regularmente']},
    ]
  },
  {
    id: 'estrategia', nome: 'Estratégia Operacional',
    perguntas: [
      { texto: 'Sua empresa já realizou um diagnóstico operacional formal — mapeando como os processos realmente funcionam hoje?', opcoes: ['Nunca fizemos nenhum tipo de diagnóstico estruturado','Já conversamos sobre isso, mas nunca formalizamos','Fizemos um levantamento parcial, em algumas áreas apenas','Temos um diagnóstico geral da operação, mas desatualizado','Diagnóstico operacional completo e atualizado, usado como base para as decisões de melhoria']},
      { texto: 'Os processos críticos da sua operação estão documentados em SOP ou POP (procedimentos operacionais padrão)?', opcoes: ['Nada documentado — o conhecimento está na cabeça das pessoas','Alguns processos têm anotações informais, sem padrão definido','Temos alguns procedimentos documentados, mas incompletos ou desatualizados','Processos críticos documentados, acessíveis às equipes','SOPs/POPs completos, atualizados, com treinamento e validação de aplicação pelas equipes']},
      { texto: 'Quando um novo processo ou padrão é definido, como é garantida a aplicação real no dia a dia?', opcoes: ['Comunicamos verbalmente e esperamos que as pessoas sigam','Fazemos um treinamento pontual, mas sem acompanhamento posterior','Há algum acompanhamento inicial, mas o processo acaba voltando ao antigo comportamento','Treinamento + checklist de verificação + acompanhamento pelo gestor nas primeiras semanas','Processo de implantação estruturado com treinamento, validação, auditoria e plano de sustentação']},
      { texto: 'Os processos da sua empresa são monitorados ativamente — existe alguém responsável por garantir que os padrões estão sendo seguidos?', opcoes: ['Não há monitoramento — só sabemos que algo está errado quando o problema aparece','O gestor observa informalmente, sem registro','Fazemos auditorias esporádicas, sem frequência definida','Existe responsável pelo monitoramento com frequência regular e registro de desvios','Monitoramento sistemático com indicadores de conformidade, tratamento de desvios e melhoria contínua do padrão']},
      { texto: 'Existe uma cultura de melhoria contínua na sua empresa — as equipes identificam e propõem melhorias nos processos?', opcoes: ['Não existe esse hábito — as pessoas executam e não questionam','Algumas pessoas sugerem melhorias, mas de forma isolada e sem canal formal','Temos iniciativas pontuais de melhoria, mas sem metodologia ou continuidade','Canal aberto para sugestões, com análise e resposta pela liderança','Cultura Kaizen estabelecida — times engajados, ciclos PDCA rodando e melhorias registradas com impacto medido']},
    ]
  },
  {
    id: 'indicadores', nome: 'Gestão de Indicadores',
    perguntas: [
      { texto: 'Sua empresa tem KPIs (indicadores de desempenho) definidos e formalizados para as áreas operacionais?', opcoes: ['Não medimos nada de forma estruturada','Temos alguns números no Excel, mas sem definição formal de indicadores','Indicadores definidos em algumas áreas, sem padronização','KPIs definidos para as principais áreas, com responsáveis e metas','Árvore de KPIs estruturada, conectada à estratégia, com dono, meta, frequência e fonte de dados definidos']},
      { texto: 'Como os indicadores são acompanhados no dia a dia — existe um painel ou dashboard visível para as equipes?', opcoes: ['Não temos nenhum painel — os dados ficam dispersos em planilhas ou sistemas','Alguns gestores acompanham por conta própria, sem visibilidade para a equipe','Relatório mensal enviado por e-mail, mas sem rotina de análise coletiva','Dashboard visível para liderança, atualizado regularmente','Painel de gestão à vista, atualizado em tempo real ou diariamente, acessível a todos os níveis']},
      { texto: 'Quando um indicador fica abaixo da meta, qual é o processo da sua empresa para tratar o desvio?', opcoes: ['Não há processo — cada um resolve como pode','O gestor cobra o responsável, mas sem análise formal da causa','Discutimos em reunião, mas as ações nem sempre são formalizadas','Plano de ação gerado com responsável e prazo definido','Processo estruturado: análise de causa, plano de ação, execução monitorada e verificação de eficácia']},
      { texto: 'Sua empresa realiza análises críticas de resultados com a liderança — avaliando tendências, riscos e oportunidades?', opcoes: ['Não realizamos análises críticas formais','O dono analisa os números sozinho, sem envolver a equipe de liderança','Reuniões esporádicas de resultado, sem pauta ou metodologia definida','Análise crítica mensal com liderança, avaliando os principais KPIs','Análise crítica estruturada com agenda, dados preparados, avaliação de tendências e decisões registradas']},
      { texto: 'Quando ocorre um problema recorrente na operação, sua empresa aplica uma metodologia de análise de causa raiz (como FCA, 5 Porquês ou Ishikawa)?', opcoes: ['Resolvemos o sintoma e seguimos em frente — o problema volta sempre','Tentamos identificar a causa, mas de forma intuitiva e sem registro','Usamos análise de causa em problemas grandes, mas não sistematicamente','Metodologia de análise de causa aplicada nos principais desvios, com registro','FCA ou metodologia equivalente aplicada de forma sistemática, com banco de lições aprendidas e prevenção de reincidência']},
    ]
  }
];

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  const notas        = JSON.parse(localStorage.getItem('evox_notas')      || '{}');
  const notaGeral    = parseFloat(localStorage.getItem('evox_nota_geral') || '0');
  const lead         = JSON.parse(localStorage.getItem('evox_lead')       || '{}');
  const respostasRaw = JSON.parse(localStorage.getItem('evox_respostas')  || '{}');

  if (!Object.keys(notas).length) { window.location.href = 'lead.html'; return; }

  renderResultado(notas, notaGeral, lead);
  renderRadar(notas);
  setupEbookForm(lead);

  if (lead.email) {
    try { await salvarNoSupabase(lead, notas, notaGeral, respostasRaw); }
    catch (err) { console.warn('Supabase:', err); }
  }
});

// ─── RENDER ───────────────────────────────────────────────────────────────────

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

// ─── RADAR ────────────────────────────────────────────────────────────────────

function renderRadar(notas) {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = 300, H = canvas.height = 300;
  const cx = W/2, cy = H/2, R = 110;
  const values = Object.values(notas), n = values.length;
  const ang = i => (Math.PI*2/n)*i - Math.PI/2;
  const pt  = (i,v) => ({ x: cx+(v/5)*R*Math.cos(ang(i)), y: cy+(v/5)*R*Math.sin(ang(i)) });

  ctx.clearRect(0,0,W,H);
  for (let lvl=1;lvl<=5;lvl++) {
    ctx.beginPath();
    for (let i=0;i<n;i++) { const r=(lvl/5)*R; i===0?ctx.moveTo(cx+r*Math.cos(ang(i)),cy+r*Math.sin(ang(i))):ctx.lineTo(cx+r*Math.cos(ang(i)),cy+r*Math.sin(ang(i))); }
    ctx.closePath(); ctx.strokeStyle=lvl===5?'#CBD5E1':'#E2E8F0'; ctx.lineWidth=0.5; ctx.stroke();
  }
  for (let i=0;i<n;i++) { ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+R*Math.cos(ang(i)),cy+R*Math.sin(ang(i))); ctx.strokeStyle='#E2E8F0'; ctx.lineWidth=0.5; ctx.stroke(); }
  ctx.beginPath();
  values.forEach((v,i) => { const p=pt(i,v); i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y); });
  ctx.closePath(); ctx.fillStyle='rgba(24,95,165,0.15)'; ctx.strokeStyle='#185FA5'; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
  values.forEach((v,i) => { const p=pt(i,v); ctx.beginPath(); ctx.arc(p.x,p.y,5,0,Math.PI*2); ctx.fillStyle='#185FA5'; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke(); });
  ['Fundação','Capacidade','Estratégia','Indicadores'].forEach((l,i) => { const r=R+22; ctx.font='11px Inter,sans-serif'; ctx.fillStyle='#64748B'; ctx.textAlign='center'; ctx.fillText(l,cx+r*Math.cos(ang(i)),cy+r*Math.sin(ang(i))+4); });
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
    const btn = form.querySelector('button');
    btn.disabled = true; btn.textContent = '✓ Download liberado!';
    mostrarToast('✓ Ebook liberado! Download iniciando...', 'success');
    const link = document.createElement('a');
    link.href = 'assets/ebook.pdf'; link.download = 'ebook-evox.pdf'; link.click();
    localStorage.removeItem('evox_respostas'); localStorage.removeItem('evox_pilar');
  });
}

function mostrarToast(msg, tipo='') {
  const t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg; t.className = `toast ${tipo==='success'?'toast-success':''} show`;
  setTimeout(() => t.classList.remove('show'), 4000);
}
