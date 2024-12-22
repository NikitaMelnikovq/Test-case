import React from 'react';
import LogoutButton from '../components/LoginComponents/LogoutButton';
import '../styles/UserDashboardStyles/UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Личный Кабинет</h2>
        <LogoutButton />
      </div>
      <p>Здесь отображается информация пользователя.</p>
    </div>
  );
};

export default UserDashboard;