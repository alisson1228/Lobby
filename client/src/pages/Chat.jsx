import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import UserList from '../../components/UserList';
import MessageList from '../../components/MessageList';
import ChatInput from '../../components/ChatInput';
import './Chat.scss';

export default function Chat() {
  const { currentUser, isConnected, leaveChat } = useChat();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    leaveChat();
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-left">
          <button 
            className="menu-toggle" 
            onClick={() => setShowMenu(!showMenu)}
          >
            <ion-icon name="menu"></ion-icon>
          </button>
          <h1>Lobby Chat</h1>
        </div>
        
        <div className="header-right">
          <div className="current-user">
            <img src={currentUser.avatar} alt={currentUser.name} />
            <span>{currentUser.name}</span>
          </div>
          
          <button className="btn-logout" onClick={handleLogout}>
            <ion-icon name="log-out"></ion-icon>
            Sair
          </button>
        </div>
      </header>

      <div className="chat-content">
        <aside className={`user-sidebar ${showMenu ? 'active' : ''}`}>
          <UserList onLikeUser={() => {}} />
        </aside>

        <main className="chat-main">
          <MessageList />
          <ChatInput />
        </main>
      </div>

      {!isConnected && (
        <div className="connection-status">
          <ion-icon name="warning"></ion-icon>
          <span>Desconectado do servidor</span>
        </div>
      )}
    </div>
  );
}
