import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import '../styles/AdminDashboardStyles/ShopDetailPage.css';

const ShopDetailPage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: ''
  });

  useEffect(() => {
    fetchShop();
    fetchProducts();
  }, []);

  const fetchShop = async () => {
    try {
      const response = await axiosInstance.get(`/shops/${id}/`);
      setShop(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`/shops/${id}/products/`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await axiosInstance.put(`/shops/products/${editingProductId}/`, {
          ...productForm,
          shop: id
        });
      } else {
        await axiosInstance.post('shops/products/', {
          ...productForm,
          shop: id
        });
      }
      setProductForm({ name: '', price: '' });
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductEdit = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      price: product.price
    });
  };

  const handleProductDelete = async (productId) => {
    try {
      await axiosInstance.delete(`shops/products/${productId}/`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shop-detail-container">
      {shop && (
        <>
          <h2>{shop.name}</h2>
          <p>Расположение: {shop.location}</p>
        </>
      )}
      <Link to="/shops" className="back-link">Вернуться к списку магазинов</Link>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <p><strong>Товар:</strong> {product.name}</p>
            <p><strong>Цена:</strong> {product.price}</p>
            <button className="edit-btn" onClick={() => handleProductEdit(product)}>Изменить</button>
            <button className="delete-btn" onClick={() => handleProductDelete(product.id)}>Удалить</button>
          </div>
        ))}
      </div>
      <div className="product-form-wrapper">
        <h3>{editingProductId ? 'Изменить товар' : 'Добавить товар'}</h3>
        <form onSubmit={handleProductSubmit} className="product-form">
          <div className="form-group">
            <label>Название товара:</label>
            <input type="text" name="name" value={productForm.name} onChange={handleProductChange} required />
          </div>
          <div className="form-group">
            <label>Цена:</label>
            <input type="number" name="price" value={productForm.price} onChange={handleProductChange} required />
          </div>
          <button type="submit" className="submit-btn">
            {editingProductId ? 'Сохранить' : 'Добавить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopDetailPage;