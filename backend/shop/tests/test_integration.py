from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import CustomUser
from shop.models import Shop, Product


class ShopIntegrationTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.admin_user = CustomUser.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123'
        )
        cls.user = CustomUser.objects.create_user(
            username='user',
            email='user@example.com',
            password='user123'
        )
        cls.shop = Shop.objects.create(name='Test Shop', location='Test Location')
        cls.shop_list_create_url = reverse('shop:shop-list-create')
        cls.shop_detail_url = reverse('shop:shop-detail', kwargs={'id': cls.shop.id})

    def test_admin_can_list_shops(self):
        self.client.login(username='admin', password='admin123')
        response = self.client.get(self.shop_list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_list_shops(self):
        self.client.login(username='user', password='user123')
        response = self.client.get(self.shop_list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_admin_can_create_shop(self):
        self.client.login(username='admin', password='admin123')
        data = {'name': 'New Admin Shop', 'location': 'Admin Location', 'owner': 'admin'}
        response = self.client.post(self.shop_list_create_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_cannot_create_shop(self):
        self.client.login(username='user', password='user123')
        data = {'name': 'New User Shop', 'location': 'User Location'}
        response = self.client.post(self.shop_list_create_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_retrieve_shop(self):
        self.client.login(username='admin', password='admin123')
        response = self.client.get(self.shop_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_retrieve_shop(self):
        self.client.login(username='user', password='user123')
        response = self.client.get(self.shop_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_admin_can_update_shop(self):
        self.client.login(username='admin', password='admin123')
        data = {'location': 'Updated Location'}
        response = self.client.patch(self.shop_detail_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['location'], 'Updated Location')

    def test_user_cannot_update_shop(self):
        self.client.login(username='user', password='user123')
        data = {'name': 'User Updated Shop', 'location': 'User Updated Location'}
        response = self.client.put(self.shop_detail_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_delete_shop(self):
        self.client.login(username='admin', password='admin123')
        response = self.client.delete(self.shop_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Shop.objects.filter(id=self.shop.id).exists())

    def test_user_cannot_delete_shop(self):
        self.client.login(username='user', password='user123')
        response = self.client.delete(self.shop_detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ProductIntegrationTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.admin_user = CustomUser.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin123'
        )
        cls.user = CustomUser.objects.create_user(
            username='user',
            email='user@example.com',
            password='user123'
        )
        cls.shop = Shop.objects.create(name='Test Shop', location='Test Location')
        cls.product = Product.objects.create(
            name='Test Product',
            price=9.99,
            shop=cls.shop
        )
        cls.product_list_create_url = reverse('shop:product-list-create')
        cls.product_detail_url = reverse('shop:product-detail', kwargs={'id': cls.product.id})

    def test_admin_can_list_products(self):
        self.client.login(username='admin', password='admin123')
        response = self.client.get(self.product_list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_list_products(self):
        self.client.login(username='user', password='user123')
        response = self.client.get(self.product_list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_admin_can_create_product(self):
        self.client.login(username='admin', password='admin123')
        data = {'name': 'New Admin Product', 'price': 14.99, 'shop': self.shop.id}
        response = self.client.post(self.product_list_create_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_cannot_create_product(self):
        self.client.login(username='user', password='user123')
        data = {'name': 'New User Product', 'price': 10.99, 'shop': self.shop.id}
        response = self.client.post(self.product_list_create_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_retrieve_product(self):
        self.client.login(username='admin', password='admin123')
        response = self.client.get(self.product_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_retrieve_product(self):
        self.client.login(username='user', password='user123')
        response = self.client.get(self.product_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_admin_can_update_product(self):
        self.client.login(username='admin', password='admin123')
        data = {'name': 'Updated Product', 'price': 19.99, 'shop': self.shop.id}
        response = self.client.put(self.product_detail_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(float(response.data['price']), 19.99)

    def test_user_cannot_update_product(self):
        self.client.login(username='user', password='user123')
        data = {'name': 'User Updated Product', 'price': 20.99, 'shop': self.shop.id}
        response = self.client.put(self.product_detail_url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_delete_product(self):
        self.client.login(username='admin', password='admin123')
        response = self.client.delete(self.product_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Product.objects.filter(id=self.product.id).exists())

    def test_user_cannot_delete_product(self):
        self.client.login(username='user', password='user123')
        response = self.client.delete(self.product_detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
