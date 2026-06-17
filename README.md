# Frontend - Lista de Tarefas

## 📱 Descrição

Este projeto consiste em um aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de tarefas. A aplicação permite cadastrar, listar, editar e excluir tarefas através de uma API REST desenvolvida em Node.js e Express.

O objetivo do projeto é demonstrar a integração entre frontend mobile e backend próprio utilizando requisições HTTP.

## 🚀 Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- Axios
- React Hooks (useState e useEffect)

## ✨ Funcionalidades

- Adicionar tarefas
- Listar tarefas cadastradas
- Editar tarefas existentes
- Excluir tarefas
- Comunicação com API REST
- Tratamento de erros de conexão
- Interface simples e responsiva

## 📦 Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

## ▶️ Executando o Projeto

Inicie o projeto com:

```bash
npx expo start
```

ou

```bash
npm start
```

Após iniciar, escaneie o QR Code utilizando o aplicativo Expo Go ou execute em um emulador Android/iOS.

## 🔗 Configuração da API

No arquivo `App.tsx`, altere a constante `API_URL` para o IP da máquina onde o backend está sendo executado:

```typescript
const API_URL = "http://SEU_IP:3000";
```

Exemplo:

```typescript
const API_URL = "http://192.168.0.2:3000";
```

### Requisitos

- Backend em execução
- Celular e computador conectados à mesma rede Wi-Fi
- Porta 3000 liberada para comunicação

## 📂 Estrutura Principal

```text
frontend/
├── App.tsx
├── package.json
├── tsconfig.json
└── assets/
```

## 📱 Interface

A aplicação possui:

- Campo para digitação da tarefa
- Botão para adicionar tarefas
- Botão para editar tarefas
- Botão para excluir tarefas
- Lista dinâmica das tarefas cadastradas
- Indicador de carregamento
- Mensagens de erro e confirmação

## ⚠️ Observações

- O aplicativo depende do backend para funcionamento.
- As tarefas são armazenadas pelo servidor.
- Caso o backend não esteja disponível, será exibida uma mensagem de erro de conexão.
- O endereço IP utilizado deve corresponder ao computador que está executando o backend.

## 👨‍💻 Autor

**Nicolas Tavares**

Estudante de Análise e Desenvolvimento de Sistemas.

Projeto desenvolvido como atividade acadêmica utilizando React Native com Expo integrado a uma API REST própria.
