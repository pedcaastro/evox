// ─── MAPEAMENTO DE NÍVEL ─────────────────────────────────────────────────────

const NIVEIS = [
  { min: 0.0, max: 1.0, nome: 'Inicial',           cor: '#DC2626', desc: 'Processos inexistentes ou totalmente informais. Há muito espaço para estruturar a operação.' },
  { min: 1.1, max: 2.0, nome: 'Reativo',           cor: '#EA580C', desc: 'A empresa age sob pressão, sem padrão estabelecido. As bases precisam ser construídas.' },
  { min: 2.1, max: 3.0, nome: 'Em desenvolvimento',cor: '#CA8A04', desc: 'Bases formadas, mas inconsistentes. Com foco certo, o salto para o nível gerenciado é rápido.' },
  { min: 3.1, max: 4.0, nome: 'Gerenciado',        cor: '#1D4ED8', desc: 'KPIs ativos e melhoria contínua em curso. Você está no caminho certo — refinar e sustentar é o próximo passo.' },
  { min: 4.1, max: 5.0, nome: 'Excelência',        cor: '#16A34A', desc: 'Referência de mercado. Sua operação é um ativo estratégico da empresa.' },
];

const PILARES_NOMES = {
  fundacao:    'Fundação EXO',
  capacidade:  'Capacidade Produtiva',
  estrategia:  'Estratégia Operacional',
  indicadores: 'Gestão de Indicadores',
};

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const notas     = JSON.parse(localStorage.getItem('evox_notas') || '{}');
  const notaGeral = parseFloat(localStorage.getItem('evox_nota_geral') || '0');

  // redireciona se não há dados
  if (!Object.keys(notas).length) {
    window.location.href = 'diagnostico.html';
    return;
  }

  renderResultado(notas, notaGeral);
  renderRadar(notas);
  setupEbookForm();
});

// ─── RENDER RESULTADO ─────────────────────────────────────────────────────────

function renderResultado(notas, notaGeral) {
  const nivel = getNivel(notaGeral);

  // score geral
  document.getElementById('score-num').textContent  = notaGeral.toFixed(1);
  document.getElementById('resultado-nivel').textContent = nivel.nome;
  document.getElementById('resultado-desc').textContent  = nivel.desc;
  document.getElementById('score-num').style.color = nivel.cor;

  // badge de nível
  const badge = document.getElementById('nivel-badge');
  badge.textContent   = nivel.nome;
  badge.style.background = nivel.cor + '22';
  badge.style.color      = nivel.cor;
  badge.style.border     = `1px solid ${nivel.cor}44`;

  // cards por pilar
  const grid = document.getElementById('pilares-grid');
  grid.innerHTML = '';

  Object.entries(notas).forEach(([id, nota]) => {
    const nivelPilar = getNivel(nota);
    const pct        = (nota / 5) * 100;

    const card = document.createElement('div');
    card.className = 'pilar-result-card fade-up fade-up-1';
    card.innerHTML = `
      <div class="pilar-result-header">
        <div class="pilar-result-name">${PILARES_NOMES[id]}</div>
        <div class="pilar-result-score" style="color:${nivelPilar.cor}">${nota.toFixed(1)}</div>
      </div>
      <div class="pilar-result-track">
        <div class="pilar-result-fill" style="width:0%; background: linear-gradient(90deg, ${nivelPilar.cor}99, ${nivelPilar.cor});" data-pct="${pct}"></div>
      </div>
      <div class="pilar-result-label" style="color:${nivelPilar.cor}">${nivelPilar.nome}</div>
    `;
    grid.appendChild(card);
  });

  // anima as barras após inserir no DOM
  setTimeout(() => {
    document.querySelectorAll('.pilar-result-fill').forEach(fill => {
      fill.style.width = fill.dataset.pct + '%';
    });
  }, 100);
}

function getNivel(nota) {
  return NIVEIS.find(n => nota >= n.min && nota <= n.max) || NIVEIS[0];
}

// ─── RADAR CHART ─────────────────────────────────────────────────────────────

function renderRadar(notas) {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const W   = canvas.width  = 300;
  const H   = canvas.height = 300;
  const cx  = W / 2;
  const cy  = H / 2;
  const R   = 110;

  const labels = Object.keys(notas);
  const values = Object.values(notas);
  const n      = labels.length;
  const angStep = (Math.PI * 2) / n;

  function ponto(i, val) {
    const ang = angStep * i - Math.PI / 2;
    const r   = (val / 5) * R;
    return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
  }

  // fundo
  ctx.clearRect(0, 0, W, H);

  // grid (5 níveis)
  for (let lvl = 1; lvl <= 5; lvl++) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const ang = angStep * i - Math.PI / 2;
      const r   = (lvl / 5) * R;
      const x   = cx + r * Math.cos(ang);
      const y   = cy + r * Math.sin(ang);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = lvl === 5 ? '#CBD5E1' : '#E2E8F0';
    ctx.lineWidth   = 0.5;
    ctx.stroke();
  }

  // eixos
  for (let i = 0; i < n; i++) {
    const ang = angStep * i - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(ang), cy + R * Math.sin(ang));
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth   = 0.5;
    ctx.stroke();
  }

  // área preenchida
  ctx.beginPath();
  values.forEach((val, i) => {
    const p = ponto(i, val);
    i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
  ctx.fillStyle   = 'rgba(24,95,165,0.15)';
  ctx.strokeStyle = '#185FA5';
  ctx.lineWidth   = 2;
  ctx.fill();
  ctx.stroke();

  // pontos
  values.forEach((val, i) => {
    const p = ponto(i, val);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#185FA5';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 2;
    ctx.stroke();
  });

  // labels
  ctx.font      = '11px Inter, sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.textAlign = 'center';
  const nomesCurtos = ['Fundação', 'Capacidade', 'Estratégia', 'Indicadores'];
  labels.forEach((_, i) => {
    const ang    = angStep * i - Math.PI / 2;
    const r      = R + 22;
    const x      = cx + r * Math.cos(ang);
    const y      = cy + r * Math.sin(ang) + 4;
    ctx.fillText(nomesCurtos[i] || _, x, y);
  });
}

// ─── FORMULÁRIO EBOOK ─────────────────────────────────────────────────────────

function setupEbookForm() {
  const form = document.getElementById('ebook-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('ebook-email').value.trim();
    const nome  = document.getElementById('ebook-nome').value.trim();

    if (!email || !nome) return;

    const btn = form.querySelector('button');
    btn.disabled     = true;
    btn.textContent  = 'Enviando...';

    // ── INTEGRAÇÃO BREVO (ativar quando tiver a API key) ──────────────────
    // const notas     = JSON.parse(localStorage.getItem('evox_notas') || '{}');
    // const notaGeral = localStorage.getItem('evox_nota_geral');
    //
    // await fetch('https://api.brevo.com/v3/smtp/email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'api-key': 'SUA_API_KEY_BREVO'
    //   },
    //   body: JSON.stringify({
    //     sender: { name: 'EVOX Consultoria', email: 'contato@evox.com.br' },
    //     to: [{ email, name: nome }],
    //     subject: 'Seu diagnóstico EVOX + ebook exclusivo',
    //     htmlContent: `<p>Olá ${nome}, sua nota geral foi ${notaGeral}. Em anexo seu ebook.</p>`,
    //     attachment: [{ url: 'https://seusite.vercel.app/assets/ebook.pdf', name: 'ebook-evox.pdf' }]
    //   })
    // });
    // ─────────────────────────────────────────────────────────────────────

    // por enquanto: download direto
    setTimeout(() => {
      mostrarToast('✓ Ebook liberado! Download iniciando...', 'success');
      btn.textContent = '✓ Download liberado!';

      // cria link temporário de download
      const link  = document.createElement('a');
      link.href   = 'assets/ebook.pdf';
      link.download = 'ebook-evox-excelencia-operacional.pdf';
      link.click();

      // salva lead no localStorage (temporário — substituir por backend)
      const leads = JSON.parse(localStorage.getItem('evox_leads') || '[]');
      leads.push({
        nome, email,
        notas: JSON.parse(localStorage.getItem('evox_notas') || '{}'),
        notaGeral: localStorage.getItem('evox_nota_geral'),
        data: new Date().toISOString()
      });
      localStorage.setItem('evox_leads', JSON.stringify(leads));

      // limpa estado do diagnóstico
      localStorage.removeItem('evox_respostas');
      localStorage.removeItem('evox_pilar');
    }, 800);
  });
}

// ─── TOAST ────────────────────────────────────────────────────────────────────

function mostrarToast(msg, tipo = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className   = `toast ${tipo === 'success' ? 'toast-success' : ''} show`;
  setTimeout(() => toast.classList.remove('show'), 4000);
}
