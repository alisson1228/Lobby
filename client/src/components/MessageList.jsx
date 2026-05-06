import { useChat } from '../../context/ChatContext';
import './MessageList.scss';

export default function MessageList() {
  const { messages, currentUser, likeMessage } = useChat();
  const messagesEndRef = null;

  const scrollToBottom = () => {
    messagesEndRef?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="message-list-container">
      <div className="messages-wrapper">
        {messages.length === 0 ? (
          <div className="no-messages">
            <ion-icon name="chatbubbles"></ion-icon>
            <p>Nenhuma mensagem ainda. Seja o primeiro a enviar!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.userId === currentUser.id ? 'own' : ''}`}
            >
              <div className="message-avatar">
                <img src={message.userAvatar} alt={message.userName} />
              </div>
              
              <div className="message-content">
                <div className="message-header">
                  <span className="message-author">{message.userName}</span>
                  <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                {message.text && (
                  <p className="message-text">{message.text}</p>
                )}
                
                {message.image && (
                  <div className="message-image">
                    <img src={message.image} alt="Imagem enviada" />
                  </div>
                )}
                
                <div className="message-actions">
                  <button 
                    className="btn-like-message"
                    onClick={() => likeMessage(message.id)}
                  >
                    <ion-icon name="heart"></ion-icon>
                    {message.likes || 0}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
