import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import UserForm from '../components/LoginComponents/UserForm';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles/UserForm.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    first_name: '',
    surname: '',
    last_name: '',
    password: ''
  });
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
      const response = await axiosInstance.post('/users/register/', formData);
      const data = response.data;
      if (data.access) {
        localStorage.setItem('access_token', data.access);
      }
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
      if (typeof data.is_superuser !== 'undefined') {
        localStorage.setItem('isAdmin', data.is_superuser);
      }
      navigate('/login');
      toast.success('Регистрация выполнена');
    } catch (error) {
      console.log('Ошибка при регистрации', error);
      toast.error('Ошибка при регистрации. Проверьте свои данные.');
    }
  };

  const fields = [
    { name: 'username', label: 'Имя пользователя', type: 'text', value: formData.username },
    { name: 'email', label: 'Email', type: 'email', value: formData.email },
    { name: 'phone_number', label: 'Телефон', type: 'text', value: formData.phone_number, required: false },
    { name: 'first_name', label: 'Имя', type: 'text', value: formData.first_name },
    { name: 'surname', label: 'Фамилия', type: 'text', value: formData.surname },
    { name: 'last_name', label: 'Отчество', type: 'text', value: formData.last_name, required: false },
    { name: 'password', label: 'Пароль', type: 'password', value: formData.password }
  ];

  return (
    <UserForm
      title="Регистрация"
      fields={fields}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonLabel="Зарегистрироваться"
    />
  );
};

export default RegisterForm;