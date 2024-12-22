import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
    toast.success('Вы вышли из системы');
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: 'auto', background: '#f44336', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
      Выйти
    </button>
  );
};

export default LogoutButton;


