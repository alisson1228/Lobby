import { createContext, useContext, useState, useEffect } from 'react';
import socket, { connectSocket, disconnectSocket } from '../services/socket';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Configurar listeners do socket
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Conectado ao servidor');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Desconectado do servidor');
    });

    socket.on('joined', (user) => {
      setCurrentUser(user);
      console.log('Usuário entrou:', user);
    });

    socket.on('users-update', (usersList) => {
      setUsers(usersList);
      console.log('Lista de usuários atualizada:', usersList);
    });

    socket.on('new-message', (message) => {
      setMessages((prev) => [...prev, message]);
      console.log('Nova mensagem:', message);
    });

    socket.on('message-liked', ({ messageId, userId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, likes: (msg.likes || 0) + 1 } : msg
        )
      );
    });

    socket.on('user-left', (userId) => {
      console.log('Usuário saiu:', userId);
    });

    socket.on('liked', ({ userId, userName }) => {
      console.log(`${userName} curtiu seu perfil`);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('joined');
      socket.off('users-update');
      socket.off('new-message');
      socket.off('message-liked');
      socket.off('user-left');
      socket.off('liked');
    };
  }, []);

  const joinChat = (name, avatar) => {
    connectSocket();
    socket.emit('join', { name, avatar });
  };

  const sendMessage = (text, image = null) => {
    socket.emit('send-message', { text, image });
  };

  const likeUser = (userId) => {
    socket.emit('like-user', userId);
  };

  const likeMessage = (messageId) => {
    socket.emit('like-message', messageId);
  };

  const leaveChat = () => {
    disconnectSocket();
    setCurrentUser(null);
    setUsers([]);
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        users,
        messages,
        isConnected,
        joinChat,
        sendMessage,
        likeUser,
        likeMessage,
        leaveChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat deve ser usado dentro de um ChatProvider');
  }
  return context;
};
