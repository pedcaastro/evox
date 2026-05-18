// ─── DADOS DO DIAGNÓSTICO ───────────────────────────────────────────────────

const PILARES = [
  {
    id: 'fundacao',
    nome: 'Fundação EXO',
    sub: 'Planejamento estratégico · OKR · Metas · Comitê de resultados',
    icon: '🏛',
    perguntas: [
      {
        texto: 'Sua empresa possui um planejamento estratégico formal, com objetivos definidos para o ano?',
        opcoes: [
          'Não temos nenhum planejamento documentado — decisões são tomadas conforme surgem',
          'Temos algumas diretrizes na cabeça da liderança, mas nada formalizado',
          'Existe um planejamento básico, mas não é acompanhado com regularidade',
          'Temos planejamento documentado, revisado ao menos uma vez por ano com a equipe',
          'Planejamento estratégico estruturado, com objetivos claros, revisões periódicas e desdobramento para as áreas'
        ]
      },
      {
        texto: 'Sua empresa utiliza OKR (Objetivos e Resultados-Chave) ou metodologia similar para definir e acompanhar metas?',
        opcoes: [
          'Nunca ouvi falar ou nunca aplicamos nada parecido',
          'Já ouvi falar, mas não implementamos',
          'Tentamos implementar, mas não sustentamos — caiu no esquecimento',
          'Usamos OKR em algumas áreas, com acompanhamento parcial',
          'OKR implementado em toda a empresa, com ciclos definidos e revisões regulares'
        ]
      },
      {
        texto: 'As metas da empresa são desdobradas até o nível operacional — equipes e colaboradores sabem o que precisam entregar?',
        opcoes: [
          'As metas ficam só na alta liderança, o chão de fábrica não sabe o que está sendo buscado',
          'Alguns gestores repassam informalmente, mas sem padrão',
          'As metas são comunicadas, mas não há responsáveis claros por cada uma',
          'Metas desdobradas por área, com responsáveis definidos',
          'Cada colaborador sabe exatamente sua meta, como ela conecta ao objetivo da empresa e como será medida'
        ]
      },
      {
        texto: 'Como é feita a gestão do dia a dia operacional da sua empresa?',
        opcoes: [
          'Cada área age por conta própria, sem rotina de gestão definida',
          'Existe acompanhamento informal, baseado em percepção do gestor',
          'Reuniões pontuais quando surgem problemas, sem cadência regular',
          'Reuniões semanais com pauta definida e acompanhamento de pendências',
          'Rotina de gestão estruturada com DDS, reuniões de performance e planos de ação formalizados'
        ]
      },
      {
        texto: 'Existe um Comitê de Resultados ou reunião formal de liderança para avaliar o desempenho da empresa periodicamente?',
        opcoes: [
          'Não existe nenhuma reunião estruturada de resultados',
          'Nos reunimos apenas quando há crise ou problema grave',
          'Há reuniões mensais, mas sem pauta ou análise de dados consistente',
          'Comitê mensal com análise de resultados e definição de ações',
          'Comitê estruturado, com frequência definida, dados preparados, decisões registradas e follow-up garantido'
        ]
      }
    ]
  },
  {
    id: 'capacidade',
    nome: 'Capacidade Produtiva',
    sub: 'Turnos · Capacidade instalada · Gargalos · Planejamento de demanda',
    icon: '⚙️',
    perguntas: [
      {
        texto: 'Você sabe qual é a capacidade máxima de produção da sua operação hoje — por turno, linha ou célula?',
        opcoes: [
          'Não temos esse número mapeado',
          'Estimamos com base na experiência, mas sem dado formal',
          'Sabemos a capacidade de algumas áreas, mas não de toda a operação',
          'Temos a capacidade mapeada, revisada ocasionalmente',
          'Capacidade produtiva mapeada por linha/célula, atualizada e usada ativamente no planejamento'
        ]
      },
      {
        texto: 'Como sua empresa planeja a produção em relação à demanda dos clientes?',
        opcoes: [
          'Produzimos conforme os pedidos chegam, sem planejamento antecipado',
          'Há alguma previsão informal, baseada na intuição do gestor ou vendedor',
          'Planejamos com base no histórico, mas sem metodologia estruturada',
          'Temos um processo de S&OP básico, com alinhamento entre vendas e produção',
          'Planejamento integrado de demanda e capacidade, com horizonte definido e revisões periódicas'
        ]
      },
      {
        texto: 'Sua operação tem gargalos de produção identificados? O que é feito com eles?',
        opcoes: [
          'Não sabemos onde estão os gargalos',
          'Percebemos os gargalos no dia a dia, mas não temos registro ou análise formal',
          'Os gargalos são conhecidos, mas as ações de melhoria são pontuais e reativas',
          'Gargalos mapeados com planos de ação em andamento',
          'Gestão ativa de restrições com metodologia (TOC ou similar), revisada periodicamente'
        ]
      },
      {
        texto: 'Como você avalia o nível de ociosidade ou desperdício de capacidade na sua operação?',
        opcoes: [
          'Não medimos — não sabemos quanto estamos desperdiçando',
          'Sabemos que existe desperdício, mas não quantificamos',
          'Medimos em algumas áreas, sem visão consolidada',
          'OEE ou indicador similar monitorado, com ações corretivas em curso',
          'Eficiência operacional monitorada em tempo real, com metas e planos de melhoria contínua'
        ]
      },
      {
        texto: 'Sua estrutura de turnos e equipes é dimensionada com base na demanda real, ou é definida por costume?',
        opcoes: [
          'A escala foi definida há anos e nunca foi revisada',
          'Ajustamos informalmente conforme a necessidade, sem critério formal',
          'Fazemos ajustes sazonais, mas sem dados estruturados como base',
          'O dimensionamento é revisado periodicamente com base em histórico de demanda',
          'Dimensionamento de turnos e equipes baseado em dados de demanda, capacidade e produtividade, revisado regularmente'
        ]
      }
    ]
  },
  {
    id: 'estrategia',
    nome: 'Estratégia Operacional',
    sub: 'Diagnóstico · SOP/POP · Aplicação · Monitoramento · Melhoria contínua',
    icon: '📋',
    perguntas: [
      {
        texto: 'Sua empresa já realizou um diagnóstico operacional formal — mapeando como os processos realmente funcionam hoje?',
        opcoes: [
          'Nunca fizemos nenhum tipo de diagnóstico estruturado',
          'Já conversamos sobre isso, mas nunca formalizamos',
          'Fizemos um levantamento parcial, em algumas áreas apenas',
          'Temos um diagnóstico geral da operação, mas desatualizado',
          'Diagnóstico operacional completo e atualizado, usado como base para as decisões de melhoria'
        ]
      },
      {
        texto: 'Os processos críticos da sua operação estão documentados em SOP ou POP (procedimentos operacionais padrão)?',
        opcoes: [
          'Nada documentado — o conhecimento está na cabeça das pessoas',
          'Alguns processos têm anotações informais, sem padrão definido',
          'Temos alguns procedimentos documentados, mas incompletos ou desatualizados',
          'Processos críticos documentados, acessíveis às equipes',
          'SOPs/POPs completos, atualizados, com treinamento e validação de aplicação pelas equipes'
        ]
      },
      {
        texto: 'Quando um novo processo ou padrão é definido, como é garantida a aplicação real no dia a dia?',
        opcoes: [
          'Comunicamos verbalmente e esperamos que as pessoas sigam',
          'Fazemos um treinamento pontual, mas sem acompanhamento posterior',
          'Há algum acompanhamento inicial, mas o processo acaba voltando ao antigo comportamento',
          'Treinamento + checklist de verificação + acompanhamento pelo gestor nas primeiras semanas',
          'Processo de implantação estruturado com treinamento, validação, auditoria e plano de sustentação'
        ]
      },
      {
        texto: 'Os processos da sua empresa são monitorados ativamente — existe alguém responsável por garantir que os padrões estão sendo seguidos?',
        opcoes: [
          'Não há monitoramento — só sabemos que algo está errado quando o problema aparece',
          'O gestor observa informalmente, sem registro',
          'Fazemos auditorias esporádicas, sem frequência definida',
          'Existe responsável pelo monitoramento com frequência regular e registro de desvios',
          'Monitoramento sistemático com indicadores de conformidade, tratamento de desvios e melhoria contínua do padrão'
        ]
      },
      {
        texto: 'Existe uma cultura de melhoria contínua na sua empresa — as equipes identificam e propõem melhorias nos processos?',
        opcoes: [
          'Não existe esse hábito — as pessoas executam e não questionam',
          'Algumas pessoas sugerem melhorias, mas de forma isolada e sem canal formal',
          'Temos iniciativas pontuais de melhoria, mas sem metodologia ou continuidade',
          'Canal aberto para sugestões, com análise e resposta pela liderança',
          'Cultura Kaizen estabelecida — times engajados, ciclos PDCA rodando e melhorias registradas com impacto medido'
        ]
      }
    ]
  },
  {
    id: 'indicadores',
    nome: 'Gestão de Indicadores',
    sub: 'KPI/OKR · Implementação · Monitoramento · Análises Críticas · FCA',
    icon: '📊',
    perguntas: [
      {
        texto: 'Sua empresa tem KPIs (indicadores de desempenho) definidos e formalizados para as áreas operacionais?',
        opcoes: [
          'Não medimos nada de forma estruturada',
          'Temos alguns números no Excel, mas sem definição formal de indicadores',
          'Indicadores definidos em algumas áreas, sem padronização',
          'KPIs definidos para as principais áreas, com responsáveis e metas',
          'Árvore de KPIs estruturada, conectada à estratégia, com dono, meta, frequência e fonte de dados definidos'
        ]
      },
      {
        texto: 'Como os indicadores são acompanhados no dia a dia — existe um painel ou dashboard visível para as equipes?',
        opcoes: [
          'Não temos nenhum painel — os dados ficam dispersos em planilhas ou sistemas',
          'Alguns gestores acompanham por conta própria, sem visibilidade para a equipe',
          'Relatório mensal enviado por e-mail, mas sem rotina de análise coletiva',
          'Dashboard visível para liderança, atualizado regularmente',
          'Painel de gestão à vista, atualizado em tempo real ou diariamente, acessível a todos os níveis'
        ]
      },
      {
        texto: 'Quando um indicador fica abaixo da meta, qual é o processo da sua empresa para tratar o desvio?',
        opcoes: [
          'Não há processo — cada um resolve como pode',
          'O gestor cobra o responsável, mas sem análise formal da causa',
          'Discutimos em reunião, mas as ações nem sempre são formalizadas',
          'Plano de ação gerado com responsável e prazo definido',
          'Processo estruturado: análise de causa, plano de ação, execução monitorada e verificação de eficácia'
        ]
      },
      {
        texto: 'Sua empresa realiza análises críticas de resultados com a liderança — avaliando tendências, riscos e oportunidades?',
        opcoes: [
          'Não realizamos análises críticas formais',
          'O dono analisa os números sozinho, sem envolver a equipe de liderança',
          'Reuniões esporádicas de resultado, sem pauta ou metodologia definida',
          'Análise crítica mensal com liderança, avaliando os principais KPIs',
          'Análise crítica estruturada com agenda, dados preparados, avaliação de tendências e decisões registradas'
        ]
      },
      {
        texto: 'Quando ocorre um problema recorrente na operação, sua empresa aplica uma metodologia de análise de causa raiz (como FCA, 5 Porquês ou Ishikawa)?',
        opcoes: [
          'Resolvemos o sintoma e seguimos em frente — o problema volta sempre',
          'Tentamos identificar a causa, mas de forma intuitiva e sem registro',
          'Usamos análise de causa em problemas grandes, mas não sistematicamente',
          'Metodologia de análise de causa aplicada nos principais desvios, com registro',
          'FCA ou metodologia equivalente aplicada de forma sistemática, com banco de lições aprendidas e prevenção de reincidência'
        ]
      }
    ]
  }
];

// ─── ESTADO ──────────────────────────────────────────────────────────────────

let pilarAtual = 0;
let respostas  = {};   // { 'fundacao_0': 3, 'fundacao_1': 2, ... }

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // recupera respostas salvas (caso o usuário navegue para trás)
  const saved = localStorage.getItem('evox_respostas');
  if (saved) respostas = JSON.parse(saved);

  const savedPilar = localStorage.getItem('evox_pilar');
  if (savedPilar) pilarAtual = parseInt(savedPilar);

  renderPilar(pilarAtual);
  atualizarProgresso();
});

// ─── RENDER ───────────────────────────────────────────────────────────────────

function renderPilar(idx) {
  const pilar = PILARES[idx];
  const container = document.getElementById('pilar-container');

  // cabeçalho do pilar
  document.getElementById('pilar-badge').textContent = `Pilar ${idx + 1} de ${PILARES.length}`;
  document.getElementById('pilar-nome').textContent   = pilar.nome;
  document.getElementById('pilar-sub').textContent    = pilar.sub;

  // perguntas
  container.innerHTML = '';
  pilar.perguntas.forEach((pergunta, qIdx) => {
    const key = `${pilar.id}_${qIdx}`;
    const valorSalvo = respostas[key] !== undefined ? respostas[key] : null;

    const card = document.createElement('div');
    card.className = 'question-card fade-up fade-up-' + (qIdx % 4 + 1);

    card.innerHTML = `
      <div class="question-num">Pergunta ${qIdx + 1}</div>
      <div class="question-text">${pergunta.texto}</div>
      <div class="options" id="opts-${qIdx}">
        ${pergunta.opcoes.map((opcao, oIdx) => `
          <label class="option-label ${valorSalvo === oIdx ? 'selected' : ''}" data-q="${qIdx}" data-v="${oIdx}">
            <input type="radio" name="q${qIdx}" value="${oIdx}" ${valorSalvo === oIdx ? 'checked' : ''}>
            <span class="option-indicator"></span>
            <span class="option-score">${oIdx}</span>
            <span class="option-text">${opcao}</span>
          </label>
        `).join('')}
      </div>
    `;
    container.appendChild(card);
  });

  // event listeners nas opções
  container.querySelectorAll('.option-label').forEach(label => {
    label.addEventListener('click', () => {
      const qIdx = parseInt(label.dataset.q);
      const val  = parseInt(label.dataset.v);
      selecionarOpcao(qIdx, val);
    });
  });

  // dots de navegação
  renderDots();
  atualizarBotoes();
}

function selecionarOpcao(qIdx, valor) {
  const pilar = PILARES[pilarAtual];
  const key   = `${pilar.id}_${qIdx}`;
  respostas[key] = valor;
  localStorage.setItem('evox_respostas', JSON.stringify(respostas));

  // atualiza visual
  const opts = document.querySelectorAll(`[data-q="${qIdx}"]`);
  opts.forEach(opt => {
    opt.classList.toggle('selected', parseInt(opt.dataset.v) === valor);
  });

  atualizarBotoes();
  atualizarProgresso();
}

function renderDots() {
  const container = document.getElementById('diag-dots');
  container.innerHTML = '';
  PILARES.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'diag-dot' +
      (idx === pilarAtual ? ' active' : '') +
      (idx < pilarAtual  ? ' done'   : '');
    container.appendChild(dot);
  });
}

function atualizarProgresso() {
  const total     = PILARES.length * 5;
  const respondidas = Object.keys(respostas).length;
  const pct       = Math.round((respondidas / total) * 100);

  const fill  = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (fill)  fill.style.width = pct + '%';
  if (label) label.textContent = `${respondidas} de ${total} perguntas`;
}

function atualizarBotoes() {
  const pilar        = PILARES[pilarAtual];
  const btnProximo   = document.getElementById('btn-proximo');
  const btnAnterior  = document.getElementById('btn-anterior');

  // verifica se todas as 5 perguntas do pilar foram respondidas
  const todasRespondidas = pilar.perguntas.every((_, qIdx) =>
    respostas[`${pilar.id}_${qIdx}`] !== undefined
  );

  btnProximo.disabled = !todasRespondidas;
  btnAnterior.style.visibility = pilarAtual === 0 ? 'hidden' : 'visible';

  // texto do botão
  if (pilarAtual === PILARES.length - 1) {
    btnProximo.textContent = 'Ver meu resultado →';
  } else {
    btnProximo.textContent = 'Próximo pilar →';
  }
}

// ─── NAVEGAÇÃO ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-proximo').addEventListener('click', avancar);
  document.getElementById('btn-anterior').addEventListener('click', voltar);
});

function avancar() {
  if (pilarAtual < PILARES.length - 1) {
    pilarAtual++;
    localStorage.setItem('evox_pilar', pilarAtual);
    renderPilar(pilarAtual);
    atualizarProgresso();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // último pilar — calcula e vai para resultado
    calcularEIrParaResultado();
  }
}

function voltar() {
  if (pilarAtual > 0) {
    pilarAtual--;
    localStorage.setItem('evox_pilar', pilarAtual);
    renderPilar(pilarAtual);
    atualizarProgresso();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ─── CÁLCULO ──────────────────────────────────────────────────────────────────

function calcularEIrParaResultado() {
  const notas = {};
  PILARES.forEach(pilar => {
    const soma = pilar.perguntas.reduce((acc, _, qIdx) => {
      const val = respostas[`${pilar.id}_${qIdx}`];
      return acc + (val !== undefined ? val : 0);
    }, 0);
    // cada pergunta vale 0-4, máximo 20, escala para 0-5
    notas[pilar.id] = parseFloat(((soma / 20) * 5).toFixed(1));
  });

  const notaGeral = parseFloat(
    (Object.values(notas).reduce((a, b) => a + b, 0) / PILARES.length).toFixed(1)
  );

  localStorage.setItem('evox_notas', JSON.stringify(notas));
  localStorage.setItem('evox_nota_geral', notaGeral);

  window.location.href = 'resultado.html';
}
