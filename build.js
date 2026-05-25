// build.js — injeta variáveis de ambiente nos arquivos estáticos
// Rode: node build.js antes do deploy (a Vercel roda automaticamente)

const fs   = require('fs');
const path = require('path');

const SUPABASE_URL  = process.env.SUPABASE_URL  || '';
const SUPABASE_ANON = process.env.SUPABASE_ANON || '';

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.warn('⚠️  Variáveis de ambiente não encontradas — usando valores hardcoded');
  process.exit(0);
}

const arquivos = [
  'js/resultado.js',
  'js/diagnostico.js',
  'lead.html',
  'contato.html',
];

arquivos.forEach(arquivo => {
  const filePath = path.join(__dirname, arquivo);
  if (!fs.existsSync(filePath)) return;

  let conteudo = fs.readFileSync(filePath, 'utf8');

  conteudo = conteudo
    .replace(/SUPABASE_URL_PLACEHOLDER/g,  SUPABASE_URL)
    .replace(/SUPABASE_ANON_PLACEHOLDER/g, SUPABASE_ANON);

  fs.writeFileSync(filePath, conteudo, 'utf8');
  console.log(`✓ ${arquivo} atualizado`);
});

console.log('✓ Build concluído');
