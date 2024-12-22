import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import UserForm from '../components/LoginComponents/UserForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: ''});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (token) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('isAdmin');
      const response = await axiosInstance.post('/users/login/', formData);
      const data = response.data;
      if (data.access) {
        localStorage.setItem('access_token', data.access);
      }
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
      if (typeof data.is_superuser !== 'undefined') {
        console.log(data.is_superuser)
        localStorage.setItem('isAdmin', 'true');
      }
      if (data.is_superuser) {
        toast.success('Вход выполнен как администратор');
        navigate('/admin');
      } else {
        toast.success('Вход выполнен');
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Ошибка при входе', error);
      toast.error('Ошибка при входе. Проверьте свои данные.');
    }
  };

  const fields = [
    { name: 'username', label: 'Имя пользователя', type: 'text', value: formData.username },
    { name: 'password', label: 'Пароль', type: 'password', value: formData.password },
  ];

  return (
    <UserForm 
      title="Вход в аккаунт" 
      fields={fields} 
      onChange={handleChange} 
      onSubmit={handleSubmit} 
      buttonLabel="Войти" 
    />
  );
};

export default LoginForm;
