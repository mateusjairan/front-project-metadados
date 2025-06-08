# 🎥 Aplicação de Transcrição de Vídeo

Uma aplicação web moderna desenvolvida em React e Next.js que permite fazer upload de vídeos e gerar transcrições automáticas sincronizadas com a reprodução do vídeo.

## ✨ Funcionalidades

- **📤 Upload de Vídeo**: Interface drag-and-drop intuitiva para carregar vídeos
- **🎬 Player Nativo**: Reprodutor HTML5 com controles personalizados
- **📝 Transcrição Sincronizada**: Transcrição automática com timestamps precisos
- **🔄 Navegação Inteligente**: Clique em qualquer segmento para navegar no vídeo
- **🌙 Tema Escuro**: Interface moderna com design responsivo
- **⚡ Performance**: Cache inteligente com React Query

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca principal
- **Next.js 15** - Framework React
- **React Query (TanStack Query)** - Gerenciamento de estado assíncrono
- **CSS Puro** - Estilização sem frameworks
- **HTML5 Video** - Player nativo do navegador

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm (recomendado)

## 🛠️ Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/video-transcription-app.git
cd video-transcription-app
```

2. **Instale as dependências**

> Caso encontre erros de dependência, utilize o comando com o parâmetro `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

3. **Configure as variáveis de ambiente** (opcional)

```bash
cp .env.example .env.local
```

Adicione sua chave da API do OpenAI (se usar transcrição real):

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

## 📁 Estrutura do Projeto

\`\`\`
├── app/                          # Páginas Next.js
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── components/                   # Componentes React
│   ├── video-uploader.tsx       # Componente de upload
│   ├── video-player.tsx         # Player de vídeo
│   └── transcription-panel.tsx  # Painel de transcrição
├── hooks/                       # Hooks customizados
│   └── use-video-sync.tsx       # Hook de sincronização
├── services/                    # Serviços de API
│   └── transcription-api.ts     # API de transcrição
├── types/                       # Definições TypeScript
│   └── transcription.ts         # Tipos da transcrição
└── src/                         # Versão React puro (alternativa)
    ├── components/              # Componentes JSX
    ├── hooks/                   # Hooks personalizados
    ├── api/                     # Funções de API
    └── styles/                  # Arquivos CSS
\`\`\`

## 🎯 Como Usar

1. **Faça Upload do Vídeo**
   - Arraste e solte um arquivo de vídeo na área designada
   - Ou clique para selecionar um arquivo
   - Formatos suportados: MP4, WebM, AVI, MOV

2. **Aguarde a Transcrição**
   - A transcrição será gerada automaticamente
   - O processo pode levar alguns segundos

3. **Navegue pela Transcrição**
   - O segmento atual é destacado durante a reprodução
   - Clique em qualquer segmento para pular para aquele momento
   - Use os controles do player para pausar/reproduzir

## 🔧 Configuração da API

### OpenAI Whisper (Produção)

Para usar a API real do Whisper, descomente o código em `services/transcription-api.ts`:

\`\`\`typescript
const formData = new FormData()
formData.append('file', videoFile)
formData.append('model', 'whisper-1')
formData.append('language', 'pt')
formData.append('response_format', 'verbose_json')

const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  },
  body: formData
})
\`\`\`

### API Personalizada

Para integrar com sua própria API de transcrição:

\`\`\`typescript
const response = await fetch('https://sua-api.com/transcribe', {
  method: 'POST',
  body: formData
})
\`\`\`

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:

- 🖥️ **Desktop** - Layout em duas colunas
- 📱 **Tablet** - Layout empilhado
- 📱 **Mobile** - Interface otimizada para toque

## 🎨 Personalização

### Temas

Os estilos estão organizados em arquivos CSS separados:

- `globals.css` - Estilos globais e layout
- `upload.css` - Componente de upload
- `player.css` - Player de vídeo
- `transcript.css` - Painel de transcrição

### Cores

Para alterar o esquema de cores, modifique as variáveis CSS em `globals.css`:

\`\`\`css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --accent: #666666;
}
\`\`\`

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outros Provedores

A aplicação pode ser deployada em qualquer provedor que suporte Next.js:

- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Suporte a múltiplos idiomas
- [ ] Exportação da transcrição (SRT, VTT)
- [ ] Busca na transcrição
- [ ] Edição manual da transcrição
- [ ] Suporte a legendas
- [ ] Integração com YouTube
- [ ] API de webhooks

## 🐛 Problemas Conhecidos

- Arquivos de vídeo muito grandes podem causar lentidão
- Alguns formatos de vídeo podem não ser suportados em todos os navegadores
- A transcrição mock é limitada a 30 segundos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Seu Nome** - *Desenvolvimento inicial* - [@seuusuario](https://github.com/seuusuario)

## 🙏 Agradecimentos

- OpenAI pela API Whisper
- Comunidade React
- Contribuidores do projeto

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique as [Issues existentes](https://github.com/seu-usuario/video-transcription-app/issues)
2. Crie uma nova issue se necessário
3. Entre em contato: seuemail@exemplo.com

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**
