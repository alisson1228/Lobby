import { useChat } from '../../context/ChatContext';
import './UserList.scss';

export default function UserList() {
  const { users, currentUser, likeUser } = useChat();

  const handleLike = (userId) => {
    if (userId !== currentUser.id) {
      likeUser(userId);
    }
  };

  return (
    <div className="user-list-container">
      <h2>
        <ion-icon name="people"></ion-icon>
        Online ({users.length})
      </h2>
      
      <div className="users-grid">
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`user-card ${user.id === currentUser.id ? 'current' : ''}`}
          >
            <div className="user-avatar">
              <img src={user.avatar} alt={user.name} />
              {user.id === currentUser.id && (
                <span className="badge">Você</span>
              )}
            </div>
            
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="likes-count">
                <ion-icon name="heart"></ion-icon>
                {user.likes || 0} curtidas
              </p>
            </div>
            
            {user.id !== currentUser.id && (
              <button 
                className="btn-like"
                onClick={() => handleLike(user.id)}
              >
                <ion-icon name="heart"></ion-icon>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
