# Lobby - Chat Global

Aplicação de chat global em tempo real desenvolvida com React e Socket.io.

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **React Router DOM** - Roteamento
- **Socket.io Client** - Comunicação em tempo real
- **SASS** - Pré-processador CSS
- **IonIcons** - Ícones

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **Socket.io** - WebSockets
- **CORS** - Compartilhamento de recursos

## 📁 Estrutura do Projeto

```
/workspace
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   │   ├── ChatInput.jsx
│   │   │   ├── MessageList.jsx
│   │   │   └── UserList.jsx
│   │   ├── context/       # Context API
│   │   │   └── ChatContext.jsx
│   │   ├── pages/         # Páginas da aplicação
│   │   │   ├── Login.jsx
│   │   │   └── Chat.jsx
│   │   ├── services/      # Serviços externos
│   │   │   └── socket.js
│   │   ├── main.jsx
│   │   └── index.scss
│   ├── public/
│   │   └── assent/        # Assets (avatars, imagens)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                # Backend Node.js
│   ├── index.js          # Servidor principal
│   └── package.json
│
└── README.md
```

## ⚙️ Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Backend

```bash
cd server
npm install
npm run dev
```

O servidor rodará em `http://localhost:3001`

### Frontend

```bash
cd client
npm install
npm run dev
```

O frontend rodará em `http://localhost:5173`

## 🔧 Scripts

### Backend
- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em desenvolvimento com nodemon

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção

## 🎮 Funcionalidades

- ✅ Login com seleção de avatar
- ✅ Chat em tempo real
- ✅ Lista de usuários online
- ✅ Sistema de curtidas em perfis
- ✅ Curtidas em mensagens
- ✅ Envio de mensagens de texto
- ✅ Envio de imagens (URL ou upload)
- ✅ Interface responsiva
- ✅ Notificação de conexão/desconexão

## 🔌 Eventos do Socket

### Cliente → Servidor
- `join` - Usuário entra no chat
- `send-message` - Enviar mensagem
- `like-user` - Curtir usuário
- `like-message` - Curtir mensagem
- `disconnect` - Usuário sai

### Servidor → Cliente
- `joined` - Confirmação de entrada
- `users-update` - Lista de usuários atualizada
- `new-message` - Nova mensagem recebida
- `message-liked` - Mensagem curtiu
- `user-left` - Usuário saiu
- `liked` - Recebeu curtida

## 🛣️ Rotas

- `/` - Página de login
- `/chat` - Sala de chat

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na pasta `client`:

```env
VITE_SOCKET_URL=http://localhost:3001
```

## 🚀 Próximos Passos

- [ ] Adicionar autenticação com JWT
- [ ] Implementar banco de dados (MongoDB/PostgreSQL)
- [ ] Salvar histórico de mensagens
- [ ] Criar salas privadas
- [ ] Adicionar emojis e reactions
- [ ] Implementar busca de usuários
- [ ] Adicionar status online/offline
- [ ] Criar perfil de usuário editável
- [ ] Implementar moderação de conteúdo
- [ ] Adicionar notificações push

## 📄 Licença

MIT

## 👨‍💻 Autor

Desenvolvido como projeto de chat em tempo real.
