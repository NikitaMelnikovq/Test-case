import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import AdminHome from './pages/AdminHome';
import AdminUsers from './pages/AdminUsers';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/UserDashboardComponents/ProtectedRoute';
import AdminRoute from './components/AdminDashboardComponents/AdminRoute';
import ShopsPage from './pages/ShopsPage';
import ShopDetailPage from './pages/ShopDetailPage';
import LogoutButton from './components/LoginComponents/LogoutButton'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem('access_token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          {!token && <Link to="/login" className="nav-link">Вход</Link>}
          {!token && <Link to="/register" className="nav-link">Регистрация</Link>}
          {token && isAdmin && <Link to="/admin" className="nav-link">Пользователи</Link>}
          {token && isAdmin && <Link to="/shops" className="nav-link">Магазины</Link>}
          {token && <LogoutButton />}
        </nav>
        <div className="content-container">
          <Routes>
            <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/" />} />
            <Route path="/register" element={!token ? <RegisterForm /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={<AdminRoute><UserDashboard /></AdminRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/shops" element={<AdminRoute><ShopsPage /></AdminRoute>} />
            <Route path="/shops/:id" element={<AdminRoute><ShopDetailPage /></AdminRoute>} />
            <Route path="*" element={token ? <Navigate to="/" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;