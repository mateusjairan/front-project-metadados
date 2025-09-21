# Dashboard de Transcrição

## Descrição

Este projeto é um dashboard web completo, moderno e responsivo para interagir com a API **ManipulaçãoMetadados-CPU 2.0**. A aplicação permite aos usuários fazer upload de mídias para transcrição, visualizar todas as transcrições existentes, gerenciar metadados (como nome) e excluir transcrições.

A interface foi construída seguindo as melhores práticas de UI/UX, com um tema escuro padrão, feedback visual claro para todas as ações do usuário e design responsivo para desktops, tablets e dispositivos móveis.

---

## Tecnologias Utilizadas

- **Framework**: Next.js 15 (com App Router)
- **Linguagem**: TypeScript
- **Gerenciamento de Estado de Servidor**: React Query (@tanstack/react-query)
- **Estilização**: CSS Puro com CSS Modules (`.module.css`)
- **Ícones**: `lucide-react`
- **Notificações**: `sonner` (semelhante a react-hot-toast)

---

## Pré-requisitos

- Node.js (v18 ou superior)
- `npm`, `yarn` ou `pnpm`

---

## Como Instalar e Rodar

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/MetadadosPy/manipulacao_metadados.git
    # Navegue para a pasta do projeto frontend (se aplicável)
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione a URL da sua API.
    ```plaintext
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

4.  **Execute a Aplicação:**
    ```bash
    npm run dev
    ```

5.  **Acesse no Navegador:**
    Abra [http://localhost:3000](http://localhost:3000) para ver a aplicação.

> **IMPORTANTE:** Certifique-se de que o back-end da API **ManipulaçãoMetadados-CPU 2.0** está em execução (por padrão, na porta 8000) antes de iniciar a aplicação front-end.

---

## Funcionalidades Implementadas

- **Dashboard Principal**: Lista todas as transcrições em uma tabela com informações como nome do arquivo, duração, idioma e data.
- **Nova Transcrição**: Página dedicada para upload de novos arquivos de áudio/vídeo com suporte a "arrastar e soltar".
- **Visualização de Detalhes**: Página para cada transcrição, exibindo metadados completos, a transcrição completa em texto e uma visualização de segmentos interativa.
- **Edição de Nome**: Um modal permite ao usuário editar o campo "nome" de uma transcrição existente.
- **Exclusão de Transcrição**: Fluxo de exclusão com modal de confirmação para evitar ações acidentais.
- **Feedback de Usuário**: Notificações (toasts) de sucesso e erro para todas as operações assíncronas (upload, edição, exclusão).
- **Estados de Carregamento**: Indicadores de carregamento (spinners, desabilitação de botões) para uma UX fluida.
- **Design Responsivo**: A aplicação é totalmente funcional em diferentes tamanhos de tela.

---

## Estrutura do Projeto

O projeto foi organizado para garantir escalabilidade e manutenibilidade, utilizando a seguinte estrutura dentro do diretório `/app`:

```
/app
├── (dashboard)                  # Grupo de rotas para o layout principal
│   ├── @modal/(.)videos/[id]/edit # Rota interceptada para o modal de edição
│   ├── layout.tsx               # Layout principal com providers
│   ├── page.tsx                 # Página do Dashboard (listagem)
│   ├── transcrever/             # Página de upload
│   └── videos/[id]/             # Página de detalhes da transcrição
├── components
│   ├── ui/                      # Componentes de UI genéricos (Modal, etc.)
│   └── ...                      # Outros componentes reutilizados
├── features                     # Componentes complexos e específicos de uma feature
│   ├── dashboard/
│   │   └── VideosTable.tsx
│   ├── transcription/
│   │   └── UploadForm.tsx
│   └── video-details/
│       └── SegmentsViewer.tsx
├── lib
│   ├── api.ts                   # Funções para chamadas à API (fetch)
│   ├── hooks.ts                 # Custom hooks (React Query)
│   ├── types.ts                 # Definições de tipos TypeScript
│   └── utils.ts                 # Funções utilitárias (formatação de data)
└── globals.css                  # Estilos globais e variáveis CSS
```

---

## Decisões de Arquitetura e Limitações

Para contornar algumas limitações da API, foram adotadas as seguintes estratégias no front-end:

1.  **Busca de Detalhes de um Vídeo (`GET /videos/{id}` inexistente):**
    *   **Solução:** Foi utilizada a estratégia *"Fetch All + Filter"*. A página de detalhes (`/videos/[id]`) utiliza o hook `useGetVideos()` para buscar a lista completa de vídeos, que o React Query já mantém em cache. Em seguida, a lista é filtrada no lado do cliente para encontrar o vídeo com o `id` correspondente. Isso torna a navegação para os detalhes quase instantânea após o primeiro carregamento.

2.  **Obtenção do ID do Vídeo Após o Upload (`POST /transcribe/` não retorna o ID):**
    *   **Solução:** Foi utilizada a estratégia *"Refetch + Find"*. Após o sucesso do upload na rota `/transcribe/`, a query `['videos']` do React Query é invalidada, forçando uma nova busca da lista completa de vídeos. Com a lista atualizada, o front-end encontra o vídeo recém-criado comparando o `nome_arquivo` com o nome do arquivo que acabou de ser enviado. Com o `id` em mãos, o usuário é redirecionado para a página de detalhes (`/videos/[id]`).
