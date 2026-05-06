const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Armazenamento em memória (em produção, usar banco de dados)
const users = new Map();

io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  // Usuário entra no chat
  socket.on('join', (userData) => {
    const user = {
      id: socket.id,
      name: userData.name,
      avatar: userData.avatar,
      likes: 0
    };
    
    users.set(socket.id, user);
    socket.join('global-room');
    
    // Envia confirmação para o usuário
    socket.emit('joined', user);
    
    // Notifica todos os usuários da lista atualizada
    io.to('global-room').emit('users-update', Array.from(users.values()));
    
    console.log(`${user.name} entrou no chat`);
  });

  // Enviar mensagem
  socket.on('send-message', (messageData) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text: messageData.text,
      image: messageData.image || null,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    io.to('global-room').emit('new-message', message);
  });

  // Curtir usuário
  socket.on('like-user', (targetUserId) => {
    const targetUser = users.get(targetUserId);
    if (targetUser) {
      targetUser.likes += 1;
      users.set(targetUserId, targetUser);
      
      io.to('global-room').emit('users-update', Array.from(users.values()));
      io.to(targetUserId).emit('liked', { userId: socket.id, userName: users.get(socket.id)?.name });
    }
  });

  // Curtir mensagem
  socket.on('like-message', (messageId) => {
    io.to('global-room').emit('message-liked', { messageId, userId: socket.id });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
    users.delete(socket.id);
    io.to('global-room').emit('users-update', Array.from(users.values()));
    io.to('global-room').emit('user-left', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
