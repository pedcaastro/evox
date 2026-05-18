# EVOX — Site de Diagnóstico Operacional

Site estático com landing page, questionário de diagnóstico e página de resultado.

## Estrutura

```
evox/
├── index.html          # Landing page
├── diagnostico.html    # Questionário (20 perguntas, 4 pilares)
├── resultado.html      # Resultado com radar chart + download do ebook
├── css/
│   └── style.css       # Design system completo
├── js/
│   ├── diagnostico.js  # Lógica do questionário
│   └── resultado.js    # Cálculo de notas + radar chart
├── assets/
│   ├── logo.svg        # Logo EVOX
│   └── ebook.pdf       # ← ADICIONE O SEU EBOOK AQUI
├── vercel.json         # Configuração de deploy
└── README.md
```

## Deploy na Vercel

### Opção 1 — Via GitHub (recomendado)

1. Crie um repositório no GitHub e faça upload desta pasta
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New → Project**
3. Conecte o repositório GitHub
4. Clique em **Deploy** — pronto!

A cada push na branch `main`, o site atualiza automaticamente.

### Opção 2 — Via Vercel CLI

```bash
npm install -g vercel
cd evox
vercel
```

Siga as instruções no terminal. O link do site será gerado ao final.

## Configurações após o deploy

### Adicionar o ebook
Coloque o arquivo PDF em `assets/ebook.pdf` antes de fazer deploy.
O nome do arquivo deve ser exatamente `ebook.pdf`.

### Integração com Brevo (envio de e-mail)
No arquivo `js/resultado.js`, localize o bloco comentado com
`── INTEGRAÇÃO BREVO` e:

1. Crie uma conta gratuita em [brevo.com](https://brevo.com)
2. Gere uma API Key em Settings → API Keys
3. Substitua `'SUA_API_KEY_BREVO'` pela sua chave
4. Descomente o bloco de código
5. Faça redeploy

### Domínio próprio
Na Vercel: Settings → Domains → Add Domain → siga as instruções de DNS.

## Paleta de cores

| Nome       | Hex       | Uso                         |
|------------|-----------|-----------------------------|
| Navy       | #042C53   | Fundos escuros, navbar      |
| Deep Blue  | #0C447C   | Wordmark, textos de destaque|
| Corporate  | #185FA5   | CTA, botões, links          |
| Accent     | #378ADD   | Destaques, hover            |
| Light      | #85B7EB   | Ícones em fundo escuro      |
| Pale       | #B5D4F4   | Barras, detalhes sutis      |

## Tipografia

- **Display / Logo**: Barlow Condensed 800 (Google Fonts)
- **Body**: Barlow 400/600
- **UI / Labels**: Inter 400/500/600
