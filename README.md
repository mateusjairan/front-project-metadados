# 🎥 Aplicação de Transcrição de Vídeo

Uma aplicação web moderna desenvolvida em React e Next.js que permite fazer upload de vídeos e gerar transcrições automáticas sincronizadas com a reprodução do vídeo.

---

## ✨ Funcionalidades

- **Upload de Vídeo**: Interface intuitiva para arrastar e soltar arquivos de vídeo (MP4, WebM, AVI, MOV).
- **Player de Vídeo**: Reprodutor HTML5 com controles personalizados.
- **Transcrição Sincronizada**: Transcrição automática com timestamps, destacando o segmento atual.
- **Navegação Inteligente**: Clique em qualquer trecho da transcrição para pular para aquele momento do vídeo.
- **Tema Escuro**: Interface moderna, responsiva e agradável.
- **Performance**: Cache inteligente com React Query.

---

## 🚀 Tecnologias Utilizadas

- **React 19** – Biblioteca principal de UI
- **Next.js 15** – Framework React para SSR e rotas
- **React Query (TanStack Query)** – Gerenciamento de requisições e cache
- **TypeScript** – Tipagem estática
- **CSS Puro** – Estilização customizada
- **HTML5 Video** – Player nativo

---

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm (recomendado)

---

## 🛠️ Instalação Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/video-transcription-app.git
cd video-transcription-app
```

2. **Instale as dependências**

Se encontrar erros de dependência, use o comando com `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

3. **Configuração da API de Transcrição**

Por padrão, a aplicação está pronta para consumir uma API local de transcrição (exemplo: [MetadadosPy/manipulacao_metadados](https://github.com/MetadadosPy/manipulacao_metadados)).

- Certifique-se de que a API está rodando localmente em `http://localhost:8000/transcribe`.
- O arquivo `services/transcription-api.ts` já está configurado para enviar o vídeo para esse endpoint.

Se quiser usar a API do OpenAI Whisper, descomente o trecho correspondente no mesmo arquivo e adicione sua chave no `.env.local`:

```env
NEXT_PUBLIC_OPENAI_API_KEY=sua_chave_aqui
```

4. **Execute o projeto**

```bash
npm run dev
```

5. **Acesse a aplicação**

Abra o navegador e acesse:

```
http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
├── app/                          # Páginas Next.js
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── components/                   # Componentes React reutilizáveis
│   ├── video-uploader.tsx       # Upload de vídeo
│   ├── video-player.tsx         # Player de vídeo
│   └── transcription-panel.tsx  # Painel de transcrição
├── hooks/                       # Hooks customizados
│   └── use-video-sync.tsx       # Sincronização do player
├── services/                    # Serviços de API
│   └── transcription-api.ts     # Função para transcrição
├── types/                       # Tipos TypeScript
│   └── transcription.ts         # Tipos da transcrição
├── src/                         # Versão alternativa em React puro
│   ├── components/              # Componentes JSX
│   ├── hooks/                   # Hooks personalizados
│   ├── api/                     # Funções de API
│   └── styles/                  # Arquivos CSS
└── styles/                      # Estilos globais e específicos
```

---

## 🎯 Como Usar

1. **Faça Upload do Vídeo**
   - Arraste e solte um arquivo de vídeo na área indicada ou clique para selecionar.
2. **Aguarde a Transcrição**
   - O vídeo será enviado para a API e a transcrição aparecerá sincronizada.
3. **Navegue pela Transcrição**
   - Clique em qualquer segmento para pular para aquele momento do vídeo.
   - O segmento atual é destacado durante a reprodução.

---

## 🔧 Configuração da API

- **API Local**: Por padrão, a aplicação envia o vídeo para `http://localhost:8000/transcribe`.
- **API OpenAI Whisper**: Descomente o código no `transcription-api.ts` e adicione sua chave no `.env.local`.
- **API Personalizada**: Altere a URL no `transcription-api.ts` para o endpoint desejado.

---

## 📱 Responsividade

- **Desktop**: Layout em duas colunas
- **Tablet**: Layout empilhado
- **Mobile**: Interface otimizada para toque

---

## 🎨 Personalização

- Os estilos estão em `app/globals.css` e na pasta `styles/`.
- Para mudar cores, edite as variáveis CSS em `globals.css`:

```css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --accent: #666666;
}
```

---

## 🚀 Deploy

- **Vercel** (recomendado):
  1. Conecte o repositório ao Vercel
  2. Configure variáveis de ambiente
  3. Deploy automático a cada push
- **Outros provedores**: Netlify, Railway, Heroku, AWS Amplify

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NomeDaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Minha feature'`)
4. Push para a branch (`git push origin feature/NomeDaFeature`)
5. Abra um Pull Request

---

## 📝 Roadmap

- [ ] Suporte a múltiplos idiomas
- [ ] Exportação da transcrição (SRT, VTT)
- [ ] Busca na transcrição
- [ ] Edição manual da transcrição
- [ ] Suporte a legendas
- [ ] API de webhooks

---

## 🐛 Problemas Conhecidos

- Arquivos de vídeo grandes podem causar lentidão
- Alguns formatos de vídeo podem não ser suportados em todos os navegadores
- A transcrição mock é limitada a 30 segundos

---

## 👥 Autores

- **Mateus Jairan** – Desenvolvimento inicial – [@mateusjairan](https://github.com/mateusjairan)

---

## 🙏 Agradecimentos

- OpenAI pela API Whisper
- Comunidade React
- Contribuidores do projeto

---

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Crie uma nova issue se necessário
2. Entre em contato: mateusjairan@gmail.com

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**
