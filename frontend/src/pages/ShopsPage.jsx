import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboardStyles/ShopsPage.css';

const ShopsPage = () => {
  const [shops, setShops] = useState([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    owner: ''
  });
  const [editingShopId, setEditingShopId] = useState(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await axiosInstance.get('/shops/');
      setShops(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingShopId) {
        await axiosInstance.put(`/shops/${editingShopId}/`, form);
      } else {
        await axiosInstance.post('/shops/', form);
      }
      setForm({ name: '', location: '' });
      setEditingShopId(null);
      fetchShops();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (shop) => {
    setEditingShopId(shop.id);
    setForm({
      name: shop.name || '',
      location: shop.location || '',
      owner: shop.owner || ''
    });
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/shops/${id}/`);
      fetchShops();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shops-container">
      <h2>Магазины</h2>
      <div className="shops-list">
        {shops.map((shop) => (
          <div key={shop.id} className="shop-card">
            <div className="shop-info">
              <p><strong>Название:</strong> {shop.name}</p>
              <p><strong>Расположение:</strong> {shop.location}</p>
            </div>
            <div className="shop-actions">
              <Link to={`/shops/${shop.id}`} className="detail-link">Перейти</Link>
              <button className="edit-btn" onClick={() => handleEdit(shop)}>Изменить</button>
              <button className="delete-btn" onClick={() => handleDelete(shop.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
      <div className="shop-form-wrapper">
        <h3>{editingShopId ? 'Изменить магазин' : 'Добавить магазин'}</h3>
        <form onSubmit={handleSubmit} className="shop-form">
          <div className="form-group">
            <label>Название:</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Расположение:</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Владелец:</label>
            <input type="text" name="owner" value={form.owner} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-btn">
            {editingShopId ? 'Сохранить' : 'Добавить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopsPage;