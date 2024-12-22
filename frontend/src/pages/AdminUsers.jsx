import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import '../styles/AdminDashboardStyles/AdminUsers.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone_number: '',
    first_name: '',
    surname: '',
    last_name: '',
    password: ''
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users/');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error('Не удалось загрузить пользователей.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      const dataToSend = { ...form };

      if (editingUserId) {
        if (!form.password) {
          delete dataToSend.password;
        }
        await axiosInstance.put(`users/${editingUserId}/`, dataToSend);
        toast.success('Пользователь успешно обновлён.');
      } else {
        await axiosInstance.post('users/register/', dataToSend);
        toast.success('Пользователь успешно добавлен.');
      }

      // Сброс формы после успешной отправки
      setForm({
        username: '',
        email: '',
        phone_number: '',
        first_name: '',
        surname: '',
        last_name: '',
        password: ''
      });
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        toast.error('Произошла ошибка при отправке данных.');
      } else {
        setErrors('Произошла ошибка при отправке данных.');
        toast.error('Произошла ошибка при отправке данных.');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setForm({
      username: user.username || '',
      email: user.email || '',
      phone_number: user.phone_number || '',
      first_name: user.first_name || '',
      surname: user.surname || '',
      last_name: user.last_name || '',
      password: ''
    });
    setErrors(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      return;
    }

    try {
      await axiosInstance.delete(`users/${id}/delete/`);
      toast.success('Пользователь успешно удалён.');
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error('Не удалось удалить пользователя.');
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setForm({
      username: '',
      email: '',
      phone_number: '',
      first_name: '',
      surname: '',
      last_name: '',
      password: ''
    });
    setErrors(null);
  };

  return (
    <div className="admin-users-container">
      <h2>Управление Пользователями</h2>

      <ToastContainer />

      <div className="users-list">
        {users.length > 0 ? (
          users.map((u) => (
            <div key={u.id} className="user-card">
              <div className="user-info">
                <p><strong>ID:</strong> {u.id}</p>
                <p><strong>Имя пользователя:</strong> {u.username}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Телефон:</strong> {u.phone_number || '-'}</p>
                <p><strong>Имя:</strong> {u.first_name}</p>
                <p><strong>Фамилия:</strong> {u.surname}</p>
                <p><strong>Отчество:</strong> {u.last_name || '-'}</p>
              </div>
              <div className="user-actions">
                <button onClick={() => handleEdit(u)} className="edit-btn" title="Изменить">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(u.id)} className="delete-btn" title="Удалить">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Пользователи не найдены.</p>
        )}
      </div>

      <div className="user-form-wrapper">
        <h3>{editingUserId ? 'Изменить пользователя' : 'Добавить пользователя'}</h3>
        <form onSubmit={handleSubmit} className="user-form">
          {errors && (
            <div className="error-message">
              {typeof errors === 'string' ? (
                <p>{errors}</p>
              ) : (
                Object.entries(errors).map(([field, messages]) => (
                  <div key={field}>
                    <strong>{field}:</strong> {messages.join(' ')}
                  </div>
                ))
              )}
            </div>
          )}
          <div className="form-group">
            <label>Имя пользователя:</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Телефон:</label>
            <input
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Отчество:</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!editingUserId}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              {editingUserId ? 'Сохранить' : 'Добавить'} <FaPlus />
            </button>
            {editingUserId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}
              >
                Отмена <FaTimes />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUsers;