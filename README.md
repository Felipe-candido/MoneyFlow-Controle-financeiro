# MoneyFlow – Controle Financeiro

Aplicação web para gerenciamento de finanças pessoais, com cadastro e visualização de transações, painéis de saldo e gráficos. O projeto é dividido em dois apps:

- Backend em TypeScript com NestJS, usando Firebase Admin para autenticação e Firestore.
- Frontend em TypeScript com Next.js (App Router), usando Firebase Web SDK para autenticação, componentes UI e gráficos.

## Sumário
- Visão Geral
- Principais Funcionalidades
- Arquitetura e Stack
- Pré‑requisitos
- Configuração de Ambiente (env)
- Como Rodar Localmente
- Endpoints da API (backend)
- Fluxo de Autenticação
- Estrutura de Pastas
- Dicas de Deploy

## Visão Geral
O MoneyFlow permite que usuários autenticados registrem entradas e saídas, acompanhem o saldo consolidado e visualizem gráficos de desempenho por período, tudo com uma UI moderna.

## Principais Funcionalidades
- Autenticação de usuário com Firebase Authentication (ID Token JWT).
- CRUD de transações financeiras (income/expense) no Firestore.
- Cálculo de saldo e listagem por mês.
- Dashboard com cartões de saldo, lista de transações recentes e gráficos.

## Arquitetura e Stack
- TypeScript em todo o mono-repo
- Backend: NestJS 11, Firebase Admin SDK, Firestore
- Frontend: Next.js 14 (App Router), React 18, Tailwind, Radix UI, Recharts
- Auth: Firebase Authentication (Web SDK no frontend, verificação no backend via Admin)

## Pré-requisitos
- Node.js 18+ e npm/pnpm/yarn
- Conta e projeto no Firebase com Authentication e Firestore habilitados
- Credenciais de serviço (service account) para o Firebase Admin no backend

## Configuração de Ambiente
### 1) Backend (`backend-financeiro`)
- Coloque o arquivo de credenciais do Firebase Admin na raiz do backend como `serviceAccountKey.json`:
  - Este arquivo é carregado por `src/firebase/firebase.service.ts`.
- CORS: por padrão o backend permite origem `http://localhost:3001` (veja `src/main.ts`). Ajuste se necessário.

Semelhante a:
```json
{
  "type": "service_account",
  "project_id": "<seu-projeto>",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk@<seu-projeto>.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

### 2) Frontend (`frontend-financeiro`)
Crie um arquivo `.env.local` com as chaves do seu app web Firebase:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```
Essas variáveis são usadas em `lib/firebase.ts` para inicializar o app do Firebase no frontend.

## Como Rodar Localmente
### 1) Backend (NestJS)
```bash
cd backend-financeiro
npm install
npm run start:dev
# Por padrão sobe em http://localhost:3000
```
Se quiser alterar a porta, defina `PORT` nas variáveis de ambiente.

### 2) Frontend (Next.js)
O backend permite CORS para `http://localhost:3001`. Rode o Next.js nessa porta:
```bash
cd frontend-financeiro
npm install
npm run dev -- -p 3001
# App em http://localhost:3001
```

### 3) Login e uso
- Autentique-se no frontend (Firebase Auth). Após logado, o frontend obtém um ID Token.
- As requisições ao backend devem incluir o header `Authorization: Bearer <ID_TOKEN>`.

## Endpoints da API (backend)
Base: `http://localhost:3000`

Autorização: todas as rotas abaixo requerem header `Authorization: Bearer <ID_TOKEN>`.

- `POST /users/profile`
  - Cria perfil do usuário no Firestore usando `uid` e `email` do token.
  - Body: `{ "nome": string }`

- `POST /transactions/add`
  - Cria transação.
  - Body:
    ```json
    {
      "amount": number,
      "category": string,
      "description": string?,
      "date": string | Date,
      "type": "income" | "expense"
    }
    ```

- `GET /transactions/all`
  - Lista todas as transações do usuário.

- `GET /transactions/month`
  - Lista transações do mês/ano atuais do usuário.

- `GET /transactions/balance`
  - Retorna o saldo consolidado do usuário.

## Fluxo de Autenticação
1. O usuário autentica no frontend com Firebase Auth (Web SDK).
2. O frontend obtém o ID Token do usuário.
3. Todas as chamadas ao backend incluem `Authorization: Bearer <ID_TOKEN>`.
4. No backend, o `AuthGuard` verifica o token via Firebase Admin (`verifyIdToken`) e popula `request.user`.

## Estrutura de Pastas (resumo)
```
backend-financeiro/
  src/
    auth/            # Guard de autenticação (Firebase Admin)
    firebase/        # Inicialização do Admin SDK
    transactions/    # Controller/Service de transações
    users/           # Controller/Service de usuários
frontend-financeiro/
  src/app/           # App Router do Next.js
  components/        # UI (dashboard, charts, modais, etc.)
  lib/firebase.ts    # Inicialização do Firebase Web SDK
```

## Dicas de Deploy
- Backend NestJS: hospede em um serviço Node (Railway, Render, AWS, etc.). Configure variáveis e o `serviceAccountKey.json` seguro.
- Frontend Next.js: Vercel ou similar. Configure as variáveis `NEXT_PUBLIC_FIREBASE_*` no provedor.
- Ajuste CORS do backend para o domínio público do frontend.
- Considere usar um proxy/reverse-proxy ou variável `NEXT_PUBLIC_API_BASE_URL` no frontend.

---
Feito com TypeScript, NestJS, Next.js e Firebase (Auth + Firestore).
