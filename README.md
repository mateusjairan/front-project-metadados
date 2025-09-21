# 📊 Dashboard de Transcrição

Este é um projeto front-end para um dashboard de gerenciamento de transcrições de vídeo, desenvolvido como parte de uma tarefa de avaliação para desenvolvedor front-end sênior.

## 📝 Descrição

A aplicação é um dashboard moderno, responsivo e com tema escuro, construído para interagir com a API `ManipulaçãoMetadados-CPU 2.0`. Ela permite aos usuários visualizar, carregar, editar e excluir transcrições de vídeo de forma eficiente.

O projeto foi desenvolvido para ser totalmente funcional de forma independente do back-end, utilizando um ambiente de API mockada com **Mock Service Worker (MSW)**, garantindo uma experiência de desenvolvimento e teste desacoplada.

## ✨ Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Gerenciamento de Estado de Servidor**: [React Query (TanStack Query)](https://tanstack.com/query)
- **Estilização**: CSS Puro com [CSS Modules](https://github.com/css-modules/css-modules)
- **API Mocking**: [Mock Service Worker (MSW)](https://mswjs.io/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Notificações (Toasts)**: [Sonner](https://sonner.emilkowal.ski/)
- **Drag-and-Drop**: [React Dropzone](https://react-dropzone.js.org/)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🚀 Como Instalar e Rodar

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DA_PASTA>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o projeto:**
    ```bash
    npm run dev
    ```

4.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`.

> **Nota sobre o Ambiente Mock:**
> Por padrão, o projeto inicia com o **Mock Service Worker (MSW) ativado**. Isso significa que todas as chamadas de API são interceptadas e respondidas por um servidor mock que roda no navegador. Você pode usar todas as funcionalidades da aplicação sem precisar de um back-end real. Para desativar, altere a variável `NEXT_PUBLIC_API_MOCKING` no arquivo `.env.local`.

## 🌟 Funcionalidades Implementadas

-   **Dashboard Principal**:
    -   Listagem de todas as transcrições em uma tabela responsiva.
    -   Visualização de nome, duração, idioma e data.
-   **Ações Rápidas**:
    -   **Visualizar**: Navega para uma página de detalhes completa.
    -   **Editar**: Abre um modal para atualizar o nome do arquivo da transcrição.
    -   **Excluir**: Abre um modal de confirmação antes de remover a transcrição.
-   **Nova Transcrição**:
    -   Página dedicada para upload de novos arquivos (`/transcrever`).
    -   Componente de upload com suporte a "arrastar e soltar" (drag-and-drop).
    -   Feedback visual em tempo real durante o processamento.
    -   Redirecionamento automático e notificação de sucesso após o upload.
-   **Página de Detalhes**:
    -   Exibição completa dos metadados e do texto da transcrição.
    -   **Visualização de Segmentos Interativos**: Uma lista dos segmentos de transcrição (timestamp e texto) que pode ser clicada para destacar trechos específicos.

## 📁 Estrutura do Projeto

O código-fonte está organizado de forma lógica para promover escalabilidade e manutenibilidade:

```
/app
├── /components/ui/      # Componentes de UI genéricos e reutilizáveis (Modal, Botão, etc.)
├── /features/           # Componentes complexos e específicos de funcionalidades
│   ├── /dashboard/      # Componentes para o dashboard (Tabela, Modais de Edição/Exclusão)
│   ├── /transcribe/     # Componentes para a página de upload
│   └── /video-details/  # Componentes para a página de detalhes
├── /lib/                # Lógica central da aplicação
│   ├── api.ts           # Funções de chamada de API (fetch)
│   ├── types.ts         # Definições de tipos TypeScript
│   └── utils.ts         # Funções utilitárias
├── /transcrever/        # Rota e página para nova transcrição
├── /videos/[id]/        # Rota e página dinâmica para detalhes do vídeo
├── layout.tsx           # Layout principal da aplicação
└── page.tsx             # Página inicial (Dashboard)

/src
└── /mocks/              # Configuração do Mock Service Worker (MSW)
    ├── browser.ts       # Worker para o navegador
    ├── db.ts            # Banco de dados mock em memória
    ├── handlers.ts      # Handlers que interceptam as requisições HTTP
    └── MSWComponent.tsx # Componente que ativa o MSW
```
