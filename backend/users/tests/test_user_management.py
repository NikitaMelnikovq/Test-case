import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()

@pytest.mark.django_db
class TestUserManagement:
    def setup_method(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(username="admin", password="admin123")
        self.regular_user = User.objects.create_user(username="user1", password="password123")
        self.list_url = reverse('users:user-list')
        self.detail_url = lambda user_id: reverse('users:user-update', kwargs={'user_id': user_id})
        self.delete_url = lambda user_id: reverse('users:user-delete', kwargs={'user_id': user_id})

    def test_get_user_list_as_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.list_url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 2

    def test_get_user_list_as_regular_user(self):
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get(self.list_url)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_delete_user_as_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(self.delete_url(self.regular_user.id))
        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_update_user_as_regular_user(self):
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.put(self.detail_url(self.regular_user.id), {"first_name": "Unauthorized"})
        assert response.status_code == status.HTTP_403_FORBIDDEN
