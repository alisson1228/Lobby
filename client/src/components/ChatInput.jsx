import { useState, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import './ChatInput.scss';

export default function ChatInput() {
  const [text, setText] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const { sendMessage } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !imageUrl) return;

    sendMessage(text, imageUrl || null);
    setText('');
    setImageUrl('');
    setShowImageInput(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit}>
        {showImageInput && (
          <div className="image-preview">
            {imageUrl ? (
              <div className="preview-wrapper">
                <img src={imageUrl} alt="Preview" />
                <button 
                  type="button" 
                  className="btn-remove-image"
                  onClick={() => setImageUrl('')}
                >
                  <ion-icon name="close"></ion-icon>
                </button>
              </div>
            ) : (
              <input
                type="url"
                placeholder="Cole a URL de uma imagem..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            )}
          </div>
        )}

        <div className="input-wrapper">
          <button
            type="button"
            className="btn-image"
            onClick={() => fileInputRef.current?.click()}
          >
            <ion-icon name="image"></ion-icon>
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <input
            type="text"
            className="message-input"
            placeholder="Digite sua mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
          />

          <button type="submit" className="btn-send">
            <ion-icon name="send"></ion-icon>
          </button>
        </div>
      </form>
    </div>
  );
}
