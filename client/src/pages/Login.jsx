import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import './Login.scss';

const avatars = [
  '/assent/avatar-1.png',
  '/assent/avatar-2.png',
  '/assent/avatar-3.png',
  '/assent/avatar-4.png'
];

export default function Login() {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const { joinChat } = useChat();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    joinChat(name, selectedAvatar);
    navigate('/chat');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Bem-vindo ao Lobby</h1>
        <p className="subtitle">Escolha seu avatar e entre no chat</p>

        <form onSubmit={handleSubmit}>
          <div className="avatar-selection">
            <label>Selecione um avatar:</label>
            <div className="avatars-grid">
              {avatars.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <img src={avatar} alt={`Avatar ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="name">Seu nome:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome..."
              maxLength={20}
              required
            />
          </div>

          <button type="submit" className="btn-enter">
            Entrar no Chat
          </button>
        </form>
      </div>
    </div>
  );
}
