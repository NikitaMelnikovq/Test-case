import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboardStyles/AdminHome.css';

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <h2>Админский Кабинет</h2>
      <div className="admin-buttons">
        <Link to="/shops" className="blue-button">Магазины</Link>
        <Link to="/admin/users" className="blue-button">Пользователи</Link>
      </div>
    </div>
  );
};

export default AdminHome;